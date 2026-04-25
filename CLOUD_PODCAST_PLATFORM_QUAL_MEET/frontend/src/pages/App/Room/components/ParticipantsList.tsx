import { RoomParticipant } from "../types";

interface ParticipantListProps{
    participants:RoomParticipant[];
}


export function ParticipantsList({participants}:ParticipantListProps){

   return (
    <div className="w-full h-full bg-[#050505] flex flex-col">
      <div className="p-6 border-b border-white/5 flex justify-between items-end">
        <div>
          <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 mb-1">Atmosphere</h3>
          <p className="text-xl font-bold tracking-tighter text-white">Active Nodes</p>
        </div>
        <span className="text-[10px] font-mono font-bold text-green-500 bg-green-500/5 px-2 py-1 rounded border border-green-500/10">
          {participants.length} LIVE
        </span>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-1">
        {participants.map((p) => (
          <div key={p.socketId} className="flex items-center gap-4 p-3 rounded-2xl hover:bg-white/3 transition-all group">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-[#0A0A0A] flex items-center justify-center text-[10px] font-black text-white border border-white/10 group-hover:border-white/30 transition-all">
                {(p.fullName ?? "NA").substring(0, 2).toUpperCase()}
              </div>
              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-[#050505] rounded-full" />
            </div>
            
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-bold text-white truncate tracking-tight">{p.fullName ?? "Unknown user"}</p>
              <p className="text-[9px] text-gray-600 uppercase font-mono tracking-widest">{p.role || "Participant"}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}