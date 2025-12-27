# Game Backlog App

## Requirements
- Node.js
- Docker

## Install dependencies
```
npm install
```
---
## Supabase local development
Initialise Supabase
```
npx supabase init
```

Start Supabase
```
npx supabase start
```

Stop Supabase
```
npx supabase stop
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