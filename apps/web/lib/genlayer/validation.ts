export function validDigest(value: string) { return /^[0-9a-f]{64}$/.test(value); }
export function validHttps(value: string) { return /^https:\/\/[^\s]+$/.test(value); }
export function tokens(value: string) { return (value.match(/\{[^{}]+\}|%\w+/g) ?? []).sort().join("|"); }
export function validCandidates(source: string, candidates: string[]) { return candidates.length >= 2 && candidates.length <= 5 && candidates.every((candidate) => candidate.length > 0 && tokens(candidate) === tokens(source)); }
export function canMutate(status: string) { return status === "ESCALATED"; }
export function canSeal(statuses: string[]) { return statuses.length > 0 && statuses.every((status) => status === "APPROVED"); }
export function readObject(value: unknown): Record<string, unknown> | null { return value !== null && typeof value === "object" && !Array.isArray(value) ? value as Record<string, unknown> : null; }
