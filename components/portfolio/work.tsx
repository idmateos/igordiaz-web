import Image from 'next/image'

const projects = [
  {
    title: 'Monochrome',
    category: 'Art Direction',
    year: '2026',
    image: '/work/project-01.png',
  },
  {
    title: 'Concrete',
    category: 'Brand Identity',
    year: '2025',
    image: '/work/project-02.png',
  },
  {
    title: 'Ascend',
    category: 'Editorial',
    year: '2025',
    image: '/work/project-03.png',
  },
  {
    title: 'Fluid',
    category: 'Concept',
    year: '2024',
    image: '/work/project-04.png',
  },
]

export function Work() {
  return (
    <section id="work" className="mx-auto max-w-6xl px-6 py-24 md:py-32">
      <div className="mb-12 flex items-end justify-between border-b border-border pb-6">
        <h2 className="font-serif text-4xl tracking-tight md:text-6xl">Selected Work</h2>
        <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          ({projects.length})
        </span>
      </div>

      <div className="grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2">
        {projects.map((project, i) => (
          <article key={project.title} className={`group ${i % 2 === 1 ? 'md:mt-24' : ''}`}>
            <div className="relative aspect-[4/5] overflow-hidden bg-muted">
              <Image
                src={project.image || '/placeholder.svg'}
                alt={`${project.title} — ${project.category}`}
                fill
                className="object-cover grayscale transition-all duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="mt-4 flex items-baseline justify-between">
              <h3 className="font-serif text-2xl tracking-tight">{project.title}</h3>
              <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                {project.year}
              </span>
            </div>
            <p className="mt-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">
              {project.category}
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}
