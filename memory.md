# LocalizeOS — Project Memory

> This is a **repository-local project memory file**, not model/session memory. Agents should read it from disk. Keep it concise enough to scan, but update it whenever a durable decision changes.

## Project identity

**Name:** LocalizeOS  
**Tagline:** Consensus translation memory and release sealing for product localization.  
**Core thesis:** LocalizeOS keeps thousands of routine strings off-chain and uses GenLayer only for ambiguous, high-impact or disputed translations. Each accepted difficult translation becomes project-specific semantic memory keyed primarily by the English source string and context. Validators judge fidelity, terminology and tone against a versioned glossary/style guide. A locale release is sealed on-chain only when its escalated cases are resolved.

### What the system ultimately settles

a canonical translation for escalated strings plus a locale-release manifest seal

### Core actors

- localization manager
- translator
- reviewer
- product engineer
- GenLayer validator
- release consumer

## Current status

**Phase:** Documentation / pre-implementation blueprint  
**Code status:** Not started in this pack  
**StudioNet contract:** Not deployed yet  
**Live frontend:** Not deployed yet  
**Last durable update:** 2026-08-23

The first implementing agent must not invent fake deployment addresses, transaction hashes, test counts or live URLs. Add them here only after they exist and have been verified.

## Non-negotiable product boundary

### Off-chain

Routine translations, exact translation-memory matches, comments, screenshots, bulk import/export and locale files. The source locale for MVP is English to keep embeddings on source/context predictable.

### On-chain

Project glossary/style fingerprints; escalated string cases; approved difficult translations; source/context semantic memory; release manifests; contributor decision receipts.

### Semantic memory

Embed English source text + UI context + feature/module, not the target translation. Accepted cases are stored per project and locale. A new ambiguous source retrieves same-project examples expressing similar meaning so validators can see how the project historically translated the concept.

### Consensus question

Given source string, UI context, target locale, versioned glossary/style rules, candidate translations and retrieved approved examples, which submitted candidate (or ABSTAIN) best preserves meaning, terminology, placeholders and tone? Validators choose from bounded candidates; they cannot invent a new production string in MVP.

## Frozen engineering defaults

- StudioNet chain ID: `61999`
- RPC: `https://studio.genlayer.com/api`
- Explorer: `https://explorer-studio.genlayer.com`
- `genlayer-js`: `1.1.8`
- Next.js: `16.3.2`
- React: `19.2.4`
- React DOM: `19.2.4`
- TypeScript: `^5`
- Tailwind: `^4`
- Writes: injected EIP-1193 wallet only
- Backend signer: forbidden
- Vector model baseline: `all-MiniLM-L6-v2` / 384 dimensions
- Similarity semantics: retrieval only
- Live data: no silent fixture fallback
- Finality: wait for FINALIZED, then inspect GenVM execution before success

## Contract invariants

- Approved translation must equal one submitted bounded candidate.
- Placeholders/ICU tokens must be preserved by deterministic validation before consensus.
- Case is pinned to glossary/style policy version.
- Only APPROVED cases may enter semantic memory.
- Release cannot seal while a required escalated case is unresolved.
- Release manifest digest is immutable.

## Scope lock

### MVP

English source, two target locales, JSON/CSV import, off-chain routine strings, candidate-based escalation, project semantic memory, placeholder validation, glossary versioning and on-chain release seal.

### Explicit non-goals

- machine-translating every string with GenLayer
- using target-language embeddings as a requirement
- private customer strings
- letting LLM invent unseen candidate in MVP
- full translation-management billing

## Known edge cases to preserve during implementation

- Candidate translates meaning well but breaks placeholder syntax: deterministic reject before consensus.
- Glossary update after case opens: old case stays bound to old policy; new case required if re-review desired.
- Two semantic memories disagree because policy changed; policy version displayed and current-version memory prioritized.
- Locale uses right-to-left script; editor layout mirrors text area but keeps controls stable.
- All candidates are poor; ABSTAIN rather than force selection.

## UI identity

- Archetype: **professional CAT tool crossed with newspaper copy desk; two-column language composition**
- Signature: Source and target columns align line-by-line like parallel text. Placeholders are treated as typographic tokens. Semantic memories appear as narrow editorial clippings pinned to the right margin.
- Fonts: Noto Sans for multilingual coverage; Noto Sans Mono for placeholders/keys; Newsreader for release headings
- Geometry: split panes, baseline grid, 4px radius, strong typographic hierarchy; no dashboard cards
- Motion: cursor/selection transitions only; release sealing uses a single press-stamp animation

Do not let implementation drift into a generic centered hero + three cards + gradient dashboard. `ui/ux.md` is authoritative.

## Decision log

| Date | Decision | Reason | Supersedes |
|---|---|---|---|
| 2026-08-23 | Keep high-volume activity off-chain and settle bounded authoritative state on GenLayer. | Mirrors the project's central off-chain-work/on-chain-settlement thesis and keeps consensus purposeful. | — |
| 2026-08-23 | Use contract-owned VecDB as semantic recall, never as an automatic verdict. | Similarity is relatedness, not truth. | — |
| 2026-08-23 | Injected wallet is the only write identity. | Matches existing hardened repository behavior and avoids hidden custody. | — |
| 2026-08-23 | Fail closed on missing public evidence or malformed consensus output. | A weak answer must not silently become authoritative state. | — |
| 2026-08-23 | UI follows the project-specific design language in `ui/ux.md`. | The ten projects must be visually and structurally distinct. | — |

## Source conventions inherited from existing repositories

The implementation plan intentionally follows proven patterns from these owner repositories:

- `ometere123/intent-guard/package.json` — `genlayer-js` 1.1.8, Next.js 16.3.2, React 19.2.4.
- `ometere123/intent-guard/src/components/wallet-provider.tsx` — explicit injected wallet flow, network gating and wallet event handling.
- `ometere123/intent-guard/src/lib/genlayer/contract.ts` — wait for FINALIZED, re-read transaction and inspect GenVM execution.
- `ometere123/scopelock/contracts/scopelock.py` — native `genlayer_embeddings.VecDB`, 384-dimensional `all-MiniLM-L6-v2`, bounded KNN precedent retrieval.
- Owner research, *GenLayer VectorDB + Vector Embeddings* (Aug 2026) — embeddings provide semantic representation, VecDB persistent semantic memory/search, consensus judges meaning; embeddings are not truth or encryption.

## Open decisions

These are allowed to be decided during implementation, but must be recorded here when settled:

- Exact deployed contract address and deployment source commit.
- Exact public hosting URL.
- Final object-store/database provider if the selected default in `architecture.md` proves unsuitable.
- Whether a second network besides StudioNet is supported after the StudioNet proof is complete.
- Performance limits discovered for the project's actual VecDB population and KNN size.

## Agent continuity rule

At the end of every work session:

1. Ensure `handoff.md` has the most recent factual state.
2. Update this file only for durable decisions/status changes.
3. Do not paste long implementation logs here; keep those in `handoff.md`.
4. Never record secrets, private keys, seed phrases or private source material.
