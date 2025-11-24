import { HeroSection } from "@/components/hero-section"
import { ProductsSection } from "@/components/products-section"
import { ProjectsSection } from "@/components/projects-section"
import { QuoteSection } from "@/components/quote-section"
import { Footer } from "@/components/footer"
import { StickyHeader } from "@/components/sticky-header"
import { SocialLinks } from "@/components/social-links"
import { SectionIndicator } from "@/components/section-indicator"
import { SmoothScrollHandler } from "@/components/smooth-scroll-handler"
import { FAQSchema } from "@/components/faq-schema"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "재도테크 - 물류설비시스템 전문업체 | 파렛트rack, 캔틸레버랙 설치",
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
  const faqs = [
    {
      question: "파렛트rack이 무엇인가요?",
      answer:
        "파렛트rack은 물류창고에서 팔레트 단위로 물품을 보관하는 시스템입니다. 공간 효율이 높고 지게차로 쉽게 적재/하역할 수 있어 물류센터 필수 설비입니다.",
    },
    {
      question: "견적은 어떻게 받나요?",
      answer:
        "홈페이지 견적문의 페이지에서 신청하시거나, 전화/카카오톡으로 문의 주시면 무료로 출장 견적을 진행합니다. 전국 어디든 방문 가능합니다.",
    },
    {
      question: "설치 기간은 얼마나 걸리나요?",
      answer:
        "현장 규모에 따라 다르지만, 일반적으로 중소규모 창고는 3-5일, 대형 물류센터는 1-2주 정도 소요됩니다. 정확한 일정은 견적 시 안내드립니다.",
    },
    {
      question: "A/S는 어떻게 받나요?",
      answer:
        "설치 후 1년 무상 A/S를 제공하며, 이후에도 신속한 유지보수 서비스를 제공합니다. 전국 어디든 출장 서비스가 가능합니다.",
    },
    {
      question: "어떤 업체들이 이용하나요?",
      answer:
        "CJ대한통운, 쿠팡, 롯데 등 대기업 물류센터부터 중소기업, 개인 창고까지 다양한 고객사와 함께하고 있습니다. 설치사례 페이지에서 확인하실 수 있습니다.",
    },
  ]

  return (
    <main className="min-h-screen overflow-x-hidden w-full scrollbar-hide">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "재도테크",
            alternateName: "JAEDOTECH",
            description: "물류설비시스템 전문업체",
            url: "https://jaedotech.com",
            logo: "/images/logo.png",
            telephone: "+82-10-XXXX-XXXX",
            email: "info@jaedotech.com",
            contactPoint: {
              "@type": "ContactPoint",
              telephone: "+82-10-XXXX-XXXX",
              contactType: "고객 상담",
              areaServed: "KR",
              availableLanguage: ["Korean", "English", "Japanese"],
              contactOption: "TollFree",
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
            founder: {
              "@type": "Person",
              name: "재도테크 대표",
            },
            foundingDate: "2020",
            numberOfEmployees: {
              "@type": "QuantitativeValue",
              value: 10,
            },
            slogan: "물류설비시스템의 모든 것",
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
                    name: "파렛트rack",
                    description: "물류창고 필수 랙 시스템 - 팔레트 단위 보관",
                    category: "물류설비",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Product",
                    name: "캔틸레버랙",
                    description: "긴 물건 보관용 랙 - 파이프, 철근, 목재 등",
                    category: "물류설비",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Product",
                    name: "중량랙",
                    description: "무거운 물건 보관용 랙 - 고하중 지지",
                    category: "물류설비",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Product",
                    name: "경량랙",
                    description: "가벼운 물건 보관용 랙 - 효율적 공간 활용",
                    category: "물류설비",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Product",
                    name: "이동식랙",
                    description: "공간 절약형 이동식 보관 시스템",
                    category: "물류설비",
                  },
                },
              ],
            },
            makesOffer: [
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: "물류설비 설치",
                  description: "전국 물류설비 시스템 설치 및 시공",
                  serviceType: "Installation",
                  areaServed: {
                    "@type": "Country",
                    name: "South Korea",
                  },
                },
              },
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: "무료 출장 견적",
                  description: "전국 어디든 무료 출장 견적 서비스",
                  serviceType: "Consultation",
                  areaServed: {
                    "@type": "Country",
                    name: "South Korea",
                  },
                },
              },
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: "A/S 및 유지보수",
                  description: "설치 후 유지보수 및 A/S 서비스",
                  serviceType: "Maintenance",
                  areaServed: {
                    "@type": "Country",
                    name: "South Korea",
                  },
                },
              },
            ],
          }),
        }}
      />
      <FAQSchema faqs={faqs} />
      <SmoothScrollHandler />
      <StickyHeader />
      <SocialLinks />
      <SectionIndicator />

      <HeroSection />
      <ProductsSection />
      <ProjectsSection />
      <QuoteSection />
      <Footer />
    </main>
  )
}
