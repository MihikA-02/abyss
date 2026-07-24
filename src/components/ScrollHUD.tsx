import { useEffect, useState } from "react";

export function ScrollHUD() {
  const [depth, setDepth] = useState(0);
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = Math.min(1, Math.max(0, window.scrollY / max));
      setPct(ratio);
      setDepth(Math.round(ratio * 10994));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="pointer-events-none fixed right-5 top-1/2 z-[1000] hidden -translate-y-1/2 flex-col items-center gap-4 md:flex drop-shadow-[0_0_8px_rgba(0,0,0,0.4)]">
      <span className="text-[9px] uppercase tracking-[0.4em] text-white/80 drop-shadow-md">Depth</span>
      <span className="font-display text-2xl tabular-nums text-cyan-300 drop-shadow-[0_0_15px_rgba(34,211,238,0.8)]">
        {String(depth).padStart(5, "0")}
      </span>
      <span className="text-[9px] uppercase tracking-[0.4em] text-white/80 drop-shadow-md">meters</span>
      <div className="mt-2 h-56 w-[2px] bg-white/10 rounded-full overflow-hidden shadow-[inset_0_0_4px_rgba(0,0,0,0.5)]">
        <div className="w-full bg-cyan-300 shadow-[0_0_8px_var(--cyan-glow)] transition-all drop-shadow-[0_0_8px_rgba(34,211,238,1)]" style={{ height: `${pct * 100}%` }} />
      </div>
      <span
        className="pulse-dot h-2 w-2 rounded-full bg-cyan-300 drop-shadow-[0_0_12px_rgba(34,211,238,1)]"
        style={{ transform: `translateY(${-pct * 4}px)` }}
      />
    </div>
  );
}
