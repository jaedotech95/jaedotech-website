"use client"

import { useLanguage } from "@/lib/i18n"

const clients = [
  { name: "CJ대한통운", logo: "/cj-logistics-company-logo.jpg" },
  { name: "쿠팡", logo: "/coupang-company-logo.jpg" },
  { name: "롯데물류", logo: "/lotte-logistics-logo.jpg" },
  { name: "현대글로비스", logo: "/hyundai-glovis-logo.jpg" },
  { name: "삼성물산", logo: "/samsung-c.jpg" },
  { name: "LG전자", logo: "/lg-electronics-logo.jpg" },
]

export function ClientsSection() {
  const { t } = useLanguage()

  const duplicatedClients = [
    ...clients,
    ...clients,
    ...clients,
    ...clients,
    ...clients,
    ...clients,
    ...clients,
    ...clients,
  ]

  return (
    <>
      <div className="container mx-auto px-4 md:px-8 lg:px-12 max-w-[1920px] pt-12 md:pt-16 pb-6">
        <h2 className="text-xs md:text-sm font-medium text-center text-muted-foreground">{t("clients.title")}</h2>
      </div>

      <section className="py-2 bg-gray-100">
        <div className="overflow-hidden">
          <div className="flex gap-1 animate-scroll-slow">
            {duplicatedClients.map((client, index) => (
              <div key={index} className="flex-shrink-0 flex items-center justify-center w-24 h-14 bg-white/50 rounded">
                <img
                  src={client.logo || "/placeholder.svg"}
                  alt={client.name}
                  className="w-full h-full object-contain transition-all duration-300 hover:scale-110 hover:drop-shadow-lg"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
