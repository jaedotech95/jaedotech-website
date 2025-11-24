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
  metadataBase: new URL("https://jaedotech.com"),
  title: {
    default: "재도테크 - 파렛트랙·경량랙·중량랙 전문 | 물류설비시스템",
    template: "%s | 재도테크",
  },
  description:
    "파렛트랙, 경량랙, 중량랙, 캔틸레버랙 등 물류설비시스템 전문업체. 전국 무료 출장 견적, 제조사 직거래로 합리적인 가격. 설치부터 A/S까지 책임 시공",
  keywords: [
    "파렛트랙",
    "캔틸레버랙",
    "중량물랙",
    "경량랙",
    "물류설비",
    "창고랙",
    "물류창고",
    "재도테크",
    "JAEDOTECH",
    "랙 설치",
    "물류시스템",
    "창고선반",
    "보관시스템",
    "이동식랙",
    "다단랙",
    "물류센터",
    "창고시스템",
  ],
  authors: [{ name: "재도테크" }],
  creator: "재도테크",
  publisher: "재도테크",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  verification: {
    google: "your-google-verification-code",
    other: {
      "naver-site-verification": "your-naver-verification-code",
    },
  },
  alternates: {
    canonical: "https://jaedotech.com",
    languages: {
      "ko-KR": "https://jaedotech.com",
      "en-US": "https://jaedotech.com?lang=en",
      "ja-JP": "https://jaedotech.com?lang=ja",
    },
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://jaedotech.com",
    title: "재도테크 - 파렛트랙·경량랙·중량랙 전문",
    description: "파렛트랙, 경량랙, 중량랙, 캔틸레버랙 등 물류설비시스템 전문업체. 전국 무료 출장 견적",
    siteName: "재도테크",
    images: [
      {
        url: "/images/logo.png",
        width: 1200,
        height: 630,
        alt: "재도테크 물류설비시스템",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "재도테크 - 파렛트랙·경량랙·중량랙 전문",
    description: "파렛트랙, 경량랙, 중량랙, 캔틸레버랙 등 물류설비시스템 전문업체",
    images: ["/images/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  manifest: "/manifest.json",
  icons: {
    icon: [
      {
        url: "/images/favicon.jpg",
        sizes: "any",
      },
      {
        url: "/images/icon.png",
        type: "image/png",
        sizes: "192x192",
      },
    ],
    apple: [
      {
        url: "/images/icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
    shortcut: "/images/favicon.jpg",
  },
    generator: 'v0.app'
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
