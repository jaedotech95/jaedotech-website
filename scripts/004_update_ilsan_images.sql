-- Update Ilsan Omega Heavy-Duty Rack Installation images
UPDATE installation_cases
SET 
  image_url = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ilsan_main-KKtFNwvFmWQAvICwbWoKQ89JgC7mua.jpg',
  detail_images = ARRAY[
    'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ilsan_detail1-NbrSbDCmDFD6OQU7UwhjWK8X0hfWzX.jpg',
    'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ilsan_detail2-BxFy1oRFHtOdX6mYfaX8SMChWt5lgm.jpg',
    'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ilsan_detail3-jQYm3tBZwMmhTAPWeNOLNXmlxBRRD1.jpg',
    'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ilsan_detail4-UyHXqocj757E0Qp5ELlpR20s95Z3uG.jpg',
    'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ilsan_detail5-F6eeXpTyWx0v9K3CUnOLDK5qwufMSi.jpg'
  ]
WHERE title = '일산 오메가 중량랙 설치현장';
