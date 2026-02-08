alter table public.games enable row level security;

create policy "Enable delete for users based on user_id"
on "public"."games"
to public
using (
  (( SELECT auth.uid() AS uid) = user_id)
);

create policy "Enable insert for authenticated users only"
on "public"."games"
to authenticated
with check (
  true
);

create policy "Enable users to view their own data only"
on "public"."games"
to authenticated
using (
  (( SELECT auth.uid() AS uid) = user_id)
);