export function Navbar() {
  const links = ["Expeditions", "Fleet", "About Us", "Gallery", "Contact"];
  return (
    <header className="fixed inset-x-0 top-0 z-[1000] bg-gradient-to-b from-black/40 to-transparent backdrop-blur-[2px] pointer-events-auto">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-8 py-6">
        <a href="#top" className="font-display text-2xl tracking-[0.4em] text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.4)] hover:drop-shadow-[0_0_20px_rgba(34,211,238,0.6)] transition-all">
          A B Y S S
        </a>
        <nav className="hidden items-center gap-10 text-xs tracking-[0.25em] text-white/90 md:flex">
          {links.map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase().replace(/\s+/g, "-")}`}
              className="uppercase drop-shadow-md transition-all hover:text-cyan-300 hover:drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]"
            >
              {l}
            </a>
          ))}
        </nav>
        <a
          href="#book"
          className="btn-outline-glow rounded-sm px-5 py-3 text-[10px] font-medium uppercase tracking-[0.3em] bg-cyan-400/10 border border-cyan-400/50 text-white drop-shadow-[0_0_10px_rgba(34,211,238,0.5)] hover:bg-cyan-400/20 hover:border-cyan-400 transition-all"
        >
          Book Expedition
        </a>
      </div>
    </header>
  );
}
