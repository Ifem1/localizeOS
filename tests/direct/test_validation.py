import pytest
from contracts.validation import validate_candidates, validate_decision

def test_candidates_preserve_placeholders():
    assert validate_candidates("Delete {name}", '["Supprimer {name}", "Effacer {name}"]')[0].startswith("Supprimer")

def test_placeholder_mismatch_fails_closed():
    with pytest.raises(ValueError):
        validate_candidates("Delete {name}", '["Supprimer"]')

def test_decision_must_select_submitted_candidate():
    validate_decision({"decision": 1, "memory_ids": []}, 2)
    with pytest.raises(ValueError):
        validate_decision({"decision": 2}, 2)

def test_abstain_is_valid_terminal_decision():
    validate_decision({"decision": "ABSTAIN", "memory_ids": []}, 2)
