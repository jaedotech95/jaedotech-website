"use client"

import type React from "react"

import { StickyHeader } from "@/components/sticky-header"
import { Footer } from "@/components/footer"
import { useLanguage } from "@/lib/i18n"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { createClient } from "@/lib/supabase/client"
import { ProjectCardSkeleton } from "@/components/project-skeleton"
import { LayoutGrid, List } from "lucide-react"

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
}

export default function ProjectsPage() {
  const { t } = useLanguage()
  const hero = useScrollAnimation()
  const projectsGrid = useScrollAnimation()
  const cta = useScrollAnimation()

  const [projects, setProjects] = useState<InstallationCase[]>([])
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState<"card" | "list">("card")

  const [currentPage, setCurrentPage] = useState(1)
  const projectsPerPage = 9

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
    window.scrollTo(0, 0)
  }, [])

  const totalPages = Math.ceil(projects.length / projectsPerPage)
  const indexOfLastProject = currentPage * projectsPerPage
  const indexOfFirstProject = indexOfLastProject - projectsPerPage
  const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject)

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
            <div className="flex justify-end mb-8">
              <div className="inline-flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("card")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all ${
                    viewMode === "card" ? "bg-white shadow-sm text-blue-600" : "text-gray-600 hover:text-gray-900"
                  }`}
                  aria-label="Card view"
                >
                  <LayoutGrid className="w-4 h-4" />
                  <span className="text-sm font-medium hidden sm:inline">카드</span>
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all ${
                    viewMode === "list" ? "bg-white shadow-sm text-blue-600" : "text-gray-600 hover:text-gray-900"
                  }`}
                  aria-label="List view"
                >
                  <List className="w-4 h-4" />
                  <span className="text-sm font-medium hidden sm:inline">리스트</span>
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
                <p className="text-gray-500 text-lg">등록된 설치사례가 없습니다.</p>
              </div>
            ) : (
              <>
                {viewMode === "card" ? (
                  // Card View
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {currentProjects.map((project, index) => (
                      <Link
                        key={project.id}
                        href={`/projects/${project.id}`}
                        className={`group bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 ${
                          projectsGrid.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                        }`}
                        style={{ transitionDelay: `${index * 50}ms` }}
                      >
                        <div className="aspect-[4/3] bg-gray-100 overflow-hidden relative">
                          <Image
                            src={project.image_url || "/placeholder.svg"}
                            alt={project.title}
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
                        <div className="p-5">
                          <div className="flex items-start justify-between gap-2 mb-3">
                            <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 flex-1">
                              {project.title}
                            </h3>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                            <span>{project.location}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="inline-flex items-center px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
                              {project.category}
                            </span>
                            <span className="text-blue-600 text-sm font-medium group-hover:translate-x-1 transition-transform">
                              자세히 보기 →
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  // List View
                  <div className="space-y-4">
                    {currentProjects.map((project, index) => (
                      <Link
                        key={project.id}
                        href={`/projects/${project.id}`}
                        className={`group flex flex-col sm:flex-row gap-4 bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-300 ${
                          projectsGrid.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                        }`}
                        style={{ transitionDelay: `${index * 50}ms` }}
                      >
                        <div className="sm:w-64 aspect-[4/3] sm:aspect-auto sm:h-48 bg-gray-100 overflow-hidden relative flex-shrink-0">
                          <Image
                            src={project.image_url || "/placeholder.svg"}
                            alt={project.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            sizes="(max-width: 640px) 100vw, 256px"
                            priority={index < 3}
                          />
                          {project.completed_date && (
                            <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-gray-700 shadow-sm">
                              {new Date(project.completed_date).getFullYear()}
                            </div>
                          )}
                        </div>
                        <div className="flex-1 p-5 flex flex-col justify-between">
                          <div>
                            <div className="flex items-start justify-between gap-4 mb-2">
                              <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                                {project.title}
                              </h3>
                              <span className="inline-flex items-center px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium whitespace-nowrap">
                                {project.category}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                              <span>{project.location}</span>
                            </div>
                            {project.description && (
                              <p className="text-sm text-gray-600 line-clamp-2 mb-3">{project.description}</p>
                            )}
                          </div>
                          <div className="flex items-center justify-end">
                            <span className="text-blue-600 text-sm font-medium group-hover:translate-x-1 transition-transform">
                              자세히 보기 →
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-2 mt-12">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="px-3 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      aria-label="Previous page"
                    >
                      &lt;
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
                      <button
                        key={pageNumber}
                        onClick={() => handlePageChange(pageNumber)}
                        className={`px-4 py-2 rounded-lg border transition-colors ${
                          currentPage === pageNumber
                            ? "bg-blue-600 text-white border-blue-600"
                            : "border-gray-300 hover:bg-gray-50 text-gray-700"
                        }`}
                        aria-label={`Page ${pageNumber}`}
                        aria-current={currentPage === pageNumber ? "page" : undefined}
                      >
                        {pageNumber}
                      </button>
                    ))}

                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="px-3 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      aria-label="Next page"
                    >
                      &gt;
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
        className={`py-16 md:py-24 relative overflow-hidden transition-all duration-1000 ${
          cta.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
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
