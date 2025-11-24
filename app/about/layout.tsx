import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "회사소개 - 물류설비시스템 전문업체 | 재도테크",
  description:
    "재도테크는 물류설비시스템 전문 기업입니다. 파렛트랙, 캔틸레버랙 등 물류창고 솔루션을 제공하며, 설계부터 설치, A/S까지 책임 시공합니다.",
  keywords: ["재도테크", "회사소개", "물류설비 전문", "창고랙 업체", "파렛트랙 제조사"],
  openGraph: {
    title: "회사소개 - 물류설비시스템 전문업체 | 재도테크",
    description: "재도테크는 물류설비시스템 전문 기업입니다",
    url: "https://jaedotech.com/about",
    type: "website",
  },
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
