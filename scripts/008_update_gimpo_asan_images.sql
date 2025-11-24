-- 김포 오메가중량랙과 아산병원 설치 사례의 이미지 URL을 Vercel Blob Storage로 업데이트

-- 김포 오메가중량랙 이미지 업데이트
UPDATE installation_cases
SET 
  image_url = '/images/20251114-1.jpg',
  detail_images = ARRAY[
    '/images/20251114-1.jpg',
    '/images/20251114-2.jpg',
    '/images/20251114-3.jpg'
  ]
WHERE title = '김포 오메가중량랙 설치현장';

-- 아산병원 연구실 경량랙 이미지 업데이트
UPDATE installation_cases
SET 
  image_url = '/images/20251119-1.jpg',
  detail_images = ARRAY[
    '/images/20251119-1.jpg',
    '/images/20251119-2.jpg',
    '/images/20251119-3.jpg',
    '/images/20251119-4.jpg'
  ]
WHERE title = '아산병원 연구실 경량랙 설치현장';
