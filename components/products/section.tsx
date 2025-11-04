"use client"

const Section = ({ product, isActive, openModal }) => {
  return (
    <div>
      <div
        className={`absolute -bottom-4 left-1/2 -translate-x-1/2 transition-all duration-800 cursor-pointer ${
          isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
        style={{
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
          backfaceVisibility: "hidden",
          transform: "translateZ(0)",
          willChange: "transform, opacity",
        }}
        onClick={(e) => {
          e.stopPropagation()
          if (isActive) openModal(product)
        }}
      >
        <div className="relative bg-white border-2 border-[#0055A6] shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#0055A6]" />
          <h3 className="text-sm md:text-base font-bold text-foreground whitespace-nowrap px-6 py-3 pl-8 tracking-tight">
            {product.name}
          </h3>
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#0055A6] via-[#0055A6]/50 to-transparent" />
        </div>
      </div>
    </div>
  )
}

export default Section
