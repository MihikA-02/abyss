import { useEffect, useState } from "react";

export function Preloader() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let p = 0;
    const id = setInterval(() => {
      p += Math.random() * 8 + 4;
      if (p >= 100) {
        p = 100;
        clearInterval(id);
        setTimeout(() => setDone(true), 500);
      }
      setProgress(p);
    }, 90);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      aria-hidden={done}
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-abyss transition-opacity duration-1000 ${
        done ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <div className="text-center">
        <p className="mb-6 text-[10px] uppercase tracking-[0.6em] text-primary/60">Preparing descent</p>
        <h1 className="font-display text-6xl tracking-[0.5em] text-primary text-glow md:text-8xl">
          A B Y S S
        </h1>
        <div className="mx-auto mt-10 h-px w-64 overflow-hidden bg-primary/20">
          <div className="h-px bg-primary shadow-[0_0_10px_var(--cyan-glow)]" style={{ width: `${progress}%` }} />
        </div>
        <p className="mt-4 text-[10px] uppercase tracking-[0.4em] text-primary/50 tabular-nums">
          {String(Math.floor(progress)).padStart(3, "0")} / 100
        </p>
      </div>
    </div>
  );
}
