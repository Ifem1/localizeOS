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

def open_case(contract, project_id):
    return contract.open_case(
        project_id, "fr", "delete", "Delete {name}", "settings",
        json.dumps(["Supprimer {name}", "Effacer {name}"]),
        "https://example.com/case", "a" * 64,
    )

def mock_policy_and_decision(vm, decision):
    vm.mock_web("style.txt", {"status": 200, "body": "style"})
    vm.mock_web("glossary.txt", {"status": 200, "body": "glossary"})
    vm.mock_llm("localization reviewer", json.dumps({
        "decision": decision, "memory_ids": [], "reason": "bounded review"
    }))

def test_resolution_approval_and_repeat_resolution_rejected(direct_vm, direct_deploy):
    contract = deploy(direct_deploy)
    project_id = create_project(contract)
    case_id = open_case(contract, project_id)
    mock_policy_and_decision(direct_vm, 0)
    assert contract.resolve_case(case_id) == "APPROVED"
    assert contract.get_case(case_id).approved_index == 0
    with pytest.raises(Exception):
        contract.resolve_case(case_id)

def test_resolution_abstain_does_not_approve(direct_vm, direct_deploy):
    contract = deploy(direct_deploy)
    project_id = create_project(contract)
    case_id = open_case(contract, project_id)
    mock_policy_and_decision(direct_vm, "ABSTAIN")
    assert contract.resolve_case(case_id) == "ABSTAINED"
    case = contract.get_case(case_id)
    assert case.status == "ABSTAINED"
    assert case.approved_index == -1

def test_policy_update_authorization_and_snapshot_immutability(direct_vm, direct_deploy, direct_alice):
    contract = deploy(direct_deploy)
    project_id = create_project(contract)
    case_id = open_case(contract, project_id)
    with direct_vm.prank(direct_alice):
        with pytest.raises(Exception):
            contract.update_language_assets(project_id, STYLE, STYLE_DIGEST, GLOSSARY, GLOSSARY_DIGEST)
    new_style = hashlib.sha256(b"new style").hexdigest()
    new_glossary = hashlib.sha256(b"new glossary").hexdigest()
    assert contract.update_language_assets(project_id, STYLE, new_style, GLOSSARY, new_glossary) == 2
    case = contract.get_case(case_id)
    assert case.policy_version == 1
    assert case.style_digest == STYLE_DIGEST
    assert contract.get_project(project_id).policy_version == 2

def test_supersession_release_and_deterministic_commitment(direct_vm, direct_deploy):
    contract = deploy(direct_deploy)
    project_id = create_project(contract)
    first = open_case(contract, project_id)
    second = open_case(contract, project_id)
    mock_policy_and_decision(direct_vm, 0)
    assert contract.resolve_case(first) == "APPROVED"
    mock_policy_and_decision(direct_vm, 1)
    assert contract.resolve_case(second) == "APPROVED"
    contract.supersede_case(first, second)
    assert contract.get_case(first).status == "SUPERSEDED"
    assert contract.get_case(first).superseded_by == second
    manifest_digest = hashlib.sha256(b"manifest").hexdigest()
    release_id = contract.seal_release(
        project_id, "fr", "https://example.com/release", manifest_digest,
        json.dumps([second]),
    )
    release = contract.get_release(release_id)
    assert release.commitment_digest == hashlib.sha256(release.commitment_json.encode()).hexdigest()
    assert json.loads(release.required_case_ids_json) == [second]

def test_stale_policy_case_cannot_be_released(direct_vm, direct_deploy):
    contract = deploy(direct_deploy)
    project_id = create_project(contract)
    case_id = open_case(contract, project_id)
    mock_policy_and_decision(direct_vm, 0)
    assert contract.resolve_case(case_id) == "APPROVED"
    new_style = hashlib.sha256(b"new style").hexdigest()
    new_glossary = hashlib.sha256(b"new glossary").hexdigest()
    contract.update_language_assets(project_id, STYLE, new_style, GLOSSARY, new_glossary)
    with pytest.raises(Exception):
        contract.seal_release(project_id, "fr", "https://example.com/release", "b" * 64, json.dumps([case_id]))
