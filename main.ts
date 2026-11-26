// The Printer Apology — make.fun entry (v2)
// Writes the final one-line apology from the office printer to /output/entry.txt.
// Gate mirror: the sealed scorer requires UTF-8 text of 1 to 120 characters,
// not only white space — assert that here, then read the file back to prove
// the round trip before exiting.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "Sorry the report printed in pink. The black ink quit in March and left a note. I read it. You didn't.";

// The line is the entry, byte for byte: no trailing newline, no padding.
if (LINE.length < 1 || LINE.length > 120) {
  throw new Error(`line is ${LINE.length} characters, must be 1-120`);
}
if (LINE.trim().length === 0) {
  throw new Error("line must not be only white space");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  throw new Error("MAKEFUN_OUTPUT_DIR is not set");
}

mkdirSync(outDir, { recursive: true });
const target = join(outDir, "entry.txt");
writeFileSync(target, LINE, "utf8");

// Round-trip check: what the grader reads must be exactly this line.
const back = readFileSync(target, "utf8");
if (back !== LINE) {
  throw new Error("round-trip mismatch: entry.txt is not the final line");
}
