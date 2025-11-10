"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

const socialLinks = [
  {
    name: "Instagram",
    label: "인스타그램",
    url: "https://www.instagram.com/jaedotech__official",
    icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/instagram-EzykJ6erYMlhz4TcUNn85nn818mcPI.png",
  },
  {
    name: "KakaoTalk",
    label: "카카오톡 상담",
    url: "http://pf.kakao.com/_xjSsDn/chat",
    icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/kakao-RwpfI3kbXPzP2JBdEpcBzMZwqjTSX4.png",
  },
  {
    name: "Band",
    label: "밴드",
    url: "https://www.band.us/page/99788398",
    icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/band-YHttbyEk9Fjw8gPDVAOsq2l0V1XwSU.png",
  },
  {
    name: "SmartStore",
    label: "스마트스토어",
    url: "https://smartstore.naver.com/jaedotech",
    icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/smartstore-Olj1xD6Sob349XB8ZgzP7Pi78DZYIf.png",
  },
]

export function SocialLinks() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const heroSection = document.getElementById("hero")
          const heroHeight = heroSection ? heroSection.offsetHeight : 0
          const scrollPosition = window.scrollY

          setIsVisible(scrollPosition >= heroHeight - 200)
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div
      className={`fixed right-8 bottom-8 z-40 transition-all duration-500 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8 pointer-events-none"
      }`}
    >
      <div className="relative flex flex-row gap-2 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md rounded-2xl p-2 shadow-2xl border border-gray-200 dark:border-gray-700">
        {socialLinks.map((link) => (
          <div key={link.name} className="relative group">
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-8 h-8 rounded-xl overflow-hidden transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg"
              aria-label={link.name}
            >
              <Image src={link.icon || "/placeholder.svg"} alt={link.name} fill className="object-cover" />
            </a>
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-gray-900/95 text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-lg">
              {link.label}
              {/* Tooltip arrow */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-0.5 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900/95"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
