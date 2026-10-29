-- AFRIKA MONDE TODAY: execute in Supabase SQL Editor.
create table if not exists public.admin_users (
 user_id uuid primary key references auth.users(id) on delete cascade,
 created_at timestamptz not null default now()
);
create table if not exists public.site_settings (
 id integer primary key check(id=1),
 live_url text not null default '',
 live_title text not null default '',
 updated_at timestamptz not null default now()
);
insert into public.site_settings(id,live_url,live_title) values(1,'','AFRIKA MONDE TODAY — Direct') on conflict(id) do nothing;
alter table public.admin_users enable row level security;
alter table public.site_settings enable row level security;
create or replace function public.is_amt_admin() returns boolean language sql stable security definer set search_path='' as $$
 select exists(select 1 from public.admin_users where user_id=(select auth.uid()));
$$;
revoke all on function public.is_amt_admin() from public;
grant execute on function public.is_amt_admin() to authenticated;
drop policy if exists "Admins can read own admin record" on public.admin_users;
create policy "Admins can read own admin record" on public.admin_users for select to authenticated using(user_id=(select auth.uid()));
drop policy if exists "Public can read live settings" on public.site_settings;
create policy "Public can read live settings" on public.site_settings for select to anon,authenticated using(id=1);
drop policy if exists "Admins can insert live settings" on public.site_settings;
create policy "Admins can insert live settings" on public.site_settings for insert to authenticated with check(id=1 and (select public.is_amt_admin()));
drop policy if exists "Admins can update live settings" on public.site_settings;
create policy "Admins can update live settings" on public.site_settings for update to authenticated using((select public.is_amt_admin())) with check(id=1 and (select public.is_amt_admin()));
grant select on public.site_settings to anon,authenticated;
grant insert,update on public.site_settings to authenticated;
grant select on public.admin_users to authenticated;

-- After creating your admin user in Supabase Authentication, add its UUID:
-- insert into public.admin_users(user_id) values ('YOUR_AUTH_USER_UUID');
