import { HeroSection } from "@/components/hero-section"
import { ProductsSection } from "@/components/products-section"
import { ProjectsSection } from "@/components/projects-section"
import { QuoteSection } from "@/components/quote-section"
import { Footer } from "@/components/footer"
import { StickyHeader } from "@/components/sticky-header"
import { SocialLinks } from "@/components/social-links"
import { SectionIndicator } from "@/components/section-indicator"
import { SmoothScrollHandler } from "@/components/smooth-scroll-handler"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "재도테크 - 물류설비시스템 전문업체 | 파렛트랙, 캔틸레버랙 설치",
  description:
    "파렛트rack, 캔틸레버랙, 중량물랙 등 물류설비시스템 전문업체. 전국 무료 출장 견적, 제조사 직거래로 합리적인 가격. 설치부터 A/S까지 책임 시공",
  openGraph: {
    title: "재도테크 - 물류설비시스템 전문업체",
    description: "파렛트rack, 캔틸레버랙, 중량물랙 등 물류설비시스템 전문업체. 전국 무료 출장 견적",
    url: "https://jaedotech.com",
    type: "website",
  },
}

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden w-full scrollbar-hide">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "재도테크",
            description: "물류설비시스템 전문업체",
            url: "https://jaedotech.com",
            logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-QRiMGewbHwxeGlcAgx7QQuezSwMfu9.png",
            contactPoint: {
              "@type": "ContactPoint",
              contactType: "고객 상담",
              availableLanguage: ["Korean"],
            },
            sameAs: [
              "https://www.instagram.com/jaedotech__official",
              "http://pf.kakao.com/_xjSsDn/chat",
              "https://www.band.us/page/99788398",
              "https://smartstore.naver.com/jaedotech",
            ],
            address: {
              "@type": "PostalAddress",
              addressCountry: "KR",
              addressRegion: "전국",
            },
            priceRange: "$$",
            openingHours: "Mo-Fr 09:00-18:00",
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: "물류설비시스템",
              itemListElement: [
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Product",
                    name: "파렛트랙",
                    description: "물류창고 필수 랙 시스템",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Product",
                    name: "캔틸레버랙",
                    description: "긴 물건 보관용 랙",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Product",
                    name: "중량물랙",
                    description: "무거운 물건 보관용 랙",
                  },
                },
              ],
            },
          }),
        }}
      />
      <SmoothScrollHandler />
      <StickyHeader />
      <SocialLinks />
      <SectionIndicator />

      <HeroSection />
      <ProductsSection />
      <ProjectsSection />
      <QuoteSection />
      {/* <ClientsSection /> */}
      <Footer />
    </main>
  )
}
