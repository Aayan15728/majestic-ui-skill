#!/usr/bin/env node
// majestic-ui render check: opens the page in a real browser and measures what the code lint cannot.
// Zero dependencies: it drives Chrome, Chromium or Edge directly over the DevTools protocol (Node 22+).
//
// Usage: node verify-render.mjs <page.html | http://url> [--out dir] [--ref examples/<name>] [--dark] [--app] [--cdp http://127.0.0.1:9222] [--json]
//   --ref   reference example folder; its web.jpg / mobile.jpg are placed beside your page in compare.png
//   --app   the page is a product screen (dashboard, docs, tool), not a landing page: skips the hero headline-size and first-screen budget rules
//   --dark  also check the page in dark mode (prefers-color-scheme: dark, and data-theme="dark" when the page uses it)
//   --cdp   use a Chrome that is already running with --remote-debugging-port instead of starting one
//   CHROME_PATH=/path/to/chrome overrides browser discovery; MAJESTIC_STATIC=1 forces the no-browser mode
//
// Measured at 1440x900 and 390x844:
//   - sideways overflow, script errors, failed requests, broken images
//   - fonts actually drawn (families, weights, sizes), webfonts that failed to load, the font budget, the 12px floor
//   - contrast of every text box against what is really painted behind it (canvas art, images, gradients):
//     the text is hidden, the page is captured, and the pixels under each text box are sampled
//   - headline size and line count, controls in the first screen, small tap targets
//   - keyboard: a visible focus style on tabbed elements, and that accordions, switches and tabs respond to keys
//   - habits: grey text on colored surfaces, rows of icon tiles above headings
// Writes into --out (default ./majestic-check): desktop.png, mobile.png, (dark.png), compare.png, report.json, report.md.
// compare.png carries a 4-character look code in its corner. Quote it in your report: it can only be read from the image.
//
// Exit codes: 0 clean, 1 errors found, 2 bad usage, 3 no browser (static checks only, visual points UNVERIFIED).
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { pathToFileURL, fileURLToPath } from "node:url";

const argv = process.argv.slice(2);
const VALUE_FLAGS = ["--out", "--ref", "--cdp"];
const flag = (n) => { const i = argv.indexOf(n); return i >= 0 ? argv[i + 1] : null; };
const asJson = argv.includes("--json"), wantDark = argv.includes("--dark"), isApp = argv.includes("--app");
const target = argv.find((a, i) => !a.startsWith("--") && !VALUE_FLAGS.includes(argv[i - 1]));
if (!target) { console.error("Usage: node verify-render.mjs <page.html|url> [--out dir] [--ref examples/<name>] [--dark] [--app] [--cdp url] [--json]"); process.exit(2); }
const out = path.resolve(flag("--out") || "majestic-check");
const ref = flag("--ref");
fs.mkdirSync(out, { recursive: true });
const url = /^https?:|^file:/.test(target) ? target : pathToFileURL(path.resolve(target)).href;

const findings = [];
const add = (view, sev, id, msg) => findings.push({ view, sev, id, msg });
const metrics = {};
import { sleep, launch, CDP, Page } from "./lib/browser.mjs";

let session = null;
async function browserSocket() { session = await launch(flag("--cdp")); return session?.wsUrl ?? null; }
function cleanup() { try { session?.cleanup(); } catch {} }

// ---------- functions that run inside the page ----------
const measure = (isMobile) => {
  const vis = (el) => { const r = el.getBoundingClientRect(), s = getComputedStyle(el); return r.width > 0 && r.height > 0 && s.visibility !== "hidden" && s.display !== "none" && +s.opacity > 0.05; };
  const generic = /^(serif|sans-serif|monospace|cursive|fantasy|system-ui|ui-[a-z]+|-apple-system|blinkmacsystemfont|emoji|math)$/i;
  const fams = {}, weights = new Set(), small = [], texts = [];
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let n;
  while ((n = walker.nextNode())) {
    const t = n.textContent.trim(); if (!t) continue;
    const el = n.parentElement; if (!el || /^(SCRIPT|STYLE|NOSCRIPT|TITLE|OPTION)$/.test(el.tagName) || !vis(el)) continue;
    { const r = el.getBoundingClientRect(); if (r.width <= 1 || r.height <= 1) continue; } // visually hidden (sr-only) text
    if (el.closest("[aria-hidden='true'],canvas,svg")) continue;
    if (el.closest("details:not([open])") && !el.closest("summary")) continue; // closed accordion content isn't painted
    const s = getComputedStyle(el);
    const fam = s.fontFamily.split(",").map((x) => x.trim().replace(/^["']|["']$/g, ""));
    const first = fam.find((f) => f && !generic.test(f)) || fam[0];
    fams[first] = (fams[first] || 0) + t.length;
    weights.add(s.fontWeight);
    const size = parseFloat(s.fontSize);
    if (size < 12) small.push(`${size}px "${t.slice(0, 30)}"`);
    if (/rgba\(0, 0, 0, 0\)|transparent/.test(s.webkitTextFillColor || "")) continue; // clipped-gradient text has no single color
    const rr = document.createRange(); rr.selectNodeContents(n);
    // one sample box per line, so a wrapped highlight isn't measured against the page around it
    for (const b of rr.getClientRects()) { if (b.width < 2 || b.height < 2) continue;
      texts.push({ t: t.slice(0, 40), x: b.left + scrollX, y: b.top + scrollY, w: b.width, h: b.height, color: s.color, size, weight: +s.fontWeight || 400 }); }
  }
  const h1 = document.querySelector("h1"); let h1info = null;
  if (h1) { const s = getComputedStyle(h1), r = h1.getBoundingClientRect(); const lh = parseFloat(s.lineHeight) || parseFloat(s.fontSize) * 1.15;
    h1info = { size: parseFloat(s.fontSize), lines: Math.max(1, Math.round(r.height / lh)), tracking: s.letterSpacing, family: s.fontFamily.split(",")[0].replace(/["']/g, "") }; }
  const inter = [...document.querySelectorAll("a[href],button,input,select,textarea,summary,[role=button],[role=tab],[role=switch]")].filter(vis);
  // the nav counts as one thing in the viewport budget, however many links it holds
  const firstScreen = inter.filter((e) => { const r = e.getBoundingClientRect(); return r.top < innerHeight && r.bottom > 0 && !e.closest("header,nav,[role=navigation]") && r.bottom + scrollY > 0; });
  if (document.querySelector("header,nav")) firstScreen.push(null);
  const minT = isMobile ? 44 : 24;
  const inline = (e) => e.tagName === "A" && getComputedStyle(e).display.startsWith("inline") && e.closest("p,li,footer,nav,small,td,figcaption");
  const offscreen = (e) => { const r = e.getBoundingClientRect(); return r.bottom + scrollY <= 0 || r.right <= 0; };
  const tiny = inter.filter((e) => { const r = e.getBoundingClientRect(); return (r.height < minT - 0.5 || r.width < minT - 0.5) && !inline(e) && !offscreen(e); })
    .slice(0, 6).map((e) => { const r = e.getBoundingClientRect(); return `${e.tagName.toLowerCase()} "${(e.textContent || e.getAttribute("aria-label") || "").trim().slice(0, 24)}" ${Math.round(r.width)}x${Math.round(r.height)}`; });
  const system = /^(arial|helvetica|helvetica neue|times|times new roman|georgia|verdana|tahoma|trebuchet ms|courier|courier new|segoe ui|roboto|sf pro text|sf pro display|menlo|monaco|consolas)$/i;
  const faces = [...document.fonts].map((f) => ({ family: f.family.replace(/["']/g, ""), status: f.status }));
  const fontState = Object.keys(fams).filter((f) => !generic.test(f)).map((f) => {
    const mine = faces.filter((x) => x.family.toLowerCase() === f.toLowerCase());
    return { family: f, state: mine.some((x) => x.status === "loaded") ? "loaded" : mine.length ? "failed" : system.test(f) ? "system" : "undeclared" };
  });
  // a rounded-square icon tile sitting right above a heading, repeated: the generated-card habit
  let iconTiles = 0;
  for (const hd of document.querySelectorAll("h2,h3,h4")) {
    const prev = hd.previousElementSibling; if (!prev || !vis(prev)) continue;
    const r = prev.getBoundingClientRect(), ps = getComputedStyle(prev);
    const square = r.width >= 28 && r.width <= 72 && Math.abs(r.width - r.height) <= 4;
    const filled = ps.backgroundColor !== "rgba(0, 0, 0, 0)" || ps.backgroundImage !== "none" || ps.boxShadow !== "none";
    if (square && filled && parseFloat(ps.borderRadius) >= 6 && prev.querySelector("svg,img")) iconTiles++;
  }
  return { iconTiles, fams, weights: [...weights], small, texts, h1: h1info, firstScreenControls: firstScreen.length, tiny, fontState,
    brokenImages: [...document.images].filter((i) => i.complete && i.naturalWidth === 0).map((i) => (i.currentSrc || i.src).slice(-60)),
    overflow: document.documentElement.scrollWidth - innerWidth, docH: document.documentElement.scrollHeight,
    themed: [...document.querySelectorAll("style")].some((s) => /data-theme/.test(s.textContent)) };
};

const contrastIn = async ([shots, texts]) => {
  const c = document.createElement("canvas"); c.width = shots.w; c.height = shots.docH;
  const g = c.getContext("2d", { willReadFrequently: true });
  for (const b of shots.bands) { const im = new Image(); im.src = b.data; await im.decode(); g.drawImage(im, 0, b.y); }
  const img = { width: c.width, height: c.height };
  const lin = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; };
  const L = (r, g_, b) => 0.2126 * lin(r) + 0.7152 * lin(g_) + 0.0722 * lin(b);
  const bad = [], grey = [];
  for (const t of texts) {
    if (t.y + t.h <= 0 || t.x + t.w <= 0 || t.y >= img.height || t.x >= img.width) continue; // parked off-screen
    const m = t.color.match(/[\d.]+/g).map(Number); const a = m[3] ?? 1;
    // sample the middle band of the line box, where the glyphs' ink is; the line box often pokes out of a tight highlight
    const ty = t.y + t.h * 0.22, th = t.h * 0.56;
    const x = Math.max(0, Math.floor(t.x + 1)), y = Math.max(0, Math.floor(ty));
    const w = Math.min(img.width - x, Math.ceil(t.w - 2)), h = Math.min(img.height - y, Math.ceil(th));
    if (w < 2 || h < 2) continue;
    const d = g.getImageData(x, y, w, h).data, ls = [];
    const step = Math.max(1, Math.floor((w * h) / 400));
    for (let i = 0; i < w * h; i += step) { const o = i * 4; ls.push([L(d[o], d[o + 1], d[o + 2]), d[o], d[o + 1], d[o + 2]]); }
    ls.sort((p, q) => p[0] - q[0]);
    const tl = (px) => { const f = [0, 1, 2].map((k) => m[k] * a + px[k + 1] * (1 - a)); return L(f[0], f[1], f[2]); };
    const worst = Math.min(...[ls[Math.floor(ls.length * 0.95)], ls[Math.floor(ls.length * 0.05)]].map((px) => { const A = tl(px), B = px[0]; return (Math.max(A, B) + 0.05) / (Math.min(A, B) + 0.05); }));
    const need = t.size >= 24 || (t.size >= 18.66 && t.weight >= 700) ? 3 : 4.5;
    // grey text on a colored surface: tint it from the surface instead
    const med = ls[Math.floor(ls.length / 2)], sat = (r, g_, b) => { const mx = Math.max(r, g_, b), mn = Math.min(r, g_, b); return mx === 0 ? 0 : (mx - mn) / mx; };
    if (sat(med[1], med[2], med[3]) > .38 && Math.max(med[1], med[2], med[3]) > 90 && sat(m[0], m[1], m[2]) < .08 && m[0] > 70 && m[0] < 200 && a > .5) grey.push(t.t);
    if (Math.round(worst * 10) / 10 < need) bad.push({ t: t.t, ratio: Math.round(worst * 10) / 10, need, y: Math.round(t.y) });
  }
  const seen = new Map(); for (const b of bad) if (!seen.has(b.t) || seen.get(b.t).ratio > b.ratio) seen.set(b.t, b);
  return { bad: [...seen.values()], grey: [...new Set(grey)] };
};

const HIDE_TEXT = "*,*::before,*::after{color:transparent!important;-webkit-text-fill-color:transparent!important;text-shadow:none!important;caret-color:transparent!important}input::placeholder,textarea::placeholder{color:transparent!important}";

async function view(cdp, name, w, h, dpr, dark = false) {
  const isMobile = w < 600;
  const page = await Page.create(cdp, { w, h, dpr, dark });
  await page.goto(url);
  await page.eval(async () => { await document.fonts.ready; });
  if (dark) await page.eval(() => { if ([...document.querySelectorAll("style")].some((s) => /data-theme/.test(s.textContent))) document.documentElement.dataset.theme = "dark"; });
  await sleep(1800);
  fs.writeFileSync(path.join(out, name + ".png"), await page.shot());
  const m = await page.eval(measure, isMobile);
  // compare against the width we asked for: on a phone viewport the browser widens the layout to fit overflowing content
  const sw = await page.eval(() => Math.max(document.documentElement.scrollWidth, document.body.scrollWidth, innerWidth));
  m.overflow = sw - w;
  if (m.overflow > 0) add(name, "error", "overflow", `page is ${sw}px wide at a ${w}px viewport: it scrolls sideways or zooms out by ${m.overflow}px`);
  [...new Set(page.errors)].slice(0, 4).forEach((e) => add(name, "error", "console", e));
  m.brokenImages.slice(0, 3).forEach((s) => add(name, "error", "broken-image", s));
  for (const f of m.fontState) {
    if (f.state === "failed") add(name, "error", "font-missing", `"${f.family}" is declared with @font-face but no file loaded, so a fallback font is being drawn. Run scripts/vendor-fonts.mjs on the page`);
    if (f.state === "undeclared") add(name, "warn", "font-undeclared", `"${f.family}" is used with no @font-face; it only renders where that font happens to be installed`);
    if (f.state === "system") add(name, "info", "font-system", `"${f.family}" is a system font; a brand face should be a real webfont`);
  }
  const named = m.fontState.map((f) => f.family);
  if (named.length > 5) add(name, "error", "font-count", `${named.length} font families in use (${named.join(", ")}): the hard maximum is 5`);
  else if (named.length > 3) add(name, "info", "font-count", `${named.length} font families in use (${named.join(", ")}): 1 to 3 is recommended`);
  if (m.weights.length > 5) add(name, "info", "weight-count", `${m.weights.length} font weights in use (${m.weights.join(", ")}): about 4 reads as one system`);
  if (m.iconTiles >= 3) add(name, "warn", "icon-tiles", `${m.iconTiles} headings sit under a rounded-square icon tile; let the content carry each card instead`);
  if (m.small.length) add(name, "warn", "small-text", `text under 12px: ${m.small.slice(0, 3).join("; ")}`);
  if (m.h1) {
    if (!isApp && !isMobile && (m.h1.size < 40 || m.h1.size > 120)) add(name, "warn", "h1-size", `headline is ${m.h1.size}px; the desktop hero target is 56 to 104px`);
    if (!isApp && isMobile && (m.h1.size < 32 || m.h1.size > 56)) add(name, "warn", "h1-size", `headline is ${m.h1.size}px; the mobile target is 40 to 48px`);
    if (m.h1.lines > (isMobile ? 4 : 3)) add(name, "warn", "h1-lines", `headline wraps to about ${m.h1.lines} lines; the target is 2 (3 max) on desktop`);
  } else add(name, "warn", "no-h1", "no <h1> found");
  if (!isApp && !isMobile && m.firstScreenControls > 8) add(name, "warn", "crowded", `${m.firstScreenControls} controls in the first screen (the nav counts as one); the budget is about six things`);
  if (m.tiny.length) add(name, "warn", "tap-target", `targets below ${isMobile ? 44 : 24}px: ${m.tiny.slice(0, 3).join("; ")}`);
  // contrast against the real painted background
  await page.eval((css) => { const s = document.createElement("style"); s.textContent = css; document.head.append(s); }, HIDE_TEXT);
  await sleep(200);
  const shots = await page.bands();
  if (process.env.MAJESTIC_DEBUG) shots.bands.forEach((b, i) => fs.writeFileSync(path.join(out, `${name}-textless-${i}.png`), Buffer.from(b.data.split(",")[1], "base64")));
  const cres = await page.eval(contrastIn, [shots, m.texts]);
  const bad = cres.bad.sort((a, b) => a.ratio - b.ratio);
  if (cres.grey.length) add(name, "warn", "grey-on-color", `grey text on a colored surface: ${cres.grey.slice(0, 3).map((x) => `"${x}"`).join(", ")}; tint it from the surface's hue`);
  bad.slice(0, 5).forEach((b) => add(name, b.ratio < 3 ? "error" : "warn", "contrast", `"${b.t}" ${b.ratio}:1 over what is painted behind it (needs ${b.need}:1) at y=${b.y}`));
  if (bad.length > 5) add(name, "warn", "contrast", `…and ${bad.length - 5} more low-contrast text boxes`);
  metrics[name] = { families: m.fams, weights: m.weights, h1: m.h1, firstScreenControls: m.firstScreenControls, textBoxes: m.texts.length, lowContrast: bad.length, docHeight: m.docH };
  await page.close();
  return m;
}

async function keyboard(cdp) {
  const page = await Page.create(cdp, { w: 1440, h: 900 });
  await page.goto(url); await sleep(1200);
  // transitions would make the focused and blurred styles read the same for a moment
  await page.eval(() => { const st = document.createElement("style"); st.textContent = "*,*::before,*::after{transition:none!important}"; document.head.append(st); });
  let seen = 0, ringed = 0; const missing = [];
  for (let i = 0; i < 8; i++) {
    await page.key("Tab", "Tab", 9);
    // a focus style counts if anything visible on the element or its near ancestors changes between focused and blurred
    const r = await page.eval(() => {
      const e = document.activeElement; if (!e || e === document.body) return null;
      const chain = [e, e.parentElement, e.parentElement?.parentElement].filter(Boolean);
      const snap = () => chain.map((x) => { const s = getComputedStyle(x); return [s.outlineStyle, s.outlineWidth, s.outlineColor, s.boxShadow, s.borderColor, s.backgroundColor, s.textDecorationLine].join("|"); }).join("#");
      const on = snap(); e.blur(); const off = snap(); e.focus();
      return { ring: on !== off, name: `${e.tagName.toLowerCase()} "${(e.getAttribute("aria-label") || e.textContent || e.getAttribute("placeholder") || "").trim().slice(0, 24)}"` };
    });
    if (!r) continue; seen++; if (r.ring) ringed++; else missing.push(r.name);
  }
  if (seen === 0) add("desktop", "warn", "keyboard", "Tab never reached an interactive element");
  else if (ringed < seen) add("desktop", "error", "focus", `only ${ringed} of ${seen} tabbed elements show a focus ring (missing: ${missing.slice(0, 3).join(", ")})`);
  // interactive widgets must answer the keyboard
  const widgets = { tabbed: seen, withFocusRing: ringed };
  // only widgets that are on screen at this width: a drawer button hidden on desktop can't be pressed there
  await page.eval(() => { window.__vis = (sel) => [...document.querySelectorAll(sel)].find((e) => e.getClientRects().length && getComputedStyle(e).visibility !== "hidden") || null; });
  const has = await page.eval(() => ({ details: !!__vis("details > summary"), sw: !!__vis("[role=switch]"), tabs: !!__vis("[role=tablist] [role=tab]"), exp: !!__vis("button[aria-expanded]") }));
  if (has.details) {
    const before = await page.eval(() => { const s = __vis("details:not([open]) > summary") || __vis("details > summary"); s.scrollIntoView({ block: "center", behavior: "instant" }); s.focus(); return s.parentElement.open; });
    await page.key("Enter", "Enter", 13, "\r");
    const after = await page.eval(() => document.activeElement?.parentElement?.open);
    widgets.accordion = before !== after;
    if (before === after) add("desktop", "error", "accordion-keys", "a <details> accordion did not toggle with Enter");
  }
  if (has.exp) {
    const before = await page.eval(() => { const b = __vis("button[aria-expanded]"); window.__exp = b; b.scrollIntoView({ block: "center", behavior: "instant" }); b.focus(); return b.getAttribute("aria-expanded"); });
    await page.key("Enter", "Enter", 13, "\r");
    const after = await page.eval(() => __exp.getAttribute("aria-expanded"));
    widgets.disclosure = before !== after;
    if (before === after) add("desktop", "error", "disclosure-keys", "a button with aria-expanded did not change state with Enter");
  }
  if (has.sw) {
    const before = await page.eval(() => { const b = __vis("[role=switch]"); window.__sw = b; b.scrollIntoView({ block: "center", behavior: "instant" }); b.focus(); return b.getAttribute("aria-checked"); });
    await page.key(" ", "Space", 32, " ");
    const after = await page.eval(() => __sw.getAttribute("aria-checked"));
    widgets.switch = before !== after;
    if (before === after) add("desktop", "error", "switch-keys", "a role=switch control did not toggle with Space");
    if (before !== "true" && before !== "false") add("desktop", "error", "switch-state", "role=switch needs aria-checked=\"true\" or \"false\"");
  }
  if (has.tabs) {
    const before = await page.eval(() => { const t = __vis("[role=tablist] [role=tab][aria-selected=true]") || __vis("[role=tablist] [role=tab]"); t.scrollIntoView({ block: "center", behavior: "instant" }); t.focus(); return t.id || t.textContent.trim(); });
    await page.key("ArrowRight", "ArrowRight", 39);
    const after = await page.eval(() => { const e = document.activeElement; return { id: e.id || e.textContent.trim(), isTab: e.getAttribute("role") === "tab", selected: e.getAttribute("aria-selected") }; });
    widgets.tabs = after.isTab && after.id !== before;
    if (!widgets.tabs) add("desktop", "error", "tabs-keys", "the right arrow did not move to the next tab");
    else if (after.selected !== "true") add("desktop", "warn", "tabs-state", "the focused tab is not marked aria-selected=\"true\"");
  }
  metrics.keyboard = widgets;
  await page.close();
}

// ---------- no browser: say so, check what plain text allows ----------
function staticOnly() {
  const notes = [];
  if (url.startsWith("file:")) {
    const file = fileURLToPath(url), src = fs.readFileSync(file, "utf8");
    for (const m of src.matchAll(/url\(\s*["']?([^"')]+\.(?:woff2?|ttf|otf))["']?\s*\)/gi)) {
      if (/^(https?:|data:)/.test(m[1])) continue;
      if (!fs.existsSync(path.resolve(path.dirname(file), m[1]))) add("static", "error", "font-missing", `font file not found: ${m[1]}`);
    }
    const fams = new Set([...src.matchAll(/@font-face\s*\{[^}]*font-family\s*:\s*["']?([^;"'}]+)/gi)].map((m) => m[1].trim().toLowerCase()));
    if (fams.size > 5) add("static", "error", "font-count", `${fams.size} font families declared: the hard maximum is 5`);
    notes.push(`font families declared: ${[...fams].join(", ") || "none"}`);
    const small = [...src.matchAll(/font-size\s*:\s*(\d+(?:\.\d+)?)px/g)].map((m) => +m[1]).filter((v) => v < 12);
    if (small.length) add("static", "warn", "small-text", `font sizes under 12px in the CSS: ${[...new Set(small)].join(", ")}`);
    if ((src.match(/<h1\b/gi) || []).length !== 1) add("static", "warn", "h1", "the page should have exactly one <h1>");
  }
  const errors = findings.filter((f) => f.sev === "error").length;
  const report = { url, verified: false, reason: "no Chrome, Chromium or Edge found", errors, findings, notes };
  fs.writeFileSync(path.join(out, "report.json"), JSON.stringify(report, null, 2));
  if (asJson) console.log(JSON.stringify(report, null, 2));
  else {
    console.log(`majestic-ui render check · ${target}\n`);
    console.log("UNVERIFIED: no Chrome, Chromium or Edge was found, so nothing was rendered.");
    console.log("Contrast, overflow, mobile layout, fonts drawn and keyboard behaviour are NOT checked. Do not report them as passed.");
    console.log("Fix: install Chrome, set CHROME_PATH, or start one with --remote-debugging-port=9222 and pass --cdp http://127.0.0.1:9222\n");
    for (const f of findings) console.log(`[${f.sev.toUpperCase()}] ${f.view} · ${f.id}: ${f.msg}`);
    notes.forEach((n) => console.log("note: " + n));
  }
  process.exit(3);
}

// ---------- run ----------
let wsUrl = null;
try { if (!process.env.MAJESTIC_STATIC) wsUrl = await browserSocket(); } catch (e) { console.error("Could not start or reach a browser: " + e.message); }
if (!wsUrl || typeof WebSocket === "undefined") { cleanup(); staticOnly(); }
const cdp = await CDP.open(wsUrl);
try {
  await view(cdp, "desktop", 1440, 900, 1);
  await view(cdp, "mobile", 390, 844, 2);
  if (wantDark) await view(cdp, "dark", 1440, 900, 1, true);
  await keyboard(cdp);

  // compare.png: your page beside the reference render, with a look code that exists only in the image
  const code = Array.from({ length: 4 }, () => "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"[crypto.randomInt(32)]).join("");
  const b64 = (p) => "data:image/" + (p.endsWith(".png") ? "png" : "jpeg") + ";base64," + fs.readFileSync(p).toString("base64");
  const has = (f) => ref && fs.existsSync(path.join(ref, f));
  const cols = [`<div><p>YOURS · desktop</p><img src="${b64(path.join(out, "desktop.png"))}" width="${has("web.jpg") ? 800 : 940}"></div>`];
  if (has("web.jpg")) cols.push(`<div><p>REFERENCE · ${path.basename(path.resolve(ref))}</p><img src="${b64(path.join(ref, "web.jpg"))}" width="800"></div>`);
  if (wantDark) cols.push(`<div><p>YOURS · dark</p><img src="${b64(path.join(out, "dark.png"))}" width="420"></div>`);
  cols.push(`<div><p>YOURS · 390</p><img src="${b64(path.join(out, "mobile.png"))}" width="190"></div>`);
  if (has("mobile.jpg")) cols.push(`<div><p>REF · 390</p><img src="${b64(path.join(ref, "mobile.jpg"))}" width="190"></div>`);
  const cw = 32 + cols.length * 16 + (has("web.jpg") ? 1600 : 940) + (wantDark ? 420 : 0) + 190 + (has("mobile.jpg") ? 190 : 0);
  const cmp = await Page.create(cdp, { w: cw, h: has("web.jpg") ? 600 : 680 });
  await cmp.setHtml(`<body style="margin:0;background:#111;font:600 13px system-ui,sans-serif;color:#ddd;display:flex;gap:16px;padding:16px;align-items:flex-start"><style>p{margin:0 0 8px}img{display:block}</style>${cols.join("")}
<div style="position:fixed;right:14px;bottom:12px;background:#fff;color:#111;padding:6px 12px;border-radius:6px;font:700 22px ui-monospace,monospace;letter-spacing:.2em">${code}</div></body>`);
  await sleep(500);
  fs.writeFileSync(path.join(out, "compare.png"), await cmp.shot());
  await cmp.close();

  const count = (s) => findings.filter((f) => f.sev === s).length;
  const errors = count("error"), warns = count("warn"), infos = count("info");
  const report = { url, verified: true, look_code_sha256: crypto.createHash("sha256").update(code).digest("hex"), errors, warnings: warns, notes: infos, findings, metrics };
  fs.writeFileSync(path.join(out, "report.json"), JSON.stringify(report, null, 2));
  fs.writeFileSync(path.join(out, "report.md"), [`# Render check`, ``, `${errors} errors · ${warns} warnings · ${infos} notes`, ``, ...findings.map((f) => `- [${f.sev}] (${f.view}) ${f.id}: ${f.msg}`), ``,
    `Open compare.png and quote its 4-character look code in your report (report.json keeps only a hash of it).`].join("\n"));
  if (asJson) console.log(JSON.stringify(report, null, 2));
  else {
    console.log(`majestic-ui render check · ${target}\n`);
    for (const f of findings) console.log(`[${f.sev.toUpperCase()}] ${f.view} · ${f.id}: ${f.msg}`);
    console.log(`\n${errors} errors · ${warns} warnings · ${infos} notes`);
    console.log(`Fonts drawn (desktop): ${Object.entries(metrics.desktop.families).map(([k, v]) => `${k} (${v} chars)`).join(", ")}`);
    if (metrics.keyboard) console.log(`Keyboard: ${JSON.stringify(metrics.keyboard)}`);
    console.log(`\nNOW OPEN these images and look at them (the look code is printed only inside compare.png):\n  ${path.join(out, "compare.png")}\n  ${path.join(out, "desktop.png")}\n  ${path.join(out, "mobile.png")}${wantDark ? "\n  " + path.join(out, "dark.png") : ""}`);
  }
  cdp.ws.close(); cleanup();
  process.exit(errors ? 1 : 0);
} catch (e) {
  cdp.ws.close(); cleanup();
  console.error("Render check failed: " + e.message);
  process.exit(2);
}
