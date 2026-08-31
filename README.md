# LocalizeOS

Consensus translation memory and release sealing for product localization.

This repository contains the GenLayer Intelligent Contract and the Next.js frontend. The frontend is deliberately live-state-only: without `NEXT_PUBLIC_LOCALIZEOS_CONTRACT`, it reports an unavailable deployment state instead of fabricating records.

## Local development

```powershell
cd apps/web
npm install --offline --cache "$env:LOCALAPPDATA\npm-cache"
npm run typecheck
npm run lint
npm run build
npm run dev
```

Target network: GenLayer StudioNet, chain 61999. Writes are intended to use an injected wallet only.

## Current proof status

The UI build, TypeScript check, and lint pass locally. The contract has not yet been deployed or exercised against StudioNet in this environment. The GenLayer runtime/VecDB compatibility and live consensus path remain unverified.
