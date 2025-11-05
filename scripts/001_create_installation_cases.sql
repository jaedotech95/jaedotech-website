-- Create installation_cases table for storing project showcase data
create table if not exists public.installation_cases (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  location text not null,
  category text not null check (category in ('경량랙', '중량랙', '파렛트랙')),
  image_url text not null,
  detail_images text[] default array[]::text[],
  details text,
  completed_date date,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Enable Row Level Security
alter table public.installation_cases enable row level security;

-- Allow public read access (anyone can view installation cases)
create policy "installation_cases_select_public"
  on public.installation_cases for select
  using (true);

-- Only authenticated users can insert (for admin use)
create policy "installation_cases_insert_auth"
  on public.installation_cases for insert
  with check (auth.uid() is not null);

-- Only authenticated users can update (for admin use)
create policy "installation_cases_update_auth"
  on public.installation_cases for update
  using (auth.uid() is not null);

-- Only authenticated users can delete (for admin use)
create policy "installation_cases_delete_auth"
  on public.installation_cases for delete
  using (auth.uid() is not null);

-- Create index for faster queries
create index if not exists installation_cases_category_idx on public.installation_cases(category);
create index if not exists installation_cases_created_at_idx on public.installation_cases(created_at desc);

-- Create updated_at trigger
create or replace function public.handle_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger installation_cases_updated_at
  before update on public.installation_cases
  for each row
  execute function public.handle_updated_at();
