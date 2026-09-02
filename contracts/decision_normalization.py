import json

def normalize_decision_result(result):
    parsed = result if isinstance(result, dict) else json.loads(result)
    if isinstance(parsed, dict) and set(parsed.keys()) == {"result"}:
        parsed = parsed["result"]
        if isinstance(parsed, str):
            parsed = json.loads(parsed)
    assert isinstance(parsed, dict), "malformed decision"
    return parsed
