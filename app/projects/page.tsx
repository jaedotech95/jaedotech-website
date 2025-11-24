"use client"

import type React from "react"

import { StickyHeader } from "@/components/sticky-header"
import { Footer } from "@/components/footer"
import { useLanguage } from "@/lib/i18n"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { createClient } from "@/lib/supabase/client"
import { ProjectCardSkeleton } from "@/components/project-skeleton"
import { LayoutGrid, List } from "lucide-react"
import { OptimizedImage } from "@/components/optimized-image"
import { BreadcrumbSchema } from "@/components/breadcrumb-schema"

type InstallationCase = {
  id: string
  title: string
  description: string
  location: string
  category: string
  image_url: string
  detail_images?: string[]
  details?: string
  completed_date?: string
  created_at: string
  title_en?: string
  title_ja?: string
  description_en?: string
  description_ja?: string
  details_en?: string
  details_ja?: string
}

export default function ProjectsPage() {
  const { t, currentLanguage } = useLanguage() // Get current language
  const hero = useScrollAnimation()
  const projectsGrid = useScrollAnimation()
  const cta = useScrollAnimation()

  const [projects, setProjects] = useState<InstallationCase[]>([])
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState<"card" | "list">("card")

  const [currentPage, setCurrentPage] = useState(1)
  const projectsPerPage = 9

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    async function fetchProjects() {
      try {
        const supabase = createClient()
        const { data, error } = await supabase
          .from("installation_cases")
          .select("*")
          .order("completed_date", { ascending: false })

        if (error) {
          console.error("[v0] Error fetching projects:", error)
          return
        }

        if (data) {
          setProjects(data)
        }
      } catch (error) {
        console.error("[v0] Error in fetchProjects:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  const totalPages = Math.ceil(projects.length / projectsPerPage)
  const indexOfLastProject = currentPage * projectsPerPage
  const indexOfFirstProject = indexOfLastProject - projectsPerPage
  const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject)

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const translateCategory = (category: string): string => {
    const categoryMap: Record<string, string> = {
      파렛트랙: t("products.pallet"),
      "파렛트랙 시스템": t("products.pallet"),
      경량랙: t("products.light"),
      중량랙: t("products.heavy"),
      중이층랙: t("products.mezzanine"),
      슬라이딩랙: t("products.sliding"),
      드라이브인랙: t("products.drivein"),
      푸시백랙: t("products.pushback"),
      캔틸레버랙: t("products.cantilever"),
      특수랙: t("products.pallet"), // fallback
      시스템랙: t("products.pallet"), // fallback
      자동화랙: t("products.pallet"), // fallback
    }
    return categoryMap[category] || category
  }

  const breadcrumbItems = [
    { name: "홈", url: "https://jaedotech.com" },
    { name: "설치사례", url: "https://jaedotech.com/projects" },
  ]

  return (
    <main className="min-h-screen">
      <BreadcrumbSchema items={breadcrumbItems} />
      <StickyHeader />

      {/* Hero Section */}
      <section
        ref={hero.elementRef as React.RefObject<HTMLElement>}
        className={`pt-24 pb-4 md:pt-32 md:pb-6 bg-gradient-to-b from-blue-50 to-white transition-all duration-1000 ${
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
      <section ref={projectsGrid.elementRef as React.RefObject<HTMLElement>} className="py-8 md:py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-center md:justify-end mb-6 md:mb-8">
              <div className="inline-flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("card")}
                  className={`flex items-center gap-2 px-3 md:px-4 py-2 rounded-md transition-all ${
                    viewMode === "card" ? "bg-white shadow-sm text-blue-600" : "text-gray-600 hover:text-gray-900"
                  }`}
                  aria-label="Card view"
                >
                  <LayoutGrid className="w-4 h-4" />
                  <span className="text-sm font-medium hidden sm:inline">{t("projects.cardView")}</span>
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`flex items-center gap-2 px-3 md:px-4 py-2 rounded-md transition-all ${
                    viewMode === "list" ? "bg-white shadow-sm text-blue-600" : "text-gray-600 hover:text-gray-900"
                  }`}
                  aria-label="List view"
                >
                  <List className="w-4 h-4" />
                  <span className="text-sm font-medium hidden sm:inline">{t("projects.listView")}</span>
                </button>
              </div>
            </div>

            {loading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Array.from({ length: 6 }).map((_, index) => (
                  <ProjectCardSkeleton key={index} />
                ))}
              </div>
            ) : projects.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-gray-500 text-lg">{t("projects.noProjects")}</p>
              </div>
            ) : (
              <>
                {viewMode === "card" ? (
                  <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
                    {currentProjects.map((project, index) => {
                      const localizedTitle = project.title
                      const localizedDescription = project.description
                      const localizedDetails = project.details

                      return (
                        <Link
                          key={project.id}
                          href={`/projects/${project.id}`}
                          className={`group bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 ${
                            projectsGrid.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                          }`}
                          style={{ transitionDelay: `${index * 50}ms` }}
                        >
                          <div className="aspect-[4/3] bg-gray-100 overflow-hidden relative">
                            <OptimizedImage
                              src={project.image_url || "/placeholder.svg"}
                              alt={localizedTitle}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                              priority={index < 3}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            {project.completed_date && (
                              <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-gray-700 shadow-sm">
                                {new Date(project.completed_date).getFullYear()}
                              </div>
                            )}
                          </div>
                          <div className="p-3 md:p-5">
                            <div className="flex items-start justify-between gap-2 mb-2 md:mb-3 min-h-[2.5rem] md:min-h-0">
                              <h3 className="text-xs md:text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 flex-1">
                                {localizedTitle}
                              </h3>
                            </div>
                            <div className="flex items-center gap-1 md:gap-2 text-[10px] md:text-sm text-gray-500 mb-2 md:mb-3">
                              <svg
                                className="w-3 h-3 md:w-4 md:h-4"
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
                              <span className="truncate text-[10px] md:text-sm">{project.location}</span>
                            </div>
                            <div className="flex items-center justify-between mt-4 md:mt-0">
                              <span className="inline-flex items-center px-2 py-0.5 md:px-3 md:py-1 bg-blue-50 text-blue-700 rounded-full text-[10px] md:text-xs font-medium">
                                {translateCategory(project.category)}
                              </span>
                              <span className="text-blue-600 text-[10px] md:text-sm font-medium group-hover:translate-x-1 transition-transform">
                                {t("projects.viewDetail")} →
                              </span>
                            </div>
                          </div>
                        </Link>
                      )
                    })}
                  </div>
                ) : (
                  <div className="space-y-3 md:space-y-4">
                    {currentProjects.map((project, index) => {
                      const localizedTitle = project.title
                      const localizedDescription = project.description
                      const localizedDetails = project.details

                      return (
                        <Link
                          key={project.id}
                          href={`/projects/${project.id}`}
                          className={`group flex flex-row gap-3 md:gap-4 bg-white rounded-lg md:rounded-xl overflow-hidden border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-300 p-2 md:p-0 ${
                            projectsGrid.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                          }`}
                          style={{ transitionDelay: `${index * 50}ms` }}
                        >
                          <div className="w-24 h-24 md:w-64 md:aspect-[4/3] md:h-auto bg-gray-100 overflow-hidden relative flex-shrink-0 rounded md:rounded-none">
                            <OptimizedImage
                              src={project.image_url || "/placeholder.svg"}
                              alt={localizedTitle}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                              sizes="(max-width: 640px) 96px, 256px"
                              priority={index < 3}
                            />
                            {project.completed_date && (
                              <div className="absolute top-1 right-1 md:top-3 md:right-3 bg-white/95 backdrop-blur-sm px-2 py-0.5 md:px-3 md:py-1 rounded-full text-[10px] md:text-xs font-semibold text-gray-700 shadow-sm">
                                {new Date(project.completed_date).getFullYear()}
                              </div>
                            )}
                          </div>
                          <div className="flex-1 py-1 md:p-5 flex flex-col justify-between min-w-0">
                            <div>
                              <div className="flex items-start justify-between gap-2 mb-1 md:mb-2">
                                <h3 className="text-sm md:text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 flex-1">
                                  {localizedTitle}
                                </h3>
                                <span className="hidden md:inline-flex items-center px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium whitespace-nowrap">
                                  {translateCategory(project.category)}
                                </span>
                              </div>
                              <div className="flex items-center gap-1 md:gap-2 mb-1 md:mb-3">
                                <svg
                                  className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0"
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
                                <span className="truncate text-xs md:text-sm text-gray-500">{project.location}</span>
                              </div>
                              {localizedDescription && (
                                <p className="hidden md:block text-sm text-gray-600 line-clamp-2 mb-3">
                                  {localizedDescription}
                                </p>
                              )}
                              {localizedDetails && (
                                <p className="hidden md:block text-sm text-gray-600 line-clamp-2 mb-3">
                                  {localizedDetails}
                                </p>
                              )}
                            </div>
                            <div className="flex items-center justify-between mt-2 md:mt-0">
                              <span className="md:hidden inline-flex items-center px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full text-[10px] font-medium whitespace-nowrap">
                                {translateCategory(project.category)}
                              </span>
                              <span className="md:hidden text-blue-600 text-xs font-medium whitespace-nowrap">
                                {t("projects.viewDetail")} →
                              </span>
                              <span className="hidden md:inline-flex text-blue-600 text-sm font-medium group-hover:translate-x-1 transition-transform ml-auto">
                                {t("projects.viewDetail")} →
                              </span>
                            </div>
                          </div>
                        </Link>
                      )
                    })}
                  </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-2 mt-12">
                    {/* Previous Button */}
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="group flex items-center gap-1.5 px-3 md:px-4 py-2 rounded-lg border-2 transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent hover:bg-[#0055A6]/5 border-gray-200 hover:border-[#0055A6]/30"
                      aria-label="Previous page"
                    >
                      <svg
                        className="w-4 h-4 text-gray-600 group-hover:text-[#0055A6] transition-colors"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      <span className="hidden sm:inline text-sm font-medium text-gray-700 group-hover:text-[#0055A6] transition-colors">
                        이전
                      </span>
                    </button>

                    {/* Page Numbers */}
                    <div className="flex items-center gap-1 px-2">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
                        <button
                          key={pageNumber}
                          onClick={() => handlePageChange(pageNumber)}
                          className={`min-w-[2.5rem] h-10 px-3 rounded-lg font-semibold text-sm transition-all ${
                            currentPage === pageNumber
                              ? "bg-[#0055A6] text-white shadow-md shadow-[#0055A6]/20"
                              : "bg-white border-2 border-gray-200 text-gray-700 hover:border-[#0055A6]/30 hover:bg-[#0055A6]/5 hover:text-[#0055A6]"
                          }`}
                          aria-label={`Page ${pageNumber}`}
                          aria-current={currentPage === pageNumber ? "page" : undefined}
                        >
                          {pageNumber}
                        </button>
                      ))}
                    </div>

                    {/* Next Button */}
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="group flex items-center gap-1.5 px-3 md:px-4 py-2 rounded-lg border-2 transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent hover:bg-[#0055A6]/5 border-gray-200 hover:border-[#0055A6]/30"
                      aria-label="Next page"
                    >
                      <span className="hidden sm:inline text-sm font-medium text-gray-700 group-hover:text-[#0055A6] transition-colors">
                        다음
                      </span>
                      <svg
                        className="w-4 h-4 text-gray-600 group-hover:text-[#0055A6] transition-colors"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        ref={cta.elementRef as React.RefObject<HTMLElement>}
        className={`py-8 md:py-24 relative overflow-hidden transition-all duration-1000 ${
          cta.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-gray-100 backdrop-blur-sm" />
        <div className="absolute inset-0 bg-white/60 backdrop-blur-md" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-xl md:text-4xl font-bold mb-3 md:mb-6" style={{ color: "#0055A6" }}>
              {t("projects.cta.title")}
            </h2>
            <p className="text-sm md:text-lg text-gray-600 mb-4 md:mb-8 leading-relaxed">{t("hero.footer")}</p>
            <Link
              href="/quote"
              className="inline-block px-6 py-3 md:px-8 md:py-4 rounded-lg font-semibold text-white shadow-lg hover:shadow-xl transition-all hover:scale-105 text-sm md:text-base"
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
