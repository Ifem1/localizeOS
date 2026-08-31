import { CONTRACT_ADDRESS, unavailableReason } from "./config";
export type CaseRecord = { project_id: number; locale: string; string_key: string; status: string; approved_index: number; policy_version: number };
export type LiveResult<T> = { state: "ready"; value: T } | { state: "unavailable"; message: string };
export async function readCase(_id: number): Promise<LiveResult<CaseRecord>> {
  if (!CONTRACT_ADDRESS) return { state: "unavailable", message: unavailableReason()! };
  return { state: "unavailable", message: "GenLayer read client is not initialized in this browser session." };
}
