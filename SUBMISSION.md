# LocalizeOS submission status

## Verified deployment

- Frontend: https://localize-os.vercel.app/
- Network: GenLayer StudioNet
- Chain ID: `61999`
- RPC: `https://studio.genlayer.com/api`
- Contract: `0xEC50ef7Ff172376f027C31c7b270EF6c21870536`
- Deployment transaction: `0x0539f6983b5db294e704babdf108c29ecb19024c0ef45040cfa0e9549a9f9d97`
- Tested source commit: `4c486adfeab789baba4c4f34bcd24cd0c9829159`
- Contract source SHA-256: `3ce58788a8505fba515c87c5c5a763b8538b590d3d51b411a0b4a177ced0ccf9`
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

No signed project, policy, case, resolution, VecDB, supersession or release lifecycle transaction hashes are present in `proof/`. The available proof files are `proof/deployment-receipt.json` and `proof/schema-receipt.json`. Therefore lifecycle completion and live VecDB/release state are not claimed.
