import assert from "node:assert/strict";
import test from "node:test";
import { canMutate, canSeal, readObject, tokens, validCandidates, validDigest, validHttps } from "../lib/genlayer/validation.ts";

test("accepts exact lowercase SHA-256", () => { assert.equal(validDigest("a".repeat(64)), true); assert.equal(validDigest("A".repeat(64)), false); assert.equal(validDigest("a".repeat(63)), false); });
test("requires HTTPS without whitespace", () => { assert.equal(validHttps("https://example.com/a"), true); assert.equal(validHttps("http://example.com"), false); assert.equal(validHttps("https://example.com/a b"), false); });
test("normalizes placeholder tokens", () => { assert.equal(tokens("Delete {name} %count"), "%count|{name}"); });
test("accepts two to five placeholder-safe candidates", () => { assert.equal(validCandidates("Delete {name}", ["Supprimer {name}", "Effacer {name}"]), true); assert.equal(validCandidates("Delete {name}", ["Supprimer"]), false); });
test("rejects candidate count outside bounds", () => { assert.equal(validCandidates("x", ["a"]), false); assert.equal(validCandidates("x", ["a", "b", "c", "d", "e", "f"]), false); });
test("resolution action is only available for escalated cases", () => { assert.equal(canMutate("ESCALATED"), true); assert.equal(canMutate("APPROVED"), false); });
test("release requires at least one approved case", () => { assert.equal(canSeal(["APPROVED"]), true); assert.equal(canSeal([]), false); assert.equal(canSeal(["APPROVED", "PENDING"]), false); });
test("malformed reads are rejected", () => { assert.equal(readObject(null), null); assert.equal(readObject([]), null); assert.deepEqual(readObject({ id: 1 }), { id: 1 }); });
test("abstained cases cannot mutate", () => { assert.equal(canMutate("ABSTAINED"), false); });
test("superseded cases cannot mutate", () => { assert.equal(canMutate("SUPERSEDED"), false); });
