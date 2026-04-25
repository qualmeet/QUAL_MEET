import { useState, useRef, useEffect,useCallback,useMemo} from "react";
import { Socket } from "socket.io-client";

export function useLocalMedia(
  socket: Socket | null
) {
  const cameraStreamRef = useRef<MediaStream | null>(null);
  const screenStreamRef=useRef<MediaStream | null>(null);
  const cameraVideoTrackRef=useRef<MediaStreamTrack | null>(null);

  const [error, setError] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  const [cameraStreamState,setCameraStreamState]=useState<MediaStream | null>(null);
  const [micEnabled,setMicEnabled]=useState(true);
  const [camEnabled,setCamEnabled]=useState(true);
  const [isScreenSharing,setIsScreenSharing]=useState(false);

  // 1️⃣ Acquire media
  useEffect(() => {
    let cancelled = false;

    async function initMedia() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        if (cancelled) {
          stream.getTracks().forEach(t => t.stop());
          return;
        }

        cameraStreamRef.current = stream;
        cameraVideoTrackRef.current=stream.getVideoTracks()[0];
        
        setCameraStreamState(stream);
        setReady(true);

      } catch {
        setError("Camera or microphone permission denied");
      }
    }

    initMedia();

    return () => {
      cancelled = true;
      cameraStreamRef.current?.getTracks().forEach(t => {
          t.stop();
          cameraStreamRef.current?.removeTrack(t);
      });
      screenStreamRef.current?.getTracks().forEach(t => {
          t.stop()
          screenStreamRef.current?.removeTrack(t);
      });

      cameraStreamRef.current=null;
      screenStreamRef.current=null;
      cameraVideoTrackRef.current=null;
    };
  }, []);

  const toggleMic=useCallback(()=>{
    const stream=cameraStreamRef.current;

    if(!stream)
        return;

    stream.getAudioTracks().forEach(track=>{
        track.enabled=!track.enabled;
        setMicEnabled(track.enabled);
    })
  },[]);


  const toggleCamera=useCallback(()=>{
        const stream=cameraStreamRef.current;

        if(!stream)
                return;

        stream.getVideoTracks().forEach(track=>{
            track.enabled=!track.enabled;
            setCamEnabled(track.enabled);
        })
  },[]);


  useEffect(()=>{

    if(!socket)
      return;

    //success ->start sharing
    const handleStarted=({socketId}:{socketId:string})=>{
        if(socketId===socket.id){
          setIsScreenSharing(true);
        }
    };

    //failure -> cleanup
    const handleDenied=()=>{
      screenStreamRef.current?.getTracks().forEach(t=>t.stop());

      screenStreamRef.current=null;
      setIsScreenSharing(false);
    }

    socket.on("screen_share_started",handleStarted);
    socket.on("screen_share_denied",handleDenied);

    return()=>{
      socket.off("screen_share_started",handleStarted);
      socket.off("screen_share_denied",handleDenied);
    }

  },[socket]);

  const startScreenShare=useCallback(async()=>{

      if(isScreenSharing)
        return;

      try{
        const screenStream=await navigator.mediaDevices.getDisplayMedia({
          video:true,
        });

        screenStreamRef.current=screenStream;

        socket?.emit("screen_share_start");
        setIsScreenSharing(true);

        //Auto stop when user clicks "stop sharing" on chrome pop up's
        const [screenTrack]=screenStream.getVideoTracks();

        screenTrack.onended=()=>{
            console.log("Screen share ended by browser");

            screenStreamRef.current?.getTracks().forEach(t=>t.stop());
            screenStreamRef.current=null;

            setIsScreenSharing(false);

            socket?.emit("screen_share_stop");
           
        };

        console.log("Started sharing screen");
      }
      catch(error){
        setIsScreenSharing(false);
        console.warn("Screen share cancelled");
      }
  },[isScreenSharing,socket]);

  
  
  const stopScreenShare=useCallback(()=>{
    
    if(!isScreenSharing)
        return;

      screenStreamRef.current?.getTracks().forEach(t=>t.stop());
      screenStreamRef.current=null;
      setIsScreenSharing(false);
      socket?.emit("screen_share_stop");
      console.log("Stopped sharing screen");

  },[isScreenSharing]);


  //useMemo reduces unncesarry recalculations 
  const activeVideoTrack=useMemo(()=>{
        if(isScreenSharing && screenStreamRef.current){
              return screenStreamRef.current.getVideoTracks()[0];
        }
         
        return  cameraVideoTrackRef.current;
  },[isScreenSharing]);
        
       



  return {
    cameraStream: cameraStreamState,

    //track that is being sent to other peers
    activeVideoTrack,

    //media state
    ready,
    error,
    micEnabled,
    camEnabled,
    isScreenSharing,

    //controls
    toggleMic,
    toggleCamera,
    startScreenShare,
    stopScreenShare,
  };
}



