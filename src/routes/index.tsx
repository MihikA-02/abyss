import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight, Play, Menu, X, Compass, Users, Clock, Camera, Shield, Waves, Leaf,
  Plus, Minus, Ship, Fish, Anchor, Gem, Radar, ChevronDown,
} from "lucide-react";

import { LenisProvider } from "@/components/LenisProvider";
import { FlashlightCursor } from "@/components/FlashlightCursor";
import { ScrollHUD } from "@/components/ScrollHUD";
import { AmbientAudio } from "@/components/AmbientAudio";
import { Preloader } from "@/components/Preloader";
import { Bubbles } from "@/components/Bubbles";
import { Particles } from "@/components/Particles";
import { CountUp } from "@/components/CountUp";
import { ShowcaseCarousel } from "@/components/ShowcaseCarousel";

import heroImg from "@/assets/hero.jpg";
import whaleImg from "@/assets/whale.jpg";
import bioImg from "@/assets/bioluminescent.jpg";
import wreckImg from "@/assets/wreck.jpg";
import submarineAsset from "@/assets/submarine.png.asset.json";
import interiorAsset from "@/assets/interior.png.asset.json";
import ctaAsset from "@/assets/cta.png.asset.json";
import yachtAsset from "@/assets/yacht.png.asset.json";

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

function Page() {
  return (
    <LenisProvider>
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
      </main>
      <SiteFooter />
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
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black">
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
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const darkOverlayRef = useRef<HTMLDivElement>(null);
  const raysRef = useRef<HTMLDivElement>(null);

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
        start: "top bottom", // Starts when top of Hero hits bottom of viewport
        end: "top top",      // Ends when top of Hero hits top of viewport
        scrub: 0.5,          // Smooth scrubbing with a slight lag for cinematic feel
        once: true           // Lock the final bright state once completed
      }
    });

    // Fade out the dark overlay
    tl.to(darkOverlayRef.current, {
      opacity: 0,
      ease: "none" // Linear ease is best for scrubbed animations
    }, 0);

    // Animate video color grading
    tl.to(videoRef.current, {
      filter: "brightness(1.65) contrast(1.1) saturate(1.5) hue-rotate(-8deg)",
      ease: "none"
    }, 0);

    // Fade in light rays with a slight delay in the timeline progression
    tl.to(raysRef.current, {
      opacity: 0.35,
      ease: "none"
    }, 0.2);

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
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

      {/* Transparent top — the video breathes fully. Thin vignette only at the very bottom for text contrast. */}
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
            <button className="group flex items-center gap-3 text-[10px] uppercase tracking-[0.35em] text-body hover:text-primary">
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-primary/50 transition-colors group-hover:border-primary group-hover:bg-primary/10">
                <Play className="h-3 w-3 fill-current" />
              </span>
              Watch Reel
            </button>
          </div>
        </div>
      </div>
    </section>
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
    <section className="relative overflow-hidden py-40">
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
      <img
        src={whaleImg}
        alt="A humpback whale drifting under volumetric surface light"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ transform: `scale(${1 + scrollY * 0.15}) translateY(${scrollY * -40}px)` }}
        loading="lazy"
      />
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
            Built with aerospace tolerances, tuned like a Steinway. Move your cursor to inspect.
          </p>
        </div>

        <div className="relative">
          <img
            src={submarineAsset.url}
            alt="Abyss Explorer X1 submersible"
            className="mx-auto w-full max-w-4xl transition-transform duration-500 ease-out"
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
function Luxury() {
  const items = [
    { icon: Ship, title: "Signature Expedition", copy: "Three-day cinematic voyage across trench, reef and wreck." },
    { icon: Fish, title: "Marine Encounters", copy: "Chartered dives synchronised with seasonal migrations." },
    { icon: Anchor, title: "Wreck Archaeology", copy: "Descend to lost hulls with resident maritime historians." },
    { icon: Gem, title: "Private Charter", copy: "The Explorer X1 and her crew reserved solely for your party." },
    { icon: Radar, title: "Science Missions", copy: "Contribute to real research alongside our biologists." },
    { icon: Camera, title: "Cinematic Studio", copy: "8K deep-water film and photography with an on-board team." },
  ];
  const ref = useReveal<HTMLDivElement>();
  return (
    <section id="luxury" className="relative overflow-hidden py-40">
      <img src={yachtAsset.url} alt="" className="absolute inset-0 h-full w-full object-cover opacity-40" loading="lazy" aria-hidden />
      <div className="absolute inset-0 bg-gradient-to-b from-abyss via-abyss/70 to-abyss" />
      <Bubbles count={20} />

      <div ref={ref} className="reveal relative z-10 mx-auto max-w-[1500px] px-6 md:px-10">
        <div className="mb-20 max-w-2xl">
          <p className="mb-4 text-[10px] uppercase tracking-[0.6em] text-primary/70">Chapter VI — Luxury</p>
          <h2 className="font-display text-5xl leading-[1.05] md:text-7xl">
            Six ways to<br /><span className="italic text-primary">disappear</span> below.
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {items.map((it, i) => {
            const I = it.icon;
            return (
              <article
                key={it.title}
                className="glass-card float-sway group relative rounded-md p-8"
                style={{ animationDelay: `${i * 0.35}s`, animationDuration: `${7 + (i % 3)}s` }}
              >
                <span className="mb-8 flex h-12 w-12 items-center justify-center rounded-full border border-primary/40 bg-primary/5 transition-colors group-hover:bg-primary/15">
                  <I className="h-5 w-5 text-primary" strokeWidth={1.3} />
                </span>
                <h3 className="font-display text-2xl leading-tight">{it.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-foreground/70">{it.copy}</p>
                <div className="mt-8 flex items-center justify-between text-[10px] uppercase tracking-[0.3em] text-primary/60">
                  <span>0{i + 1} / 06</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── 7. GALLERY — asymmetric parallax ──────────────────────── */
function Gallery() {
  const shots = [
    { src: bioImg, tag: "Bioluminescent Zone · 900 m", h: "row-span-2" },
    { src: wreckImg, tag: "SS Meridian · 1240 m", h: "" },
    { src: whaleImg, tag: "Humpback Passage · 60 m", h: "" },
    { src: ctaAsset.url, tag: "Trench Approach · 6100 m", h: "row-span-2" },
    { src: heroImg, tag: "Reef Threshold · 30 m", h: "" },
  ];
  const ref = useReveal<HTMLDivElement>();
  return (
    <section id="gallery" className="relative overflow-hidden py-40">
      <div ref={ref} className="reveal mx-auto max-w-[1500px] px-6 md:px-10">
        <div className="mb-16 flex items-end justify-between gap-8">
          <div>
            <p className="mb-4 text-[10px] uppercase tracking-[0.6em] text-primary/70">Chapter VII — Field Notes</p>
            <h2 className="font-display text-5xl leading-[1.05] md:text-7xl">
              What we've<br /><span className="italic text-primary">seen down there.</span>
            </h2>
          </div>
          <a href="#book" className="hidden text-[10px] uppercase tracking-[0.35em] text-primary/70 hover:text-primary md:inline story-link">
            Request full archive
          </a>
        </div>

        <div className="grid auto-rows-[240px] grid-cols-2 gap-3 md:grid-cols-4">
          {shots.map((s, i) => (
            <figure
              key={i}
              className={`group relative overflow-hidden rounded-md border border-primary/15 ${s.h}`}
            >
              <img
                src={s.src}
                alt={s.tag}
                className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-abyss via-abyss/20 to-transparent" />
              <figcaption className="absolute bottom-4 left-4 text-[9px] uppercase tracking-[0.3em] text-foreground/80">
                {s.tag}
              </figcaption>
            </figure>
          ))}
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
      <Bubbles count={12} />
      <blockquote ref={ref} className="reveal relative z-10 mx-auto max-w-4xl px-6 text-center md:px-10">
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
    { q: "Do I need diving experience?", a: "None. Guests remain in the pressurised cabin of the Explorer X1 while trained pilots operate the vessel." },
    { q: "How long is a full expedition?", a: "Signature expeditions run three to five days, including surface acclimatisation, briefings, and dive sequences." },
    { q: "What departure ports do you operate from?", a: "Currently Ísafjörður, Ponta Delgada, Papeete and a private Mariana Trench access point (invitation only)." },
    { q: "Is a private charter available?", a: "Yes. The Explorer X1 and her expedition crew can be reserved exclusively for a party of up to six guests." },
    { q: "What is the safety protocol?", a: "Every dive is monitored by a redundant surface team. Life support autonomy is 96 hours, four times the maximum dive length." },
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
      <img src={ctaAsset.url} alt="Deep-sea canyon with the Explorer X1 preparing for descent" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
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
  return (
    <footer className="relative border-t border-primary/15 bg-abyss px-6 py-14 text-[10px] uppercase tracking-[0.3em] text-foreground/50 md:px-10">
      <div className="mx-auto max-w-[1500px]">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <p className="font-display text-lg tracking-[0.6em] text-primary">A B Y S S</p>
            <p className="mt-4 normal-case tracking-normal text-foreground/50">
              Private expeditions into the world's least-known frontier.
            </p>
          </div>
          <FooterCol title="Voyage" items={["Expeditions", "Vessel", "Science", "Journal"]} />
          <FooterCol title="Company" items={["About", "Crew", "Conservation", "Press"]} />
          <FooterCol title="Contact" items={["Ísafjörður", "Ponta Delgada", "Papeete", "concierge@abyss.co"]} />
        </div>
        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-primary/15 pt-8 md:flex-row md:items-center">
          <span>© {new Date().getFullYear()} ABYSS Expeditions</span>
          <div className="flex gap-6"><a href="#" className="hover:text-primary">Privacy</a><a href="#" className="hover:text-primary">Terms</a><a href="#" className="hover:text-primary">Cookies</a></div>
        </div>
      </div>
    </footer>
  );
}
function FooterCol({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <p className="text-primary/70">{title}</p>
      <ul className="mt-4 space-y-2 normal-case tracking-normal text-foreground/70">
        {items.map((i) => <li key={i}><a href="#" className="hover:text-primary">{i}</a></li>)}
      </ul>
    </div>
  );
}
