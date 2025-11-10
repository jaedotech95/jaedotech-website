"use client"
import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/lib/i18n"

const SendIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m22 2-7 20-4-9-9-4Z" />
    <path d="M22 2 11 13" />
  </svg>
)

const UploadIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" x2="12" y1="3" y2="15" />
  </svg>
)

const XIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
)

const MailIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-6 h-6 md:w-8 md:h-8"
  >
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
)

const KakaoIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-6 h-6 md:w-8 md:h-8"
  >
    <path d="M12 3c5.799 0 10.5 3.664 10.5 8.185 0 4.52-4.701 8.184-10.5 8.184a13.5 13.5 0 0 1-1.727-.11l-4.408 2.883c-.501.265-.678.236-.472-.413l.892-3.678c-2.88-1.46-4.785-3.99-4.785-6.866C1.5 6.665 6.201 3 12 3zm5.907 8.06l1.47-1.424a.472.472 0 0 0-.656-.681l-1.787 1.73V7.668a.473.473 0 0 0-.944 0v5.518a.473.473 0 0 0 .944 0v-1.363l.216-.215 1.621 2.021a.473.473 0 0 0 .783-.233.422.422 0 0 0-.119-.335l-1.528-2.001zm-2.913 1.876a.473.473 0 0 0 .472-.472V9.046a.473.473 0 1 0-.944 0v3.418a.473.473 0 0 0 .472.472zm-1.173-.472a.472.472 0 0 0-.472.472.473.473 0 0 0 .472.472h2.456a.473.473 0 0 0 0-.944h-1.984V9.046a.472.472 0 0 0-.473-.472.422.422 0 0 0-.424.26l-.851 1.702-.85-1.702a.477.477 0 0 0-.425-.26.473.473 0 0 0-.473.472v3.418a.473.473 0 0 0 .472.472z" />
  </svg>
)

export function QuoteSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const { t } = useLanguage()
  const router = useRouter()

  const handleFormInteraction = () => {
    router.push("/quote")
  }

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
      id="quote"
      ref={sectionRef}
      className="min-h-screen pt-1 md:py-20 bg-gradient-to-b from-blue-50/30 to-white dark:from-gray-900 dark:to-gray-800"
    >
      <div className="container mx-auto px-4 pb-2.5 md:pb-0">
        <div
          className={`flex justify-center mb-3 mt-8 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="bg-[#0055A6] px-8 py-2 md:py-3 shadow-lg">
            <h2 className="text-base md:text-2xl font-bold text-white">{t("quote.title")}</h2>
          </div>
        </div>

        <div className="max-w-3xl mx-auto">
          <div
            className={`bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 md:p-12 transition-all duration-1000 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <form className="space-y-4 md:space-y-6" onClick={handleFormInteraction}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div>
                  <label htmlFor="company" className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">
                    {t("quote.company")} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    readOnly
                    className="w-full px-0 py-1.5 md:py-2 bg-transparent border-0 border-b-2 border-gray-300 focus:border-[#0055A6] focus:outline-none transition-colors text-gray-900 cursor-pointer text-sm md:text-base"
                    placeholder={t("quote.companyPlaceholder")}
                  />
                </div>
                <div>
                  <label htmlFor="name" className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">
                    {t("quote.name")} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    readOnly
                    className="w-full px-0 py-1.5 md:py-2 bg-transparent border-0 border-b-2 border-gray-300 focus:border-[#0055A6] focus:outline-none transition-colors text-gray-900 cursor-pointer text-sm md:text-base"
                    placeholder={t("quote.namePlaceholder")}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div>
                  <label htmlFor="phone" className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">
                    {t("quote.phone")} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    readOnly
                    className="w-full px-0 py-1.5 md:py-2 bg-transparent border-0 border-b-2 border-gray-300 focus:border-[#0055A6] focus:outline-none transition-colors text-gray-900 cursor-pointer text-sm md:text-base"
                    placeholder={t("quote.phonePlaceholder")}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">
                    {t("quote.email")} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    readOnly
                    className="w-full px-0 py-1.5 md:py-2 bg-transparent border-0 border-b-2 border-gray-300 focus:border-[#0055A6] focus:outline-none transition-colors text-gray-900 cursor-pointer text-sm md:text-base"
                    placeholder={t("quote.emailPlaceholder")}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">
                  {t("quote.message")} <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={3}
                  readOnly
                  className="w-full px-0 py-1.5 md:py-2 bg-transparent border-0 border-b-2 border-gray-300 focus:border-[#0055A6] focus:outline-none transition-colors resize-none text-gray-900 cursor-pointer text-sm md:text-base"
                  placeholder={t("quote.messagePlaceholder")}
                />
              </div>

              <div>
                <label htmlFor="file" className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">
                  {t("quote.fileUpload")}{" "}
                  <span className="text-gray-400 text-[10px] md:text-xs ml-2">{t("quote.maxFileSize")}</span>
                </label>
                <div className="relative">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors cursor-pointer text-gray-700 border-2 border-gray-300">
                    <UploadIcon />
                    <span className="text-xs md:text-sm font-medium">{t("quote.selectFile")}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-4 mt-6 md:mt-8">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="privacy"
                    readOnly
                    className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#0055A6] border-gray-300 rounded focus:ring-[#0055A6] cursor-pointer"
                  />
                  <label htmlFor="privacy" className="text-xs md:text-sm text-gray-700 cursor-pointer">
                    <span className="font-bold text-[#0055A6]">{t("quote.privacyAgree")}</span>
                  </label>
                </div>

                <button
                  type="button"
                  className="group flex items-center justify-center gap-2 px-6 py-2 md:px-8 md:py-3 bg-[#0055A6] text-white rounded-lg hover:bg-[#004494] transition-all duration-300 hover:shadow-lg md:w-auto w-full font-semibold text-sm md:text-base"
                >
                  <span>{t("quote.submit")}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-4 h-4 md:w-5 md:h-5 group-hover:animate-[slideRight_0.8s_ease-in-out_infinite]"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
