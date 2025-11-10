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
    <main className="min-h-screen overflow-x-hidden">
      <StickyHeader />

      {/* Hero Section */}
      <section
        ref={hero.elementRef as React.RefObject<HTMLElement>}
        className={`pt-24 pb-4 md:pt-40 md:pb-6 bg-gradient-to-b from-blue-50 to-white transition-all duration-1000 ${
          hero.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center">
              <Image
                src="/images/design-mode/intro.png"
                alt="재도테크 - JAEDO TECHNOLOGY - 안전한 시공, 튼튼한 구조물"
                width={800}
                height={150}
                className="w-full max-w-3xl h-auto"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Company Introduction */}
      <section
        ref={intro.elementRef as React.RefObject<HTMLElement>}
        className={`pt-8 pb-12 md:pt-10 md:pb-16 transition-all duration-1000 delay-150 ${
          intro.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
              <div>
                <div className="text-center mb-6 md:mb-8">
                  <p className="text-lg md:text-xl lg:text-2xl font-bold text-gray-500">"{t("about.subtitle")}"</p>
                </div>
                <p className="text-gray-600 leading-relaxed mb-4 text-base md:text-lg">
                  {t("about.intro.description1")}
                </p>
                <p className="text-gray-600 leading-relaxed text-base md:text-lg">{t("about.intro.description2")}</p>
              </div>
              <div className="bg-gray-100 rounded-2xl aspect-square relative overflow-hidden">
                <Image
                  src="/images/design-mode/about.png.jpeg"
                  alt="Warehouse Pallet Rack System"
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
      <section ref={values.elementRef as React.RefObject<HTMLElement>} className="py-8 md:py-16 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2
              className={`text-xl md:text-3xl lg:text-4xl font-bold text-center mb-6 md:mb-12 transition-all duration-1000 ${
                values.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ color: "#0055A6" }}
            >
              {t("about.values.title")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
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
                  className={`bg-white p-4 md:p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-700 ${
                    values.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${index * 150 + 200}ms` }}
                >
                  <div
                    className="w-10 h-10 md:w-12 md:h-12 rounded-lg mb-3 md:mb-4 flex items-center justify-center"
                    style={{ backgroundColor: "#0055A6" }}
                  >
                    <span className="text-xl md:text-2xl text-white">{value.icon}</span>
                  </div>
                  <h3 className="text-base md:text-xl font-bold mb-2 md:mb-3" style={{ color: "#0055A6" }}>
                    {value.title}
                  </h3>
                  <p className="text-xs md:text-base text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Company Strengths */}
      <section ref={strengths.elementRef as React.RefObject<HTMLElement>} className="py-8 md:py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2
              className={`text-xl md:text-3xl lg:text-4xl font-bold text-center mb-3 md:mb-4 transition-all duration-1000 ${
                strengths.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ color: "#0055A6" }}
            >
              {t("about.strengths.title")}
            </h2>
            <p
              className={`text-center text-gray-600 mb-6 md:mb-12 text-sm md:text-lg transition-all duration-1000 delay-100 ${
                strengths.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              {t("about.strengths.subtitle")}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
              {[
                {
                  icon: Building2,
                  title: t("about.strengths.custom.title"),
                  description: t("about.strengths.custom.description"),
                  color: "#0055A6",
                },
                {
                  icon: Shield,
                  title: t("about.strengths.safety.title"),
                  description: t("about.strengths.safety.description"),
                  color: "#0055A6",
                },
                {
                  icon: Zap,
                  title: t("about.strengths.response.title"),
                  description: t("about.strengths.response.description"),
                  color: "#0055A6",
                },
                {
                  icon: CheckCircle2,
                  title: t("about.strengths.aftercare.title"),
                  description: t("about.strengths.aftercare.description"),
                  color: "#0055A6",
                },
              ].map((strength, index) => {
                const IconComponent = strength.icon
                return (
                  <div
                    key={index}
                    className={`bg-gradient-to-br from-blue-50 to-white p-4 md:p-8 rounded-2xl border border-blue-100 hover:shadow-lg transition-all duration-700 ${
                      strengths.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    }`}
                    style={{ transitionDelay: `${index * 100 + 200}ms` }}
                  >
                    <div className="flex items-start gap-3 md:gap-4">
                      <div
                        className="w-10 h-10 md:w-14 md:h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: strength.color }}
                      >
                        <IconComponent className="w-5 h-5 md:w-7 md:h-7 text-white" />
                      </div>
                      <div>
                        <h3 className="text-base md:text-xl font-bold mb-2 md:mb-3" style={{ color: strength.color }}>
                          {strength.title}
                        </h3>
                        <p className="text-xs md:text-base text-gray-600 leading-relaxed">{strength.description}</p>
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
