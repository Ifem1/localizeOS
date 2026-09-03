export function validDigest(value: string) { return /^[0-9a-f]{64}$/.test(value); }
export function validHttps(value: string) { return /^https:\/\/[^\s]+$/.test(value); }
export function tokens(value: string) { return (value.match(/\{[^{}]+\}|%\w+/g) ?? []).sort().join("|"); }
export function validCandidates(source: string, candidates: string[]) { return candidates.length >= 2 && candidates.length <= 5 && candidates.every((candidate) => candidate.length > 0 && tokens(candidate) === tokens(source)); }
export function canMutate(status: string) { return status === "ESCALATED"; }
export function canSeal(statuses: string[]) { return statuses.length > 0 && statuses.every((status) => status === "APPROVED"); }
export function readObject(value: unknown): Record<string, unknown> | null { return value !== null && typeof value === "object" && !Array.isArray(value) ? value as Record<string, unknown> : null; }
export type CaseDiscoveryInput = { project: number; locale: string; stringKey: string; source: string; artifact: string; digest: string };
export function discoverCaseId(before: Record<string, unknown>, after: Record<string, Record<string, unknown>>, input: CaseDiscoveryInput, receiptId = 0): number {
  const matches = (entry: Record<string, unknown>) => Number(entry.project_id) === input.project && entry.locale === input.locale && entry.string_key === input.stringKey && entry.source_text === input.source && entry.artifact_ref === input.artifact && entry.artifact_digest === input.digest;
  if (receiptId > 0 && after[String(receiptId)] && matches(after[String(receiptId)])) return receiptId;
  const ids = Object.keys(after).filter((id) => !Object.prototype.hasOwnProperty.call(before, id) && matches(after[id]));
  return ids.length === 1 ? Number(ids[0]) : 0;
}
