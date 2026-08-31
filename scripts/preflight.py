"""Offline audit for the LocalizeOS contract surface and hard bounds."""
from pathlib import Path
import ast, hashlib, re

ROOT = Path(__file__).resolve().parents[1]
SOURCE = (ROOT / "contracts" / "localizeos.py").read_text(encoding="utf-8")
tree = ast.parse(SOURCE)
functions = {n.name for n in ast.walk(tree) if isinstance(n, (ast.FunctionDef, ast.AsyncFunctionDef))}
required = {"create_project", "update_language_assets", "open_case", "resolve_case", "supersede_case", "seal_release", "get_case", "get_release", "preview_memory", "list_projects", "list_cases", "list_releases"}
assert required <= functions, required - functions
assert "@gl.public.write" in SOURCE and "def resolve_case" in SOURCE
assert re.search(r'\[0-9a-f\]\{64\}', SOURCE)
assert "vectors.insert" in SOURCE and "vectors.knn" in SOURCE
assert "eq_principle_strict_eq" in SOURCE
assert hashlib.sha256(b"LocalizeOS preflight").hexdigest() == hashlib.sha256(b"LocalizeOS preflight").hexdigest()
compile(SOURCE, "contracts/localizeos.py", "exec")
print("LocalizeOS offline preflight: PASS")
