"use client"

import { useEffect, useState } from "react"
import { SnakeGame } from "@/components/snake-game"

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

function useTyped(text: string, start: boolean, speed = 40) {
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
    const t = setTimeout(() => setReady(true), 200)
    return () => clearTimeout(t)
  }, [])

  const tagline = useTyped("Analista desarrollador · estrategia & producto", ready, 35)

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-2xl px-5 py-14 md:py-20">
        {/* Header */}
        <header>
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            ~/portfolio
          </p>
          <h1 className="mt-3 text-balance text-3xl font-bold leading-tight md:text-4xl">
            Tu Nombre
          </h1>
          <p className="mt-3 font-mono text-sm md:text-base">
            <span className="select-none text-muted-foreground">{"> "}</span>
            {tagline}
            <span className="crt-cursor" aria-hidden="true" />
          </p>
          <p className="mt-4 max-w-prose leading-relaxed text-muted-foreground">
            Convierto datos en decisiones y decisiones en producto. Trabajo entre
            el código, las métricas y la estrategia para construir cosas que
            importan.
          </p>
        </header>

        {/* Snake — cortesía de espera */}
        <section className="mt-12">
          <SnakeGame />
        </section>

        {/* Stack */}
        <section className="mt-12">
          <h2 className="mb-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            // qué hago
          </h2>
          <ul className="flex flex-wrap gap-2">
            {STACK.map((item) => (
              <li
                key={item}
                className="border border-foreground px-3 py-1.5 text-sm"
              >
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* Work */}
        <section className="mt-12">
          <h2 className="mb-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            // proyectos
          </h2>
          <ul className="divide-y divide-border border-y border-border">
            {WORK.map((p) => (
              <li key={p.title} className="group flex gap-4 py-4">
                <span className="font-mono text-xs text-muted-foreground">{p.year}</span>
                <div className="flex-1">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="font-medium">{p.title}</h3>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                      {p.role}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{p.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Contact */}
        <footer className="mt-12 border-t border-border pt-6">
          <h2 className="mb-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            // contacto
          </h2>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
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
          <p className="mt-6 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            © {new Date().getFullYear()} — hecho con café y SQL
          </p>
        </footer>
      </div>
    </main>
  )
}
