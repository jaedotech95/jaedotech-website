import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "설치사례 - 전국 물류설비 시공 실적 | 재도테크",
  description:
    "재도테크의 다양한 물류설비 설치 사례를 확인하세요. CJ대한통운, 쿠팡, 롯데 등 대기업 및 중소기업 물류창고 시공 실적. 파렛트랙, 캔틸레버랙 설치 전문",
  keywords: ["설치사례", "시공사례", "물류설비 설치", "창고랙 설치", "파렛트랙 시공", "재도테크 실적", "물류창고"],
  openGraph: {
    title: "설치사례 - 전국 물류설비 시공 실적 | 재도테크",
    description: "재도테크의 다양한 물류설비 설치 사례를 확인하세요",
    url: "https://jaedotech.com/projects",
    type: "website",
  },
}

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
