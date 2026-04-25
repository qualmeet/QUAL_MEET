import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState ,useRef} from "react";
import { useSelector } from "react-redux";
import { useRoomSocket } from "./hooks/useRoomSocket";
import { useLocalMedia } from "./hooks/useLocalMedia";
import { usePeerConnection } from "./hooks/usePeerConnections";
import { useRecording } from "./hooks/useRecording";

import { RoomParticipant, VideoTileModel } from "./types";
import { RoomHeader } from "./components/RoomHeader";
import { VideoGrid } from "./components/VideoGrid";
import { ParticipantsList } from "./components/ParticipantsList";
import { ControleBar } from "./components/ControlBar";
import { leaveRoom } from "@/api/rooms";
import { ChatPanel } from "./components/ChatPanel";



export default function RoomPage(){

    const {roomId}=useParams<{roomId:string}>();
    const navigate=useNavigate();

    const user=useSelector((state:any)=>state.auth.user);

    const normalizedRoomId = roomId ?? null;

    const [participants,setParticipants]=useState<RoomParticipant[]>([]);

    //1.signaling and authorization
    const {authState,role,socket,messages,setMessages}=useRoomSocket(normalizedRoomId,setParticipants);

    const isHost=role==="HOST";

    //2.Local Media lifecycle
    const {cameraStream,
        activeVideoTrack,
        ready,
        error,
        micEnabled,
        camEnabled,
        isScreenSharing,
        toggleMic,
        toggleCamera,
        startScreenShare,
        stopScreenShare,
    }=useLocalMedia(socket);

    //3. creating RTC peer connection
    const {remotePeers,replaceVideoTrack}=usePeerConnection(socket, normalizedRoomId,cameraStream);

    //4. recording hook
    const {isRecording,stopRecording}=useRecording(normalizedRoomId ,cameraStream,socket);

    const [isRecordingActive,setIsRecordingActive]=useState(false);

    const remoteTiles:VideoTileModel[]=remotePeers.map(peer=>{
        const participant=participants.find(p=>p.socketId===peer.socketId);

        return{
            socketId:peer.socketId,
            stream:peer.stream,
            label:participant?.fullName ?? participant?.userId ?? peer.socketId.substring(0,8),
            micEnabled:participant?.micEnabled ?? true,
            camEnabled:participant?.camEnabled ?? true,
            isScreen:participant?.isScreenSharing ?? false,
        }
    });

    const someoneElseSharing=participants.some(
        p=>p.isScreenSharing && p.socketId !== socket?.id
    );


    const [tab,setTab]=useState<"participants" | "chat">("participants");


    //REJECT IF NOT AUTHORIZED
    useEffect(()=>{

        console.log("authState : ",authState);
        if(authState==="REJECTED"){
            navigate("/app",{replace:true});
        }
    },[authState,navigate]);




    useEffect(()=>{
        if(!socket)
            return;

        setParticipants(prev=>
            prev.map(p=>
                p.socketId==socket.id
                ? {...p,micEnabled,camEnabled}
                : p
            )
        );

        socket.emit("media_state_changed",{
            micEnabled,
            camEnabled,
        });
    },[micEnabled,camEnabled,socket]);

    
    const lastTrackRef=useRef<MediaStreamTrack | null>(null);

    //replacing video track
    useEffect(()=>{
        if(!activeVideoTrack)
            return;

        //same track -> doing nothing
        if(lastTrackRef.current===activeVideoTrack)
            return;

        console.log("replacing track:", activeVideoTrack.label);
        lastTrackRef.current=activeVideoTrack;

        replaceVideoTrack(activeVideoTrack);
    },[activeVideoTrack,replaceVideoTrack]);


    const handleLeave=async()=>{
        if(!normalizedRoomId)
            return;

        try{

            if(isRecording){
                console.log("Forcing recording stop before leaving");
                await stopRecording();
            }

            //REST API (LEAVE ROOM => ROOM SERVICE)
            const result=await leaveRoom(normalizedRoomId);

            if("closed" in result ){
                console.log("Room closed by host");
            }
            else{
                console.log("User left: ",result.userId);
            }
            //websocket event
            socket?.emit("leave_room");

            //disconnect
            socket?.disconnect();

            //navigate
            navigate("/app");
        }
        catch(error){
            console.error("Failed to leave room ",error);
            navigate("/app");  //fail safe
        }
    }

    const handleToggleScreenShare=()=>{
        if(isScreenSharing){
            stopScreenShare();
        }
        else{
            startScreenShare();
        }
    };

    const handleStartRecording=()=>{
        if(!isHost)
            return;

        socket?.emit("start_recording");
    }

    const handleStopRecording=()=>{
        if(!isHost)
            return;

        socket?.emit("stop_recording");
    }

    useEffect(()=>{
        if(!socket)
            return;

        const handleStart=()=>{
            setIsRecordingActive(true);
        }

        const handleStop=()=>{
            setIsRecordingActive(false);
        }

        socket.on("start_recording",handleStart);
        socket.on("stop_recording",handleStop);

        return()=>{
            socket.off("start_recording",handleStart);
            socket.off("stop_recording",handleStop);
        }
    },[socket]);

    if (authState === "PENDING") {
        return (
        <div className="flex items-center justify-center h-full text-gray-400">
            Connecting to meeting…
        </div>
        );
    }

    if(error){
        return (
            <div className="flex items-center justify-center h-full text-gray-400">
                {error}
            </div>
        );
    }

    if(!ready || !cameraStream){
        return (
            <div className="flex items-center justify-center h-full text-gray-400">
                Connecting to camera & microphone…
            </div>
        );
    }


    return (
    <div className="h-screen w-full bg-[#050505] text-white flex flex-col overflow-hidden font-sans">
      {/* Background Spotlight - Updated to canonical /3 (3% opacity) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-125 bg-gradient-radial from-white/3 to-transparent pointer-events-none" />

      <RoomHeader roomId={normalizedRoomId} role={role} name={user?.fullName} isRecordingActive={isRecordingActive}/>

      {/* Main Content Area */}
      <div className="flex flex-1 w-full overflow-hidden p-4 gap-4">
        <div className="flex-1 flex flex-col min-h-0">
          <VideoGrid
            localStream={cameraStream}
            localMicEnabled={micEnabled}
            localCamEnabled={camEnabled}
            remoteTiles={remoteTiles}
          />
        </div>

        <div className="flex flex-col h-full bg-[#050505] border-l border-white/5 w-80">
            {/* Tab Switcher */}
            <div className="flex p-2 bg-[#0A0A0A] border-b border-white/5">
                <button 
                onClick={() => setTab("participants")} 
                className={`flex-1 py-2 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${
                    tab === "participants" ? "bg-white text-black" : "text-gray-500 hover:text-white"
                }`}
                >
                Nodes
                </button>
                <button 
                onClick={() => setTab("chat")} 
                className={`flex-1 py-2 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${
                    tab === "chat" ? "bg-white text-black" : "text-gray-500 hover:text-white"
                }`}
                >
                Chat
                </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-hidden">
                {tab === "participants" ? (
                <ParticipantsList participants={participants} />
                ) : (
                <ChatPanel
                    messages={messages}
                    setMessages={setMessages}
                    currentUserId={user.id}
                    socket={socket}
                />
                )}
            </div>
        </div>
    </div>

      <ControleBar
        micEnabled={micEnabled}
        camEnabled={camEnabled}
        onToggleMic={toggleMic}
        onToggleCam={toggleCamera}
        onLeave={handleLeave}

        isScreenSharing={isScreenSharing}
        onToggleScreenShare= {handleToggleScreenShare}
        disableScreenShare={someoneElseSharing}
        isRecording={isRecording}
        onStartRecording={handleStartRecording}
        onStopRecording={handleStopRecording}

        isHost={isHost}
        />
    </div>
  );
}