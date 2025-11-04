"use client"

import { useLanguage } from "@/lib/i18n"

const MailIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
)

const PhoneIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
)

const MapPinIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
)

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="bg-gray-900 text-white py-4 md:py-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-4 md:mb-6">
          {/* Company Info */}
          <div>
            <h3 className="text-base md:text-xl font-bold mb-2 md:mb-4">{t("footer.company")}</h3>
            <p className="text-gray-300 leading-relaxed text-[10px] md:text-sm">{t("footer.about.desc")}</p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs md:text-base font-bold mb-2 md:mb-4">{t("footer.contact.title")}</h4>
            <div className="space-y-2 md:space-y-3">
              <div className="flex items-start gap-2">
                <PhoneIcon />
                <div>
                  <p className="text-gray-300 text-[10px] md:text-sm">010-4034-9795</p>
                  <p className="text-gray-300 text-[10px] md:text-sm">010-4147-9655</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <MailIcon />
                <p className="text-gray-300 text-[10px] md:text-sm">jaedotech95@gmail.com</p>
              </div>
            </div>
          </div>

          {/* Address */}
          <div>
            <h4 className="text-xs md:text-base font-bold mb-2 md:mb-4">{t("footer.contact.address")}</h4>
            <div className="flex items-start gap-2">
              <MapPinIcon />
              <p className="text-gray-300 leading-relaxed text-[10px] md:text-sm">{t("footer.address")}</p>
            </div>
          </div>

          {/* Business Info */}
          <div>
            <h4 className="text-xs md:text-base font-bold mb-2 md:mb-4">{t("footer.businessInfo")}</h4>
            <div className="space-y-1 md:space-y-2 text-gray-300 text-[9px] md:text-xs">
              <p>
                {t("footer.representative")}: {t("footer.representativeNames")}
              </p>
              <p>
                {t("footer.businessNumber")}: {t("footer.businessNumberValue")}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-3 md:pt-4 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-[9px] md:text-xs">{t("footer.copyright")}</p>
            <div className="flex gap-4 md:gap-6 text-[9px] md:text-xs">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                개인정보처리방침
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                이용약관
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
