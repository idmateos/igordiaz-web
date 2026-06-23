const STACK = [
  "Análisis de datos",
  "Desarrollo de software",
  "Estrategia de producto",
  "Discovery & roadmap",
  "SQL / Python / TypeScript",
  "Métricas & experimentación",
]

const WORK = [
  {
    year: "2025",
    title: "Plataforma de analítica de producto",
    role: "Analista / Dev",
    desc: "Modelo de datos y dashboards para decisiones de roadmap.",
  },
  {
    year: "2024",
    title: "Estrategia de pricing",
    role: "Estrategia",
    desc: "Segmentación y experimentos A/B que subieron el ARPU.",
  },
  {
    year: "2024",
    title: "Rediseño de onboarding",
    role: "Producto",
    desc: "Discovery, métricas de activación y entrega iterativa.",
  },
  {
    year: "2023",
    title: "Pipeline de reporting interno",
    role: "Desarrollo",
    desc: "Automatización de ETL y reportes para dirección.",
  },
]

export default function Page() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex min-h-screen max-w-2xl flex-col px-6 py-12 md:py-20">
        {/* Header */}
        <header className="mb-16 border border-foreground">
          <div className="flex items-center justify-between border-b border-foreground px-4 py-2 text-xs uppercase tracking-widest">
            <span>~/portfolio</span>
            <span aria-hidden="true">[ ■ □ □ ]</span>
          </div>
          <div className="px-4 py-6">
            <p className="text-xs uppercase tracking-widest text-muted-foreground">
              {"> whoami"}
            </p>
            <h1 className="mt-2 text-2xl leading-tight md:text-3xl">
              Tu Nombre
              <span className="inline-block w-3 animate-pulse">_</span>
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Analista desarrollador. Experto en estrategia y producto. Convierto
              datos en decisiones y decisiones en producto.
            </p>
          </div>
        </header>

        {/* Stack */}
        <section className="mb-16">
          <h2 className="mb-4 text-xs uppercase tracking-widest text-muted-foreground">
            {"// qué hago"}
          </h2>
          <ul className="grid grid-cols-1 gap-x-6 gap-y-2 text-sm sm:grid-cols-2">
            {STACK.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span aria-hidden="true" className="text-muted-foreground">
                  ▸
                </span>
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* Work */}
        <section className="mb-16">
          <h2 className="mb-4 text-xs uppercase tracking-widest text-muted-foreground">
            {"// proyectos seleccionados"}
          </h2>
          <ul className="divide-y divide-border border-y border-border">
            {WORK.map((p) => (
              <li
                key={p.title}
                className="grid grid-cols-[3rem_1fr] gap-4 py-4 text-sm"
              >
                <span className="text-muted-foreground">{p.year}</span>
                <div>
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="font-medium">{p.title}</h3>
                    <span className="text-xs uppercase tracking-widest text-muted-foreground">
                      {p.role}
                    </span>
                  </div>
                  <p className="mt-1 text-muted-foreground">{p.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Contact */}
        <footer className="mt-auto border-t border-foreground pt-6 text-sm">
          <p className="mb-3 text-xs uppercase tracking-widest text-muted-foreground">
            {"// contacto"}
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <a
              href="mailto:hola@tudominio.com"
              className="underline-offset-4 hover:underline"
            >
              hola@tudominio.com
            </a>
            <a
              href="https://linkedin.com"
              className="underline-offset-4 hover:underline"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com"
              className="underline-offset-4 hover:underline"
            >
              GitHub
            </a>
          </div>
          <p className="mt-6 text-xs text-muted-foreground">
            © {new Date().getFullYear()} — hecho con café y SQL.
          </p>
        </footer>
      </div>
    </main>
  )
}
