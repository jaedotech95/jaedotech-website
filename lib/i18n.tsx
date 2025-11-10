"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export type Language = "ko" | "en" | "ja"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const translations: Record<Language, Record<string, string>> = {
  ko: {
    // Header & Navigation
    "nav.about": "회사소개",
    "nav.products": "제품소개",
    "nav.projects": "설치사례",
    "nav.quote": "견적문의",

    // About Page
    "about.title": "재도테크",
    "about.subtitle": "물류설비시스템 전문업체",
    "about.intro.title": "회사 소개",
    "about.intro.description1":
      "재도테크는 물류창고, 공장, 창고형 매장 등 산업현장 맞춤형 물류 시스템 설계,납품,시공을 전문으로 하는 기업입니다.전문 기술력과 시공경험을 바탕으로 안전하고 효율적인 적재환경을 제공합니다.",
    "about.intro.description2":
      "전국 어디든 빠른 시공과 체계적인 사후관리로 고객 만족을 최우선으로 생각합니다. 전문 엔지니어팀이 현장 맞춤형 솔루션을 제공하여 최적의 창고 환경을 구축해드립니다.",
    "about.values.title": "핵심 가치",
    "about.values.quality.title": "품질 우선",
    "about.values.quality.description": "최고 품질의 자재와 시공으로 안전하고 견고한 랙 시스템을 제공합니다.",
    "about.values.trust.title": "신뢰와 책임",
    "about.values.trust.description": "고객과의 약속을 지키며 체계적인 사후관리로 신뢰를 쌓아갑니다.",
    "about.values.innovation.title": "혁신과 발전",
    "about.values.innovation.description": "끊임없는 연구개발로 더 나은 창고 솔루션을 제공합니다.",
    "about.stats.title": "신뢰의 숫자",
    "about.stats.years": "전국 시공 지역",
    "about.stats.projects": "누적 시공 면적",
    "about.stats.clients": "안전 사고 제로",
    "about.stats.satisfaction": "고객 재계약률",
    "about.strengths.title": "재도테크의 강점",
    "about.strengths.subtitle": "고객의 성공을 위한 차별화된 서비스",
    "about.strengths.custom.title": "맞춤형 설계",
    "about.strengths.custom.description": "현장 특성과 고객 요구사항을 반영한 최적의 물류 시스템 설계",
    "about.strengths.safety.title": "안전 시공",
    "about.strengths.safety.description": "산업안전 기준을 준수하는 체계적이고 안전한 시공 프로세스",
    "about.strengths.response.title": "신속한 대응",
    "about.strengths.response.description": "전국 어디든 빠른 출장 상담과 견적 제공으로 시간 절약",
    "about.strengths.aftercare.title": "사후관리",
    "about.strengths.aftercare.description": "설치 후에도 지속적인 점검과 유지보수로 안심 서비스 제공",

    // Hero Section
    "hero.company": "재도테크",
    "hero.tagline": "파렛트랙·경량랙·중량랙 전문",
    "hero.tagline2": "물류설비시스템 전문업체",
    "hero.subtext": "무료 출장 견적 · 빠른 시공 · 합리적 견적",
    "hero.cta.quote": "무료 견적 문의",
    "hero.cta.email": "이메일 상담",
    "hero.footer": "전국 어디든 빠르게 시공, 재도테크가 함께합니다.",

    // Products Section
    "products.title": "제품소개",
    "products.toggle.list": "목록보기",
    "products.toggle.3d": "3D 보기",
    "products.checkOthers": "다른 제품 확인하기",
    "products.cta.title": "공간의 효율을 완성하는 기술, 재도테크",
    "products.cta.subtitle": "전국 시공 · 맞춤 설계 · 합리적 견적",
    "products.pallet": "파렛트랙",
    "products.mezzanine": "중이층랙",
    "products.light": "경량랙",
    "products.heavy": "중량랙",
    "products.sliding": "슬라이딩랙",
    "products.drivein": "드라이브인랙",
    "products.pushback": "푸시백랙",
    "products.cantilever": "캔틸레버랙",
    "products.pallet.desc": "대형 물류창고에 최적화된 고효율 보관 시스템",
    "products.mezzanine.desc": "공간 활용을 극대화하는 중이층 구조 시스템",
    "products.light.desc": "소형 물품 보관에 적합한 경량 랙 시스템",
    "products.heavy.desc": "중량물 보관을 위한 견고한 랙 시스템",
    "products.sliding.desc": "기울어진 레일 각도를 이용해 상품이\n자연스럽게 전진하는 효율적인 물류 적재 시스템",
    "products.drivein.desc": "공간 활용도를 극대화한 드라이브인 방식",
    "products.pushback.desc": "효율적인 재고 관리를 위한 푸시백 시스템",
    "products.cantilever.desc": "긴 자재 보관에 최적화된 캔틸레버 구조",

    // Product Details
    "products.details.features": "주요 특징",
    "products.details.specs": "제품 사양",
    "products.details.applications": "적용 분야",
    "products.details.benefits": "장점",

    // Pallet Rack Details
    "products.pallet.feature1": "대형 물류창고에 최적화된 고효율 보관 시스템",
    "products.pallet.feature2": "다양한 높이와 폭 조절 가능",
    "products.pallet.feature3": "포크리프트를 이용한 신속한 입출고",
    "products.pallet.feature4": "견고한 구조로 안전성 확보",
    "products.pallet.application1": "물류센터 및 배송센터",
    "products.pallet.application2": "제조업체 원자재 보관",
    "products.pallet.application3": "대형 유통업체 창고",
    "products.pallet.benefit1": "공간 활용도 극대화",
    "products.pallet.benefit2": "빠른 입출고 작업",
    "products.pallet.benefit3": "유지보수 용이",
    "products.pallet.purpose.title": "사용목적",
    "products.pallet.purpose.description":
      "파렛트랙은 단순한 '선반'이 아닌, 공간 설계, 작업 효율, 정보 관리, 안전성을 통합적으로 개선하는 물류 인프라 핵심설비입니다. 기업의 물류비 절감, 생산성 향상, 재고 정확도 제고에 직접적인 영향을 미칩니다.",
    "products.pallet.features.title": "특징",
    "products.pallet.features.feature1.title": "1. 공간 효율 극대화 (Space Optimization)",
    "products.pallet.features.feature1.description":
      "수평면적의 제약을 극복하고, 수직공간을 활용해 저장 밀도를 극대화합니다. 고중량 자재나 대형제품의 층층이 적재 가능하며, 단위면적당 저장량이 크게 향상됩니다. 창고 설계시 랙의 단면하중, 보강 구조, 통로폭 설계 등을 최적화하여 극적인 효율성을 볼 뿐 아니라 임대료 절감, 설비비용 대비 보관 효율도 상승하는 직접적인 경제효과도 누릴 수 있습니다.",
    "products.pallet.features.feature2.title": "2. 물류작업 효율 향상 (Operational Efficiency)",
    "products.pallet.features.feature2.description":
      "입출고 동선의 단축과 작업속도의 균일화가 가능합니다. 피킹 및 적재작업 동선 최소화, 인력 의존도 감소, 작업 표준화로 이어집니다.",
    "products.pallet.features.feature3.title": "3. 재고 관리 체계화 (Inventory Control)",
    "products.pallet.features.feature3.description":
      "정위치 보관체계를 제공해 창고관리시스템, 전산관리시스템 등과 연동하기 쉽습니다. 랙 단위로 제품위치, 수량, 로트번호를 관리할 수 있어 실시간 재고 가시성이 확보됩니다.",
    "products.pallet.features.feature4.title": "4. 안전성 확보 및 상품보호 (Safety & Product Protection)",
    "products.pallet.features.feature4.description":
      "산업안전 기준에 맞춘 구조물로, 적재 하중과 변형 허용치를 명확히 설계합니다. 고강도 강재와 표준화된 용접 볼트 조립방식을 사용해 구조적 안정성을 확보합니다. 진동, 충격, 습기 등 환경적 요인으로부터 제품을 보호하며 물류 손실률을 감소시킵니다.",

    // Mezzanine Rack Details
    "products.mezzanine.feature1": "수직 공간을 활용한 2층 구조",
    "products.mezzanine.feature2": "기존 창고 면적의 2배 활용",
    "products.mezzanine.feature3": "계단 및 안전난간 설치",
    "products.mezzanine.feature4": "맞춤형 설계 가능",
    "products.mezzanine.application1": "소형 물품 보관 창고",
    "products.mezzanine.application2": "사무실 및 작업 공간 확보",
    "products.mezzanine.application3": "전자상거래 물류센터",
    "products.mezzanine.benefit1": "공간 효율성 2배 증가",
    "products.mezzanine.benefit2": "추가 건축 비용 절감",
    "products.mezzanine.benefit3": "다목적 활용 가능",

    // Light Duty Rack Details
    "products.light.feature1": "소형 물품 보관에 최적화",
    "products.light.feature2": "손쉬운 조립 및 재배치",
    "products.light.feature3": "다양한 크기 선택 가능",
    "products.light.feature4": "경제적인 가격",
    "products.light.application1": "소매점 및 편의점",
    "products.light.application2": "사무실 및 창고",
    "products.light.application3": "전자제품 보관",
    "products.light.benefit1": "설치 및 이동 용이",
    "products.light.benefit2": "비용 효율적",
    "products.light.benefit3": "유연한 구성",
    "products.light.purpose.title": "사용목적",
    "products.light.purpose.description":
      "경량랙은 소형자재 및 경량 상품보관, 작업효율 향상, 공간활용 극대화, 재고관리 단순화라는 장점들이 있습니다. 저비용, 고활용성, 간편 설치가 가능하여 소/대규모 상업공간에서 널리 활용되고 있답니다.",
    "products.light.features.title": "특징",
    "products.light.features.feature1.title": "1. 경량 구조 (Load Capacity 50~150kg/단 기준)",
    "products.light.features.feature1.description": "얇은 강재와 볼트/너트 체결식 구조로 조립·이동이 간편합니다.",
    "products.light.features.feature2.title": "2. 높이·단 간격 조절 가능",
    "products.light.features.feature2.description":
      "선반 높이를 자유롭게 변경할 수 있어 다양한 크기의 상품 적재에 유연합니다.",
    "products.light.features.feature3.title": "3. 경제성 우수",
    "products.light.features.feature3.description":
      "제작비용이 낮고 유지보수가 거의 없어 저비용 고효율 설비로 분류됩니다.",
    "products.light.features.feature4.title": "4. 조립 및 확장성",
    "products.light.features.feature4.description":
      "볼트 체결식 또는 슬라이드 삽입식으로 구성되어 조립이 빠르고 확장·이동이 용이합니다.",
    "products.light.features.feature5.title": "5. 다양한 용도",
    "products.light.features.feature5.description":
      "사무실: 문서보관대, 박스 선반 / 창고: 소형 부품, 포장재 보관 / 매장: 진열 및 재고 선반",

    // Heavy Duty Rack Details
    "products.heavy.feature1": "중량물 보관을 위한 견고한 구조",
    "products.heavy.feature2": "높은 내하중 설계",
    "products.heavy.feature3": "산업용 강철 소재",
    "products.heavy.feature4": "안전 인증 획득",
    "products.heavy.application1": "제조업체 중량 부품 보관",
    "products.heavy.application2": "건설 자재 창고",
    "products.heavy.application3": "기계 부품 보관",
    "products.heavy.benefit1": "높은 안전성",
    "products.heavy.benefit2": "장기간 내구성",
    "products.heavy.benefit3": "대용량 보관",
    "products.heavy.purpose.title": "사용목적",
    "products.heavy.purpose.description":
      "중량랙은 단당 300kg 이상의 하중을 견디며, 철재부품, 산업자재 등 안전하게 적재가능합니다. 구조적 면에서 파렛트랙보다 단순하지만 강도가 높아 대형 창고나 공장 내부 보관대로 활용됩니다.",
    "products.heavy.features.title": "특징",
    "products.heavy.features.feature1.title": "1. 고하중 구조 (Load Capacity 300kg/단 이상)",
    "products.heavy.features.feature1.description":
      "두꺼운 H형 빔을 사용하며, 중량물 변형 없이 안정적 지지가 가능합니다.",
    "products.heavy.features.feature2.title": "2. 단 간격 및 폭 조절 가능",
    "products.heavy.features.feature2.description":
      "빔 높이와 선반 간격을 현장 상황에 맞게 조정할 수 있어 다양한 규격 자재 적재에 적합합니다.",
    "products.heavy.features.feature3.title": "3. 조립식 구조",
    "products.heavy.features.feature3.description": "볼트 체결 또는 걸림식 빔으로 구성되어, 이동·해체·확장 용이합니다.",
    "products.heavy.features.feature4.title": "4. 내구성 및 안전성 강화",
    "products.heavy.features.feature4.description":
      "분체도장 또는 아연도금 처리가 되어 부식 방지 및 긴 수명 보장이 가능합니다. 필요 시 안전핀, 가드, 백넷 등 부속장치를 추가해 작업자 안전을 확보합니다.",
    "products.heavy.features.feature5.title": "5. 적용 분야 다양",
    "products.heavy.features.feature5.description":
      "제조공장: 반제품, 금형, 공구 보관 / 물류창고: 대형 박스/제품 보관 / 대형마트/유통센터: 재고 보관대",

    // Sliding Rack Details
    "products.sliding.feature1": "롤러 레일 구조로 박스가 자동 슬라이딩 이동",
    "products.sliding.feature2": "기울어진 레일 각도를 통해 선입선출(FIFO) 구현",
    "products.sliding.feature3": "별도 전원 없이 작동하는 무동력 시스템",
    "products.sliding.feature4": "상품 중량과 형태에 맞춘 맞춤형 설계 가능",
    "products.sliding.application1": "물류센터 출하 대기존",
    "products.sliding.application2": "피킹 및 포장 라인",
    "products.sliding.application3": "냉장·냉동 창고의 선입선출 보관",
    "products.sliding.benefit1": "작업 동선 단축, 회전율 향상",
    "products.sliding.benefit2": "공간 효율 및 재고 관리 최적화",
    "products.sliding.benefit3": "단순한 구조로 유지보수가 용이",

    // Cantilever Rack Details
    "products.cantilever.feature1": "긴 자재 보관에 최적화",
    "products.cantilever.feature2": "전면 개방형 구조",
    "products.cantilever.feature3": "조절 가능한 암 높이",
    "products.cantilever.feature4": "크레인 작업 용이",
    "products.cantilever.application1": "목재 및 파이프 보관",
    "products.cantilever.application2": "철강 자재 창고",
    "products.cantilever.application3": "건축 자재 보관",
    "products.cantilever.benefit1": "긴 자재 보관 최적화",
    "products.cantilever.benefit2": "입출고 작업 편리",
    "products.cantilever.benefit3": "공간 효율적 활용",

    // Projects Section
    "projects.title": "설치사례",
    "projects.subtitle": "다양한 산업 분야의 완료된 설치 사례를 확인하세요",
    "projects.cardView": "카드",
    "projects.listView": "리스트",
    "projects.viewDetail": "자세히 보기",
    "projects.noProjects": "등록된 설치사례가 없습니다.",
    "projects.viewDetails": "자세히보기",
    "projects.project1.title": "대형 물류센터 파렛트랙 시공",
    "projects.project1.location": "경기도 이천시",
    "projects.project1.type": "파렛트랙 시스템",
    "projects.project2.title": "제조공장 중량랙 설치",
    "projects.project2.location": "충청남도 천안시",
    "projects.project2.type": "중량랙",
    "projects.project3.title": "유통센터 경량랙 시공",
    "projects.project3.location": "서울특별시 강서구",
    "projects.project3.type": "경량랙",
    "projects.project4.title": "냉동창고 특수랙 설치",
    "projects.project4.location": "인천광역시 남동구",
    "projects.project4.type": "특수랙",
    "projects.project5.title": "자동차 부품 창고 시공",
    "projects.project5.location": "경상남도 창원시",
    "projects.project5.type": "중량랙",
    "projects.project6.title": "의류 물류센터 시스템랙 시공",
    "projects.project6.location": "경기도 평택시",
    "projects.project6.type": "시스템랙",
    "projects.project7.title": "식품 물류센터 랙 설치",
    "projects.project7.location": "전라북도 전주시",
    "projects.project7.type": "경량랙",
    "projects.project8.title": "전자제품 창고 자동화랙 설치",
    "projects.project8.location": "경기도 화성시",
    "projects.project8.type": "자동화랙",
    "projects.stats.title": "우리의 실적",
    "projects.stats.completed": "완료된 프로젝트",
    "projects.stats.clients": "만족한 고객",
    "projects.stats.experience": "년 경험",
    "projects.stats.satisfaction": "만족도",
    "projects.cta.title": "프로젝트를 시작할 준비가 되셨나요?",

    // Clients Section
    "clients.title": "주요 고객사",

    // Quote Section
    "quote.title": "견적문의",
    "quote.name": "이름",
    "quote.phone": "연락처",
    "quote.email": "이메일",
    "quote.company": "회사명",
    "quote.message": "문의내용",
    "quote.companyPlaceholder": "회사명을 입력해주세요",
    "quote.namePlaceholder": "이름을 입력해주세요",
    "quote.phonePlaceholder": "연락처를 입력해주세요",
    "quote.emailPlaceholder": "이메일을 입력해주세요",
    "quote.messagePlaceholder": "문의하실 내용을 입력해주세요",
    "quote.fileUpload": "파일 첨부",
    "quote.maxFileSize": "(최대 10MB)",
    "quote.selectFile": "파일 선택",
    "quote.privacyAgree": "개인정보 수집 및 이용 동의",
    "quote.emailButton": "이메일로 문의하기",
    "quote.kakaoButton": "카카오톡으로 문의하기",
    "quote.privacyTitle": "개인정보 수집 및 이용 동의",
    "quote.privacyContent1": "재도테크는 견적 문의를 위해 아래와 같이 개인정보를 수집 및 이용합니다.",
    "quote.privacySection1": "1. 수집하는 개인정보 항목",
    "quote.privacyContent2": "회사는 견적 문의를 위해 아래와 같은 개인정보를 수집하고 있습니다.",
    "quote.privacyItem1": "필수항목: 회사명, 이름, 연락처, 이메일, 문의내용",
    "quote.privacyItem2": "선택항목: 첨부파일",
    "quote.privacyItem3": "수집방법: 홈페이지 견적문의 양식",
    "quote.privacyItem4": "보유기간: 문의 처리 완료 후 3년",
    "quote.privacyItem5": "이용목적: 견적 상담 및 서비스 제공",
    "quote.privacySection2": "2. 개인정보의 수집 및 이용목적",
    "quote.privacyContent3": "수집한 개인정보는 다음의 목적을 위해 활용됩니다.",
    "quote.privacyPurpose1": "견적 상담 및 문의 응대",
    "quote.privacyPurpose2": "서비스 제공 및 계약 이행",
    "quote.privacyPurpose3": "고객 관리 및 마케팅 활용",
    "quote.privacySection3": "3. 개인정보의 보유 및 이용기간",
    "quote.privacyContent4":
      "원칙적으로 개인정보 수집 및 이용목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다. 단, 관계법령의 규정에 의하여 보존할 필요가 있는 경우 일정기간 동안 개인정보를 보관합니다.",
    "quote.privacySection4": "4. 개인정보의 파기절차 및 방법",
    "quote.privacyContent5":
      "회사는 원칙적으로 개인정보 수집 및 이용목적이 달성된 후에는 해당 정보를 지체없이 파기합니다. 파기절차 및 방법은 다음과 같습니다.",
    "quote.privacySection5": "5. 개인정보의 제3자 제공",
    "quote.privacyContent6":
      "회사는 이용자의 개인정보를 원칙적으로 외부에 제공하지 않습니다. 다만, 아래의 경우에는 예외로 합니다.",
    "quote.privacyProvide1": "이용자들이 사전에 동의한 경우",
    "quote.privacyProvide2":
      "법령의 규정에 의거하거나, 수사 목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가 있는 경우",
    "quote.privacyContent7": "위 내용을 모두 확인하였으며, 개인정보 수집 및 이용에 동의합니다.",
    "quote.scrollWarning": "약관을 끝까지 읽어주세요",
    "quote.closeButton": "닫기",
    "quote.agreeButton": "동의",
    "quote.submit": "전송하기",
    "quote.sending": "전송 중...",
    "quote.productSelection": "제품 선택 (선택사항)",
    "quote.selectProduct": "제품을 선택하세요",
    "quote.quantity": "수량",
    "quote.addProduct": "추가",
    "quote.selectedProducts": "선택된 제품",
    "quote.product": "제품",
    "quote.unitPrice": "단가",
    "quote.amount": "금액",
    "quote.vat": "부가세",
    "quote.finalAmount": "최종금액",
    "quote.vatIncluded": "VAT 포함 / 배송비, 설치비 별도",
    "quote.remove": "삭제",
    "quote.noProducts": "선택된 제품이 없습니다",
    "quote.subtotal": "소계",
    "quote.total": "합계",
    "quote.width": "가로",
    "quote.depth": "세로",
    "quote.height": "높이",
    "quote.levels": "단수",
    "quote.type": "형식",
    "quote.standalone": "독립형",
    "quote.connected": "연결형",
    "quote.specifications": "규격",
    "quote.sets": "세트",
    "quote.no": "번호",
    "quote.selectWidth": "가로를 선택하세요",
    "quote.selectDepth": "세로를 선택하세요",
    "quote.selectHeight": "높이를 선택하세요",
    "quote.selectLevels": "단수를 선택하세요",
    "quote.selectType": "형식을 선택하세요",
    "quote.estimateToggle": "예상견적 확인 및 추가하기",
    "quote.formSection": "견적 문의 정보",
    "quote.formDescription":
      "견적을 작성하고 이메일 및 카카오톡으로 전송 버튼을 눌러주시면 입력해주신 내용으로 바로 견적과 상담이 가능합니다. 최대한 빨리 연락드리겠습니다.",
    "quote.widthTooltip": "랙의 가로 길이입니다. 보관할 물품의 크기에 맞춰 선택하세요.",
    "quote.depthTooltip": "랙의 세로 깊이입니다. 물품의 깊이와 통로 공간을 고려하여 선택하세요.",
    "quote.heightTooltip": "랙의 높이입니다. 천장 높이와 작업 환경을 고려하여 선택하세요.",
    "quote.levelsTooltip": "랙의 단 수입니다. 보관 물품의 양과 높이에 따라 선택하세요.",
    "quote.typeTooltip": "독립형은 단독 설치, 연결형은 기존 랙에 연결하여 설치합니다.",
    "quote.bulkDisclaimer": "본 예상견적은 기본 기준이며, 대량 발주 시 추가 할인 단가가 적용됩니다.",

    // Footer
    "footer.company": "재도테크",
    "footer.about.title": "회사소개",
    "footer.about.desc": "파렛트랙·경량랙·중량랙 전문 시공업체",
    "footer.contact.title": "연락처",
    "footer.contact.phone": "전화",
    "footer.contact.email": "이메일",
    "footer.contact.address": "주소",
    "footer.address": "경기도 남양주시 도농로 34, 309동 2001호 (다산동, 플루리움)",
    "footer.services.title": "서비스",
    "footer.services.consulting": "무료 견적 상담",
    "footer.services.installation": "전국 시공 서비스",
    "footer.services.maintenance": "유지보수 관리",
    "footer.copyright": "© 2025 재도테크. All rights reserved.",
    "footer.businessInfo": "사업자 정보",
    "footer.representative": "대표",
    "footer.representativeNames": "윤도경, 조용재",
    "footer.businessNumber": "사업자등록번호",
    "footer.businessNumberValue": "340-01-03765",
  },
  en: {
    // Header & Navigation
    "nav.about": "About",
    "nav.products": "Products",
    "nav.projects": "Projects",
    "nav.quote": "Quote",

    // About Page
    "about.title": "JAEDOTECH",
    "about.subtitle": "Logistics Equipment System Specialist",
    "about.intro.title": "About Us",
    "about.intro.description1":
      "JAEDOTECH specializes in the design, supply, and installation of customized logistics systems for industrial sites such as logistics warehouses, factories, and warehouse-type stores. We provide safe and efficient storage environments based on professional technical expertise and construction experience.",
    "about.intro.description2":
      "We prioritize customer satisfaction with fast installation nationwide and systematic after-sales service. Our professional engineering team provides customized on-site solutions to build the optimal warehouse environment.",
    "about.values.title": "Core Values",
    "about.values.quality.title": "Quality First",
    "about.values.quality.description":
      "We provide safe and robust rack systems with the highest quality materials and construction.",
    "about.values.trust.title": "Trust & Responsibility",
    "about.values.trust.description":
      "We keep our promises to customers and build trust through systematic after-sales management.",
    "about.values.innovation.title": "Innovation & Development",
    "about.values.innovation.description":
      "We provide better warehouse solutions through continuous research and development.",
    "about.stats.title": "Numbers of Trust",
    "about.stats.years": "Nationwide Regions",
    "about.stats.projects": "Total Installation Area",
    "about.stats.clients": "Zero Safety Accidents",
    "about.stats.satisfaction": "Client Retention Rate",
    "about.strengths.title": "Our Strengths",
    "about.strengths.subtitle": "Differentiated Services for Customer Success",
    "about.strengths.custom.title": "Custom Design",
    "about.strengths.custom.description":
      "Optimal logistics system design reflecting site characteristics and customer requirements",
    "about.strengths.safety.title": "Safe Construction",
    "about.strengths.safety.description":
      "Systematic and safe construction process complying with industrial safety standards",
    "about.strengths.response.title": "Rapid Response",
    "about.strengths.response.description":
      "Save time with fast on-site consultations and quotes anywhere in the country",
    "about.strengths.aftercare.title": "After-Sales Service",
    "about.strengths.aftercare.description":
      "Peace of mind service with continuous inspection and maintenance even after installation",

    // Hero Section
    "hero.company": "JAEDOTECH",
    "hero.tagline": "Professional Pallet Rack & Storage System Installation",
    "hero.tagline2": "Logistics Equipment System Specialist",
    "hero.subtext": "Nationwide Service · Fast Installation · Reasonable Quotes",
    "hero.cta.quote": "Free Quote",
    "hero.cta.email": "Email Consultation",
    "hero.footer": "Fast installation anywhere in the country, JAEDOTECH is with you.",

    // Products Section
    "products.title": "Products",
    "products.toggle.list": "List View",
    "products.toggle.3d": "3D View",
    "products.checkOthers": "Check Other Products",
    "products.cta.title": "Technology that Completes Space Efficiency, JAEDOTECH",
    "products.cta.subtitle": "Nationwide Installation · Custom Design · Reasonable Quotes",
    "products.pallet": "Pallet Rack",
    "products.mezzanine": "Mezzanine Rack",
    "products.light": "Light Duty Rack",
    "products.heavy": "Heavy Duty Rack",
    "products.sliding": "Sliding Rack",
    "products.drivein": "Drive-in Rack",
    "products.pushback": "Push Back Rack",
    "products.cantilever": "Cantilever Rack",
    "products.pallet.desc": "High-efficiency storage system optimized for large logistics warehouses",
    "products.mezzanine.desc": "Mezzanine structure system that maximizes space utilization",
    "products.light.desc": "Lightweight rack system suitable for storing small items",
    "products.heavy.desc": "Robust rack system for heavy-duty storage",
    "products.sliding.desc":
      "Efficient logistics storage system where items naturally advance using inclined rail angles",
    "products.drivein.desc": "Drive-in system that maximizes space utilization",
    "products.pushback.desc": "Push-back system for efficient inventory management",
    "products.cantilever.desc": "Cantilever structure optimized for long material storage",

    // Product Details
    "products.details.features": "Key Features",
    "products.details.specs": "Specifications",
    "products.details.applications": "Applications",
    "products.details.benefits": "Benefits",

    // Pallet Rack Details
    "products.pallet.feature1": "High-efficiency storage system optimized for large logistics warehouses",
    "products.pallet.feature2": "Adjustable height and width options",
    "products.pallet.feature3": "Quick loading and unloading with forklifts",
    "products.pallet.feature4": "Robust structure ensures safety",
    "products.pallet.application1": "Logistics and distribution centers",
    "products.pallet.application2": "Manufacturing raw material storage",
    "products.pallet.application3": "Large retail warehouses",
    "products.pallet.benefit1": "Maximize space utilization",
    "products.pallet.benefit2": "Fast loading and unloading",
    "products.pallet.benefit3": "Easy maintenance",
    "products.pallet.purpose.title": "Purpose",
    "products.pallet.purpose.description":
      "Pallet racks are not just 'shelves', but core logistics infrastructure equipment that comprehensively improves space design, work efficiency, information management, and safety. They directly impact corporate logistics cost reduction, productivity improvement, and inventory accuracy enhancement.",
    "products.pallet.features.title": "Features",
    "products.pallet.features.feature1.title": "1. Space Optimization",
    "products.pallet.features.feature1.description":
      "Overcome horizontal space constraints and maximize storage density by utilizing vertical space. Heavy materials and large products can be stacked in layers, significantly increasing storage capacity per unit area. Optimizing rack cross-sectional load, reinforcement structure, and aisle width design not only provides dramatic efficiency but also direct economic benefits such as rent reduction and increased storage efficiency relative to equipment costs.",
    "products.pallet.features.feature2.title": "2. Operational Efficiency",
    "products.pallet.features.feature2.description":
      "Enables shortening of loading/unloading routes and standardization of work speed. Leads to minimized picking and loading work routes, reduced labor dependency, and work standardization.",
    "products.pallet.features.feature3.title": "3. Inventory Control",
    "products.pallet.features.feature3.description":
      "Provides a fixed-position storage system that is easy to integrate with warehouse management systems and computerized management systems. Product location, quantity, and lot numbers can be managed by rack unit, ensuring real-time inventory visibility.",
    "products.pallet.features.feature4.title": "4. Safety & Product Protection",
    "products.pallet.features.feature4.description":
      "Structures designed to meet industrial safety standards with clearly defined load capacity and deformation tolerances. Ensures structural stability using high-strength steel and standardized welding bolt assembly methods. Protects products from environmental factors such as vibration, impact, and moisture, reducing logistics loss rates.",

    // Mezzanine Rack Details
    "products.mezzanine.feature1": "Two-story structure utilizing vertical space",
    "products.mezzanine.feature2": "Double the existing warehouse area",
    "products.mezzanine.feature3": "Stairs and safety railings installed",
    "products.mezzanine.feature4": "Customizable design",
    "products.mezzanine.application1": "Small item storage warehouses",
    "products.mezzanine.application2": "Office and workspace expansion",
    "products.mezzanine.application3": "E-commerce logistics centers",
    "products.mezzanine.benefit1": "Double space efficiency",
    "products.mezzanine.benefit2": "Reduce additional construction costs",
    "products.mezzanine.benefit3": "Multi-purpose utilization",

    // Light Duty Rack Details
    "products.light.feature1": "Optimized for small item storage",
    "products.light.feature2": "Easy assembly and relocation",
    "products.light.feature3": "Various size options",
    "products.light.feature4": "Economical pricing",
    "products.light.application1": "Retail stores and convenience stores",
    "products.light.application2": "Offices and warehouses",
    "products.light.application3": "Electronics storage",
    "products.light.benefit1": "Easy installation and mobility",
    "products.light.benefit2": "Cost-effective",
    "products.light.benefit3": "Flexible configuration",
    "products.light.purpose.title": "Purpose",
    "products.light.purpose.description":
      "Light-duty racks are optimized for small item storage, enhancing work efficiency, maximizing space utilization, and simplifying inventory management. They are cost-effective, highly versatile, and easy to install, making them popular in both small and large commercial spaces.",
    "products.light.features.title": "Features",
    "products.light.features.feature1.title": "1. Lightweight Structure (Load Capacity 50~150kg per unit)",
    "products.light.features.feature1.description":
      "Constructed with thin steel and bolt/nut assembly method, making assembly and relocation easy.",
    "products.light.features.feature2.title": "2. Adjustable Height and Spacing",
    "products.light.features.feature2.description":
      "Allows for free adjustment of shelf height, making it suitable for storing items of various sizes.",
    "products.light.features.feature3.title": "3. Economical",
    "products.light.features.feature3.description":
      "Low manufacturing costs and minimal maintenance make them cost-effective and high-efficiency equipment.",
    "products.light.features.feature4.title": "4. Assembly and Expandability",
    "products.light.features.feature4.description":
      "Designed with bolt assembly or slide insertion method, making installation quick and easy to expand or relocate.",
    "products.light.features.feature5.title": "5. Versatile Applications",
    "products.light.features.feature5.description":
      "Offices: Document storage units, box shelves / Warehouses: Small parts, packaging material storage / Retail stores: Display and inventory shelves",

    // Heavy Duty Rack Details
    "products.heavy.feature1": "Robust structure for heavy-duty storage",
    "products.heavy.feature2": "High load capacity design",
    "products.heavy.feature3": "Industrial steel material",
    "products.heavy.feature4": "Safety certified",
    "products.heavy.application1": "Manufacturing heavy parts storage",
    "products.heavy.application2": "Construction material warehouses",
    "products.heavy.application3": "Machinery parts storage",
    "products.heavy.benefit1": "High safety",
    "products.heavy.benefit2": "Long-term durability",
    "products.heavy.benefit3": "Large capacity storage",
    "products.heavy.purpose.title": "Purpose",
    "products.heavy.purpose.description":
      "Heavy-duty racks are designed to withstand loads of over 300kg per unit, safely storing steel parts and industrial materials. While simpler in structure compared to pallet racks, they offer high strength, making them ideal for large warehouses and manufacturing plants.",
    "products.heavy.features.title": "Features",
    "products.heavy.features.feature1.title": "1. High Load Capacity Structure (Load Capacity over 300kg per unit)",
    "products.heavy.features.feature1.description":
      "Built with thick H-beams, ensuring stable support without deformation of heavy loads.",
    "products.heavy.features.feature2.title": "2. Adjustable Beam Height and Spacing",
    "products.heavy.features.feature2.description":
      "Allows for customization of beam height and shelf spacing based on site conditions, suitable for storing materials of various specifications.",
    "products.heavy.features.feature3.title": "3. Assembly Design",
    "products.heavy.features.feature3.description":
      "Constructed with bolt assembly or interlocking beam methods, making them easy to move, dismantle, and expand.",
    "products.heavy.features.feature4.title": "4. Enhanced Durability and Safety",
    "products.heavy.features.feature4.description":
      "Features rust-resistant galvanized or copper-coated surfaces, ensuring longevity. Safety pins, guards, and back nets can be added to enhance worker safety if necessary.",
    "products.heavy.features.feature5.title": "5. Versatile Applications",
    "products.heavy.features.feature5.description":
      "Manufacturing plants: Storage of semi-finished goods, molds, tools / Warehouses: Storage of large boxes and products / Large retail stores and distribution centers: Inventory storage units",

    // Sliding Rack Details
    "products.sliding.feature1": "Box automatically slides with roller rail structure",
    "products.sliding.feature2": "First-in, First-out (FIFO) implemented via inclined rail angle",
    "products.sliding.feature3": "Non-powered system operating without separate power",
    "products.sliding.feature4": "Customizable design based on product weight and shape",
    "products.sliding.application1": "Logistics center shipping waiting area",
    "products.sliding.application2": "Picking and packing lines",
    "products.sliding.application3": "FIFO storage in refrigerated/frozen warehouses",
    "products.sliding.benefit1": "Reduced work path, improved turnover rate",
    "products.sliding.benefit2": "Optimized space efficiency and inventory management",
    "products.sliding.benefit3": "Simple structure for easy maintenance",

    // Cantilever Rack Details
    "products.cantilever.feature1": "Optimized for long material storage",
    "products.cantilever.feature2": "Front-open structure",
    "products.cantilever.feature3": "Adjustable arm height",
    "products.cantilever.feature4": "Easy crane operation",
    "products.cantilever.application1": "Wood and pipe storage",
    "products.cantilever.application2": "Steel material warehouses",
    "products.cantilever.application3": "Construction material storage",
    "products.cantilever.benefit1": "Optimized for long materials",
    "products.cantilever.benefit2": "Convenient loading/unloading",
    "products.cantilever.benefit3": "Efficient space utilization",

    // Projects Section
    "projects.title": "Installation Cases",
    "projects.subtitle": "Explore our completed installations across various industries",
    "projects.cardView": "Card",
    "projects.listView": "List",
    "projects.viewDetail": "View Details",
    "projects.noProjects": "No installation cases registered.",
    "projects.viewDetails": "View Details",
    "projects.project1.title": "Large Distribution Center Pallet Rack Installation",
    "projects.project1.location": "Icheon, Gyeonggi-do",
    "projects.project1.type": "Pallet Rack System",
    "projects.project2.title": "Manufacturing Plant Heavy Duty Rack Installation",
    "projects.project2.location": "Cheonan, Chungcheongnam-do",
    "projects.project2.type": "Heavy Duty Rack",
    "projects.project3.title": "Distribution Center Light Duty Rack Installation",
    "projects.project3.location": "Gangseo-gu, Seoul",
    "projects.project3.type": "Light Duty Rack",
    "projects.project4.title": "Cold Storage Special Rack Installation",
    "projects.project4.location": "Namdong-gu, Incheon",
    "projects.project4.type": "Special Rack",
    "projects.project5.title": "Automotive Parts Warehouse Installation",
    "projects.project5.location": "Changwon, Gyeongsangnam-do",
    "projects.project5.type": "Heavy Duty Rack",
    "projects.project6.title": "Apparel Distribution Center System Rack Installation",
    "projects.project6.location": "Pyeongtaek, Gyeonggi-do",
    "projects.project6.type": "System Rack",
    "projects.project7.title": "Food Logistics Center Rack Installation",
    "projects.project7.location": "Jeonju, Jeollabuk-do",
    "projects.project7.type": "Light Duty Rack",
    "projects.project8.title": "Electronics Warehouse Automation Rack Installation",
    "projects.project8.location": "Hwaseong, Gyeonggi-do",
    "projects.project8.type": "Automation Rack",
    "projects.stats.title": "Our Track Record",
    "projects.stats.completed": "Projects Completed",
    "projects.stats.clients": "Happy Clients",
    "projects.stats.experience": "Years Experience",
    "projects.stats.satisfaction": "Satisfaction Rate",
    "projects.cta.title": "Ready to Start Your Project?",

    // Clients Section
    "clients.title": "Major Clients",

    // Quote Section
    "quote.title": "Request Quote",
    "quote.name": "Name",
    "quote.phone": "Phone",
    "quote.email": "Email",
    "quote.company": "Company",
    "quote.message": "Message",
    "quote.companyPlaceholder": "Enter company name",
    "quote.namePlaceholder": "Enter your name",
    "quote.phonePlaceholder": "Enter phone number",
    "quote.emailPlaceholder": "Enter email address",
    "quote.messagePlaceholder": "Enter your inquiry",
    "quote.fileUpload": "File Attachment",
    "quote.maxFileSize": "(Max 10MB)",
    "quote.selectFile": "Select File",
    "quote.privacyAgree": "Privacy Policy Agreement",
    "quote.emailButton": "Send via Email",
    "quote.kakaoButton": "Send via KakaoTalk",
    "quote.privacyTitle": "Privacy Policy Agreement",
    "quote.privacyContent1": "JAEDOTECH collects and uses personal information as follows for quote inquiries.",
    "quote.privacySection1": "1. Personal Information Collected",
    "quote.privacyContent2": "The company collects the following personal information for quote inquiries.",
    "quote.privacyItem1": "Required: Company name, Name, Phone, Email, Inquiry details",
    "quote.privacyItem2": "Optional: Attachments",
    "quote.privacyItem3": "Collection method: Website quote inquiry form",
    "quote.privacyItem4": "Retention period: 3 years after inquiry processing",
    "quote.privacyItem5": "Purpose: Quote consultation and service provision",
    "quote.privacySection2": "2. Purpose of Collection and Use",
    "quote.privacyContent3": "Collected personal information is used for the following purposes.",
    "quote.privacyPurpose1": "Quote consultation and inquiry response",
    "quote.privacyPurpose2": "Service provision and contract fulfillment",
    "quote.privacyPurpose3": "Customer management and marketing",
    "quote.privacySection3": "3. Retention and Use Period",
    "quote.privacyContent4":
      "In principle, personal information is destroyed without delay after the purpose of collection and use is achieved. However, information may be retained for a certain period if required by law.",
    "quote.privacySection4": "4. Destruction Procedure and Method",
    "quote.privacyContent5":
      "The company destroys personal information without delay after the purpose is achieved. The destruction procedure and method are as follows.",
    "quote.privacySection5": "5. Provision to Third Parties",
    "quote.privacyContent6":
      "The company does not provide personal information to external parties in principle. However, exceptions are made in the following cases.",
    "quote.privacyProvide1": "When users have given prior consent",
    "quote.privacyProvide2": "When required by law or by investigative agencies following legal procedures",
    "quote.privacyContent7": "I have read all the above and agree to the collection and use of personal information.",
    "quote.scrollWarning": "Please read to the end",
    "quote.closeButton": "Close",
    "quote.agreeButton": "Agree",
    "quote.submit": "Submit",
    "quote.sending": "Sending...",
    "quote.productSelection": "Product Selection (Optional)",
    "quote.selectProduct": "Select a product",
    "quote.quantity": "Quantity",
    "quote.addProduct": "Add",
    "quote.selectedProducts": "Selected Products",
    "quote.product": "Product",
    "quote.unitPrice": "Unit Price",
    "quote.amount": "Amount",
    "quote.vat": "VAT",
    "quote.finalAmount": "Final Amount",
    "quote.vatIncluded": "VAT Included / Shipping & Installation Separate",
    "quote.remove": "Remove",
    "quote.noProducts": "No products selected",
    "quote.subtotal": "Subtotal",
    "quote.total": "Total",
    "quote.width": "Width",
    "quote.depth": "Depth",
    "quote.height": "Height",
    "quote.levels": "Levels",
    "quote.type": "Type",
    "quote.standalone": "Standalone",
    "quote.connected": "Connected",
    "quote.specifications": "Specifications",
    "quote.sets": "Sets",
    "quote.no": "No.",
    "quote.selectWidth": "Select width",
    "quote.selectDepth": "Select depth",
    "quote.selectHeight": "Select height",
    "quote.selectLevels": "Select levels",
    "quote.selectType": "Select type",
    "quote.estimateToggle": "Toggle Estimated Quote and Add",
    "quote.formSection": "Quote Inquiry Information",
    "quote.formDescription":
      "After filling out the quote and pressing the email or KakaoTalk send button, we can provide quotes and consultation immediately with the information you provided. We will contact you as soon as possible.",
    "quote.widthTooltip": "Width of the rack. Select based on the size of the items to be stored.",
    "quote.depthTooltip": "Depth of the rack. Consider the depth of items and aisle space.",
    "quote.heightTooltip": "Height of the rack. Consider the ceiling height and working environment.",
    "quote.levelsTooltip": "Number of levels in the rack. Select based on the quantity and height of items.",
    "quote.typeTooltip": "Standalone for individual installation, Connected for installation with existing racks.",
    "quote.bulkDisclaimer":
      "This estimated quote is based on standard pricing, and additional discounts apply for bulk orders.",

    // Footer
    "footer.company": "JAEDOTECH",
    "footer.about.title": "About Us",
    "footer.about.desc": "Logistics Equipment System Specialist",
    "footer.contact.title": "Contact",
    "footer.contact.phone": "Phone",
    "footer.contact.email": "Email",
    "footer.contact.address": "Address",
    "footer.address": "309-2001, 34 Donong-ro, Namyangju-si, Gyeonggi-do, South Korea (Dasan-dong, Plurium)",
    "footer.services.title": "Services",
    "footer.services.consulting": "Free Quote Consultation",
    "footer.services.installation": "Nationwide Installation Service",
    "footer.services.maintenance": "Maintenance Management",
    "footer.copyright": "© 2025 JAEDOTECH. All rights reserved.",
    "footer.businessInfo": "Business Information",
    "footer.representative": "Representative",
    "footer.representativeNames": "Yoon Do-kyung, Cho Yong-jae",
    "footer.businessNumber": "Business Registration No.",
    "footer.businessNumberValue": "340-01-03765",
  },
  ja: {
    // Header & Navigation
    "nav.about": "会社紹介",
    "nav.products": "製品紹介",
    "nav.projects": "施工事例",
    "nav.quote": "見積もり依頼",

    // About Page
    "about.title": "ジェドテック",
    "about.subtitle": "物流設備システム専門業者",
    "about.intro.title": "会社紹介",
    "about.intro.description1":
      "ジェドテックは、物流倉庫、工場、倉庫型店舗など産業現場に合わせた物流システムの設計、納品、施工を専門とする企業です。専門技術力と施工経験を基に、安全で効率的な保管環境を提供します。",
    "about.intro.description2":
      "全国どこでも迅速な施工と体系的なアフターサービスでお客様満足を最優先に考えます。専門エンジニアチームが現場カスタマイズソリューションを提供し、最適な倉庫環境を構築いたします。",
    "about.values.title": "核心価値",
    "about.values.quality.title": "品質優先",
    "about.values.quality.description": "最高品質の資材と施工で安全で堅牢なラックシステムを提供します。",
    "about.values.trust.title": "信頼と責任",
    "about.values.trust.description": "お客様との約束を守り、体系的なアフターサービスで信頼を築きます。",
    "about.values.innovation.title": "革新と発展",
    "about.values.innovation.description": "絶え間ない研究開発でより良い倉庫ソリューションを提供します。",
    "about.stats.title": "信頼の数字",
    "about.stats.years": "全国施工地域",
    "about.stats.projects": "累積施工面積",
    "about.stats.clients": "安全事故ゼロ",
    "about.stats.satisfaction": "顧客再契約率",
    "about.strengths.title": "ジェドテックの強み",
    "about.strengths.subtitle": "お客様の成功のための差別化されたサービス",
    "about.strengths.custom.title": "カスタム設計",
    "about.strengths.custom.description": "現場特性とお客様の要求事項を反映した最適な物流システム設計",
    "about.strengths.safety.title": "安全施工",
    "about.strengths.safety.description": "産業安全基準を順守する体系的で安全な施工プロセス",
    "about.strengths.response.title": "迅速な対応",
    "about.strengths.response.description": "全国どこでも迅速な出張相談と見積もり提供で時間を節約",
    "about.strengths.aftercare.title": "アフターケア",
    "about.strengths.aftercare.description": "設置後も継続的な点検とメンテナンスで安心サービスを提供",

    // Hero Section
    "hero.company": "ジェドテック",
    "hero.tagline": "パレットラック・軽量ラック・重量ラック専門",
    "hero.tagline2": "物流設備システム専門業者",
    "hero.subtext": "全国サービス · 迅速な施工 · 合理的な見積もり",
    "hero.cta.quote": "無料見積もり依頼",
    "hero.cta.email": "メール相談",
    "hero.footer": "全国どこでも迅速な施工、ジェドテックがご一緒します。",

    // Products Section
    "products.title": "製品紹介",
    "products.toggle.list": "リスト表示",
    "products.toggle.3d": "3D表示",
    "products.checkOthers": "他の製品を確認",
    "products.cta.title": "空間効率を完成する技術、ジェドテック",
    "products.cta.subtitle": "全国施工 · カスタム設計 · 合理的な見積もり",
    "products.pallet": "パレットラック",
    "products.mezzanine": "中二階ラック",
    "products.light": "軽量ラック",
    "products.heavy": "重量ラック",
    "products.sliding": "スライディングラック",
    "products.drivein": "ドライブインラック",
    "products.pushback": "プッシュバックラック",
    "products.cantilever": "カンチレバーラック",
    "products.pallet.desc": "大型物流倉庫に最適化された高効率保管システム",
    "products.mezzanine.desc": "空間活用を最大化する中二階構造システム",
    "products.light.desc": "小型物品保管に適した軽量ラックシステム",
    "products.heavy.desc": "重量物保管のための堅牢なラックシステム",
    "products.sliding.desc": "傾斜したレール角度を利用して商品が\n自然に進む、効率的な物流保管システム",
    "products.drivein.desc": "空間活用度を最大化したドライブイン方式",
    "products.pushback.desc": "効率的な在庫管理のためのプッシュバックシステム",
    "products.cantilever.desc": "長い資材保管に最適化されたカンチレバー構造",

    // Product Details
    "products.details.features": "主な特徴",
    "products.details.specs": "製品仕様",
    "products.details.applications": "適用分野",
    "products.details.benefits": "メリット",

    // Pallet Rack Details
    "products.pallet.feature1": "대형 물류창고에 최적화된 고효율 보관 시스템",
    "products.pallet.feature2": "다양한 높이와 폭 조절 가능",
    "products.pallet.feature3": "포크리프트를 이용한 신속한 입출고",
    "products.pallet.feature4": "견고한 구조로 안전성 확보",
    "products.pallet.application1": "물류센터 및 배송센터",
    "products.pallet.application2": "제조업체 원자재 보관",
    "products.pallet.application3": "대형 유통업체 창고",
    "products.pallet.benefit1": "공간 활용도 극대화",
    "products.pallet.benefit2": "빠른 입출고 작업",
    "products.pallet.benefit3": "유지보수 용이",
    "products.pallet.purpose.title": "사용목적",
    "products.pallet.purpose.description":
      "파렛트랙은 단순한 '선반'이 아닌, 공간 설계, 작업 효율, 정보 관리, 안전성을 통합적으로 개선하는 물류 인프라 핵심설비입니다. 기업의 물류비 절감, 생산성 향상, 재고 정확도 제고에 직접적인 영향을 미칩니다.",
    "products.pallet.features.title": "특징",
    "products.pallet.features.feature1.title": "1. 공간 효율 극대화 (Space Optimization)",
    "products.pallet.features.feature1.description":
      "수평면적의 제약을 극복하고, 수직공간을 활용해 저장 밀도를 극대화합니다. 고중량 자재나 대형제품의 층층이 적재 가능하며, 단위면적당 저장량이 크게 향상됩니다. 창고 설계시 랙의 단면하중, 보강 구조, 통로폭 설계 등을 최적화하여 극적인 효율성을 볼 뿐 아니라 임대료 절감, 설비비용 대비 보관 효율도 상승하는 직접적인 경제효과도 누릴 수 있습니다.",
    "products.pallet.features.feature2.title": "2. 물류작업 효율 향상 (Operational Efficiency)",
    "products.pallet.features.feature2.description":
      "입출고 동선의 단축과 작업속도의 균일화가 가능합니다. 피킹 및 적재작업 동선 최소화, 인력 의존도 감소, 작업 표준화로 이어집니다.",
    "products.pallet.features.feature3.title": "3. 재고 관리 체계화 (Inventory Control)",
    "products.pallet.features.feature3.description":
      "정위치 보관체계를 제공해 창고관리시스템, 전산관리시스템 등과 연동하기 쉽습니다. 랙 단위로 제품위치, 수량, 로트번호를 관리할 수 있어 실시간 재고 가시성이 확보됩니다.",
    "products.pallet.features.feature4.title": "4. 안전성 확보 및 상품보호 (Safety & Product Protection)",
    "products.pallet.features.feature4.description":
      "산업안전 기준에 맞춘 구조물로, 적재 하중과 변형 허용치를 명확히 설계합니다. 고강도 강재와 표준화된 용접 볼트 조립방식을 사용해 구조적 안정성을 확보합니다. 진동, 충격, 습기 등 환경적 요인으로부터 제품을 보호하며 물류 손실률을 감소시킵니다.",

    // Mezzanine Rack Details
    "products.mezzanine.feature1": "수직 공간을 활용한 2층 구조",
    "products.mezzanine.feature2": "기존 창고 면적의 2배 활용",
    "products.mezzanine.feature3": "계단 및 안전난간 설치",
    "products.mezzanine.feature4": "맞춤형 설계 가능",
    "products.mezzanine.application1": "소형 물품 보관 창고",
    "products.mezzanine.application2": "사무실 및 작업 공간 확보",
    "products.mezzanine.application3": "전자상거래 물류센터",
    "products.mezzanine.benefit1": "공간 효율성 2배 증가",
    "products.mezzanine.benefit2": "추가 건축 비용 절감",
    "products.mezzanine.benefit3": "다목적 활용 가능",

    // Light Duty Rack Details
    "products.light.feature1": "소형 물품 보관에 최적화",
    "products.light.feature2": "손쉬운 조립 및 재배치",
    "products.light.feature3": "다양한 크기 선택 가능",
    "products.light.feature4": "경제적인 가격",
    "products.light.application1": "소매점 및 편의점",
    "products.light.application2": "사무실 및 창고",
    "products.light.application3": "전자제품 보관",
    "products.light.benefit1": "설치 및 이동 용이",
    "products.light.benefit2": "비용 효율적",
    "products.light.benefit3": "유연한 구성",
    "products.light.purpose.title": "사용목적",
    "products.light.purpose.description":
      "경량랙은 소형자재 및 경량 상품보관, 작업효율 향상, 공간활용 극대화, 재고관리 단순화라는 장점들이 있습니다. 저비용, 고활용성, 간편 설치가 가능하여 소/대규모 상업공간에서 널리 활용되고 있답니다.",
    "products.light.features.title": "특징",
    "products.light.features.feature1.title": "1. 경량 구조 (Load Capacity 50~150kg/단 기준)",
    "products.light.features.feature1.description": "얇은 강재와 볼트/너트 체결식 구조로 조립·이동이 간편합니다.",
    "products.light.features.feature2.title": "2. 높이·단 간격 조절 가능",
    "products.light.features.feature2.description":
      "선반 높이를 자유롭게 변경할 수 있어 다양한 크기의 상품 적재에 유연합니다.",
    "products.light.features.feature3.title": "3. 경제성 우수",
    "products.light.features.feature3.description":
      "제작비용이 낮고 유지보수가 거의 없어 저비용 고효율 설비로 분류됩니다.",
    "products.light.features.feature4.title": "4. 조립 및 확장성",
    "products.light.features.feature4.description":
      "볼트 체결식 또는 슬라이드 삽입식으로 구성되어 조립이 빠르고 확장·이동이 용이합니다.",
    "products.light.features.feature5.title": "5. 다양한 용도",
    "products.light.features.feature5.description":
      "사무실: 문서보관대, 박스 선반 / 창고: 소형 부품, 포장재 보관 / 매장: 진열 및 재고 선반",

    // Heavy Duty Rack Details
    "products.heavy.feature1": "중량물 보관을 위한 견고한 구조",
    "products.heavy.feature2": "높은 내하중 설계",
    "products.heavy.feature3": "산업용 강철 소재",
    "products.heavy.feature4": "안전 인증 획득",
    "products.heavy.application1": "제조업체 중량 부품 보관",
    "products.heavy.application2": "건설 자재 창고",
    "products.heavy.application3": "기계 부품 보관",
    "products.heavy.benefit1": "높은 안전성",
    "products.heavy.benefit2": "장기간 내구성",
    "products.heavy.benefit3": "대용량 보관",
    "products.heavy.purpose.title": "사용목적",
    "products.heavy.purpose.description":
      "중량랙은 단당 300kg 이상의 하중을 견디며, 철재부품, 산업자재 등 안전하게 적재가능합니다. 구조적 면에서 파렛트랙보다 단순하지만 강도가 높아 대형 창고나 공장 내부 보관대로 활용됩니다.",
    "products.heavy.features.title": "특징",
    "products.heavy.features.feature1.title": "1. 고하중 구조 (Load Capacity 300kg/단 이상)",
    "products.heavy.features.feature1.description":
      "두꺼운 H형 빔을 사용하며, 중량물 변형 없이 안정적 지지가 가능합니다.",
    "products.heavy.features.feature2.title": "2. 단 간격 및 폭 조절 가능",
    "products.heavy.features.feature2.description":
      "빔 높이와 선반 간격을 현장 상황에 맞게 조정할 수 있어 다양한 규격 자재 적재에 적합합니다.",
    "products.heavy.features.feature3.title": "3. 조립식 구조",
    "products.heavy.features.feature3.description": "볼트 체결 또는 걸림식 빔으로 구성되어, 이동·해체·확장 용이합니다.",
    "products.heavy.features.feature4.title": "4. 내구성 및 안전성 강화",
    "products.heavy.features.feature4.description":
      "분체도장 또는 아연도금 처리가 되어 부식 방지 및 긴 수명 보장이 가능합니다. 필요 시 안전핀, 가드, 백넷 등 부속장치를 추가해 작업자 안전을 확보합니다.",
    "products.heavy.features.feature5.title": "5. 적용 분야 다양",
    "products.heavy.features.feature5.description":
      "제조공장: 반제품, 금형, 공구 보관 / 물류창고: 대형 박스/제품 보관 / 대형마트/유통센터: 재고 보관대",

    // Sliding Rack Details
    "products.sliding.feature1": "롤러 레일 구조로 박스가 자동 슬라이딩 이동",
    "products.sliding.feature2": "기울어진 레일 각도를 통해 선입선출(FIFO) 구현",
    "products.sliding.feature3": "별도 전원 없이 작동하는 무동력 시스템",
    "products.sliding.feature4": "상품 중량과 형태에 맞춘 맞춤형 설계 가능",
    "products.sliding.application1": "물류센터 출하 대기존",
    "products.sliding.application2": "피킹 및 포장 라인",
    "products.sliding.application3": "냉장·냉동 창고의 선입선출 보관",
    "products.sliding.benefit1": "작업 동선 단축, 회전율 향상",
    "products.sliding.benefit2": "공간 효율 및 재고 관리 최적화",
    "products.sliding.benefit3": "단순한 구조로 유지보수가 용이",

    // Cantilever Rack Details
    "products.cantilever.feature1": "긴 자재 보관에 최적화",
    "products.cantilever.feature2": "전면 개방형 구조",
    "products.cantilever.feature3": "조절 가능한 암 높이",
    "products.cantilever.feature4": "크레인 작업 용이",
    "products.cantilever.application1": "목재 및 파이프 보관",
    "products.cantilever.application2": "철강 자재 창고",
    "products.cantilever.application3": "건축 자재 보관",
    "products.cantilever.benefit1": "긴 자재 보관 최적화",
    "products.cantilever.benefit2": "입출고 작업 편리",
    "products.cantilever.benefit3": "공간 효율적 활용",

    // Projects Section
    "projects.title": "施工事例",
    "projects.subtitle": "様々な産業分野の完了した設置事例をご確認ください",
    "projects.cardView": "カード",
    "projects.listView": "リスト",
    "projects.viewDetail": "詳細を見る",
    "projects.noProjects": "登録された施工事例がありません。",
    "projects.viewDetails": "詳細を見る",
    "projects.project1.title": "大型物流センター パレットラック施工",
    "projects.project1.location": "京畿道 利川市",
    "projects.project1.type": "パレットラックシステム",
    "projects.project2.title": "製造工場 重量ラック設置",
    "projects.project2.location": "忠清南道 天安市",
    "projects.project2.type": "重量ラック",
    "projects.project3.title": "流通센터 軽量ラック施工",
    "projects.project3.location": "ソウル特別市 江西区",
    "projects.project3.type": "軽量ラック",
    "projects.project4.title": "冷凍倉庫 特殊ラック設置",
    "projects.project4.location": "仁川広域市 南洞区",
    "projects.project4.type": "特殊ラック",
    "projects.project5.title": "自動車部品倉庫 施工",
    "projects.project5.location": "慶尚南道 昌原市",
    "projects.project5.type": "重量ラック",
    "projects.project6.title": "衣類物流センター システムラック施工",
    "projects.project6.location": "京畿道 平沢市",
    "projects.project6.type": "システムラック",
    "projects.project7.title": "食品物流センター ラック設置",
    "projects.project7.location": "全羅北道 全州市",
    "projects.project7.type": "軽量ラック",
    "projects.project8.title": "電子製品倉庫 自動化ラック設置",
    "projects.project8.location": "京畿道 華城市",
    "projects.project8.type": "自動化ラック",
    "projects.stats.title": "私たちの実績",
    "projects.stats.completed": "完了したプロジェクト",
    "projects.stats.clients": "満足した顧客",
    "projects.stats.experience": "年の経験",
    "projects.stats.satisfaction": "満足度",
    "projects.cta.title": "プロジェクトを始める準備ができましたか？",

    // Clients Section
    "clients.title": "主要顧客",

    // Quote Section
    "quote.title": "見積もり依頼",
    "quote.name": "お名前",
    "quote.phone": "連絡先",
    "quote.email": "メール",
    "quote.company": "会社名",
    "quote.message": "お問い合わせ内容",
    "quote.companyPlaceholder": "会社名を入力してください",
    "quote.namePlaceholder": "お名前を入力してください",
    "quote.phonePlaceholder": "連絡先を入力してください",
    "quote.emailPlaceholder": "メールアドレスを入力してください",
    "quote.messagePlaceholder": "お問い合わせ内容を入力してください",
    "quote.fileUpload": "ファイル添付",
    "quote.maxFileSize": "(最大10MB)",
    "quote.selectFile": "ファイル選択",
    "quote.privacyAgree": "個人情報収集及び利用同意",
    "quote.emailButton": "メールでお問い合わせ",
    "quote.kakaoButton": "カカオトークでお問い合わせ",
    "quote.privacyTitle": "個人情報収集及び利用同意",
    "quote.privacyContent1": "ジェドテックは見積もり依頼のため、以下のように個人情報を収集及び利用します。",
    "quote.privacySection1": "1. 収集する個人情報項目",
    "quote.privacyContent2": "当社は見積もり依頼のため、以下の個人情報を収集しています。",
    "quote.privacyItem1": "必須項目：会社名、お名前、連絡先、メール、お問い合わせ内容",
    "quote.privacyItem2": "選択項目：添付ファイル",
    "quote.privacyItem3": "収集方法：ホームページ見積もり依頼フォーム",
    "quote.privacyItem4": "保有期間：お問い合わせ処理完了後3年",
    "quote.privacyItem5": "利用目的：見積もり相談及びサービス提供",
    "quote.privacySection2": "2. 個人情報の収集及び利用目的",
    "quote.privacyContent3": "収集した個人情報は以下の目的のために活用されます。",
    "quote.privacyPurpose1": "見積もり相談及びお問い合わせ対応",
    "quote.privacyPurpose2": "サービス提供及び契約履行",
    "quote.privacyPurpose3": "顧客管理及びマーケティング活用",
    "quote.privacySection3": "3. 個人情報の保有及び利用期間",
    "quote.privacyContent4":
      "原則として個人情報収集及び利用目的が達成された後は、該当情報を遅滞なく破棄します。ただし、関係法令の規定により保存する必要がある場合は一定期間個人情報を保管します。",
    "quote.privacySection4": "4. 個人情報の破棄手続き及び方法",
    "quote.privacyContent5":
      "当社は原則として個人情報収集及び利用目的が達成された後は、該当情報を遅滞なく破棄します。破棄手続き及び方法は以下の通りです。",
    "quote.privacySection5": "5. 個人情報の第三者提供",
    "quote.privacyContent6": "当社は利用者の個人情報を原則として外部に提供しません。ただし、以下の場合は例外とします。",
    "quote.privacyProvide1": "利用者が事前に同意した場合",
    "quote.privacyProvide2":
      "法令の規定により、または捜査目的で法令に定められた手続きと方法に 따라捜査機関の要求がある場合",
    "quote.privacyContent7": "上記内容をすべて確認し、個人情報収集及び利用に同意します。",
    "quote.scrollWarning": "約款を最後までお読みください",
    "quote.closeButton": "閉じる",
    "quote.agreeButton": "同意",
    "quote.submit": "送信",
    "quote.sending": "送信中...",
    "quote.productSelection": "製品選択（オプション）",
    "quote.selectProduct": "製品を選択してください",
    "quote.quantity": "数量",
    "quote.addProduct": "追加",
    "quote.selectedProducts": "選択された製品",
    "quote.product": "製品",
    "quote.unitPrice": "単価",
    "quote.amount": "金額",
    "quote.vat": "付加価値税",
    "quote.finalAmount": "最終金額",
    "quote.vatIncluded": "VAT込み / 送料・設置費別途",
    "quote.remove": "削除",
    "quote.noProducts": "選択された製品がありません",
    "quote.subtotal": "小計",
    "quote.total": "合計",
    "quote.width": "幅",
    "quote.depth": "奥行",
    "quote.height": "高さ",
    "quote.levels": "段数",
    "quote.type": "形式",
    "quote.standalone": "独立型",
    "quote.connected": "連結型",
    "quote.specifications": "規格",
    "quote.sets": "セット",
    "quote.no": "番号",
    "quote.selectWidth": "幅を選択",
    "quote.selectDepth": "奥行を選択",
    "quote.selectHeight": "高さを選択",
    "quote.selectLevels": "段数を選択",
    "quote.selectType": "形式を選択",
    "quote.estimateToggle": "見積もりの確認と追加",
    "quote.formSection": "見積もり依頼情報",
    "quote.formDescription":
      "見積もりを記入し、メールまたはカカオトークで送信ボタンを押していただければ、入力いただいた内容ですぐに見積もりと相談が可能です。できるだけ早くご連絡いたします。",
    "quote.widthTooltip": "ラックの幅。保管するアイテムのサイズに合わせて選択してください。",
    "quote.depthTooltip": "ラックの奥行。アイテムの奥行と通路スペースを考慮して選択してください。",
    "quote.heightTooltip": "ラックの高さ。天井の高さと作業環境を考慮して選択してください。",
    "quote.levelsTooltip": "ラックの段数。保管するアイテムの量と高さに応じて選択してください。",
    "quote.typeTooltip": "独立型は単独設置、連結型は既存のラックに接続して設置します。",
    "quote.bulkDisclaimer": "この見積もりは基本価格であり、大量注文時には追加割引が適用されます。",

    // Footer
    "footer.company": "ジェドテック",
    "footer.about.title": "会社紹介",
    "footer.about.desc": "物流設備システム専門業者",
    "footer.contact.title": "連絡先",
    "footer.contact.phone": "電話",
    "footer.contact.email": "Eメール",
    "footer.contact.address": "住所",
    "footer.address": "309-2001, 34 Donong-ro, Namyangju-si, Gyeonggi-do, South Korea (Dasan-dong, Plurium)",
    "footer.services.title": "サービス",
    "footer.services.consulting": "無料見積もり相談",
    "footer.services.installation": "全国設置サービス",
    "footer.services.maintenance": "メンテナンス管理",
    "footer.copyright": "© 2025 JAEDOTECH. All rights reserved.",
    "footer.businessInfo": "事業情報",
    "footer.representative": "代表者",
    "footer.representativeNames": "Yoon Do-kyung, Cho Yong-jae",
    "footer.businessNumber": "事業登録番号",
    "footer.businessNumberValue": "340-01-03765",
  },
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("ko")
  const [isChanging, setIsChanging] = useState(false)

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && (savedLanguage === "ko" || savedLanguage === "en" || savedLanguage === "ja")) {
      setLanguageState(savedLanguage)
    } else {
      setLanguageState("ko")
      localStorage.setItem("language", "ko")
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setIsChanging(true)
    setLanguageState(lang)
    localStorage.setItem("language", lang)
    setTimeout(() => setIsChanging(false), 300)
  }

  const t = (key: string): string => {
    const langTranslations = translations[language]
    const result = langTranslations[key]
    return result || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      <div
        className="transition-opacity duration-300 ease-in-out"
        style={{
          opacity: isChanging ? 0.9 : 1,
        }}
      >
        {children}
      </div>
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
