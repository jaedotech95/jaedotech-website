-- 경량랙 카테고리를 installation_cases의 category check constraint에 추가
ALTER TABLE installation_cases DROP CONSTRAINT IF EXISTS installation_cases_category_check;

ALTER TABLE installation_cases ADD CONSTRAINT installation_cases_category_check 
CHECK (category IN ('파렛트랙', '캔틸레버랙', '경량랙', '중량랙', '메자닌랙', '슬라이딩랙'));
