# Proof receipts

Verified files currently included:

- `deployment-receipt.json` — deployed address, transaction, source commit/hash and observed deployment result.
- `schema-receipt.json` — public methods and `resolve_case` write exposure.
- `live-case2-resolution-receipt.json` — case 2 finalized `APPROVED` with `memory_ids_json` equal to `[1]`.
- `browser-verification.json` — production Vercel route/read verification against the canonical contract.

Lifecycle receipts are included: `live-project-receipt.json`, `live-case-open-receipt.json`, `live-resolution-receipt.json`, `live-memory-receipt.json`, and `live-release-receipt.json`. They contain sanitized transaction and reread state only; no private keys, mnemonics, passwords, or private source material are included.
