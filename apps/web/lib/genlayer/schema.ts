import { createReadClient } from "./client";
import { CONTRACT_ADDRESS } from "./config";
const REQUIRED_METHODS = [
  "create_project", "update_language_assets", "open_case", "resolve_case", "supersede_case", "seal_release",
  "get_project", "get_case", "get_release", "list_projects", "list_cases", "list_releases", "preview_memory",
] as const;
export async function verifySchema(): Promise<{ ok: true } | { ok: false; message: string }> {
  if (!CONTRACT_ADDRESS) return { ok: false, message: "Contract address is not configured." };
  try { const schema = await createReadClient().getContractSchema(CONTRACT_ADDRESS as `0x${string}`); const names = new Set(Object.keys((schema as unknown as { methods?: Record<string, unknown> }).methods ?? {})); const missing = REQUIRED_METHODS.filter((m) => !names.has(m)); return missing.length ? { ok: false, message: `Contract schema is missing: ${missing.join(", ")}` } : { ok: true }; } catch { return { ok: false, message: "Unable to verify the deployed contract schema." }; }
}
