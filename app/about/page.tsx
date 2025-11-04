"use client"

import type React from "react"

import { StickyHeader } from "@/components/sticky-header"
import { Footer } from "@/components/footer"
import { useLanguage } from "@/lib/i18n"
import Image from "next/image"
import { useEffect } from "react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

export default function AboutPage() {
  const { t } = useLanguage()
  const hero = useScrollAnimation()
  const intro = useScrollAnimation()
  const values = useScrollAnimation()
  const stats = useScrollAnimation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <main className="min-h-screen">
      <StickyHeader />

      {/* Hero Section */}
      <section
        ref={hero.elementRef as React.RefObject<HTMLElement>}
        className={`pt-32 pb-16 md:pt-40 md:pb-24 bg-gradient-to-b from-blue-50 to-white transition-all duration-1000 ${
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
        className={`py-16 md:py-24 transition-all duration-1000 delay-150 ${
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
                <p className="text-gray-600 leading-relaxed mb-4">{t("about.intro.description1")}</p>
                <p className="text-gray-600 leading-relaxed">{t("about.intro.description2")}</p>
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

      {/* Company Stats */}
      <section ref={stats.elementRef as React.RefObject<HTMLElement>} className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { value: "20+", label: t("about.stats.years") },
                { value: "1000+", label: t("about.stats.projects") },
                { value: "500+", label: t("about.stats.clients") },
                { value: "100%", label: t("about.stats.satisfaction") },
              ].map((stat, index) => (
                <div
                  key={index}
                  className={`text-center transition-all duration-700 ${
                    stats.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="text-4xl md:text-5xl font-bold mb-2" style={{ color: "#0055A6" }}>
                    {stat.value}
                  </div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
