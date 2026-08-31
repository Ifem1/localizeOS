# LocalizeOS — Project Plan

## Mission

Build **LocalizeOS** into a complete contract + frontend product, using the specifications in this folder as the source of truth.

LocalizeOS keeps thousands of routine strings off-chain and uses GenLayer only for ambiguous, high-impact or disputed translations. Each accepted difficult translation becomes project-specific semantic memory keyed primarily by the English source string and context. Validators judge fidelity, terminology and tone against a versioned glossary/style guide. A locale release is sealed on-chain only when its escalated cases are resolved.

## MVP target

English source, two target locales, JSON/CSV import, off-chain routine strings, candidate-based escalation, project semantic memory, placeholder validation, glossary versioning and on-chain release seal.

## Planning principles

1. Do not build the UI first and retrofit a weak contract.
2. Do not build consensus before deterministic state/version/size guards.
3. Do not store high-frequency work on-chain simply because it is easy to model.
4. Do not turn VecDB into a classifier. It is context retrieval.
5. Do not call a deployment “done” until a real StudioNet lifecycle is exercised.
6. Do not create fake fallback data in live mode.
7. Every meaningful work unit updates `handoff.md` immediately.
8. When a durable decision changes, update `memory.md` in the same work unit.

## Reference demo the implementation must support

Import 40 strings, mark most as routine, escalate five ambiguous product terms with 2-3 candidates each, resolve them using glossary + semantic memory, then seal a locale release manifest on StudioNet.

## Phase 0 — Repository and truth scaffold

- Create the recommended repository tree.
- Copy these blueprint docs verbatim first; do not rewrite them from memory.
- Add package manifests with pinned baseline versions.
- Add `.env.example` with StudioNet variables and no secrets.
- Create a placeholder README that explicitly says not deployed yet.
- Initialize `handoff.md` workflow and commit.

**Exit gate:** All work is logged in `handoff.md`; relevant tests for this phase pass or the blocker is explicitly recorded.
## Phase 1 — Deterministic contract skeleton

- Add dependency header and imports.
- Implement storage dataclasses, enums and counters.
- Implement create/register deterministic methods and view methods.
- Implement all size, role, namespace and version guards.
- Write direct tests for creation, invalid inputs, ownership, pagination and forbidden transitions.

**Exit gate:** All work is logged in `handoff.md`; relevant tests for this phase pass or the blocker is explicitly recorded.
## Phase 2 — Semantic memory

- Add the project-specific `VectorPointer`.
- Implement normalized embedding text exactly around: Embed English source text + UI context + feature/module, not the target translation. Accepted cases are stored per project and locale. A new ambiguous source retrieves same-project examples expressing similar meaning so validators can see how the project historically translated the concept.
- Insert only invariant-approved records.
- Implement bounded KNN + namespace/version filters.
- Expose a preview view for testing/audit.
- Add tests proving a semantically related but out-of-namespace record cannot authorize anything.

**Exit gate:** All work is logged in `handoff.md`; relevant tests for this phase pass or the blocker is explicitly recorded.
## Phase 3 — Consensus path

- Define strict decision envelope and allowed enums.
- Implement leader logic for: Given source string, UI context, target locale, versioned glossary/style rules, candidate translations and retrieved approved examples, which submitted candidate (or ABSTAIN) best preserves meaning, terminology, placeholders and tone? Validators choose from bounded candidates; they cannot invent a new production string in MVP.
- Implement independent validator reasoning rather than format-only validation.
- Treat fetched evidence as hostile/untrusted data.
- Add deterministic post-consensus validation.
- Add explicit abstain/failure path.
- Forge incorrect leader outputs in tests and prove rejection.

**Exit gate:** All work is logged in `handoff.md`; relevant tests for this phase pass or the blocker is explicitly recorded.
## Phase 4 — Off-chain work plane

- Cloudflare Worker + D1 + R2. D1 stores strings, routine translation memory, assignments and comments. R2 stores screenshots and locale manifests. Server never signs; release seal is always browser wallet signed.
- Implement wallet challenge/verify if off-chain roles require identity.
- Implement immutable/public artifact bundle generation and digesting.
- Never add a server signer.
- Add upload/data bounds and content-type validation.
- Document retention/publicity policy.

**Exit gate:** All work is logged in `handoff.md`; relevant tests for this phase pass or the blocker is explicitly recorded.
## Phase 5 — GenLayer web client

- Implement config/client/read-client modules.
- Implement injected-wallet provider and network gate.
- Implement typed contract reads and schema verification.
- Implement write helper and FINALIZED + GenVM execution check.
- Implement one live/fixtures boundary; production live mode never silently falls back.

**Exit gate:** All work is logged in `handoff.md`; relevant tests for this phase pass or the blocker is explicitly recorded.
## Phase 6 — Distinct frontend

- Implement the visual archetype: professional CAT tool crossed with newspaper copy desk; two-column language composition.
- Build routes around domain records, not generic cards.
- Build the semantic-memory context view.
- Build the transaction rail and authoritative receipt.
- Implement responsive/mobile behavior.
- Implement all empty/error/abstain states from `ui/ux.md`.

**Exit gate:** All work is logged in `handoff.md`; relevant tests for this phase pass or the blocker is explicitly recorded.
## Phase 7 — Integration and adversarial testing

- Wire backend artifact bundle to contract submission.
- Verify every frontend-required contract method against schema.
- Run deterministic/direct suites.
- Run wallet-session regressions.
- Test malformed RPC/contract data.
- Test missing evidence, stale version and forged consensus output.
- Run production build/typecheck/lint.

**Exit gate:** All work is logged in `handoff.md`; relevant tests for this phase pass or the blocker is explicitly recorded.
## Phase 8 — StudioNet proof

- Deploy a frozen source commit to StudioNet.
- Record address and deployment tx.
- Verify deployed source/schema.
- Execute the reference demo with real transactions.
- Capture at least one live consensus success.
- Capture at least one fail-closed/abstain path where feasible.
- Re-read all final state from chain.
- Update handoff/memory with exact facts only.

**Exit gate:** All work is logged in `handoff.md`; relevant tests for this phase pass or the blocker is explicitly recorded.
## Phase 9 — Release hardening

- Deploy hosted frontend in live mode.
- Exercise one write from hosted UI.
- Audit all copy for fabricated/unproven claims.
- Confirm no generated/local private-key path exists.
- Confirm backend has no signer secret.
- Run accessibility/responsive pass.
- Freeze release tag/commit and create reviewer-oriented deployment evidence.

**Exit gate:** All work is logged in `handoff.md`; relevant tests for this phase pass or the blocker is explicitly recorded.


## Workstreams and ownership

| Workstream | Primary outputs | Release blocker? |
|---|---|---|
| Intelligent Contract | State machine, VecDB, consensus, views | Yes |
| Direct/testing | Invariants, forged leader rejection, ABI/schema | Yes |
| Off-chain plane | High-volume workflow + immutable bundles | Yes where architecture uses service |
| Web3 client | Injected wallet, reads/writes/finality | Yes |
| UI/UX | Domain-specific routes and states | Yes |
| StudioNet proof | Deployment + live transaction evidence | Yes |
| Documentation | Handoff, memory, deployment truth | Yes |

## Contract milestone checklist

- Implement and test `create_project(name, source_locale, style_url, style_digest, glossary_url, glossary_digest) -> project_id`.
- Implement and test `update_language_assets(project_id, style_url, style_digest, glossary_url, glossary_digest) -> policy_version`.
- Implement and test `open_case(project_id, locale, string_key, source_text, context_text, candidates_json, artifact_ref, artifact_digest) -> case_id`.
- Implement and test `resolve_case(case_id) -> approved candidate index`.
- Implement and test `supersede_case(case_id, replacement_case_id)`.
- Implement and test `seal_release(project_id, locale, manifest_url, manifest_digest, required_case_ids_json) -> release_id`.
- Implement and test `get_case(case_id)`.
- Implement and test `get_release(release_id)`.
- Implement and test `preview_memory(case_id, k)`.

## Invariant checklist

- Test: Approved translation must equal one submitted bounded candidate.
- Test: Placeholders/ICU tokens must be preserved by deterministic validation before consensus.
- Test: Case is pinned to glossary/style policy version.
- Test: Only APPROVED cases may enter semantic memory.
- Test: Release cannot seal while a required escalated case is unresolved.
- Test: Release manifest digest is immutable.

## UX milestone checklist

- Build and verify: Bilingual editor.
- Build and verify: String queue.
- Build and verify: Context preview.
- Build and verify: Glossary/style drawer.
- Build and verify: Semantic memory rail.
- Build and verify: Disagreement desk.
- Build and verify: Release checklist.
- Build and verify: Locale release receipt.

## Risk register

| Risk | Early signal | Mitigation |
|---|---|---|
| Consensus prompts too large | timeouts/rotation spikes | lower KNN/evidence bounds; split cases |
| VecDB namespace contamination | irrelevant candidates | deterministic namespace/version filters |
| Backend becomes de facto authority | UI trusts DB status | chain re-read is authoritative after every final action |
| Wrong-chain wallet writes | user wallet not 61999 | write gate in UI and client helper |
| Finalized rollback shown as success | receipt-only logic | inspect GenVM execution |
| UI drifts generic | component-kit/default template | enforce `ui/ux.md` screenshot review |
| Public evidence disappears | validator fetch failures | immutable/content-addressed refs + abstain |
| Runtime API differs from plan | compile/lint/integration failure | verify current SDK, log exact change, do not invent API |
| Overclaim in README | branch only unit-tested | proof table distinguishes direct vs live |

## Project-specific edge-case backlog

- Candidate translates meaning well but breaks placeholder syntax: deterministic reject before consensus.
- Glossary update after case opens: old case stays bound to old policy; new case required if re-review desired.
- Two semantic memories disagree because policy changed; policy version displayed and current-version memory prioritized.
- Locale uses right-to-left script; editor layout mirrors text area but keeps controls stable.
- All candidates are poor; ABSTAIN rather than force selection.

## Definition of complete

The project is complete only when:

- the MVP flow works end to end;
- the contract is deployed on StudioNet;
- at least one real consensus path is proven;
- the frontend is wired to that contract;
- injected wallet is the only write mechanism;
- contract reads are authoritative;
- direct and frontend checks pass;
- UI is recognizably distinct;
- evidence and VecDB behavior are bounded;
- `memory.md` and `handoff.md` contain the exact final state.
