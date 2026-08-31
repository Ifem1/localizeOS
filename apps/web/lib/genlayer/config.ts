export const CHAIN_ID = 61999;
export const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_LOCALIZEOS_CONTRACT ?? "";
export const isConfigured = Boolean(CONTRACT_ADDRESS);
export function unavailableReason() { return isConfigured ? null : "Contract address is not configured; live chain state is unavailable."; }
