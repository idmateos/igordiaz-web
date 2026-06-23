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

const BOOT_LINES = [
  "booting portfolio.sys ...",
  "loading modules: analysis, dev, strategy, product ... ok",
  "mounting /home/tu-nombre ... ok",
  "running whoami",
]

function useBootSequence() {
  const [shownLines, setShownLines] = useState<string[]>([])
  const [done, setDone] = useState(false)

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduce) {
      setShownLines(BOOT_LINES)
      setDone(true)
      return
    }

    let i = 0
    const timers: ReturnType<typeof setTimeout>[] = []
    const tick = () => {
      setShownLines((prev) => [...prev, BOOT_LINES[i]])
      i += 1
      if (i < BOOT_LINES.length) {
        timers.push(setTimeout(tick, 450))
      } else {
        timers.push(setTimeout(() => setDone(true), 500))
      }
    }
    timers.push(setTimeout(tick, 350))
    return () => timers.forEach(clearTimeout)
  }, [])

  return { shownLines, done }
}

export default function Page() {
  const { shownLines, done } = useBootSequence()

  return (
    <main
      className="crt-scanlines min-h-screen"
      style={
        {
          "--term-bg": "oklch(0.13 0 0)",
          "--term-fg": "oklch(0.92 0 0)",
          "--term-dim": "oklch(0.6 0 0)",
          "--term-line": "oklch(0.32 0 0)",
          backgroundColor: "var(--term-bg)",
          color: "var(--term-fg)",
        } as React.CSSProperties
      }
    >
      <div className="crt-screen crt-glow mx-auto flex min-h-screen max-w-2xl flex-col px-6 py-12 md:py-20">
        {/* Window chrome */}
        <div
          className="overflow-hidden border"
          style={{ borderColor: "var(--term-line)" }}
        >
          <div
            className="flex items-center justify-between border-b px-4 py-2 text-xs uppercase tracking-widest"
            style={{ borderColor: "var(--term-line)", color: "var(--term-dim)" }}
          >
            <span>tu-nombre@portfolio: ~</span>
            <span aria-hidden="true" className="flex gap-1.5">
              <span className="inline-block size-2.5 rounded-full border" style={{ borderColor: "var(--term-dim)" }} />
              <span className="inline-block size-2.5 rounded-full border" style={{ borderColor: "var(--term-dim)" }} />
              <span className="inline-block size-2.5 rounded-full border" style={{ borderColor: "var(--term-dim)" }} />
            </span>
          </div>

          {/* Boot sequence */}
          <div className="px-4 py-6">
            <div className="space-y-1 text-xs" style={{ color: "var(--term-dim)" }}>
              {shownLines.map((line, idx) => (
                <p key={idx}>
                  <span className="select-none">$ </span>
                  {line}
                </p>
              ))}
            </div>

            {/* whoami output */}
            {done && (
              <div className="mt-5 animate-in fade-in duration-500">
                <h1 className="text-2xl leading-tight md:text-3xl">
                  Tu Nombre
                  <span className="crt-cursor" aria-hidden="true" />
                </h1>
                <p className="mt-3 max-w-prose text-sm leading-relaxed" style={{ color: "var(--term-dim)" }}>
                  Analista desarrollador. Experto en estrategia y producto.
                  Convierto datos en decisiones y decisiones en producto.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Content fades in after boot */}
        <div
          className={`mt-12 flex flex-1 flex-col transition-opacity duration-700 ${
            done ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Stack */}
          <section className="mb-14">
            <h2 className="mb-4 text-xs uppercase tracking-widest" style={{ color: "var(--term-dim)" }}>
              {"// cat skills.txt"}
            </h2>
            <ul className="grid grid-cols-1 gap-x-6 gap-y-2 text-sm sm:grid-cols-2">
              {STACK.map((item) => (
                <li key={item} className="group flex items-center gap-2">
                  <span aria-hidden="true" style={{ color: "var(--term-dim)" }} className="transition-transform group-hover:translate-x-0.5">
                    ▸
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {/* Work */}
          <section className="mb-14">
            <h2 className="mb-4 text-xs uppercase tracking-widest" style={{ color: "var(--term-dim)" }}>
              {"// ls -la proyectos/"}
            </h2>
            <ul className="border-y" style={{ borderColor: "var(--term-line)" }}>
              {WORK.map((p) => (
                <li
                  key={p.title}
                  className="group grid cursor-default grid-cols-[3rem_1fr] gap-4 border-b py-4 text-sm transition-colors last:border-b-0 hover:bg-[oklch(0.92_0_0/0.05)]"
                  style={{ borderColor: "var(--term-line)" }}
                >
                  <span style={{ color: "var(--term-dim)" }}>{p.year}</span>
                  <div>
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="font-medium">
                        <span aria-hidden="true" className="mr-1 inline-block opacity-0 transition-opacity group-hover:opacity-100">
                          {">"}
                        </span>
                        {p.title}
                      </h3>
                      <span className="text-xs uppercase tracking-widest" style={{ color: "var(--term-dim)" }}>
                        {p.role}
                      </span>
                    </div>
                    <p className="mt-1" style={{ color: "var(--term-dim)" }}>
                      {p.desc}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* Contact */}
          <footer
            className="mt-auto border-t pt-6 text-sm"
            style={{ borderColor: "var(--term-line)" }}
          >
            <p className="mb-3 text-xs uppercase tracking-widest" style={{ color: "var(--term-dim)" }}>
              {"// ./contacto.sh"}
            </p>
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
            <p className="mt-6 text-xs" style={{ color: "var(--term-dim)" }}>
              © {new Date().getFullYear()} — hecho con café y SQL.
            </p>
          </footer>
        </div>
      </div>
    </main>
  )
}
