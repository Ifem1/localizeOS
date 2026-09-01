# LocalizeOS deployment

The contract target is StudioNet (`61999`, `https://studio.genlayer.com/api`). Use the official GenLayer CLI and an isolated development account; never expose its secret material.

```powershell
npm install -g genlayer
genlayer network set studionet
genlayer account show
# Deploy through GenLayer Studio's Run and Debug flow using contracts/localizeos.py.
```

The deployment transaction and public schema are recorded in `proof/deployment-receipt.json` and `proof/schema-receipt.json`. The deployed frontend is https://localize-os.vercel.app/.
## Verified deployment

- Network: StudioNet, chain 61999
- Contract: `0xEC50ef7Ff172376f027C31c7b270EF6c21870536`
- Deployment transaction: `0x0539f6983b5db294e704babdf108c29ecb19024c0ef45040cfa0e9549a9f9d97`
- Tested source commit: `4c486adfeab789baba4c4f34bcd24cd0c9829159`
- Source SHA-256: `3ce58788a8505fba515c87c5c5a763b8538b590d3d51b411a0b4a177ced0ccf9`
- Public schema verified through `gen_getContractSchema`; `resolve_case` is exposed as a write.

The Vercel site was browser-verified as reachable and reporting `LIVE`. No signed lifecycle transaction receipts are present in this repository, so project creation through release sealing remains unclaimed.
