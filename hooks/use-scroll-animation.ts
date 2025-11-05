"use client"

import { useEffect, useRef, useState } from "react"

export function useScrollAnimation(options = {}) {
  const elementRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(element)
        }
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
        ...options,
      },
    )

    observer.observe(element)

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [options])

  return { elementRef, isVisible }
}
