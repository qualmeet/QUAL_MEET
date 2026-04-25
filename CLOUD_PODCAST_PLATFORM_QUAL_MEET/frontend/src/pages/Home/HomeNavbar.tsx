import { Link } from "react-router-dom";

export function HomeNavbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#050505]/80 backdrop-blur-md border-b border-white/5 px-6">
      <div className="max-w-7xl mx-auto h-20 flex justify-between items-center">
        <div className="text-xl font-black tracking-tighter italic">
          QUAL<span className="text-gray-600 not-italic">MEET</span><span className="text-blue-500">.</span>
        </div>

        <div className="flex gap-8 items-center">
          <Link to="/login" className="text-xs font-black uppercase tracking-widest text-gray-200 hover:text-white transition-colors">
            Sign In
          </Link>
          <Link to="/signup" className="px-6 py-2.5 bg-white text-black text-xs font-black uppercase tracking-widest rounded-full hover:scale-105 transition-all active:scale-95">
            Join
          </Link>
        </div>
      </div>
    </nav>
  );
}