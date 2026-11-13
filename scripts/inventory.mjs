#!/usr/bin/env node
// majestic-ui inventory: measures design sprawl in an existing codebase and proposes the token set to consolidate to.
// Zero dependencies. Reads CSS, SCSS, HTML, JSX/TSX, Vue, Svelte, Astro and MDX, including Tailwind classes.
//
// Usage: node inventory.mjs [folder ...] [--out design-inventory] [--json]
//   default folder: the current directory (node_modules, build output and dot-folders are skipped)
//
// Writes design-inventory.md (and .json): counts against healthy targets, near-duplicate colors to merge, a proposed
// type scale, spacing, radius and shadow set with old → new mappings, button and input style variants, and the files
// that carry the most one-off values. Use it before a redesign or polish of an existing product, and again after.
import fs from "node:fs";
import path from "node:path";

const argv = process.argv.slice(2);
const flag = (n) => { const i = argv.indexOf(n); return i >= 0 ? argv[i + 1] : null; };
const roots = argv.filter((a, i) => !a.startsWith("--") && argv[i - 1] !== "--out");
if (!roots.length) roots.push(".");
const outBase = path.resolve(flag("--out") || "design-inventory");
const EXT = new Set([".css", ".scss", ".sass", ".less", ".html", ".htm", ".jsx", ".tsx", ".js", ".ts", ".vue", ".svelte", ".astro", ".mdx"]);
const SKIP = new Set(["node_modules", "dist", "build", ".next", ".nuxt", ".output", "out", "coverage", "vendor", ".git", ".turbo", ".vercel", "storybook-static"]);
const files = [];
(function walk(p) { let st; try { st = fs.statSync(p); } catch { return; }
  if (st.isDirectory()) { for (const f of fs.readdirSync(p)) if (!SKIP.has(f) && !(f.startsWith(".") && f.length > 1)) walk(path.join(p, f)); }
  else if (EXT.has(path.extname(p)) && !/\.min\.|\.d\.ts$|\.test\.|\.spec\./.test(p) && st.size < 800000) files.push(p); })(...roots.length === 1 ? [roots[0]] : [roots[0]]);
for (const r of roots.slice(1)) (function walk(p) { let st; try { st = fs.statSync(p); } catch { return; } if (st.isDirectory()) { for (const f of fs.readdirSync(p)) if (!SKIP.has(f) && !f.startsWith(".")) walk(path.join(p, f)); } else if (EXT.has(path.extname(p))) files.push(p); })(r);

// ---------- color math ----------
const clamp = (v) => Math.max(0, Math.min(255, Math.round(v)));
const lin = (v) => ((v /= 255) <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
const toLab = ([r, g, b]) => { const R = lin(r), G = lin(g), B = lin(b); let x = (R * 0.4124 + G * 0.3576 + B * 0.1805) / 0.95047, y = R * 0.2126 + G * 0.7152 + B * 0.0722, z = (R * 0.0193 + G * 0.1192 + B * 0.9505) / 1.08883; const f = (t) => (t > 0.008856 ? Math.cbrt(t) : 7.787 * t + 16 / 116); x = f(x); y = f(y); z = f(z); return [116 * y - 16, 500 * (x - y), 200 * (y - z)]; };
const dE = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
const hex = (c) => "#" + c.map((v) => clamp(v).toString(16).padStart(2, "0")).join("");
const enc = (v) => (v <= 0.0031308 ? 12.92 * v : 1.055 * v ** (1 / 2.4) - 0.055) * 255;
function parseColor(s) {
  s = s.trim().toLowerCase();
  let m;
  if ((m = s.match(/^#([0-9a-f]{3,8})$/))) { let h = m[1]; if (h.length === 3 || h.length === 4) h = [...h].map((c) => c + c).join(""); if (h.length !== 6 && h.length !== 8) return null; return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16)); }
  if ((m = s.match(/^rgba?\(\s*([\d.]+)[\s,]+([\d.]+)[\s,]+([\d.]+)/))) return [+m[1], +m[2], +m[3]];
  if ((m = s.match(/^hsla?\(\s*([\d.]+)(?:deg)?[\s,]+([\d.]+)%[\s,]+([\d.]+)%/))) { const h = +m[1] / 360, sat = +m[2] / 100, l = +m[3] / 100; const f = (n) => { const k = (n + h * 12) % 12, a = sat * Math.min(l, 1 - l); return l - a * Math.max(-1, Math.min(k - 3, 9 - k, 1)); }; return [f(0) * 255, f(8) * 255, f(4) * 255]; }
  if ((m = s.match(/^oklch\(\s*([\d.]+)(%?)\s+([\d.]+)\s+([\d.]+)/))) { const L = m[2] ? +m[1] / 100 : +m[1], C = +m[3], H = (+m[4] * Math.PI) / 180; const a = C * Math.cos(H), b = C * Math.sin(H);
    const l_ = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3, m_ = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3, s_ = (L - 0.0894841775 * a - 1.291485548 * b) ** 3;
    return [enc(4.0767416621 * l_ - 3.3077115913 * m_ + 0.2309699292 * s_), enc(-1.2684380046 * l_ + 2.6097574011 * m_ - 0.3413193965 * s_), enc(-0.0041960863 * l_ - 0.7034186147 * m_ + 1.707614701 * s_)]; }
  return null;
}
const TW_FAMILIES = "slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose";
const TW_TEXT = { xs: 12, sm: 14, base: 16, lg: 18, xl: 20, "2xl": 24, "3xl": 30, "4xl": 36, "5xl": 48, "6xl": 60, "7xl": 72, "8xl": 96, "9xl": 128 };
const TW_RADIUS = { none: 0, xs: 2, sm: 4, "": 4, md: 6, lg: 8, xl: 12, "2xl": 16, "3xl": 24, "4xl": 32, full: 9999 };
const TW_WEIGHT = { thin: 100, extralight: 200, light: 300, normal: 400, medium: 500, semibold: 600, bold: 700, extrabold: 800, black: 900 };
const px = (v, unit) => (unit === "rem" || unit === "em" ? +v * 16 : +v);

// ---------- collect ----------
const S = { colors: new Map(), sizes: new Map(), weights: new Map(), families: new Map(), spacing: new Map(), radii: new Map(), shadows: new Map(), z: new Map(), media: new Map(), twGreys: new Map(), twHues: new Map(), buttons: new Map(), inputs: new Map() };
const perFile = new Map();
const add = (map, key, where, extra) => { if (key === null || key === undefined || key === "") return; const e = map.get(key) || { n: 0, at: [], ...extra }; e.n++; if (e.at.length < 3) e.at.push(where); map.set(key, e); perFile.set(where.split(":")[0], (perFile.get(where.split(":")[0]) || 0) + 1); };
const GREYS = new Set(["slate", "gray", "zinc", "neutral", "stone"]);
for (const f of files) {
  const rel = path.relative(path.resolve(roots[0]), f) || path.basename(f), src = fs.readFileSync(f, "utf8");
  const lines = src.split(/\r?\n/);
  lines.forEach((line, i) => {
    if (line.length > 3000) return;
    const at = `${rel}:${i + 1}`;
    for (const m of line.matchAll(/#[0-9a-fA-F]{3,8}\b|rgba?\([^)]*\)|hsla?\([^)]*\)|oklch\([^)]*\)/g)) { if (/^#[0-9a-f]{3,8}$/i.test(m[0]) && !/[:\s"'(,`=\[]#/.test(line.slice(Math.max(0, m.index - 1), m.index + 1)) && m.index > 0) continue; const c = parseColor(m[0]); if (c) add(S.colors, hex(c), at, { rgb: c }); }
    for (const m of line.matchAll(/font-size\s*:\s*([\d.]+)(px|rem|em)\b/g)) add(S.sizes, Math.round(px(m[1], m[2])), at);
    for (const m of line.matchAll(/\bfont\s*:\s*(?:[a-z-]+\s+)*?(\d{3}\s+)?([\d.]+)(px|rem)\b/g)) add(S.sizes, Math.round(px(m[2], m[3])), at);
    for (const m of line.matchAll(/font-weight\s*:\s*(\d{3})/g)) add(S.weights, +m[1], at);
    for (const m of line.matchAll(/font-family\s*:\s*["']?([^,;"'}]+)/g)) { const fam = m[1].trim(); if (!/^var\(|^inherit|^(sans-serif|serif|monospace|system-ui)$/.test(fam)) add(S.families, fam, at); }
    for (const m of line.matchAll(/import\s*\{([^}]+)\}\s*from\s+["'](next\/font\/google|geist\/font\/\w+)["']/g)) for (const name of m[1].split(",")) { const n = name.trim().split(/\s+as\s+/)[0]; if (n) add(S.families, n.replace(/_/g, " "), at); }
    for (const m of line.matchAll(/\b(?:padding|margin|gap|row-gap|column-gap|top|left|right|bottom|inset)(?:-[a-z]+)?\s*:\s*([^;}"']+)/g)) for (const v of m[1].matchAll(/(-?[\d.]+)(px|rem)\b/g)) { const n = Math.abs(Math.round(px(v[1], v[2]))); if (n > 0 && n < 400) add(S.spacing, n, at); }
    for (const m of line.matchAll(/border-radius\s*:\s*([\d.]+)(px|rem|%)/g)) { const r = m[2] === "%" ? 9999 : Math.round(px(m[1], m[2])); add(S.radii, r >= 100 ? 9999 : r, at); }
    for (const m of line.matchAll(/box-shadow\s*:\s*([^;}]+)/g)) { const v = m[1].trim(); if (!/^(none|0|inherit|var\()/.test(v)) add(S.shadows, v.replace(/\s+/g, " ").slice(0, 90), at); }
    for (const m of line.matchAll(/z-index\s*:\s*(-?\d+)/g)) add(S.z, +m[1], at);
    for (const m of line.matchAll(/@media[^{]*\((?:min|max)-width\s*:\s*([\d.]+)(px|rem|em)/g)) add(S.media, Math.round(px(m[1], m[2])), at);
    // Tailwind
    for (const m of line.matchAll(new RegExp(`(?<![\\w-])(?:[a-z]+:)*(?:bg|text|border|ring|fill|stroke|from|via|to|outline|divide|placeholder|decoration|accent|caret|shadow)-(${TW_FAMILIES})-(50|[1-9]00|950)(?:\\/\\d+)?(?![\\w-])`, "g"))) { add(GREYS.has(m[1]) ? S.twGreys : S.twHues, m[1], at); add(S.colors, `tw:${m[1]}-${m[2]}`, at, { tw: true }); }
    for (const m of line.matchAll(/(?<![\w-])(?:[a-z]+:)*(?:bg|text|border|from|to|via|fill|stroke)-\[(#[0-9a-fA-F]{3,8}|rgba?\([^\]]+\))\]/g)) { const c = parseColor(m[1].replace(/_/g, " ")); if (c) add(S.colors, hex(c), at, { rgb: c, arbitrary: true }); }
    for (const m of line.matchAll(/(?<![\w-])(?:[a-z]+:)*text-(xs|sm|base|lg|xl|[2-9]xl)(?![\w-])/g)) add(S.sizes, TW_TEXT[m[1]], at);
    for (const m of line.matchAll(/(?<![\w-])(?:[a-z]+:)*text-\[([\d.]+)(px|rem)\]/g)) add(S.sizes, Math.round(px(m[1], m[2])), at);
    for (const m of line.matchAll(/(?<![\w-])(?:[a-z]+:)*font-(thin|extralight|light|normal|medium|semibold|bold|extrabold|black)(?![\w-])/g)) add(S.weights, TW_WEIGHT[m[1]], at);
    for (const m of line.matchAll(/(?<![\w-])(?:[a-z]+:)*-?(?:p|px|py|pt|pr|pb|pl|m|mx|my|mt|mr|mb|ml|gap|gap-x|gap-y|space-x|space-y|top|left|right|bottom|inset)-(\d+(?:\.5)?|\[[\d.]+(?:px|rem)\])(?![\w-])/g)) { const v = m[1]; const n = v.startsWith("[") ? Math.round(px(...v.slice(1, -1).match(/([\d.]+)(px|rem)/).slice(1))) : Math.round(+v * 4); if (n > 0) add(S.spacing, n, at); }
    for (const m of line.matchAll(/(?<![\w-])(?:[a-z]+:)*rounded(?:-(?:t|b|l|r|tl|tr|bl|br|s|e))?(?:-(none|xs|sm|md|lg|xl|2xl|3xl|4xl|full|\[[\d.]+px\]))?(?![\w-])/g)) { const k = m[1] || ""; add(S.radii, k.startsWith("[") ? Math.round(parseFloat(k.slice(1))) : TW_RADIUS[k], at); }
    for (const m of line.matchAll(/(?<![\w-])(?:[a-z]+:)*shadow(?:-(xs|sm|md|lg|xl|2xl|inner|\[[^\]]+\]))?(?![\w-])/g)) { if (/shadow-(none|transparent)/.test(m[0])) continue; add(S.shadows, `tailwind shadow${m[1] ? "-" + m[1] : ""}`, at); }
  });
  // style variants of native buttons and inputs (class lists, order-insensitive)
  for (const [tag, map] of [["button", S.buttons], ["input", S.inputs]]) for (const m of src.matchAll(new RegExp(`<${tag}\\b[^>]*?\\bclass(?:Name)?=(?:"([^"]*)"|'([^']*)'|\\{\`([^\`]*)\`\\})`, "g"))) {
    const cls = (m[1] || m[2] || m[3] || "").split(/\s+/).filter((c) => c && !/\$\{/.test(c)).sort().join(" "); if (cls) add(map, cls, `${rel}`);
  }
}

// ---------- analyse ----------
const sorted = (map) => [...map.entries()].sort((a, b) => b[1].n - a[1].n);
const rawColors = sorted(S.colors).filter(([k]) => !k.startsWith("tw:"));
const twColors = sorted(S.colors).filter(([k]) => k.startsWith("tw:"));
// cluster raw colors that sit within ΔE 3 of each other
const clusters = [];
for (const [k, v] of rawColors) { const L = toLab(v.rgb); const c = clusters.find((c) => dE(c.lab, L) < 3); if (c) { c.members.push([k, v.n]); c.n += v.n; } else clusters.push({ lab: L, rep: k, members: [[k, v.n]], n: v.n }); }
const greysRaw = rawColors.filter(([, v]) => { const L = toLab(v.rgb); return Math.hypot(L[1], L[2]) < 6; });
// type scale: snap every size to the nearest step of a clean scale
const SCALE = [12, 14, 16, 18, 20, 24, 30, 36, 48, 60, 72, 96];
const sizes = sorted(S.sizes).map(([k, v]) => [+k, v.n]);
const keepSizes = (() => { // snap every size to the clean scale, keep steps carrying at least 2% of uses (max 8), always keep the largest
  const snap = (v) => SCALE.reduce((a, b) => (Math.abs(b - v) < Math.abs(a - v) ? b : a)); const tally = new Map(); let total = 0;
  for (const [s, n] of sizes) { const k = snap(s); tally.set(k, (tally.get(k) || 0) + n); total += n; }
  let out = [...tally.entries()].filter(([, n]) => n >= total * 0.02).sort((a, b) => b[1] - a[1]).slice(0, 8).map(([k]) => k);
  if (sizes.length) { const top = snap(Math.max(...sizes.map(([s]) => s))); if (!out.includes(top)) out[out.length >= 8 ? 7 : out.length] = top; }
  if (!out.includes(16)) { if (out.length >= 8) { const mx = Math.max(...out); for (let i = out.length - 1; i >= 0; i--) if (out[i] !== mx) { out.splice(i, 1); break; } } out.push(16); } // body default, often implicit
  return out.sort((a, b) => a - b); })();
const mapTo = (v, set) => set.reduce((a, b) => (Math.abs(b - v) < Math.abs(a - v) ? b : a));
const spacing = sorted(S.spacing).map(([k, v]) => [+k, v.n]);
const offGrid = spacing.filter(([s]) => s % 4 !== 0 && s !== 1 && s !== 2 && s !== 6);
const SPACE = [2, 4, 8, 12, 16, 20, 24, 32, 40, 48, 56, 64, 80, 96, 128];
const radii = sorted(S.radii).map(([k, v]) => [+k, v.n]);
const keepRadii = (() => { const r = radii.filter(([v]) => v !== 9999 && v > 0).slice(0, 3).map(([v]) => v).sort((a, b) => a - b); if (radii.some(([v]) => v === 9999)) r.push(9999); return r; })();
const weights = sorted(S.weights).map(([k, v]) => [+k, v.n]);
const families = sorted(S.families);
const shadows = sorted(S.shadows);
const buttons = sorted(S.buttons), inputs = sorted(S.inputs);
const twGreyFamilies = sorted(S.twGreys), twHueFamilies = sorted(S.twHues);
const status = (n, ok, warn) => (n <= ok ? "ok" : n <= warn ? "high" : "**sprawl**");
const rows = [
  ["Distinct colors (raw values)", rawColors.length, `${clusters.length} after merging near-duplicates`, "12–16 tokens", status(clusters.length, 16, 28)],
  ["Grey shades (raw)", greysRaw.length, "", "5–7", status(greysRaw.length, 7, 12)],
  ["Tailwind grey families", twGreyFamilies.length, twGreyFamilies.map(([k]) => k).join(", "), "1", status(twGreyFamilies.length, 1, 2)],
  ["Tailwind hue families", twHueFamilies.length, twHueFamilies.slice(0, 6).map(([k]) => k).join(", "), "1–3", status(twHueFamilies.length, 3, 5)],
  ["Font sizes", sizes.length, sizes.slice(0, 12).map(([s]) => s).sort((a, b) => a - b).join(", "), "6–8", status(sizes.length, 8, 12)],
  ["Font families", families.length, families.slice(0, 5).map(([k]) => k).join(", "), "1–3 (max 5)", status(families.length, 3, 5)],
  ["Font weights", weights.length, weights.map(([w]) => w).sort().join(", "), "about 4", status(weights.length, 4, 6)],
  ["Spacing values", spacing.length, `${offGrid.length} off the 4px grid`, "a 4px scale, ~12 steps", status(spacing.length, 14, 24)],
  ["Corner radii", radii.length, radii.map(([r]) => (r === 9999 ? "full" : r)).join(", "), "3 + pill", status(radii.length, 4, 6)],
  ["Shadows", shadows.length, "", "0–2", status(shadows.length, 2, 4)],
  ["z-index values", S.z.size, [...S.z.keys()].sort((a, b) => a - b).join(", "), "a named scale of ~5", status(S.z.size, 6, 10)],
  ["Breakpoints", S.media.size, [...S.media.keys()].sort((a, b) => a - b).join(", "), "3–5", status(S.media.size, 5, 8)],
  ["Button style variants", buttons.length, "distinct class lists on <button>", "2–4 variants of one component", status(buttons.length, 4, 8)],
  ["Input style variants", inputs.length, "distinct class lists on <input>", "1–2", status(inputs.length, 2, 4)],
];
const sprawl = rows.filter((r) => r[4] === "**sprawl**").length, high = rows.filter((r) => r[4] === "high").length;
const score = Math.max(0, 100 - sprawl * 10 - high * 4);
const loc = (e) => e.at.slice(0, 2).join(", ");

const md = [];
md.push(`# Design inventory`, "", `${files.length} files scanned in ${roots.join(", ")}. Consistency score **${score}/100** (each sprawling row costs 10, each high row 4).`, "");
md.push("| What | Found | Detail | Healthy | Status |", "|---|---|---|---|---|", ...rows.map((r) => `| ${r[0]} | ${r[1]} | ${r[2]} | ${r[3]} | ${r[4]} |`), "");
md.push("## Proposed tokens", "", "A starting point to consolidate to; check it against the brand and `DESIGN.md` before migrating.", "");
md.push(`**Type scale:** ${keepSizes.join(", ")}px.`, "", "| Found | Uses | Becomes |", "|---|---|---|", ...sizes.filter(([s]) => !keepSizes.includes(s)).slice(0, 20).map(([s, n]) => `| ${s}px | ${n} | ${mapTo(s, keepSizes)}px |`), "");
md.push(`**Spacing:** the 4px scale ${SPACE.join(", ")}. Off-grid values to move:`, "", "| Found | Uses | Becomes | Example |", "|---|---|---|---|", ...offGrid.slice(0, 15).map(([s, n]) => `| ${s}px | ${n} | ${mapTo(s, SPACE)}px | ${loc(S.spacing.get(s))} |`), "");
md.push(`**Radii:** ${keepRadii.map((r) => (r === 9999 ? "pill" : r + "px")).join(", ")}. Everything else maps to the nearest.`, "");
md.push(`**Weights:** keep ${weights.slice(0, 4).map(([w]) => w).sort().join(", ")}${weights.length > 4 ? `; move ${weights.slice(4).map(([w]) => w).join(", ")}` : ""}.`, "");
md.push(`**Shadows:** ${shadows.length ? `${shadows.length} found; keep at most one for overlays and one for raised previews, or none for a flat system.` : "none, which suits a flat system."}`, "");
const dupes = clusters.filter((c) => c.members.length > 1).sort((a, b) => b.n - a.n);
if (dupes.length) md.push("## Near-duplicate colors to merge (within ΔE 3)", "", "| Keep | Merge in | Uses |", "|---|---|---|", ...dupes.slice(0, 15).map((c) => `| \`${c.rep}\` | ${c.members.slice(1).map(([k, n]) => `\`${k}\` (${n})`).join(", ")} | ${c.n} |`), "");
md.push("## Most-used raw colors", "", "| Color | Uses | Where |", "|---|---|---|", ...rawColors.slice(0, 16).map(([k, v]) => `| \`${k}\` | ${v.n} | ${loc(v)} |`), "");
if (twColors.length) md.push("## Tailwind palette classes in use", "", twColors.slice(0, 30).map(([k, v]) => `\`${k.slice(3)}\` ×${v.n}`).join(" · "), "");
if (buttons.length > 1) md.push("## Button styles (one component with variants should replace these)", "", "| Uses | Classes | First seen |", "|---|---|---|", ...buttons.slice(0, 10).map(([k, v]) => `| ${v.n} | \`${k.slice(0, 120)}\` | ${v.at[0]} |`), "");
if (shadows.length) md.push("## Shadows", "", ...shadows.slice(0, 10).map(([k, v]) => `- \`${k}\` ×${v.n} (${loc(v)})`), "");
md.push("## Files with the most one-off values", "", ...[...perFile.entries()].sort((a, b) => b[1] - a[1]).slice(0, 12).map(([f, n]) => `- ${f}: ${n}`), "");
md.push("## Next steps", "", "1. Agree the token set above (colors with roles, type scale, spacing, radii, shadows) and write it to `DESIGN.md` and the global stylesheet or Tailwind theme.",
  "2. Replace raw values file by file, starting with the files listed above; keep each change visual-diff checked (`verify-render.mjs`).",
  "3. Collapse the button and input variants into one component each (shadcn/ui's Button and Input when the stack fits, see `shadcn.md`).", "4. Run this inventory again; the score should rise and the sprawl rows should clear.");
fs.writeFileSync(outBase + ".md", md.join("\n") + "\n");
fs.writeFileSync(outBase + ".json", JSON.stringify({ files: files.length, score, rows: rows.map(([what, found, detail, healthy, st]) => ({ what, found, detail, healthy, status: st.replace(/\*/g, "") })), typeScale: keepSizes, radii: keepRadii, colorClusters: clusters.map((c) => ({ keep: c.rep, members: c.members })) }, null, 2));
if (argv.includes("--json")) console.log(fs.readFileSync(outBase + ".json", "utf8"));
else {
  console.log(`majestic-ui inventory · ${files.length} files · consistency ${score}/100\n`);
  for (const r of rows) console.log(`${r[4].replace(/\*/g, "").padEnd(7)} ${String(r[1]).padStart(4)}  ${r[0]}${r[2] ? "  (" + String(r[2]).slice(0, 70) + ")" : ""}`);
  console.log(`\nProposed type scale ${keepSizes.join(", ")} · radii ${keepRadii.map((r) => (r === 9999 ? "pill" : r)).join(", ")} · ${dupes.length} near-duplicate color groups\nReport: ${outBase}.md`);
}
