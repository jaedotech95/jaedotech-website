"use client"
import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { StickyHeader } from "@/components/sticky-header"
import { Footer } from "@/components/footer"
import { useLanguage } from "@/lib/i18n"
import { createClient } from "@/lib/supabase/client"
import { ChevronLeft, MapPin, Calendar, Tag } from "lucide-react"
import { ProjectDetailSkeleton } from "@/components/project-skeleton"

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

export default function ProjectDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { t } = useLanguage()
  const [project, setProject] = useState<InstallationCase | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState<string>("")

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    async function fetchProject() {
      if (!params.id) return

      try {
        const supabase = createClient()
        const { data, error } = await supabase.from("installation_cases").select("*").eq("id", params.id).single()

        if (error) {
          console.error("[v0] Error fetching project:", error)
          return
        }

        if (data) {
          setProject(data)
          setSelectedImage(data.image_url)
        }
      } catch (error) {
        console.error("[v0] Error in fetchProject:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProject()
  }, [params.id])

  const translateCategory = (category: string) => {
    const categoryMap: { [key: string]: string } = {
      파렛트랙: "products.pallet",
      경량랙: "products.light",
      중량랙: "products.heavy",
      중이층랙: "products.mezzanine",
      "슬라이딩 랙": "products.sliding",
      슬라이딩랙: "products.sliding",
      캔틸레버랙: "products.cantilever",
    }

    return categoryMap[category] ? t(categoryMap[category]) : category
  }

  if (loading) {
    return (
      <main className="min-h-screen">
        <StickyHeader />
        <div className="pt-28 pb-6">
          <div className="container mx-auto px-4">
            <div className="h-6 bg-gray-200 rounded w-48 animate-pulse" />
          </div>
        </div>
        <ProjectDetailSkeleton />
      </main>
    )
  }

  if (!project) {
    return (
      <main className="min-h-screen">
        <StickyHeader />
        <div className="container mx-auto px-4 py-32 text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">{t("projects.notFound")}</h1>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold"
          >
            <ChevronLeft className="w-5 h-5" />
            {t("projects.backToList")}
          </Link>
        </div>
        <Footer />
      </main>
    )
  }

  // Combine main image with detail images for gallery
  const allImages =
    project.detail_images && project.detail_images.length > 0
      ? [project.image_url, ...project.detail_images]
      : [project.image_url]

  return (
    <main className="min-h-screen bg-white">
      <StickyHeader />

      {/* Back Button */}
      <div className="container mx-auto px-4 pt-20 pb-3 md:pt-28 md:pb-6">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 font-semibold transition-colors text-sm md:text-base"
        >
          <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
          {t("projects.backToList")}
        </Link>
      </div>

      {/* Project Detail */}
      <div className="container mx-auto px-4 pb-8 md:pb-16">
        <div className="max-w-6xl mx-auto">
          {/* Title and Meta Info */}
          <div className="mb-6 md:mb-8">
            <h1
              className="text-xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4 text-balance"
              style={{ color: "#0055A6" }}
            >
              {project.title}
            </h1>
            <div className="flex flex-wrap gap-2 md:gap-4 text-sm md:text-base text-gray-600">
              <div className="flex items-center gap-1.5 md:gap-2">
                <MapPin className="w-4 h-4 md:w-5 md:h-5" />
                <span>{project.location}</span>
              </div>
              {project.completed_date && (
                <div className="flex items-center gap-1.5 md:gap-2">
                  <Calendar className="w-4 h-4 md:w-5 md:h-5" />
                  <span>{new Date(project.completed_date).toLocaleDateString("ko-KR")}</span>
                </div>
              )}
              <div className="flex items-center gap-1.5 md:gap-2">
                <Tag className="w-4 h-4 md:w-5 md:h-5" />
                <span
                  className="px-2 md:px-3 py-0.5 md:py-1 bg-blue-50 rounded-full text-xs md:text-sm font-medium"
                  style={{ color: "#0055A6" }}
                >
                  {translateCategory(project.category)}
                </span>
              </div>
            </div>
          </div>

          {/* Main Image */}
          <div className="mb-6 md:mb-8">
            <div className="aspect-video bg-gray-100 rounded-xl md:rounded-2xl overflow-hidden relative">
              <Image
                src={selectedImage || "/placeholder.svg"}
                alt={project.title}
                fill
                className="object-cover"
                sizes="(max-width: 1200px) 100vw, 1200px"
                priority
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwAB//2Q=="
              />
            </div>
          </div>

          {/* Image Gallery Thumbnails */}
          {project.detail_images && project.detail_images.length > 0 && (
            <div className="mb-8 md:mb-12">
              <h3 className="text-base md:text-xl font-bold mb-3 md:mb-4" style={{ color: "#0055A6" }}>
                {t("projects.projectImages")}
              </h3>
              <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 md:gap-4">
                {allImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(image)}
                    className={`aspect-square bg-gray-100 rounded-md md:rounded-lg overflow-hidden relative hover:ring-2 md:hover:ring-4 hover:ring-blue-200 transition-all ${
                      selectedImage === image ? "ring-2 md:ring-4 ring-blue-500" : ""
                    }`}
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${project.title} - 이미지 ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 33vw, (max-width: 1024px) 25vw, 200px"
                      loading="lazy"
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwAB//2Q=="
                    />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Project Description */}
          <div className="mb-8 md:mb-12">
            <h3 className="text-base md:text-xl font-bold mb-3 md:mb-4" style={{ color: "#0055A6" }}>
              {t("projects.projectOverview")}
            </h3>
            <p className="text-sm md:text-base lg:text-lg text-gray-700 leading-relaxed">{project.description}</p>
          </div>

          {/* Project Details */}
          {project.details && (
            <div className="mb-8 md:mb-12">
              <h3 className="text-base md:text-xl font-bold mb-3 md:mb-4" style={{ color: "#0055A6" }}>
                {t("projects.detailedContent")}
              </h3>
              <div className="prose prose-sm md:prose-lg max-w-none">
                <p className="text-sm md:text-base text-gray-700 leading-relaxed whitespace-pre-line">
                  {project.details}
                </p>
              </div>
            </div>
          )}

          {/* CTA Section */}
          <div className="mt-8 md:mt-16 p-6 md:p-8 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl md:rounded-2xl text-center">
            <h3 className="text-base md:text-2xl font-bold mb-3 md:mb-4" style={{ color: "#0055A6" }}>
              {t("projects.similarProject")}
            </h3>
            <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6 leading-relaxed">
              {t("projects.ctaDescription")}
            </p>
            <Link
              href="/quote"
              className="inline-block px-6 md:px-8 py-3 md:py-4 rounded-lg font-semibold text-sm md:text-base text-white shadow-lg hover:shadow-xl transition-all hover:scale-105"
              style={{ backgroundColor: "#0055A6" }}
            >
              {t("projects.freeQuote")}
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
