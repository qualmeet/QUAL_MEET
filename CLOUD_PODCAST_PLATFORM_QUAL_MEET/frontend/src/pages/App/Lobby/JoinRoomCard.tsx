import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function JoinRoomCard() {
    const [roomId, setRoomId] = useState("");
    const navigate = useNavigate();

    function handleJoin() {
        if (!roomId.trim())
            return;

        navigate(`/app/room/${roomId}/pre`);
    }

    return (
    <div className="h-full flex flex-col justify-between p-8">
  <div>
    <span className="text-xs font-mono text-yellow-500 tracking-widest uppercase"> Enter</span>
    <h3 className="text-3xl font-bold mt-2">Join Room</h3>
    <p className="text-gray-500 mt-4 text-sm leading-relaxed">
      Enter a session ID to participate in an active QualMeet meeting.
    </p>
  </div>
  <div className="space-y-3">
    <input 
      value={roomId} 
      onChange={(e) => setRoomId(e.target.value)}
      className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-4 text-white text-center font-mono" 
      placeholder="ROOM_ID" 
    />
    <button onClick={handleJoin} disabled={!roomId} className="w-full py-5 rounded-2xl bg-[#111] text-white border border-white/10 font-black uppercase text-xs tracking-widest hover:bg-white hover:text-black transition-all disabled:opacity-20">
      Access Meeting
    </button>
  </div>
</div>
  );

}