import { createClient } from "genlayer-js";
import { studionet } from "genlayer-js/chains";

export type EthereumProvider = { request(args: { method: string; params?: unknown[] }): Promise<unknown>; on?(event: string, listener: (...args: unknown[]) => void): void; removeListener?(event: string, listener: (...args: unknown[]) => void): void };
export function createReadClient() { return createClient({ chain: studionet, endpoint: process.env.NEXT_PUBLIC_GENLAYER_ENDPOINT ?? "https://studio.genlayer.com/api" }); }
export function createInjectedClient(account: string, provider: EthereumProvider) {
  return createClient({ chain: studionet, endpoint: process.env.NEXT_PUBLIC_GENLAYER_ENDPOINT ?? "https://studio.genlayer.com/api", account: account as `0x${string}`, provider });
}
