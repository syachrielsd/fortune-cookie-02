// fortune-cookie-01 — Fortune Cookie Funnies for Engineers.
// Writes one fortune cookie message for a software engineer to
// $MAKEFUN_OUTPUT_DIR/entry.txt (default /output).
// Deterministic: stdlib only, no network, no randomness, no timestamps.
// SPDX-License-Identifier: MIT

import { mkdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const MAX_CHARS = 120;

const FORTUNE =
  "Your future holds a merge conflict with a teammate who left in 2019.";

function main(): void {
  // Hard gate: the mission allows 1 to 120 characters, not only whitespace.
  const chars = [...FORTUNE].length;
  if (chars < 1 || chars > MAX_CHARS) {
    throw new Error(`fortune is ${chars} characters, must be 1-${MAX_CHARS}`);
  }
  if (FORTUNE.trim().length === 0) {
    throw new Error("fortune must not be only whitespace");
  }
  if (FORTUNE.includes("\n") || FORTUNE.includes("\r")) {
    throw new Error("fortune must be a single line");
  }

  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  // Byte-exact: the file holds only the fortune, no trailing newline, so
  // its byte count is the fortune's own (this also helps the fewer-bytes
  // tie-break in the ranking rules).
  writeFileSync(join(resolve(outDir), "entry.txt"), FORTUNE, "utf8");
}

main();
