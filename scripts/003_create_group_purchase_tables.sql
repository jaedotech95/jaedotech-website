-- 공동구매 테이블 생성
CREATE TABLE IF NOT EXISTS public.group_purchases (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  location TEXT NOT NULL,
  title TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  deadline TIMESTAMP WITH TIME ZONE NOT NULL,
  is_closed BOOLEAN DEFAULT FALSE,
  participant_count INTEGER DEFAULT 0
);

-- 공동구매 참여 테이블 생성
CREATE TABLE IF NOT EXISTS public.group_purchase_participants (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  group_purchase_id UUID NOT NULL REFERENCES public.group_purchases(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  detailed_address TEXT NOT NULL,
  selected_options JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS 정책 설정
ALTER TABLE public.group_purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.group_purchase_participants ENABLE ROW LEVEL SECURITY;

-- 공동구매 목록 조회 (모두 가능)
CREATE POLICY "group_purchases_select_public" ON public.group_purchases
  FOR SELECT USING (true);

-- 공동구매 생성 (모두 가능)
CREATE POLICY "group_purchases_insert_public" ON public.group_purchases
  FOR INSERT WITH CHECK (true);

-- 공동구매 참여 조회 (인증된 사용자만)
CREATE POLICY "group_purchase_participants_select_auth" ON public.group_purchase_participants
  FOR SELECT USING (auth.role() = 'authenticated');

-- 공동구매 참여 생성 (모두 가능)
CREATE POLICY "group_purchase_participants_insert_public" ON public.group_purchase_participants
  FOR INSERT WITH CHECK (true);

-- 인덱스 생성
CREATE INDEX IF NOT EXISTS idx_group_purchases_deadline ON public.group_purchases(deadline);
CREATE INDEX IF NOT EXISTS idx_group_purchase_participants_group_id ON public.group_purchase_participants(group_purchase_id);

COMMENT ON TABLE public.group_purchases IS '공동구매 요청 목록';
COMMENT ON TABLE public.group_purchase_participants IS '공동구매 참여자 정보';
