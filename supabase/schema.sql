-- PortfolioOS — Supabase schema
-- Run this in the Supabase SQL Editor (Dashboard > SQL Editor > New query).

-- Contact form messages
create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 100),
  email text not null check (char_length(email) between 3 and 255),
  message text not null check (char_length(message) between 10 and 5000),
  created_at timestamptz not null default now()
);

-- Page view analytics
create table if not exists public.page_views (
  id uuid primary key default gen_random_uuid(),
  path text not null default '/',
  user_agent text,
  created_at timestamptz not null default now()
);

-- Row Level Security: anonymous visitors may INSERT only.
-- Reading data requires the service role (or the dashboard).
alter table public.messages enable row level security;
alter table public.page_views enable row level security;

create policy "anon can send messages"
  on public.messages for insert
  to anon
  with check (true);

create policy "anon can log views"
  on public.page_views for insert
  to anon
  with check (true);
