-- Add translation columns to installation_cases table
ALTER TABLE installation_cases
ADD COLUMN IF NOT EXISTS title_en TEXT,
ADD COLUMN IF NOT EXISTS title_ja TEXT,
ADD COLUMN IF NOT EXISTS description_en TEXT,
ADD COLUMN IF NOT EXISTS description_ja TEXT,
ADD COLUMN IF NOT EXISTS details_en TEXT,
ADD COLUMN IF NOT EXISTS details_ja TEXT,
ADD COLUMN IF NOT EXISTS location_en TEXT,
ADD COLUMN IF NOT EXISTS location_ja TEXT;

-- Add comment to describe the new columns
COMMENT ON COLUMN installation_cases.title_en IS 'English translation of title';
COMMENT ON COLUMN installation_cases.title_ja IS 'Japanese translation of title';
COMMENT ON COLUMN installation_cases.description_en IS 'English translation of description';
COMMENT ON COLUMN installation_cases.description_ja IS 'Japanese translation of description';
COMMENT ON COLUMN installation_cases.details_en IS 'English translation of details';
COMMENT ON COLUMN installation_cases.details_ja IS 'Japanese translation of details';
COMMENT ON COLUMN installation_cases.location_en IS 'English translation of location';
COMMENT ON COLUMN installation_cases.location_ja IS 'Japanese translation of location';
