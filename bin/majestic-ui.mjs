#!/usr/bin/env node
// majestic-ui command line: installs the skill into your agent and runs its checking scripts.
// Run `majestic-ui help` (or `npx majestic-ui-skill help`) for the full list of commands.

import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PKG = JSON.parse(fs.readFileSync(path.join(ROOT, "package.json"), "utf8"));
const SKILL_NAME = "majestic-ui";

// Folders each agent reads skills from: [personal, project-relative].
const AGENTS = {
  claude: [path.join(os.homedir(), ".claude", "skills"), path.join(".claude", "skills")],
  codex: [path.join(os.homedir(), ".codex", "skills"), path.join(".codex", "skills")],
  factory: [path.join(os.homedir(), ".factory", "skills"), path.join(".factory", "skills")],
};

// Files and folders that make up the installed skill.
const SKILL_FILES = ["SKILL.md", "SUMMARY.md", "README.md", "LICENSE", "references", "examples", "scripts", "starters"];
const SKIP_DIRS = new Set(["node_modules", ".next", ".git", "majestic-check"]);

// Commands that hand off to a script in scripts/.
const SCRIPTS = {
  lint: { file: "slop-lint.mjs", about: "Scan HTML/CSS for AI-design habits and missing fonts", usage: "<file-or-folder...> [--defaults] [--json]" },
  verify: { file: "verify-render.mjs", about: "Check a page in a real browser at 1440 and 390", usage: "<page.html|url> [--ref <example>] [--out dir] [--dark] [--app] [--cdp url] [--json]" },
  compare: { file: "compare-image.mjs", about: "Score a built page against a design image", usage: "<design.png> <page.html|url> [--out dir] [--min 0.85] [--cdp url]" },
  extract: { file: "extract-spec.mjs", about: "Read a design image into a spec of numbers", usage: "<design.png> [--out dir] [--dpr 1|2|3] [--crop x,y,w,h] [--zoom 3]" },
  fonts: { file: "vendor-fonts.mjs", about: "Copy or inline a page's fonts so it works anywhere", usage: "<page.html...> [--inline] [--cdn] [--dir fonts]" },
  score: { file: "score-pages.mjs", about: "Rank many pages with the lint and render check", usage: "<page.html|folder...> [--defaults] [--dark] [--json]" },
  inventory: { file: "inventory.mjs", about: "Measure design sprawl in a codebase and propose tokens", usage: "[folder...] [--out design-inventory] [--json]" },
};
const ALIASES = { "slop-lint": "lint", "verify-render": "verify", "compare-image": "compare", "extract-spec": "extract", "vendor-fonts": "fonts", "score-pages": "score" };

const c = process.stdout.isTTY && !process.env.NO_COLOR
  ? { b: (s) => `\x1b[1m${s}\x1b[0m`, d: (s) => `\x1b[2m${s}\x1b[0m`, g: (s) => `\x1b[32m${s}\x1b[0m`, r: (s) => `\x1b[31m${s}\x1b[0m` }
  : { b: (s) => s, d: (s) => s, g: (s) => s, r: (s) => s };

const argv = process.argv.slice(2);
const has = (...names) => names.some((n) => argv.includes(n));
const opt = (name) => { const i = argv.indexOf(name); return i >= 0 && argv[i + 1] && !argv[i + 1].startsWith("--") ? argv[i + 1] : null; };
const positionals = (args) => args.filter((a, i) => !a.startsWith("-") && !(i > 0 && ["--agent", "--dir"].includes(args[i - 1])));

function fail(msg, code = 1) { console.error(c.r("Error: ") + msg); process.exit(code); }

function help() {
  const pad = (s, n) => s + " ".repeat(Math.max(1, n - s.length));
  console.log(`
${c.b("majestic-ui")} ${c.d("v" + PKG.version)}  ${PKG.description}

${c.b("Usage")}
  npx majestic-ui-skill <command> [options]
  majestic-ui <command> [options]          ${c.d("after npm install -g majestic-ui-skill")}

${c.b("Set up")}
  ${pad("install", 12)}Install the skill for your agent ${c.d("(default: Claude Code, personal)")}
  ${pad("", 12)}${c.d("--agent claude|codex|factory|all   --project   --dir <path>   --force")}
  ${pad("uninstall", 12)}Remove the installed skill ${c.d("(same options as install)")}
  ${pad("starter", 12)}Copy the Next.js 16 starter into a folder ${c.d("[dir] (default: majestic-starter)")}
  ${pad("examples", 12)}List the 38 reference pages ${c.d("[name] shows one example's files")}
  ${pad("path", 12)}Print where this package's skill files live

${c.b("Check your pages")}
${Object.entries(SCRIPTS).map(([k, v]) => `  ${pad(k, 12)}${v.about}\n  ${pad("", 12)}${c.d(v.usage)}`).join("\n")}

${c.b("Other")}
  ${pad("help", 12)}Show this help ${c.d("(also -h, --help)")}
  ${pad("version", 12)}Print the version ${c.d("(also -v, --version)")}

${c.b("Examples")}
  npx majestic-ui-skill install
  npx majestic-ui-skill install --agent all
  npx majestic-ui-skill lint index.html --defaults
  npx majestic-ui-skill verify index.html --ref gallery-tiles --dark
  npx majestic-ui-skill starter my-site

The check commands need Node 22+. Browser checks use an installed Chrome, Chromium or Edge (CHROME_PATH overrides).
Docs: ${PKG.homepage}
`);
}

function targets() {
  const agent = (opt("--agent") || "claude").toLowerCase();
  const dir = opt("--dir");
  if (dir) return [{ agent: "custom", dir: path.resolve(dir, SKILL_NAME) }];
  const names = agent === "all" ? Object.keys(AGENTS) : agent.split(",");
  return names.map((name) => {
    if (!AGENTS[name]) fail(`unknown agent "${name}". Use claude, codex, factory or all.`, 2);
    const base = has("--project") ? path.resolve(process.cwd(), AGENTS[name][1]) : AGENTS[name][0];
    return { agent: name, dir: path.join(base, SKILL_NAME) };
  });
}

function copyTree(from, to) {
  fs.cpSync(from, to, { recursive: true, filter: (src) => !SKIP_DIRS.has(path.basename(src)) });
}

function install() {
  for (const t of targets()) {
    if (fs.existsSync(t.dir)) {
      if (!has("--force")) { console.log(`${c.d("skip")}  ${t.agent}: ${t.dir} already exists ${c.d("(use --force to replace it)")}`); continue; }
      fs.rmSync(t.dir, { recursive: true, force: true });
    }
    fs.mkdirSync(t.dir, { recursive: true });
    for (const f of SKILL_FILES) {
      const src = path.join(ROOT, f);
      if (fs.existsSync(src)) copyTree(src, path.join(t.dir, f));
    }
    console.log(`${c.g("done")}  ${t.agent}: installed to ${t.dir}`);
  }
  console.log(c.d("\nRestart your agent session so it picks up the skill, then ask it to build or polish any UI."));
}

function uninstall() {
  for (const t of targets()) {
    if (!fs.existsSync(path.join(t.dir, "SKILL.md"))) { console.log(`${c.d("skip")}  ${t.agent}: nothing installed at ${t.dir}`); continue; }
    fs.rmSync(t.dir, { recursive: true, force: true });
    console.log(`${c.g("done")}  ${t.agent}: removed ${t.dir}`);
  }
}

function starter(args) {
  const dest = path.resolve(positionals(args)[0] || "majestic-starter");
  if (fs.existsSync(dest) && fs.readdirSync(dest).length && !has("--force")) fail(`${dest} is not empty (use --force to copy into it anyway).`);
  copyTree(path.join(ROOT, "starters", "nextjs"), dest);
  // npm strips .gitignore files from published packages, so recreate it.
  const gi = path.join(dest, ".gitignore");
  if (!fs.existsSync(gi)) fs.writeFileSync(gi, "node_modules\n.next\nmajestic-check\nnext-env.d.ts\n");
  const rel = path.relative(process.cwd(), dest) || ".";
  console.log(`${c.g("done")}  Next.js starter copied to ${dest}\n\n  cd ${rel}\n  npm install\n  npm run dev\n`);
}

function readExamples() {
  const md = fs.readFileSync(path.join(ROOT, "examples", "README.md"), "utf8");
  const rows = [];
  for (const line of md.split("\n")) {
    const m = line.match(/^\| \[`([^`]+)`\]\([^)]*\) \| (.+?) \| (.+?) \| (.+?) \|$/);
    if (m) rows.push({ name: m[1], brief: m[2], useFor: m[3] });
  }
  return rows;
}

function examples(args) {
  const list = readExamples();
  const name = positionals(args)[0];
  if (has("--json")) { console.log(JSON.stringify(list, null, 2)); return; }
  if (name) {
    const ex = list.find((e) => e.name === name);
    if (!ex) fail(`no example named "${name}". Run "majestic-ui examples" to see them all.`, 2);
    const dir = path.join(ROOT, "examples", name);
    console.log(`\n${c.b(ex.name)}\n${ex.brief}\n${c.d("Use it for: " + ex.useFor)}\n\n${dir}`);
    for (const f of fs.readdirSync(dir)) console.log("  " + f);
    console.log();
    return;
  }
  const w = Math.max(...list.map((e) => e.name.length)) + 2;
  console.log(`\n${c.b(list.length + " reference pages")} ${c.d("(majestic-ui examples <name> for details)")}\n`);
  for (const e of list) console.log(`  ${e.name.padEnd(w)}${c.d(e.useFor.length > 80 ? e.useFor.slice(0, 77) + "..." : e.useFor)}`);
  console.log();
}

// Lets `--ref gallery-tiles` point at the bundled example when no such folder exists locally.
function resolveRef(args) {
  const i = args.indexOf("--ref");
  if (i < 0 || !args[i + 1]) return args;
  const val = args[i + 1];
  if (!fs.existsSync(val)) {
    const bundled = path.join(ROOT, "examples", path.basename(val));
    if (fs.existsSync(bundled)) { const out = [...args]; out[i + 1] = bundled; return out; }
  }
  return args;
}

function runScript(name, args) {
  const [major] = process.versions.node.split(".").map(Number);
  if (major < 22) fail(`the check commands need Node 22 or newer (you have ${process.versions.node}).`);
  const s = SCRIPTS[name];
  if (has("-h", "--help")) { console.log(`\n${c.b("majestic-ui " + name)}  ${s.about}\n\n  majestic-ui ${name} ${s.usage}\n`); return; }
  const r = spawnSync(process.execPath, [path.join(ROOT, "scripts", s.file), ...resolveRef(args)], { stdio: "inherit" });
  process.exit(r.status ?? 1);
}

const [cmdRaw, ...rest] = argv;
const cmd = ALIASES[cmdRaw] || cmdRaw;

if (!cmd || ["help", "-h", "--help"].includes(cmd)) help();
else if (["version", "-v", "--version"].includes(cmd)) console.log(PKG.version);
else if (cmd === "install") install();
else if (cmd === "uninstall") uninstall();
else if (cmd === "starter") starter(rest);
else if (cmd === "examples") examples(rest);
else if (cmd === "path") console.log(ROOT);
else if (SCRIPTS[cmd]) runScript(cmd, rest);
else fail(`unknown command "${cmdRaw}". Run "majestic-ui help" to see all commands.`, 2);
