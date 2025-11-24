"use client"

import { useEffect, useState } from "react"

const SunIcon = () => (
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
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
  </svg>
)

const MoonIcon = () => (
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
    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
  </svg>
)

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    // Check initial theme
    const isDarkMode = document.documentElement.classList.contains("dark")
    setIsDark(isDarkMode)
  }, [])

  const toggleTheme = () => {
    const newIsDark = !isDark
    setIsDark(newIsDark)

    if (newIsDark) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }
  }

  return (
    <button
      onClick={toggleTheme}
      className="fixed bottom-8 right-8 z-50 w-20 h-10 rounded-full bg-gray-300 dark:bg-gray-700 shadow-2xl transition-all duration-300 flex items-center px-1 border-2 border-gray-400 dark:border-gray-600 hover:scale-105"
      aria-label="Toggle theme"
    >
      <div
        className={`w-8 h-8 rounded-full bg-[#0055A6] shadow-lg flex items-center justify-center transition-all duration-300 transform ${
          isDark ? "translate-x-10" : "translate-x-0"
        }`}
      >
        <div className="relative w-5 h-5 text-white">
          <div
            className={`absolute inset-0 transition-all duration-300 ${
              isDark ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"
            }`}
          >
            <SunIcon />
          </div>
          <div
            className={`absolute inset-0 transition-all duration-300 ${
              isDark ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"
            }`}
          >
            <MoonIcon />
          </div>
        </div>
      </div>
    </button>
  )
}
