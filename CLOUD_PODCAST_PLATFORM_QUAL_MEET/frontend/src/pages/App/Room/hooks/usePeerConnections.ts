import { useEffect,useRef,useState } from "react";
import { Socket } from "socket.io-client";
import { RoomParticipant } from "../types";
import { getIceServers } from "@/api/turn";


interface peerInfo{
    socketId:string;
    stream:MediaStream;
}


export function usePeerConnection(
    socket:Socket | null,
    roomId: string | null,
    localStream: MediaStream | null,
){

    const peersRef=useRef<Map<string,RTCPeerConnection>>(new Map());  //socketId
    const [remotePeers,setRemotePeers]=useState<peerInfo[]>([]);
    
    const rtcConfigRef=useRef<RTCConfiguration | null>(null);
    // ice servers ttl refresh periocically
    const refreshTimerRef=useRef<ReturnType<typeof setTimeout> | null>(null);
    const restartingRef=useRef<Set<string>>(new Set());

    const pendingIceRef=useRef<Map<string,RTCIceCandidate[]>>(new Map());
    //when peer_ready comes before initWebrtc() runs as it is async so as rtcConfigRef will not be set by then so we store peers here 
    const pendingPeersQueue=useRef<{socketId:string; isInitiator:boolean}[]>([]);
    
    const replaceVideoTrack=(newTrack:MediaStreamTrack | null )=>{
        peersRef.current.forEach((pc)=>{
            const sender=pc.getSenders().find(s=>s.track?.kind==="video");

            if(sender){
                console.log("replacing track");

                sender.replaceTrack(newTrack);
            }
            else{
                console.log("no sender found ->adding track");

                if(newTrack){
                    pc.addTrack(newTrack,new MediaStream([newTrack]));
                }
            }
        })
    }

    
    
    
    useEffect(()=>{
        if(!socket || !roomId || !localStream)
            return;


        let cancelled=false;

        function scheduleRefresh(ttl:number){
            refreshTimerRef.current=setTimeout(async()=>{
                console.log("Refreshing TURN credentials");

                const data=await getIceServers(roomId!);

                rtcConfigRef.current={
                    iceServers:data.iceServers,
                };

                scheduleRefresh(data.ttl);
            },ttl*1000-5000); //refresh before expiry)
        }
        async function initWebRTC(){
            try{

                const data=await getIceServers(roomId!);
                
                if(cancelled)
                    return;

                rtcConfigRef.current={
                    iceServers:data.iceServers,
                };

                console.log("ICE config ready, processing pending peers..");

                //creating peer for peers in the queue and flusing this queue
                pendingPeersQueue.current.forEach(({socketId,isInitiator})=>{
                    createPeer(socketId,isInitiator);
                });

                pendingPeersQueue.current=[];


                //refresh turn credentials before they expire
                scheduleRefresh(data.ttl);

                console.log("ICE Servers loaded: ",data.iceServers);
            }
            catch(error){
                console.error("Failed to fetch Ice servers", error);
            }
        }

        initWebRTC();

        //creating RTCPeerConnection
        //userId->peer id with whom we want to make the peer connection
        function createPeer(remoteSocketId:string,isInitiator:boolean):RTCPeerConnection | null{
            
            const exisiting= peersRef.current.get(remoteSocketId);
            if(exisiting){
                console.log("Peer already exists, skipping", remoteSocketId);
                return exisiting;
            }

            console.log("createPeer called for:", remoteSocketId, "initiator:", isInitiator);

            if(!rtcConfigRef.current){
                console.error("ICE config not ready yet");
                return null;
            }
            const pc=new RTCPeerConnection(rtcConfigRef.current);

            peersRef.current.set(remoteSocketId,pc);

            console.log("Peer connection object created ",pc);

            //attaching local stream to peer connection object
            localStream?.getTracks().forEach(track=>
                pc.addTrack(track,localStream)
            );

            //receiving remote stream here(event listeners)
            pc.ontrack=(event)=>{

                const stream=event.streams[0];

                setRemotePeers((prev)=>{
                    const exisitingPeer=prev.find(p=>p.socketId === remoteSocketId);

                    if(exisitingPeer){
                        //updating exisitng stream
                        return prev.map(p=>
                            p.socketId === remoteSocketId
                            ? {...p,stream}
                            : p
                        );
                    }

                    return [...prev,{socketId:remoteSocketId,stream}];

                });
            };

            //exchanging ICE CANDIDATES(event listeners)
            pc.onicecandidate=(event)=>{
                console.log("ICE CANDIDATE gathered ", event.candidate);
                if(event.candidate){
                    socket?.emit("webrtc_ice_candidate",{
                        roomId,
                        to:remoteSocketId,
                        candidate:event.candidate,
                    });
                }

                console.log("ICE CANDIDATE sent ", event.candidate);
            };

            pc.onconnectionstatechange = () => {
                console.log(`🔌 [peer] connection state:`, pc.connectionState, "→", remoteSocketId);
                
                if(pc.connectionState==="disconnected"){
                    console.log("⚠️ disconnected -> waiting or restart");

                    setTimeout(async()=>{
                        if(pc.connectionState === "disconnected"){

                            if(restartingRef.current.has(remoteSocketId))
                                return;

                            restartingRef.current.add(remoteSocketId);

                            try{
                                console.log("still disconnected -> restarting ICE");
                                
                                if(pc.signalingState==="closed")
                                    return;

                                const offer=await pc.createOffer({iceRestart:true});
                                await pc.setLocalDescription(offer);

                                socket?.emit("webrtc_offer",{
                                    roomId,
                                    to:remoteSocketId,
                                    sdp:offer,
                                });
                            }
                            finally{
                                setTimeout(()=>{
                                    restartingRef.current.delete(remoteSocketId);
                                },3000);
                            }
                            
                        }
                    },3000);
                }

                if(pc.connectionState === "failed"){
                    console.log("❌ connection failed → closing");
                    pc.close();
                }
            };

            pc.oniceconnectionstatechange = async() => {
                console.log(`❄️ [peer] ICE state:`, pc.iceConnectionState, "→", remoteSocketId);
                
                if (pc.iceConnectionState === 'failed') {
                    console.error("❌ [peer] ICE connection FAILED for:", remoteSocketId);
                    
                    if(restartingRef.current.has(remoteSocketId)) return;

                    restartingRef.current.add(remoteSocketId);
                    
                    try{
                        console.log("restarting .....");

                        if(pc.signalingState==="closed")
                            return;

                        const offer=await pc.createOffer({iceRestart:true});

                        await pc.setLocalDescription(offer);

                        socket?.emit("webrtc_offer",{
                            roomId,
                            to:remoteSocketId,
                            sdp:offer,
                        });
                    }
                    finally{
                        setTimeout(()=>{
                            restartingRef.current.delete(remoteSocketId);
                        },3000);
                    }

                }
            };

            pc.onsignalingstatechange = () => {
                console.log(`📶 [peer] signaling state:`, pc.signalingState, "→", remoteSocketId);
            };



            if(isInitiator){

                console.log("INITIATOR → creating offer for", remoteSocketId);
                (async()=>{
                    const offer=await pc.createOffer();

                    await pc.setLocalDescription(offer)

                    socket?.emit("webrtc_offer",{
                        roomId,
                        to:remoteSocketId,
                        sdp:offer,
                    });

                    console.log("Offer sent ",offer);
                })();
            }

            return pc;
        }


        //when a new user joined server broadcast this event to all the peers except the newly joined one all the info of new joined peer
        socket.on("peer_ready",({socketId})=>{
            if(!peersRef.current.has(socketId)){

                //as initWebrtc() is async so rtcConfig may not be ready so we push peers in here 
                if(!rtcConfigRef.current){
                    pendingPeersQueue.current.push({
                        socketId,
                        isInitiator:true,
                    });

                    return;
                }
                

                createPeer(socketId,true);
            }
        });

        //sent by server to only a newly joined socket the list of all the participants in the meeting
        // socket.on("existing_peers", (users:RoomParticipant[]) => {
        //     users.forEach(({ socketId }) => {

        //         if(socketId===socket.id) //skips itself from participants list
        //             return;

        //         if (!peersRef.current.has(socketId)) {

        //             if(!rtcConfigRef.current)
        //                 return;

        //             createPeer(socketId, false);
        //         }
        //     });
        // });


        socket.on("webrtc_offer",async({from,sdp})=>{

            console.log(`Offer received from=> ${from} sdp =>${sdp}`);

            let checks=0;
            while (!rtcConfigRef.current && checks <20){
                console.log(`ICE config not ready, waiting...(attempt${checks+1})`);
                await new Promise(resolve=>setTimeout(resolve,100));
                checks++;
            }

            if(!rtcConfigRef.current){
                console.log("Critical :ICE config failed to load in time for offer");
                return;
            }

            let pc: RTCPeerConnection | null = peersRef.current.get(from) ?? null;

            if(!pc){
                console.error("Peer Connection Object not found for offer from ", from);
                pc = createPeer(from,false);

                if (!pc) return; //because createPeer returns null if not able to create RTC peer connection
                
            }

            try{
                if(pc.signalingState !== "stable"){
                    console.warn("Glare detected -> rolling back");

                    await pc.setLocalDescription({
                        type:"rollback"
                    });
                }

                await pc.setRemoteDescription(new RTCSessionDescription(sdp));
                
                console.log("LOG:Remote Descroption Set");
                
                const queuedCandidates=pendingIceRef.current.get(from);
                if(queuedCandidates){
                    console.log(`LOG : Applying ${queuedCandidates.length} queueud candidates`);

                    for(const candidate of queuedCandidates){
                        try{
                            await pc.addIceCandidate(new RTCIceCandidate(candidate));
                            console.log("ICE state now:", pc.iceConnectionState);
                        }
                        catch(err){
                            console.error("Error applying queued ICE ",err);
                        }
                    }
                    pendingIceRef.current.delete(from);
                }
                
                const answer=await pc.createAnswer();
                await pc.setLocalDescription(answer);


                socket.emit("webrtc_answer",{
                    roomId,
                    to:from,
                    sdp:pc.localDescription,
                });

                console.log("Answer sent ",answer);
            }
            catch(err){
                console.error("Error handling offer: ",err);
            }
        });

        socket.on("webrtc_answer",async({from,sdp})=>{
            const pc=peersRef.current.get(from);

            if(!pc)
                return;

            try {
                await pc.setRemoteDescription(new RTCSessionDescription(sdp));
                console.log("Answer received and Remote Description set for:", from);

                // --- DRAIN QUEUE FOR HOST SIDE ---
                const queuedCandidates = pendingIceRef.current.get(from);
                if (queuedCandidates) {
                    console.log(`LOG: Applying ${queuedCandidates.length} queued candidates to Host side`);
                    for (const candidate of queuedCandidates) {
                        try {
                            await pc.addIceCandidate(new RTCIceCandidate(candidate));
                            console.log("ICE state now:", pc.iceConnectionState);
                        } catch (e) {
                            console.error("Error adding queued ICE to Host:", e);
                        }
                    }
                    pendingIceRef.current.delete(from);
                }
            } catch (err) {
                console.error("Error handling webrtc_answer:", err);
            }
        });

        socket.on("webrtc_ice_candidate",async({from,candidate})=>{


            console.log("ICE CANDIDATE received ", candidate);
            const pc=peersRef.current.get(from);

            if(!pc || !pc.remoteDescription){
                console.log("Queueing ICE candidates ")
                const queue=pendingIceRef.current.get(from) ?? [];
                queue.push(candidate);
                pendingIceRef.current.set(from,queue);
                return;
            }
            try{
                await pc.addIceCandidate(new RTCIceCandidate(candidate));
                console.log("ICE Candidate added directly");
                console.log("ICE state now:", pc.iceConnectionState);
            }
            catch(error){
                console.error("Error adding ICE candidate",error);
            }
        });

        socket.on("user_left",({socketId})=>{
            const pc=peersRef.current.get(socketId);

            pc?.close();
            peersRef.current.delete(socketId);

            setRemotePeers(prev=> prev.filter(p=>p.socketId !== socketId));
        });


        return ()=>{
            socket.off("peer_ready");
            socket.off("existing_peers");
            socket.off("webrtc_offer");
            socket.off("webrtc_answer");
            socket.off("webrtc_ice_candidate");
            socket.off("user_left");

            peersRef.current.forEach(pc=>{
                //stopping all transceiver before closing
                pc.getTransceivers?.().forEach(t=>{
                    try{
                        t.stop();
                    }
                    catch{}
                });
                pc.ontrack=null;
                pc.onicecandidate=null;
                pc.onconnectionstatechange=null;
                pc.oniceconnectionstatechange=null;
                pc.onsignalingstatechange=null;

                pc.close();
            });
            peersRef.current.clear();
            setRemotePeers([]);
            cancelled=true;

            //clearing pending state too
            pendingIceRef.current.clear();
            pendingPeersQueue.current=[];
            restartingRef.current.clear();

            if(refreshTimerRef.current){
                clearTimeout(refreshTimerRef.current);
                refreshTimerRef.current=null;
            }

            rtcConfigRef.current=null;
        };

    },[socket,roomId,localStream]);


    useEffect(()=>{
        if(!socket || !roomId || !localStream)
            return;

        console.log("Media ready->sending peer_ready");

        socket.emit("peer_ready", { roomId });

    },[socket,roomId,localStream]);


    return {remotePeers,replaceVideoTrack};
}