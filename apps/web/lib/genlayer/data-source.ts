import { CONTRACT_ADDRESS, unavailableReason } from "./config";
import { createReadClient } from "./client";
export type CaseRecord = { project_id: number; locale: string; string_key: string; source_text: string; context_text: string; candidates_json: string; artifact_ref: string; artifact_digest: string; policy_version: number; style_url: string; style_digest: string; glossary_url: string; glossary_digest: string; status: string; approved_index: number; memory_ids_json: string; rationale: string; superseded_by: number };
export type ProjectRecord = { owner: string; name: string; source_locale: string; style_url: string; style_digest: string; glossary_url: string; glossary_digest: string; policy_version: number; case_count: number };
export type ReleaseRecord = { project_id: number; locale: string; policy_version: number; manifest_url: string; manifest_digest: string; required_case_ids_json: string; commitment_json: string; commitment_digest: string; sealed_at: number };
export type LiveResult<T> = { state: "ready"; value: T } | { state: "unavailable"; message: string };
export async function readCase(id: number): Promise<LiveResult<CaseRecord>> {
  if (!CONTRACT_ADDRESS) return { state: "unavailable", message: unavailableReason()! };
  try { const value = await createReadClient().readContract({ address: CONTRACT_ADDRESS as `0x${string}`, functionName: "get_case", args: [id], jsonSafeReturn: true }); if (!value || typeof value !== "object") return { state: "unavailable", message: "Malformed contract response." }; return { state: "ready", value: value as CaseRecord }; } catch { return { state: "unavailable", message: "Unable to read the LocalizeOS contract." }; }
}
export async function readProjects(): Promise<LiveResult<Record<string, ProjectRecord>>> {
  if (!CONTRACT_ADDRESS) return { state: "unavailable", message: unavailableReason()! };
  try { const value = await createReadClient().readContract({ address: CONTRACT_ADDRESS as `0x${string}`, functionName: "list_projects", args: [0, 50], jsonSafeReturn: true }); if (!value || typeof value !== "object") return { state: "unavailable", message: "Malformed project response." }; return { state: "ready", value: value as Record<string, ProjectRecord> }; } catch { return { state: "unavailable", message: "Unable to read projects from the LocalizeOS contract." }; }
}
async function read<T>(functionName: string, args: unknown[], label: string): Promise<LiveResult<T>> {
  if (!CONTRACT_ADDRESS) return { state: "unavailable", message: unavailableReason()! };
  try {
    const value = await createReadClient().readContract({ address: CONTRACT_ADDRESS as `0x${string}`, functionName, args: args as never[], jsonSafeReturn: true });
    if (value === null || value === undefined || typeof value !== "object") return { state: "unavailable", message: `Malformed ${label} response.` };
    return { state: "ready", value: value as T };
  } catch { return { state: "unavailable", message: `Unable to read ${label} from the LocalizeOS contract.` }; }
}
export const readProject = (id: number) => read<ProjectRecord>("get_project", [id], "project");
export const listCases = (projectId: number, locale: string, offset = 0, limit = 20) => read<Record<string, CaseRecord>>("list_cases", [projectId, locale, offset, limit], "cases");
export const readRelease = (id: number) => read<ReleaseRecord>("get_release", [id], "release");
export const listReleases = (projectId: number, locale: string, offset = 0, limit = 20) => read<Record<string, ReleaseRecord>>("list_releases", [projectId, locale, offset, limit], "releases");
export const previewMemory = (caseId: number, k = 8) => read<Array<Record<string, unknown>>>("preview_memory", [caseId, k], "translation memory");

export function parseJson<T>(value: string, fallback: T): T {
  try { return JSON.parse(value) as T; } catch { return fallback; }
}
