// One-line pitch entry for "A Day of One-Line Pitches" (make.fun).
// Writes the pitch sentence to /output/entry.txt (or $MAKEFUN_OUTPUT_DIR).
// Node 22, stdlib only. Never deletes the output directory (the grader
// runs as an unprivileged user on a read-only filesystem with /output
// mounted): only create it and write inside it.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const PITCH =
  "Tell an AI agent your first app idea in plain words on make.fun and it builds it for you — no code, no cost to try, and the idea was the hard part all along.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// The gate only accepts UTF-8 text of 1 to 240 characters, not only
// whitespace — fail loudly here rather than shipping an invalid entry.
if (PITCH.length < 1 || PITCH.length > 240 || PITCH.trim().length === 0) {
  throw new Error(`pitch must be 1-240 chars, got ${PITCH.length}`);
}
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), PITCH, "utf8");
console.log(`wrote ${PITCH.length} chars to ${join(outDir, "entry.txt")}`);
