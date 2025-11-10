-- Add multilingual columns to installation_cases table
ALTER TABLE public.installation_cases 
ADD COLUMN IF NOT EXISTS title_en TEXT,
ADD COLUMN IF NOT EXISTS title_ja TEXT,
ADD COLUMN IF NOT EXISTS description_en TEXT,
ADD COLUMN IF NOT EXISTS description_ja TEXT,
ADD COLUMN IF NOT EXISTS details_en TEXT,
ADD COLUMN IF NOT EXISTS details_ja TEXT;

-- Update existing data with English translations
UPDATE public.installation_cases SET
  title_en = CASE title
    WHEN '성남 바이오기업 파렛트랙 설치 현장' THEN 'Seongnam Bio Company Pallet Rack Installation'
    WHEN '청주 파렛트랙 설치 현장' THEN 'Cheongju Pallet Rack Installation'
    WHEN '수원 중량랙 설치 현장' THEN 'Suwon Heavy Duty Rack Installation'
    WHEN '남양주 파렛트랙 설치 현장' THEN 'Namyangju Pallet Rack Installation'
    WHEN '일산 오메가 중량랙 설치 현장' THEN 'Ilsan Omega Heavy Duty Rack Installation'
    WHEN '충남 당진 파렛트랙 백빔 추가 시공 현장' THEN 'Dangjin Pallet Rack Back Beam Addition'
    WHEN '안산 창고 파렛트랙 설치 현장' THEN 'Ansan Warehouse Pallet Rack Installation'
  END,
  title_ja = CASE title
    WHEN '성남 바이오기업 파렛트랙 설치 현장' THEN '城南バイオ企業パレットラック設置現場'
    WHEN '청주 파렛트랙 설치 현장' THEN '清州パレットラック設置現場'
    WHEN '수원 중량랙 설치 현장' THEN '水原重量ラック設置現場'
    WHEN '남양주 파렛트랙 설치 현장' THEN '南楊州パレットラック設置現場'
    WHEN '일산 오메가 중량랙 설치 현장' THEN '一山オメガ重量ラック設置現場'
    WHEN '충남 당진 파렛트랙 백빔 추가 시공 현장' THEN '忠南唐津パレットラックバックビーム追加工事現場'
    WHEN '안산 창고 파렛트랙 설치 현장' THEN '安山倉庫パレットラック設置現場'
  END,
  description_en = CASE description
    WHEN '성남 소재의 바이오 관련 기업 내부에 소규모 파렛트랙을 시공하여, 실내 공간에서도 효율적인 보관 시스템을 구축했습니다.' THEN 'We installed a small-scale pallet rack inside a bio-related company in Seongnam, creating an efficient storage system even in indoor spaces.'
    WHEN '청주 소재의 물류창고 내 파렛트랙을 신규 시공하여, 창고의 적재 효율을 극대화한 프로젝트입니다.' THEN 'A new pallet rack installation in a logistics warehouse in Cheongju, maximizing warehouse storage efficiency.'
    WHEN '경기도 체육회관 내부에 중량랙을 설치하여 다양한 적재 목적에 맞춘 공간 활용을 구현한 사례입니다.' THEN 'Heavy duty racks installed inside Gyeonggi Sports Center, implementing space utilization for various storage purposes.'
    WHEN '남양주 창고 내에 파렛트랙 66S를 설치하여, 적재물 보관공간을 효율적으로 확보한 프로젝트입니다.' THEN 'Installation of Pallet Rack 66S in Namyangju warehouse, efficiently securing storage space for goods.'
    WHEN '일산 소재 창고 내에 오메가형 중량랙을 설치하여, 고하중 제품의 안정적인 적재를 가능하게 한 프로젝트입니다.' THEN 'Installation of Omega-type heavy duty racks in Ilsan warehouse, enabling stable storage of high-load products.'
    WHEN '냉장·냉동창고 내 기존 파렛트랙 구조에 안정성을 강화하기 위해 백빔(backbeam)을 추가 시공한 현장입니다.' THEN 'A site where back beams were added to existing pallet rack structures in refrigerated/frozen warehouses to enhance stability.'
    WHEN '안산 소재의 창고 내에 파렛트랙을 시공한 현장으로, 공간 활용 효율을 극대화하여 대용량 적재가 가능하도록 구성하였습니다.' THEN 'Pallet rack installation in Ansan warehouse, configured for maximum capacity storage by optimizing space utilization efficiency.'
  END,
  description_ja = CASE description
    WHEN '성남 소재의 바이오 관련 기업 내부에 소규모 파렛트랙을 시공하여, 실내 공간에서도 효율적인 보관 시스템을 구축했습니다.' THEN '城南所在のバイオ関連企業内部に小規模パレットラックを施工し、室内空間でも効率的な保管システムを構築しました。'
    WHEN '청주 소재의 물류창고 내 파렛트랙을 신규 시공하여, 창고의 적재 효율을 극대화한 프로젝트입니다.' THEN '清州所在の物流倉庫内にパレットラックを新規施工し、倉庫の積載効率を最大化したプロジェクトです。'
    WHEN '경기도 체육회관 내부에 중량랙을 설치하여 다양한 적재 목적에 맞춘 공간 활용을 구현한 사례입니다.' THEN '京畿道体育会館内部に重量ラックを設置し、様々な積載目的に合わせた空間活用を実現した事例です。'
    WHEN '남양주 창고 내에 파렛트랙 66S를 설치하여, 적재물 보관공간을 효율적으로 확보한 프로젝트입니다.' THEN '南楊州倉庫内にパレットラック66Sを設置し、積載物保管スペースを効率的に確保したプロジェクトです。'
    WHEN '일산 소재 창고 내에 오메가형 중량랙을 설치하여, 고하중 제품의 안정적인 적재를 가능하게 한 프로젝트입니다.' THEN '一山所在倉庫内にオメガ型重量ラックを設置し、高荷重製品の安定的な積載を可能にしたプロジェクトです。'
    WHEN '냉장·냉동창고 내 기존 파렛트랙 구조에 안정성을 강화하기 위해 백빔(backbeam)을 추가 시공한 현장입니다.' THEN '冷蔵・冷凍倉庫内の既存パレットラック構造に安定性を強化するため、バックビームを追加施工した現場です。'
    WHEN '안산 소재의 창고 내에 파렛트랙을 시공한 현장으로, 공간 활용 효율을 극대화하여 대용량 적재가 가능하도록 구성하였습니다.' THEN '安山所在の倉庫内にパレットラックを施工した現場で、空間活用効率を最大化し、大容量積載が可能なように構成しました。'
  END;
