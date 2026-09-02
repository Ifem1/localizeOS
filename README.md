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

## Verification status

Verified:

- `python scripts/preflight.py` — PASS
- `python -m pytest tests/direct -q` — 4 passed
- `npm run typecheck` — PASS
- `npm run lint` — PASS
- `npm test` — 16 passed in CI
- `npm run build` — PASS

GenLayer Direct Mode contract tests pass in clean Linux CI (`11 passed`). StudioNet deployment and the public contract schema are verified, and signed lifecycle evidence is recorded under `proof/`.

## Deployment evidence

The verified StudioNet contract is `0x3E1f2FaFd5a8829885876CdCAdA7e8166bd86482`, deployed by transaction `0x66abe234d85eba714c165c1925b24a2a9e7d60582555a83eb5e508be55d93855` from source commit `468d406d2900da26253e0852421c14ea99e7a188` (SHA-256 `c51413151ce3e5bc5ce8cf61de86d654a0a97fce0488521043b9388288a2d3e0`). The deployed frontend is [localize-os.vercel.app](https://localize-os.vercel.app/) and browser-verified against this contract for live reads. Live project, case, approval, memory-preview and release evidence is recorded under `proof/`. See `DEPLOYMENT.md`, `SUBMISSION.md`, and `proof/`.

## Clean-checkout commands

```powershell
git clone https://github.com/Ifem1/localizeOS.git
cd localizeOS
python -m pip install -r requirements-dev.txt
python scripts/preflight.py
gltest
cd apps/web
npm ci
npm run typecheck
npm run lint
npm test
npm run build
npm audit --omit=dev
```
