# Game Backlog App

## Install dependencies
```
npm install
```
---
## Supabase local development
**Create a container**
```
npx supabase init
```
> Skip this if you already setup the container

**Run the container**
```
npx supabase start
```

**Stop the container**
```
npx supabase stop
```
---
## Start the project

**Local**
```
npm run dev:localdev
```

**Staging**
```
npm run dev:staging
```
---
## Sync Supabase local to remote
https://supabase.com/docs/guides/local-development/overview

**Creating a migation file**
```
npx supabase migration new add_new_table
```

**Login**
```
npx supabase link --project-ref <project-id>
```
> Do this if not already logged in

**Manually add the schema to the .sql file created**
```
create table public.new_table (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  created_at timestamptz default now()
);
```

**Pull changes from remote DB**
```
npx supabase db pull
```
> Capture any changes that you have made to your remote database before you went through the steps above.
> 
> If you have not made any changes to the remote database, skip this step.

**Deploy DB changes**
```
npx supabase db push
```
**Link your project**
```
npx supabase link --project
```
---
## Playwright
E2E testing
```
npx playwright test --grep="@e2e"
```

E2E testing with Trace Viewer
```
npx playwright test --grep="@e2e" --ui
```