import { SiteHeader } from '@/components/portfolio/site-header'
import { Hero } from '@/components/portfolio/hero'
import { Work } from '@/components/portfolio/work'
import { About } from '@/components/portfolio/about'
import { SiteFooter } from '@/components/portfolio/site-footer'

export default function Page() {
  return (
    <main className="bg-background text-foreground">
      <SiteHeader />
      <Hero />
      <Work />
      <About />
      <SiteFooter />
    </main>
  )
}
