import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";

export default function HeroSection() {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  return (
    <section className="flex flex-col items-center text-center pt-28 pb-16 px-6 max-w-5xl mx-auto">
      {/* Decorative Ornament */}
      <div className="mb-6 flex items-center gap-4 opacity-40">
        <div className="h-px w-8 bg-linear-to-r from-transparent to-white" />
        <span className="text-[9px] font-medium uppercase tracking-[0.5em] text-white whitespace-nowrap">
        CAPTURE → UPLOAD → MERGE → PLAYBACK
      </span>
        <div className="h-px w-8 bg-linear-to-l from-transparent to-white" />
      </div>

      {/* Royal Styled Header */}
      <h1 className="mb-8 leading-tight">
        <span className="block text-5xl md:text-7xl font-light tracking-tight text-white font-serif italic mb-2">
          Your conversations,
        </span>
        <span className="block text-4xl md:text-6xl font-extrabold tracking-[0.15em] uppercase text-transparent bg-clip-text bg-linear-to-b from-gray-200 to-gray-500">
          Engineered to Last
        </span>
      </h1>

      {/* Subtext - More elegant leading */}
      <p className="max-w-xl text-md md:text-lg text-gray-500 mb-12 leading-relaxed font-light italic">
        QualMeet combines WebRTC video with a distributed pipeline, 
        capturing every perspective with studio-quality precision.
      </p>

      {!isAuthenticated ? (
        <div className="flex flex-row items-center gap-6">
          <Link to="/login">
            <button className="px-10 py-3 bg-white text-black font-bold uppercase tracking-[0.2em] text-[9px] rounded-sm hover:bg-gray-200 transition-all active:scale-95 shadow-xl shadow-white/5">
              Enter Studio
            </button>
          </Link>
          <div className="h-10 w-px bg-white/10 hidden sm:block" />
          <Link to="/signup">
            <button className="text-white font-light uppercase tracking-[0.2em] text-[9px] hover:text-gray-400 transition-colors border-b border-white/20 pb-1">
              Create Account
            </button>
          </Link>
        </div>
      ) : (
        <Link to="/app">
          <button className="px-10 py-3 bg-white text-black font-bold uppercase tracking-[0.2em] text-[9px] rounded-sm hover:scale-105 transition-transform">
            Go to Dashboard
          </button>
        </Link>
      )}
    </section>
  );
}