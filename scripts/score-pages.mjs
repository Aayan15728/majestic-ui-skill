#!/usr/bin/env node
// majestic-ui scorer: runs the lint and the render check on several pages and prints one comparison table.
// Use it to compare skill versions: give two agents the same prompts, save each page, then score both sets.
//
// Usage: node score-pages.mjs <page.html | folder> [more...] [--defaults] [--dark] [--json]
//   A folder is scanned for .html files (one level deep, plus index.html in subfolders).
//
// Score per page (0-100): starts from the lint score, minus 6 per render error and 1 per render warning,
// minus 15 if the page could not be rendered. It ranks pages; it does not replace looking at them.
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const argv = process.argv.slice(2);
const flags = argv.filter((a) => a.startsWith("--"));
const inputs = argv.filter((a) => !a.startsWith("--"));
if (!inputs.length) { console.error("Usage: node score-pages.mjs <page.html | folder> [...] [--defaults] [--dark] [--json]"); process.exit(2); }
const here = path.dirname(fileURLToPath(import.meta.url));

const pages = [];
for (const i of inputs) {
  const p = path.resolve(i);
  if (fs.statSync(p).isDirectory()) {
    for (const f of fs.readdirSync(p)) {
      const fp = path.join(p, f);
      if (f.endsWith(".html")) pages.push(fp);
      else if (fs.statSync(fp).isDirectory() && fs.existsSync(path.join(fp, "index.html"))) pages.push(path.join(fp, "index.html"));
    }
  } else pages.push(p);
}

const run = (script, args) => {
  try { return execFileSync(process.execPath, [path.join(here, script), ...args], { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"], maxBuffer: 64 << 20 }); }
  catch (e) { return e.stdout || ""; } // non-zero exit still prints JSON
};
const rows = [];
for (const p of pages) {
  const lint = JSON.parse(run("slop-lint.mjs", [p, "--json", ...(flags.includes("--defaults") ? ["--defaults"] : [])]) || '{"score":0,"findings":[]}');
  const outDir = fs.mkdtempSync(path.join(os.tmpdir(), "majestic-score-"));
  let render = {};
  try { render = JSON.parse(run("verify-render.mjs", [p, "--json", "--out", outDir, ...(flags.includes("--dark") ? ["--dark"] : [])])); } catch { render = { verified: false }; }
  const rErr = render.errors ?? 0, rWarn = render.warnings ?? 0;
  const score = Math.max(0, Math.min(100, lint.score - rErr * 6 - rWarn - (render.verified === false ? 15 : 0)));
  const ids = (render.findings || []).filter((f) => f.sev === "error").map((f) => f.id);
  rows.push({ page: path.relative(process.cwd(), p) || p, score, lint: lint.score, lintErrors: lint.findings.filter((f) => f.sev === "error").length,
    renderErrors: rErr, renderWarnings: rWarn, verified: render.verified !== false, topIssues: [...new Set(ids)].slice(0, 4).join(", "), checkDir: outDir });
}
rows.sort((a, b) => b.score - a.score);
if (flags.includes("--json")) { console.log(JSON.stringify(rows, null, 2)); process.exit(0); }
const w = Math.max(4, ...rows.map((r) => r.page.length));
console.log(`${"page".padEnd(w)}  score  lint  render err/warn  issues`);
for (const r of rows) console.log(`${r.page.padEnd(w)}  ${String(r.score).padStart(5)}  ${String(r.lint).padStart(4)}  ${r.verified ? `${String(r.renderErrors).padStart(6)}/${r.renderWarnings}`.padEnd(15) : "UNVERIFIED     "}  ${r.topIssues}`);
const avg = (a) => Math.round(a.reduce((s, r) => s + r.score, 0) / (a.length || 1));
console.log(`\naverage ${avg(rows)} over ${rows.length} page(s). Screenshots for each page are in its checkDir (use --json to see it); open them before trusting the number.`);
