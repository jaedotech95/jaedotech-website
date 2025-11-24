"use client"

import Image from "next/image"
import { useState } from "react"

interface OptimizedImageProps {
  src: string
  alt: string
  fill?: boolean
  className?: string
  sizes?: string
  priority?: boolean
}

export function OptimizedImage({ src, alt, fill, className, sizes, priority }: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <>
      {/* Skeleton loader */}
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse" />
      )}

      <Image
        src={src || "/placeholder.svg"}
        alt={alt}
        fill={fill}
        className={`${className} transition-opacity duration-500 ${isLoading ? "opacity-0" : "opacity-100"}`}
        sizes={sizes}
        priority={priority}
        onLoad={() => setIsLoading(false)}
        quality={85}
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwAB//2Q=="
      />
    </>
  )
}
