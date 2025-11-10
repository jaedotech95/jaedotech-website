"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { StickyHeader } from "@/components/sticky-header"
import { Footer } from "@/components/footer"
import { useLanguage } from "@/lib/i18n"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { getPalletPrice } from "@/lib/pallet-pricing-data"
import { getLightRackPrice } from "@/lib/light-rack-pricing-data"
import { getHeavyRackPrice } from "@/lib/heavy-rack-pricing-data"

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
    <path d="M12 3c5.799 0 10.5 3.664 10.5 8.185 0 4.52-4.701 8.184-10.5 8.184a13.5 13.5 0 0 1-1.727-.11l-4.408 2.883c-.501.265-.678.236-.472-.413l.892-3.678c-2.88-1.46-4.785-3.99-4.785-6.866C1.5 6.665 6.201 3 12 3zm5.907 8.06l1.47-1.424a.472.472 0 0 0-.656-.681l-1.787 1.73V7.668a.473.473 0 0 0-.944 0v5.518a.473.473 0 0 0 .944 0v-1.363l.216-.215 1.621 2.021a.473.473 0 0 0 .783-.233.422.422 0 0 0-.119-.335l-1.528-2.001zm-2.913 1.876a.473.473 0 0 0 .472-.472V9.046a.472.472 0 1 0-.944 0v3.418a.473.473 0 0 0 .472.472zm-1.173-.472a.472.472 0 0 0-.472.472.473.473 0 0 0 .472.472h2.456a.473.473 0 0 0 0-.944h-1.984V9.046a.472.472 0 0 0-.473-.472.422.422 0 0 0-.424.26l-.851 1.702-.85-1.702a.477.477 0 0 0-.425-.26.473.473 0 0 0-.473.472v3.418a.473.473 0 0 0 .472.472z" />
  </svg>
)

const HelpIcon = () => (
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
    className="w-4 h-4"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
    <path d="M12 17h.01" />
  </svg>
)

interface SpecTooltipProps {
  title: string
  description: string
  imageSrc: string
}

const SpecTooltip = ({ title, description, imageSrc }: SpecTooltipProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setIsOpen(false)
  }

  return (
    <span className="relative inline-block align-middle ml-1">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="text-[#0055A6] hover:bg-blue-50 rounded-full transition-all inline-flex items-center justify-center"
        style={{ width: "18px", height: "18px", padding: "2px" }}
      >
        <HelpIcon />
      </button>

      {(isOpen || isHovered) && (
        <div
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="absolute z-[9999] w-64 bg-white rounded-lg shadow-2xl border-2 border-[#0055A6] p-4 animate-in fade-in duration-200"
          style={{
            top: "-8px",
            left: "-8px",
          }}
        >
          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <div className="flex-shrink-0 text-[#0055A6] mt-0.5">
                <HelpIcon />
              </div>
              <h4 className="font-bold text-gray-900 text-sm flex-1">{title}</h4>
            </div>
            <img
              src={imageSrc || "/placeholder.svg"}
              alt={title}
              className="w-full h-32 object-cover rounded-lg bg-gray-100"
            />
            <p className="text-xs text-gray-600 leading-relaxed">{description}</p>
          </div>
        </div>
      )}
    </span>
  )
}

type ProductType = "light" | "heavy" | "pallet"

interface ProductSpecifications {
  width: string
  depth: string
  height: string
  levels: string
  type: string
}

interface SelectedProduct {
  id: string
  type: ProductType
  name: string // Changed to type
  specifications: ProductSpecifications
  quantity: number
  unitPrice: number
}

const productOptions = {
  light: {
    widths: ["600", "900", "1000", "1200"],
    depths: ["300", "450", "600"],
    heights: ["900", "1200", "1500", "1800", "2100", "2400"],
    levels: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
    types: ["standalone", "connected"],
  },
  heavy: {
    widths: ["900", "1200", "1500", "1800"],
    depths: ["450", "600", "900"],
    heights: ["900", "1200", "1500", "1800", "2100", "2400"],
    levels: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
    types: ["standalone", "connected"],
  },
  pallet: {
    widths: ["1390", "2590", "2790"],
    depths: ["1000"],
    heights: ["2000", "2500", "3000", "3500", "4000", "4500"],
    levels: ["1", "2", "3", "4", "5", "6"],
    types: ["standalone", "connected"],
  },
}

const productPrices: Record<ProductType, number> = {
  light: 0, // Will be calculated based on specifications
  heavy: 0, // Will be calculated based on specifications
  pallet: 0, // Will be calculated based on specifications
}

export default function QuotePage() {
  const { t } = useLanguage()
  const router = useRouter()
  const hero = useScrollAnimation()
  const form = useScrollAnimation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

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

  const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>([])
  const [currentProduct, setCurrentProduct] = useState<ProductType>("light")
  const [currentQuantity, setCurrentQuantity] = useState(1)
  const [isProductSectionExpanded, setIsProductSectionExpanded] = useState(false)

  const [currentSpecs, setCurrentSpecs] = useState<ProductSpecifications>({
    width: "",
    depth: "",
    height: "",
    levels: "",
    type: "",
  })

  useEffect(() => {
    setCurrentSpecs({
      width: "",
      depth: "",
      height: "",
      levels: "",
      type: "",
    })
  }, [currentProduct])

  const [agreedToPrivacy, setAgreedToPrivacy] = useState(false)
  const [showPrivacyModal, setShowPrivacyModal] = useState(false)
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false)
  const [showScrollWarning, setShowScrollWarning] = useState(false)
  const privacyContentRef = useRef<HTMLDivElement>(null)

  const [validationMessage, setValidationMessage] = useState("")
  const validationTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const isShowingMessageRef = useRef(false)
  const [isSending, setIsSending] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false) // Add success state for better transition
  const [uploadProgress, setUploadProgress] = useState(0)

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

  const handleAddProduct = () => {
    if (
      !currentSpecs.width ||
      !currentSpecs.depth ||
      !currentSpecs.height ||
      !currentSpecs.levels ||
      !currentSpecs.type
    ) {
      showValidationMessage("모든 규격을 선택해주세요")
      return
    }

    let unitPrice = productPrices[currentProduct]

    if (currentProduct === "pallet") {
      unitPrice = getPalletPrice(
        currentSpecs.width,
        currentSpecs.depth,
        currentSpecs.height,
        currentSpecs.levels,
        currentSpecs.type,
      )

      if (unitPrice === 0) {
        showValidationMessage("선택하신 규격의 가격 정보를 찾을 수 없습니다")
        return
      }
    } else if (currentProduct === "light") {
      unitPrice = getLightRackPrice(
        currentSpecs.width,
        currentSpecs.depth,
        currentSpecs.height,
        currentSpecs.levels,
        currentSpecs.type,
      )

      if (unitPrice === 0) {
        showValidationMessage("선택하신 규격의 가격 정보를 찾을 수 없습니다")
        return
      }
    } else if (currentProduct === "heavy") {
      unitPrice = getHeavyRackPrice(
        currentSpecs.width,
        currentSpecs.depth,
        currentSpecs.height,
        currentSpecs.levels,
        currentSpecs.type,
      )

      if (unitPrice === 0) {
        showValidationMessage("선택하신 규격의 가격 정보를 찾을 수 없습니다")
        return
      }
    }

    const newProduct: SelectedProduct = {
      id: `${currentProduct}-${Date.now()}`,
      type: currentProduct,
      name: currentProduct, // Changed to store type directly
      specifications: { ...currentSpecs },
      quantity: currentQuantity,
      unitPrice: unitPrice,
    }
    setSelectedProducts([...selectedProducts, newProduct])
    setCurrentQuantity(1)
    setCurrentSpecs({
      width: "",
      depth: "",
      height: "",
      levels: "",
      type: "",
    })
  }

  const handleRemoveProduct = (id: string) => {
    setSelectedProducts(selectedProducts.filter((p) => p.id !== id))
  }

  const calculateSubtotal = () => {
    return selectedProducts.reduce((sum, product) => sum + product.unitPrice * product.quantity, 0)
  }

  const calculateProductVAT = (product: SelectedProduct) => {
    return Math.round(product.unitPrice * product.quantity * 0.1)
  }

  const calculateProductTotal = (product: SelectedProduct) => {
    return product.unitPrice * product.quantity + calculateProductVAT(product)
  }

  const calculateGrandTotal = () => {
    return selectedProducts.reduce((sum, product) => sum + calculateProductTotal(product), 0)
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("ko-KR").format(amount)
  }

  const formatCurrencyWithWon = (amount: number) => {
    return new Intl.NumberFormat("ko-KR").format(amount) + t("quote.currency")
  }

  const formatSpecifications = (specs: ProductSpecifications) => {
    const levelsText = t(`quote.level.${specs.levels}`)
    const typeText = t(`quote.type.${specs.type}`)
    return `${specs.width}×${specs.depth}×${specs.height}, ${levelsText}, ${typeText}`
  }

  const handleEmailSubmit = async () => {
    if (!agreedToPrivacy) {
      showValidationMessage("개인정보 수집 및 이용에 동의해주세요.")
      return
    }

    if (!validateForm()) {
      return
    }

    setIsSending(true)
    setIsSuccess(false)
    setUploadProgress(0) // Reset progress on new submission

    try {
      let fileData = null

      if (formData.file) {
        setUploadProgress(30) // Start progress for file upload

        const fileFormData = new FormData()
        fileFormData.append("file", formData.file)

        const uploadResponse = await fetch("/api/upload-file", {
          method: "POST",
          body: fileFormData,
        })

        const uploadResult = await uploadResponse.json()

        setUploadProgress(60) // Progress after file upload

        if (uploadResult.success) {
          fileData = uploadResult.fileData
        } else {
          setIsSending(false)
          setUploadProgress(0) // Reset progress on error
          showValidationMessage("파일 업로드 중 오류가 발생했습니다.")
          return
        }
      } else {
        setUploadProgress(60) // If no file, jump to 60% before sending quote data
      }

      setUploadProgress(80) // Progress before sending quote data

      const response = await fetch("/api/send-quote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          company: formData.company,
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          message: formData.message,
          file: fileData,
          selectedProducts,
        }),
      })

      const data = await response.json()

      setUploadProgress(100) // Final progress

      if (data.success) {
        setIsSuccess(true)
        // Keep sending state for smooth transition
        setTimeout(() => {
          setIsSending(false)
        }, 500)

        // Redirect after showing success message
        setTimeout(() => {
          router.push("/")
          setTimeout(() => {
            window.scrollTo({ top: 0, behavior: "smooth" })
          }, 100)
        }, 2500)
      } else {
        setIsSending(false)
        setIsSuccess(false)
        setUploadProgress(0) // Reset progress on error
        showValidationMessage(data.message || "전송 중 오류가 발생했습니다.")
      }
    } catch (error) {
      console.error("[v0] Error submitting quote:", error)
      setIsSending(false)
      setIsSuccess(false)
      setUploadProgress(0) // Reset progress on error
      showValidationMessage("전송 중 오류가 발생했습니다.")
    }
  }

  return (
    <main className="min-h-screen">
      <StickyHeader />

      {/* Hero Section */}
      <section
        ref={hero.elementRef as React.RefObject<HTMLElement>}
        className={`pt-20 pb-4 md:pt-24 md:pb-6 bg-gradient-to-b from-blue-50/50 to-white transition-all duration-1000 ${
          hero.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1
              className="text-lg md:text-3xl lg:text-4xl font-bold mb-1 md:mb-2 text-balance"
              style={{ color: "#0055A6" }}
            >
              {t("quote.title")}
            </h1>
            <p className="text-xs md:text-base text-gray-600 leading-relaxed text-pretty">{t("hero.subtext")}</p>
          </div>
        </div>
      </section>

      <section ref={form.elementRef as React.RefObject<HTMLElement>} className="py-8 md:py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div
              className={`bg-white rounded-xl shadow-lg p-4 md:p-10 transition-all duration-1000 ${
                form.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <div className="mb-6 md:mb-10 pb-6 md:pb-8 border-b-2 border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsProductSectionExpanded(!isProductSectionExpanded)}
                  className="w-full flex items-center justify-between p-3 md:p-4 bg-gradient-to-r from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 rounded-lg transition-all duration-300 group border-l-4 border-[#0055A6]"
                >
                  <div className="flex items-center gap-1 md:gap-3 flex-wrap">
                    <h2 className="text-xs md:text-lg lg:text-xl font-bold text-gray-900 whitespace-nowrap">
                      {t("quote.estimateToggle")}
                    </h2>
                    <span className="text-[9px] md:text-xs lg:text-sm text-gray-500">
                      {t("quote.productSelection").includes("선택") ? "(선택사항)" : "(Optional)"}
                    </span>
                  </div>
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
                    className={`md:w-6 md:h-6 text-[#0055A6] transition-transform duration-300 flex-shrink-0 ${
                      isProductSectionExpanded ? "rotate-180" : ""
                    }`}
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    isProductSectionExpanded ? "max-h-[3000px] opacity-100 mt-6" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">{t("quote.selectProduct")}</label>
                      <div className="flex flex-wrap gap-2 md:gap-3">
                        <button
                          type="button"
                          onClick={() => setCurrentProduct("light")}
                          className={`px-3 md:px-6 py-2 md:py-3 rounded-lg text-xs md:text-base font-semibold transition-all ${
                            currentProduct === "light"
                              ? "bg-[#0055A6] text-white shadow-md"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          {t("products.light")}
                        </button>
                        <button
                          type="button"
                          onClick={() => setCurrentProduct("heavy")}
                          className={`px-3 md:px-6 py-2 md:py-3 rounded-lg text-xs md:text-base font-semibold transition-all ${
                            currentProduct === "heavy"
                              ? "bg-[#0055A6] text-white shadow-md"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          {t("products.heavy")}
                        </button>
                        <button
                          type="button"
                          onClick={() => setCurrentProduct("pallet")}
                          className={`px-3 md:px-6 py-2 md:py-3 rounded-lg text-xs md:text-base font-semibold transition-all ${
                            currentProduct === "pallet"
                              ? "bg-[#0055A6] text-white shadow-md"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          {t("products.pallet")}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-6">
                      {/* Width Selection */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          {t("quote.width")} (mm)
                          <SpecTooltip
                            title={t("quote.width")}
                            description={t("quote.widthTooltip")}
                            imageSrc={
                              currentProduct === "pallet"
                                ? "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pallet_width-85z7FtR2klnhbRXAl1aGVSgOPZaXJn.png"
                                : "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/weight_width-XhDn8Jhh8vgkw156Z1K1lDX3toDTt1.png"
                            }
                          />
                        </label>
                        <div className="flex flex-wrap gap-1.5 md:gap-2">
                          {productOptions[currentProduct].widths.map((width) => (
                            <button
                              key={width}
                              type="button"
                              onClick={() => setCurrentSpecs({ ...currentSpecs, width })}
                              className={`px-2.5 md:px-4 py-1.5 md:py-2 rounded-lg font-medium transition-all text-xs md:text-sm ${
                                currentSpecs.width === width
                                  ? "bg-[#0055A6] text-white shadow-md"
                                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                              }`}
                            >
                              {width}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Depth Selection */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          {t("quote.depth")} (mm)
                          <SpecTooltip
                            title={t("quote.depth")}
                            description={t("quote.depthTooltip")}
                            imageSrc={
                              currentProduct === "pallet"
                                ? "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pallet_depth-YhYgoWX4aVga4WoFFAJrOmeyusNjaM.png"
                                : "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/weight_depth-nQn0XNn7IOwxS881PBULzKRrdRJFrX.png"
                            }
                          />
                        </label>
                        <div className="flex flex-wrap gap-1.5 md:gap-2">
                          {productOptions[currentProduct].depths.map((depth) => (
                            <button
                              key={depth}
                              type="button"
                              onClick={() => setCurrentSpecs({ ...currentSpecs, depth })}
                              className={`px-2.5 md:px-4 py-1.5 md:py-2 rounded-lg font-medium transition-all text-xs md:text-sm ${
                                currentSpecs.depth === depth
                                  ? "bg-[#0055A6] text-white shadow-md"
                                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                              }`}
                            >
                              {depth}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Height Selection */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          {t("quote.height")} (mm)
                          <SpecTooltip
                            title={t("quote.height")}
                            description={t("quote.heightTooltip")}
                            imageSrc={
                              currentProduct === "pallet"
                                ? "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pallet_height-iAg3yNQw8AyiSAlOr1AzuLEfuXvCoG.png"
                                : "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/weight_height-qAMKUVVeXYK5GI5EoDtpsiggXaoN0E.png"
                            }
                          />
                        </label>
                        <div className="flex flex-wrap gap-1.5 md:gap-2">
                          {productOptions[currentProduct].heights.map((height) => (
                            <button
                              key={height}
                              type="button"
                              onClick={() => setCurrentSpecs({ ...currentSpecs, height })}
                              className={`px-2.5 md:px-4 py-1.5 md:py-2 rounded-lg font-medium transition-all text-xs md:text-sm ${
                                currentSpecs.height === height
                                  ? "bg-[#0055A6] text-white shadow-md"
                                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                              }`}
                            >
                              {height}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Levels Selection */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          {t("quote.levels")}
                          <SpecTooltip
                            title={t("quote.levels")}
                            description={t("quote.levelsTooltip")}
                            imageSrc={
                              currentProduct === "pallet"
                                ? "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pallet_shelf-TQl3tLQMOaXXBeUtA65joqYwgMG7uj.png"
                                : "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/weight_shelf-xbkASyrHLIAxQeEQj9zF12pm7D4VGC.png"
                            }
                          />
                        </label>
                        <div className="flex flex-wrap gap-1.5 md:gap-2">
                          {productOptions[currentProduct].levels.map((level) => (
                            <button
                              key={level}
                              type="button"
                              onClick={() => setCurrentSpecs({ ...currentSpecs, levels: level })}
                              className={`px-2.5 md:px-4 py-1.5 md:py-2 rounded-lg font-medium transition-all text-xs md:text-sm ${
                                currentSpecs.levels === level
                                  ? "bg-[#0055A6] text-white shadow-md"
                                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                              }`}
                            >
                              {t(`quote.level.${level}`)}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Type Selection */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          {t("quote.type")}
                          <SpecTooltip
                            title={t("quote.type")}
                            description={t("quote.typeTooltip")}
                            imageSrc={
                              currentProduct === "pallet"
                                ? "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pallet_type-GOasGADZw48uE51WxcbKfUygW4dVI6.png"
                                : "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/weight_type-PwnODt2jSne7O4253nyrWX3L4OI8zs.png"
                            }
                          />
                        </label>
                        <div className="flex flex-wrap gap-1.5 md:gap-2">
                          {productOptions[currentProduct].types.map((type) => (
                            <button
                              key={type}
                              type="button"
                              onClick={() => setCurrentSpecs({ ...currentSpecs, type })}
                              className={`px-2.5 md:px-4 py-1.5 md:py-2 rounded-lg font-medium transition-all text-xs md:text-sm ${
                                currentSpecs.type === type
                                  ? "bg-[#0055A6] text-white shadow-md"
                                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                              }`}
                            >
                              {t(`quote.type.${type}`)}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-row items-end justify-between gap-2 md:gap-4">
                        <div className="flex-shrink-0">
                          <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-3">
                            {t("quote.quantity")}
                          </label>
                          <input
                            type="number"
                            id="quantity"
                            min="1"
                            max="99"
                            value={currentQuantity}
                            onChange={(e) =>
                              setCurrentQuantity(Math.max(1, Math.min(99, Number.parseInt(e.target.value) || 1)))
                            }
                            className="w-[100px] md:w-[180px] px-3 py-1.5 md:py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0055A6] focus:border-transparent transition-all text-gray-900 bg-white text-sm"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={handleAddProduct}
                          className="px-4 md:px-6 py-2 md:py-2.5 bg-[#0055A6] text-white rounded-lg hover:bg-[#004494] transition-all font-semibold shadow-md hover:shadow-lg text-xs md:text-base whitespace-nowrap"
                        >
                          {t("quote.addProduct")}
                        </button>
                      </div>

                      <p className="text-xs text-red-600 mt-2">*{t("quote.bulkDisclaimer")}</p>
                    </div>
                  </div>

                  {selectedProducts.length > 0 && (
                    <div className="mt-6">
                      <h3 className="text-base font-bold mb-4 text-gray-900">{t("quote.selectedProducts")}</h3>
                      <div className="overflow-x-auto rounded-lg border border-gray-200">
                        <table className="w-full text-xs md:text-sm">
                          <thead>
                            <tr className="bg-gradient-to-r from-[#0055A6] to-[#0066CC] text-white">
                              <th className="px-2 md:px-4 py-2 md:py-3 text-[10px] md:text-xs font-bold">NO</th>
                              <th className="px-2 md:px-4 py-2 md:py-3 text-left text-[10px] md:text-xs font-bold">
                                {t("quote.product")}
                              </th>
                              <th className="px-2 md:px-4 py-2 md:py-3 text-left text-[10px] md:text-xs font-bold">
                                {t("quote.specifications")}
                              </th>
                              <th className="px-2 md:px-4 py-2 md:py-3 text-center text-[10px] md:text-xs font-bold">
                                {t("quote.sets")}
                              </th>
                              <th className="px-2 md:px-4 py-2 md:py-3 text-right text-[10px] md:text-xs font-bold whitespace-nowrap">
                                {t("quote.unitPrice")} ({t("quote.currency")})
                              </th>
                              <th className="px-2 md:px-4 py-2 md:py-3 text-right text-[10px] md:text-xs font-bold whitespace-nowrap">
                                {t("quote.amount")} ({t("quote.currency")})
                              </th>
                              <th className="px-2 md:px-4 py-2 md:py-3 text-right text-[10px] md:text-xs font-bold">
                                VAT ({t("quote.currency")})
                              </th>
                              <th className="px-2 md:px-4 py-2 md:py-3"></th>
                            </tr>
                          </thead>
                          <tbody className="bg-white">
                            {selectedProducts.map((product, index) => (
                              <tr
                                key={product.id}
                                className="border-b border-gray-200 hover:bg-blue-50/50 transition-colors"
                              >
                                <td className="px-2 md:px-4 py-2 md:py-3 text-center text-gray-900 font-medium text-[10px] md:text-sm">
                                  {index + 1}
                                </td>
                                <td className="px-2 md:px-4 py-2 md:py-3 text-gray-900 font-medium text-[10px] md:text-sm">
                                  {t(`products.${product.type}`)}
                                </td>
                                <td className="px-2 md:px-4 py-2 md:py-3 text-gray-700 text-[9px] md:text-xs">
                                  {formatSpecifications(product.specifications)}
                                </td>
                                <td className="px-2 md:px-4 py-2 md:py-3 text-center text-gray-900 font-medium text-[10px] md:text-sm">
                                  {product.quantity}
                                </td>
                                <td className="px-2 md:px-4 py-2 md:py-3 text-right text-gray-900 font-medium text-[10px] md:text-sm whitespace-nowrap">
                                  {formatCurrency(product.unitPrice)}
                                </td>
                                <td className="px-2 md:px-4 py-2 md:py-3 text-right text-gray-900 font-semibold text-[10px] md:text-sm whitespace-nowrap">
                                  {formatCurrency(product.unitPrice * product.quantity)}
                                </td>
                                <td className="px-2 md:px-4 py-2 md:py-3 text-right text-gray-700 text-[10px] md:text-sm whitespace-nowrap">
                                  {formatCurrency(calculateProductVAT(product))}
                                </td>
                                <td className="px-2 md:px-4 py-2 md:py-3 text-center">
                                  <button
                                    type="button"
                                    onClick={() => handleRemoveProduct(product.id)}
                                    className="text-red-600 hover:text-white hover:bg-red-600 border-2 border-red-600 px-2 md:px-3 py-1 md:py-1.5 rounded-lg transition-all font-medium text-[10px] md:text-sm"
                                  >
                                    {t("quote.delete")}
                                  </button>
                                </td>
                              </tr>
                            ))}
                            <tr className="bg-gradient-to-r from-[#0055A6] to-[#0066CC] text-white font-bold">
                              <td colSpan={5}></td>
                              <td className="px-2 md:px-4 py-3 md:py-4 text-right text-[10px] md:text-sm whitespace-nowrap">
                                {t("quote.finalAmount")}
                              </td>
                              <td colSpan={2} className="px-2 md:px-4 py-3 md:py-4 text-right text-sm md:text-lg">
                                {formatCurrencyWithWon(calculateGrandTotal())}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <p className="text-[10px] md:text-xs mt-3 text-right font-medium">
                        <span className="text-red-600">*{t("quote.vatDisclaimer").split(" / ")[0]}</span>
                        {" / "}
                        <span className="text-[#0055A6]">{t("quote.vatDisclaimer").split(" / ")[1]}</span>
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 md:gap-3 mb-6 md:mb-8">
                <div className="w-1 h-6 md:h-8 bg-[#0055A6] rounded-full"></div>
                <h2 className="text-base md:text-2xl font-bold text-gray-900">{t("quote.formSection")}</h2>
              </div>

              <form className="space-y-4 md:space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div>
                    <label
                      htmlFor="company"
                      className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2"
                    >
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
                      className="w-full px-0 py-1.5 md:py-2 bg-transparent border-0 border-b-2 border-gray-300 focus:border-[#0055A6] focus:outline-none transition-colors text-gray-900 text-sm md:text-base"
                      placeholder={t("quote.companyPlaceholder")}
                    />
                  </div>
                  <div>
                    <label htmlFor="name" className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">
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
                      className="w-full px-0 py-1.5 md:py-2 bg-transparent border-0 border-b-2 border-gray-300 focus:border-[#0055A6] focus:outline-none transition-colors text-gray-900 text-sm md:text-base"
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
                      ref={phoneRef}
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      style={{ caretColor: "#0055A6" }}
                      className="w-full px-0 py-1.5 md:py-2 bg-transparent border-0 border-b-2 border-gray-300 focus:border-[#0055A6] focus:outline-none transition-colors text-gray-900 text-sm md:text-base"
                      placeholder={t("quote.phonePlaceholder")}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">
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
                      className="w-full px-0 py-1.5 md:py-2 bg-transparent border-0 border-b-2 border-gray-300 focus:border-[#0055A6] focus:outline-none transition-colors text-gray-900 text-sm md:text-base"
                      placeholder={t("quote.emailPlaceholder")}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">
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
                    className="w-full px-0 py-1.5 md:py-2 bg-transparent border-0 border-b-2 border-gray-300 focus:border-[#0055A6] focus:outline-none transition-colors resize-none text-gray-900 text-sm md:text-base"
                    placeholder={t("quote.messagePlaceholder")}
                  />
                </div>

                <div>
                  <label htmlFor="file" className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">
                    {t("quote.fileUpload")}{" "}
                    <span className="text-gray-400 text-[10px] md:text-xs ml-2">{t("quote.maxFileSize")}</span>
                  </label>
                  <div className="relative">
                    <input type="file" id="file" name="file" onChange={handleFileChange} className="hidden" />
                    <label
                      htmlFor="file"
                      className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors cursor-pointer text-gray-700 border-2 border-gray-300"
                    >
                      <UploadIcon />
                      <span className="text-xs md:text-sm font-medium">{t("quote.selectFile")}</span>
                    </label>
                    {formData.file && (
                      <span className="ml-3 text-xs md:text-sm text-gray-600">{formData.file.name}</span>
                    )}
                  </div>
                </div>

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-4 mt-6 md:mt-8">
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
                    <label
                      htmlFor="privacy"
                      className="text-xs md:text-sm text-gray-700 cursor-pointer"
                      onClick={openPrivacyModal}
                    >
                      <span className="font-bold text-[#0055A6]">{t("quote.privacyAgree")}</span>
                    </label>
                  </div>

                  <button
                    type="button"
                    onClick={handleEmailSubmit}
                    disabled={isSending}
                    className="group flex items-center justify-center gap-2 px-6 md:px-8 py-2.5 md:py-3 bg-[#0055A6] text-white rounded-lg hover:bg-[#004494] transition-all duration-300 hover:shadow-lg md:w-auto w-full font-semibold text-sm md:text-base disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSending ? (
                      <div className="flex flex-col items-center gap-2 w-full">
                        <span className="text-xs md:text-base">{t("quote.sending")}</span>
                        <div className="w-full h-1.5 bg-white/30 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-white rounded-full transition-all duration-300 ease-out"
                            style={{ width: `${uploadProgress}%` }}
                          />
                        </div>
                      </div>
                    ) : (
                      <>
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
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {isSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm animate-in fade-in duration-500">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md mx-4 animate-in zoom-in-95 duration-500">
            <div className="text-center space-y-4">
              {/* Success Icon */}
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center animate-in zoom-in duration-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-green-600"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </div>

              {/* Success Message */}
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-gray-900">견적 문의가 성공적으로 전송되었습니다.</h3>
                <p className="text-sm text-gray-600">잠시 후 메인으로 이동됩니다.</p>
              </div>

              {/* Loading indicator */}
              <div className="flex justify-center pt-2">
                <div className="flex gap-1">
                  <div
                    className="w-2 h-2 bg-[#0055A6] rounded-full animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-[#0055A6] rounded-full animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-[#0055A6] rounded-full animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Validation Message */}
      {validationMessage && !isSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
          <div
            className="bg-gray-800 text-white px-8 py-4 rounded-xl shadow-2xl max-w-md text-center"
            style={{
              animation: "smoothFadeInOut 2s ease-in-out forwards",
            }}
          >
            <p className="text-sm font-medium whitespace-pre-line leading-relaxed">{validationMessage}</p>
          </div>
        </div>
      )}

      {/* Privacy Policy Modal */}
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
              <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
                <p>{t("quote.privacyContent1")}</p>

                <h3 className="font-bold text-gray-900 mt-6">{t("quote.privacySection1")}</h3>
                <p>{t("quote.privacyContent2")}</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>{t("quote.privacyItem1")}</li>
                  <li>{t("quote.privacyItem2")}</li>
                  <li>{t("quote.privacyItem3")}</li>
                  <li>{t("quote.privacyItem4")}</li>
                  <li>{t("quote.privacyItem5")}</li>
                </ul>

                <h3 className="font-bold text-gray-900 mt-6">{t("quote.privacySection2")}</h3>
                <p>{t("quote.privacyContent3")}</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>{t("quote.privacyPurpose1")}</li>
                  <li>{t("quote.privacyPurpose2")}</li>
                  <li>{t("quote.privacyPurpose3")}</li>
                </ul>

                <h3 className="font-bold text-gray-900 mt-6">{t("quote.privacySection3")}</h3>
                <p>{t("quote.privacyContent4")}</p>

                <h3 className="font-bold text-gray-900 mt-6">{t("quote.privacySection5")}</h3>
                <p>{t("quote.privacyContent6")}</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>{t("quote.privacyProvide1")}</li>
                  <li>{t("quote.privacyProvide2")}</li>
                </ul>
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

      <Footer />
    </main>
  )
}
