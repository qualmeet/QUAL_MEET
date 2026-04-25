import { useEffect,useState,useRef,Dispatch,SetStateAction } from "react";
import {io,Socket} from "socket.io-client";
import { RoomRole,JoinSuccessPayload, RoomParticipant } from "../types";
import {handleTokenRefresh} from "@/api/client";
import { clearAccessTokenExpiry } from "@/api/client";

type AuthState="PENDING" | "AUTHORIZED" | "REJECTED";

const SIGNALING_URL=import.meta.env.VITE_API_BASE_URL ?? "http://localhost:4003";

interface UseRoomSocketResult {
  authState: AuthState;
  role: RoomRole | null;
  socket: Socket | null;
}


export function useRoomSocket(
roomId: string | null, 
setParticipants:Dispatch<SetStateAction<RoomParticipant[]>>
):UseRoomSocketResult{

    const [socketState,setSocketState]=useState<Socket |null>(null);
    const socketRef=useRef<Socket | null>(null);
    const [authState,setAuthState]=useState<AuthState>("PENDING");
    const [role,setRole]=useState<RoomRole | null>(null);
    const [messages,setMessages]=useState<ChatMessage[]>([]);

    useEffect(()=>{
        if(!roomId)
            return;


        const socket=io(SIGNALING_URL || "", {
            withCredentials: true,
        });

        socketRef.current=socket;
        setSocketState(socket);

        socket.emit("join_room",{roomId});

        socket.on("join_success",(payload:JoinSuccessPayload)=>{
            if(payload.role==="HOST" || payload.role==="GUEST"){
                setRole(payload.role);
                setAuthState("AUTHORIZED");
            }
            else{
                //defensive fallaback
                setAuthState("REJECTED");
            }
        });

        socket.on("room_users",(users:RoomParticipant[])=>{
            setParticipants(users);
        });

        socket.on("user_joined",(user:RoomParticipant)=>{
            setParticipants((prev)=>[...prev,user]);
        });


        socket.on("media_state_changed",({socketId,micEnabled,camEnabled})=>{
            setParticipants(prev=>
                prev.map(p=>
                    p.socketId===socketId
                    ? {...p, micEnabled,camEnabled}
                    : p
                )
            );
        });

        socket.on("screen_share_started",({socketId})=>{
            setParticipants(prev=>
                prev.map(p=>
                    p.socketId===socketId
                    ? {...p,isScreenSharing:true}
                    : {...p,isScreenSharing:false}
                )
            );
        });

        socket.on("screen_share_stopped",({socketId})=>{
            setParticipants(prev=>
                prev.map(p=>
                    p.socketId===socketId
                    ? {...p,isScreenSharing:false}
                    :p
                )
            );
        });

        socket.on("screen_share_denied",()=>{
            alert("Someone else is already sharing their screen");
        })

        socket.on("user_left",({socketId})=>{
            setParticipants((prev)=>
                prev.filter((p)=>p.socketId !== socketId)
            );
        });

        socket.on("chat_message",(message:ChatMessage)=>{
            setMessages(prev => [...prev,message]);
        });

        socket.on("room_closed",({reason})=>{
            console.warn("Room closed : ",reason);

            setAuthState("REJECTED");

            socket.disconnect();
        })

        socket.on("join_error",()=>{
            setAuthState("REJECTED");
        });

        socket.on("disconnect",()=>{
            console.log("[socket] disconnected");
        });

        socket.on("connect_error",async(err)=>{
            console.log("Socket connect error: ",err.message);

            if(err.message==="TOKEN_EXPIRED"){
                try{
                    console.log("Refreshing token..");

                    await handleTokenRefresh();
                    
                    console.log("Reconnect socket..");
                    if(!socket.connected){
                        socket.connect();
                    }
                    
                }
                catch(error){
                    console.error("Refresh failed");

                    clearAccessTokenExpiry();
                    setAuthState("REJECTED");
                }
            }

            if(err.message==="UNAUTHORIZED"){
                setAuthState("REJECTED");
            }
        })

        return ()=>{
            socket.off("chat_message");
            socket.disconnect();
            socketRef.current=null;
        }
    },[roomId]);


    //----HEARTBEAT EVENT----//
    useEffect(()=>{
        
        if(!socketState)
            return;

        const interval = setInterval(()=>{
            socketState.emit("heartbeat");
        }, 10000); // Send heartbeat every 10 seconds

        return () => clearInterval(interval);
    },[socketState]);


    //when a access token refreshes then old socket connection breaks and new socket connection form using new access token 
    useEffect(() => {
        function handleTokenRefreshEvent() {
            console.log("[socket] token refreshed → reconnecting");

            const socket=socketRef.current;
            if(!socket)
                return;

            socket.off("connect");
            
            socket.disconnect();

            socket.connect();
            socket.on("connect",()=>{
                console.log("[socket] reconnected, rejoining room");

                socket.emit("join_room",{
                    roomId,
                });
            });
        }

        window.addEventListener("token_refreshed", handleTokenRefreshEvent);

        return () => {
            window.removeEventListener("token_refreshed", handleTokenRefreshEvent);
        };
    }, [roomId]);



    return {
        authState,
        role,
        socket: socketState,
        messages,
        setMessages
    };
}