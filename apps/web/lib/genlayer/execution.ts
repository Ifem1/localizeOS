import { ExecutionResult, TransactionStatus, type GenLayerTransaction } from "genlayer-js/types";

export type ExecutionVerdict = { ok: boolean; indeterminate?: boolean; status: string; consensusResult?: string; executionResult?: string; reason?: string };
export function inspectExecution(tx: unknown): ExecutionVerdict {
  const value = (tx ?? {}) as GenLayerTransaction & Record<string, unknown>;
  const status = value.statusName ?? (typeof value.status === "string" ? value.status : undefined);
  const consensusResult = value.resultName ?? (typeof value.result_name === "string" ? value.result_name : undefined);
  const executionResult = value.txExecutionResultName ?? (typeof value.tx_execution_result_name === "string" ? value.tx_execution_result_name : undefined);
  const accepted = status === TransactionStatus.ACCEPTED || status === TransactionStatus.FINALIZED;
  const consensusOk = consensusResult === "MAJORITY_AGREE";
  const ok = accepted && consensusOk && executionResult === ExecutionResult.FINISHED_WITH_RETURN;
  const hasExecutionEvidence = executionResult !== undefined || value.txExecutionResult !== undefined || value.tx_execution_result !== undefined;
  return {
    ok,
    indeterminate: accepted && consensusOk && !hasExecutionEvidence,
    status: status ?? "UNKNOWN",
    consensusResult,
    executionResult,
    reason: ok ? undefined : accepted && consensusOk && !hasExecutionEvidence ? "Finality and consensus confirmed, but execution evidence was unavailable; state was reread." : String(value.revert_reason ?? value.error ?? "Consensus or GenVM execution did not succeed"),
  };
}
