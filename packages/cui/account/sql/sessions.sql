create table if not exists public.sessions (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  verified_at timestamptz,
  closed_at timestamptz,
  provider text not null,
  provider_id text not null
);

alter table public.sessions
  add column if not exists closed_at timestamptz;

alter table public.sessions
  add column if not exists verified_at timestamptz;

alter table public.sessions enable row level security;

grant select, insert on table public.sessions to anon, authenticated;
grant update (closed_at, verified_at) on table public.sessions to anon, authenticated;
grant usage, select on sequence public.sessions_id_seq to anon, authenticated;

drop policy if exists sessions_insert on public.sessions;
create policy sessions_insert
  on public.sessions
  for insert
  to anon, authenticated
  with check (true);

drop policy if exists sessions_select on public.sessions;
create policy sessions_select
  on public.sessions
  for select
  to anon, authenticated
  using (true);

drop policy if exists sessions_update on public.sessions;
create policy sessions_update
  on public.sessions
  for update
  to anon, authenticated
  using (closed_at is null)
  with check (verified_at is not null or closed_at is not null);

notify pgrst, 'reload schema';
