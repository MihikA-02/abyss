import { useMemo } from "react";

interface BubblesProps {
  count?: number;
  className?: string;
}

export function Bubbles({ count = 30, className = "" }: BubblesProps) {
  const bubbles = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => {
        const size = 6 + Math.random() * 28;
        return {
          key: i,
          left: `${Math.random() * 100}%`,
          size,
          delay: Math.random() * 12,
          duration: 10 + Math.random() * 14,
        };
      }),
    [count],
  );

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      {bubbles.map((b) => (
        <span
          key={b.key}
          className="bubble"
          style={{
            left: b.left,
            width: `${b.size}px`,
            height: `${b.size}px`,
            animationDelay: `${b.delay}s`,
            animationDuration: `${b.duration}s`,
          }}
        />
      ))}
    </div>
  );
}
