// Build, start the production server, then run the majestic-ui lint and render check against it.
// Usage: npm run check:ui            (set MAJESTIC_UI_DIR if the skill isn't at ../.. or .claude/skills/majestic-ui)
import { spawn, execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const candidates = [process.env.MAJESTIC_UI_DIR, path.resolve("../.."), path.resolve(".claude/skills/majestic-ui"), path.join(process.env.HOME || "", ".claude/skills/majestic-ui")];
const skill = candidates.find((d) => d && fs.existsSync(path.join(d, "scripts/verify-render.mjs")));
if (!skill) { console.error("Set MAJESTIC_UI_DIR to the majestic-ui skill folder."); process.exit(2); }
const port = process.env.PORT || "3123", url = `http://127.0.0.1:${port}`;
const node = process.execPath, nextBin = path.resolve("node_modules/next/dist/bin/next");

execFileSync(node, [nextBin, "build"], { stdio: "inherit" });
const server = spawn(node, [nextBin, "start", "-p", port], { stdio: "ignore" });
let code = 0;
try {
  for (let i = 0; i < 60; i++) { try { if ((await fetch(url)).ok) break; } catch {} await new Promise((r) => setTimeout(r, 500)); }
  const run = (script, args) => { try { execFileSync(node, [path.join(skill, "scripts", script), ...args], { stdio: "inherit" }); } catch (e) { code = Math.max(code, e.status || 1); } };
  run("slop-lint.mjs", ["app", "components", ...(process.argv.includes("--defaults") ? ["--defaults"] : [])]);
  run("verify-render.mjs", [url, "--dark", "--out", "majestic-check", ...(process.env.MAJESTIC_REF ? ["--ref", process.env.MAJESTIC_REF] : [])]);
} finally { server.kill(); }
process.exit(code);
