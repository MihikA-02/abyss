import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight, Play, Menu, X, Compass, Users, Clock, Camera, Shield, Waves, Leaf,
  Plus, Minus, Ship, Fish, Anchor, Gem, Radar, ChevronDown, Check,
} from "lucide-react";

import { LenisProvider } from "@/components/LenisProvider";
import { FlashlightCursor } from "@/components/FlashlightCursor";
import { ScrollHUD } from "@/components/ScrollHUD";
import { AmbientAudio } from "@/components/AmbientAudio";
import { AudioProvider, useAudio } from "@/components/AudioProvider";
import { Preloader } from "@/components/Preloader";
import { Bubbles } from "@/components/Bubbles";
import { Particles } from "@/components/Particles";
import { CountUp } from "@/components/CountUp";
import { ShowcaseCarousel } from "@/components/ShowcaseCarousel";
import jellyfishVid from "@/assets/jellyfish.mp4";
import reelVideo from "@/assets/reel.mov";
import heroImg from "@/assets/hero.jpg";
import whaleVid from "@/assets/whale.mp4";
import bioImg from "@/assets/bioluminescent.jpg";
import wreckImg from "@/assets/wreck.jpg";
import explorerX1 from "@/assets/explorer-x1.png";
import interiorAsset from "@/assets/interior.png.asset.json";
import ctaAsset from "@/assets/cta.png.asset.json";
import yachtAsset from "@/assets/yacht.png.asset.json";
import gallery1Img from "@/assets/gallery1.jpeg";
import gallery2Img from "@/assets/gallery2.jpeg";
import gallery3Img from "@/assets/gallery3.jpeg";
import gallery4Img from "@/assets/gallery4.jpeg";
import long1Img from "@/assets/long1.jpeg";
import long2Img from "@/assets/long2.jpeg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ABYSS: Cinematic Deep-Sea Expeditions" },
      {
        name: "description",
        content:
          "ABYSS operates private submarine expeditions into the world's deepest waters. Descend 10,994 meters aboard the Explorer X1 — luxury, science, and mystery in one journey.",
      },
      { property: "og:title", content: "ABYSS - Cinematic Deep-Sea Expeditions" },
      { property: "og:description", content: "Descend into the unknown. Private submarine expeditions to 10,994 meters." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Page,
});

export function Page() {
  return (
    <LenisProvider>
      <AudioProvider>
        <div className="bg-black text-foreground antialiased selection:bg-primary/30 selection:text-primary">
          <Preloader />
          <FlashlightCursor />
          <ScrollHUD />
          <AmbientAudio />
          <Nav />
          <main id="top" className="relative overflow-hidden bg-abyss text-foreground">
            <Mystery />
            <Hero />
            <Discovery />
            <Exploration />
            <Technology />
            <Luxury />
            <Gallery />
            <Testimonial />
            <FAQ />
            <Booking />
            <SiteFooter />
          </main>
        </div>
      </AudioProvider>
    </LenisProvider>
  );
}

/* ── Reveal helper ─────────────────────────────────────────── */
function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("is-in")),
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

/* ── NAV ───────────────────────────────────────────────────── */
function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onS = () => setScrolled(window.scrollY > 60);
    onS();
    window.addEventListener("scroll", onS, { passive: true });
    return () => window.removeEventListener("scroll", onS);
  }, []);

  const links = [
    ["Expeditions", "#exploration"],
    ["Vessel", "#technology"],
    ["Journey", "#luxury"],
    ["Gallery", "#gallery"],
    ["Book", "#book"],
  ] as const;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[1000] transition-all duration-500 ${scrolled ? "bg-black/60 backdrop-blur-md border-b border-primary/15" : "bg-gradient-to-b from-black/40 to-transparent backdrop-blur-[2px]"
        }`}
    >
      <div className="mx-auto flex max-w-[1500px] items-center justify-between px-6 py-5 md:px-10">
        <a href="#top" className="font-display text-lg tracking-[0.6em] text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.4)] hover:drop-shadow-[0_0_20px_rgba(34,211,238,0.6)] transition-all">
          A B Y S S
        </a>
        <nav className="hidden items-center gap-10 text-[10px] uppercase tracking-[0.35em] text-white/90 md:flex">
          {links.map(([l, h]) => (
            <a key={l} href={h} className="story-link drop-shadow-md transition-all hover:text-cyan-300 hover:drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">
              {l}
            </a>
          ))}
        </nav>
        <a
          href="#book"
          className="btn-outline-glow hidden rounded-full px-5 py-2.5 text-[10px] uppercase tracking-[0.3em] md:inline-flex bg-cyan-400/10 border border-cyan-400/50 text-white drop-shadow-[0_0_10px_rgba(34,211,238,0.5)] hover:bg-cyan-400/20 hover:border-cyan-400 transition-all"
        >
          Reserve Dive
        </a>
        <button
          onClick={() => setOpen((s) => !s)}
          className="btn-outline-glow flex h-10 w-10 items-center justify-center rounded-full md:hidden bg-cyan-400/10 border-cyan-400/50 text-white drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>
      {open && (
        <div className="border-t border-primary/20 bg-abyss/95 backdrop-blur-md md:hidden z-[1000]">
          <div className="flex flex-col gap-4 px-8 py-6 text-sm uppercase tracking-[0.3em]">
            {links.map(([l, h]) => (
              <a key={l} href={h} onClick={() => setOpen(false)} className="text-white/90 drop-shadow-md hover:text-cyan-300">
                {l}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

/* ── 1. MYSTERY ────────────────────────────────────────────── */
function Mystery() {
  return (
    <section id="mystery" className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black">
      <Particles count={30} />
      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <p className="mb-8 text-[10px] uppercase tracking-[0.6em] text-primary/60">Chapter I — Mystery</p>
        <h2 className="font-display text-4xl leading-[1.15] tracking-wide text-foreground/85 md:text-6xl">
          Ninety-five percent of the ocean<br />
          has never been seen<br />
          <span className="italic text-primary text-distort">by human eyes.</span>
        </h2>
        <p className="mx-auto mt-10 max-w-md text-sm text-foreground/50">
          Move your cursor. What you can see is what you dare to reach.
        </p>
        <ChevronDown className="mx-auto mt-14 h-5 w-5 animate-bounce text-primary/60" />
      </div>
    </section>
  );
}

/* ── 2. HERO ───────────────────────────────────────────────── */
function Hero() {
  const { pauseForReel, resumeFromReel } = useAudio();
  const [scrollY, setScrollY] = useState(0);
  const [reelOpen, setReelOpen] = useState(false);
  const [reelVisible, setReelVisible] = useState(false); // drives CSS transition
  const heroRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const darkOverlayRef = useRef<HTMLDivElement>(null);
  const raysRef = useRef<HTMLDivElement>(null);
  const reelRef = useRef<HTMLVideoElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const on = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    if (!heroRef.current || !videoRef.current || !darkOverlayRef.current || !raysRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    // Set initial dark state
    gsap.set(videoRef.current, { filter: "brightness(0.3) contrast(1) saturate(0.8) hue-rotate(0deg)" });
    gsap.set(darkOverlayRef.current, { opacity: 1 });
    gsap.set(raysRef.current, { opacity: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top bottom",
        end: "top top",
        scrub: 0.5,
        once: true
      }
    });

    tl.to(darkOverlayRef.current, { opacity: 0, ease: "none" }, 0);
    tl.to(videoRef.current, {
      filter: "brightness(1.65) contrast(1.1) saturate(1.5) hue-rotate(-8deg)",
      ease: "none"
    }, 0);
    tl.to(raysRef.current, { opacity: 0.35, ease: "none" }, 0.2);

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  /* ── Reel modal open/close ── */
  const openReel = () => {
    setReelOpen(true);
    document.body.style.overflow = "hidden";
    videoRef.current?.pause();
    pauseForReel();
    requestAnimationFrame(() => requestAnimationFrame(() => setReelVisible(true)));
  };

  const closeReel = () => {
    setReelVisible(false);
    setTimeout(() => {
      setReelOpen(false);
      if (reelRef.current) {
        reelRef.current.pause();
        reelRef.current.currentTime = 0;
      }
      document.body.style.overflow = "";
      videoRef.current?.play();
      resumeFromReel();
    }, 350);
  };

  // Esc key closes modal
  useEffect(() => {
    if (!reelOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeReel(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [reelOpen]);

  // Auto-play reel once mounted
  useEffect(() => {
    if (reelOpen && reelRef.current) {
      reelRef.current.play().catch(() => {/* autoplay blocked */ });
    }
  }, [reelOpen]);

  return (
    <>
      <section ref={heroRef} data-section="hero" className="relative flex min-h-[110vh] items-end overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
          style={{
            transform: `translateY(${scrollY * 0.15}px) scale(1.05)`,
            filter: "brightness(1.35) contrast(1.1) saturate(1.25)"
          }}
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>

        {/* Dark overlay for transition */}
        <div ref={darkOverlayRef} className="absolute inset-0 bg-black/0 pointer-events-none z-10" />

        {/* Vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-abyss/100" />

        <Bubbles count={38} />

        <div className="relative z-10 mx-auto flex w-full max-w-[1500px] flex-col gap-8 px-6 pb-24 md:px-10">
          <p className="text-[10px] uppercase tracking-[0.6em] text-accent">Chapter II — Discovery</p>
          <h1 className="font-display text-[19vw] leading-[0.85] tracking-[0.06em] text-heading md:text-[16rem]">
            ABYSS
          </h1>
          <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
            <p className="max-w-md text-sm uppercase tracking-[0.3em] text-body">
              The deepest luxury<br />
              expedition ever engineered<br />
              for private travellers.
            </p>
            <div className="flex flex-wrap items-center gap-6">
              <a
                href="#exploration"
                className="btn-outline-glow group flex items-center gap-4 rounded-full px-8 py-4 text-[10px] uppercase tracking-[0.35em]"
              >
                Begin The Descent
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </a>
              <button
                id="watch-reel-btn"
                onClick={openReel}
                className="group flex items-center gap-3 text-[10px] uppercase tracking-[0.35em] text-body hover:text-primary"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-primary/50 transition-colors group-hover:border-primary group-hover:bg-primary/10">
                  <Play className="h-3 w-3 fill-current" />
                </span>
                Watch Reel
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Reel Modal ─────────────────────────────────────────── */}
      {reelOpen && (
        <div
          ref={modalRef}
          id="reel-modal"
          onClick={(e) => { if (e.target === modalRef.current) closeReel(); }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: reelVisible ? "rgba(0,0,0,0.90)" : "rgba(0,0,0,0)",
            backdropFilter: reelVisible ? "blur(12px)" : "blur(0px)",
            WebkitBackdropFilter: reelVisible ? "blur(12px)" : "blur(0px)",
            transition: "background-color 300ms ease, backdrop-filter 300ms ease",
          }}
        >
          {/* Close button */}
          <button
            id="reel-close-btn"
            onClick={closeReel}
            aria-label="Close reel"
            style={{
              position: "absolute",
              top: "20px",
              right: "24px",
              zIndex: 10001,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "44px",
              height: "44px",
              borderRadius: "50%",
              border: "1px solid rgba(100,210,230,0.45)",
              background: "rgba(0,0,0,0.6)",
              color: "rgba(100,210,230,0.9)",
              fontSize: "20px",
              lineHeight: 1,
              cursor: "pointer",
              boxShadow: "0 0 16px rgba(80,200,220,0.25)",
              transition: "border-color 200ms, box-shadow 200ms, color 200ms",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(100,210,230,0.9)";
              (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 28px rgba(80,200,220,0.55)";
              (e.currentTarget as HTMLButtonElement).style.color = "#fff";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(100,210,230,0.45)";
              (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 16px rgba(80,200,220,0.25)";
              (e.currentTarget as HTMLButtonElement).style.color = "rgba(100,210,230,0.9)";
            }}
          >
            ×
          </button>

          {/* Video wrapper */}
          <div
            style={{
              transform: reelVisible ? "scale(1)" : "scale(0.95)",
              opacity: reelVisible ? 1 : 0,
              transition: "transform 350ms cubic-bezier(0.22,1,0.36,1), opacity 300ms ease",
              position: "relative",
              borderRadius: "18px",
              border: "1px solid rgba(80,200,220,0.35)",
              boxShadow: "0 0 60px rgba(60,180,210,0.20), 0 0 0 1px rgba(80,200,220,0.12)",
              overflow: "hidden",
              lineHeight: 0,
            }}
          >
            <video
              ref={reelRef}
              id="reel-video"
              controls
              playsInline
              style={{
                display: "block",
                maxWidth: "95vw",
                maxHeight: "95vh",
                objectFit: "contain",
                borderRadius: "17px",
              }}
            >
              <source src={reelVideo} type="video/mp4" />
            </video>
          </div>
        </div>
      )}
    </>
  );
}

/* ── 3. DISCOVERY — moving stats ───────────────────────────── */
function Discovery() {
  const stats = [
    { v: 10994, s: "m", label: "Maximum descent depth" },
    { v: 236, s: "", label: "Private dives completed" },
    { v: 47, s: "", label: "Species catalogued" },
    { v: 12, s: "", label: "International expeditions" },
  ];
  const ref = useReveal<HTMLDivElement>();
  return (
    <section
      id="discovery"
      className="relative overflow-hidden py-40"
      style={{
        background:
          "linear-gradient(180deg, #02060D 0%, #071A27 30%, #0A2233 55%, #071A27 75%, #02060D 100%)",
      }}
    >
      <Particles count={18} />
      <div ref={ref} className="reveal relative z-10 mx-auto max-w-[1500px] px-6 md:px-10">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="mb-6 text-[10px] uppercase tracking-[0.6em] text-primary/70">Chapter III — Numbers of the Deep</p>
            <h2 className="font-display text-5xl leading-[1.05] md:text-7xl">
              A private<br />
              <span className="italic text-primary">observatory</span><br />
              for the underworld.
            </h2>
          </div>
          <p className="self-end text-sm leading-relaxed text-foreground/70">
            Every ABYSS voyage is a research mission wearing evening dress. Our vessels descend where light doesn't,
            and return with sightings, sonar data, and stories no surface world has heard before.
          </p>
        </div>

        <div className="mt-20 grid grid-cols-2 gap-y-14 border-t border-primary/20 pt-14 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col gap-2">
              <span className="font-display text-5xl text-primary text-glow md:text-6xl">
                <CountUp to={s.v} suffix={s.s} />
              </span>
              <span className="text-[10px] uppercase tracking-[0.3em] text-foreground/55">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── 4. EXPLORATION — pinned whale reveal ──────────────────── */
function Exploration() {
  const [scrollY, setScrollY] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const on = () => {
      if (!ref.current) return;
      const r = ref.current.getBoundingClientRect();
      const p = 1 - Math.max(0, Math.min(1, (r.top + r.height / 2) / window.innerHeight));
      setScrollY(p);
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <section id="exploration" ref={ref} className="relative min-h-[130vh] overflow-hidden">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src={whaleVid} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-abyss/40 via-transparent to-abyss" />
      <Bubbles count={25} />

      <div className="sticky top-0 flex min-h-screen items-center px-6 md:px-16">
        <div className="max-w-lg">
          <p className="mb-4 text-[10px] uppercase tracking-[0.6em] text-primary/70">Chapter IV — Exploration</p>
          <h2 className="font-display text-5xl leading-[1.05] md:text-7xl">
            Meet the<br />
            <span className="italic text-primary text-glow">quiet titans</span>
          </h2>
          <p className="mt-8 text-sm leading-relaxed text-foreground/75">
            From bioluminescent gardens at 900 metres to the migratory highways of humpbacks, every dive is
            choreographed with marine biologists so you meet the ocean's residents on their terms.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ── 5. TECHNOLOGY — submarine + specs ─────────────────────── */
function Technology() {
  const [rot, setRot] = useState(0);
  const [y, setY] = useState(0);
  useEffect(() => {
    const on = (e: MouseEvent) => {
      setRot(((e.clientX / window.innerWidth) - 0.5) * 10);
      setY(((e.clientY / window.innerHeight) - 0.5) * 20);
    };
    window.addEventListener("mousemove", on);
    return () => window.removeEventListener("mousemove", on);
  }, []);
  const specs = [
    { icon: Compass, label: "Depth capacity", value: "11,000 m" },
    { icon: Users, label: "Passengers", value: "6 guests · 2 crew" },
    { icon: Clock, label: "Dive duration", value: "8 – 14 hours" },
    { icon: Camera, label: "Viewport", value: "360° panoramic dome" },
    { icon: Shield, label: "Hull", value: "Titanium ⌀ 90 mm" },
    { icon: Waves, label: "Life support", value: "96 hours autonomous" },
  ];
  const ref = useReveal<HTMLDivElement>();

  return (
    <section id="technology" className="relative overflow-hidden py-40">
      <Particles count={22} />
      <div ref={ref} className="reveal relative z-10 mx-auto max-w-[1500px] px-6 md:px-10">
        <div className="mb-16 flex items-end justify-between">
          <div>
            <p className="mb-4 text-[10px] uppercase tracking-[0.6em] text-primary/70">Chapter V — Technology</p>
            <h2 className="font-display text-5xl leading-[1.05] md:text-7xl">
              Explorer<span className="italic text-primary"> X1</span>
            </h2>
          </div>
          <p className="hidden max-w-xs text-sm text-foreground/70 md:block">
            Built with aerospace tolerances, tuned like a Steinway.
          </p>
        </div>

        <div className="relative">
          <img src={explorerX1}
            alt="Abyss Explorer X1 submersible"
            className="w-full h-[70vh] object-cover transition-transform duration-500 ease-out"
            style={{ transform: `perspective(1500px) rotateY(${rot}deg) translateY(${y}px)` }}
            loading="lazy"
          />
        </div>

        <div className="mt-24 grid gap-8 border-t border-primary/20 pt-14 md:grid-cols-3">
          {specs.map((s) => {
            const I = s.icon;
            return (
              <div key={s.label} className="flex items-start gap-4">
                <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border border-primary/40 bg-primary/5">
                  <I className="h-4 w-4 text-primary" strokeWidth={1.5} />
                </span>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-foreground/50">{s.label}</p>
                  <p className="mt-1 font-display text-2xl text-foreground">{s.value}</p>
                </div>
              </div>
            );
          })}
        </div>

        <ShowcaseCarousel />

      </div>
    </section>
  );
}

/* ── 6. LUXURY — chained glass expeditions ─────────────────── */
const EXPERIENCES = [
  {
    id: "signature",
    icon: Ship,
    title: "Signature Expedition",
    subtitle: "Three-day cinematic voyage across trench, reef and wreck.",
    description: "Experience the ultimate deep-sea adventure. A comprehensive journey through diverse underwater ecosystems, from bioluminescent gardens to historic abyssal plains.",
    duration: "3 Days",
    guests: "Up to 6",
    depth: "4,500 m",
    difficulty: "Beginner Friendly",
    includes: ["Luxury Ocean Suite", "Gourmet Dining", "Marine Biologist Guide", "Underwater Photography", "Two Deep Dives", "Private Transfers"],
    price: "$14,999 / Person",
    buttonText: "Reserve Expedition"
  },
  {
    id: "marine",
    icon: Fish,
    title: "Marine Encounters",
    subtitle: "Chartered dives synchronised with seasonal migrations.",
    description: "Witness the ocean's most magnificent creatures in their natural habitat. Carefully timed with marine life migrations for unparalleled observation opportunities.",
    duration: "2 Days",
    guests: "Up to 8",
    depth: "1,200 m",
    difficulty: "Easy",
    includes: ["Guided Wildlife Excursions", "Professional Photography", "Marine Naturalist", "Luxury Cabin Stay", "Fine Dining Experience", "Snorkeling Equipment"],
    price: "$8,999 / Person",
    buttonText: "Book Experience"
  },
  {
    id: "wreck",
    icon: Anchor,
    title: "Wreck Archaeology",
    subtitle: "Descend to lost hulls with resident maritime historians.",
    description: "Explore sunken history. Dive deep to investigate historical wrecks with expert archaeologists who bring the forgotten past vividly to life.",
    duration: "4 Days",
    guests: "Up to 4",
    depth: "3,800 m",
    difficulty: "Intermediate",
    includes: ["Historic Wreck Expeditions", "Maritime Archaeologist", "Deep Dive Equipment", "Research Briefings", "Luxury Accommodation", "Expedition Documentary"],
    price: "$16,499 / Person",
    buttonText: "Reserve Dive"
  },
  {
    id: "charter",
    icon: Gem,
    title: "Private Charter",
    subtitle: "The Explorer X1 and her crew reserved solely for your party.",
    description: "The ultimate bespoke deep-sea experience. Complete freedom to chart your own course into the abyss, with our world-class team entirely at your disposal.",
    duration: "Flexible (1–7 Days)",
    guests: "Up to 6",
    depth: "4,500 m",
    difficulty: "Custom Experience",
    includes: ["Exclusive Explorer X1 Charter", "Dedicated Captain & Crew", "Personalized Itinerary", "Private Chef", "Luxury Suites", "VIP Concierge Service"],
    price: "$54,000 / Charter",
    buttonText: "Request Charter"
  },
  {
    id: "science",
    icon: Radar,
    title: "Science Missions",
    subtitle: "Contribute to real research alongside our biologists.",
    description: "Join active marine research. Gather critical data, deploy scientific instruments, and explore uncharted territories with leading marine scientists.",
    duration: "5 Days",
    guests: "Up to 5",
    depth: "4,000 m",
    difficulty: "Moderate",
    includes: ["Research Participation", "Ocean Sampling Activities", "Marine Scientist Mentorship", "Expedition Certification", "Premium Accommodation", "Daily Scientific Briefings"],
    price: "$9,999 / Person",
    buttonText: "Join Mission"
  },
  {
    id: "cinematic",
    icon: Camera,
    title: "Cinematic Studio",
    subtitle: "8K deep-water film and photography with an on-board team.",
    description: "Capture the deep ocean in unprecedented fidelity. Built for professional filmmakers, documentarians, and those who demand the highest quality visual record.",
    duration: "3 Days",
    guests: "Up to 6",
    depth: "2,500 m",
    difficulty: "Easy",
    includes: ["8K Underwater Filming", "Professional Camera Crew", "Drone & ROV Footage", "Cinematic Color Grading", "Behind-the-Scenes Coverage", "Edited Highlight Film"],
    price: "$22,000 / Project",
    buttonText: "Book Production"
  }
];

function Luxury() {
  const [activeExp, setActiveExp] = useState<typeof EXPERIENCES[0] | null>(null);
  const ref = useReveal<HTMLDivElement>();

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveExp(null);
    };
    if (activeExp) {
      window.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [activeExp]);

  return (
    <section id="luxury" className="relative py-40">
      <img src={yachtAsset.url} alt="" className={`absolute inset-0 h-full w-full object-cover opacity-40 transition-all duration-500 ${activeExp ? 'blur-sm brightness-50' : ''}`} loading="lazy" aria-hidden />
      <div className={`absolute inset-0 bg-gradient-to-b from-abyss via-abyss/70 to-abyss transition-all duration-500 ${activeExp ? 'opacity-80' : 'opacity-100'}`} />

      {/* Background container that blurs and darkens when modal is open */}
      <div className={`relative w-full h-full transition-all duration-500 ${activeExp ? 'blur-[8px] brightness-50' : ''}`}>
        <Bubbles count={20} />

        <div ref={ref} className="reveal relative z-10 mx-auto max-w-[1500px] px-6 md:px-10">
          <div className="mb-20 max-w-2xl">
            <p className="mb-4 text-[10px] uppercase tracking-[0.6em] text-primary/70">Chapter VI — Luxury</p>
            <h2 className="font-display text-5xl leading-[1.05] md:text-7xl">
              Six ways to<br /><span className="italic text-primary">disappear</span> below.
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {EXPERIENCES.map((it, i) => {
              const I = it.icon;
              return (
                <article
                  key={it.title}
                  onClick={() => setActiveExp(it)}
                  className="glass-card float-sway group relative rounded-md p-8 cursor-pointer transition-all hover:bg-white/5 active:scale-[0.98]"
                  style={{ animationDelay: `${i * 0.35}s`, animationDuration: `${7 + (i % 3)}s` }}
                >
                  <span className="mb-8 flex h-12 w-12 items-center justify-center rounded-full border border-primary/40 bg-primary/5 transition-colors group-hover:bg-primary/15">
                    <I className="h-5 w-5 text-primary" strokeWidth={1.3} />
                  </span>
                  <h3 className="font-display text-2xl leading-tight">{it.title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-foreground/70">{it.subtitle}</p>
                  <div className="mt-8 flex items-center justify-between text-[10px] uppercase tracking-[0.3em] text-primary/60">
                    <span>0{i + 1} / 06</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:rotate-45 group-active:rotate-90" />
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>

      {/* Modal Overlay */}
      <div
        className={`fixed inset-0 z-[2000] flex items-center justify-center p-4 transition-all duration-500 ${activeExp ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        onClick={() => setActiveExp(null)}
      >
        <div className={`absolute inset-0 bg-black/40 backdrop-blur-md transition-opacity duration-500 ${activeExp ? 'opacity-100' : 'opacity-0'}`} />

        {/* Modal Content */}
        <div
          className={`relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-[24px] border border-cyan-400/30 bg-abyss/80 p-8 md:p-12 shadow-[0_0_50px_rgba(34,211,238,0.15)] backdrop-blur-xl transition-all duration-500 md:rounded-[32px] ${activeExp ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-4'
            }`}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => setActiveExp(null)}
            className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-foreground/70 transition-all hover:bg-white/10 hover:text-white"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>

          {activeExp && (
            <div className="flex flex-col gap-8">
              <div className="max-w-xl pr-12">
                <h3 className="font-display text-4xl text-white md:text-5xl">{activeExp.title}</h3>
                <p className="mt-3 text-lg text-primary/90">{activeExp.subtitle}</p>
                <p className="mt-4 text-sm leading-relaxed text-foreground/70">{activeExp.description}</p>
              </div>

              <div className="h-[1px] w-full bg-primary/20" />

              <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
                <div className="flex flex-col gap-2">
                  <span className="text-[9px] uppercase tracking-[0.3em] text-primary/60">Duration</span>
                  <span className="font-display text-xl text-white">{activeExp.duration}</span>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-[9px] uppercase tracking-[0.3em] text-primary/60">Guests</span>
                  <span className="font-display text-xl text-white">{activeExp.guests}</span>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-[9px] uppercase tracking-[0.3em] text-primary/60">Max Depth</span>
                  <span className="font-display text-xl text-white">{activeExp.depth}</span>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-[9px] uppercase tracking-[0.3em] text-primary/60">Difficulty</span>
                  <span className="font-display text-xl text-white">{activeExp.difficulty}</span>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <span className="text-[10px] uppercase tracking-[0.3em] text-primary/60">Included</span>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {activeExp.includes.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-sm text-foreground/80">
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10">
                        <Check className="h-3 w-3 text-primary" />
                      </div>
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="h-[1px] w-full bg-primary/20" />

              <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-primary/60">Starting From</span>
                  <span className="font-display text-3xl text-white">{activeExp.price}</span>
                </div>

                <a
                  href="#book"
                  onClick={() => setActiveExp(null)}
                  className="btn-outline-glow group flex items-center gap-4 rounded-full bg-primary/10 px-8 py-4 text-[10px] uppercase tracking-[0.35em] text-white transition-all hover:bg-primary/20 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]"
                >
                  {activeExp.buttonText}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ── 7. GALLERY — editorial portrait + 2×2 grid ──────────────── */
function Gallery() {
  const ref = useReveal<HTMLDivElement>();

  const portraits = [
    { src: long1Img, tag: "Bioluminescent Cascade · 900 m", side: "left" },
    { src: long2Img, tag: "Midnight Trench Wall · 4200 m", side: "right" },
  ];

  const center = [
    { src: gallery1Img, tag: "Reef Threshold · 30 m" },
    { src: gallery2Img, tag: "Humpback Passage · 60 m" },
    { src: gallery3Img, tag: "SS Meridian · 1240 m" },
    { src: gallery4Img, tag: "Trench Approach · 6100 m" },
  ];

  return (
    <section id="gallery" className="relative overflow-hidden py-40">
      <div ref={ref} className="reveal mx-auto max-w-[1500px] px-6 md:px-10">
        {/* ── Header ── */}
        <div className="mb-16 flex items-end justify-between gap-8">
          <div>
            <p className="mb-4 text-[10px] uppercase tracking-[0.6em] text-primary/70">Chapter VII — Field Notes</p>
            <h2 className="font-display text-5xl leading-[1.05] md:text-7xl">
              What we've<br /><span className="italic text-primary">seen down there.</span>
            </h2>
          </div>
          <a
            href="#book"
            className="hidden text-[10px] uppercase tracking-[0.35em] text-primary/70 hover:text-primary md:inline story-link"
          >
            Request full archive
          </a>
        </div>

        {/* ── Editorial layout: portrait | 2×2 grid | portrait ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 2fr 1fr",
            gap: "12px",
            alignItems: "stretch",
            height: "640px",
          }}
        >
          {/* Left portrait */}
          <figure
            className="group relative overflow-hidden rounded-xl border border-primary/20"
            style={{
              boxShadow: "0 0 0 1px rgba(var(--color-primary-rgb, 100,180,210),0.08), 0 8px 40px rgba(0,0,0,0.55)",
            }}
          >
            <img
              src={long1Img}
              alt={portraits[0].tag}
              className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
              style={{ minHeight: "100%" }}
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-abyss/90 via-abyss/25 to-transparent" />
            <div
              className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
              style={{ background: "radial-gradient(ellipse at 50% 100%, rgba(var(--color-primary-rgb,100,180,210),0.12) 0%, transparent 70%)" }}
            />
            <figcaption className="absolute bottom-5 left-5 right-5">
              <span className="block text-[9px] uppercase tracking-[0.4em] text-primary/80 transition-colors duration-300 group-hover:text-primary">
                {portraits[0].tag}
              </span>
            </figcaption>
          </figure>

          {/* Center 2×2 grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gridTemplateRows: "1fr 1fr",
              gap: "12px",
            }}
          >
            {center.map((s, i) => (
              <figure
                key={i}
                className="group relative overflow-hidden rounded-xl border border-primary/20"
                style={{
                  boxShadow: "0 0 0 1px rgba(var(--color-primary-rgb, 100,180,210),0.06), 0 6px 30px rgba(0,0,0,0.45)",
                }}
              >
                <img
                  src={s.src}
                  alt={s.tag}
                  className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-abyss/85 via-abyss/20 to-transparent" />
                <div
                  className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                  style={{ background: "radial-gradient(ellipse at 50% 100%, rgba(var(--color-primary-rgb,100,180,210),0.10) 0%, transparent 65%)" }}
                />
                <figcaption className="absolute bottom-4 left-4 right-4">
                  <span className="block text-[9px] uppercase tracking-[0.4em] text-primary/80 transition-colors duration-300 group-hover:text-primary">
                    {s.tag}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>

          {/* Right portrait */}
          <figure
            className="group relative overflow-hidden rounded-xl border border-primary/20"
            style={{
              boxShadow: "0 0 0 1px rgba(var(--color-primary-rgb, 100,180,210),0.08), 0 8px 40px rgba(0,0,0,0.55)",
            }}
          >
            <img
              src={long2Img}
              alt={portraits[1].tag}
              className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
              style={{ minHeight: "100%" }}
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-abyss/90 via-abyss/25 to-transparent" />
            <div
              className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
              style={{ background: "radial-gradient(ellipse at 50% 100%, rgba(var(--color-primary-rgb,100,180,210),0.12) 0%, transparent 70%)" }}
            />
            <figcaption className="absolute bottom-5 left-5 right-5">
              <span className="block text-[9px] uppercase tracking-[0.4em] text-primary/80 transition-colors duration-300 group-hover:text-primary">
                {portraits[1].tag}
              </span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

/* ── 8. TESTIMONIAL / Quote ────────────────────────────────── */
function Testimonial() {
  const ref = useReveal<HTMLQuoteElement>();
  return (
    <section className="relative overflow-hidden py-40">
      {/* Background Video */}
      <video
        className="absolute inset-0 z-0 h-full w-full object-cover opacity-45"
        autoPlay
        muted
        loop
        playsInline
        style={{
          maskImage: "linear-gradient(to bottom, transparent 0%, black 5%, black 95%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 5%, black 95%, transparent 100%)"
        }}
      >
        <source src={jellyfishVid} type="video/mp4" />
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 z-[1] bg-black/55" />

      <Bubbles count={12} />
      <Bubbles count={12} />
      <blockquote ref={ref} className="reveal relative z-20 mx-auto max-w-4xl px-6 text-center md:px-10">
        <span className="font-display text-6xl leading-none text-primary">“</span>
        <p className="mt-6 font-display text-3xl leading-[1.3] text-foreground md:text-4xl">
          Nothing above the waterline prepares you for what waits below. ABYSS didn't show us the ocean —
          it introduced us to it.
        </p>
        <footer className="mt-10 text-[10px] uppercase tracking-[0.4em] text-primary/70">
          Dr. Ines Halvorsen · Marine Biologist, Explorer XI
        </footer>
      </blockquote>
    </section>
  );
}

/* ── 9. FAQ ────────────────────────────────────────────────── */
function FAQ() {
  const items = [
    { q: "Do I need diving experience?", a: "Not at all. Every expedition is designed for both first-time explorers and seasoned adventurers." },
    { q: "How long is a full expedition?", a: "Signature expeditions run three to five days, including surface acclimatisation, briefings, and dive sequences." },
    { q: "What departure ports do you operate from?", a: "Our expeditions depart from Hobart's private marina facilities, with exact boarding details shared exclusively after your expedition has been confirmed." },
    { q: "Is a private charter available?", a: "Yes. Reserve Explorer X1 exclusively for an intimate expedition with your chosen guests." },
    { q: "What is the safety protocol?", a: "Every voyage is supported by certified crew, advanced navigation systems, and comprehensive safety procedures." },
  ];
  const [open, setOpen] = useState<number | null>(0);
  const ref = useReveal<HTMLDivElement>();

  return (
    <section id="faq" className="relative overflow-hidden py-40">
      <div ref={ref} className="reveal mx-auto grid max-w-[1500px] gap-16 px-6 md:grid-cols-[1fr_1.4fr] md:px-10">
        <div>
          <p className="mb-4 text-[10px] uppercase tracking-[0.6em] text-primary/70">Chapter VIII — Before You Descend</p>
          <h2 className="font-display text-5xl leading-[1.05] md:text-6xl">
            Questions from<br /><span className="italic text-primary">the surface.</span>
          </h2>
          <div className="mt-10 flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-foreground/60">
            <Leaf className="h-4 w-4 text-primary" />
            Every voyage funds marine conservation.
          </div>
        </div>
        <div>
          {items.map((it, i) => {
            const isOpen = open === i;
            return (
              <div key={it.q} className="border-b border-primary/15">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-display text-xl md:text-2xl">{it.q}</span>
                  <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-primary/40 text-primary transition-transform">
                    {isOpen ? <Minus className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
                  </span>
                </button>
                <div
                  className="grid overflow-hidden transition-all duration-500"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="min-h-0">
                    <p className="pb-6 pr-14 text-sm leading-relaxed text-foreground/70">{it.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── 10. BOOKING ───────────────────────────────────────────── */
function Booking() {
  const [sent, setSent] = useState(false);
  return (
    <section id="book" className="relative min-h-screen overflow-hidden">

      <div className="absolute inset-0 bg-gradient-to-b from-abyss/60 via-abyss/30 to-abyss" />
      <Bubbles count={26} />

      <div className="relative z-10 mx-auto grid max-w-[1500px] gap-16 px-6 py-32 md:grid-cols-[1fr_520px] md:px-10">
        <div className="flex flex-col justify-center">
          <p className="mb-4 text-[10px] uppercase tracking-[0.6em] text-primary/80">Chapter IX — The Descent</p>
          <h2 className="font-display text-5xl leading-[0.95] tracking-[0.02em] text-glow md:text-8xl">
            The deep<br />is <span className="italic text-primary">waiting.</span>
          </h2>
          <p className="mt-8 max-w-md text-sm text-foreground/70">
            Reservations are opened by invitation and continuous waitlist. Share a few details and our concierge
            will contact you within one working day.
          </p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
          className="glass-card rounded-md p-8 md:p-10"
        >
          {sent ? (
            <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-primary bg-primary/10">
                <Waves className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-display text-3xl">Signal received.</h3>
              <p className="mt-4 max-w-xs text-sm text-foreground/70">
                Our concierge will surface with a personal briefing within 24 hours.
              </p>
            </div>
          ) : (
            <>
              <h3 className="font-display text-3xl">Reserve your dive</h3>
              <p className="mt-2 text-xs uppercase tracking-[0.3em] text-primary/70">Private concierge · 24h response</p>
              <div className="mt-8 grid gap-5">
                <Field label="Full name" name="name" required />
                <Field label="Email" name="email" type="email" required />
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Party size" name="party" type="number" defaultValue="2" />
                  <Select label="Expedition" name="exp" options={["Signature", "Private charter", "Science mission", "Wreck archaeology"]} />
                </div>
                <Field label="Preferred window" name="window" placeholder="e.g. Autumn 2027" />
              </div>
              <button
                type="submit"
                className="btn-outline-glow group mt-8 flex w-full items-center justify-center gap-4 rounded-full py-4 text-[10px] uppercase tracking-[0.4em]"
              >
                Request Invitation
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </button>
            </>
          )}
        </form>
      </div>
    </section>
  );
}

function Field({ label, name, type = "text", ...rest }: React.InputHTMLAttributes<HTMLInputElement> & { label: string; name: string }) {
  return (
    <label className="block">
      <span className="mb-2 block text-[9px] uppercase tracking-[0.4em] text-foreground/60">{label}</span>
      <input
        name={name}
        type={type}
        className="w-full border-b border-primary/30 bg-transparent py-2 text-sm text-foreground placeholder-foreground/30 outline-none transition-colors focus:border-primary"
        {...rest}
      />
    </label>
  );
}
function Select({ label, name, options }: { label: string; name: string; options: string[] }) {
  return (
    <label className="block">
      <span className="mb-2 block text-[9px] uppercase tracking-[0.4em] text-foreground/60">{label}</span>
      <select
        name={name}
        className="w-full border-b border-primary/30 bg-transparent py-2 text-sm text-foreground outline-none focus:border-primary"
      >
        {options.map((o) => (
          <option key={o} value={o} className="bg-abyss">
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}

/* ── Footer ────────────────────────────────────────────────── */
function SiteFooter() {
  const handleScrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-primary/15 bg-abyss px-6 py-14 text-[10px] uppercase tracking-[0.3em] text-foreground/50 md:px-10">
      <div className="mx-auto max-w-[1500px]">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <a
              href="#top"
              onClick={handleScrollToTop}
              className="group inline-block font-display text-lg tracking-[0.6em] text-primary transition-colors hover:text-cyan-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-abyss"
              aria-label="Scroll to top"
            >
              A B Y S S
            </a>
            <p className="mt-4 normal-case tracking-normal text-foreground/50">
              Private expeditions into the world's least-known frontier.
            </p>
          </div>
          <FooterCol
            title="VOYAGE"
            items={[
              { label: "Expeditions", href: "#exploration" },
              { label: "Vessel", href: "#technology" },
              { label: "Science", href: "#discovery" },
              { label: "Journal", href: "#gallery" }
            ]}
          />
          <FooterCol
            title="DISCOVER"
            items={[
              { label: "The Mission", href: "#mystery" },
              { label: "Our Crew", href: "#mystery" },
              { label: "Ocean Research", href: "#discovery" },
              { label: "Partners", href: "#book" }
            ]}
          />
          <FooterCol
            title="CONTACT"
            items={[
              { label: "Hobart, Australia", href: "https://maps.google.com/?q=Hobart,Australia" },
              { label: "Schedule an Expedition", href: "#book" },
              { label: "+1 (800) 555-ABYS", href: "tel:+18005552297" },
              { label: "concierge@abyss.co", href: "mailto:concierge@abyss.co" }
            ]}
          />
        </div>
        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-primary/15 pt-8 md:flex-row md:items-center">
          <span>© {new Date().getFullYear()} ABYSS Expeditions</span>
          <div className="flex gap-6">
            <a href="#" className="transition-all hover:text-primary hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.5)] focus-visible:text-primary focus-visible:outline-none">Privacy</a>
            <a href="#" className="transition-all hover:text-primary hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.5)] focus-visible:text-primary focus-visible:outline-none">Terms</a>
            <a href="#" className="transition-all hover:text-primary hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.5)] focus-visible:text-primary focus-visible:outline-none">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, items }: { title: string; items: { label: string; href: string }[] }) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - 80; // offset for fixed navbar
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }
  };

  return (
    <div>
      <p className="text-primary/70">{title}</p>
      <ul className="mt-4 space-y-3 normal-case tracking-normal text-foreground/70">
        {items.map((i) => (
          <li key={i.label}>
            <a
              href={i.href}
              onClick={(e) => handleClick(e, i.href)}
              target={i.href.startsWith("http") ? "_blank" : undefined}
              rel={i.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="group relative inline-flex cursor-pointer items-center transition-colors duration-300 hover:text-cyan-300 focus-visible:text-cyan-300 focus-visible:outline-none"
            >
              {i.label}
              {/* Subtle underline glow on hover */}
              <span className="absolute -bottom-1 left-0 h-[1px] w-0 bg-cyan-400 opacity-50 shadow-[0_0_8px_rgba(34,211,238,0.8)] transition-all duration-300 group-hover:w-full group-focus-visible:w-full" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
