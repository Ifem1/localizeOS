import { verifySchema } from "../apps/web/lib/genlayer/schema.ts";
const result = await verifySchema();
console.log(JSON.stringify(result));
if (!result.ok) process.exitCode = 1;
