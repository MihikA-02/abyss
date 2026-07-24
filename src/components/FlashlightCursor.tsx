import { useEffect, useRef, useState } from "react";

/**
 * Full-viewport dark overlay with a radial hole that follows the cursor.
 * Intensity dims naturally as the user scrolls deeper.
 *
 * Hero exception: when [data-section="hero"] is in the viewport, the effective
 * intensity is capped at 0.18 so the flashlight becomes a subtle atmospheric
 * accent rather than the primary light source. All other sections are unchanged.
 */
export function FlashlightCursor() {
  const ref = useRef<HTMLDivElement>(null);
  const [intensity, setIntensity] = useState(0.94);
  const [heroVisible, setHeroVisible] = useState(false);

  // Detect when the Hero section enters / leaves the viewport
  useEffect(() => {
    const heroEl = document.querySelector('[data-section="hero"]');
    if (!heroEl) return;
    const io = new IntersectionObserver(
      ([entry]) => setHeroVisible(entry.isIntersecting),
      { threshold: 0.1 },
    );
    io.observe(heroEl);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let tx = x;
    let ty = y;

    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };
    const onTouch = (e: TouchEvent) => {
      if (e.touches[0]) {
        tx = e.touches[0].clientX;
        ty = e.touches[0].clientY;
      }
    };

    let raf = 0;
    const tick = () => {
      x += (tx - x) * 0.18;
      y += (ty - y) * 0.18;
      if (ref.current) {
        ref.current.style.setProperty("--fx", `${x}px`);
        ref.current.style.setProperty("--fy", `${y}px`);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = Math.min(1, Math.max(0, window.scrollY / max));
      // Dark at top, fades to atmospheric 0.35 by 25%, then 0.2 rest of page.
      const eased = ratio < 0.25 ? 0.94 - (ratio / 0.25) * 0.6 : 0.34 - Math.min(0.15, (ratio - 0.25) * 0.2);
      setIntensity(Math.max(0.18, eased));
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("touchmove", onTouch, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // When the Hero is visible, clamp the overlay to a barely-there veil (0.18).
  // All other sections keep the full scroll-driven intensity unchanged.
  const effectiveIntensity = heroVisible ? Math.min(0.18, intensity) : intensity;

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[60] mix-blend-multiply transition-[background] duration-700"
      style={{
        background: `radial-gradient(circle 260px at var(--fx, 50%) var(--fy, 50%), transparent 0%, rgba(0,4,15,0.5) 45%, rgba(0,2,10,${effectiveIntensity}) 100%)`,
      }}
    />
  );
}
