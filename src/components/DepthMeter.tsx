import { useEffect, useState } from "react";

export function DepthMeter() {
  const [depth, setDepth] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = Math.min(1, Math.max(0, window.scrollY / max));
      setDepth(Math.round(ratio * 6000));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed right-6 top-1/2 z-[1000] hidden -translate-y-1/2 flex-col items-center gap-3 md:flex pointer-events-none drop-shadow-[0_0_8px_rgba(0,0,0,0.4)]">
      <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-white/80 drop-shadow-md">Depth</span>
      <span className="font-display text-3xl text-cyan-300 drop-shadow-[0_0_15px_rgba(34,211,238,0.8)] tabular-nums">
        {String(depth).padStart(4, "0")}
      </span>
      <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-white/80 drop-shadow-md">m</span>
      <div className="mt-2 h-32 w-[2px] bg-white/10 rounded-full overflow-hidden shadow-[inset_0_0_4px_rgba(0,0,0,0.5)]">
        <div
          className="w-full bg-cyan-300 transition-all duration-300 drop-shadow-[0_0_8px_rgba(34,211,238,1)]"
          style={{ height: `${(depth / 6000) * 100}%` }}
        />
      </div>
      <span className="pulse-dot h-2 w-2 rounded-full bg-cyan-300 drop-shadow-[0_0_12px_rgba(34,211,238,1)]" />
    </div>
  );
}
