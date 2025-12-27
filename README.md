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

**Local development guide**
https://supabase.com/docs/guides/local-development/overview


## Sync local DB to remote DB
**Creating a migation file**
```
npx supabase db diff --use-migra initial_schema -f initial_schema
```

**Login**
```
npx supabase link --project-ref <project-id>
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