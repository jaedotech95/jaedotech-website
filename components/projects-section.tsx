"use client"

import { useEffect, useRef, useState } from "react"
import { useLanguage } from "@/lib/i18n"
import { createBrowserClient } from "@supabase/ssr"
import Link from "next/link"
import Image from "next/image"

interface InstallationCase {
  id: number
  title: string
  location: string
  category: string
  image_url: string
}

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
  const [projects, setProjects] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProjects = async () => {
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      )

      const { data, error } = await supabase
        .from("installation_cases")
        .select("*")
        .order("completed_date", { ascending: false })
        .limit(8)

      if (error) {
        console.error("Error fetching projects:", error)
        setLoading(false)
        return
      }

      const projectsWithLogo = [
        ...(data?.slice(0, 4) || []),
        {
          id: "logo",
          title: "JAEDOTECH",
          location: "",
          category: "",
          image_url:
            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/jaedotech_image-Qkc4A3SHk8yNVp4erLPg7s9Xahy7mT.png",
          isLogo: true,
        },
        ...(data?.slice(4, 7) || []),
      ]

      setProjects(projectsWithLogo)
      setLoading(false)
    }

    fetchProjects()
  }, [])

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
    <section
      id="projects"
      ref={sectionRef}
      className="pt-5 pb-4 md:pt-6 md:pb-16 lg:pt-8 lg:pb-20 pt-1 bg-white dark:bg-gray-800"
    >
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
        {loading ? (
          <div className="w-full max-w-[1350px] mx-auto grid grid-cols-2 md:grid-cols-8 md:grid-rows-4 md:aspect-[2/1] md:auto-rows-fr gap-1 md:gap-1.5">
            {Array.from({ length: 8 }).map((_, index) => {
              const pattern = bentoPattern[index] || { colSpan: "md:col-span-2", rowSpan: "md:row-span-1" }
              return (
                <div
                  key={index}
                  className={`${pattern.colSpan} ${pattern.rowSpan} bg-gray-200 dark:bg-gray-700 animate-pulse`}
                />
              )
            })}
          </div>
        ) : (
          <div className="w-full max-w-[1350px] mx-auto grid grid-cols-2 md:grid-cols-8 md:grid-rows-4 md:aspect-[2/1] md:auto-rows-fr gap-1 md:gap-1.5">
            {projects.map((project, index) => {
              const pattern = bentoPattern[index] || { colSpan: "md:col-span-2", rowSpan: "md:row-span-1" }
              const isLogo = project.isLogo

              if (isLogo) {
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
                    <div className="relative w-full aspect-square md:aspect-auto md:h-full overflow-hidden border-2 border-gray-200 dark:border-gray-700 shadow-md">
                      <Image
                        src={project.image_url || "/placeholder.svg"}
                        alt={project.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 25vw, 300px"
                        priority={index < 4}
                      />
                    </div>
                  </div>
                )
              }

              return (
                <Link
                  key={project.id}
                  href={`/projects/${project.id}`}
                  className={`group overflow-hidden relative ${pattern.colSpan} ${pattern.rowSpan} ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                  style={{
                    transitionDelay: `${index * 100}ms`,
                  }}
                >
                  <div className="relative w-full aspect-square md:aspect-auto md:h-full overflow-hidden border-2 border-gray-200 dark:border-gray-700 shadow-md transition-all duration-500 hover:shadow-2xl hover:border-[#0055A6]">
                    <Image
                      src={project.image_url || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 400px"
                      priority={index < 4}
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwAB//2Q=="
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-100 group-hover:opacity-0 transition-opacity duration-500">
                      <div className="absolute bottom-0 left-0 right-0 p-2 md:p-3 lg:p-4">
                        <h3 className="text-white text-[10px] md:text-xs lg:text-sm xl:text-base font-bold line-clamp-2 mb-1">
                          {project.title}
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
                          <span className="text-white/80 text-[9px] md:text-[10px] lg:text-xs">{project.location}</span>
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
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
