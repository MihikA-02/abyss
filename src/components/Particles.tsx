import { useMemo } from "react";

export function Particles({ count = 40, className = "" }: { count?: number; className?: string }) {
  const items = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        key: i,
        left: Math.random() * 100,
        size: 1 + Math.random() * 2.5,
        delay: Math.random() * 20,
        duration: 18 + Math.random() * 22,
        drift: (Math.random() - 0.5) * 60,
      })),
    [count],
  );

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      {items.map((p) => (
        <span
          key={p.key}
          className="particle"
          style={{
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDelay: `-${p.delay}s`,
            animationDuration: `${p.duration}s`,
            ["--drift" as string]: `${p.drift}px`,
          }}
        />
      ))}
    </div>
  );
}
