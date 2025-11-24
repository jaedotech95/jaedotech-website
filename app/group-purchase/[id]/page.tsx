"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter, useParams } from "next/navigation"
import { StickyHeader } from "@/components/sticky-header"
import { Footer } from "@/components/footer"
import { useLanguage } from "@/lib/i18n"
import { createBrowserClient } from "@supabase/ssr"
import { getLightRackPrice } from "@/lib/light-rack-pricing-data"

interface GroupPurchase {
  id: string
  location: string
  title: string
  created_at: string
  deadline: string
  is_closed: boolean
  participant_count: number
}

interface SelectedOption {
  width: string
  depth: string
  height: string
  levels: string
  quantity: number
  price: number
}

export default function GroupPurchaseDetailPage() {
  const { t } = useLanguage()
  const router = useRouter()
  const params = useParams()
  const id = params?.id as string

  const [groupPurchase, setGroupPurchase] = useState<GroupPurchase | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedOptions, setSelectedOptions] = useState<SelectedOption[]>([])

  // 현재 선택중인 옵션
  const [currentSpecs, setCurrentSpecs] = useState({
    width: "",
    depth: "",
    height: "",
    levels: "",
    type: "",
  })
  const [currentQuantity, setCurrentQuantity] = useState(1)

  // 개인정보
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    detailedAddress: "",
  })
  const [agreedToPrivacy, setAgreedToPrivacy] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  const [validationMessage, setValidationMessage] = useState("")
  const validationTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const isShowingMessageRef = useRef(false)

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )

  useEffect(() => {
    if (id) {
      fetchGroupPurchase()
    }
  }, [id])

  const fetchGroupPurchase = async () => {
    try {
      const { data, error } = await supabase.from("group_purchases").select("*").eq("id", id).single()

      if (error) throw error
      setGroupPurchase(data)
    } catch (error) {
      console.error("Error fetching group purchase:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (!groupPurchase) return

    const updateTimer = () => {
      const now = new Date().getTime()
      const deadline = new Date(groupPurchase.deadline).getTime()
      const difference = deadline - now

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }

    updateTimer()
    const interval = setInterval(updateTimer, 1000)

    return () => clearInterval(interval)
  }, [groupPurchase])

  const lightRackOptions = {
    widths: [600, 900, 1000, 1200],
    depths: [300, 450, 600],
    heights: [900, 1200, 1500, 1800, 2100, 2400],
    levels: ["2", "3", "4", "5", "6", "7", "8", "9"],
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

  const handleAddOption = () => {
    if (!currentSpecs.width || !currentSpecs.depth || !currentSpecs.height || !currentSpecs.levels) {
      showValidationMessage("모든 옵션을 선택해주세요")
      return
    }

    const price = getLightRackPrice(
      Number(currentSpecs.width),
      Number(currentSpecs.depth),
      Number(currentSpecs.height),
      currentSpecs.levels,
      "standalone",
    )

    if (!price) {
      showValidationMessage("가격 정보를 찾을 수 없습니다")
      return
    }

    setSelectedOptions([
      ...selectedOptions,
      {
        ...currentSpecs,
        quantity: currentQuantity,
        price,
      },
    ])

    // 초기화
    setCurrentSpecs({
      width: "",
      depth: "",
      height: "",
      levels: "",
      type: "",
    })
    setCurrentQuantity(1)
  }

  const handleRemoveOption = (index: number) => {
    setSelectedOptions(selectedOptions.filter((_, i) => i !== index))
  }

  const handleSubmit = async () => {
    if (!formData.name || !formData.phone || !formData.detailedAddress) {
      showValidationMessage("필수 항목을 모두 입력해주세요")
      return
    }

    if (selectedOptions.length === 0) {
      showValidationMessage("최소 1개 이상의 옵션을 선택해주세요")
      return
    }

    if (!agreedToPrivacy) {
      showValidationMessage("개인정보 제공에 동의해주세요")
      return
    }

    setIsSubmitting(true)

    try {
      const { error } = await supabase.from("group_purchase_participants").insert({
        group_purchase_id: id,
        name: formData.name,
        phone: formData.phone,
        email: formData.email || null,
        detailed_address: formData.detailedAddress,
        selected_options: selectedOptions,
      })

      if (error) throw error

      // 참여자 수 증가
      await supabase.rpc("increment_participant_count", { gp_id: id })

      showValidationMessage(t("groupPurchase.detail.applicationSuccess"))

      setTimeout(() => {
        router.push("/group-purchase")
      }, 2000)
    } catch (error) {
      console.error("Error submitting application:", error)
      showValidationMessage("신청 중 오류가 발생했습니다")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0055A6]"></div>
      </main>
    )
  }

  if (!groupPurchase) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-600 mb-4">공동구매를 찾을 수 없습니다</p>
          <button
            onClick={() => router.push("/group-purchase")}
            className="px-6 py-3 bg-[#0055A6] text-white rounded-lg hover:bg-[#004494]"
          >
            목록으로 돌아가기
          </button>
        </div>
      </main>
    )
  }

  const isClosed =
    groupPurchase.is_closed ||
    (timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0)

  return (
    <main className="min-h-screen">
      <StickyHeader />

      <section className="pt-20 pb-8 md:pt-24 md:pb-12 bg-gradient-to-b from-blue-50/50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Left: Product Image */}
            <div className="relative">
              <div className="sticky top-24">
                <div className="aspect-[3/4] rounded-lg overflow-hidden bg-gray-100">
                  <img src="/images/leaflet.png" alt="경량랙 제품 안내" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>

            {/* Right: Option Selection */}
            <div>
              <div className="mb-6 p-6 bg-white border-2 border-[#0055A6] rounded-lg">
                <h1 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: "#0055A6" }}>
                  {groupPurchase.title}
                </h1>

                <div className="space-y-2 text-sm md:text-base mb-4">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-700">{t("groupPurchase.detail.location")}:</span>
                    <span className="text-gray-900">{groupPurchase.location}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-700">{t("groupPurchase.participants")}:</span>
                    <span className="font-bold" style={{ color: "#0055A6" }}>
                      {groupPurchase.participant_count}명
                    </span>
                  </div>
                </div>

                <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border-2 border-[#0055A6]">
                  <p className="text-sm font-semibold text-gray-700 mb-2 text-center">
                    {isClosed ? t("groupPurchase.closed") : t("groupPurchase.timeRemaining")}
                  </p>
                  {!isClosed ? (
                    <div className="grid grid-cols-4 gap-2">
                      <div className="bg-white rounded-lg p-3 text-center">
                        <div className="text-2xl md:text-3xl font-bold" style={{ color: "#0055A6" }}>
                          {timeLeft.days}
                        </div>
                        <div className="text-xs text-gray-600 mt-1">{t("groupPurchase.days")}</div>
                      </div>
                      <div className="bg-white rounded-lg p-3 text-center">
                        <div className="text-2xl md:text-3xl font-bold" style={{ color: "#0055A6" }}>
                          {timeLeft.hours}
                        </div>
                        <div className="text-xs text-gray-600 mt-1">{t("groupPurchase.hours")}</div>
                      </div>
                      <div className="bg-white rounded-lg p-3 text-center">
                        <div className="text-2xl md:text-3xl font-bold" style={{ color: "#0055A6" }}>
                          {timeLeft.minutes}
                        </div>
                        <div className="text-xs text-gray-600 mt-1">{t("groupPurchase.minutes")}</div>
                      </div>
                      <div className="bg-white rounded-lg p-3 text-center">
                        <div className="text-2xl md:text-3xl font-bold" style={{ color: "#0055A6" }}>
                          {timeLeft.seconds}
                        </div>
                        <div className="text-xs text-gray-600 mt-1">{t("groupPurchase.seconds")}</div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-4">
                      <span className="text-xl font-bold text-red-600">{t("groupPurchase.closed")}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-5 mt-4">
                  {/* Width Select */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">{t("quote.width")} (mm)</label>
                    <select
                      value={currentSpecs.width}
                      onChange={(e) => setCurrentSpecs({ ...currentSpecs, width: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#0055A6] focus:outline-none text-base"
                    >
                      <option value="">선택하세요</option>
                      {lightRackOptions.widths.map((w) => (
                        <option key={w} value={w}>
                          {w}mm
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Depth Select */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">{t("quote.depth")} (mm)</label>
                    <select
                      value={currentSpecs.depth}
                      onChange={(e) => setCurrentSpecs({ ...currentSpecs, depth: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#0055A6] focus:outline-none text-base"
                    >
                      <option value="">선택하세요</option>
                      {lightRackOptions.depths.map((d) => (
                        <option key={d} value={d}>
                          {d}mm
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Height Select */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">{t("quote.height")} (mm)</label>
                    <select
                      value={currentSpecs.height}
                      onChange={(e) => setCurrentSpecs({ ...currentSpecs, height: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#0055A6] focus:outline-none text-base"
                    >
                      <option value="">선택하세요</option>
                      {lightRackOptions.heights.map((h) => (
                        <option key={h} value={h}>
                          {h}mm
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Levels Select */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">{t("quote.levels")}</label>
                    <select
                      value={currentSpecs.levels}
                      onChange={(e) => setCurrentSpecs({ ...currentSpecs, levels: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#0055A6] focus:outline-none text-base"
                    >
                      <option value="">선택하세요</option>
                      {lightRackOptions.levels.map((l) => (
                        <option key={l} value={l}>
                          {t(`quote.levels.${l}`)}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Quantity Input */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">{t("quote.quantity")}</label>
                    <input
                      type="number"
                      min="1"
                      value={currentQuantity}
                      onChange={(e) => setCurrentQuantity(Math.max(1, Number.parseInt(e.target.value) || 1))}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#0055A6] focus:outline-none text-base"
                    />
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    type="button"
                    onClick={handleAddOption}
                    className="w-full py-4 bg-[#0055A6] text-white rounded-lg hover:bg-[#004494] transition-colors font-bold text-lg"
                  >
                    {t("groupPurchase.detail.addToCart")}
                  </button>
                </div>
              </div>

              {/* Selected Items */}
              {selectedOptions.length > 0 && (
                <div className="mb-8 p-6 bg-blue-50 rounded-lg">
                  <h3 className="text-lg font-bold mb-4" style={{ color: "#0055A6" }}>
                    {t("groupPurchase.detail.selectedItems")}
                  </h3>
                  <div className="space-y-3">
                    {selectedOptions.map((option, index) => (
                      <div key={index} className="flex items-center justify-between bg-white p-4 rounded-lg">
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">
                            {option.width}×{option.depth}×{option.height}, {t(`quote.levels.${option.levels}`)}
                          </p>
                          <p className="text-sm text-gray-600">
                            {t("quote.quantity")}: {option.quantity}
                          </p>
                        </div>
                        <button
                          onClick={() => handleRemoveOption(index)}
                          className="ml-4 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors text-sm font-medium"
                        >
                          {t("groupPurchase.detail.remove")}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 개인정보 입력 */}
              <div className="mb-8">
                <h2 className="text-xl font-bold mb-4" style={{ color: "#0055A6" }}>
                  {t("groupPurchase.detail.personalInfo")}
                </h2>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t("groupPurchase.detail.name")} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#0055A6] focus:outline-none"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t("groupPurchase.detail.phone")} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#0055A6] focus:outline-none"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t("groupPurchase.detail.email")}
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#0055A6] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t("groupPurchase.detail.detailedAddress")} <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      value={formData.detailedAddress}
                      onChange={(e) => setFormData({ ...formData, detailedAddress: e.target.value })}
                      rows={3}
                      placeholder={t("groupPurchase.detail.addressPlaceholder")}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#0055A6] focus:outline-none resize-none"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* 동의 및 신청 */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="privacy"
                    checked={agreedToPrivacy}
                    onChange={(e) => setAgreedToPrivacy(e.target.checked)}
                    className="w-4 h-4 text-[#0055A6] border-gray-300 rounded focus:ring-[#0055A6]"
                  />
                  <label htmlFor="privacy" className="text-sm text-gray-700">
                    <span className="font-bold text-[#0055A6]">{t("groupPurchase.detail.privacyAgree")}</span>
                  </label>
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-full px-6 py-4 bg-[#0055A6] text-white rounded-lg hover:bg-[#004494] transition-all duration-300 hover:shadow-lg font-semibold text-lg disabled:opacity-50"
                >
                  {isSubmitting ? "신청중..." : t("groupPurchase.detail.submitApplication")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {validationMessage && (
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

      <Footer />
    </main>
  )
}
