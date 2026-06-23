export function SiteFooter() {
  return (
    <footer id="contact" className="mx-auto max-w-6xl px-6 py-24 md:py-40">
      <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
        Have a project in mind?
      </p>
      <a
        href="mailto:hello@studio.com"
        className="mt-6 block font-serif text-[clamp(2.5rem,9vw,8rem)] leading-none tracking-tight transition-opacity hover:opacity-60"
      >
        hello@studio.com
      </a>

      <div className="mt-20 flex flex-col gap-6 border-t border-border pt-8 md:flex-row md:items-center md:justify-between">
        <div className="flex gap-6 text-xs uppercase tracking-[0.2em]">
          <a href="#" className="transition-opacity hover:opacity-60">
            Instagram
          </a>
          <a href="#" className="transition-opacity hover:opacity-60">
            Behance
          </a>
          <a href="#" className="transition-opacity hover:opacity-60">
            LinkedIn
          </a>
        </div>
        <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          © 2026 Studio — All rights reserved
        </span>
      </div>
    </footer>
  )
}
