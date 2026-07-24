import { useEffect, useRef, useState } from "react";

/**
 * Two-mode cursor system:
 *
 * MODE A — "Flashlight" (Mystery + Hero sections):
 *   Full cinematic dark overlay with a radial hole following the cursor.
 *   Fades out smoothly over ~400 px as the user scrolls past the Hero bottom.
 *
 * MODE B — "Underwater glow" (every section after Hero):
 *   No dark overlay. No masking. No brightness reduction.
 *   A soft additive cyan radial follows the cursor — pure ambience,
 *   enhancing immersion without touching readability.
 */
export function FlashlightCursor() {
  const flashRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  // 0 = fully in Hero (flashlight on)
  // 1 = fully past Hero (underwater glow only)
  const [progress, setProgress] = useState(0);

  // Track cursor position in a ref so the rAF loop can read it
  const cursorRef = useRef({ x: 0, y: 0, tx: 0, ty: 0 });

  /* ── Scroll: compute fade progress from Mystery through early Hero ── */
  useEffect(() => {

    const update = () => {
      // Find the Hero section to calculate our fade milestones
      const heroEl = document.querySelector<HTMLElement>('[data-section="hero"]');
      if (!heroEl) {
        setProgress(window.scrollY > 20 ? 1 : 0);
        return;
      }

      // fadeStart: as soon as the user starts scrolling from the top
      const fadeStart = 0;

      // fadeEnd: approx 20% into the Hero section
      const heroTop = heroEl.getBoundingClientRect().top + window.scrollY;
      const heroHeight = heroEl.offsetHeight;
      const fadeEnd = heroTop + (heroHeight * 0.20);

      const scrolled = window.scrollY;

      // clamp 0→1 between fadeStart and fadeEnd
      const p = Math.min(1, Math.max(0, (scrolled - fadeStart) / (fadeEnd - fadeStart)));
      setProgress(p);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  /* ── Pointer / touch tracking ── */
  useEffect(() => {
    const c = cursorRef.current;
    c.tx = window.innerWidth / 2;
    c.ty = window.innerHeight / 2;
    c.x = c.tx;
    c.y = c.ty;

    const onMove = (e: PointerEvent) => { c.tx = e.clientX; c.ty = e.clientY; };
    const onTouch = (e: TouchEvent) => {
      if (e.touches[0]) { c.tx = e.touches[0].clientX; c.ty = e.touches[0].clientY; }
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("touchmove", onTouch, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("touchmove", onTouch);
    };
  }, []);

  /* ── rAF loop: smooth cursor lerp + apply to both layers ── */
  useEffect(() => {
    const c = cursorRef.current;
    let raf = 0;

    const tick = () => {
      c.x += (c.tx - c.x) * 0.14;
      c.y += (c.ty - c.y) * 0.14;

      const px = `${c.x}px`;
      const py = `${c.y}px`;

      if (flashRef.current) {
        flashRef.current.style.setProperty("--fx", px);
        flashRef.current.style.setProperty("--fy", py);
      }
      if (glowRef.current) {
        glowRef.current.style.setProperty("--gx", px);
        glowRef.current.style.setProperty("--gy", py);
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Derived opacities — always cross-fade smoothly
  const flashOpacity = 1 - progress; // 1 in hero → 0 after hero
  const glowOpacity = progress;     // 0 in hero → 1 after hero

  return (
    <>
      {/* ── A: Cinematic flashlight overlay (Hero / Mystery only) ── */}
      <div
        ref={flashRef}
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[60]"
        style={{
          opacity: flashOpacity,
          transition: "opacity 80ms linear",
          // mix-blend-multiply darkens without affecting hue
          mixBlendMode: "multiply",
          background: `radial-gradient(
            circle 270px at var(--fx, 50%) var(--fy, 50%),
            transparent 0%,
            rgba(0,4,15,0.55) 42%,
            rgba(0,2,10,0.96) 100%
          )`,
        }}
      />

      {/* ── B: Underwater ambient glow (post-hero sections) ── */}
      <div
        ref={glowRef}
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[60]"
        style={{
          opacity: glowOpacity,
          transition: "opacity 80ms linear",
          // screen blend = purely additive, never darkens anything
          mixBlendMode: "screen",
          background: `radial-gradient(
            circle 180px at var(--gx, 50%) var(--gy, 50%),
            rgba(56, 200, 230, 0.055) 0%,
            rgba(30, 160, 200, 0.022) 55%,
            transparent 100%
          )`,
        }}
      />
    </>
  );
}
