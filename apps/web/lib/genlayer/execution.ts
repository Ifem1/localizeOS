export type ExecutionVerdict = { ok: boolean; status: string; executionResult?: string; reason?: string };
export function inspectExecution(tx: unknown): ExecutionVerdict {
  const value = (tx ?? {}) as Record<string, unknown>;
  const status = String(value.status ?? "UNKNOWN");
  const executionResult = value.execution_result == null ? undefined : String(value.execution_result);
  const result = value.result == null ? undefined : String(value.result);
  const ok = status === "FINALIZED" && (executionResult === "FINISHED_WITH_RETURN" || result === "SUCCESS");
  return { ok, status, executionResult, reason: ok ? undefined : String(value.revert_reason ?? value.error ?? "GenVM execution did not succeed") };
}
