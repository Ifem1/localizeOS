import { createInjectedClient, type EthereumProvider } from "./client";
import { CONTRACT_ADDRESS, CHAIN_ID } from "./config";
import { inspectExecution } from "./execution";

export async function writeContract(account: string, provider: EthereumProvider, functionName: string, args: unknown[]) {
  if (!CONTRACT_ADDRESS) throw new Error("Contract address is not configured.");
  const chain = String(await provider.request({ method: "eth_chainId" }));
  if (Number.parseInt(chain, 16) !== CHAIN_ID) throw new Error("WRONG_NETWORK: switch wallet to StudioNet (61999).");
  const client = createInjectedClient(account, provider);
  const hash = await client.writeContract({ address: CONTRACT_ADDRESS as `0x${string}`, functionName, args: args as never[], value: BigInt(0) });
  const finalized = await client.waitForTransactionReceipt({ hash, status: "FINALIZED" as Parameters<typeof client.waitForTransactionReceipt>[0]["status"], interval: 5_000, retries: 90 });
  const tx = await client.getTransaction({ hash });
  const verdict = inspectExecution(tx);
  if (!verdict.ok) throw new Error(verdict.reason);
  return { hash, finalized };
}
