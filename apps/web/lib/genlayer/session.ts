const SESSION_KEY = "localizeos.wallet.session";
const SESSION_EVENT = "localizeos-wallet-session";

export type WalletSession = { connected: boolean; account: string | null };

function storage(): Storage | null {
  return typeof window === "undefined" ? null : window.localStorage;
}

export function getWalletSession(): WalletSession {
  try {
    const value = storage()?.getItem(SESSION_KEY);
    if (!value) return { connected: false, account: null };
    const parsed = JSON.parse(value) as Partial<WalletSession>;
    return parsed.connected && typeof parsed.account === "string"
      ? { connected: true, account: parsed.account }
      : { connected: false, account: null };
  } catch {
    return { connected: false, account: null };
  }
}

export function setWalletSession(account: string | null): void {
  const value: WalletSession = account ? { connected: true, account } : { connected: false, account: null };
  storage()?.setItem(SESSION_KEY, JSON.stringify(value));
  window.dispatchEvent(new Event(SESSION_EVENT));
}

export function onWalletSessionChange(listener: () => void): () => void {
  const handler = () => listener();
  window.addEventListener(SESSION_EVENT, handler);
  window.addEventListener("storage", handler);
  return () => { window.removeEventListener(SESSION_EVENT, handler); window.removeEventListener("storage", handler); };
}
