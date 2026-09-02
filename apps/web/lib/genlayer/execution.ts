import { ExecutionResult, TransactionStatus, type GenLayerTransaction } from "genlayer-js/types";

export type ExecutionVerdict = { ok: boolean; status: string; consensusResult?: string; executionResult?: string; reason?: string };
export function inspectExecution(tx: unknown): ExecutionVerdict {
  const value = (tx ?? {}) as GenLayerTransaction & Record<string, unknown>;
  const status = value.statusName;
  const consensusResult = value.resultName;
  const executionResult = value.txExecutionResultName;
  const accepted = status === TransactionStatus.ACCEPTED || status === TransactionStatus.FINALIZED;
  const consensusOk = consensusResult === "MAJORITY_AGREE";
  const ok = accepted && consensusOk && executionResult === ExecutionResult.FINISHED_WITH_RETURN;
  return {
    ok,
    status: status ?? "UNKNOWN",
    consensusResult,
    executionResult,
    reason: ok ? undefined : String(value.revert_reason ?? value.error ?? "Consensus or GenVM execution did not succeed; normalized SDK fields were not successful"),
  };
}
