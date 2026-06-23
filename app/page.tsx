"use client"

import { useEffect, useState } from "react"

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

const TICKER = [
  "DATOS → DECISIONES",
  "DECISIONES → PRODUCTO",
  "DISCOVERY",
  "EXPERIMENTACIÓN",
  "ROADMAP",
  "SQL · PYTHON · TS",
]

const ASCII = String.raw`
 _____ _   _    _   _  ___  __  __ ____  ____  _____
|_   _| | | |  | \ | |/ _ \|  \/  | __ )|  _ \| ____|
  | | | | | |  |  \| | | | | |\/| |  _ \| |_) |  _|
  | | | |_| |  | |\  | |_| | |  | | |_) |  _ <| |___
  |_|  \___/   |_| \_|\___/|_|  |_|____/|_| \_\_____|
`

function useTyped(text: string, start: boolean, speed = 45) {
  const [out, setOut] = useState("")
  useEffect(() => {
    if (!start) return
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduce) {
      setOut(text)
      return
    }
    let i = 0
    const id = setInterval(() => {
      i += 1
      setOut(text.slice(0, i))
      if (i >= text.length) clearInterval(id)
    }, speed)
    return () => clearInterval(id)
  }, [text, start, speed])
  return out
}

export default function Page() {
  const [ready, setReady] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setReady(true), 250)
    return () => clearTimeout(t)
  }, [])

  const tagline = useTyped("Analista desarrollador · estrategia & producto", ready, 35)

  return (
    <main className="paper-grid paper-scanlines min-h-screen text-foreground">
      {/* Top ticker */}
      <div className="overflow-hidden border-b border-foreground bg-foreground text-background">
        <div className="marquee py-1.5 text-xs font-medium uppercase tracking-widest">
          {[...TICKER, ...TICKER].map((t, i) => (
            <span key={i} className="px-4">
              {t} <span aria-hidden="true">✦</span>
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-5 py-10 md:py-16">
        {/* Header card */}
        <header className="relative border-2 border-foreground bg-background p-5 shadow-hard">
          <div className="mb-3 flex items-center justify-between border-b border-dashed border-foreground/40 pb-2 text-[10px] uppercase tracking-widest text-muted-foreground">
            <span>~/portfolio — v1.0</span>
            <span>{new Date().getFullYear()}</span>
          </div>

          <pre
            aria-hidden="true"
            className="overflow-x-auto text-[6px] leading-[1.15] text-foreground sm:text-[9px] md:text-[11px]"
          >
            {ASCII}
          </pre>

          <h1 className="sr-only">Tu Nombre — analista desarrollador, estrategia y producto</h1>

          <p className="mt-3 font-mono text-sm md:text-base">
            <span className="select-none text-muted-foreground">{"> "}</span>
            {tagline}
            <span className="crt-cursor" aria-hidden="true" />
          </p>

          <p className="mt-3 max-w-prose text-sm leading-relaxed text-muted-foreground">
            Convierto datos en decisiones y decisiones en producto. Trabajo entre
            el código, las métricas y la estrategia para construir cosas que
            importan.
          </p>

          {/* corner tag */}
          <span className="absolute -right-2 -top-2 rotate-3 border-2 border-foreground bg-background px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest shadow-hard">
            disponible
          </span>
        </header>

        {/* Stats strip */}
        <div className="mt-6 grid grid-cols-3 gap-3">
          {[
            { n: "8+", l: "años" },
            { n: "20+", l: "proyectos" },
            { n: "3", l: "roles en 1" },
          ].map((s) => (
            <div
              key={s.l}
              className="border-2 border-foreground bg-background p-3 text-center"
            >
              <div className="font-mono text-2xl font-bold">{s.n}</div>
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                {s.l}
              </div>
            </div>
          ))}
        </div>

        {/* Stack */}
        <section className="mt-10">
          <h2 className="mb-3 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            <span className="inline-block h-2 w-2 bg-foreground" aria-hidden="true" />
            cat skills.txt
          </h2>
          <ul className="flex flex-wrap gap-2">
            {STACK.map((item) => (
              <li
                key={item}
                className="border border-foreground bg-background px-3 py-1.5 text-sm transition-all hover:-translate-y-0.5 hover:shadow-hard"
              >
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* Work */}
        <section className="mt-10">
          <h2 className="mb-3 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            <span className="inline-block h-2 w-2 bg-foreground" aria-hidden="true" />
            ls -la proyectos/
          </h2>
          <ul className="space-y-3">
            {WORK.map((p, idx) => (
              <li
                key={p.title}
                className="group border-2 border-foreground bg-background p-4 transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-hard"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="flex items-baseline gap-2 font-medium">
                    <span className="font-mono text-xs text-muted-foreground">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span aria-hidden="true" className="text-muted-foreground transition-transform group-hover:translate-x-1">
                      {">"}
                    </span>
                    {p.title}
                  </h3>
                  <span className="border border-foreground px-2 py-0.5 text-[10px] uppercase tracking-widest">
                    {p.role}
                  </span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
                <p className="mt-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  // {p.year}
                </p>
              </li>
            ))}
          </ul>
        </section>

        {/* Contact */}
        <footer className="mt-10 border-2 border-foreground bg-foreground p-5 text-background shadow-hard">
          <p className="mb-3 font-mono text-xs uppercase tracking-widest opacity-70">
            ./contacto.sh
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <a href="mailto:hola@tudominio.com" className="underline-offset-4 hover:underline">
              hola@tudominio.com
            </a>
            <a href="https://linkedin.com" className="underline-offset-4 hover:underline">
              LinkedIn
            </a>
            <a href="https://github.com" className="underline-offset-4 hover:underline">
              GitHub
            </a>
          </div>
          <p className="mt-5 font-mono text-[10px] uppercase tracking-widest opacity-60">
            © {new Date().getFullYear()} — hecho con café y SQL
          </p>
        </footer>
      </div>
    </main>
  )
}
