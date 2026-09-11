export default function AvailabilityBanner() {
  return (
    <div
      role="status"
      aria-label="Zulker Nien is open to work"
      className="absolute left-1/2 top-6 z-40 inline-flex -translate-x-1/2 items-center gap-2.5 rounded-full border border-white/10 bg-zinc-950/70 px-4 py-2 backdrop-blur-md shadow-lg shadow-black/30"
    >
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
      </span>
      <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-slate-300">
        Open to work
      </span>
    </div>
  );
}