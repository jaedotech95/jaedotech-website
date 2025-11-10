-- Fixed column names: completion_date -> completed_date, main_image -> image_url, added details column
-- 당진 파렛트랙 백빔 추가 시공현장 데이터 삽입
INSERT INTO installation_cases (
  title,
  location,
  category,
  completed_date,
  description,
  image_url,
  detail_images,
  details
) VALUES (
  '충남 당진 파렛트랙 백빔 추가 시공현장',
  '충남 당진',
  '파렛트랙',
  '2025-09-05',
  '냉장·냉동창고 내 기존 파렛트랙 구조에 안정성을 강화하기 위해 백빔(backbeam)을 추가 시공한 현장입니다.',
  'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dangjin_main-OFMtC3Odr2fQk8RkEHmoauXHeu1331.jpg',
  ARRAY[
    'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dangjin_detail1-PLGM02UXKG9W987I9tx8qoljJsz8nO.jpg',
    'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dangjin_detail2-TCneYiuwdn353C8vTRvYXg3ZPbBrMf.jpg',
    'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dangjin_detail3-y9gQHzeKTjlbbBouuL4S1qvbo8sTpF.jpg',
    'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dangjin_detail4-59bNSajV3U6z49ncQdCujxR6vO9iKu.jpg',
    'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dangjin_detail5-V1duo199a5WMFmB3U6YBY5ssNRZTEE.jpg',
    'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dangjin_detail6-3pQN2FvPetGfHqlf4S6H5pKcw3ktMD.jpg',
    'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dangjin_detail7-Y8d1jp5buu4QkVExMjBRpyAvE5InEh.jpg'
  ],
  '지게차 운반 중 적재물이 뒤로 넘어가는 것을 방지하기 위해 백빔(backbeam)을 설치했습니다. 블루 기둥에 옐로우, 그린, 레드, 오렌지 등 다양한 컬러의 빔을 조합하여 구역별 식별이 용이하도록 설계되었습니다. 백빔은 냉장·냉동창고 등 안전성이 중요한 현장에서 필수적인 보강 자재입니다.'
);
