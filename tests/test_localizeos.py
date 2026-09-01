import hashlib
import json
import pytest

STYLE = "https://example.com/style.txt"
GLOSSARY = "https://example.com/glossary.txt"
STYLE_DIGEST = hashlib.sha256(b"style").hexdigest()
GLOSSARY_DIGEST = hashlib.sha256(b"glossary").hexdigest()

def deploy(direct_deploy):
    return direct_deploy("contracts/localizeos.py", sdk_version="v0.2.16")

def create_project(contract):
    return contract.create_project("Acme", "en", STYLE, STYLE_DIGEST, GLOSSARY, GLOSSARY_DIGEST)

def test_public_lifecycle_views_and_project_creation(direct_vm, direct_deploy):
    contract = deploy(direct_deploy)
    project_id = create_project(contract)
    project = contract.get_project(project_id)
    assert project.name == "Acme"
    assert project.policy_version == 1
    assert str(project_id) in contract.list_projects()

def test_case_snapshot_and_placeholder_guard(direct_vm, direct_deploy):
    contract = deploy(direct_deploy)
    project_id = create_project(contract)
    case_id = contract.open_case(project_id, "fr", "delete", "Delete {name}", "settings", json.dumps(["Supprimer {name}", "Effacer {name}"]), "https://example.com/case", "a" * 64)
    case = contract.get_case(case_id)
    assert case.policy_version == 1
    assert case.style_digest == STYLE_DIGEST
    assert case.glossary_digest == GLOSSARY_DIGEST
    with pytest.raises(Exception):
        contract.open_case(project_id, "fr", "bad", "Delete {name}", "settings", json.dumps(["Supprimer"]), "https://example.com/case", "a" * 64)

def test_empty_release_and_duplicate_case_ids_fail(direct_vm, direct_deploy):
    contract = deploy(direct_deploy)
    project_id = create_project(contract)
    with pytest.raises(Exception):
        contract.seal_release(project_id, "fr", "https://example.com/release", "b" * 64, "[]")
