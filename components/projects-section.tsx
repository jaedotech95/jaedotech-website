"use client"

import { useEffect, useRef, useState } from "react"
import { useLanguage } from "@/lib/i18n"

const projects = [
  {
    id: 1,
    titleKey: "projects.project1.title",
    categoryKey: "projects.project1.type",
    locationKey: "projects.project1.location",
    image: "/large-warehouse-with-blue-pallet-racking-systems.jpg",
  },
  {
    id: 2,
    titleKey: "projects.project2.title",
    categoryKey: "projects.project2.type",
    locationKey: "projects.project2.location",
    image: "/industrial-factory-with-heavy-duty-storage-racks.jpg",
  },
  {
    id: 3,
    titleKey: "projects.project3.title",
    categoryKey: "projects.project3.type",
    locationKey: "projects.project3.location",
    image: "/distribution-center-with-light-duty-shelving-syste.jpg",
  },
  {
    id: 4,
    titleKey: "projects.project4.title",
    categoryKey: "projects.project4.type",
    locationKey: "projects.project4.location",
    image: "/cold-storage-warehouse-with-specialized-racking.jpg",
  },
  {
    id: 5,
    titleKey: "projects.project5.title",
    categoryKey: "projects.project5.type",
    locationKey: "projects.project5.location",
    image: "/automotive-parts-warehouse-with-organized-storage.jpg",
  },
  {
    id: 6,
    titleKey: "projects.project7.title",
    categoryKey: "projects.project7.type",
    locationKey: "projects.project7.location",
    image: "/food-logistics-center-with-clean-storage-racks.jpg",
  },
  {
    id: 7,
    titleKey: "projects.project6.title",
    categoryKey: "projects.project6.type",
    locationKey: "projects.project6.location",
    image: "/clothing-distribution-center-with-modern-racking.jpg",
  },
  {
    id: 8,
    titleKey: "projects.project8.title",
    categoryKey: "projects.project8.type",
    locationKey: "projects.project8.location",
    image: "/electronics-warehouse-with-automated-storage.jpg",
  },
]

const bentoPattern = [
  { colSpan: "md:col-span-3", rowSpan: "md:row-span-2" }, // Card 1: Large (rows 1-2, cols 1-3)
  { colSpan: "md:col-span-2", rowSpan: "md:row-span-2" }, // Card 2: Medium (rows 1-2, cols 4-5)
  { colSpan: "md:col-span-3", rowSpan: "md:row-span-2" }, // Card 3: Large (rows 1-2, cols 6-8)
  { colSpan: "md:col-span-2", rowSpan: "md:row-span-1" }, // Card 4: Small (row 3, cols 1-2)
  { colSpan: "md:col-span-3", rowSpan: "md:row-span-1" }, // Card 5: Wide (row 3, cols 3-5)
  { colSpan: "md:col-span-3", rowSpan: "md:row-span-1" }, // Card 6: Wide (row 3, cols 6-8)
  { colSpan: "md:col-span-4", rowSpan: "md:row-span-1" }, // Card 7: Wide (row 4, cols 1-4)
  { colSpan: "md:col-span-4", rowSpan: "md:row-span-1" }, // Card 8: Wide (row 4, cols 5-8)
]

export function ProjectsSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const { t } = useLanguage()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="projects" ref={sectionRef} className="py-20 md:py-24 lg:py-28 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4 md:px-8 lg:px-12 max-w-[1920px]">
        <div
          className={`flex justify-end mb-4 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
          }`}
        >
          <div className="relative -mr-4 md:-mr-8 lg:-mr-24 xl:-mr-32">
            <div className="bg-[#0055A6] pr-4 md:pr-8 lg:pr-24 xl:pr-32 pl-6 py-2 md:py-3 shadow-lg">
              <h2 className="text-lg md:text-2xl font-bold text-white">{t("projects.title")}</h2>
            </div>
          </div>
        </div>
        <div className="w-full max-w-[1350px] mx-auto grid grid-cols-2 md:grid-cols-8 md:grid-rows-4 md:aspect-[2/1] md:auto-rows-fr gap-1 md:gap-1.5">
          {projects.map((project, index) => {
            const pattern = bentoPattern[index] || { colSpan: "md:col-span-2", rowSpan: "md:row-span-1" }
            return (
              <div
                key={project.id}
                className={`group overflow-hidden relative ${pattern.colSpan} ${pattern.rowSpan} ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{
                  transitionDelay: `${index * 100}ms`,
                }}
              >
                <div className="relative w-full aspect-square md:aspect-auto md:h-full overflow-hidden border-2 border-gray-200 dark:border-gray-700 shadow-md hover:shadow-2xl hover:border-[#0055A6] transition-all duration-500">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={t(project.titleKey)}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-100 group-hover:opacity-0 transition-opacity duration-500">
                    <div className="absolute bottom-0 left-0 right-0 p-2 md:p-3 lg:p-4">
                      <h3 className="text-white text-[10px] md:text-xs lg:text-sm xl:text-base font-bold line-clamp-2 mb-1">
                        {t(project.titleKey)}
                      </h3>
                      <div className="flex items-center gap-1">
                        <svg
                          className="w-2.5 h-2.5 md:w-3 md:h-3 text-white/80"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        <span className="text-white/80 text-[9px] md:text-[10px] lg:text-xs">
                          {t(project.locationKey)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="absolute inset-0 backdrop-blur-md bg-black/20 dark:bg-white/10 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center p-4">
                    <div className="text-center transform transition-all duration-700 group-hover:scale-105">
                      <div className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 mx-auto mb-1.5 md:mb-2 flex items-center justify-center animate-pulse">
                        <svg
                          className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-white dark:text-gray-900 transition-transform duration-700 group-hover:scale-110 group-hover:rotate-12"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <circle cx="11" cy="11" r="8" strokeWidth="2" />
                          <path d="m21 21-4.35-4.35" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                      </div>
                      <span className="text-white dark:text-gray-900 text-[10px] md:text-xs lg:text-sm font-semibold block">
                        {t("projects.viewDetails")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
