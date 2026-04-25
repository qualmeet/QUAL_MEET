import { useState,useEffect } from "react";

interface RoomHeaderProps{
    roomId: string | null;
    role: string | null;
    name?:string;
    isRecordingActive?:boolean;
}


export function RoomHeader({roomId,role,name,isRecordingActive}:RoomHeaderProps){

  const [seconds,setSeconds]=useState(0);

  useEffect(()=>{
    let interval:any;

    if(isRecordingActive){
      interval=setInterval(()=>{
        setSeconds(prev=>prev+1);
      },1000);
    }
    else{
      setSeconds(0);
    }



    return ()=>clearInterval(interval);
  },[isRecordingActive]);


  const formatTime=(sec:number)=>{
    const m=Math.floor(sec/60);
    const s=sec%60;

    return `${m}:${s.toString().padStart(2,"0")}`;
  }

   return (
    <div className="relative z-10 flex items-center justify-between px-6 py-4 border-b border-white/5 bg-[#0a0a0a]/40 backdrop-blur-md">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-[10px] font-bold text-red-500 uppercase tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
          Live
        </div>
        <div className="text-sm font-medium tracking-tight">
          <span className="text-gray-500">Room:</span> <span className="text-white ml-1 font-mono">{roomId}</span>
        </div>
      </div>

      {isRecordingActive && (
          <div className="text-red-500 text-xs font-bold animate-pulse">
              ● Recording  {formatTime(seconds)}
          </div>
      )}

      <div className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
        {name && (
            <span className="text-white mr-4 font-semibold">
                👤 {name}
            </span>
        )}
        Access level: <span className="text-white">{role}</span>
      </div>
    </div>
  );
}