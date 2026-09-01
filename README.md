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
- `npm test` — 11 passed in CI
- `npm run build` — PASS

GenLayer Direct Mode contract tests pass in clean Linux CI (`10 passed`). The Windows host still has a local loader error before contract instantiation. StudioNet deployment and the public contract schema are verified; signed lifecycle transactions remain unproven because the configured CLI keystore requires an unavailable password.

## Deployment evidence

The verified StudioNet contract is `0xEC50ef7Ff172376f027C31c7b270EF6c21870536`, deployed by transaction `0x0539f6983b5db294e704babdf108c29ecb19024c0ef45040cfa0e9549a9f9d97` from source commit `4c486adfeab789baba4c4f34bcd24cd0c9829159` (SHA-256 `3ce58788a8505fba515c87c5c5a763b8538b590d3d51b411a0b4a177ced0ccf9`). The deployed frontend is [localize-os.vercel.app](https://localize-os.vercel.app/) and was browser-verified as reachable with `LIVE` contract state. No lifecycle hashes are present in `proof/`; they are not claimed. See `DEPLOYMENT.md`, `SUBMISSION.md`, and `proof/`.

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
