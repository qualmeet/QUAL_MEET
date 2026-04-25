import { useNavigate } from "react-router-dom";
import CreateRoomCard from "./CreateRoomCard";
import JoinRoomCard from "./JoinRoomCard";

export default function Lobbypage() {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-full bg-[#050505] text-white overflow-hidden flex flex-col p-6 lg:p-12">
      
      <main className="flex-1 flex flex-col gap-6">
        {/* Row 1: The "Active" Tools (Similar Design) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-1/2">
          <div className="bg-[#0A0A0A] border border-white rounded-4xl overflow-hidden">
             <CreateRoomCard />
          </div>
          <div className="bg-[#0A0A0A] border border-white rounded-4xl overflow-hidden">
             <JoinRoomCard />
          </div>
        </div>

        
        {/* Row 2: The "Vault" Feature (Aesthetic & Condensed) */}
        <div 
        onClick={() => navigate("/app/recordings")}
        className="relative group cursor-pointer h-[28%] border border-blue-500 rounded-[2.5rem] p-10 flex items-center justify-between overflow-hidden hover:bg-[#0E0E0E] transition-all duration-500"
        >
        {/* Content Layer */}
        <div className="relative z-10 flex flex-col justify-center h-full max-w-[50%]">
            <div className="flex items-center gap-3 mb-3">
            <div className="h-1.5 w-1.5 rounded-full bg-blue-500 shadow-[0_0_10px_#3b82f6]" />
            <span className="text-[10px] font-mono text-blue-500/80 uppercase tracking-[0.5em] font-bold">
                Secure Archive
            </span>
            </div>

            <h3 className="text-5xl font-black tracking-tighter text-white mb-4">
            RECORDINGS
            </h3>

            <p className="text-gray-400 text-sm leading-relaxed font-sm">
            Watch your recorded meetings here, access anytime.
            </p>
        </div>

        {/* Right Side: Visual Navigation Element */}
        <div className="relative z-10 flex flex-col items-end justify-center h-full">
            <div className="group-hover:-translate-x-2.5 transition-transform duration-500 flex flex-col items-end gap-3">
                <div className="h-14 w-14 rounded-2xl border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:border-white transition-all duration-300">
                    <svg 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    className="w-6 h-6 text-white group-hover:text-black transition-colors"
                    strokeWidth="2.5"
                    >
                        <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
            </div>
        </div>

        </div>
      </main>
    </div>
  );

}