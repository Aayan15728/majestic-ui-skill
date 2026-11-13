#!/usr/bin/env node
// majestic-ui font vendoring: makes a page's webfonts load wherever the page ends up.
// Zero dependencies.
//
// Usage: node vendor-fonts.mjs <page.html> [more pages...] [--inline] [--cdn] [--dir fonts]
//   default   copies every .woff2 the page's @font-face rules point at into <page folder>/fonts/ (with the OFL
//             license files) and rewrites the url()s, so the page and its fonts travel together
//   --inline  embeds the fonts as base64 data: URLs instead, for a single self-contained .html file
//   --cdn     after the local file, adds a pinned jsDelivr copy as a second source; the browser uses it only
//             if the local file is missing (Geist, Geist Mono, Geist Serif, Geist Pixel, Newsreader,
//             Instrument Serif, Bricolage Grotesque, Funnel Display)
//   --dir     folder name for copied fonts (default: fonts)
//
// A font is looked for next to the page first, then in this skill's examples/fonts/ folder.
// Exit codes: 0 all fonts resolved, 1 some font file could not be found anywhere, 2 bad usage.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const argv = process.argv.slice(2);
const inline = argv.includes("--inline"), cdn = argv.includes("--cdn");
const di = argv.indexOf("--dir"); const dirName = di >= 0 ? argv[di + 1] : "fonts";
const pages = argv.filter((a, i) => !a.startsWith("--") && argv[i - 1] !== "--dir");
if (!pages.length) { console.error("Usage: node vendor-fonts.mjs <page.html> [...] [--inline] [--cdn] [--dir fonts]"); process.exit(2); }

const here = path.dirname(fileURLToPath(import.meta.url));
const skillFonts = path.resolve(here, "..", "examples", "fonts");

const FONTSOURCE = { "geist-sans": "@fontsource/geist-sans@5.3.0", "geist-mono": "@fontsource/geist-mono@5.3.0", "newsreader": "@fontsource/newsreader@5.3.0",
  "instrument-serif": "@fontsource/instrument-serif@5.3.0", "bricolage-grotesque": "@fontsource/bricolage-grotesque@5.3.0", "funnel-display": "@fontsource/funnel-display@5.3.0" };
const GEIST_PKG = { "geist-serif-regular.woff2": "geist@1.9.0/dist/fonts/geist-serif/GeistSerif-Regular.woff2", "geist-pixel-square.woff2": "geist@1.9.0/dist/fonts/geist-pixel/GeistPixel-Square.woff2" };
function cdnUrl(base) {
  if (GEIST_PKG[base]) return "https://cdn.jsdelivr.net/npm/" + GEIST_PKG[base];
  const m = base.match(/^(.+?)-latin-\d{3}-(normal|italic)\.woff2$/);
  if (m && FONTSOURCE[m[1]]) return `https://cdn.jsdelivr.net/npm/${FONTSOURCE[m[1]]}/files/${base}`;
  return null;
}
const LICENSE = [[/^geist-(serif|pixel)/, "geist-family-OFL.txt"], [/^geist-(sans|mono)/, "geist-sans-OFL.txt"], [/^newsreader/, "newsreader-OFL.txt"],
  [/^instrument-serif/, "instrument-serif-OFL.txt"], [/^bricolage/, "bricolage-grotesque-OFL.txt"], [/^funnel/, "funnel-display-OFL.txt"]];

let missing = 0;
for (const page of pages) {
  const file = path.resolve(page), dir = path.dirname(file);
  let src = fs.readFileSync(file, "utf8");
  const done = new Map(), licenses = new Set(), report = [];
  src = src.replace(/@font-face\s*\{[^}]*\}/gi, (block) => block.replace(/src\s*:\s*([^;]+);/i, (whole, list) => {
    const first = list.match(/url\(\s*["']?([^"')]+)["']?\s*\)/i);
    if (!first) return whole;
    const ref = first[1];
    if (/^(https?:|data:)/i.test(ref)) { report.push(`kept   ${ref.slice(0, 70)}`); return whole; }
    const base = path.basename(ref.split(/[?#]/)[0]);
    let found = [path.resolve(dir, ref), path.join(dir, dirName, base), path.join(skillFonts, base)].find((p) => fs.existsSync(p));
    if (!found) { missing++; report.push(`MISSING ${ref} (not next to the page, not in ${skillFonts})`); return whole; }
    const lic = LICENSE.find(([re]) => re.test(base)); if (lic) licenses.add(lic[1]);
    let local;
    if (inline) {
      if (!done.has(found)) done.set(found, "data:font/woff2;base64," + fs.readFileSync(found).toString("base64"));
      local = done.get(found); report.push(`inline ${base} (${Math.round(fs.statSync(found).size / 1024)} KB)`);
    } else {
      const dest = path.join(dir, dirName, base);
      fs.mkdirSync(path.dirname(dest), { recursive: true });
      if (path.resolve(found) !== path.resolve(dest)) fs.copyFileSync(found, dest);
      local = `${dirName}/${base}`; report.push(`copied ${base} -> ${local}`);
    }
    const remote = cdn ? cdnUrl(base) : null;
    return `src: url("${local}") format("woff2")${remote ? `, url("${remote}") format("woff2")` : ""};`;
  }));
  if (!inline && licenses.size) {
    const ld = path.join(dir, dirName, "licenses"); fs.mkdirSync(ld, { recursive: true });
    for (const l of licenses) { const s = path.join(skillFonts, "licenses", l); if (fs.existsSync(s)) fs.copyFileSync(s, path.join(ld, l)); }
  }
  if (inline && licenses.size && !/SIL Open Font License/.test(src))
    src = src.replace(/<style>/i, `<style>/* Fonts embedded under the SIL Open Font License 1.1: ${[...licenses].map((l) => l.replace(/-OFL\.txt$/, "")).join(", ")}. */\n`);
  fs.writeFileSync(file, src);
  console.log(`${page}\n  ${report.join("\n  ") || "no @font-face rules found"}`);
}
if (missing) { console.error(`\n${missing} font file(s) could not be found. The page will draw a fallback font for them.`); process.exit(1); }
