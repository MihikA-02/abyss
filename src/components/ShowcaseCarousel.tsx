import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import mothershipImg from "@/assets/The Mothership.png";
import yachtAsset from "@/assets/yacht.png.asset.json";
import wreckImg from "@/assets/wreck.jpg";
import { Bubbles } from "@/components/Bubbles";
import cockpitImg from "@/assets/cockpit.png";
type Slide = {
  src: string;
  eyebrow: string;
  title: string;
  copy: string;
  buoyancy?: boolean;
};

const SLIDES: Slide[] = [
  {
    src: mothershipImg,
    eyebrow: "Surface — 0 m",
    title: "The Mothership",
    copy: "A 78-metre expedition yacht cradles the Explorer X1 between dives — six suites, a marine lab, and a horizon-facing lounge.",
    buoyancy: true,
  },
  {
    src: cockpitImg,
    eyebrow: "Interior — Titanium Shell",
    title: "The Cockpit",
    copy: "Concert-hall acoustics, hand-stitched leather, and a wraparound instrument arc that keeps every reading a glance away.",
  },
  {
    src: wreckImg,
    eyebrow: "Descent — 3,800 m",
    title: "Silent Cathedrals",
    copy: "Historical wrecks resting in perpetual night, illuminated for the first time in a century by the X1's twin xenon arrays.",
  },
];

const AUTOPLAY_MS = 6500;

export function ShowcaseCarousel() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const [mx, setMx] = useState(0);
  const [my, setMy] = useState(0);
  const stageRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  // autoplay
  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => setI((v) => (v + 1) % SLIDES.length), AUTOPLAY_MS);
    return () => clearTimeout(t);
  }, [i, paused]);

  // reset progress bar animation on slide change
  useEffect(() => {
    const el = progressRef.current;
    if (!el) return;
    el.style.animation = "none";
    // force reflow
    void el.offsetWidth;
    el.style.animation = paused ? "none" : `showcase-progress ${AUTOPLAY_MS}ms linear forwards`;
  }, [i, paused]);

  const onMouse = (e: React.MouseEvent) => {
    const r = stageRef.current?.getBoundingClientRect();
    if (!r) return;
    setMx(((e.clientX - r.left) / r.width - 0.5) * 2);
    setMy(((e.clientY - r.top) / r.height - 0.5) * 2);
  };
  const onLeave = () => {
    setMx(0);
    setMy(0);
  };

  const go = (n: number) => setI((n + SLIDES.length) % SLIDES.length);
  const active = SLIDES[i];

  return (
    <>
      <style>{`
        @keyframes showcase-progress { from { transform: scaleX(0); } to { transform: scaleX(1); } }
        @keyframes buoyancy {
          0%, 100% { transform: translate3d(0, 0, 0) rotate(-0.4deg); }
          50% { transform: translate3d(0, -14px, 0) rotate(0.4deg); }
        }
        @keyframes waveline {
          0% { transform: translateX(-25%); }
          100% { transform: translateX(0%); }
        }
        .showcase-image-enter { animation: showcase-fade 1100ms cubic-bezier(.2,.7,.2,1) both; }
        @keyframes showcase-fade {
          0% { opacity: 0; transform: scale(1.08) translateY(20px); filter: blur(12px); }
          100% { opacity: 1; transform: scale(1) translateY(0); filter: blur(0); }
        }
        .showcase-text-enter > * { animation: showcase-text 900ms cubic-bezier(.2,.7,.2,1) both; }
        .showcase-text-enter > *:nth-child(2) { animation-delay: 80ms; }
        .showcase-text-enter > *:nth-child(3) { animation-delay: 160ms; }
        @keyframes showcase-text {
          0% { opacity: 0; transform: translateY(14px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div
        ref={stageRef}
        onMouseMove={onMouse}
        onMouseLeave={onLeave}
        onMouseEnter={() => setPaused(true)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
        className="relative mt-16 overflow-hidden rounded-lg border border-primary/25 bg-gradient-to-b from-deep/60 to-abyss"
        style={{ boxShadow: "inset 0 1px 0 oklch(1 0 0 / 0.06), 0 40px 120px oklch(0 0 0 / 0.55)" }}
      >
        {/* parallax background wash */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            background:
              "radial-gradient(120% 80% at 50% 0%, oklch(0.85 0.14 210 / 0.18), transparent 55%), radial-gradient(80% 60% at 50% 100%, oklch(0.08 0.03 250 / 0.9), transparent 60%)",
            transform: `translate3d(${mx * -18}px, ${my * -12}px, 0)`,
            transition: "transform 400ms ease-out",
          }}
        />

        {/* stage */}
        <div className="relative aspect-[16/8] w-full overflow-hidden md:aspect-[16/7]">
          {SLIDES.map((s, idx) => {
            const isActive = idx === i;
            return (
              <div
                key={s.src}
                className="absolute inset-0"
                style={{
                  opacity: isActive ? 1 : 0,
                  transition: "opacity 900ms cubic-bezier(.2,.7,.2,1)",
                  pointerEvents: isActive ? "auto" : "none",
                }}
                aria-hidden={!isActive}
              >
                <div
                  className={isActive ? "showcase-image-enter absolute inset-0" : "absolute inset-0"}
                  style={{
                    transform: `translate3d(${mx * 22}px, ${my * 14}px, 0) scale(1.04)`,
                    transition: "transform 500ms ease-out",
                  }}
                >
                  <div
                    className="absolute inset-0"
                    style={s.buoyancy ? { animation: "buoyancy 7s ease-in-out infinite" } : undefined}
                  >
                    <img
                      src={s.src}
                      alt={s.title}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>

                {/* water surface glint for the yacht slide */}
                {s.buoyancy && (
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 top-1/2 h-24 -translate-y-1/2 opacity-70 mix-blend-screen"
                    style={{
                      background:
                        "repeating-linear-gradient(90deg, transparent 0 12px, oklch(0.95 0.12 205 / 0.16) 12px 14px, transparent 14px 26px)",
                      animation: "waveline 8s linear infinite",
                      maskImage:
                        "linear-gradient(180deg, transparent, black 40%, black 60%, transparent)",
                    }}
                  />
                )}
              </div>
            );
          })}

          {/* vignette + gradient for legibility */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, transparent 40%, oklch(0.08 0.03 250 / 0.85) 100%), linear-gradient(90deg, oklch(0.08 0.03 250 / 0.6), transparent 45%)",
            }}
          />

          {/* ambient bubbles overlay */}
          <div className="pointer-events-none absolute inset-0 opacity-70">
            <Bubbles count={14} />
          </div>

          {/* copy overlay */}
          <div key={`copy-${i}`} className="showcase-text-enter absolute inset-x-0 bottom-0 z-10 flex flex-col gap-3 p-6 md:p-10">
            <span className="text-[10px] uppercase tracking-[0.5em] text-primary/80">{active.eyebrow}</span>
            <h3 className="font-display text-3xl leading-tight text-glow md:text-5xl">{active.title}</h3>
            <p className="max-w-xl text-sm leading-relaxed text-foreground/75">{active.copy}</p>
          </div>

          {/* arrows */}
          <button
            aria-label="Previous slide"
            onClick={() => go(i - 1)}
            className="btn-outline-glow absolute left-4 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full md:flex"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            aria-label="Next slide"
            onClick={() => go(i + 1)}
            className="btn-outline-glow absolute right-4 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full md:flex"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        {/* progress rail + pagination */}
        <div className="relative flex items-center justify-between gap-6 border-t border-primary/15 bg-abyss/60 px-6 py-4 backdrop-blur-sm md:px-10">
          <div className="flex items-center gap-4 text-[10px] uppercase tracking-[0.4em] text-foreground/60">
            <span className="tabular-nums text-primary">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="text-foreground/30">/</span>
            <span className="tabular-nums">{String(SLIDES.length).padStart(2, "0")}</span>
          </div>

          <div className="flex flex-1 items-center gap-3">
            {SLIDES.map((s, idx) => (
              <button
                key={s.src}
                onClick={() => go(idx)}
                aria-label={`Go to ${s.title}`}
                className="group relative h-[2px] flex-1 overflow-hidden bg-primary/15"
              >
                <span
                  className="absolute inset-0 origin-left bg-primary/40 transition-transform duration-500"
                  style={{ transform: idx < i ? "scaleX(1)" : "scaleX(0)" }}
                />
                {idx === i && (
                  <span
                    ref={progressRef}
                    className="absolute inset-0 origin-left bg-primary shadow-[0_0_10px_var(--cyan-glow)]"
                    style={{ transform: "scaleX(0)" }}
                  />
                )}
              </button>
            ))}
          </div>

          <div className="hidden text-[10px] uppercase tracking-[0.4em] text-foreground/50 md:block">
            {paused ? "Paused" : "Auto"}
          </div>
        </div>
      </div>
    </>
  );
}
