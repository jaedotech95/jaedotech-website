-- 사진이 없는 당진 프로젝트 삭제 (placeholder 이미지를 사용하는 항목)
DELETE FROM installation_cases 
WHERE title LIKE '%당진%' 
AND image_url LIKE '%placeholder.svg%';
