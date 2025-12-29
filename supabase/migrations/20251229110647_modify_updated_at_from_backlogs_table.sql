create extension if not exists "moddatetime" with schema "extensions";

alter table "public"."backlogs" alter column "updated_at" set default now();

alter table "public"."backlogs" alter column "updated_at" set data type timestamp with time zone using "updated_at"::timestamp with time zone;

grant delete on table "public"."backlogs" to "postgres";

grant insert on table "public"."backlogs" to "postgres";

grant references on table "public"."backlogs" to "postgres";

grant select on table "public"."backlogs" to "postgres";

grant trigger on table "public"."backlogs" to "postgres";

grant truncate on table "public"."backlogs" to "postgres";

grant update on table "public"."backlogs" to "postgres";


  create policy "Enable update for users based on user_id"
  on "public"."backlogs"
  as permissive
  for update
  to public
using ((( SELECT auth.uid() AS uid) = user_id));


CREATE TRIGGER handle_updated_at BEFORE UPDATE ON public.backlogs FOR EACH ROW EXECUTE FUNCTION extensions.moddatetime('updated_at');


