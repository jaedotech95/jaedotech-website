-- Add Gimpo Pallet Rack Installation Case (2025-11-21)
INSERT INTO installation_cases (
  title,
  description,
  location,
  category,
  completed_date,
  image_url,
  detail_images
) VALUES (
  '김포 파렛트랙 설치현장',
  '물류시스템의 대명사인 파렛트랙을 설치하고 왔습니다.

파렛트랙 상판에 합판으로 시공해드렸던 현장입니다.

타이빔 위에 합판을 덧대는 방식으로 파레트 없이 적재가 가능하게 해드렸답니다.',
  '김포',
  '파렛트랙',
  '2025-11-21',
  '/images/20251121-1.jpg',
  ARRAY[
    '/images/20251121-2.jpg',
    '/images/20251121-3.jpg',
    '/images/20251121-4.jpg'
  ]
);
