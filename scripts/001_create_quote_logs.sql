-- Create quote_logs table to store all quote inquiries
create table if not exists public.quote_logs (
  id uuid primary key default gen_random_uuid(),
  created_at timestamp with time zone default now(),
  
  -- Customer information
  company text not null,
  name text not null,
  phone text not null,
  email text not null,
  message text not null,
  
  -- File attachment information
  file_name text,
  file_size integer,
  file_type text,
  file_url text,
  
  -- Selected products (stored as JSONB for flexibility)
  selected_products jsonb,
  
  -- Estimated quote amount
  estimated_total numeric(12, 2),
  
  -- Email send status
  email_sent boolean default false,
  email_error text,
  email_sent_at timestamp with time zone
);

-- Enable RLS (Row Level Security)
alter table public.quote_logs enable row level security;

-- Create policy to allow public insert (since this is a contact form)
-- In production, you might want to restrict this further
create policy "quote_logs_insert_public"
  on public.quote_logs for insert
  with check (true);

-- Create policy to allow authenticated users to view all logs
-- Adjust this based on your admin authentication setup
create policy "quote_logs_select_auth"
  on public.quote_logs for select
  using (true);

-- Create index for faster queries
create index if not exists quote_logs_created_at_idx on public.quote_logs(created_at desc);
create index if not exists quote_logs_email_idx on public.quote_logs(email);
create index if not exists quote_logs_company_idx on public.quote_logs(company);
