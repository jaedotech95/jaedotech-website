-- 당진 프로젝트의 이미지 URL을 올바른 URL로 업데이트
UPDATE installation_cases
SET 
  image_url = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dangjin_main-6qKon6BYVu5j116zDrYimZyyyzow1O.jpg',
  detail_images = ARRAY[
    'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dangjin_detail1-8bbmO0etMbntNQ7R9lQCNf87uqXvtP.jpg',
    'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dangjin_detail2-ZaiadWJBJ4A6n9hVkigiQ8wN5HVtN7.jpg',
    'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dangjin_detail3-uC7qrdYKDpIOKXHixS8MvEYHFxvg4j.jpg',
    'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dangjin_detail4-ZnwDvAY78EgDE7znGPgrWq7waRvtlz.jpg',
    'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dangjin_detail5-PWWLOeJblRK6jQi90KgAdRnCcd3pQQ.jpg',
    'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dangjin_detail6-Ff7S4CLEmIcuURvKauNynSrs0vxyWF.jpg',
    'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dangjin_detail7-gIlGNXaQxXyjzJs1u5vUOtuZJHu3bb.jpg'
  ]
WHERE title = '충남 당진 파렛트랙 백빔 추가 시공현장';
