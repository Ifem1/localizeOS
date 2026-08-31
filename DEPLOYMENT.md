# LocalizeOS deployment

The contract target is StudioNet (`61999`, `https://studio.genlayer.com/api`). Use the official GenLayer CLI and an isolated development account; never expose its secret material.

```powershell
npm install -g genlayer
genlayer network set studionet
genlayer account show
# Deploy through GenLayer Studio's Run and Debug flow using contracts/localizeos.py.
```

Deployment is not recorded as complete until the transaction is finalized, GenVM execution is successful, the deployed source matches the committed source, and the lifecycle is exercised. No live address or transaction is recorded yet because the current RPC attempt returned `fetch failed`.
