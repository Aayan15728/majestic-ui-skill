#!/usr/bin/env node
// majestic-ui compare-image: scores how closely a built page matches a design image, and says where and how it differs.
// Zero dependencies: renders the page and does the pixel work in a headless Chrome / Chromium / Edge.
//
// Usage: node compare-image.mjs <design.png|jpg|webp> <page.html | http://url> [--out dir] [--dpr n] [--vh 900] [--wait 1500] [--min 0.85] [--cdp url]
//   The page is rendered at the design's CSS width (image width / dpr). A design taller than 1400 CSS px is treated as a
//   full-page capture: the page is rendered with a --vh tall viewport (default 900) and captured top to bottom.
//
// Scores (0–1): structure (edges of the layout line up, ±2px), similarity (SSIM on luminance), color (per-pixel ΔE),
// and an overall score. Regions are scored on a grid; for each poor region it estimates the offset that would align it
// and says whether the problem is position, layout, color or type.
// Writes into --out (default ./design-compare): report.md, report.json, page.png, side.png, overlay.png, edges.png,
// diff.png and regions.png. edges.png is the fastest read: design edges magenta, page edges cyan, matches white.
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { launch, CDP, Page, sleep } from "./lib/browser.mjs";
import { IMAGEKIT } from "./lib/imagekit.mjs";

const argv = process.argv.slice(2);
const flag = (n) => { const i = argv.indexOf(n); return i >= 0 ? argv[i + 1] : null; };
const VAL = ["--out", "--dpr", "--vh", "--wait", "--min", "--cdp"];
const pos = argv.filter((a, i) => !a.startsWith("--") && !VAL.includes(argv[i - 1]));
const [img, target] = pos;
if (!img || !target || !fs.existsSync(img)) { console.error("Usage: node compare-image.mjs <design.png|jpg|webp> <page.html|url> [--out dir] [--dpr n] [--vh 900] [--min 0.85]"); process.exit(2); }
const out = path.resolve(flag("--out") || "design-compare");
fs.mkdirSync(out, { recursive: true });
const url = /^https?:|^file:/.test(target) ? target : pathToFileURL(path.resolve(target)).href;
const ext = path.extname(img).slice(1).toLowerCase().replace("jpg", "jpeg");
const design = `data:image/${ext};base64,` + fs.readFileSync(img).toString("base64");
const write = (name, dataUrl) => fs.writeFileSync(path.join(out, name), Buffer.from(dataUrl.split(",")[1], "base64"));

const session = await launch(flag("--cdp"));
if (!session) { console.error("No Chrome, Chromium or Edge found. Set CHROME_PATH or pass --cdp. Nothing was compared."); process.exit(3); }
const cdp = await CDP.open(session.wsUrl);
try {
  // 1. size the render from the design
  const probe = await Page.create(cdp, { w: 400, h: 300 });
  const { W, H } = await probe.eval(async (s) => { const im = new Image(); im.src = s; await im.decode(); return { W: im.naturalWidth, H: im.naturalHeight }; }, design);
  await probe.close();
  const dpr = +flag("--dpr") || (W >= 2200 ? 2 : 1);
  const cssW = Math.round(W / dpr), cssH = Math.round(H / dpr);
  const full = cssH > 1400, vh = full ? +(flag("--vh") || 900) : cssH;

  // 2. render the page at that size and capture it in CSS pixels
  const page = await Page.create(cdp, { w: cssW, h: vh, dpr: 1 });
  await page.goto(url);
  await page.eval(async () => { await document.fonts.ready; });
  await sleep(+(flag("--wait") || 1500));
  const shots = full ? (await page.bands()).bands : [{ y: 0, data: "data:image/png;base64," + (await page.shot()).toString("base64") }];
  await page.close();

  // 3. analyse in a blank page
  const lab = await Page.create(cdp, { w: 400, h: 300 });
  await lab.eval((code) => { (0, eval)(code); }, IMAGEKIT);
  const r = await lab.eval(async ([design, shots, cssW, cssH]) => {
    const tIm = await IK.load(design);
    // compose the page capture
    const pc = document.createElement("canvas"); pc.width = cssW; pc.height = cssH; const pg = pc.getContext("2d"); pg.fillStyle = "#fff"; pg.fillRect(0, 0, cssW, cssH);
    for (const s of shots) { const im = await IK.load(s.data); pg.drawImage(im, 0, s.y); }
    const pageUrl = pc.toDataURL("image/png"); const pIm = await IK.load(pageUrl);
    // analysis at half CSS resolution
    const aw = Math.max(1, Math.round(cssW / 2)), ah = Math.max(1, Math.round(cssH / 2)), S = 2;
    const T = IK.grab(tIm, aw, ah), P = IK.grab(pIm, aw, ah);
    const Et = IK.edges(T.d, aw, ah, 0.08), Ep = IK.edges(P.d, aw, ah, 0.08), EtD = IK.dilate(Et, aw, ah, 1), EpD = IK.dilate(Ep, aw, ah, 1);
    const structure = IK.edgeF1(Et, Ep, aw, ah, 0, 0, aw, ah, 0, 0, EtD, EpD);
    const similarity = IK.ssim(T.d, P.d, aw, ah);
    const dmap = new Float32Array(aw * ah); let sum = 0; const all = [];
    for (let i = 0; i < aw * ah; i++) { const o = i * 4; const e = IK.dE(IK.lab(T.d[o], T.d[o + 1], T.d[o + 2]), IK.lab(P.d[o], P.d[o + 1], P.d[o + 2])); dmap[i] = e; sum += e; if (i % 3 === 0) all.push(e); }
    all.sort((a, b) => a - b);
    const dEmean = sum / (aw * ah), dEmed = all[Math.floor(all.length / 2)], dE90 = all[Math.floor(all.length * 0.9)];
    const colorScore = Math.max(0, 1 - dEmean / 25);
    const overall = 0.45 * structure + 0.35 * Math.max(0, similarity) + 0.2 * colorScore;
    // palettes
    const tp = IK.palette(T.d, aw, ah, 8), pp = IK.palette(P.d, aw, ah, 10);
    const colors = tp.filter((c) => c.share > 0.008).map((c) => { const best = pp.reduce((b, p) => { const e = IK.dE(c.lab, p.lab); return e < b.e ? { e, hex: p.hex } : b; }, { e: 1e9, hex: null }); return { design: c.hex, share: Math.round(c.share * 1000) / 10, page: best.hex, dE: Math.round(best.e * 10) / 10 }; });
    // regions: a grid of 4 columns × rows of 120 CSS px
    const cols = 4, rh = 60, regions = [];
    for (let y0 = 0; y0 < ah; y0 += rh) for (let c = 0; c < cols; c++) {
      const x0 = Math.floor((c * aw) / cols), x1 = Math.floor(((c + 1) * aw) / cols), y1 = Math.min(ah, y0 + rh);
      let te = 0, pe = 0; for (let y = y0; y < y1; y++) for (let x = x0; x < x1; x++) { te += Et[y * aw + x]; pe += Ep[y * aw + x]; }
      let de = 0; for (let y = y0; y < y1; y++) for (let x = x0; x < x1; x++) de += dmap[y * aw + x]; de /= (x1 - x0) * (y1 - y0);
      if (te + pe < 12 && de < 4) continue; // empty in both
      const f0 = IK.edgeF1(Et, Ep, aw, ah, x0, y0, x1, y1, 0, 0, EtD, EpD);
      let best = { f: f0, dx: 0, dy: 0 };
      if (f0 < 0.8) { // coarse search over ±32 CSS px, then refine around the best
        const tryAt = (dx, dy) => { const f = IK.edgeF1(Et, Ep, aw, ah, x0, y0, x1, y1, dx, dy, EtD, EpD); if (f > best.f + 0.001) best = { f, dx, dy }; };
        for (let dy = -16; dy <= 16; dy += 2) for (let dx = -16; dx <= 16; dx += 2) if (dx || dy) tryAt(dx, dy);
        const c = { ...best }; for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) if (dx || dy) tryAt(c.dx + dx, c.dy + dy);
      }
      const ss = IK.ssim(T.d, P.d, aw, ah, x0, y0, x1, y1);
      const score = 0.5 * f0 + 0.3 * Math.max(0, ss) + 0.2 * Math.max(0, 1 - de / 25);
      let fix;
      if (f0 < 0.65 && best.f - f0 > 0.15) { const parts = []; if (best.dy) parts.push(`${Math.abs(best.dy * S)}px ${best.dy > 0 ? "lower" : "higher"}`); if (best.dx) parts.push(`${Math.abs(best.dx * S)}px ${best.dx > 0 ? "further right" : "further left"}`); fix = `shifted: the page's content here sits ${parts.join(" and ")} than in the design`; }
      else if (best.f < 0.5) fix = te > pe * 1.8 ? "missing: the design has elements here the page doesn't" : pe > te * 1.8 ? "extra: the page has elements here the design doesn't" : "different layout: sizes or arrangement differ";
      else if (de > 10) fix = `color: ΔE ${de.toFixed(0)} (fills, text or image colors)`;
      else if (ss < 0.7) fix = "type or texture: check font, weight, size, letter spacing";
      else fix = "close";
      regions.push({ x: x0 * S, y: y0 * S, w: (x1 - x0) * S, h: (y1 - y0) * S, score: Math.round(score * 100) / 100, edges: Math.round(f0 * 100) / 100, aligned: Math.round(best.f * 100) / 100, shift: [best.dx * S, best.dy * S], ssim: Math.round(ss * 100) / 100, dE: Math.round(de * 10) / 10, fix });
    }
    // vertical drift down the page: the dy that best aligns each full-width row of regions
    const drift = []; for (let y0 = 0; y0 < ah; y0 += rh) { const rs = regions.filter((g) => g.y === y0 * S && g.fix.startsWith("shifted")); if (rs.length >= 2) drift.push({ y: y0 * S, dy: Math.round(rs.reduce((a, g) => a + g.shift[1], 0) / rs.length) }); }
    // images
    const mk = (w, h) => { const c = document.createElement("canvas"); c.width = w; c.height = h; return [c, c.getContext("2d")]; };
    const [ec, eg] = mk(aw, ah); const ed = eg.createImageData(aw, ah);
    for (let i = 0; i < aw * ah; i++) { const t = Et[i], p = Ep[i], o = i * 4; ed.data[o + 3] = 255; if (t && EpD[i] || p && EtD[i]) { ed.data[o] = ed.data[o + 1] = ed.data[o + 2] = 235; } else if (t) { ed.data[o] = 255; ed.data[o + 1] = 40; ed.data[o + 2] = 200; } else if (p) { ed.data[o] = 0; ed.data[o + 1] = 220; ed.data[o + 2] = 255; } else { ed.data[o] = ed.data[o + 1] = ed.data[o + 2] = 14; } }
    eg.putImageData(ed, 0, 0);
    const [dc, dg] = mk(aw, ah); const dd = dg.createImageData(aw, ah);
    for (let i = 0; i < aw * ah; i++) { const o = i * 4, l = IK.luma(T.d, o) * 0.35 + 150, k = Math.min(1, dmap[i] / 30); dd.data[o] = l * (1 - k) + 255 * k; dd.data[o + 1] = l * (1 - k) + 30 * k; dd.data[o + 2] = l * (1 - k) + 60 * k; dd.data[o + 3] = 255; }
    dg.putImageData(dd, 0, 0);
    const [oc, og] = mk(cssW, cssH); og.drawImage(tIm, 0, 0, cssW, cssH); og.globalAlpha = 0.5; og.drawImage(pIm, 0, 0); og.globalAlpha = 1;
    const sw = Math.min(cssW, 900), sh = Math.round(cssH * sw / cssW);
    const [sc, sg] = mk(sw * 2 + 24, sh + 28); sg.fillStyle = "#111"; sg.fillRect(0, 0, sc.width, sc.height); sg.fillStyle = "#ddd"; sg.font = "600 13px system-ui"; sg.fillText("DESIGN", 8, 18); sg.fillText("PAGE", sw + 32, 18);
    sg.drawImage(tIm, 8, 24, sw, sh); sg.drawImage(pIm, sw + 16, 24, sw, sh);
    const up = (c) => { const [u, ug] = mk(cssW, cssH); ug.imageSmoothingEnabled = false; ug.drawImage(c, 0, 0, cssW, cssH); return u.toDataURL("image/png"); }; // full CSS size for reading
    const worst = regions.filter((g) => g.fix !== "close").sort((a, b) => a.score - b.score).slice(0, 10);
    const [gc, gg] = mk(cssW, cssH); gg.drawImage(tIm, 0, 0, cssW, cssH); gg.font = "700 12px system-ui"; gg.lineWidth = 2;
    worst.forEach((g, i) => { gg.strokeStyle = "rgba(255,30,80,.95)"; gg.strokeRect(g.x + 1, g.y + 1, g.w - 2, g.h - 2); gg.fillStyle = "rgba(255,30,80,.95)"; gg.fillRect(g.x + 2, g.y + 2, 22, 18); gg.fillStyle = "#fff"; gg.fillText(String(i + 1), g.x + 8, g.y + 15); });
    return { cssW, cssH, structure, similarity, dEmean, dEmed, dE90, colorScore, overall, colors, regions, worst, drift,
      images: { page: pageUrl, edges: up(ec), diff: up(dc), overlay: oc.toDataURL("image/png"), side: sc.toDataURL("image/png"), regions: gc.toDataURL("image/png") } };
  }, [design, shots, cssW, cssH]);
  await lab.close();

  for (const [k, v] of Object.entries(r.images)) write(k + ".png", v);
  delete r.images;
  const pct = (v) => Math.round(v * 100);
  const report = { design: img, page: url, dpr, css: [cssW, cssH], fullPage: full, scores: { overall: pct(r.overall), structure: pct(r.structure), similarity: pct(r.similarity), color: pct(r.colorScore) },
    deltaE: { mean: +r.dEmean.toFixed(1), median: +r.dEmed.toFixed(1), p90: +r.dE90.toFixed(1) }, colors: r.colors, drift: r.drift, worst: r.worst, regions: r.regions };
  fs.writeFileSync(path.join(out, "report.json"), JSON.stringify(report, null, 2));
  const md = [`# Design match: ${path.basename(img)} vs ${target}`, "",
    `Rendered at ${cssW} × ${cssH} CSS px (design at ${dpr}x${full ? `, full page with a ${vh}px viewport` : ""}).`, "",
    `| Score | Value | Means |`, `|---|---|---|`,
    `| **Overall** | **${pct(r.overall)}** | 0.45 structure + 0.35 similarity + 0.2 color |`,
    `| Structure | ${pct(r.structure)} | layout edges line up within 2px |`,
    `| Similarity | ${pct(r.similarity)} | SSIM on luminance: type, texture, weight |`,
    `| Color | ${pct(r.colorScore)} | mean ΔE ${r.dEmean.toFixed(1)} (median ${r.dEmed.toFixed(1)}, 90th pct ${r.dE90.toFixed(1)}) |`, "",
    "Rough guide: 90+ is a close match, 80–90 is right in structure with detail left, under 80 has layout problems. Fix in this order: layout and position, then type, then spacing, then color, then details.", "",
    "## Worst regions (numbered on regions.png)", "", "| # | Region (x, y, w × h) | Score | Edges → if shifted | Shift | ΔE | What to fix |", "|---|---|---|---|---|---|---|",
    ...r.worst.map((g, i) => `| ${i + 1} | ${g.x}, ${g.y}, ${g.w} × ${g.h} | ${pct(g.score)} | ${pct(g.edges)} → ${pct(g.aligned)} | ${g.shift[0]}, ${g.shift[1]} | ${g.dE} | ${g.fix} |`), ""];
  if (r.drift.length) md.push("## Vertical drift", "", "Rows where most regions align after the same vertical shift. A drift that grows down the page means a spacing or height error above that row.", "", ...r.drift.map((d) => `- y ${d.y}: page content sits ${Math.abs(d.dy)}px ${d.dy > 0 ? "lower" : "higher"} than the design`), "");
  md.push("## Colors", "", "| Design | Share | Closest in page | ΔE |", "|---|---|---|---|", ...r.colors.map((c) => `| \`${c.design}\` | ${c.share}% | \`${c.page}\` | ${c.dE}${c.dE > 6 ? " ⚠" : ""} |`), "",
    "## Files", "", "- `edges.png`: design edges magenta, page edges cyan, matching edges white. Read this first.", "- `regions.png`: the worst regions numbered on the design.", "- `side.png`, `overlay.png` (50% blend), `diff.png` (red where colors differ), `page.png` (the render).", "",
    "Zoom into a region of the design with `extract-spec.mjs <design> --crop x,y,w,h --zoom 3`, fix, and run this again.");
  fs.writeFileSync(path.join(out, "report.md"), md.join("\n") + "\n");
  console.log(`majestic-ui compare-image · ${path.basename(img)} vs ${target}\n`);
  console.log(`overall ${pct(r.overall)} · structure ${pct(r.structure)} · similarity ${pct(r.similarity)} · color ${pct(r.colorScore)} (ΔE mean ${r.dEmean.toFixed(1)})`);
  r.worst.slice(0, 6).forEach((g, i) => console.log(`  ${i + 1}. (${g.x}, ${g.y}, ${g.w}×${g.h}) ${pct(g.score)}: ${g.fix}`));
  if (r.drift.length) console.log(`  drift: ${r.drift.map((d) => `y${d.y} ${d.dy > 0 ? "+" : ""}${d.dy}px`).join(", ")}`);
  console.log(`\nNOW OPEN ${path.join(out, "edges.png")} and ${path.join(out, "regions.png")}. Report: ${path.join(out, "report.md")}`);
  const min = flag("--min");
  cdp.ws.close(); session.cleanup();
  process.exit(min && r.overall < +min ? 1 : 0);
} catch (e) { cdp.ws.close(); session.cleanup(); console.error("compare-image failed: " + e.message); process.exit(2); }
