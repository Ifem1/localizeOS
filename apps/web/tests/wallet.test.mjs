import test from "node:test";
import assert from "node:assert/strict";
test("wallet writes require StudioNet", async () => {
  const { canWrite } = await import("../lib/genlayer/wallet.ts");
  assert.equal(canWrite({ account: "0x1", chainId: 61999, connected: true }), true);
  assert.equal(canWrite({ account: "0x1", chainId: 1, connected: true }), false);
});

test("LocalizeOS session requires explicit connection and can be cleared", async () => {
  const store = new Map();
  globalThis.window = { localStorage: { getItem: (k) => store.get(k) ?? null, setItem: (k, v) => store.set(k, v) }, addEventListener() {}, removeEventListener() {}, dispatchEvent() {} };
  const { getWalletSession, setWalletSession } = await import("../lib/genlayer/session.ts");
  assert.equal(getWalletSession().connected, false);
  setWalletSession("0xabc");
  assert.deepEqual(getWalletSession(), { connected: true, account: "0xabc" });
  setWalletSession(null);
  assert.deepEqual(getWalletSession(), { connected: false, account: null });
});
