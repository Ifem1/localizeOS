import { CONTRACT_ADDRESS, unavailableReason } from "./config";
import { createReadClient } from "./client";
export type CaseRecord = { project_id: number; locale: string; string_key: string; status: string; approved_index: number; policy_version: number };
export type LiveResult<T> = { state: "ready"; value: T } | { state: "unavailable"; message: string };
export async function readCase(id: number): Promise<LiveResult<CaseRecord>> {
  if (!CONTRACT_ADDRESS) return { state: "unavailable", message: unavailableReason()! };
  try { const value = await createReadClient().readContract({ address: CONTRACT_ADDRESS as `0x${string}`, functionName: "get_case", args: [id], jsonSafeReturn: true }); if (!value || typeof value !== "object") return { state: "unavailable", message: "Malformed contract response." }; return { state: "ready", value: value as CaseRecord }; } catch { return { state: "unavailable", message: "Unable to read the LocalizeOS contract." }; }
}
