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
    const validProducts: ProductType[] = ["pallet", "mezzanine", "light", "heavy", "sliding", "cantilever"]

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
    { id: "mezzanine", label: t("products.mezzanine") },
    { id: "light", label: t("products.light") },
    { id: "heavy", label: t("products.heavy") },
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
      image: "/pallet-rack-in-warehouse.jpg",
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
      image: "/mezzanine-rack-system.jpg",
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
      image: "/light-duty-shelving-system.jpg",
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
      image: "/heavy-duty-industrial-rack.jpg",
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
      image: "/sliding-rack-system.jpg",
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
      image: "/cantilever-rack-for-long-materials.jpg",
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

  return (
    <main className="min-h-screen">
      <StickyHeader />

      <div className="fixed top-16 md:top-20 left-0 right-0 bg-white border-b border-gray-200 z-40 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-1 overflow-x-auto py-3 md:py-4">
            {productMenu.map((item, index) => (
              <React.Fragment key={item.id}>
                <button
                  onClick={() => setSelectedProduct(item.id)}
                  className={`whitespace-nowrap px-4 py-2 text-sm font-medium transition-all rounded-md ${
                    selectedProduct === item.id
                      ? "text-white shadow-md"
                      : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                  }`}
                  style={selectedProduct === item.id ? { backgroundColor: "#0055A6" } : undefined}
                >
                  {item.label}
                </button>
                {index !== productMenu.length - 1 && <div className="h-4 w-px bg-gray-300" />}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      <section
        ref={hero.elementRef as React.RefObject<HTMLElement>}
        className={`pt-44 md:pt-48 pb-12 md:pb-16 bg-gradient-to-b from-blue-50 to-white transition-all duration-1000 ${
          hero.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div
              className={`grid md:grid-cols-2 gap-8 md:gap-12 items-center ${isImageLeft ? "" : "md:flex-row-reverse"}`}
            >
              <div
                className={`aspect-[4/3] bg-gray-100 rounded-2xl overflow-hidden relative shadow-xl ${isImageLeft ? "" : "md:order-2"}`}
              >
                <Image
                  src={currentProduct.image || "/placeholder.svg"}
                  alt={currentProduct.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
              <div className={isImageLeft ? "" : "md:order-1"}>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6" style={{ color: "#0055A6" }}>
                  {currentProduct.title}
                </h1>
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed">{currentProduct.description}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section ref={details.elementRef as React.RefObject<HTMLElement>} className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto space-y-12 md:space-y-16">
            {/* Features Section */}
            <div
              className={`transition-all duration-1000 ${
                details.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center" style={{ color: "#0055A6" }}>
                {t("products.details.features")}
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {currentProduct.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-4 p-6 bg-blue-50 rounded-xl">
                    <div
                      className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
                      style={{ backgroundColor: "#0055A6" }}
                    >
                      {index + 1}
                    </div>
                    <p className="text-gray-700 leading-relaxed pt-1">{feature}</p>
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
              <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center" style={{ color: "#0055A6" }}>
                {t("products.details.applications")}
              </h2>
              <div className="space-y-4">
                {currentProduct.applications.map((application, index) => (
                  <div
                    key={index}
                    className="p-6 bg-gradient-to-r from-blue-50 to-white rounded-xl border border-blue-100"
                  >
                    <p className="text-gray-700 font-medium leading-relaxed">{application}</p>
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
              <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center" style={{ color: "#0055A6" }}>
                {t("products.details.benefits")}
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {currentProduct.benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="p-6 bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-sm border border-blue-100 hover:shadow-md transition-shadow"
                  >
                    <p className="text-gray-700 font-medium leading-relaxed text-center">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Other Products Section */}
      <section className="py-8 md:py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-xl md:text-2xl font-bold mb-6 text-center" style={{ color: "#0055A6" }}>
              {t("products.checkOthers")}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
              {productMenu.map((product, index) => (
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
                      src={productDetails[product.id].image || "/placeholder.svg"}
                      alt={product.label}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
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

      {/* CTA Section */}
      <section
        ref={cta.elementRef as React.RefObject<HTMLElement>}
        className={`py-16 md:py-24 bg-gradient-to-b from-white to-blue-50 transition-all duration-1000 ${
          cta.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: "#0055A6" }}>
              {t("hero.subtext")}
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">{t("hero.footer")}</p>
            <Link
              href="/quote"
              className="inline-block px-8 py-4 rounded-lg font-semibold text-white shadow-lg hover:shadow-xl transition-all hover:scale-105"
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
