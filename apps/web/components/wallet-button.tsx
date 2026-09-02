"use client";
import { useEffect, useState } from "react";
import { CHAIN_ID } from "../lib/genlayer/config";
import { parseChainId, networkLabel } from "../lib/genlayer/wallet";
import type { EthereumProvider } from "../lib/genlayer/client";
import { getWalletSession, onWalletSessionChange, setWalletSession } from "../lib/genlayer/session";

declare global { interface Window { ethereum?: EthereumProvider } }
export default function WalletButton() {
  const [account, setAccount] = useState<string | null>(null); const [chain, setChain] = useState<number | null>(null); const [error, setError] = useState("");
  useEffect(() => { const p = window.ethereum; const syncSession = () => { const session = getWalletSession(); setAccount(session.connected ? session.account : null); }; syncSession(); const stop = onWalletSessionChange(syncSession); if (!p) return stop; let active = true; const syncProvider = async () => { const session = getWalletSession(); if (!session.connected) { setAccount(null); return; } try { const [accounts, chainId] = await Promise.all([p.request({ method: "eth_accounts" }), p.request({ method: "eth_chainId" })]); if (!active) return; const account = (accounts as string[])[0] ?? null; if (!account) { setWalletSession(null); setAccount(null); setChain(null); return; } setWalletSession(account); setAccount(account); setChain(parseChainId(String(chainId))); } catch { if (active) setError("Wallet state unavailable."); } }; void syncProvider(); const accounts = (...a: unknown[]) => { if (!getWalletSession().connected) { setAccount(null); return; } const account = (a[0] as string[] | undefined)?.[0] ?? null; setWalletSession(account); setAccount(account); }; const chains = (...a: unknown[]) => setChain(parseChainId(String(a[0]))); const disconnect = () => { setWalletSession(null); setAccount(null); setChain(null); }; p.on?.("accountsChanged", accounts); p.on?.("chainChanged", chains); p.on?.("disconnect", disconnect); return () => { active = false; stop(); p.removeListener?.("accountsChanged", accounts); p.removeListener?.("chainChanged", chains); p.removeListener?.("disconnect", disconnect); }; }, []);
  async function connect() { setError(""); const p = window.ethereum; if (!p) { setError("Install an injected wallet."); return; } try { const accounts = await p.request({ method: "eth_requestAccounts" }) as string[]; const account = accounts[0] ?? null; if (!account) { setWalletSession(null); setError("No wallet account was returned."); return; } const chainId = await p.request({ method: "eth_chainId" }) as string; setWalletSession(account); setAccount(account); setChain(parseChainId(chainId)); } catch { setWalletSession(null); setError("Wallet connection was refused."); } }
  async function switchNetwork() { try { await window.ethereum?.request({ method: "wallet_switchEthereumChain", params: [{ chainId: `0x${CHAIN_ID.toString(16)}` }] }); } catch { setError("Network switch refused; writes remain disabled."); } }
  if (error) return <button className="wallet" title={error} onClick={connect}>{error}</button>;
  if (!account) return <button className="wallet" onClick={connect}>Connect wallet</button>;
  if (chain !== CHAIN_ID) return <button className="wallet" onClick={switchNetwork}>{networkLabel(chain)} · switch</button>;
  return <div className="wallet-group"><span className="wallet-address">{account.slice(0, 6)}…{account.slice(-4)}</span><button className="wallet wallet-disconnect" onClick={() => { setWalletSession(null); setAccount(null); setChain(null); }}>Disconnect</button></div>;
}
