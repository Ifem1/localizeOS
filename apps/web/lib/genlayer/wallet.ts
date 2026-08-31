export type WalletState = { account: string | null; chainId: number | null; connected: boolean; error?: string };
export const studioChainId = 61999;
export function parseChainId(value: string | number): number { return typeof value === "number" ? value : Number.parseInt(value, 16); }
export function canWrite(state: WalletState): boolean { return Boolean(state.account && state.chainId === studioChainId); }
export function networkLabel(chainId: number | null): string { return chainId === null ? "Not connected" : chainId === studioChainId ? "StudioNet · 61999" : `Wrong network · ${chainId}`; }
