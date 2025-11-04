import { HeroSection } from "@/components/hero-section"
import { ProductsSection } from "@/components/products-section"
import { ProjectsSection } from "@/components/projects-section"
import { QuoteSection } from "@/components/quote-section"
import { ClientsSection } from "@/components/clients-section"
import { Footer } from "@/components/footer"
import { StickyHeader } from "@/components/sticky-header"
import { ThemeToggle } from "@/components/theme-toggle"
import { SectionIndicator } from "@/components/section-indicator"
import { SmoothScrollHandler } from "@/components/smooth-scroll-handler"

export default function Home() {
  return (
    <main className="min-h-screen">
      <SmoothScrollHandler />
      <StickyHeader />
      <ThemeToggle />
      <SectionIndicator />

      <HeroSection />
      <ProductsSection />
      <ProjectsSection />
      <QuoteSection />
      <ClientsSection />
      <Footer />
    </main>
  )
}
