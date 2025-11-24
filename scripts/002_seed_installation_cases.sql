-- Clear all existing data before inserting new data
TRUNCATE TABLE public.installation_cases RESTART IDENTITY CASCADE;

-- Insert 7 real installation cases ordered by completed_date descending (most recent first)
INSERT INTO public.installation_cases (title, description, location, category, image_url, detail_images, details, completed_date)
VALUES
  -- Updated Seongnam bio company project with real images
  (
    '성남 바이오기업 파렛트랙 설치 현장',
    '성남 소재의 바이오 관련 기업 내부에 소규모 파렛트랙을 시공하여, 실내 공간에서도 효율적인 보관 시스템을 구축했습니다.',
    '성남',
    '파렛트랙',
    'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/sungman_main-fsW5xnSY8avyo2l2J4ix2Hcsd8CePs.jpg',
    ARRAY['https://hebbkx1anhila5yf.public.blob.vercel-storage.com/sungnam_detail-2DuATBTB3NtuihVkCa308xK0buR4D5.jpg'],
    '파렛트랙은 대규모 물류창고뿐만 아니라, 소규모 실내공간에서도 제품 보관에 탁월한 효율을 발휘합니다. 이번 시공을 통해 한정된 실내 공간에서도 안전하고 체계적인 적재 시스템을 완성했습니다.',
    '2025-11-01'
  ),
  -- Updated Chungju project with real images
  (
    '청주 파렛트랙 설치 현장',
    '청주 소재의 물류창고 내 파렛트랙을 신규 시공하여, 창고의 적재 효율을 극대화한 프로젝트입니다.',
    '청주',
    '파렛트랙',
    'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/chungju_main-tqr6zIchFQSPygVbfTw7cohKO9yRO1.jpg',
    ARRAY[
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/chungju_detail1-t5h3Ts7JuAANcss7VY6o3EG5rtosdP.jpg',
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/chungju_detail2-9k7vRSzbtyN605MzbRrkvqbiFwHVUG.jpg'
    ],
    '파렛트랙은 물류정리의 기본이 되는 대표적 시스템으로, 창고 활용도를 200% 향상시키는 핵심 자재입니다. 창고 정리가 막막하거나 설치방향이 고민되신다면, 재도테크에서 무료 견적과 현장 실측을 도와드립니다.',
    '2025-10-25'
  ),
  -- Updated Suwon project with real images
  (
    '수원 중량랙 설치 현장',
    '경기도 체육회관 내부에 중량랙을 설치하여 다양한 적재 목적에 맞춘 공간 활용을 구현한 사례입니다.',
    '수원',
    '중량랙',
    'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/suwon_main1-sS3juI0ZblKrTDDCedKDU6NPItNwie.jpg',
    ARRAY[
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/suwon_detail1-ueucj7l6B0LJANvpivaR0IDW1GI3c0.jpg',
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/suwon_detail2-YU18OrKapntHvEO8tZjatwQRmXDn0R.jpg'
    ],
    '중량랙은 물류뿐만 아니라 사무용품, 제품, 자재 등 다목적 적재가 가능한 구조물입니다. 이번 설치를 통해 사무실 및 창고 공간을 효율적으로 분리·정리할 수 있도록 시공했습니다.',
    '2025-10-21'
  ),
  -- Updated Namyangju project with category fix
  (
    '남양주 파렛트랙 설치 현장',
    '남양주 창고 내에 파렛트랙 66S를 설치하여, 적재물 보관공간을 효율적으로 확보한 프로젝트입니다.',
    '남양주',
    '파렛트랙',
    'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/namyangju_main-YHasRJ7utxbZakDuLNTUheGNCHGOIu.jpg',
    ARRAY[
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/namyangju_detail_1-5npHJt1YUcI6SG7zgiZGlccLs4W5ra.jpg',
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/namyangju_detail2-BTEa2W8sty6qCeZ4R4XnWIMgSF90m0.jpg',
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/namyangju_detail_3-YHBdW4WDyI9SEuMLKYX4n4rb7YXEOa.jpg',
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/namyangju_detail_4-zR6vq4hQUhZ3vNDPsx3BxgsynKZ3yw.jpg'
    ],
    '기존 적재물로 인해 창고 공간이 비효율적으로 사용되고 있었던 현장으로, 새로운 파렛트랙 설치를 통해 체계적인 보관이 가능해졌습니다. 시공 결과를 확인하신 후 옆동에도 추가 견적을 요청해 주셨습니다.',
    '2025-09-12'
  ),
  -- Updated Ilsan project with real images
  (
    '일산 오메가 중량랙 설치 현장',
    '일산 소재 창고 내에 오메가형 중량랙을 설치하여, 고하중 제품의 안정적인 적재를 가능하게 한 프로젝트입니다.',
    '일산',
    '중량랙',
    'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ilsan_main-KKtFNwvFmWQAvICwbWoKQ89JgC7mua.jpg',
    ARRAY[
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ilsan_detail1-NbrSbDCmDFD6OQU7UwhjWK8X0hfWzX.jpg',
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ilsan_detail2-BxFy1oRFHtOdX6mYfaX8SMChWt5lgm.jpg',
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ilsan_detail3-jQYm3tBZwMmhTAPWeNOLNXmlxBRRD1.jpg',
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ilsan_detail4-UyHXqocj757E0Qp5ELlpR20s95Z3uG.jpg',
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ilsan_detail5-F6eeXpTyWx0v9K3CUnOLDK5qwufMSi.jpg'
    ],
    '오메가 중량랙은 기둥 구조가 파렛트랙과 유사하여, 일반 중량랙보다 더 높은 하중을 견딜 수 있습니다. 이번 현장은 적재물 정리 전이라 조립만 진행하였으며, 현장 상황에 맞춰 맞춤형 설치를 완료했습니다.',
    '2025-09-08'
  ),
  -- Updated Dangjin project with real images instead of placeholders
  (
    '충남 당진 파렛트랙 백빔 추가 시공 현장',
    '냉장·냉동창고 내 기존 파렛트랙 구조에 안정성을 강화하기 위해 백빔(backbeam)을 추가 시공한 현장입니다.',
    '충남 당진',
    '파렛트랙',
    'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dangjin_main-6qKon6BYVu5j116zDrYimZyyyzow1O.jpg',
    ARRAY[
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dangjin_detail1-8bbmO0etMbntNQ7R9lQCNf87uqXvtP.jpg',
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dangjin_detail2-ZaiadWJBJ4A6n9hVkigiQ8wN5HVtN7.jpg',
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dangjin_detail3-uC7qrdYKDpIOKXHixS8MvEYHFxvg4j.jpg',
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dangjin_detail4-ZnwDvAY78EgDE7znGPgrWq7waRvtlz.jpg',
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dangjin_detail5-PWWLOeJblRK6jQi90KgAdRnCcd3pQQ.jpg',
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dangjin_detail6-Ff7S4CLEmIcuURvKauNynSrs0vxyWF.jpg',
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dangjin_detail7-gIlGNXaQxXyjzJs1u5vUOtuZJHu3bb.jpg'
    ],
    '지게차 운반 중 적재물이 뒤로 넘어가는 것을 방지하기 위해 백빔(backbeam)을 설치했습니다. 백빔은 냉장·냉동창고 등 안전성이 중요한 현장에서 필수적인 보강 자재입니다. 더운 날씨 속에서도 안전한 물류 환경 조성을 위해 꼼꼼히 시공 완료했습니다.',
    '2025-09-05'
  ),
  -- Updated Ansan project with real main image, removed detail images since none provided
  (
    '안산 창고 파렛트랙 설치 현장',
    '안산 소재의 창고 내에 파렛트랙을 시공한 현장으로, 공간 활용 효율을 극대화하여 대용량 적재가 가능하도록 구성하였습니다.',
    '안산',
    '파렛트랙',
    'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ansan_main-cZJUUyioO8NfN7rpKnkJDvMglf4ljV.jpg',
    ARRAY[]::text[],
    '이번 현장은 3단 2S 구조로 시공되었으며, 최대 354파렛트까지 보관이 가능합니다. 파렛트랙은 물류창고 및 보관시설에서 가장 보편적으로 사용되는 산업용 랙으로, 창고 규모와 용량에 맞춰 맞춤형 시공이 가능합니다.',
    '2025-09-04'
  );
