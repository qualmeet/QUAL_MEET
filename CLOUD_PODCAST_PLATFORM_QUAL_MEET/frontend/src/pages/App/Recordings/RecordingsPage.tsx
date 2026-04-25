import { useEffect, useState } from "react";
import { getMyRecordings } from "@/api/recording";

type Recording = {
  id: string;
  roomId: string;
  finalRoomUrl: string;
  createdAt: string;
};

export default function RecordingsPage() {
  const [recordings, setRecordings] = useState<Recording[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await getMyRecordings();
        setRecordings(res.recordings);
      } catch {
        console.error("Failed to load recordings");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="animate-pulse text-white tracking-widest uppercase text-sm">
          Fetching Sessions...
        </div>
      </div>
    );
  }

 return (
    <div className="min-h-screen bg-[#050505] text-white p-6 lg:p-12">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="flex justify-between items-center border-b border-white/5 pb-6">
          <h2 className="text-2xl font-bold tracking-tight">Meeting Vault</h2>
          <span className="text-xs text-gray-500 bg-white/5 px-3 py-1 rounded-full">
            {recordings.length} Saved Recordings
          </span>
        </header>

        {recordings.length === 0 ? (
          <div className="text-center py-20 text-gray-600 border border-dashed border-white/10 rounded-3xl">
            No recording data found.
          </div>
        ) : (
          <div className="space-y-3">
            {/* Header Row for the table-style view */}
            <div className="hidden md:grid grid-cols-4 px-6 py-2 text-[10px] uppercase tracking-widest text-gray-500 font-bold">
              <div>Room Identity</div>
              <div>Date & Time</div>
              <div>Status</div>
              <div className="text-right">Actions</div>
            </div>

            {recordings.map((rec) => (
              <div
                key={rec.id}
                className="group grid grid-cols-1 md:grid-cols-4 items-center gap-4 p-4 md:p-6 rounded-xl bg-[#0A0A0A] border border-white/30 hover:bg-[#0F0F0F] hover:border-white transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-blue-500" />
                  <span className="font-mono text-sm tracking-tight text-white">{rec.roomId}</span>
                </div>

                <div className="text-xs text-gray-400">
                  {new Date(rec.createdAt).toLocaleString()}
                </div>

                <div>
                  <span className="text-[10px] bg-green-500/10 text-green-500 px-2 py-0.5 rounded border border-green-500/20">
                    Processed
                  </span>
                </div>

                <div className="flex justify-end gap-2">
                  <a
                    href={rec.finalRoomUrl}
                    target="_blank"
                    className="px-4 py-2 rounded-lg bg-white text-black text-xs font-bold hover:bg-gray-200 transition-colors"
                  >
                    Watch
                  </a>
                  <a
                    href={rec.finalRoomUrl}
                    download
                    className="px-4 py-2 rounded-lg bg-white/5 text-white border border-white/10 text-xs font-medium hover:bg-white/10 transition-colors"
                  >
                    Download
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}