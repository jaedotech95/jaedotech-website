import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "제품소개 - 파렛트랙, 캔틸레버랙, 중량물랙 | 재도테크",
  description:
    "재도테크의 다양한 물류설비 제품을 확인하세요. 파렛트랙, 캔틸레버랙, 중량물랙, 경량물랙, 다단랙, 이동랙 등 물류창고에 최적화된 솔루션을 제공합니다.",
  keywords: [
    "파렛트랙",
    "캔틸레버랙",
    "중량물랙",
    "경량물랙",
    "다단랙",
    "이동랙",
    "물류설비",
    "창고랙",
    "재도테크 제품",
  ],
  openGraph: {
    title: "제품소개 - 파렛트랙, 캔틸레버랙, 중량물랙 | 재도테크",
    description: "재도테크의 다양한 물류설비 제품을 확인하세요. 파렛트랙, 캔틸레버랙, 중량물랙 등",
    url: "https://jaedotech.com/products",
    type: "website",
  },
}

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
