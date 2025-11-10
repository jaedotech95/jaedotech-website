"use client"

import { useEffect, useRef } from "react"

export function SmoothScrollHandler() {
  const isScrollingRef = useRef(false)
  const currentSectionRef = useRef(0)
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

        // Calculate how much of the section is visible in viewport
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

    const initializeSection = () => {
      const section = getCurrentSection()
      currentSectionRef.current = section
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
      currentSectionRef.current = index

      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })

      clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(() => {
        isScrollingRef.current = false
      }, 1000)
    }

    const shouldSnapScroll = (): boolean => {
      const scrollY = window.scrollY
      const viewportHeight = window.innerHeight

      const quoteElement = document.getElementById("quote")
      if (quoteElement) {
        const quoteRect = quoteElement.getBoundingClientRect()
        const quoteTop = quoteRect.top

        // If quote section has scrolled past the viewport (top is negative and absolute value is greater than section height)
        // This means we've scrolled past the quote section, so allow free scrolling
        if (quoteTop < -quoteRect.height * 0.8) {
          return false
        }
      }

      return true
    }

    const handleWheel = (e: WheelEvent) => {
      // Only on desktop
      if (!isDesktop()) return

      // Don't interfere when modal is open
      if (isModalOpen()) return

      // Don't snap after quote section
      if (!shouldSnapScroll()) return

      // Don't interfere if already scrolling
      if (isScrollingRef.current) {
        e.preventDefault()
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

      const detectedSection = getCurrentSection()
      currentSectionRef.current = detectedSection

      const direction = e.deltaY > 0 ? 1 : -1
      const nextSection = currentSectionRef.current + direction

      // If trying to scroll beyond the last section (down) or before first section (up), allow free scrolling
      if (nextSection >= sections.length || nextSection < 0) {
        return // Don't prevent default, allow natural scrolling
      }

      // Prevent default scroll only if we have a valid next section
      e.preventDefault()

      // Update last wheel time
      lastWheelTimeRef.current = now

      // Scroll to next section
      scrollToSection(nextSection)
    }

    const handleScroll = () => {
      if (isScrollingRef.current) return

      const section = getCurrentSection()
      if (section !== currentSectionRef.current) {
        currentSectionRef.current = section
      }
    }

    initializeSection()

    // Add event listeners
    if (isDesktop()) {
      window.addEventListener("wheel", handleWheel, { passive: false })
    }
    window.addEventListener("scroll", handleScroll, { passive: true })

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
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleResize)
      clearTimeout(scrollTimeout)
    }
  }, [])

  return null
}
