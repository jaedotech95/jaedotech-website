"use client"
import { useEffect, useRef, useState } from "react"
import type React from "react"
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

  const companyRef = useRef<HTMLInputElement>(null)
  const nameRef = useRef<HTMLInputElement>(null)
  const phoneRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const messageRef = useRef<HTMLTextAreaElement>(null)

  const [formData, setFormData] = useState({
    company: "",
    name: "",
    phone: "",
    email: "",
    message: "",
    file: null as File | null,
  })
  const [agreedToPrivacy, setAgreedToPrivacy] = useState(false)
  const [showPrivacyModal, setShowPrivacyModal] = useState(false)
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false)
  const [showScrollWarning, setShowScrollWarning] = useState(false)
  const privacyContentRef = useRef<HTMLDivElement>(null)

  const [validationMessage, setValidationMessage] = useState("")
  const validationTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const isShowingMessageRef = useRef(false)

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

  useEffect(() => {
    if (showPrivacyModal) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [showPrivacyModal])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, file: e.target.files[0] })
    }
  }

  const openPrivacyModal = () => {
    setShowPrivacyModal(true)
    setHasScrolledToBottom(false)
  }

  const closePrivacyModal = () => {
    setShowPrivacyModal(false)
    setAgreedToPrivacy(false)
  }

  const agreeToPrivacy = () => {
    setAgreedToPrivacy(true)
    setShowPrivacyModal(false)
  }

  const handlePrivacyScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const element = e.currentTarget
    const isAtBottom = Math.abs(element.scrollHeight - element.scrollTop - element.clientHeight) < 10
    if (isAtBottom && !hasScrolledToBottom) {
      setHasScrolledToBottom(true)
    }
  }

  const handleDisabledAgreeClick = () => {
    setShowScrollWarning(true)
    setTimeout(() => setShowScrollWarning(false), 1000)
  }

  const showValidationMessage = (message: string) => {
    if (isShowingMessageRef.current) {
      return
    }

    if (validationTimeoutRef.current) {
      clearTimeout(validationTimeoutRef.current)
    }

    isShowingMessageRef.current = true
    setValidationMessage(message)

    validationTimeoutRef.current = setTimeout(() => {
      setValidationMessage("")
      isShowingMessageRef.current = false
      validationTimeoutRef.current = null
    }, 1800)
  }

  const validateForm = (): boolean => {
    const requiredFields = [
      { value: formData.company, name: t("quote.company"), ref: companyRef },
      { value: formData.name, name: t("quote.name"), ref: nameRef },
      { value: formData.phone, name: t("quote.phone"), ref: phoneRef },
      { value: formData.email, name: t("quote.email"), ref: emailRef },
      { value: formData.message, name: t("quote.message"), ref: messageRef },
    ]

    for (const field of requiredFields) {
      if (!field.value.trim()) {
        showValidationMessage(`${field.name}을(를) 입력해주세요`)
        field.ref.current?.focus()
        return false
      }
    }

    return true
  }

  const handleEmailSubmit = () => {
    if (!agreedToPrivacy) {
      showValidationMessage(t("quote.privacyAgree"))
      return
    }

    if (!validateForm()) {
      return
    }

    console.log("Email submission:", formData)
  }

  const handleKakaoSubmit = () => {
    if (!agreedToPrivacy) {
      showValidationMessage(t("quote.privacyAgree"))
      return
    }

    if (!validateForm()) {
      return
    }

    console.log("KakaoTalk submission:", formData)
  }

  return (
    <section
      id="quote"
      ref={sectionRef}
      className="min-h-screen py-16 md:py-20 bg-gradient-to-b from-blue-50/30 to-white dark:from-gray-900 dark:to-gray-800"
    >
      <div className="container mx-auto px-4">
        <div
          className={`flex justify-center mb-3 mt-8 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="bg-[#0055A6] px-8 py-2 md:py-3 shadow-lg">
            <h2 className="text-lg md:text-2xl font-bold text-white">{t("quote.title")}</h2>
          </div>
        </div>

        <div className="max-w-3xl mx-auto">
          <div
            className={`bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8 transition-all duration-1000 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-foreground mb-2">
                    {t("quote.company")} <span className="text-red-500">*</span>
                  </label>
                  <input
                    ref={companyRef}
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    style={{ caretColor: "#0055A6" }}
                    className="w-full px-0 py-2 bg-transparent border-0 border-b-2 border-gray-300 focus:border-[#0055A6] focus:outline-none transition-colors text-foreground cursor-text"
                    placeholder={t("quote.companyPlaceholder")}
                  />
                </div>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    {t("quote.name")} <span className="text-red-500">*</span>
                  </label>
                  <input
                    ref={nameRef}
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    style={{ caretColor: "#0055A6" }}
                    className="w-full px-0 py-2 bg-transparent border-0 border-b-2 border-gray-300 focus:border-[#0055A6] focus:outline-none transition-colors text-foreground cursor-text"
                    placeholder={t("quote.namePlaceholder")}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                    {t("quote.phone")} <span className="text-red-500">*</span>
                  </label>
                  <input
                    ref={phoneRef}
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    style={{ caretColor: "#0055A6" }}
                    className="w-full px-0 py-2 bg-transparent border-0 border-b-2 border-gray-300 focus:border-[#0055A6] focus:outline-none transition-colors text-foreground cursor-text"
                    placeholder={t("quote.phonePlaceholder")}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    {t("quote.email")} <span className="text-red-500">*</span>
                  </label>
                  <input
                    ref={emailRef}
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    style={{ caretColor: "#0055A6" }}
                    className="w-full px-0 py-2 bg-transparent border-0 border-b-2 border-gray-300 focus:border-[#0055A6] focus:outline-none transition-colors text-foreground cursor-text"
                    placeholder={t("quote.emailPlaceholder")}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                  {t("quote.message")} <span className="text-red-500">*</span>
                </label>
                <textarea
                  ref={messageRef}
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  style={{ caretColor: "#0055A6" }}
                  className="w-full px-0 py-2 bg-transparent border-0 border-b-2 border-gray-300 focus:border-[#0055A6] focus:outline-none transition-colors resize-none text-foreground cursor-text"
                  placeholder={t("quote.messagePlaceholder")}
                />
              </div>

              <div>
                <label htmlFor="file" className="block text-sm font-medium text-foreground mb-2">
                  {t("quote.fileUpload")} <span className="text-gray-400 text-xs ml-2">{t("quote.maxFileSize")}</span>
                </label>
                <div className="relative">
                  <input type="file" id="file" name="file" onChange={handleFileChange} className="hidden" />
                  <label
                    htmlFor="file"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors cursor-pointer text-foreground border-2 border-gray-300 dark:border-gray-600"
                  >
                    <UploadIcon />
                    <span className="text-sm font-medium">{t("quote.selectFile")}</span>
                  </label>
                  {formData.file && (
                    <span className="ml-3 text-sm text-gray-600 dark:text-gray-400">{formData.file.name}</span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="privacy"
                  checked={agreedToPrivacy}
                  readOnly
                  onClick={(e) => {
                    e.preventDefault()
                    openPrivacyModal()
                  }}
                  className="w-4 h-4 text-[#0055A6] border-gray-300 rounded focus:ring-[#0055A6] cursor-pointer"
                />
                <label htmlFor="privacy" className="text-sm text-foreground cursor-pointer" onClick={openPrivacyModal}>
                  <span className="font-bold text-[#0055A6]">{t("quote.privacyAgree")}</span>
                </label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={handleEmailSubmit}
                  className="group flex items-center justify-center gap-2 px-4 py-2.5 md:px-6 md:py-3 bg-[#0055A6] text-white rounded-lg hover:bg-[#004494] transition-all duration-300 hover:shadow-lg"
                >
                  <MailIcon />
                  <span className="font-semibold text-sm md:text-base">{t("quote.emailButton")}</span>
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

                <button
                  type="button"
                  onClick={handleKakaoSubmit}
                  className="group flex items-center justify-center gap-2 px-4 py-2.5 md:px-6 md:py-3 bg-[#FEE500] text-[#3C1E1E] rounded-lg hover:bg-[#FDD835] transition-all duration-300 hover:shadow-lg"
                >
                  <KakaoIcon />
                  <span className="font-semibold text-sm md:text-base">{t("quote.kakaoButton")}</span>
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

      {validationMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
          <div
            className="bg-gray-400 text-white px-6 py-3 rounded-lg shadow-2xl"
            style={{
              animation: "fadeInOut 1.8s ease-in-out forwards",
            }}
          >
            <p className="text-sm font-medium">{validationMessage}</p>
          </div>
        </div>
      )}

      {showPrivacyModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-[2px]"
          onClick={closePrivacyModal}
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
        >
          <div
            className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.3)] w-[90%] max-w-2xl flex flex-col"
            style={{ maxHeight: "90vh" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-bold text-foreground">{t("quote.privacyTitle")}</h3>
              <button
                onClick={closePrivacyModal}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-all duration-300 hover:rotate-90 hover:scale-110 hover:ring-4 hover:ring-[#0055A6]/20"
              >
                <XIcon />
              </button>
            </div>

            <div
              ref={privacyContentRef}
              onScroll={handlePrivacyScroll}
              className="flex-1 overflow-y-scroll p-6 text-sm text-foreground/80 leading-relaxed"
              style={{
                maxHeight: "calc(90vh - 180px)",
                WebkitOverflowScrolling: "touch",
                overscrollBehavior: "contain",
              }}
            >
              <div className="space-y-4">
                <p>{t("quote.privacyContent1")}</p>
                <h4 className="font-bold text-foreground">{t("quote.privacySection1")}</h4>
                <p>{t("quote.privacyContent2")}</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>{t("quote.privacyItem1")}</li>
                  <li>{t("quote.privacyItem2")}</li>
                  <li>{t("quote.privacyItem3")}</li>
                  <li>{t("quote.privacyItem4")}</li>
                  <li>{t("quote.privacyItem5")}</li>
                </ul>
                <h4 className="font-bold text-foreground">{t("quote.privacySection2")}</h4>
                <p>{t("quote.privacyContent3")}</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>{t("quote.privacyPurpose1")}</li>
                  <li>{t("quote.privacyPurpose2")}</li>
                  <li>{t("quote.privacyPurpose3")}</li>
                </ul>
                <h4 className="font-bold text-foreground">{t("quote.privacySection3")}</h4>
                <p>{t("quote.privacyContent4")}</p>
                <h4 className="font-bold text-foreground">{t("quote.privacySection4")}</h4>
                <p>{t("quote.privacyContent5")}</p>
                <h4 className="font-bold text-foreground">{t("quote.privacySection5")}</h4>
                <p>{t("quote.privacyContent6")}</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>{t("quote.privacyProvide1")}</li>
                  <li>{t("quote.privacyProvide2")}</li>
                </ul>
                <p className="pt-4">{t("quote.privacyContent7")}</p>
              </div>
            </div>

            <div className="relative p-6 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-3">
              {showScrollWarning && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-4 py-2 bg-red-500 text-white text-sm rounded-lg shadow-lg animate-in fade-in slide-in-from-bottom-2 duration-300">
                  {t("quote.scrollWarning")}
                </div>
              )}
              <button
                onClick={closePrivacyModal}
                className="px-6 py-2 border-2 border-gray-300 text-foreground rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                {t("quote.closeButton")}
              </button>
              <button
                onClick={hasScrolledToBottom ? agreeToPrivacy : handleDisabledAgreeClick}
                disabled={!hasScrolledToBottom}
                className="px-6 py-2 bg-[#0055A6] text-white rounded-lg hover:bg-[#004494] disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                {t("quote.agreeButton")}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
