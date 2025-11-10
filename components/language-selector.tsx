"use client"

import { useState } from "react"
import { useLanguage } from "@/lib/i18n"

const ChevronDownIcon = ({ isOpen }: { isOpen: boolean }) => (
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
    className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
)

type Language = "ko" | "en" | "ja"

const languages = {
  ko: { name: "한국어", flag: "🇰🇷", short: "KR" },
  en: { name: "English", flag: "🇺🇸", short: "EN" },
  ja: { name: "日本語", flag: "🇯🇵", short: "JP" },
}

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 md:gap-2 px-2 md:px-3 py-2 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all"
      >
        <span className="text-sm font-medium md:hidden">{languages[language].short}</span>
        <span className="text-sm font-medium hidden md:inline">{languages[language].name}</span>
        <ChevronDownIcon isOpen={isOpen} />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 top-full mt-2 w-44 bg-white rounded-lg shadow-2xl border border-gray-200 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
            {Object.entries(languages).map(([code, { name, flag }]) => (
              <button
                key={code}
                onClick={() => handleLanguageChange(code as Language)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-all ${
                  language === code
                    ? "bg-blue-600 text-white font-semibold"
                    : "hover:bg-gray-50 text-gray-700 hover:text-gray-900"
                }`}
              >
                <span className="flex items-center justify-center w-5 h-5 text-lg leading-none -translate-y-0.5">
                  {flag}
                </span>
                <span className="text-sm">{name}</span>
                {language === code && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="ml-auto"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
