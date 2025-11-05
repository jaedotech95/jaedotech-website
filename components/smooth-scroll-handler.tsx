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
      console.log("[v0] Initial section:", section, sections[section])
    }

    const scrollToSection = (index: number) => {
      if (index < 0 || index >= sections.length) {
        console.log("[v0] Invalid section index:", index)
        return
      }

      const element = document.getElementById(sections[index])
      if (!element) {
        console.log("[v0] Section element not found:", sections[index])
        return
      }

      console.log("[v0] Scrolling to section:", index, sections[index])

      isScrollingRef.current = true
      currentSectionRef.current = index

      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })

      clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(() => {
        isScrollingRef.current = false
        console.log("[v0] Scroll complete, current section:", currentSectionRef.current)
      }, 1000)
    }

    const shouldSnapScroll = (): boolean => {
      const scrollY = window.scrollY
      const viewportHeight = window.innerHeight

      // After quote section, allow free scrolling
      const quoteElement = document.getElementById("quote")
      if (quoteElement) {
        const quoteRect = quoteElement.getBoundingClientRect()
        const quoteBottom = quoteRect.bottom + scrollY

        if (scrollY >= quoteBottom - viewportHeight * 0.5) {
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

      console.log(
        "[v0] Wheel event - current section:",
        detectedSection,
        sections[detectedSection],
        "deltaY:",
        e.deltaY,
      )

      // Prevent default scroll
      e.preventDefault()

      // Calculate next section
      const direction = e.deltaY > 0 ? 1 : -1
      const nextSection = currentSectionRef.current + direction

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
        console.log("[v0] Manual scroll - section changed to:", section, sections[section])
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
