"use client"

import React from "react"

import { StickyHeader } from "@/components/sticky-header"
import { Footer } from "@/components/footer"
import { useLanguage } from "@/lib/i18n"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

type ProductType = "pallet" | "mezzanine" | "light" | "heavy" | "sliding" | "cantilever"

export default function ProductsPage() {
  const { t } = useLanguage()
  const [selectedProduct, setSelectedProduct] = useState<ProductType>("pallet")
  const hero = useScrollAnimation()
  const details = useScrollAnimation()
  const cta = useScrollAnimation()

  useEffect(() => {
    const hash = window.location.hash.replace("#", "") as ProductType
    const validProducts: ProductType[] = ["pallet", "light", "heavy", "mezzanine", "sliding", "cantilever"]

    if (hash && validProducts.includes(hash)) {
      setSelectedProduct(hash)
    }

    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [selectedProduct])

  const productMenu: { id: ProductType; label: string }[] = [
    { id: "pallet", label: t("products.pallet") },
    { id: "light", label: t("products.light") },
    { id: "heavy", label: t("products.heavy") },
    { id: "mezzanine", label: t("products.mezzanine") },
    { id: "sliding", label: t("products.sliding") },
    { id: "cantilever", label: t("products.cantilever") },
  ]

  const productDetails: Record<
    ProductType,
    {
      title: string
      description: string
      image: string
      features: string[]
      applications: string[]
      benefits: string[]
    }
  > = {
    pallet: {
      title: t("products.pallet"),
      description: t("products.pallet.desc"),
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pallet_1-rSWOXD5SSBMZLK2wjc0jTEvJlGPtze.jpg",
      features: [
        t("products.pallet.feature1"),
        t("products.pallet.feature2"),
        t("products.pallet.feature3"),
        t("products.pallet.feature4"),
      ],
      applications: [
        t("products.pallet.application1"),
        t("products.pallet.application2"),
        t("products.pallet.application3"),
      ],
      benefits: [t("products.pallet.benefit1"), t("products.pallet.benefit2"), t("products.pallet.benefit3")],
    },
    mezzanine: {
      title: t("products.mezzanine"),
      description: t("products.mezzanine.desc"),
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/mezzanine.png-1kapjIzp9t5j0N5SUfPMw09iE1P2UE.jpeg",
      features: [
        t("products.mezzanine.feature1"),
        t("products.mezzanine.feature2"),
        t("products.mezzanine.feature3"),
        t("products.mezzanine.feature4"),
      ],
      applications: [
        t("products.mezzanine.application1"),
        t("products.mezzanine.application2"),
        t("products.mezzanine.application3"),
      ],
      benefits: [t("products.mezzanine.benefit1"), t("products.mezzanine.benefit2"), t("products.mezzanine.benefit3")],
    },
    light: {
      title: t("products.light"),
      description: t("products.light.desc"),
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/light_weight_1-bu33KFugokwBQp1LX1wMbzVusRb2nC.png",
      features: [
        t("products.light.feature1"),
        t("products.light.feature2"),
        t("products.light.feature3"),
        t("products.light.feature4"),
      ],
      applications: [
        t("products.light.application1"),
        t("products.light.application2"),
        t("products.light.application3"),
      ],
      benefits: [t("products.light.benefit1"), t("products.light.benefit2"), t("products.light.benefit3")],
    },
    heavy: {
      title: t("products.heavy"),
      description: t("products.heavy.desc"),
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/heavy_weight.png-AyVVADMeuQe839SgeUBN90MECSlssv.jpeg",
      features: [
        t("products.heavy.feature1"),
        t("products.heavy.feature2"),
        t("products.heavy.feature3"),
        t("products.heavy.feature4"),
      ],
      applications: [
        t("products.heavy.application1"),
        t("products.heavy.application2"),
        t("products.heavy.application3"),
      ],
      benefits: [t("products.heavy.benefit1"), t("products.heavy.benefit2"), t("products.heavy.benefit3")],
    },
    sliding: {
      title: t("products.sliding"),
      description: t("products.sliding.desc"),
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/sliding_1-0LIs1oNbWDagl5nFOvaEnXIoIPvFIk.png",
      features: [
        t("products.sliding.feature1"),
        t("products.sliding.feature2"),
        t("products.sliding.feature3"),
        t("products.sliding.feature4"),
      ],
      applications: [
        t("products.sliding.application1"),
        t("products.sliding.application2"),
        t("products.sliding.application3"),
      ],
      benefits: [t("products.sliding.benefit1"), t("products.sliding.benefit2"), t("products.sliding.benefit3")],
    },
    cantilever: {
      title: t("products.cantilever"),
      description: t("products.cantilever.desc"),
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cantilever-AlnB7JUZwhbzv3esKhbMkdot09eSZI.jpg",
      features: [
        t("products.cantilever.feature1"),
        t("products.cantilever.feature2"),
        t("products.cantilever.feature3"),
        t("products.cantilever.feature4"),
      ],
      applications: [
        t("products.cantilever.application1"),
        t("products.cantilever.application2"),
        t("products.cantilever.application3"),
      ],
      benefits: [
        t("products.cantilever.benefit1"),
        t("products.cantilever.benefit2"),
        t("products.cantilever.benefit3"),
      ],
    },
  }

  const currentProduct = productDetails[selectedProduct]
  const productIndex = productMenu.findIndex((p) => p.id === selectedProduct)
  const isImageLeft = productIndex % 2 === 0

  const palletFeatures = [
    {
      title: t("products.pallet.features.feature1.title"),
      description: t("products.pallet.features.feature1.description"),
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pallet_2-iH5wW7fnb5vuAciOOspzN54BUx17fJ.jpg",
    },
    {
      title: t("products.pallet.features.feature2.title"),
      description: t("products.pallet.features.feature2.description"),
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pallet_3-q5dosARb2YERxzCngo1kXTzgbYxEHi.jpg",
    },
    {
      title: t("products.pallet.features.feature3.title"),
      description: t("products.pallet.features.feature3.description"),
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pallet_4-02WYZW8PwF8BaQM2gFPneKb9IKGWoR.jpg",
    },
    {
      title: t("products.pallet.features.feature4.title"),
      description: t("products.pallet.features.feature4.description"),
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pallet_5-EUJDbRyU3w1hVrkHPLkTQdYPv1GHWN.jpg",
    },
  ]

  const lightFeatures = [
    {
      title: t("products.light.features.feature1.title"),
      description: t("products.light.features.feature1.description"),
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/light_weight1-j8cWl9xApovsV2U7lAa46VG87GG6rz.png",
    },
    {
      title: t("products.light.features.feature2.title"),
      description: t("products.light.features.feature2.description"),
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/light_weight2-I58WkAD9n0BN87dmc5LlfRIjy51KYI.png",
    },
    {
      title: t("products.light.features.feature3.title"),
      description: t("products.light.features.feature3.description"),
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/light_weight3-4vbNPALRyB12vKMUg3WzJiyWcceJKX.png",
    },
    {
      title: t("products.light.features.feature4.title"),
      description: t("products.light.features.feature4.description"),
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/light_weight4-4S0BcH0Gzqmq0RzGBUtQMBu0RsECRI.jpg",
    },
    {
      title: t("products.light.features.feature5.title"),
      description: t("products.light.features.feature5.description"),
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/light_weight5.jfif-Iemiyib23ReBG0aTSFiJ1Tc7LriKgq.jpeg",
    },
  ]

  const heavyFeatures = [
    {
      title: t("products.heavy.features.feature1.title"),
      description: t("products.heavy.features.feature1.description"),
      image: "/heavy-duty-rack-high-load-capacity.jpg",
    },
    {
      title: t("products.heavy.features.feature2.title"),
      description: t("products.heavy.features.feature2.description"),
      image: "/adjustable-beam-height-rack.jpg",
    },
    {
      title: t("products.heavy.features.feature3.title"),
      description: t("products.heavy.features.feature3.description"),
      image: "/modular-bolt-assembly-rack.jpg",
    },
    {
      title: t("products.heavy.features.feature4.title"),
      description: t("products.heavy.features.feature4.description"),
      image: "/powder-coated-galvanized-rack.jpg",
    },
    {
      title: t("products.heavy.features.feature5.title"),
      description: t("products.heavy.features.feature5.description"),
      image: "/factory-warehouse-distribution-center-storage.jpg",
    },
  ]

  return (
    <main className="min-h-screen overflow-x-hidden">
      <StickyHeader />

      <div className="fixed top-16 md:top-20 left-0 right-0 bg-white border-b border-gray-200 z-60 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-start md:justify-center gap-1 overflow-x-auto py-3 md:py-4 scrollbar-hide">
            {productMenu.map((item, index) => (
              <React.Fragment key={item.id}>
                <button
                  onClick={() => setSelectedProduct(item.id)}
                  className={`whitespace-nowrap px-3 md:px-4 py-2 text-xs md:text-sm font-medium transition-all rounded-md flex-shrink-0 ${
                    selectedProduct === item.id
                      ? "text-white shadow-md"
                      : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                  }`}
                  style={selectedProduct === item.id ? { backgroundColor: "#0055A6" } : undefined}
                >
                  {item.label}
                </button>
                {index !== productMenu.length - 1 && <div className="h-4 w-px bg-gray-300 flex-shrink-0" />}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      <section
        ref={hero.elementRef as React.RefObject<HTMLElement>}
        className={`pt-32 md:pt-40 pb-8 md:pb-4 bg-gradient-to-b from-blue-50 to-white transition-all duration-1000 ${
          hero.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div
              className={`grid md:grid-cols-2 gap-6 md:gap-12 items-center ${isImageLeft ? "" : "md:flex-row-reverse"}`}
            >
              <div
                className={`aspect-[4/3] bg-gray-100 rounded-2xl overflow-hidden relative shadow-xl ${isImageLeft ? "" : "md:order-2"}`}
              >
                <Image
                  key={selectedProduct}
                  src={currentProduct.image || "/placeholder.svg"}
                  alt={currentProduct.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
              <div className={isImageLeft ? "" : "md:order-1 md:text-right"}>
                <h1 className="text-xl md:text-2xl lg:text-3xl font-bold mb-2 md:mb-3" style={{ color: "#0055A6" }}>
                  {currentProduct.title}
                </h1>
                <p className="text-sm md:text-base lg:text-lg text-gray-700 leading-relaxed">
                  {currentProduct.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {selectedProduct === "pallet" || selectedProduct === "light" || selectedProduct === "heavy" ? (
        // Special layout for pallet, light, and heavy racks
        <section ref={details.elementRef as React.RefObject<HTMLElement>} className="py-8 md:py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto space-y-8 md:space-y-24">
              {/* Purpose Section */}
              <div
                className={`transition-all duration-1000 ${
                  details.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                <h2 className="text-lg md:text-3xl font-bold mb-3 md:mb-6 text-center" style={{ color: "#0055A6" }}>
                  {t(`products.${selectedProduct}.purpose.title`)}
                </h2>
                <p className="text-xs md:text-lg text-gray-700 leading-relaxed text-center max-w-4xl mx-auto">
                  {t(`products.${selectedProduct}.purpose.description`)}
                </p>
              </div>

              {/* Features Title */}
              <div
                className={`transition-all duration-1000 delay-100 ${
                  details.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                <h2 className="text-lg md:text-3xl font-bold mb-6 md:mb-12 text-center" style={{ color: "#0055A6" }}>
                  {t(`products.${selectedProduct}.features.title`)}
                </h2>
              </div>

              {/* Features with alternating layout */}
              {(selectedProduct === "pallet"
                ? palletFeatures
                : selectedProduct === "light"
                  ? lightFeatures
                  : heavyFeatures
              ).map((feature, index) => {
                const isImageOnLeft = selectedProduct === "light" ? index % 2 === 0 : index % 2 === 1

                return (
                  <div
                    key={index}
                    className={`transition-all duration-1000 ${
                      details.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    }`}
                    style={{ transitionDelay: `${(index + 2) * 100}ms` }}
                  >
                    <div className={`grid md:grid-cols-2 gap-4 md:gap-12 items-center`}>
                      {/* Image */}
                      <div
                        className={`aspect-[4/3] bg-gray-100 rounded-xl md:rounded-2xl overflow-hidden relative shadow-lg ${
                          isImageOnLeft ? "md:order-1" : "md:order-2"
                        }`}
                      >
                        <Image
                          key={`${selectedProduct}-feature-${index}`}
                          src={feature.image || "/placeholder.svg"}
                          alt={feature.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </div>

                      {/* Text */}
                      <div className={`${isImageOnLeft ? "md:order-2" : "md:order-1"}`}>
                        <h3 className="text-sm md:text-2xl font-bold mb-2 md:mb-4" style={{ color: "#0055A6" }}>
                          {feature.title}
                        </h3>
                        <p className="text-xs md:text-lg text-gray-700 leading-relaxed">{feature.description}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      ) : (
        // Other products layout (existing)
        <section ref={details.elementRef as React.RefObject<HTMLElement>} className="py-8 md:py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto space-y-8 md:space-y-16">
              {/* Features Section */}
              <div
                className={`transition-all duration-1000 ${
                  details.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                <h2 className="text-lg md:text-3xl font-bold mb-4 md:mb-8 text-center" style={{ color: "#0055A6" }}>
                  {t("products.details.features")}
                </h2>
                <div className="grid md:grid-cols-2 gap-3 md:gap-6">
                  {currentProduct.features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-2 md:gap-4 p-3 md:p-6 bg-blue-50 rounded-lg md:rounded-xl"
                    >
                      <div
                        className="flex-shrink-0 w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center text-white text-xs md:text-sm font-bold"
                        style={{ backgroundColor: "#0055A6" }}
                      >
                        {index + 1}
                      </div>
                      <p className="text-xs md:text-base text-gray-700 leading-relaxed pt-0.5 md:pt-1">{feature}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Applications Section */}
              <div
                className={`transition-all duration-1000 delay-100 ${
                  details.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                <h2 className="text-lg md:text-3xl font-bold mb-4 md:mb-8 text-center" style={{ color: "#0055A6" }}>
                  {t("products.details.applications")}
                </h2>
                <div className="space-y-3 md:space-y-4">
                  {currentProduct.applications.map((application, index) => (
                    <div
                      key={index}
                      className="p-3 md:p-6 bg-gradient-to-r from-blue-50 to-white rounded-lg md:rounded-xl border border-blue-100"
                    >
                      <p className="text-xs md:text-base text-gray-700 font-medium leading-relaxed">{application}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Benefits Section */}
              <div
                className={`transition-all duration-1000 delay-200 ${
                  details.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                <h2 className="text-lg md:text-3xl font-bold mb-4 md:mb-8 text-center" style={{ color: "#0055A6" }}>
                  {t("products.details.benefits")}
                </h2>
                <div className="grid md:grid-cols-3 gap-3 md:gap-6">
                  {currentProduct.benefits.map((benefit, index) => (
                    <div
                      key={index}
                      className="p-3 md:p-6 bg-gradient-to-br from-blue-50 to-white rounded-lg md:rounded-xl shadow-sm border border-blue-100 hover:shadow-md transition-shadow"
                    >
                      <p className="text-xs md:text-base text-gray-700 font-medium leading-relaxed text-center">
                        {benefit}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="py-8 md:py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-xl md:text-2xl font-bold mb-6 text-center" style={{ color: "#0055A6" }}>
              {t("products.checkOthers")}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
              {productMenu
                .filter((product) => product.id !== selectedProduct)
                .map((product, index) => (
                  <button
                    key={product.id}
                    onClick={() => setSelectedProduct(product.id)}
                    className={`bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-500 group border border-gray-100 text-left ${
                      details.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    }`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div className="aspect-square bg-gray-100 overflow-hidden relative">
                      <Image
                        key={`other-${product.id}-${selectedProduct}`}
                        src={productDetails[product.id].image || "/placeholder.svg"}
                        alt={product.label}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                      />
                    </div>
                    <div className="p-2 md:p-3">
                      <h3
                        className="text-xs md:text-sm font-bold mb-1 group-hover:text-blue-600 transition-colors line-clamp-2"
                        style={{ color: "#0055A6" }}
                      >
                        {product.label}
                      </h3>
                    </div>
                  </button>
                ))}
            </div>
          </div>
        </div>
      </section>

      <section
        ref={cta.elementRef as React.RefObject<HTMLElement>}
        className={`py-8 md:py-24 relative overflow-hidden transition-all duration-1000 ${
          cta.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {/* Blurred background */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-gray-100 backdrop-blur-sm" />
        <div className="absolute inset-0 bg-white/60 backdrop-blur-md" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-xl md:text-4xl font-bold mb-3 md:mb-6" style={{ color: "#0055A6" }}>
              {t("products.cta.title")}
            </h2>
            <p className="text-sm md:text-lg text-gray-600 mb-6 md:mb-8 leading-relaxed">
              {t("products.cta.subtitle")}
            </p>
            <Link
              href="/quote"
              className="inline-block px-6 py-3 md:px-8 md:py-4 rounded-lg font-semibold text-white shadow-lg hover:shadow-xl transition-all hover:scale-105"
              style={{ backgroundColor: "#0055A6" }}
            >
              {t("hero.cta.quote")}
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
