"use client"

import { useEffect, useRef, useState } from "react"
import { Switch } from "@/components/ui/switch"
import { useLanguage } from "@/lib/i18n"

const productKeys = ["pallet", "light", "heavy", "mezzanine", "sliding", "cantilever"]

export function ProductsSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [isListView, setIsListView] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [angle, setAngle] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedProductKey, setSelectedProductKey] = useState<string | null>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const carouselRef = useRef<HTMLDivElement>(null)
  const { t } = useLanguage()

  const products = productKeys.map((key, index) => ({
    id: index + 1,
    key,
    name: t(`products.${key}`),
    description: t(`products.${key}.desc`),
    image: `/products/${key}-rack.png`,
  }))

  const itemCount = products.length
  const step = 360 / itemCount

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
    if (isModalOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isModalOpen])

  const openModal = (productKey: string) => {
    setSelectedProductKey(productKey)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setTimeout(() => setSelectedProductKey(null), 300)
  }

  const handleItemClick = (index: number) => {
    if (isListView) {
      openModal(products[index].key)
      return
    }
    const isActive = index === currentIndex
    if (isActive) {
      openModal(products[index].key)
      return
    }
    const diff = index - currentIndex
    setAngle((prev) => prev - diff * step)
    setCurrentIndex(index)
  }

  const getItemStyle = (index: number) => {
    if (isListView) {
      return {}
    }

    const rotateY = index * step + angle
    const rad = (rotateY * Math.PI) / 180
    const radius = typeof window !== "undefined" && window.innerWidth < 768 ? 200 : 350
    const x = Math.sin(rad) * radius
    const z = Math.cos(rad) * radius

    const isActive = index === currentIndex

    return {
      transform: isActive
        ? `translate3d(0, 0, ${radius}px) rotateY(0deg) rotateX(15deg)`
        : `translate3d(${x}px, 0, ${z}px) rotateY(${-rotateY}deg)`,
      opacity: z > 0 ? 1 : 0.4,
      transitionProperty: "transform, opacity",
      transitionDuration: "1s, 0.8s",
      transitionTimingFunction: "ease, ease",
      transitionDelay: `${index * 100}ms`,
    }
  }

  const selectedProduct = selectedProductKey ? products.find((p) => p.key === selectedProductKey) : null

  return (
    <section
      id="products"
      ref={sectionRef}
      className="py-20 md:py-24 lg:py-28 bg-background relative overflow-hidden flex items-center"
    >
      <div className="container mx-auto px-4 md:px-8 lg:px-12 max-w-[1920px]">
        <div className="relative mb-4 flex items-center gap-3 md:gap-4">
          <div className="relative -ml-4 md:-ml-8 lg:-ml-24 xl:-ml-32 max-w-fit">
            <div
              className={`bg-[#0055A6] pl-4 md:pl-8 lg:pl-24 xl:pl-32 pr-6 py-2 md:py-3 shadow-lg transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
              }`}
            >
              <h2 className="text-lg md:text-2xl font-bold text-white">{t("products.title")}</h2>
            </div>
          </div>

          <div
            className={`flex items-center gap-2 md:gap-4 bg-[#0055A6] px-4 py-2 md:px-6 md:py-3 rounded-full shadow-[inset_0_2px_4px_rgba(0,0,0,0.3),0_4px_8px_rgba(0,85,166,0.4)] border-2 border-[#003d7a] transition-all duration-300 active:scale-95 active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.4),0_2px_4px_rgba(0,85,166,0.3)] ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <span className="text-sm md:text-base font-semibold text-white min-w-[60px] md:min-w-[80px] text-center">
              {isListView ? t("products.toggle.3d") : t("products.toggle.list")}
            </span>
            <Switch
              id="view-mode"
              checked={isListView}
              onCheckedChange={setIsListView}
              className="data-[state=checked]:bg-white data-[state=unchecked]:bg-[#003d7a] shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)]"
            />
          </div>
        </div>

        <div className="relative min-h-[420px] md:min-h-[480px] lg:min-h-[520px] flex items-center justify-center overflow-visible">
          {!isListView ? (
            <div
              ref={carouselRef}
              className="relative w-full md:w-[400px] lg:w-[450px] h-[320px] md:h-[380px] lg:h-[400px]"
              style={{
                transformStyle: "preserve-3d",
                transform: "perspective(1000px) rotateX(-15deg)",
              }}
            >
              {products.map((product, index) => {
                const isActive = index === currentIndex
                return (
                  <div
                    key={product.id}
                    className={`absolute w-[140px] h-[200px] md:w-[160px] md:h-[230px] lg:w-[180px] lg:h-[250px] left-1/2 -translate-x-1/2 top-[40px] md:top-[50px] cursor-pointer ${
                      isVisible ? "opacity-100" : "opacity-0"
                    }`}
                    style={getItemStyle(index)}
                    onClick={() => handleItemClick(index)}
                  >
                    <div className="relative w-full h-full">
                      <div
                        className={`w-full h-[120px] md:h-[140px] lg:h-[160px] bg-card rounded-lg shadow-lg flex items-center justify-center overflow-hidden transition-all duration-500 ${
                          isActive ? "scale-110 shadow-2xl" : ""
                        }`}
                      >
                        <div className="w-full h-full bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                          <span className="text-3xl md:text-4xl lg:text-5xl">📦</span>
                        </div>
                      </div>

                      {/* Reflection */}
                      <div
                        className="absolute top-[135px] md:top-[155px] lg:top-[175px] w-full h-[120px] md:h-[140px] lg:h-[160px] pointer-events-none opacity-25"
                        style={{
                          transform: "scaleY(-1)",
                          filter: "brightness(0.5) saturate(0.7) blur(4px)",
                          maskImage:
                            "linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.2) 30%, transparent 80%)",
                          WebkitMaskImage:
                            "linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.2) 30%, transparent 80%)",
                        }}
                      >
                        <div className="w-full h-[120px] md:h-[140px] lg:h-[160px] bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center rounded-lg">
                          <span className="text-3xl md:text-4xl lg:text-5xl">📦</span>
                        </div>
                      </div>

                      <div
                        className={`absolute -bottom-1 md:-bottom-2 left-1/2 -translate-x-1/2 transition-all duration-800 cursor-pointer ${
                          isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                        }`}
                        onClick={(e) => {
                          e.stopPropagation()
                          if (isActive) openModal(product.key)
                        }}
                      >
                        <div className="relative bg-white border-2 border-[#0055A6] shadow-lg hover:shadow-xl transition-shadow duration-300 max-w-[140px] md:max-w-[160px] lg:max-w-[180px]">
                          <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#0055A6]" />
                          <h3
                            className="text-[10px] md:text-xs lg:text-sm font-bold text-foreground whitespace-nowrap px-3 md:px-4 py-1.5 md:py-2 pl-4 md:pl-6 tracking-tight"
                            style={{
                              WebkitFontSmoothing: "antialiased",
                              backfaceVisibility: "hidden",
                              transform: "translateZ(0)",
                            }}
                          >
                            {product.name}
                          </h3>
                          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#0055A6] via-[#0055A6]/50 to-transparent" />
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 w-full">
              {products.map((product, index) => (
                <div
                  key={product.id}
                  className={`transition-all duration-500 cursor-pointer ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                  style={{
                    transitionDelay: `${index * 100}ms`,
                  }}
                  onClick={() => openModal(product.key)}
                >
                  <div className="bg-card rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                    <div className="h-[160px] bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                      <span className="text-5xl">📦</span>
                    </div>
                    <div className="p-3 md:p-6">
                      <h3 className="text-sm md:text-lg font-bold text-foreground mb-1 md:mb-2">{product.name}</h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && selectedProduct && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-[2px] p-4"
          onClick={closeModal}
        >
          <div
            className="relative bg-white rounded-lg shadow-[0_25px_80px_rgba(0,0,0,0.35),0_10px_30px_rgba(0,85,166,0.15)] max-w-5xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 md:top-4 md:right-4 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-[#0055A6] text-white hover:bg-[#003d7a] transition-all duration-300 hover:rotate-90 hover:scale-110 hover:ring-4 hover:ring-[#0055A6]/30 active:scale-95 z-10"
              aria-label="Close modal"
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
                className="w-5 h-5 md:w-6 md:h-6"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            <div className="p-6 md:p-8">
              {/* Product image */}
              <div className="w-full h-48 md:h-64 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg flex items-center justify-center mb-4 md:mb-6">
                <span className="text-6xl md:text-8xl">📦</span>
              </div>

              {/* Product name */}
              <h2 className="text-xl md:text-2xl font-bold text-foreground mb-3 md:mb-4 border-l-4 border-[#0055A6] pl-3 md:pl-4">
                {selectedProduct.name}
              </h2>

              {/* Product description */}
              <p className="text-sm md:text-base text-muted-foreground mb-4 md:mb-6 leading-relaxed">
                {selectedProduct.description}
              </p>

              {/* View details button */}
              <div className="flex justify-end pt-3 md:pt-4 border-t border-border">
                <button className="group flex items-center gap-1 md:gap-2 text-[#0055A6] font-semibold hover:text-[#003d7a] transition-colors text-sm md:text-base">
                  <span>자세히 보기</span>
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
                    className="w-4 h-4 md:w-5 md:h-5 transition-transform group-hover:animate-[slideRight_0.8s_ease-in-out_infinite]"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slideRight {
          0%,
          100% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(4px);
          }
        }
      `}</style>
    </section>
  )
}
