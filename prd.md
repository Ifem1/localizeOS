# LocalizeOS — Product Requirements Document (PRD)

## 1. Product summary

**Consensus translation memory and release sealing for product localization.**

LocalizeOS keeps thousands of routine strings off-chain and uses GenLayer only for ambiguous, high-impact or disputed translations. Each accepted difficult translation becomes project-specific semantic memory keyed primarily by the English source string and context. Validators judge fidelity, terminology and tone against a versioned glossary/style guide. A locale release is sealed on-chain only when its escalated cases are resolved.

The product uses a deliberate operating model:

1. high-frequency domain work happens off-chain;
2. a bounded, immutable/public artifact or case is frozen;
3. the Intelligent Contract retrieves only relevant semantic memory;
4. validators judge the semantic question independently;
5. deterministic contract code decides whether/how authoritative state changes.

## 2. Problem

The product must settle:

> **a canonical translation for escalated strings plus a locale-release manifest seal**

The problem is not that a backend cannot produce an answer. A backend can. The problem is that when multiple parties care about the final result, letting one operator/model author the authoritative state reintroduces the trust assumption GenLayer is meant to remove.

## 3. Why GenLayer is load-bearing

Delete GenLayer and the system loses at least one of:

- independent access to public evidence;
- independent semantic judgment;
- agreement on decision-critical meaning;
- a shared immutable result other contracts can consume.

VecDB alone does not fix this. Similarity only identifies relevant history.

## 4. Goals

- Fast normal workflow off-chain.
- Explicit escalation to shared judgment.
- Project-owned semantic institutional memory.
- Version-bound rules/evidence.
- Deterministic, inspectable state changes.
- Composable final receipts.
- Distinct domain-specific user experience.
- Honest failure/abstain states.
- Real StudioNet deployment proof before release claims.

## 5. Non-goals

- machine-translating every string with GenLayer
- using target-language embeddings as a requirement
- private customer strings
- letting LLM invent unseen candidate in MVP
- full translation-management billing

## 6. Actors

| Actor | Role |
| --- | --- |
| localization manager | Participates in the domain workflow; exact authorization is defined in TRD/contract state. |
| translator | Participates in the domain workflow; exact authorization is defined in TRD/contract state. |
| reviewer | Participates in the domain workflow; exact authorization is defined in TRD/contract state. |
| product engineer | Participates in the domain workflow; exact authorization is defined in TRD/contract state. |
| GenLayer validator | Participates in the domain workflow; exact authorization is defined in TRD/contract state. |
| release consumer | Participates in the domain workflow; exact authorization is defined in TRD/contract state. |

## 7. Scope split

### Off-chain

Routine translations, exact translation-memory matches, comments, screenshots, bulk import/export and locale files. The source locale for MVP is English to keep embeddings on source/context predictable.

### On-chain

Project glossary/style fingerprints; escalated string cases; approved difficult translations; source/context semantic memory; release manifests; contributor decision receipts.

### Semantic memory

Embed English source text + UI context + feature/module, not the target translation. Accepted cases are stored per project and locale. A new ambiguous source retrieves same-project examples expressing similar meaning so validators can see how the project historically translated the concept.

### Consensus question

Given source string, UI context, target locale, versioned glossary/style rules, candidate translations and retrieved approved examples, which submitted candidate (or ABSTAIN) best preserves meaning, terminology, placeholders and tone? Validators choose from bounded candidates; they cannot invent a new production string in MVP.

## 8. MVP

English source, two target locales, JSON/CSV import, off-chain routine strings, candidate-based escalation, project semantic memory, placeholder validation, glossary versioning and on-chain release seal.

The MVP is not considered complete until a hosted frontend performs the critical path against a real StudioNet deployment.

## 9. User stories

- As a **localization manager**, I can configure the authoritative rules/charter and see exactly which version every case uses.
- As a **translator**, I can perform normal work off-chain and escalate only the bounded cases that need shared judgment.
- As a **reviewer**, I can inspect the public evidence and related semantic history without treating similarity as truth.
- As a **product engineer**, I receive bounded, versioned inputs and can reject a semantically wrong leader decision.
- As an external integrator, I can read a typed final receipt without trusting the backend or scraping rationale prose.

## 10. Lifecycle

Product statuses:

- ROUTINE_OFFCHAIN
- ESCALATED
- PENDING
- APPROVED
- ABSTAINED
- SUPERSEDED
- RELEASE_SEALED

Generic lifecycle:

```text
normal off-chain work
 -> freeze bounded public artifact/case
 -> on-chain submit
 -> deterministic preflight
 -> bounded semantic retrieval
 -> consensus
 -> deterministic validation/state transition
 -> finalized receipt
 -> frontend authoritative re-read
```

## 11. Product surfaces

| Route | Product surface | Primary action |
| --- | --- | --- |
| / | Bilingual editor | Translate/select string |
| /queue | String queue | Open string |
| /strings/[key] | Context preview | Save/off-chain approve/escalate |
| /policy | Glossary/style drawer | Publish policy version |
| /cases/[id] | Disagreement desk | Run resolution |
| /releases | Release checklist | Seal release |
| /releases/[id] | Locale release receipt | Copy manifest receipt |

The visual composition for each route is specified in `ui/ux.md`.

## 12. Functional requirements

### FR-1 — Public browsing

Where a record is public, the user can inspect it without connecting a wallet.

### FR-2 — Explicit wallet identity

Wallet connection occurs only after user action. Production writes are injected-wallet only and network-gated.

### FR-3 — Versioned top-level configuration

Rules/charter/rubric/manifests that affect a decision are versioned and visible in the resulting receipt.

### FR-4 — Off-chain work plane

Routine/high-volume work does not require one transaction per action.

### FR-5 — Immutable escalation

Before chain submission, the user can inspect the exact bounded artifact/reference/digest being committed. Editing afterward produces a new digest/version.

### FR-6 — Related-memory preview

The product can show relevant semantic memories, clearly labeled as related context.

### FR-7 — Consensus trigger

The eligible actor can trigger the project-specific review. Long-running consensus is represented as stages, not fake percentage progress.

### FR-8 — Fail closed

Unavailable evidence, malformed outputs, stale state or validator disagreement cannot silently become a positive decision.

### FR-9 — Authoritative receipt

A final receipt includes record ID, contract/network, input version/digests, memory IDs, decision-critical output, tx/finality and resulting state.

### FR-10 — Append-only history

Historical decisions remain inspectable after later versions/corrections.

### FR-11 — Integrator surface

Stable view methods expose machine-readable final status.

## 13. Product-specific contract capabilities

- create_project(name, source_locale, style_url, style_digest, glossary_url, glossary_digest) -> project_id
- update_language_assets(project_id, style_url, style_digest, glossary_url, glossary_digest) -> policy_version
- open_case(project_id, locale, string_key, source_text, context_text, candidates_json, artifact_ref, artifact_digest) -> case_id
- resolve_case(case_id) -> approved candidate index
- supersede_case(case_id, replacement_case_id)
- seal_release(project_id, locale, manifest_url, manifest_digest, required_case_ids_json) -> release_id
- get_case(case_id)
- get_release(release_id)
- preview_memory(case_id, k)

## 14. Product-specific rules

- Approved translation must equal one submitted bounded candidate.
- Placeholders/ICU tokens must be preserved by deterministic validation before consensus.
- Case is pinned to glossary/style policy version.
- Only APPROVED cases may enter semantic memory.
- Release cannot seal while a required escalated case is unresolved.
- Release manifest digest is immutable.

## 15. Public evidence requirements

- HTTPS/content-addressed and validator-accessible.
- Digest/version bound.
- Bounded before prompt construction.
- Treated as untrusted data.
- No private secrets in chain/VecDB.
- Unavailable source produces no invented positive result.

## 16. Primary demo fixture

String `Delete workspace` in a destructive settings dialog with candidates in French/Spanish; another memory for `Remove project permanently` provides related terminology but must not be treated as identical.

The fixture should seed local UI/direct tests. It is not proof until a corresponding live StudioNet path is executed.

## 17. Required edge behavior

- Candidate translates meaning well but breaks placeholder syntax: deterministic reject before consensus.
- Glossary update after case opens: old case stays bound to old policy; new case required if re-review desired.
- Two semantic memories disagree because policy changed; policy version displayed and current-version memory prioritized.
- Locale uses right-to-left script; editor layout mirrors text area but keeps controls stable.
- All candidates are poor; ABSTAIN rather than force selection.

## 18. UX requirements

UI identity:

- **Archetype:** professional CAT tool crossed with newspaper copy desk; two-column language composition
- **Signature:** Source and target columns align line-by-line like parallel text. Placeholders are treated as typographic tokens. Semantic memories appear as narrow editorial clippings pinned to the right margin.
- **Fonts:** Noto Sans for multilingual coverage; Noto Sans Mono for placeholders/keys; Newsreader for release headings
- **Geometry:** split panes, baseline grid, 4px radius, strong typographic hierarchy; no dashboard cards
- **Motion:** cursor/selection transitions only; release sealing uses a single press-stamp animation

The wallet must remain utility chrome. The main artifact/work object dominates.

## 19. Security requirements

1. Backend never signs GenLayer writes.
2. Wrong-chain writes are blocked both in UI and client helper.
3. Finalized rollback/error is not success.
4. Unknown RPC/contract shape fails closed.
5. Prompt-injection-like fetched content cannot alter governing rules.
6. Similarity cannot directly authorize state.
7. Stale versions cannot mutate newer state.
8. Decision enums/IDs are deterministically bounded.
9. Public storage contains no secrets/private source material.
10. No live-mode fabricated fallback.

## 20. Success metrics

- 100% of writes injected-wallet signed.
- 100% final successes verified through GenVM execution + authoritative re-read.
- 0 silent fixture fallback in live mode.
- 0 VecDB distance displayed as truth/confidence.
- 100% final decisions expose input versions/digests.
- One happy-path and one fail-closed/abstain path demonstrated before release.
- Fresh agent can implement from this pack + repository files without prior chat context.

## 21. Acceptance criteria

- [ ] Contract state/API implements the intended domain lifecycle.
- [ ] Direct tests cover every invariant.
- [ ] VecDB insert/retrieval rules are tested.
- [ ] Validator rejects a well-formed wrong leader payload in direct mode where tooling permits.
- [ ] Off-chain service cannot author chain truth.
- [ ] Hosted UI follows `ui/ux.md`.
- [ ] Hosted UI reads deployed StudioNet state.
- [ ] Contract schema verified.
- [ ] StudioNet consensus path proven.
- [ ] Wallet/network regressions tested.
- [ ] Deployment facts recorded in `handoff.md`/`memory.md`.
- [ ] README/submission copy distinguishes live proof from direct-test coverage.

## 22. Reference end-to-end demo

Import 40 strings, mark most as routine, escalate five ambiguous product terms with 2-3 candidates each, resolve them using glossary + semantic memory, then seal a locale release manifest on StudioNet.
