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

Verified locally:

- `python scripts/preflight.py` — PASS
- `python -m pytest tests/direct -q` — 4 passed
- `npm run typecheck` — PASS
- `npm run lint` — PASS
- `npm test` — 1 passed
- `npm run build` — PASS

GenLayer Direct Mode contract tests are included in `tests/test_localizeos.py`, but currently fail before contract instantiation on this Windows host with `genlayer.py.calldata.DecodingError: unexpected end of memory` while the Direct Mode loader reads injected stdin. StudioNet deployment likewise remains unproven because the RPC request returned `fetch failed`.

## Deployment evidence

No contract address, deployment transaction, lifecycle transaction hashes, explorer links, or live frontend URL are recorded yet. These fields must remain empty until independently verified. See `DEPLOYMENT.md`, `SUBMISSION.md`, and `proof/README.md`.

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
