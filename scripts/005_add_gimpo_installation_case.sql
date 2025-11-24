-- 올바른 컬럼 순서와 이름 사용 (completed_date)
-- 김포 오메가중량랙 설치 사례 추가
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
  '김포 오메가중량랙 설치현장',
  '물류창고, 상업현장 등 다양한 환경에서 활용 가능한 오메가 중량랙 설치 프로젝트입니다. 대량의 중량 적재물을 안전하게 보관할 수 있도록 설계되었습니다.',
  '김포',
  'Heavy-Duty Rack',
  '2025-11-14',
  '/images/gimpo-omega-rack-1.jpg',
  ARRAY['/images/gimpo-omega-rack-1.jpg', '/images/gimpo-omega-rack-2.jpg', '/images/gimpo-omega-rack-3.jpg'],
  '오메가 중량랙의 경우 물류창고, 상업현장 등 다양한 곳에서 활용이 가능합니다. 무게가 나가는 적재물 위주로 활용이 가능하고, 작은 적재물들도 대량으로 적재 가능하다는 장점을 가지고 있습니다.

이번 김포 현장에서는 깨끗하고 체계적인 물류 공간을 구성하기 위해 흰색 오메가 중량랙을 양쪽으로 배치하여 효율적인 통로를 확보했습니다. 각 선반은 여러 단으로 구성되어 있어 다양한 크기의 적재물을 보관할 수 있으며, 견고한 구조로 안전성을 확보했습니다.

**주요 특징:**
- 대용량 적재 가능: 무거운 물품도 안전하게 보관
- 다단 구조: 공간 활용 극대화
- 견고한 철제: 휘어짐 없이 오래 사용 가능
- 깨끗한 마감: 현장 환경 개선'
);
