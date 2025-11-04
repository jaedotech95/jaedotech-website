"use client"

import { useEffect, useState } from "react"
import { useLanguage } from "@/lib/i18n"

export function SectionIndicator() {
  const [activeSection, setActiveSection] = useState("")
  const [isVisible, setIsVisible] = useState(false)
  const { t } = useLanguage()

  const sectionIds = ["products", "projects", "quote"]

  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const heroSection = document.getElementById("hero")
          const heroHeight = heroSection ? heroSection.offsetHeight : 0
          const scrollPosition = window.scrollY

          if (scrollPosition < heroHeight - 200) {
            setIsVisible(false)
            setActiveSection("")
            ticking = false
            return
          }

          setIsVisible(true)

          let maxVisibleSection = ""
          let maxVisibleArea = 0

          sectionIds.forEach((sectionId) => {
            const element = document.getElementById(sectionId)
            if (element) {
              const rect = element.getBoundingClientRect()
              const viewportHeight = window.innerHeight

              const visibleTop = Math.max(0, rect.top)
              const visibleBottom = Math.min(viewportHeight, rect.bottom)
              const visibleArea = Math.max(0, visibleBottom - visibleTop)

              if (visibleArea > maxVisibleArea && visibleArea > viewportHeight * 0.3) {
                maxVisibleArea = visibleArea
                maxVisibleSection = sectionId
              }
            }
          })

          if (maxVisibleSection) {
            setActiveSection(maxVisibleSection)
          }

          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const headerOffset = 20
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.scrollY - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
  }

  const sections = [
    { id: "products", label: t("nav.products") },
    { id: "projects", label: t("nav.projects") },
    { id: "quote", label: t("nav.quote") },
  ]

  return (
    <div
      className={`fixed right-8 top-1/2 -translate-y-1/2 z-40 hidden lg:block transition-all duration-500 ${
        isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8 pointer-events-none"
      }`}
    >
      <div className="relative flex flex-col gap-6 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md rounded-2xl py-6 px-6 shadow-2xl border border-gray-200 dark:border-gray-700">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            className="group relative flex justify-center items-center"
            aria-label={`Go to ${section.label}`}
          >
            <span
              className={`block font-medium whitespace-nowrap transition-all duration-300 ease-out
                ${
                  activeSection === section.id
                    ? "text-lg text-[#0055A6] font-bold scale-105"
                    : "text-sm text-gray-500 dark:text-gray-400 group-hover:text-[#0055A6] group-hover:scale-105"
                }
              `}
            >
              {section.label}
            </span>

            <div
              className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-[#0055A6] transition-all duration-300 ease-out
                ${
                  activeSection === section.id
                    ? "w-full opacity-100"
                    : "w-0 opacity-0 group-hover:w-full group-hover:opacity-50"
                }
              `}
            />
          </button>
        ))}
      </div>
    </div>
  )
}
