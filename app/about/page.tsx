"use client"

import type React from "react"

import { StickyHeader } from "@/components/sticky-header"
import { Footer } from "@/components/footer"
import { useLanguage } from "@/lib/i18n"
import Image from "next/image"
import { useEffect } from "react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { Building2, Shield, Zap, CheckCircle2 } from "lucide-react"

export default function AboutPage() {
  const { t } = useLanguage()
  const hero = useScrollAnimation()
  const intro = useScrollAnimation()
  const values = useScrollAnimation()
  const strengths = useScrollAnimation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <main className="min-h-screen">
      <StickyHeader />

      {/* Hero Section */}
      <section
        ref={hero.elementRef as React.RefObject<HTMLElement>}
        className={`pt-32 pb-8 md:pt-40 md:pb-12 bg-gradient-to-b from-blue-50 to-white transition-all duration-1000 ${
          hero.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance" style={{ color: "#0055A6" }}>
              {t("about.title")}
            </h1>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed text-pretty">{t("about.subtitle")}</p>
          </div>
        </div>
      </section>

      {/* Company Introduction */}
      <section
        ref={intro.elementRef as React.RefObject<HTMLElement>}
        className={`py-12 md:py-16 transition-all duration-1000 delay-150 ${
          intro.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: "#0055A6" }}>
                  {t("about.intro.title")}
                </h2>
                <p className="text-gray-600 leading-relaxed mb-4 text-lg">{t("about.intro.description1")}</p>
                <p className="text-gray-600 leading-relaxed text-lg">{t("about.intro.description2")}</p>
              </div>
              <div className="bg-gray-100 rounded-2xl aspect-square relative overflow-hidden">
                <Image
                  src="/modern-warehouse-with-organized-racks.jpg"
                  alt="Warehouse"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Values */}
      <section ref={values.elementRef as React.RefObject<HTMLElement>} className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2
              className={`text-3xl md:text-4xl font-bold text-center mb-12 transition-all duration-1000 ${
                values.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ color: "#0055A6" }}
            >
              {t("about.values.title")}
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: "🎯",
                  title: t("about.values.quality.title"),
                  description: t("about.values.quality.description"),
                },
                {
                  icon: "🤝",
                  title: t("about.values.trust.title"),
                  description: t("about.values.trust.description"),
                },
                {
                  icon: "💡",
                  title: t("about.values.innovation.title"),
                  description: t("about.values.innovation.description"),
                },
              ].map((value, index) => (
                <div
                  key={index}
                  className={`bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-700 ${
                    values.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${index * 150 + 200}ms` }}
                >
                  <div
                    className="w-12 h-12 rounded-lg mb-4 flex items-center justify-center"
                    style={{ backgroundColor: "#0055A6" }}
                  >
                    <span className="text-2xl text-white">{value.icon}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3" style={{ color: "#0055A6" }}>
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Company Strengths */}
      <section ref={strengths.elementRef as React.RefObject<HTMLElement>} className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2
              className={`text-3xl md:text-4xl font-bold text-center mb-4 transition-all duration-1000 ${
                strengths.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ color: "#0055A6" }}
            >
              재도테크의 강점
            </h2>
            <p
              className={`text-center text-gray-600 mb-12 text-lg transition-all duration-1000 delay-100 ${
                strengths.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              고객의 성공을 위한 차별화된 서비스
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  icon: Building2,
                  title: "맞춤형 설계",
                  description: "현장 특성과 고객 요구사항을 반영한 최적의 물류 시스템 설계",
                  color: "#0055A6",
                },
                {
                  icon: Shield,
                  title: "안전 시공",
                  description: "산업안전 기준을 준수하는 체계적이고 안전한 시공 프로세스",
                  color: "#0055A6",
                },
                {
                  icon: Zap,
                  title: "신속한 대응",
                  description: "전국 어디든 빠른 출장 상담과 견적 제공으로 시간 절약",
                  color: "#0055A6",
                },
                {
                  icon: CheckCircle2,
                  title: "사후관리",
                  description: "설치 후에도 지속적인 점검과 유지보수로 안심 서비스 제공",
                  color: "#0055A6",
                },
              ].map((strength, index) => {
                const IconComponent = strength.icon
                return (
                  <div
                    key={index}
                    className={`bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl border border-blue-100 hover:shadow-lg transition-all duration-700 ${
                      strengths.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    }`}
                    style={{ transitionDelay: `${index * 100 + 200}ms` }}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: strength.color }}
                      >
                        <IconComponent className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold mb-3" style={{ color: strength.color }}>
                          {strength.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">{strength.description}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
