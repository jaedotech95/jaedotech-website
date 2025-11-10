"use client"

export function StructuredData() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "재도테크",
    alternateName: "JAEDOTECH",
    url: "https://jaedotech.com",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-QRiMGewbHwxeGlcAgx7QQuezSwMfu9.png",
    description: "물류설비시스템 전문업체 - 파렛트랙, 캔틸레버랙, 중량물랙 제조 및 설치",
    address: {
      "@type": "PostalAddress",
      addressCountry: "KR",
      addressLocality: "대한민국",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      availableLanguage: ["Korean", "English", "Japanese"],
    },
    sameAs: ["https://jaedotech.com"],
  }

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "재도테크",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-QRiMGewbHwxeGlcAgx7QQuezSwMfu9.png",
    "@id": "https://jaedotech.com",
    url: "https://jaedotech.com",
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      addressCountry: "KR",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
  }

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "물류설비시스템",
    description: "파렛트랙, 캔틸레버랙, 중량랙, 경량랙 등 다양한 물류창고 설비",
    brand: {
      "@type": "Brand",
      name: "재도테크",
    },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "KRW",
      availability: "https://schema.org/InStock",
    },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
    </>
  )
}
