create extension if not exists pgcrypto;

create table if not exists public.enquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null check (char_length(name) between 2 and 100),
  phone text not null check (phone ~ '^\+?[0-9]{10,15}$'),
  email text check (email is null or char_length(email) <= 150),
  site_location text not null check (char_length(site_location) between 2 and 150),
  plot_area text check (plot_area is null or char_length(plot_area) <= 50),
  service text check (service is null or char_length(service) <= 150),
  message text check (message is null or char_length(message) <= 2000),
  source text not null check (source in ('hero', 'quote_modal')),
  page_url text check (page_url is null or char_length(page_url) <= 500),
  submission_ip_hash text,
  user_agent text check (user_agent is null or char_length(user_agent) <= 500),
  status text not null default 'new' check (status in ('new', 'contacted', 'qualified', 'closed'))
);

alter table public.enquiries add column if not exists submission_ip_hash text;
alter table public.enquiries add column if not exists user_agent text;

alter table public.enquiries enable row level security;
revoke all on table public.enquiries from anon, authenticated;

drop policy if exists "Public can submit enquiries" on public.enquiries;

comment on table public.enquiries is 'Website quote and callback requests submitted from arkaconstruction.in';
