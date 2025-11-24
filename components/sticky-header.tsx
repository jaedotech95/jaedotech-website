"use client"

import React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { LanguageSelector } from "./language-selector"
import { useLanguage } from "@/lib/i18n"
import Image from "next/image"

const AnimatedMenuIcon = ({ isOpen }: { isOpen: boolean }) => (
  <div className="w-5 h-5 flex flex-col justify-center items-center gap-1">
    <span
      className={`block w-5 h-0.5 bg-current transition-all duration-300 ease-out ${
        isOpen ? "rotate-45 translate-y-1.5" : "rotate-0 translate-y-0"
      }`}
    />
    <span
      className={`block w-5 h-0.5 bg-current transition-all duration-300 ease-out ${
        isOpen ? "opacity-0" : "opacity-100"
      }`}
    />
    <span
      className={`block w-5 h-0.5 bg-current transition-all duration-300 ease-out ${
        isOpen ? "-rotate-45 -translate-y-1.5" : "rotate-0 translate-y-0"
      }`}
    />
  </div>
)

export function StickyHeader() {
  const [isVisible, setIsVisible] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isProductsHovered, setIsProductsHovered] = useState(false)
  const { t } = useLanguage()
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    if (pathname !== "/") {
      setIsVisible(true)
      return
    }

    const handleScroll = () => {
      const scrollY = window.scrollY
      setIsVisible(scrollY > 100)
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [pathname])

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true
    if (path !== "/" && pathname?.startsWith(path)) return true
    return false
  }

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    router.push("/")
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }, 100)
  }

  const productItems = [
    { key: "pallet", label: t("products.pallet") },
    { key: "light", label: t("products.light") },
    { key: "heavy", label: t("products.heavy") },
    { key: "mezzanine", label: t("products.mezzanine") },
    { key: "cantilever", label: t("products.cantilever") },
    { key: "sliding", label: t("products.sliding") },
  ]

  const isOnProductsPage = pathname === "/products"

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ease-out ${
          isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        }`}
        style={{
          backgroundColor: "#0055A6",
          boxShadow: "0 2px 8px rgba(0, 85, 166, 0.3)",
        }}
      >
        <div className="backdrop-blur-sm relative">
          <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
          <div className="container mx-auto px-4 relative">
            <div className="grid grid-cols-[auto_1fr_auto] md:grid-cols-3 items-center gap-4 h-16 md:h-20">
              {/* Left: Logo and company name */}
              <Link
                href="/"
                onClick={handleLogoClick}
                className="flex items-center gap-2 md:gap-3 hover:opacity-90 transition-opacity"
              >
                <div className="h-10 md:h-14 flex items-center">
                  <Image
                    src="/images/eb-a1-9c-ea-b3-a0-20-281-29.png"
                    alt="JAEDOTECH Logo"
                    width={200}
                    height={56}
                    className="h-full w-auto object-contain"
                    priority
                  />
                </div>
              </Link>

              {/* Center: Navigation items */}
              <nav className="hidden md:flex items-center justify-center gap-4 md:gap-6 lg:gap-8 xl:gap-12 h-full">
                <Link href="/about" className="h-full flex items-center">
                  <span
                    className={`text-xs md:text-sm lg:text-base font-medium transition-all hover:scale-105 relative group whitespace-nowrap ${
                      isActive("/about") ? "text-white" : "text-white/90 hover:text-white"
                    }`}
                  >
                    {t("nav.about")}
                    <span
                      className={`absolute -bottom-1 left-0 h-px bg-white transition-all ${
                        isActive("/about") ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </span>
                </Link>

                <Link
                  href="/products"
                  onMouseEnter={() => !isOnProductsPage && setIsProductsHovered(true)}
                  onMouseLeave={() => !isOnProductsPage && setIsProductsHovered(false)}
                  className="h-full flex items-center"
                >
                  <span
                    className={`text-xs md:text-sm lg:text-base font-medium transition-all hover:scale-105 relative group whitespace-nowrap ${
                      isActive("/products") ? "text-white" : "text-white/90 hover:text-white"
                    }`}
                  >
                    {t("nav.products")}
                    <span
                      className={`absolute -bottom-1 left-0 h-px bg-white transition-all ${
                        isActive("/products") ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </span>
                </Link>

                <Link href="/projects" className="h-full flex items-center">
                  <span
                    className={`text-xs md:text-sm lg:text-base font-medium transition-all hover:scale-105 relative group whitespace-nowrap ${
                      isActive("/projects") ? "text-white" : "text-white/90 hover:text-white"
                    }`}
                  >
                    {t("nav.projects")}
                    <span
                      className={`absolute -bottom-1 left-0 h-px bg-white transition-all ${
                        isActive("/projects") ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </span>
                </Link>

                <Link href="/quote" className="h-full flex items-center">
                  <span
                    className={`text-xs md:text-sm lg:text-base font-medium transition-all hover:scale-105 relative group whitespace-nowrap ${
                      isActive("/quote") ? "text-white" : "text-white/90 hover:text-white"
                    }`}
                  >
                    {t("nav.quote")}
                    <span
                      className={`absolute -bottom-1 left-0 h-px bg-white transition-all ${
                        isActive("/quote") ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </span>
                </Link>

                {/* 새로운 코드: 공동구매 메뉴 추가 */}
                <Link href="/group-purchase" className="h-full flex items-center relative">
                  <span
                    className={`text-xs md:text-sm lg:text-base font-medium transition-all hover:scale-105 relative group whitespace-nowrap ${
                      isActive("/group-purchase") ? "text-white" : "text-white/90 hover:text-white"
                    }`}
                  >
                    {t("nav.groupPurchase")}
                    <span className="absolute -top-2 -right-5 w-4 h-4 bg-red-400/90 rounded-full shadow-md flex items-center justify-center">
                      <span className="text-[8px] font-bold text-white" style={{ marginLeft: "-0.5px" }}>
                        N
                      </span>
                    </span>
                    <span
                      className={`absolute -bottom-1 left-0 h-px bg-white transition-all ${
                        isActive("/group-purchase") ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </span>
                </Link>
              </nav>

              {/* Right: Language selector and mobile menu */}
              <div className="flex items-center gap-1 md:gap-4 justify-end -mr-4 md:mr-0">
                <LanguageSelector />
                <button
                  className="md:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  aria-label="Toggle menu"
                >
                  <AnimatedMenuIcon isOpen={isMobileMenuOpen} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {!isOnProductsPage && (
          <div
            onMouseEnter={() => setIsProductsHovered(true)}
            onMouseLeave={() => setIsProductsHovered(false)}
            className={`hidden md:block absolute left-0 right-0 transition-all duration-300 ease-out ${
              isProductsHovered ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"
            }`}
            style={{
              top: "calc(100% - 8px)",
              paddingTop: "8px",
            }}
          >
            <div
              className="bg-white shadow-lg"
              style={{
                borderTop: "1px solid rgba(0, 85, 166, 0.1)",
              }}
            >
              <div className="container mx-auto px-4">
                <div className="flex items-center justify-center gap-1 py-3">
                  {productItems.map((item, index) => (
                    <React.Fragment key={item.key}>
                      <Link
                        href={`/products#${item.key}`}
                        className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-all whitespace-nowrap"
                      >
                        {item.label}
                      </Link>
                      {index !== productItems.length - 1 && <div className="h-4 w-px bg-gray-300" />}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-[90] md:hidden transition-all duration-300 ease-out ${
          isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        style={{ top: "64px" }}
      >
        <div className="absolute inset-0 bg-black/50" onClick={() => setIsMobileMenuOpen(false)} />
        <nav
          className={`relative bg-white dark:bg-gray-900 shadow-lg transition-transform duration-300 ease-out border-t border-white/20 ${
            isMobileMenuOpen ? "translate-y-0" : "-translate-y-full"
          }`}
          style={{ backgroundColor: "#0055A6" }}
        >
          <div className="container mx-auto px-4 py-3">
            <Link
              href="/about"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`block w-full text-left px-4 py-3 rounded-lg transition-colors border-b border-white/20 ${
                isActive("/about") ? "text-white bg-white/10" : "text-white/90 hover:text-white hover:bg-white/10"
              }`}
            >
              {t("nav.about")}
            </Link>
            <Link
              href="/products"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`block w-full text-left px-4 py-3 rounded-lg transition-colors border-b border-white/20 ${
                isActive("/products") ? "text-white bg-white/10" : "text-white/90 hover:text-white hover:bg-white/10"
              }`}
            >
              {t("nav.products")}
            </Link>
            <Link
              href="/projects"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`block w-full text-left px-4 py-3 rounded-lg transition-colors border-b border-white/20 ${
                isActive("/projects") ? "text-white bg-white/10" : "text-white/90 hover:text-white hover:bg-white/10"
              }`}
            >
              {t("nav.projects")}
            </Link>
            <Link
              href="/quote"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`block w-full text-left px-4 py-3 rounded-lg transition-colors border-b border-white/20 ${
                isActive("/quote") ? "text-white bg-white/10" : "text-white/90 hover:text-white hover:bg-white/10"
              }`}
            >
              {t("nav.quote")}
            </Link>

            {/* 새로운 코드: 모바일 메뉴에도 공동구매 추가 */}
            <Link
              href="/group-purchase"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`block w-full text-left px-4 py-3 rounded-lg transition-colors border-b border-white/20 relative ${
                isActive("/group-purchase")
                  ? "text-white bg-white/10"
                  : "text-white/90 hover:text-white hover:bg-white/10"
              }`}
            >
              {t("nav.groupPurchase")}
              <span className="absolute top-3 right-4 w-4 h-4 bg-red-400/90 rounded-full shadow-md flex items-center justify-center">
                <span className="text-[8px] font-bold text-white" style={{ marginLeft: "-0.5px" }}>
                  N
                </span>
              </span>
            </Link>
          </div>
        </nav>
      </div>
    </>
  )
}
