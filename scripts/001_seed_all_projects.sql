-- 기존 데이터 삭제
DELETE FROM installation_cases;

-- 1. 성남 바이오기업 파렛트랙 설치현장 (2025-11-01)
INSERT INTO installation_cases (
  title,
  description,
  location,
  category,
  image_url,
  detail_images,
  details,
  completed_date
) VALUES (
  '성남 바이오기업 파렛트랙 설치현장',
  '바이오 제품 보관을 위한 파렛트랙 시스템 구축',
  '경기도 성남시',
  '파렛트랙',
  'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/sungman_main-fsW5xnSY8avyo2l2J4ix2Hcsd8CePs.jpg',
  ARRAY['https://hebbkx1anhila5yf.public.blob.vercel-storage.com/sungnam_detail-2DuATBTB3NtuihVkCa308xK0buR4D5.jpg'],
  '바이오 기업의 제품 보관을 위한 파렛트랙 시스템을 설치했습니다. 청결한 환경이 요구되는 바이오 제품 특성에 맞춰 깨끗하고 효율적인 보관 시스템을 구축했습니다.',
  '2025-11-01'
);

-- 2. 청주 파렛트랙 설치현장 (2025-10-20)
INSERT INTO installation_cases (
  title,
  description,
  location,
  category,
  image_url,
  detail_images,
  details,
  completed_date
) VALUES (
  '청주 파렛트랙 설치현장',
  '대규모 물류창고 파렛트랙 시스템 구축',
  '충청북도 청주시',
  '파렛트랙',
  'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/chungju_main-tqr6zIchFQSPygVbfTw7cohKO9yRO1.jpg',
  ARRAY[
    'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/chungju_detail1-t5h3Ts7JuAANcss7VY6o3EG5rtosdP.jpg',
    'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/chungju_detail2-9k7vRSzbtyN605MzbRrkvqbiFwHVUG.jpg'
  ],
  '청주 지역 대규모 물류창고에 고중량 파렛트랙 시스템을 설치했습니다. 높은 천장고를 활용한 다단 적재 시스템으로 보관 효율을 극대화했습니다.',
  '2025-10-20'
);

-- 3. 수원 중량랙 설치현장 (2025-10-05)
INSERT INTO installation_cases (
  title,
  description,
  location,
  category,
  image_url,
  detail_images,
  details,
  completed_date
) VALUES (
  '수원 중량랙 설치현장',
  '사무실 및 상업공간 중량랙 시스템',
  '경기도 수원시',
  '중량랙',
  'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/suwon_main1-sS3juI0ZblKrTDDCedKDU6NPItNwie.jpg',
  ARRAY[
    'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/suwon_detail1-ueucj7l6B0LJANvpivaR0IDW1GI3c0.jpg',
    'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/suwon_detail2-YU18OrKapntHvEO8tZjatwQRmXDn0R.jpg'
  ],
  '수원 사무실 공간에 화이트 중량랙 시스템을 설치했습니다. 깨끗한 사무환경에 어울리는 화이트 컬러와 메쉬 백패널로 보안성과 미관을 동시에 확보했습니다.',
  '2025-10-05'
);

-- 4. 남양주 조립식 창고 설치현장 (2025-09-15)
INSERT INTO installation_cases (
  title,
  description,
  location,
  category,
  image_url,
  detail_images,
  details,
  completed_date
) VALUES (
  '남양주 조립식 창고 설치현장',
  '조립식 창고 및 내부 랙 시스템 통합 구축',
  '경기도 남양주시',
  '조립식창고',
  'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/namyangju_main-Hy0Hy0Hy0Hy0Hy0Hy0Hy0Hy0Hy0Hy0.jpg',
  ARRAY[
    'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/namyangju_detail_1-ABC123ABC123ABC123ABC123ABC123.jpg',
    'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/namyangju_detail2-BTEa2W8sty6qCeZ4R4XnWIMgSF90m0.jpg'
  ],
  '남양주에 조립식 창고를 신축하고 내부에 파렛트랙 시스템을 설치했습니다. 창고 건축부터 내부 랙 시스템까지 원스톱 솔루션을 제공했습니다.',
  '2025-09-15'
);

-- 5. 일산 오메가 중량랙 설치현장 (2025-08-28)
INSERT INTO installation_cases (
  title,
  description,
  location,
  category,
  image_url,
  detail_images,
  details,
  completed_date
) VALUES (
  '일산 오메가 중량랙 설치현장',
  '오메가 중량랙 시스템 대규모 설치',
  '경기도 고양시 일산',
  '중량랙',
  'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ilsan_main-KKtFNwvFmWQAvICwbWoKQ89JgC7mua.jpg',
  ARRAY[
    'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ilsan_detail1-NbrSbDCmDFD6OQU7UwhjWK8X0hfWzX.jpg',
    'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ilsan_detail2-BxFy1oRFHtOdX6mYfaX8SMChWt5lgm.jpg',
    'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ilsan_detail3-jQYm3tBZwMmhTAPWeNOLNXmlxBRRD1.jpg',
    'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ilsan_detail4-UyHXqocj757E0Qp5ELlpR20s95Z3uG.jpg',
    'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ilsan_detail5-F6eeXpTyWx0v9K3CUnOLDK5qwufMSi.jpg'
  ],
  '일산 물류센터에 화이트 오메가 중량랙 시스템을 대규모로 설치했습니다. 설치 전 자재 준비부터 조립, 완성까지 전 과정을 체계적으로 진행했습니다.',
  '2025-08-28'
);

-- 6. 인천 물류센터 파렛트랙 설치현장 (2025-07-10)
INSERT INTO installation_cases (
  title,
  description,
  location,
  category,
  image_url,
  detail_images,
  details,
  completed_date
) VALUES (
  '인천 물류센터 파렛트랙 설치현장',
  '대형 물류센터 파렛트랙 시스템',
  '인천광역시',
  '파렛트랙',
  '/placeholder.svg?height=600&width=800',
  ARRAY[
    '/placeholder.svg?height=600&width=800',
    '/placeholder.svg?height=600&width=800'
  ],
  '인천 대형 물류센터에 고효율 파렛트랙 시스템을 설치했습니다. 대량의 화물을 안전하게 보관할 수 있는 견고한 구조로 설계했습니다.',
  '2025-07-10'
);

-- 7. 평택 자동차부품 중량랙 설치현장 (2025-06-22)
INSERT INTO installation_cases (
  title,
  description,
  location,
  category,
  image_url,
  detail_images,
  details,
  completed_date
) VALUES (
  '평택 자동차부품 중량랙 설치현장',
  '자동차 부품 보관용 중량랙 시스템',
  '경기도 평택시',
  '중량랙',
  '/placeholder.svg?height=600&width=800',
  ARRAY[
    '/placeholder.svg?height=600&width=800',
    '/placeholder.svg?height=600&width=800'
  ],
  '평택 자동차 부품 제조업체에 중량랙 시스템을 설치했습니다. 무거운 자동차 부품을 안전하게 보관할 수 있는 고강도 랙 시스템입니다.',
  '2025-06-22'
);
