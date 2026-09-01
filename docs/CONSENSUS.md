# Consensus

`resolve_case` retrieves bounded same-project/same-locale approved memory, fetches the immutable case policy URLs, verifies exact lowercase SHA-256 digests, and asks validators to select one submitted candidate or `ABSTAIN`. User and fetched text are untrusted evidence.

The subjective review uses `gl.eq_principle.prompt_non_comparative`, which
lets validators independently assess the proposed bounded JSON envelope without
requiring free-form rationale text to be byte-identical. Deterministic
post-consensus validation rejects extra keys, invalid indexes, invented memory
IDs, malformed output, and placeholder changes.
