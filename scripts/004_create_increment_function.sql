-- 참여자 수 증가 함수 생성
CREATE OR REPLACE FUNCTION increment_participant_count(gp_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE public.group_purchases
  SET participant_count = participant_count + 1
  WHERE id = gp_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 함수 실행 권한 부여
GRANT EXECUTE ON FUNCTION increment_participant_count(UUID) TO anon, authenticated;
