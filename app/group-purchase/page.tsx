"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { StickyHeader } from "@/components/sticky-header"
import { Footer } from "@/components/footer"
import { useLanguage } from "@/lib/i18n"
import { createBrowserClient } from "@supabase/ssr"
import Link from "next/link"

interface GroupPurchase {
  id: string
  location: string
  title: string
  created_at: string
  deadline: string
  is_closed: boolean
  participant_count: number
}

export default function GroupPurchasePage() {
  const { t } = useLanguage()
  const router = useRouter()
  const [activeGroupPurchases, setActiveGroupPurchases] = useState<GroupPurchase[]>([])
  const [closedGroupPurchases, setClosedGroupPurchases] = useState<GroupPurchase[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false)
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)
  const [newGroupPurchaseId, setNewGroupPurchaseId] = useState<string | null>(null)
  const [location, setLocation] = useState("")
  const [buildingName, setBuildingName] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    fetchGroupPurchases()
  }, [])

  const fetchGroupPurchases = async () => {
    try {
      const { data, error } = await supabase
        .from("group_purchases")
        .select("*")
        .order("created_at", { ascending: false })

      if (error) throw error

      const now = new Date()
      const active = (data || []).filter((gp) => {
        const deadline = new Date(gp.deadline)
        return !gp.is_closed && deadline > now
      })

      const closed = (data || []).filter((gp) => {
        const deadline = new Date(gp.deadline)
        return gp.is_closed || deadline <= now
      })

      setActiveGroupPurchases(active)
      setClosedGroupPurchases(closed)
    } catch (error) {
      console.error("Error fetching group purchases:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (isAddressModalOpen && (window as any).daum) {
      ;new (window as any).daum.Postcode({
        oncomplete: (data: any) => {
          const fullAddress = data.roadAddress || data.jibunAddress
          const addressWithBuilding = data.buildingName ? `${fullAddress} (${data.buildingName})` : fullAddress
          setLocation(addressWithBuilding)
          if (data.buildingName) {
            setBuildingName(data.buildingName)
          } else {
            setBuildingName("")
          }
          setIsAddressModalOpen(false)
        },
        onclose: () => {
          setIsAddressModalOpen(false)
        },
        width: "100%",
        height: "100%",
      }).embed(document.getElementById("addressSearchContainer"))
    }
  }, [isAddressModalOpen])

  const handleModalSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!location.trim()) {
      alert("주소를 검색해주세요")
      return
    }

    setIsSubmitting(true)

    try {
      const locationName = buildingName || location
      const title = `${locationName} 공동구매`
      const createdAt = new Date()
      const deadline = new Date(createdAt.getTime() + 3 * 24 * 60 * 60 * 1000) // 3일 후

      const { data, error } = await supabase
        .from("group_purchases")
        .insert({
          location: location.trim(),
          title,
          deadline: deadline.toISOString(),
          is_closed: false,
          participant_count: 0,
        })
        .select()
        .single()

      if (error) throw error

      setNewGroupPurchaseId(data.id)
      setIsModalOpen(false)
      setIsSuccessModalOpen(true)
      setLocation("")
      setBuildingName("")
    } catch (error) {
      console.error("Error creating group purchase:", error)
      alert("공동구매 생성 중 오류가 발생했습니다")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleGoToGroupPurchase = () => {
    if (newGroupPurchaseId) {
      router.push(`/group-purchase/${newGroupPurchaseId}`)
    }
  }

  const GroupPurchaseCard = ({ gp, isClosed }: { gp: GroupPurchase; isClosed: boolean }) => {
    const daysLeft = Math.max(0, Math.ceil((new Date(gp.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24)))

    return (
      <Link
        href={`/group-purchase/${gp.id}`}
        className="group block bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-visible border border-gray-100 hover:border-[#0055A6]/30 relative"
      >
        <div className="absolute -top-4 -left-4 z-10">
          {!isClosed && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-[#0055A6] to-blue-600 text-white rounded-lg text-sm font-bold shadow-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="animate-pulse"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              D-{daysLeft}
            </span>
          )}
        </div>

        <div className="relative p-5 md:p-6 flex flex-col min-h-[280px]">
          <div className="absolute top-3 right-3">
            {isClosed && (
              <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-gray-100 text-gray-600 rounded-full text-xs font-semibold">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                {t("groupPurchase.closed")}
              </span>
            )}
          </div>

          <h3 className="text-base md:text-lg font-bold text-gray-900 mb-3 pr-20 group-hover:text-[#0055A6] transition-colors line-clamp-2">
            {gp.title.replace(" 공동구매", "")}
          </h3>

          <div className="space-y-3 mb-3 flex-1">
            <div className="flex items-start gap-2 text-gray-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="flex-shrink-0 mt-0.5 text-[#0055A6]"
              >
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span className="text-sm leading-relaxed line-clamp-1">{gp.location}</span>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-gray-100">
              <div className="flex items-center gap-2 text-gray-600">
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
                  className="text-[#0055A6]"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
                <div>
                  <div className="text-xl font-bold text-gray-900">{gp.participant_count}</div>
                  <div className="text-xs text-gray-500">{t("groupPurchase.participants")}</div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-gray-600">
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
                  className="text-[#0055A6]"
                >
                  <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                  <line x1="16" x2="16" y1="2" y2="6" />
                  <line x1="8" x2="8" y1="2" y2="6" />
                  <line x1="3" x2="21" y1="10" y2="10" />
                </svg>
                <div>
                  <div className="text-sm font-semibold text-gray-900">
                    {new Date(gp.deadline).toLocaleDateString()}
                  </div>
                  <div className="text-xs text-gray-500">{t("groupPurchase.deadline")}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-auto pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between text-[#0055A6] font-semibold text-sm group-hover:translate-x-2 transition-transform">
              <span>{isClosed ? t("groupPurchase.closed") : t("groupPurchase.viewDetails")}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </div>
          </div>
        </div>
      </Link>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js" async></script>

      <StickyHeader />

      {/* 히어로 섹션 */}
      <div className="relative bg-white py-12 md:py-16 mt-12 md:mt-16">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <div className="flex items-center justify-center gap-2 text-sm md:text-base text-[#0055A6] mb-4">
            <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 0 013.75-2.906z" />
            </svg>
            <span className="font-medium">{t("groupPurchase.subtitle2")}</span>
          </div>

          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-[#0055A6] mb-4 md:mb-6">
            {t("groupPurchase.title")}
          </h1>

          <p className="text-base md:text-lg text-gray-600 mb-8 md:mb-10">{t("groupPurchase.description")}</p>

          <button
            onClick={() => setIsModalOpen(true)}
            className="group inline-flex items-center gap-2 bg-[#0055A6] hover:bg-[#004494] text-white font-semibold px-8 py-3.5 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 text-base md:text-lg"
          >
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
              className="group-hover:rotate-90 transition-transform duration-300"
            >
              <path d="M5 12h14" />
              <path d="M12 5v14" />
            </svg>
            {t("groupPurchase.createButton")}
          </button>
        </div>
      </div>

      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-8 md:mb-12">
            <div className="h-10 w-1.5 bg-gradient-to-b from-[#0055A6] to-[#0077CC] rounded-full"></div>
            <h2 className="text-xl md:text-3xl font-bold text-gray-900 flex items-center gap-2">
              {t("groupPurchase.activeListTitle")}
              {activeGroupPurchases.length > 0 && (
                <span className="text-base md:text-xl text-[#0055A6]">({activeGroupPurchases.length})</span>
              )}
            </h2>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center py-32">
              <div className="relative">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200"></div>
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-t-[#0055A6] absolute top-0 left-0"></div>
              </div>
            </div>
          ) : activeGroupPurchases.length === 0 ? (
            <div className="text-center py-32 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="64"
                height="64"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mx-auto mb-4 text-gray-300"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="m21 21-4.3-4.3" />
              </svg>
              <p className="text-lg text-gray-500">{t("groupPurchase.noItems")}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {activeGroupPurchases.map((gp) => (
                <GroupPurchaseCard key={gp.id} gp={gp} isClosed={false} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-12 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-8 md:mb-12">
            <div className="h-10 w-1.5 bg-gradient-to-b from-gray-400 to-gray-500 rounded-full"></div>
            <h2 className="text-xl md:text-3xl font-bold text-gray-900 flex items-center gap-2">
              {t("groupPurchase.closedListTitle")}
              <span className="text-base md:text-xl text-gray-500">({closedGroupPurchases.length})</span>
            </h2>
          </div>

          {closedGroupPurchases.length === 0 ? (
            <div className="text-center py-32 bg-white rounded-3xl border-2 border-dashed border-gray-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="64"
                height="64"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mx-auto mb-4 text-gray-300"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
              <p className="text-gray-500 text-sm md:text-base">{t("groupPurchase.noClosedItems")}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {closedGroupPurchases.map((gp) => (
                <GroupPurchaseCard key={gp.id} gp={gp} isClosed={true} />
              ))}
            </div>
          )}
        </div>
      </section>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl md:text-2xl font-bold" style={{ color: "#0055A6" }}>
                {t("groupPurchase.create.title")}
              </h2>
              <button
                onClick={() => {
                  setIsModalOpen(false)
                  setLocation("")
                  setBuildingName("")
                }}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
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
              </button>
            </div>

            <div className="p-6 md:p-8">
              <p className="text-sm md:text-base text-gray-600 mb-6">{t("groupPurchase.create.subtitle")}</p>

              <form onSubmit={handleModalSubmit} className="space-y-6">
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                    {t("groupPurchase.create.location")} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="location"
                    value={location}
                    readOnly
                    onClick={() => setIsAddressModalOpen(true)}
                    placeholder="주소를 입력해주세요"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-white cursor-pointer hover:border-[#0055A6] transition-colors"
                    required
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setIsModalOpen(false)
                      setLocation("")
                      setBuildingName("")
                    }}
                    className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
                  >
                    {t("groupPurchase.detail.cancel")}
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 px-6 py-3 bg-[#0055A6] text-white rounded-lg hover:bg-[#004494] transition-all duration-300 hover:shadow-lg font-semibold disabled:opacity-50"
                  >
                    {isSubmitting ? "생성중..." : t("groupPurchase.create.submit")}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {isAddressModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl h-[600px] overflow-hidden">
            <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h3 className="text-lg font-bold" style={{ color: "#0055A6" }}>
                주소 검색
              </h3>
              <button
                onClick={() => setIsAddressModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
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
              </button>
            </div>
            <div id="addressSearchContainer" className="w-full h-[calc(100%-64px)]"></div>
          </div>
        </div>
      )}

      {isSuccessModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[70] p-4 animate-in fade-in duration-300">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full transform animate-in zoom-in-95 duration-300">
            <div className="p-8 text-center">
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mb-6 shadow-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="animate-in zoom-in duration-500 delay-100"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-3">생성 완료!</h3>
              <p className="text-gray-600 mb-8">공동구매가 성공적으로 생성되었습니다.</p>

              <button
                onClick={handleGoToGroupPurchase}
                className="w-full bg-gradient-to-r from-[#0055A6] to-blue-600 hover:from-[#004494] hover:to-blue-700 text-white font-semibold px-6 py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
              >
                확인하러 가기
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </main>
  )
}
