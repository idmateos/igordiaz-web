export function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col justify-between bg-foreground px-6 pb-10 pt-32 text-background">
      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center">
        <p className="mb-8 max-w-md text-xs uppercase leading-relaxed tracking-[0.25em] text-background/60">
          Independent design practice — concept, art direction &amp; visual identity
        </p>
        <h1 className="font-serif text-[clamp(3rem,12vw,11rem)] leading-[0.9] tracking-tight text-balance">
          Designing
          <br />
          <span className="italic">in black</span> &amp; white.
        </h1>
      </div>

      <div className="mx-auto flex w-full max-w-6xl items-end justify-between border-t border-background/20 pt-6">
        <span className="font-mono text-xs uppercase tracking-widest text-background/60">
          Est. 2026 / Worldwide
        </span>
        <span className="font-mono text-xs uppercase tracking-widest text-background/60">
          Scroll ↓
        </span>
      </div>
    </section>
  )
}
