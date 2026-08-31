"""Pure deterministic guards shared by direct tests and contract review."""
import json
import re

MAX_CANDIDATES = 5
MAX_DECISION_MEMORIES = 8

def placeholders(value: str) -> list[str]:
    return sorted(re.findall(r"\{[^{}]+\}|%\w+", value))

def validate_candidates(source: str, encoded: str) -> list[str]:
    values = json.loads(encoded)
    if not isinstance(values, list) or not 1 < len(values) <= MAX_CANDIDATES or not all(isinstance(v, str) and v for v in values):
        raise ValueError("candidate list must contain 2-5 non-empty strings")
    if any(placeholders(source) != placeholders(value) for value in values):
        raise ValueError("candidate placeholders differ from source")
    return values

def validate_decision(decision: dict, candidate_count: int) -> None:
    choice = decision.get("decision")
    if choice != "ABSTAIN" and (not isinstance(choice, int) or not 0 <= choice < candidate_count):
        raise ValueError("decision must be a submitted candidate index or ABSTAIN")
    memories = decision.get("memory_ids", [])
    if not isinstance(memories, list) or len(memories) > MAX_DECISION_MEMORIES or not all(isinstance(v, int) and v >= 0 for v in memories):
        raise ValueError("invalid memory references")
