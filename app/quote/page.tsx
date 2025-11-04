"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { StickyHeader } from "@/components/sticky-header"
import { Footer } from "@/components/footer"
import { useLanguage } from "@/lib/i18n"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

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
  name: string
  specifications: ProductSpecifications
  quantity: number
  unitPrice: number
}

const productOptions = {
  light: {
    widths: ["600", "900", "1200", "1500"],
    depths: ["300", "450", "600"],
    heights: ["900", "1200", "1500", "1800", "2100", "2400"],
    levels: ["2단", "3단", "4단", "5단", "6단", "7단"],
    types: ["독립형", "연결형"],
  },
  heavy: {
    widths: ["900", "1200", "1500", "1800"],
    depths: ["450", "600", "900"],
    heights: ["900", "1200", "1500", "1800", "2100", "2400"],
    levels: ["2단", "3단", "4단", "5단", "6단", "7단"],
    types: ["독립형", "연결형"],
  },
  pallet: {
    widths: ["1390", "2590", "2790"],
    depths: ["1000"],
    heights: ["2000", "2500", "3000", "3500", "4000", "4500", "5000"],
    levels: ["1단", "2단", "3단", "4단", "5단", "6단"],
    types: ["독립형", "연결형"],
  },
}

const productPrices: Record<ProductType, number> = {
  light: 300000,
  heavy: 600000,
  pallet: 500000,
}

export default function QuotePage() {
  const { t } = useLanguage()
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

    const newProduct: SelectedProduct = {
      id: `${currentProduct}-${Date.now()}`,
      type: currentProduct,
      name: t(`products.${currentProduct}`),
      specifications: { ...currentSpecs },
      quantity: currentQuantity,
      unitPrice: productPrices[currentProduct],
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
    return new Intl.NumberFormat("ko-KR").format(amount) + "원"
  }

  const formatSpecifications = (specs: ProductSpecifications) => {
    return `${specs.width}×${specs.depth}×${specs.height}, ${specs.levels}, ${specs.type}`
  }

  const handleEmailSubmit = () => {
    if (!agreedToPrivacy) {
      showValidationMessage(t("quote.privacyAgree"))
      return
    }

    if (!validateForm()) {
      return
    }

    console.log("Email submission:", { ...formData, selectedProducts })
  }

  const handleKakaoSubmit = () => {
    if (!agreedToPrivacy) {
      showValidationMessage(t("quote.privacyAgree"))
      return
    }

    if (!validateForm()) {
      return
    }

    console.log("KakaoTalk submission:", { ...formData, selectedProducts })
  }

  return (
    <main className="min-h-screen">
      <StickyHeader />

      {/* Hero Section */}
      <section
        ref={hero.elementRef as React.RefObject<HTMLElement>}
        className={`pt-20 pb-6 md:pt-24 md:pb-8 bg-gradient-to-b from-blue-50/50 to-white transition-all duration-1000 ${
          hero.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 text-balance" style={{ color: "#0055A6" }}>
              {t("quote.title")}
            </h1>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed text-pretty">{t("hero.subtext")}</p>
          </div>
        </div>
      </section>

      <section ref={form.elementRef as React.RefObject<HTMLElement>} className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div
              className={`bg-white rounded-xl shadow-lg p-6 md:p-10 transition-all duration-1000 ${
                form.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <div className="mb-10 pb-8 border-b-2 border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsProductSectionExpanded(!isProductSectionExpanded)}
                  className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 rounded-lg transition-all duration-300 group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-1 h-6 bg-[#0055A6] rounded-full"></div>
                    <h2 className="text-lg md:text-xl font-bold text-gray-900">{t("quote.estimateToggle")}</h2>
                    <span className="text-xs md:text-sm text-gray-500 ml-2">
                      {t("quote.productSelection").includes("선택") ? "(선택사항)" : "(Optional)"}
                    </span>
                  </div>
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
                    className={`text-[#0055A6] transition-transform duration-300 ${
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
                      <div className="flex flex-wrap gap-3">
                        <button
                          type="button"
                          onClick={() => setCurrentProduct("light")}
                          className={`px-6 py-3 rounded-lg font-semibold transition-all ${
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
                          className={`px-6 py-3 rounded-lg font-semibold transition-all ${
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
                          className={`px-6 py-3 rounded-lg font-semibold transition-all ${
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
                        <label className="block text-sm font-medium text-gray-700 mb-3">{t("quote.width")} (mm)</label>
                        {/* Desktop: Buttons */}
                        <div className="hidden md:flex flex-wrap gap-2">
                          {productOptions[currentProduct].widths.map((width) => (
                            <button
                              key={width}
                              type="button"
                              onClick={() => setCurrentSpecs({ ...currentSpecs, width })}
                              className={`px-4 py-2 rounded-lg font-medium transition-all text-sm ${
                                currentSpecs.width === width
                                  ? "bg-[#0055A6] text-white shadow-md"
                                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                              }`}
                            >
                              {width}
                            </button>
                          ))}
                        </div>
                        {/* Mobile: Dropdown */}
                        <select
                          value={currentSpecs.width}
                          onChange={(e) => setCurrentSpecs({ ...currentSpecs, width: e.target.value })}
                          className="md:hidden w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0055A6] focus:border-transparent transition-all text-gray-900 bg-white text-sm"
                        >
                          <option value="">{t("quote.selectWidth")}</option>
                          {productOptions[currentProduct].widths.map((width) => (
                            <option key={width} value={width}>
                              {width}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Depth Selection */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">{t("quote.depth")} (mm)</label>
                        {/* Desktop: Buttons */}
                        <div className="hidden md:flex flex-wrap gap-2">
                          {productOptions[currentProduct].depths.map((depth) => (
                            <button
                              key={depth}
                              type="button"
                              onClick={() => setCurrentSpecs({ ...currentSpecs, depth })}
                              className={`px-4 py-2 rounded-lg font-medium transition-all text-sm ${
                                currentSpecs.depth === depth
                                  ? "bg-[#0055A6] text-white shadow-md"
                                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                              }`}
                            >
                              {depth}
                            </button>
                          ))}
                        </div>
                        {/* Mobile: Dropdown */}
                        <select
                          value={currentSpecs.depth}
                          onChange={(e) => setCurrentSpecs({ ...currentSpecs, depth: e.target.value })}
                          className="md:hidden w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0055A6] focus:border-transparent transition-all text-gray-900 bg-white text-sm"
                        >
                          <option value="">{t("quote.selectDepth")}</option>
                          {productOptions[currentProduct].depths.map((depth) => (
                            <option key={depth} value={depth}>
                              {depth}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Height Selection */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">{t("quote.height")} (mm)</label>
                        {/* Desktop: Buttons */}
                        <div className="hidden md:flex flex-wrap gap-2">
                          {productOptions[currentProduct].heights.map((height) => (
                            <button
                              key={height}
                              type="button"
                              onClick={() => setCurrentSpecs({ ...currentSpecs, height })}
                              className={`px-4 py-2 rounded-lg font-medium transition-all text-sm ${
                                currentSpecs.height === height
                                  ? "bg-[#0055A6] text-white shadow-md"
                                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                              }`}
                            >
                              {height}
                            </button>
                          ))}
                        </div>
                        {/* Mobile: Dropdown */}
                        <select
                          value={currentSpecs.height}
                          onChange={(e) => setCurrentSpecs({ ...currentSpecs, height: e.target.value })}
                          className="md:hidden w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0055A6] focus:border-transparent transition-all text-gray-900 bg-white text-sm"
                        >
                          <option value="">{t("quote.selectHeight")}</option>
                          {productOptions[currentProduct].heights.map((height) => (
                            <option key={height} value={height}>
                              {height}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Levels Selection */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">{t("quote.levels")}</label>
                        {/* Desktop: Buttons */}
                        <div className="hidden md:flex flex-wrap gap-2">
                          {productOptions[currentProduct].levels.map((level) => (
                            <button
                              key={level}
                              type="button"
                              onClick={() => setCurrentSpecs({ ...currentSpecs, levels: level })}
                              className={`px-4 py-2 rounded-lg font-medium transition-all text-sm ${
                                currentSpecs.levels === level
                                  ? "bg-[#0055A6] text-white shadow-md"
                                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                              }`}
                            >
                              {level}
                            </button>
                          ))}
                        </div>
                        {/* Mobile: Dropdown */}
                        <select
                          value={currentSpecs.levels}
                          onChange={(e) => setCurrentSpecs({ ...currentSpecs, levels: e.target.value })}
                          className="md:hidden w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0055A6] focus:border-transparent transition-all text-gray-900 bg-white text-sm"
                        >
                          <option value="">{t("quote.selectLevels")}</option>
                          {productOptions[currentProduct].levels.map((level) => (
                            <option key={level} value={level}>
                              {level}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Type Selection */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">{t("quote.type")}</label>
                        {/* Desktop: Buttons */}
                        <div className="hidden md:flex flex-wrap gap-2">
                          {productOptions[currentProduct].types.map((type) => (
                            <button
                              key={type}
                              type="button"
                              onClick={() => setCurrentSpecs({ ...currentSpecs, type })}
                              className={`px-4 py-2 rounded-lg font-medium transition-all text-sm ${
                                currentSpecs.type === type
                                  ? "bg-[#0055A6] text-white shadow-md"
                                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                              }`}
                            >
                              {type}
                            </button>
                          ))}
                        </div>
                        {/* Mobile: Dropdown */}
                        <select
                          value={currentSpecs.type}
                          onChange={(e) => setCurrentSpecs({ ...currentSpecs, type: e.target.value })}
                          className="md:hidden w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0055A6] focus:border-transparent transition-all text-gray-900 bg-white text-sm"
                        >
                          <option value="">{t("quote.selectType")}</option>
                          {productOptions[currentProduct].types.map((type) => (
                            <option key={type} value={type}>
                              {type}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Quantity Input */}
                      <div>
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
                          className="w-full md:w-32 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0055A6] focus:border-transparent transition-all text-gray-900 bg-white text-sm"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end pt-2">
                      <button
                        type="button"
                        onClick={handleAddProduct}
                        className="px-6 py-2.5 bg-[#0055A6] text-white rounded-lg hover:bg-[#004494] transition-all font-semibold shadow-md hover:shadow-lg"
                      >
                        {t("quote.addProduct")}
                      </button>
                    </div>
                  </div>

                  {selectedProducts.length > 0 && (
                    <div className="mt-6">
                      <h3 className="text-base font-bold mb-4 text-gray-900">{t("quote.selectedProducts")}</h3>
                      <div className="overflow-x-auto rounded-lg border border-gray-200">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="bg-gradient-to-r from-[#0055A6] to-[#0066CC] text-white">
                              <th className="px-4 py-3 text-center text-xs font-bold">{t("quote.no")}</th>
                              <th className="px-4 py-3 text-left text-xs font-bold">{t("quote.product")}</th>
                              <th className="px-4 py-3 text-left text-xs font-bold">{t("quote.specifications")}</th>
                              <th className="px-4 py-3 text-center text-xs font-bold">{t("quote.sets")}</th>
                              <th className="px-4 py-3 text-right text-xs font-bold">{t("quote.unitPrice")}</th>
                              <th className="px-4 py-3 text-right text-xs font-bold">{t("quote.amount")}</th>
                              <th className="px-4 py-3 text-right text-xs font-bold">{t("quote.vat")}</th>
                              <th className="px-4 py-3"></th>
                            </tr>
                          </thead>
                          <tbody className="bg-white">
                            {selectedProducts.map((product, index) => (
                              <tr
                                key={product.id}
                                className="border-b border-gray-200 hover:bg-blue-50/50 transition-colors"
                              >
                                <td className="px-4 py-3 text-center text-gray-900 font-medium">{index + 1}</td>
                                <td className="px-4 py-3 text-gray-900 font-medium">{product.name}</td>
                                <td className="px-4 py-3 text-gray-700 text-xs">
                                  {formatSpecifications(product.specifications)}
                                </td>
                                <td className="px-4 py-3 text-center text-gray-900 font-medium">{product.quantity}</td>
                                <td className="px-4 py-3 text-right text-gray-900 font-medium">
                                  {formatCurrency(product.unitPrice)}
                                </td>
                                <td className="px-4 py-3 text-right text-gray-900 font-semibold">
                                  {formatCurrency(product.unitPrice * product.quantity)}
                                </td>
                                <td className="px-4 py-3 text-right text-gray-700">
                                  {formatCurrency(calculateProductVAT(product))}
                                </td>
                                <td className="px-4 py-3 text-center">
                                  <button
                                    type="button"
                                    onClick={() => handleRemoveProduct(product.id)}
                                    className="text-red-600 hover:text-white hover:bg-red-600 border-2 border-red-600 px-3 py-1.5 rounded-lg transition-all font-medium text-sm"
                                  >
                                    삭제
                                  </button>
                                </td>
                              </tr>
                            ))}
                            <tr className="bg-gradient-to-r from-[#0055A6] to-[#0066CC] text-white font-bold">
                              <td colSpan={5} className="px-4 py-4 text-right text-base">
                                {t("quote.finalAmount")}
                              </td>
                              <td colSpan={2} className="px-4 py-4 text-right text-lg">
                                {formatCurrency(calculateGrandTotal())}
                              </td>
                              <td></td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <p className="text-xs text-gray-500 mt-3 text-right font-medium">{t("quote.vatIncluded")}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3 mb-8">
                <div className="w-1 h-8 bg-[#0055A6] rounded-full"></div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">{t("quote.formSection")}</h2>
              </div>

              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
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
                      className="w-full px-0 py-2 bg-transparent border-0 border-b-2 border-gray-300 focus:border-[#0055A6] focus:outline-none transition-colors text-gray-900"
                      placeholder={t("quote.companyPlaceholder")}
                    />
                  </div>
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
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
                      className="w-full px-0 py-2 bg-transparent border-0 border-b-2 border-gray-300 focus:border-[#0055A6] focus:outline-none transition-colors text-gray-900"
                      placeholder={t("quote.namePlaceholder")}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
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
                      className="w-full px-0 py-2 bg-transparent border-0 border-b-2 border-gray-300 focus:border-[#0055A6] focus:outline-none transition-colors text-gray-900"
                      placeholder={t("quote.phonePlaceholder")}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
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
                      className="w-full px-0 py-2 bg-transparent border-0 border-b-2 border-gray-300 focus:border-[#0055A6] focus:outline-none transition-colors text-gray-900"
                      placeholder={t("quote.emailPlaceholder")}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
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
                    className="w-full px-0 py-2 bg-transparent border-0 border-b-2 border-gray-300 focus:border-[#0055A6] focus:outline-none transition-colors resize-none text-gray-900"
                    placeholder={t("quote.messagePlaceholder")}
                  />
                </div>

                <div>
                  <label htmlFor="file" className="block text-sm font-medium text-gray-700 mb-2">
                    {t("quote.fileUpload")} <span className="text-gray-400 text-xs ml-2">{t("quote.maxFileSize")}</span>
                  </label>
                  <div className="relative">
                    <input type="file" id="file" name="file" onChange={handleFileChange} className="hidden" />
                    <label
                      htmlFor="file"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors cursor-pointer text-gray-700 border-2 border-gray-300"
                    >
                      <UploadIcon />
                      <span className="text-sm font-medium">{t("quote.selectFile")}</span>
                    </label>
                    {formData.file && <span className="ml-3 text-sm text-gray-600">{formData.file.name}</span>}
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
                  <label htmlFor="privacy" className="text-sm text-gray-700 cursor-pointer" onClick={openPrivacyModal}>
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
                      className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform"
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
                      className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform"
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

      {/* Validation Message */}
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
