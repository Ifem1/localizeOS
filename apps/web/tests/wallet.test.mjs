import test from "node:test";
import assert from "node:assert/strict";
test("wallet writes require StudioNet", async () => {
  const { canWrite } = await import("../lib/genlayer/wallet.ts");
  assert.equal(canWrite({ account: "0x1", chainId: 61999, connected: true }), true);
  assert.equal(canWrite({ account: "0x1", chainId: 1, connected: true }), false);
});
