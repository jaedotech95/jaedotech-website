"use client"

import { useEffect, useRef } from "react"

export function SmoothScrollHandler() {
  const isScrollingRef = useRef(false)
  const currentSectionRef = useRef(0)

  useEffect(() => {
    const sections = ["hero", "products", "projects", "quote"]
    let scrollTimeout: NodeJS.Timeout

    const scrollToSection = (index: number) => {
      if (index < 0 || index >= sections.length) return

      const element = document.getElementById(sections[index])
      if (!element) return

      isScrollingRef.current = true
      currentSectionRef.current = index

      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })

      clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(() => {
        isScrollingRef.current = false
      }, 600)
    }

    const isInSnapSection = () => {
      const scrollY = window.scrollY
      const viewportHeight = window.innerHeight

      const quoteElement = document.getElementById("quote")
      if (quoteElement) {
        const quoteRect = quoteElement.getBoundingClientRect()
        const quoteTop = quoteRect.top + scrollY
        const quoteBottom = quoteTop + quoteRect.height

        // If we're at or past the bottom of quote section, allow free scrolling
        if (scrollY >= quoteBottom - viewportHeight * 0.5) {
          return false
        }
      }

      return true
    }

    const handleWheel = (e: WheelEvent) => {
      if (!isInSnapSection()) {
        return
      }

      if (currentSectionRef.current === sections.length - 1 && e.deltaY > 0) {
        return
      }

      if (!isScrollingRef.current) {
        e.preventDefault()

        const direction = e.deltaY > 0 ? 1 : -1
        const nextSection = currentSectionRef.current + direction

        scrollToSection(nextSection)
      }
    }

    window.addEventListener("wheel", handleWheel, { passive: false })

    const updateCurrentSection = () => {
      if (isScrollingRef.current) return

      const scrollPosition = window.scrollY + window.innerHeight / 2

      sections.forEach((sectionId, index) => {
        const element = document.getElementById(sectionId)
        if (element) {
          const rect = element.getBoundingClientRect()
          const elementTop = rect.top + window.scrollY
          const elementBottom = elementTop + rect.height

          if (scrollPosition >= elementTop && scrollPosition < elementBottom) {
            currentSectionRef.current = index
          }
        }
      })
    }

    window.addEventListener("scroll", updateCurrentSection)
    updateCurrentSection()

    return () => {
      window.removeEventListener("wheel", handleWheel)
      window.removeEventListener("scroll", updateCurrentSection)
      clearTimeout(scrollTimeout)
    }
  }, [])

  return null
}
