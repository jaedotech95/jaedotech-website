import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "견적문의 - 무료 출장 견적 | 재도테크",
  description:
    "재도테크의 물류설비 시스템 무료 견적을 신청하세요. 전국 어디든 무료 출장 견적, 제조사 직거래로 합리적인 가격을 제공합니다. 파렛트랙, 캔틸레버랙, 중량물랙 등 모든 제품 견적 가능",
  keywords: ["견적문의", "무료견적", "출장견적", "파렛트랙 견적", "물류설비 견적", "창고랙 견적", "재도테크 견적"],
  openGraph: {
    title: "견적문의 - 무료 출장 견적 | 재도테크",
    description: "재도테크의 물류설비 시스템 무료 견적을 신청하세요. 전국 어디든 무료 출장 견적",
    url: "https://jaedotech.com/quote",
    type: "website",
  },
}

export default function QuoteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
