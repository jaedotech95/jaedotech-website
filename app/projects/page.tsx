"use client"

import type React from "react"

import { StickyHeader } from "@/components/sticky-header"
import { Footer } from "@/components/footer"
import { useLanguage } from "@/lib/i18n"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

export default function ProjectsPage() {
  const { t, language } = useLanguage()
  const hero = useScrollAnimation()
  const projectsGrid = useScrollAnimation()
  const cta = useScrollAnimation()

  const [currentPage, setCurrentPage] = useState(1)
  const projectsPerPage = 9

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const allProjects = [
    {
      id: 1,
      titleKey: "projects.project1.title",
      locationKey: "projects.project1.location",
      typeKey: "projects.project1.type",
      image: "/large-warehouse-pallet-rack-installation.jpg",
      year: "2024",
    },
    {
      id: 2,
      titleKey: "projects.project2.title",
      locationKey: "projects.project2.location",
      typeKey: "projects.project2.type",
      image: "/manufacturing-heavy-duty-racks.jpg",
      year: "2024",
    },
    {
      id: 3,
      titleKey: "projects.project3.title",
      locationKey: "projects.project3.location",
      typeKey: "projects.project3.type",
      image: "/ecommerce-warehouse-light-racks.jpg",
      year: "2023",
    },
    {
      id: 4,
      titleKey: "projects.project4.title",
      locationKey: "projects.project4.location",
      typeKey: "projects.project4.type",
      image: "/cold-storage-drive-in-racks.jpg",
      year: "2023",
    },
    {
      id: 5,
      titleKey: "projects.project5.title",
      locationKey: "projects.project5.location",
      typeKey: "projects.project5.type",
      image: "/automotive-cantilever-rack-system.jpg",
      year: "2023",
    },
    {
      id: 6,
      titleKey: "projects.project6.title",
      locationKey: "projects.project6.location",
      typeKey: "projects.project6.type",
      image: "/food-distribution-push-back-racks.jpg",
      year: "2022",
    },
    {
      id: 7,
      titleKey: "projects.project7.title",
      locationKey: "projects.project7.location",
      typeKey: "projects.project7.type",
      image: "/large-warehouse-pallet-rack-installation.jpg",
      year: "2024",
    },
    {
      id: 8,
      titleKey: "projects.project8.title",
      locationKey: "projects.project8.location",
      typeKey: "projects.project8.type",
      image: "/manufacturing-heavy-duty-racks.jpg",
      year: "2024",
    },
    {
      id: 9,
      titleKey: "projects.project1.title",
      locationKey: "projects.project1.location",
      typeKey: "projects.project1.type",
      image: "/ecommerce-warehouse-light-racks.jpg",
      year: "2023",
    },
    {
      id: 10,
      titleKey: "projects.project2.title",
      locationKey: "projects.project2.location",
      typeKey: "projects.project2.type",
      image: "/cold-storage-drive-in-racks.jpg",
      year: "2023",
    },
    {
      id: 11,
      titleKey: "projects.project3.title",
      locationKey: "projects.project3.location",
      typeKey: "projects.project3.type",
      image: "/automotive-cantilever-rack-system.jpg",
      year: "2023",
    },
    {
      id: 12,
      titleKey: "projects.project4.title",
      locationKey: "projects.project4.location",
      typeKey: "projects.project4.type",
      image: "/food-distribution-push-back-racks.jpg",
      year: "2022",
    },
    {
      id: 13,
      titleKey: "projects.project5.title",
      locationKey: "projects.project5.location",
      typeKey: "projects.project5.type",
      image: "/large-warehouse-pallet-rack-installation.jpg",
      year: "2024",
    },
    {
      id: 14,
      titleKey: "projects.project6.title",
      locationKey: "projects.project6.location",
      typeKey: "projects.project6.type",
      image: "/manufacturing-heavy-duty-racks.jpg",
      year: "2024",
    },
    {
      id: 15,
      titleKey: "projects.project7.title",
      locationKey: "projects.project7.location",
      typeKey: "projects.project7.type",
      image: "/ecommerce-warehouse-light-racks.jpg",
      year: "2023",
    },
    {
      id: 16,
      titleKey: "projects.project8.title",
      locationKey: "projects.project8.location",
      typeKey: "projects.project8.type",
      image: "/cold-storage-drive-in-racks.jpg",
      year: "2023",
    },
    {
      id: 17,
      titleKey: "projects.project1.title",
      locationKey: "projects.project1.location",
      typeKey: "projects.project1.type",
      image: "/automotive-cantilever-rack-system.jpg",
      year: "2023",
    },
    {
      id: 18,
      titleKey: "projects.project2.title",
      locationKey: "projects.project2.location",
      typeKey: "projects.project2.type",
      image: "/food-distribution-push-back-racks.jpg",
      year: "2022",
    },
  ]

  const totalPages = Math.ceil(allProjects.length / projectsPerPage)
  const indexOfLastProject = currentPage * projectsPerPage
  const indexOfFirstProject = indexOfLastProject - projectsPerPage
  const currentProjects = allProjects.slice(indexOfFirstProject, indexOfLastProject)

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <main className="min-h-screen">
      <StickyHeader />

      {/* Hero Section */}
      <section
        ref={hero.elementRef as React.RefObject<HTMLElement>}
        className={`pt-20 pb-6 md:pt-24 md:pb-8 bg-gradient-to-b from-blue-50 to-white transition-all duration-1000 ${
          hero.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 text-balance" style={{ color: "#0055A6" }}>
              {t("projects.title")}
            </h1>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed text-pretty">{t("projects.subtitle")}</p>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section ref={projectsGrid.elementRef as React.RefObject<HTMLElement>} className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentProjects.map((project, index) => (
                <div
                  key={project.id}
                  className={`bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-700 group border border-gray-100 ${
                    projectsGrid.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="aspect-[4/3] bg-gray-100 overflow-hidden relative">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={t(project.titleKey)}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="text-white text-lg font-semibold px-6 py-3 border-2 border-white rounded-lg">
                        {t("projects.viewDetails")}
                      </span>
                    </div>
                    <div
                      className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold"
                      style={{ color: "#0055A6" }}
                    >
                      {project.year}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3
                      className="text-xl md:text-2xl font-bold mb-2 group-hover:text-blue-600 transition-colors"
                      style={{ color: "#0055A6" }}
                    >
                      {t(project.titleKey)}
                    </h3>
                    <p className="text-gray-500 text-sm mb-3">{t(project.locationKey)}</p>
                    <div className="flex items-center gap-2">
                      <span
                        className="inline-block px-3 py-1 bg-blue-50 rounded-full text-sm font-medium"
                        style={{ color: "#0055A6" }}
                      >
                        {t(project.typeKey)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center items-center gap-2 mt-12">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                &lt;
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
                <button
                  key={pageNumber}
                  onClick={() => handlePageChange(pageNumber)}
                  className={`px-4 py-2 rounded-lg border transition-colors ${
                    currentPage === pageNumber ? "text-white" : "border-gray-300 hover:bg-gray-100"
                  }`}
                  style={currentPage === pageNumber ? { backgroundColor: "#0055A6", borderColor: "#0055A6" } : {}}
                >
                  {pageNumber}
                </button>
              ))}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                &gt;
              </button>
            </div>
          </div>
        </div>
      </section>

      <section
        ref={cta.elementRef as React.RefObject<HTMLElement>}
        className={`py-16 md:py-24 relative overflow-hidden transition-all duration-1000 ${
          cta.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {/* Blurred background */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-gray-100 backdrop-blur-sm" />
        <div className="absolute inset-0 bg-white/60 backdrop-blur-md" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: "#0055A6" }}>
              {t("projects.cta.title")}
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">{t("hero.footer")}</p>
            <Link
              href="/quote"
              className="inline-block px-8 py-4 rounded-lg font-semibold text-white shadow-lg hover:shadow-xl transition-all hover:scale-105"
              style={{ backgroundColor: "#0055A6" }}
            >
              {t("hero.cta.quote")}
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
