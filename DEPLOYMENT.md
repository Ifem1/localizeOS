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
- Contract: `0x3E1f2FaFd5a8829885876CdCAdA7e8166bd86482`
- Deployment transaction: `0x66abe234d85eba714c165c1925b24a2a9e7d60582555a83eb5e508be55d93855`
- Tested source commit: `468d406`
- Source SHA-256: `c51413151ce3e5bc5ce8cf61de86d654a0a97fce0488521043b9388288a2d3e0`
- Public schema verified through `gen_getContractSchema`; `resolve_case` is exposed as a write.

The Vercel site was browser-verified as reachable and reporting `LIVE`. Signed lifecycle receipts are included under `proof/`.

The verified lifecycle includes project creation `0x59f360001a97f1d7c538954da4cccc66e2e5ce7dca849fa53702cc6fea807099`, case opening `0xdf98d93ea04b2c9e96dd5caaa82b4097b441e420614666ecd06057c4ed3689a6`, finalized approval `0x6a2ad25c19e08f3b025f04bb7ad1c10bb0f7c647259dec014bc74c5c47d2ee72`, memory preview of case 1 from case 2, and release sealing `0x2e379e3f529ed22b4a2eecf1503ed1c37474b25c30be664a21da2a4cf55a9eb5`.
