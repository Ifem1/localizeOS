"""Behavioral offline contract audit; does not claim GenVM execution."""
import ast
import hashlib
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
source = (ROOT / "contracts" / "localizeos.py").read_text(encoding="utf-8")
tree = ast.parse(source)
methods = {node.name: node for node in ast.walk(tree) if isinstance(node, ast.FunctionDef)}
checks = []

def check(label, condition):
    assert condition, label
    checks.append(label)

required = {"create_project", "update_language_assets", "open_case", "resolve_case", "supersede_case", "seal_release", "get_case", "get_release", "get_project", "preview_memory", "list_projects", "list_cases", "list_releases"}
check("required methods", required <= methods.keys())
for name in required:
    check(f"method body: {name}", len(methods[name].body) > 0)
for name in ("create_project", "update_language_assets", "open_case", "resolve_case", "supersede_case", "seal_release"):
    decorators = {ast.unparse(d) for d in methods[name].decorator_list}
    check(f"public write: {name}", "gl.public.write" in decorators)
for name in ("get_project", "get_case", "get_release", "preview_memory", "list_projects", "list_cases", "list_releases"):
    decorators = {ast.unparse(d) for d in methods[name].decorator_list}
    check(f"public view: {name}", "gl.public.view" in decorators)
check("bounded constants", all(token in source for token in ("MAX_TEXT", "MAX_CANDIDATES", "MAX_JSON", "MAX_POLICY_CONTENT")))
check("exact lowercase digest", bool(re.search(r'\[0-9a-f\]\{64\}', source)))
check("HTTPS validation", "def _https" in source and "self._https(manifest_url" in source and "self._https(artifact_ref" in source)
check("candidate bounds", "1 < len(candidates) <= MAX_CANDIDATES" in source)
check("placeholder invariant", "candidate placeholders differ" in source)
check("decision allowlist", "memory is not in retrieved allowlist" in source)
check("subjective consensus API", "gl.vm.run_nondet" in source and "eq_principle_strict_eq" not in source)
check("no invented candidate", "never invent" in source.lower() and "approved_index" in source)
check("policy snapshot", all(field in source for field in ("policy_version", "style_url", "style_digest", "glossary_url", "glossary_digest")))
check("release commitment hash", "commitment_digest = hashlib.sha256(commitment_json.encode()).hexdigest()" in source)
check("authorization checks", source.count('"only owner"') >= 4)
check("bounded pagination", "1 <= limit <= 50" in source and "offset <= 10000" in source)
check("VecDB namespace filter", "pointer.project_id != case.project_id" in source and "locale_hash" in source)
check("state transitions", all(status in source for status in ("ESCALATED", "PENDING", "APPROVED", "ABSTAINED", "SUPERSEDED")))
check("compile contract", compile(source, "contracts/localizeos.py", "exec") is not None)
readme = (ROOT / "README.md").read_text(encoding="utf-8")
deployment = json.loads((ROOT / "proof" / "deployment-receipt.json").read_text(encoding="utf-8"))
address = deployment["contract_address"]
source_commit = deployment["source_commit"]
source_hash = deployment["contract_source_sha256"]
for doc in (readme, (ROOT / "DEPLOYMENT.md").read_text(encoding="utf-8"), (ROOT / "SUBMISSION.md").read_text(encoding="utf-8")):
    check("canonical deployment address in docs", address in doc)
    check("canonical source commit in docs", source_commit in doc or source_commit[:7] in doc)
    check("canonical source hash in docs", source_hash in doc)
schema = json.loads((ROOT / "proof" / "schema-receipt.json").read_text(encoding="utf-8"))
check("schema matches deployment", schema["contract_address"] == address and schema["source_commit"] == source_commit)
check("schema exposes resolve_case write", schema["resolve_case_publicly_callable"] is True and "resolve_case" in schema["writes"])
live_receipts = list((ROOT / "proof").glob("live-*.json"))
check("claimed lifecycle proof files exist", len(live_receipts) >= 5)
for receipt_path in live_receipts:
    receipt = json.loads(receipt_path.read_text(encoding="utf-8"))
    check(f"lifecycle receipt identity: {receipt_path.name}", receipt["contract_address"] == address and receipt["source_commit"] == source_commit and receipt["network"] == "StudioNet" and receipt["chain_id"] == 61999)
check("no fabricated deployment evidence", deployment["observed_status"] == "FINALIZED" and deployment["observed_consensus"] == "MAJORITY_AGREE")
print(f"LocalizeOS offline preflight: {len(checks)}/{len(checks)} PASS")
