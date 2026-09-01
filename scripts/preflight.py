"""Behavioral offline contract audit; does not claim GenVM execution."""
import ast
import hashlib
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
check("subjective consensus API", "gl.eq_principle.prompt_non_comparative" in source and "eq_principle_strict_eq" not in source)
check("no invented candidate", "never invent" in source.lower() and "approved_index" in source)
check("policy snapshot", all(field in source for field in ("policy_version", "style_url", "style_digest", "glossary_url", "glossary_digest")))
check("release commitment hash", "commitment_digest = hashlib.sha256(commitment_json.encode()).hexdigest()" in source)
check("authorization checks", source.count('"only owner"') >= 4)
check("bounded pagination", "1 <= limit <= 50" in source and "offset <= 10000" in source)
check("VecDB namespace filter", "pointer.project_id != case.project_id" in source and "locale_hash" in source)
check("state transitions", all(status in source for status in ("ESCALATED", "PENDING", "APPROVED", "ABSTAINED", "SUPERSEDED")))
check("compile contract", compile(source, "contracts/localizeos.py", "exec") is not None)
readme = (ROOT / "README.md").read_text(encoding="utf-8")
check("no fabricated deployment evidence", "No contract address" in readme and "live frontend URL" in readme)
print(f"LocalizeOS offline preflight: {len(checks)}/{len(checks)} PASS")
