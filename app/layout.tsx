import type React from "react"
import type { Metadata } from "next"
import { Noto_Sans_KR } from "next/font/google"
import "./globals.css"
import { LanguageProvider } from "@/lib/i18n"

const notoSansKR = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "JAEDOTECH - 파렛트랙·경량랙·중량랙 전문 시공업체",
  description: "건설 자재 및 파렛트랙 설치 시공 전문 기업. 전국 무료 출장 견적, 제조사 직거래로 합리적인 가격",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body className={`${notoSansKR.variable} font-sans antialiased`}>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  )
}
