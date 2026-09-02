# LocalizeOS submission status

## Verified deployment

- Frontend: https://localize-os.vercel.app/
- Network: GenLayer StudioNet
- Chain ID: `61999`
- RPC: `https://studio.genlayer.com/api`
- Contract: `0x3E1f2FaFd5a8829885876CdCAdA7e8166bd86482`
- Deployment transaction: `0x66abe234d85eba714c165c1925b24a2a9e7d60582555a83eb5e508be55d93855`
- Tested source commit: `468d406`
- Contract source SHA-256: `c51413151ce3e5bc5ce8cf61de86d654a0a97fce0488521043b9388288a2d3e0`
- GitHub Actions: [33560572674](https://github.com/Ifem1/localizeOS/actions/runs/33560572674), green

## Verification

- GenVM lint and SDK validation: PASS
- Behavioral preflight: `43/43 PASS`
- Direct Mode contract tests: `10 passed`
- Frontend tests: `11 passed`
- Frontend typecheck, lint, production build and audit: PASS
- Public schema: verified; `resolve_case` is exposed as a write.
- Browser smoke check: frontend routes loaded and homepage reported `LIVE`; the deployed contract returned an empty project list.

## Lifecycle evidence

Signed lifecycle evidence is recorded in `proof/live-project-receipt.json`, `proof/live-case-open-receipt.json`, `proof/live-resolution-receipt.json`, `proof/live-memory-receipt.json`, and `proof/live-release-receipt.json`. Case 1 was approved, case 1 was retrieved through live memory preview for case 2, and a release was sealed and reread.
