#!/usr/bin/env node
// majestic-ui slop lint: scans HTML / CSS / JSX / TSX / Vue / Svelte for mechanical AI-slop tells.
// Usage: node slop-lint.mjs <file-or-folder> [more paths...] [--json] [--defaults]
// --defaults: use when the user stated no fonts, colors or style. It also flags Inter, drop shadows, Bricolage Grotesque,
// purple, blue gradients and gradient backgrounds, which the skill avoids unless the user asks for them.
// A deliberate exception is skipped when its line carries a comment like /* slop-ok: blinking caret is the signature */
// No dependencies. It catches mechanical slop tells and interface red flags (zoom lock, missing labels,
// clickable divs, images without size/alt, removed focus rings). Taste and layout still need eyes.

import fs from "node:fs";
import path from "node:path";

const args = process.argv.slice(2);
const asJson = args.includes("--json");
const defaults = args.includes("--defaults"); // the user gave no style preferences: also flag the undecided-default avoid list
const targets = args.filter((a) => !a.startsWith("--"));
if (!targets.length) {
  console.error("Usage: node slop-lint.mjs <file-or-folder> [...] [--json]");
  process.exit(2);
}

const EXT = new Set([".html", ".htm", ".css", ".scss", ".jsx", ".tsx", ".js", ".ts", ".vue", ".svelte", ".astro", ".mdx"]);
const SKIP = new Set(["node_modules", ".git", "dist", "build", ".next", ".output", "coverage"]);

function collect(p, out) {
  let st;
  try { st = fs.statSync(p); } catch { return; }
  if (st.isDirectory()) {
    for (const f of fs.readdirSync(p)) if (!SKIP.has(f)) collect(path.join(p, f), out);
  } else if (EXT.has(path.extname(p).toLowerCase()) && !/\.min\./.test(p)) out.push(p);
}

function hue(hex) {
  let h = hex.replace("#", "");
  if (h.length === 3) h = [...h].map((c) => c + c).join("");
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16) / 255);
  const max = Math.max(r, g, b), min = Math.min(r, g, b), d = max - min;
  if (d < 0.08) return null; // near-grey
  let x;
  if (max === r) x = ((g - b) / d) % 6; else if (max === g) x = (b - r) / d + 2; else x = (r - g) / d + 4;
  return (x * 60 + 360) % 360;
}

// [id, severity, message, test(line) -> boolean | string]
const RULES = [
  ["transition-all", "error", "transition: all — name the properties (color, background-color, border-color, opacity, transform)",
    (l) => /transition\s*:\s*all\b|\btransition-all\b/.test(l)],
  ["text-shadow", "error", "text-shadow — type stays crisp; remove it",
    (l) => /text-shadow\s*:(?!\s*none)|\btext-shadow-(?!none)/.test(l)],
  ["gradient-text", "warn", "gradient text (background-clip: text) — solid color unless the whole headline is the signature",
    (l) => /background-clip\s*:\s*text|\bbg-clip-text\b/.test(l)],
  ["hue-gradient", "error", "purple / violet / indigo gradient — the #1 AI tell",
    (l) => {
      if (/\b(from|via|to)-(purple|violet|indigo|fuchsia)-\d/.test(l)) return true;
      if (!/gradient\(/.test(l)) return false;
      const hexes = l.match(/#[0-9a-fA-F]{3}\b|#[0-9a-fA-F]{6}\b/g) || [];
      return hexes.some((h) => { const x = hue(h); return x !== null && x >= 235 && x <= 310; });
    }],
  ["colored-glow", "warn", "colored glow shadow — depth comes from hairlines and surface steps",
    (l) => /(box-shadow|drop-shadow|shadow-\[)[^;]*0\s+0\s+\d{2,}px[^;]*rgba?\(\s*(?!0\s*,\s*0\s*,\s*0)\d/.test(l) || /\bshadow-(purple|violet|indigo|blue|pink|fuchsia)-\d/.test(l)],
  ["generic-shadow", "warn", "default grey drop shadow — use a hairline, a surface step, or a named shadow device",
    (l) => /box-shadow\s*:\s*0\s+(4|10)px\s+(6|15|25)px[^;]*rgba\(0,\s*0,\s*0,\s*0?\.1\)/.test(l) || /\bshadow-(md|lg|xl|2xl)\b/.test(l)],
  ["caps-eyebrow", "warn", "uppercase + wide tracking label — sentence case unless all-caps mono is the committed system voice",
    (l) => (/text-transform\s*:\s*uppercase|\buppercase\b/.test(l)) && /letter-spacing\s*:\s*0?\.\d+em|\btracking-(wide|wider|widest)\b|letter-spacing\s*:\s*[2-9]px/.test(l)],
  ["cliche-copy", "warn", "autopilot phrase — say the one thing only this product can say",
    (l) => {
      const m = l.match(/without the noise|finally mak(e|es|ing) sense|know what'?s working|all in one place|actually works?\b|made simple|built for modern|analytics theatre|in one platform/i);
      return m ? m[0] : false;
    }],
  ["off-grid", "warn", "spacing off the grid (odd px, or large values not on the 4px scale)",
    (l) => {
      const m = [...l.matchAll(/(?:margin|padding|gap|row-gap|column-gap|top|bottom|inset|height|min-height)(?:-[a-z]+)?\s*:\s*([^;}"']+)/g)];
      // Off-grid = odd values (13px, 11px) or values above 48 that are not multiples of 4.
      // Even small steps (6, 10, 14) are normal inside controls, and tiny sizes (< 12) are dots, not spacing.
      const bad = (n, prop) => n > 2 && !(prop.startsWith("height") && n < 12) && (n % 2 !== 0 || (n > 48 && n % 4 !== 0));
      for (const x of m) {
        const prop = x[0].split(":")[0].trim();
        for (const v of x[1].matchAll(/(-?\d+(?:\.\d+)?)px/g)) {
          const n = Math.abs(parseFloat(v[1]));
          if (bad(n, prop)) return `${n}px`;
        }
      }
      const tw = l.match(/\b-?(?:m|p|gap|space-[xy]|top|bottom|h|mt|mb|ml|mr|mx|my|pt|pb|pl|pr|px|py)-\[(\d+)px\]/);
      if (tw && bad(+tw[1], "spacing")) return `${tw[1]}px`;
      return false;
    }],
  ["default-grey", "info", "stock grey (#888 / #999 / #ccc) — use a tuned muted token",
    (l) => /color\s*:\s*#(888|999|888888|999999|aaa|aaaaaa)\b/i.test(l)],
  ["pure-black-text", "info", "pure #000 text — prefer a tuned near-black token",
    (l) => /(?<![-\w])color\s*:\s*(#000\b|#000000\b|black\b)/i.test(l)],
  ["loop-motion", "warn", "looping motion on non-live elements (pulse / ping / bounce / infinite)",
    (l) => /\banimate-(pulse|ping|bounce)\b|animation\s*:[^;]*\binfinite\b/.test(l)],
  ["hover-scale", "warn", "hover scale on cards — use a color or surface step; scale down only on press",
    (l) => /\bhover:scale-1[0-9]{2}\b|:hover[^{]*\{[^}]*scale\(1\.0?[1-9]/.test(l)],
  ["emoji", "error", "emoji in the interface — replace with one line-icon set or nothing",
    (l) => /\p{Extended_Pictographic}/u.test(l.replace(/[©®™↗→←↑↓✓✔︎]/g, ""))],
  ["sparkle-badge", "error", "'Introducing / New ✨ / Beta 🚀' badge pattern",
    (l) => /✨|🚀|\bIntroducing\b/.test(l)],
  ["hype-copy", "warn", "hype word — say what the thing actually does",
    (l) => {
      const m = l.match(/\b(supercharge[sd]?|seamless(ly)?|unlock|revolutioni[sz]e|game[- ]changing|effortless(ly)?|elevate|empower|next[- ]gen(eration)?|cutting[- ]edge|unleash|skyrocket|10x|blazing[- ]fast|world[- ]class|AI[- ]powered)\b/i);
      return m ? m[0] : false;
    }],
  ["greeting", "warn", "greeting headline — title the context instead",
    (l) => /Welcome back,?|Hey there|Hello there|Good (morning|afternoon|evening)\b/i.test(l)],
  ["exclamation", "warn", "exclamation mark in UI copy",
    (l) => />[^<>{}]*[A-Za-z]!+\s*</.test(l)],
  ["arrow-cta", "info", "'→' appended to button / link text — fine once, slop everywhere",
    (l) => /→\s*<\/(a|button)>|→\s*<\/span>\s*<\/(a|button)>/.test(l)],
  ["middle-dot", "info", "meta joined with middle dots 'A · B · C'",
    (l) => /\w+\s·\s\w+\s·\s\w+/.test(l)],
  ["unverified-claim", "info", "social-proof claim — confirm it is real, then make it specific",
    (l) => /(Trusted|Loved|Used) by\s+[\d,]+\+?|\b\d{1,3}(,\d{3})*\+\s+(teams|companies|users|developers)/i.test(l)],
  // --- interface craft floor ---
  ["zoom-disabled", "error", "zoom disabled — never block pinch zoom",
    (l) => /user-scalable\s*=\s*(no|0)|maximum-scale\s*=\s*1(\.0)?\b/i.test(l)],
  ["paste-blocked", "error", "paste blocked — let people paste",
    (l) => /onPaste\s*=\s*\{.*preventDefault|onpaste\s*=\s*["'][^"']*(preventDefault|return false)|addEventListener\(\s*["']paste["'].*preventDefault/.test(l)],
  ["click-div", "error", "clickable <div>/<span> — use <button> for actions or <a href> for navigation",
    (l) => /<(div|span|li)\b[^>]*\bon(Click|click)\s*=/.test(l)],
  ["img-no-size", "warn", "<img> without width/height — reserves no space, the page will shift",
    (l) => /<img\b(?![^>]*\bwidth=)[^>]*>/i.test(l) || (/<img\b(?![^>]*\bheight=)[^>]*>/i.test(l) && !/aspect-ratio/.test(l))],
  ["img-no-alt", "error", "<img> without alt — describe it, or alt=\"\" if decorative",
    (l) => /<img\b(?![^>]*\balt=)[^>]*>/i.test(l)],
  ["three-dots", "warn", "'...' in UI text — use the ellipsis character …",
    (l) => />[^<>{}]*\w\.\.\.[^<>{}]*</.test(l) || /placeholder=["'][^"']*\.\.\.["']/.test(l)],
  ["vague-button", "warn", "vague button label — say what happens (\"Save API key\", not \"Submit\")",
    (l) => /<(button|a)\b[^>]*>\s*(Submit|Click here|Continue|OK|Learn more)\s*<\/(button|a)>/i.test(l)],
  ["autofocus", "info", "autofocus — desktop only, single obvious input",
    (l) => /\bautofocus\b|\bautoFocus\b/.test(l)],
  ["gif", "info", "animated GIF — use a muted looping <video playsinline> with a poster",
    (l) => /<img\b[^>]*\.gif["'?]/i.test(l)],
  ["side-stripe", "warn", "thick colored border-left/right on a card or callout — use a full hairline, a surface step or an icon",
    (l) => /border-(left|right)\s*:\s*([2-9]|\d{2,})px\s+solid\s+(?!transparent)/.test(l) || /\bborder-[lr]-(2|4|8)\b/.test(l)],
  ["hard-offset-shadow", "warn", "zero-blur offset block shadow — only in a world that is truly neobrutalist",
    (l) => /box-shadow\s*:\s*-?[1-9]\d*px\s+-?[1-9]\d*px\s+0(px)?\s+(?!0)/.test(l)],
];

// Undecided defaults (only with --defaults). Recommended in ~99% of cases when the user hasn't stated preferences.
const shadowBlur = (l) => {
  const m = l.match(/(?:box-shadow|filter)\s*:\s*([^;}]+)/); if (!m) return false;
  if (/^\s*none/.test(m[1])) return false;
  const parts = m[1].includes("drop-shadow") ? [m[1].replace(/.*drop-shadow\(/, "")] : m[1].split(/,(?![^(]*\))/);
  return parts.some((p) => !/\binset\b/.test(p) && (() => { const n = (p.replace(/(rgba?|hsla?|oklch|color-mix|var)\([^)]*\)+|#[0-9a-f]+/gi, "").match(/-?\d*\.?\d+/g) || []).map(Number); return n.length >= 3 && n[2] >= 8; })());
};
const DEFAULT_RULES = [
  ["default-shadow", "warn", "drop shadow — the undecided default is flat: hairlines, surface steps and tile contrast", shadowBlur],
  ["default-inter", "warn", "Inter — the face generated UI falls back to; undecided text is Geist, so use Inter only when the user or project chose it",
    (l) => /(font-family\s*:|--font[\w-]*\s*:|fontFamily|from\s+["']next\/font\/google["'])[^;\n]*\bInter\b(?!\s*(Tight|Display))/.test(l) || /\bimport\s*\{[^}]*\bInter\b[^}]*\}\s*from\s*["']next\/font\/google/.test(l) || /fonts\.googleapis\.com\/css2?\?family=Inter\b/.test(l)],
  ["default-bricolage", "warn", "Bricolage Grotesque — not used unless the user asks for it; undecided fonts are Geist only",
    (l) => /bricolage/i.test(l)],
  ["default-purple", "warn", "purple / violet — avoided unless the user's brand uses it",
    (l) => (l.match(/#[0-9a-fA-F]{6}\b|#[0-9a-fA-F]{3}\b/g) || []).some((h) => { const x = hue(h); return x !== null && x >= 255 && x <= 310; })],
  ["default-blue-gradient", "warn", "blue gradient — avoided unless the user asks for it",
    (l) => /gradient\(/.test(l) && (l.match(/#[0-9a-fA-F]{6}\b|#[0-9a-fA-F]{3}\b/g) || []).some((h) => { const x = hue(h); return x !== null && x >= 190 && x < 255; })],
  ["default-gradient-bg", "warn", "gradient background — the undecided default uses solid fields",
    (l) => /background(-image)?\s*:[^;]*(?<!repeating-)(linear|radial|conic)-gradient\(/.test(l) && !/(linear|radial)-gradient\((var\([^)]+\)),\s*\2\)/.test(l)],
];
if (defaults) RULES.push(...DEFAULT_RULES);

const files = [];
for (const t of targets) collect(t, files);
const findings = [];
const global = { balance: false, reducedMotion: false, focusVisible: false, animations: false, h1: false };
const htmlChecks = []; // per-document checks for full HTML pages

for (const f of files) {
  const src = fs.readFileSync(f, "utf8");
  if (/text-wrap\s*:\s*balance|\btext-balance\b/.test(src)) global.balance = true;
  if (/prefers-reduced-motion|motion-reduce|motion-safe/.test(src)) global.reducedMotion = true;
  if (/:focus-visible|focus-visible:/.test(src)) global.focusVisible = true;
  if (/@keyframes|animation\s*:|\banimate-/.test(src)) global.animations = true;
  if (/<h1\b|\bh1\s*[{,]/.test(src)) global.h1 = true;
  if (/\.html?$/i.test(f) && /<html[\s>]/i.test(src)) { // whole-document checks; framework layouts are covered by the render check
    const push = (id, sev, msg) => findings.push({ file: f, line: 0, id, sev, msg, text: "" });
    if (!/<html[^>]*\blang=/i.test(src)) push("no-lang", "warn", "<html> has no lang attribute");
    if (!/<title>[^<]+<\/title>/i.test(src)) push("no-title", "warn", "no <title> describing the page");
    if (!/name=["']theme-color["']/i.test(src)) push("no-theme-color", "info", "no <meta name=\"theme-color\"> matching the canvas");
    if (!/href=["']#main["']|class=["'][^"']*skip/i.test(src)) push("no-skip-link", "info", "no skip-to-content link");
    // font budget: 1-3 families recommended, 5 is the hard ceiling (counts @font-face names plus the first named family of each stack)
    {
      const generic = /^(serif|sans-serif|monospace|cursive|fantasy|system-ui|ui-[a-z]+|-apple-system|blinkmacsystemfont|inherit|initial|unset|emoji)$/i;
      const fams = new Set();
      for (const m of src.matchAll(/@font-face\s*\{[^}]*font-family\s*:\s*["']?([^;"'}]+)/gi)) fams.add(m[1].trim().toLowerCase());
      for (const m of src.matchAll(/font-family\s*:\s*([^;}]+)/gi)) {
        if (/@font-face/.test(m[0])) continue;
        const first = m[1].split(",").map((x) => x.trim().replace(/^["']|["']$/g, "")).find((x) => x && !generic.test(x) && !/^var\(/.test(x));
        if (first) fams.add(first.toLowerCase());
      }
      if (fams.size > 5) push("font-count", "error", `${fams.size} font families (${[...fams].join(", ")}) — hard maximum is 5, recommended 1 to 3`);
      else if (fams.size > 3) push("font-count", "info", `${fams.size} font families (${[...fams].join(", ")}) — 1 to 3 is recommended; 4 or 5 only with a reason`);
      const wts = new Set([...src.matchAll(/font-weight\s*:\s*(\d{3})/g)].map((m) => m[1]));
      if (wts.size > 5) push("weight-count", "info", `${wts.size} font weights in one page (${[...wts].sort().join(", ")}) — about 4 reads as one system`);
    }
    // faces generated pages reach for constantly: one note per face per file, unless the file says why (slop-ok: overused-font …)
    if (!/slop-ok:\s*overused-font/.test(src)) {
      const over = new Set([...src.matchAll(/font-family\s*:\s*["']?(Inter|Fraunces|Playfair Display|Cormorant(?: Garamond)?|Lora|Crimson(?: Pro| Text)?|Newsreader|Syne|Space Grotesk|Space Mono|IBM Plex \w+|DM Sans|DM Serif \w+|Outfit|Plus Jakarta Sans|Instrument Sans|Instrument Serif|Poppins|Montserrat)\b/gi)].map((m) => m[1]));
      for (const face of over) push("overused-font", "info", `${face}: a face generated pages reach for constantly; keep it only with a reason no other face meets, and note it with /* slop-ok: overused-font, reason */`);
    }
    // font files must exist where the page will look for them (a moved page silently falls back to system fonts)
    for (const m of src.matchAll(/url\(\s*["']?([^"')]+\.(?:woff2?|ttf|otf))["']?\s*\)/gi)) {
      if (/^(https?:|data:|\/\/)/i.test(m[1])) continue;
      if (!fs.existsSync(path.resolve(path.dirname(f), m[1].split(/[?#]/)[0]))) { push("font-missing", "error", `font file not found: ${m[1]} — run scripts/vendor-fonts.mjs on this page`); }
    }
    const h1s = (src.match(/<h1\b/gi) || []).length;
    if (h1s > 1) push("multi-h1", "warn", `${h1s} <h1> elements — one per page`);
    if (/outline\s*:\s*(none|0)\b|\boutline-none\b/.test(src) && !/:focus-visible|focus-visible:/.test(src))
      push("outline-removed", "error", "outline removed with no :focus-visible replacement");
    const darkCanvas = /--(canvas|background|bg)\s*:\s*(#0|#1[0-9a-f]{2}\b|#1[0-9a-f]{5}|#2[0-4]|rgb\(\s*[0-3]?\d\s)/i.test(src);
    if (darkCanvas && !/color-scheme\s*:\s*dark/.test(src)) push("no-color-scheme", "warn", "dark page without color-scheme: dark on <html>");
    for (const m of src.matchAll(/<input\b([^>]*)>/gi)) {
      const a = m[1];
      if (/type=["'](hidden|submit|button|checkbox|radio)["']/i.test(a)) continue;
      const id = (a.match(/\bid=["']([^"']+)["']/) || [])[1];
      const labelled = /aria-label(ledby)?=/.test(a) || (id && new RegExp(`for=["']${id}["']`).test(src));
      const before = src.slice(Math.max(0, m.index - 400), m.index);
      const wrapped = /<label\b(?![\s\S]*<\/label>)[\s\S]*$/.test(before);
      if (!labelled && !wrapped) { push("input-no-label", "error", "input without a label or aria-label"); break; }
    }
  }
  const lines = src.split(/\r?\n/);
  lines.forEach((line, i) => {
    if (line.length > 4000) return; // minified blob
    if (/slop-ok/.test(line)) return; // deliberate, justified inline: /* slop-ok: reason */
    for (const [id, sev, msg, test] of RULES) {
      const hit = test(line);
      if (hit) findings.push({ file: f, line: i + 1, id, sev, msg: typeof hit === "string" ? `${msg} (${hit})` : msg, text: line.trim().slice(0, 140) });
    }
  });
}

if (global.h1 && !global.balance) findings.push({ file: "(project)", line: 0, id: "no-balance", sev: "warn", msg: "no text-wrap: balance on headings anywhere", text: "" });
if (global.animations && !global.reducedMotion) findings.push({ file: "(project)", line: 0, id: "no-reduced-motion", sev: "error", msg: "animations exist but no prefers-reduced-motion handling", text: "" });
if (files.length && !global.focusVisible) findings.push({ file: "(project)", line: 0, id: "no-focus-visible", sev: "warn", msg: "no :focus-visible styles — keyboard users get nothing", text: "" });

const weight = { error: 5, warn: 2, info: 1 };
const penalty = findings.reduce((s, x) => s + weight[x.sev], 0);
const score = Math.max(0, 100 - penalty);

if (asJson) {
  console.log(JSON.stringify({ files: files.length, score, findings }, null, 2));
} else {
  const byId = {};
  for (const x of findings) (byId[x.id] ??= []).push(x);
  const order = { error: 0, warn: 1, info: 2 };
  const groups = Object.values(byId).sort((a, b) => order[a[0].sev] - order[b[0].sev] || b.length - a.length);
  console.log(`majestic-ui slop lint · ${files.length} file(s) scanned\n`);
  for (const g of groups) {
    console.log(`[${g[0].sev.toUpperCase()}] ${g[0].id} ×${g.length} — ${g[0].msg.replace(/ \(.*\)$/, "")}`);
    for (const x of g.slice(0, 6)) console.log(`   ${x.file}${x.line ? ":" + x.line : ""}${x.text ? "  " + x.text : ""}`);
    if (g.length > 6) console.log(`   …and ${g.length - 6} more`);
  }
  const c = (s) => findings.filter((x) => x.sev === s).length;
  console.log(`\n${c("error")} errors · ${c("warn")} warnings · ${c("info")} notes · slop score ${score}/100 (100 = clean)`);
  console.log("Each finding needs a fix or a one-line reason from the brief. The lint is mechanical; do the visual audit too.");
}
