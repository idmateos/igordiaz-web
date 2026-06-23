const services = [
  'Art Direction',
  'Brand Identity',
  'Editorial Design',
  'Concept Development',
  'Typography',
  'Visual Systems',
]

export function About() {
  return (
    <section id="about" className="border-y border-border bg-foreground text-background">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 py-24 md:grid-cols-12 md:py-32">
        <div className="md:col-span-3">
          <span className="font-mono text-xs uppercase tracking-widest text-background/50">
            About
          </span>
        </div>

        <div className="md:col-span-9">
          <p className="font-serif text-3xl leading-snug tracking-tight text-balance md:text-5xl">
            We build identities reduced to their essence — pure contrast, intentional space, and
            forms that speak without color.
          </p>

          <div className="mt-16 grid grid-cols-2 gap-x-8 gap-y-4 border-t border-background/20 pt-8 md:grid-cols-3">
            {services.map((service) => (
              <span
                key={service}
                className="text-sm uppercase tracking-[0.15em] text-background/70"
              >
                {service}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
