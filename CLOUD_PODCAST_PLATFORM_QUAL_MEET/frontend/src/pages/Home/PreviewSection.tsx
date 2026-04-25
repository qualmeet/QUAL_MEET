export default function PreviewSection() {
  const features = [
    { title: "Real-time Communication", desc: "Low-latency video powered by WebRTC for reliable conversations.", tag: "LIVE" },
    { title: "Multi-User Recording", desc: "Local perspective capture for maximum quality, synced to the cloud.", tag: "STUDIO" },
    { title: "Cloud Processing", desc: "Asynchronous worker systems merging streams into high-fidelity assets.", tag: "SYSTEM" },
    { title: "Final Output", desc: "Instant downloads of combined participant streams in high quality.", tag: "EXPORT" },
  ];

  return (
    <div className="relative w-full max-w-6xl mx-auto px-6 pb-40">
      {/* Main UI Preview */}
      <div className="relative group mb-32">
        <div className="absolute -inset-1 bg-blue-500/20 rounded-[3rem] blur-2xl opacity-20 transition duration-1000 group-hover:opacity-40" />
        <div className="relative bg-[#0A0A0A] border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl">
          <img
            src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1600"
            alt="QualMeet Interface"
            className="w-full h-125 object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-700"
          />
          <div className="absolute inset-0 bg-linear-to-t from-[#050505] via-transparent to-transparent" />
          
          <div className="absolute bottom-10 left-10 right-10 p-8 bg-black/40 backdrop-blur-2xl border border-white/10 rounded-3xl flex justify-between items-center">
            <div className="flex gap-5 items-center">
              <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center animate-pulse shadow-[0_0_20px_rgba(37,99,235,0.4)]">
                 <div className="w-3 h-3 bg-white rounded-full" />
              </div>
              <div className="text-left">
                <div className="text-lg font-bold tracking-tight">QualMeet v1.0</div>
                <div className="text-xs font-mono text-gray-500 uppercase tracking-widest">Active Processing...</div>
              </div>
            </div>
            <div className="hidden sm:flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full border-4 border-[#050505] bg-gray-800 bg-linear-to-tr from-gray-700 to-gray-900" />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Feature Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((f, idx) => (
          <div key={idx} className="p-8 rounded-3xl bg-[#0A0A0A] border border-white/5 hover:border-white/10 transition-all group">
            <div className="text-[9px] font-mono text-gray-600 mb-6 tracking-[0.3em] uppercase">{f.tag}</div>
            <h4 className="text-lg font-bold mb-3 tracking-tight group-hover:text-blue-400 transition-colors">{f.title}</h4>
            <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}