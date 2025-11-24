-- 카테고리를 'Light-Duty Rack'에서 '경량랙'으로 수정
INSERT INTO public.installation_cases (
  title,
  description,
  location,
  category,
  completed_date,
  image_url,
  detail_images,
  details
) VALUES (
  '아산병원 연구실 경량랙 설치현장',
  '병원 내 랩실에 실험기기 및 소형장비 적재를 위한 경량랙 설치 완료',
  '아산',
  '경량랙',
  '2025-11-19',
  '/images/asan-hospital-lab-1.jpg',
  ARRAY[
    '/images/asan-hospital-lab-1.jpg',
    '/images/asan-hospital-lab-2.jpg',
    '/images/asan-hospital-lab-3.jpg',
    '/images/asan-hospital-lab-4.jpg'
  ],
  '지난주 아산병원 내 랩실에 경량랙 설치를 완료했습니다. 경량랙은 실험기기, 소형장비, 연구자료 등 다양한 적재물을 안전하게 보관하기에 아주 적합한 제품입니다.

**주요 특징:**
- **실험실 최적화:** 청결이 중요한 병원 환경에 맞는 깔끔한 흰색 마감
- **공간 효율:** 좁은 연구실 공간을 최대한 활용한 배치
- **안정성:** 정밀 실험기기를 안전하게 보관할 수 있는 견고한 구조
- **범용성:** 병원, 연구소, 사무실 등 어디든 적극 활용 가능

경량랙은 의료기관, 연구시설, 교육기관 등에서 특히 인기가 많은 제품으로, 깔끔한 정리정돈과 효율적인 공간 활용을 동시에 실현할 수 있습니다.'
);
