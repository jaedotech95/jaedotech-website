"use client"

import { useEffect, useRef } from "react"

export function SmoothScrollHandler() {
  const isScrollingRef = useRef(false)
  const hasSnappedRef = useRef(false) // Track if we've already snapped from hero
  const lastWheelTimeRef = useRef(0)

  useEffect(() => {
    const isDesktop = () => window.innerWidth >= 1024

    const isModalOpen = () => {
      return document.body.style.overflow === "hidden"
    }

    const sections = ["hero", "products", "projects", "quote"]
    let scrollTimeout: NodeJS.Timeout

    const getCurrentSection = (): number => {
      const scrollPosition = window.scrollY
      const viewportHeight = window.innerHeight

      let maxVisibility = 0
      let mostVisibleSection = 0

      sections.forEach((sectionId, index) => {
        const element = document.getElementById(sectionId)
        if (!element) return

        const rect = element.getBoundingClientRect()
        const elementTop = rect.top
        const elementBottom = rect.bottom

        const visibleTop = Math.max(0, Math.min(viewportHeight, elementBottom))
        const visibleBottom = Math.max(0, Math.min(viewportHeight, viewportHeight - elementTop))
        const visibility = Math.min(visibleTop, visibleBottom)

        if (visibility > maxVisibility) {
          maxVisibility = visibility
          mostVisibleSection = index
        }
      })

      return mostVisibleSection
    }

    const isInHeroSection = (): boolean => {
      const heroElement = document.getElementById("hero")
      if (!heroElement) return false

      const rect = heroElement.getBoundingClientRect()
      // Consider in hero if more than 50% of hero is visible
      return rect.top > -rect.height * 0.5
    }

    const scrollToSection = (index: number) => {
      if (index < 0 || index >= sections.length) {
        return
      }

      const element = document.getElementById(sections[index])
      if (!element) {
        return
      }

      isScrollingRef.current = true

      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })

      clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(() => {
        isScrollingRef.current = false
      }, 1000)
    }

    const handleWheel = (e: WheelEvent) => {
      // Only on desktop
      if (!isDesktop()) return

      // Don't interfere when modal is open
      if (isModalOpen()) return

      // Don't interfere if already scrolling
      if (isScrollingRef.current) {
        e.preventDefault()
        return
      }

      if (!isInHeroSection()) {
        // Once we've left hero section, allow free scrolling
        hasSnappedRef.current = true
        return
      }

      if (hasSnappedRef.current) {
        return
      }

      const now = Date.now()
      const timeSinceLastWheel = now - lastWheelTimeRef.current

      if (timeSinceLastWheel < 100) {
        e.preventDefault()
        return
      }

      if (Math.abs(e.deltaY) < 20) {
        return
      }

      if (e.deltaY > 0) {
        e.preventDefault()
        lastWheelTimeRef.current = now
        hasSnappedRef.current = true // Mark that we've snapped
        scrollToSection(1) // Scroll to products section
      }
    }

    // Add event listeners
    if (isDesktop()) {
      window.addEventListener("wheel", handleWheel, { passive: false })
    }

    // Handle resize
    const handleResize = () => {
      if (isDesktop()) {
        window.addEventListener("wheel", handleWheel, { passive: false })
      } else {
        window.removeEventListener("wheel", handleWheel)
      }
    }
    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => {
      window.removeEventListener("wheel", handleWheel)
      window.removeEventListener("resize", handleResize)
      clearTimeout(scrollTimeout)
    }
  }, [])

  return null
}
