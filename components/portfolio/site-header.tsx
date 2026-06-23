export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 mix-blend-difference">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6 text-background">
        <a href="#" className="font-serif text-xl tracking-tight">
          Studio<span className="align-super text-xs">®</span>
        </a>
        <nav aria-label="Primary" className="hidden gap-8 text-xs uppercase tracking-[0.2em] md:flex">
          <a href="#work" className="transition-opacity hover:opacity-60">
            Work
          </a>
          <a href="#about" className="transition-opacity hover:opacity-60">
            About
          </a>
          <a href="#contact" className="transition-opacity hover:opacity-60">
            Contact
          </a>
        </nav>
        <a
          href="#contact"
          className="text-xs uppercase tracking-[0.2em] transition-opacity hover:opacity-60"
        >
          Let&apos;s talk
        </a>
      </div>
    </header>
  )
}
