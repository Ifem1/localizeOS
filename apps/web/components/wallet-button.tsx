"use client";
import { useEffect, useState } from "react";
import { CHAIN_ID } from "../lib/genlayer/config";
import { parseChainId, networkLabel } from "../lib/genlayer/wallet";
import type { EthereumProvider } from "../lib/genlayer/client";

declare global { interface Window { ethereum?: EthereumProvider } }
export default function WalletButton() {
  const [account, setAccount] = useState<string | null>(null); const [chain, setChain] = useState<number | null>(null); const [error, setError] = useState("");
  useEffect(() => { const p = window.ethereum; if (!p?.on) return; const accounts = (...a: unknown[]) => setAccount((a[0] as string[] | undefined)?.[0] ?? null); const chains = (...a: unknown[]) => setChain(parseChainId(String(a[0]))); const disconnect = () => { setAccount(null); setChain(null); }; p.on("accountsChanged", accounts); p.on("chainChanged", chains); p.on("disconnect", disconnect); return () => { p.removeListener?.("accountsChanged", accounts); p.removeListener?.("chainChanged", chains); p.removeListener?.("disconnect", disconnect); }; }, []);
  async function connect() { setError(""); const p = window.ethereum; if (!p) { setError("Install an injected wallet."); return; } try { const accounts = await p.request({ method: "eth_requestAccounts" }) as string[]; const chainId = await p.request({ method: "eth_chainId" }) as string; setAccount(accounts[0] ?? null); setChain(parseChainId(chainId)); } catch { setError("Wallet connection was refused."); } }
  async function switchNetwork() { try { await window.ethereum?.request({ method: "wallet_switchEthereumChain", params: [{ chainId: `0x${CHAIN_ID.toString(16)}` }] }); } catch { setError("Network switch refused; writes remain disabled."); } }
  if (error) return <button className="wallet" title={error} onClick={connect}>{error}</button>;
  if (!account) return <button className="wallet" onClick={connect}>Connect wallet</button>;
  if (chain !== CHAIN_ID) return <button className="wallet" onClick={switchNetwork}>{networkLabel(chain)} · switch</button>;
  return <button className="wallet" onClick={() => setAccount(null)}>{account.slice(0, 6)}…{account.slice(-4)}</button>;
}
