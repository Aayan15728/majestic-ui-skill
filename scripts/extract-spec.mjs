#!/usr/bin/env node
// majestic-ui extract-spec: turns a design image (screenshot, mockup, export) into numbers to build from.
// Zero dependencies: the pixel work runs in a headless Chrome / Chromium / Edge canvas.
//
// Usage: node extract-spec.mjs <design.png|jpg|webp> [--out dir] [--dpr 1|2|3] [--crop x,y,w,h] [--zoom 3] [--cdp url]
//   --dpr   pixels per CSS pixel in the image (default: guessed; a 2880-wide screenshot reads as 1440 at 2x)
//   --crop  only write a zoomed crop of this region (CSS px) for close reading, e.g. --crop 0,0,720,120 --zoom 3
//
// Writes into --out (default ./design-spec):
//   spec.md / spec.json   size, background, palette with roles, content column, bands (sections), text lines with
//                         boxes (cards, buttons, badges) with fill, border, radius and padding, text lines with
//                         estimated font sizes, colors, contrast and alignment, the vertical gaps between blocks
//   annotated.png         the image with bands and measured line boxes drawn on it
//   tiles/band-NN.png     each band at 2x, to read details one region at a time
// Everything measured is an estimate from pixels: confirm sizes against the tiles before you trust them.
import fs from "node:fs";
import path from "node:path";
import { launch, CDP, Page } from "./lib/browser.mjs";
import { IMAGEKIT } from "./lib/imagekit.mjs";

const argv = process.argv.slice(2);
const flag = (n) => { const i = argv.indexOf(n); return i >= 0 ? argv[i + 1] : null; };
const VAL = ["--out", "--dpr", "--crop", "--zoom", "--cdp"];
const img = argv.find((a, i) => !a.startsWith("--") && !VAL.includes(argv[i - 1]));
if (!img || !fs.existsSync(img)) { console.error("Usage: node extract-spec.mjs <design.png|jpg|webp> [--out dir] [--dpr n] [--crop x,y,w,h] [--zoom n]"); process.exit(2); }
const out = path.resolve(flag("--out") || "design-spec");
fs.mkdirSync(path.join(out, "tiles"), { recursive: true });
const ext = path.extname(img).slice(1).toLowerCase().replace("jpg", "jpeg");
const src = `data:image/${ext};base64,` + fs.readFileSync(img).toString("base64");

const session = await launch(flag("--cdp"));
if (!session) { console.error("No Chrome, Chromium or Edge found. Set CHROME_PATH or pass --cdp."); process.exit(3); }
const cdp = await CDP.open(session.wsUrl);
const page = await Page.create(cdp, { w: 800, h: 600 });
await page.eval((code) => { (0, eval)(code); }, IMAGEKIT);

const write = (name, dataUrl) => fs.writeFileSync(path.join(out, name), Buffer.from(dataUrl.split(",")[1], "base64"));

try {
  if (flag("--crop")) {
    const [x, y, w, h] = flag("--crop").split(",").map(Number), zoom = +(flag("--zoom") || 3);
    const url = await page.eval(async ([s, dprIn, x, y, w, h, zoom]) => {
      const im = await IK.load(s); const dpr = dprIn || (im.naturalWidth >= 2200 ? 2 : 1);
      const g = IK.grab(im, Math.round(w * zoom), Math.round(h * zoom), x * dpr, y * dpr, w * dpr, h * dpr);
      g.g.imageSmoothingEnabled = false; return g.c.toDataURL("image/png");
    }, [src, +flag("--dpr") || 0, x, y, w, h, zoom]);
    const name = `crop-${x}-${y}-${w}x${h}@${zoom}x.png`; write(name, url);
    console.log(path.join(out, name)); process.exit(0);
  }

  const spec = await page.eval(async ([s, dprIn]) => {
    const im = await IK.load(s); const W = im.naturalWidth, H = im.naturalHeight;
    const dpr = dprIn || (W >= 2200 ? 2 : 1);
    const w = Math.round(W / dpr), h = Math.round(H / dpr), N = w * h;
    const { d } = IK.grab(im, w, h);
    const px = (x, y) => { const o = (y * w + x) * 4; return [d[o], d[o + 1], d[o + 2]]; };
    const labs = new Float32Array(N * 3); for (let i = 0; i < N; i++) { const L = IK.lab(d[i * 4], d[i * 4 + 1], d[i * 4 + 2]); labs[i * 3] = L[0]; labs[i * 3 + 1] = L[1]; labs[i * 3 + 2] = L[2]; }
    const dEi = (i, L) => Math.hypot(labs[i * 3] - L[0], labs[i * 3 + 1] - L[1], labs[i * 3 + 2] - L[2]);
    const q = (c) => (c[0] >> 3) * 1024 + (c[1] >> 3) * 32 + (c[2] >> 3);
    const mode = (cols) => { const m = new Map(); let best = null, bn = 0; for (const c of cols) { const k = q(c); const e = m.get(k) || { n: 0, s: [0, 0, 0] }; e.n++; e.s[0] += c[0]; e.s[1] += c[1]; e.s[2] += c[2]; m.set(k, e); if (e.n > bn) { bn = e.n; best = e; } } return best ? best.s.map((v) => v / best.n) : [255, 255, 255]; };
    const regionMode = (x0, y0, x1, y1, step = 2) => { const cols = []; for (let y = y0; y < y1; y += step) for (let x = x0; x < x1; x += step) cols.push(px(x, y)); return mode(cols); };
    const border = []; for (let x = 0; x < w; x += 2) border.push(px(x, 0), px(x, h - 1)); for (let y = 0; y < h; y += 2) border.push(px(0, y), px(w - 1, y));
    const bg = mode(border), bgLab = IK.lab(...bg);

    // edges; long straight runs are borders and rules (kept apart), the rest is text and texture
    const E = IK.edges(d, w, h, 0.07), Lm = new Uint8Array(N), T = new Uint8Array(N);
    for (let y = 0; y < h; y++) { let x = 0; while (x < w) { if (!E[y * w + x]) { x++; continue; } let e = x; while (e < w && E[y * w + e]) e++; if (e - x >= 40) for (let k = x; k < e; k++) Lm[y * w + k] = 1; x = e; } }
    for (let x = 0; x < w; x++) { let y = 0; while (y < h) { if (!E[y * w + x]) { y++; continue; } let e = y; while (e < h && E[e * w + x]) e++; if (e - y >= 40) for (let k = y; k < e; k++) Lm[k * w + x] = 1; y = e; } }
    for (let i = 0; i < N; i++) T[i] = E[i] && !Lm[i] ? 1 : 0;

    // bands: where the full-row background changes and stays changed
    const rowLab = []; for (let y = 0; y < h; y++) { const cols = []; for (let x = 0; x < w; x += 3) cols.push(px(x, y)); rowLab.push(IK.lab(...mode(cols))); }
    const bands = []; let b0 = 0;
    for (let y = 1; y < h; y++) if (IK.dE(rowLab[y], rowLab[b0]) > 7) { let stays = true; for (let k = y; k < Math.min(h, y + 8); k++) if (IK.dE(rowLab[k], rowLab[y]) > 7) { stays = false; break; } if (stays) { bands.push([b0, y]); b0 = y; } }
    bands.push([b0, h]);
    for (let i = bands.length - 1; i > 0; i--) if (bands[i][1] - bands[i][0] < 12) { bands[i - 1][1] = bands[i][1]; bands.splice(i, 1); }

    // containers: connected regions that differ from the surface they sit on (fills) or are drawn by rules (outlines)
    function components(x0, y0, x1, y1, surfLab, thr, minW, minH) {
      const bw = x1 - x0, bh = y1 - y0, lab = new Int32Array(bw * bh).fill(-1), out = [];
      const on = (x, y) => { const i = y * w + x; return Lm[i] || dEi(i, surfLab) > thr; };
      const stack = new Int32Array(bw * bh);
      for (let yy = 0; yy < bh; yy++) for (let xx = 0; xx < bw; xx++) {
        if (lab[yy * bw + xx] !== -1) continue;
        if (!on(xx + x0, yy + y0)) { lab[yy * bw + xx] = -2; continue; }
        let sp = 0, n = 0, mx0 = xx, mx1 = xx, my0 = yy, my1 = yy; stack[sp++] = yy * bw + xx; lab[yy * bw + xx] = out.length;
        const pts = [];
        while (sp) { const k = stack[--sp], cx = k % bw, cy = (k / bw) | 0; n++; if (n < 400000) pts.push(k);
          if (cx < mx0) mx0 = cx; if (cx > mx1) mx1 = cx; if (cy < my0) my0 = cy; if (cy > my1) my1 = cy;
          for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) { const nx = cx + dx, ny = cy + dy; if (nx < 0 || ny < 0 || nx >= bw || ny >= bh) continue; const nk = ny * bw + nx; if (lab[nk] !== -1) continue; if (on(nx + x0, ny + y0)) { lab[nk] = out.length; stack[sp++] = nk; } else lab[nk] = -2; } }
        const cw = mx1 - mx0 + 1, ch = my1 - my0 + 1;
        if (cw >= minW && ch >= minH) {
          // a frame counts too (an outlined card, or a tinted shell around white cards): the shape must run along
          // nearly all of its bounding box, within 10px inward of each side
          const id = out.length, hit = (x, y) => x >= 0 && y >= 0 && x < bw && y < bh && lab[y * bw + x] === id;
          let tot = 0, cov = 0;
          for (let x = mx0 + 12; x <= mx1 - 12; x += 4) { tot += 2; for (let k = 0; k < 10; k++) if (hit(x, my0 + k)) { cov++; break; } for (let k = 0; k < 10; k++) if (hit(x, my1 - k)) { cov++; break; } }
          for (let y = my0 + 12; y <= my1 - 12; y += 4) { tot += 2; for (let k = 0; k < 10; k++) if (hit(mx0 + k, y)) { cov++; break; } for (let k = 0; k < 10; k++) if (hit(mx1 - k, y)) { cov++; break; } }
          const fill = n / (cw * ch), frame = tot ? cov / tot : 0;
          if (fill > 0.45 || (frame > 0.9 && cw >= 48 && ch >= 32)) out.push({ x0: mx0 + x0, y0: my0 + y0, x1: mx1 + x0 + 1, y1: my1 + y0 + 1, fill, outline: fill <= 0.45 });
          else out.push(null);
        } else out.push(null);
      }
      return out.filter(Boolean);
    }
    const radiusOf = (c, surfLab) => { // walk the corner diagonal until we're inside the shape
      let k = 0; while (k < Math.min(c.x1 - c.x0, c.y1 - c.y0) / 2) { const i = (c.y0 + k) * w + c.x0 + k; if (Lm[i] || dEi(i, surfLab) > 2.5) break; k++; }
      return Math.round((k / (1 - Math.SQRT1_2)) / 2) * 2;
    };
    const describe = (c, surfLab, level) => {
      const inset = Math.min(4, Math.floor((c.x1 - c.x0) / 6)), mid = Math.floor((c.y0 + c.y1) / 2);
      // a frame's color is what runs along its edge; a filled box's is what fills it
      const fillC = c.outline ? regionMode(c.x0 + 2, mid - 20, c.x0 + 7, mid + 20, 1) : regionMode(c.x0 + inset, c.y0 + inset, c.x1 - inset, c.y1 - inset, 3);
      let hasBorder = false, bc = null; const bpx = []; for (let x = c.x0 + 8; x < c.x1 - 8; x += 3) { const i = c.y0 * w + x; if (Lm[i] || Lm[i + w]) { bpx.push(px(x, c.y0)); } }
      if (bpx.length > (c.x1 - c.x0 - 16) / 6) { hasBorder = true; bc = IK.hex(...mode(bpx)); }
      return { x: c.x0, y: c.y0, w: c.x1 - c.x0, h: c.y1 - c.y0, fill: IK.hex(...fillC), border: hasBorder ? bc : null, radius: radiusOf(c, surfLab), level, fullWidth: c.x1 - c.x0 >= w * 0.96 };
    };
    let containers = components(0, 0, w, h, bgLab, 2.5, 32, 20).map((c) => describe(c, bgLab, 1)).filter((c) => !(c.fullWidth && c.h > h * 0.9));
    const kids = [];
    for (const c of containers.filter((c) => !c.fullWidth && c.w * c.h > 3000).slice(0, 40)) {
      const fl = IK.lab(...[1, 3, 5].map((i) => parseInt(c.fill.slice(i, i + 2), 16)));
      for (const k of components(c.x + 3, c.y + 3, c.x + c.w - 3, c.y + c.h - 3, fl, 2.5, 24, 14)) { const kd = describe(k, fl, 2); if (kd.w < c.w - 12 || kd.h < c.h - 12) kids.push(kd); }
    }
    containers = containers.concat(kids.slice(0, 60));

    // text lines: recursive XY cuts of the text-and-texture edges inside each band
    const leaves = [];
    const rowsOn = (x0, y0, x1, y1) => { const r = new Int32Array(y1 - y0); for (let y = y0; y < y1; y++) for (let x = x0; x < x1; x++) if (T[y * w + x]) r[y - y0]++; return r; };
    const colsOn = (x0, y0, x1, y1) => { const c = new Int32Array(x1 - x0); for (let y = y0; y < y1; y++) for (let x = x0; x < x1; x++) if (T[y * w + x]) c[x - x0]++; return c; };
    const splits = (prof, minGap, minOn = 1) => { const segs = []; let s0 = -1, gap = 0; for (let i = 0; i <= prof.length; i++) { const on = i < prof.length && prof[i] >= minOn; if (on) { if (s0 < 0) s0 = i; gap = 0; } else if (s0 >= 0) { gap++; if (gap >= minGap || i === prof.length) { segs.push([s0, i - gap + 1]); s0 = -1; gap = 0; } } } return segs; };
    function cut(x0, y0, x1, y1, depth) {
      const rs = splits(rowsOn(x0, y0, x1, y1), 3, 2);
      for (const [a, b] of rs) {
        const ry0 = y0 + a, ry1 = y0 + b, hh = ry1 - ry0;
        const cs = splits(colsOn(x0, ry0, x1, ry1), Math.max(18, Math.min(Math.round(hh * 1.1), 34)));
        if (cs.length > 1 && depth < 8) { for (const [c0, c1] of cs) cut(x0 + c0, ry0, x0 + c1, ry1, depth + 1); continue; }
        const cx0 = x0 + (cs[0]?.[0] ?? 0), cx1 = x0 + (cs[0]?.[1] ?? x1 - x0);
        if (rs.length === 1 && depth < 8 && hh > 24) { const inner = splits(rowsOn(cx0, ry0, cx1, ry1), 2, 2); if (inner.length > 1) { cut(cx0, ry0, cx1, ry1, depth + 1); continue; } }
        leaves.push({ x0: cx0, y0: ry0, x1: cx1, y1: ry1 });
      }
    }
    for (const [y0, y1] of bands) cut(0, y0, w, y1, 0);
    const runs = leaves.map((r) => {
      const hh = r.y1 - r.y0, ww = r.x1 - r.x0;
      const local = IK.lab(...regionMode(Math.max(0, r.x0 - 3), Math.max(0, r.y0 - 3), Math.min(w, r.x1 + 3), Math.min(h, r.y1 + 3), 1));
      const ink = []; for (let y = r.y0; y < r.y1; y++) for (let x = r.x0; x < r.x1; x++) { const i = y * w + x; const e = dEi(i, local); if (e > 18) ink.push([e, i]); }
      ink.sort((a, b) => b[0] - a[0]);
      const top = ink.slice(0, Math.max(1, Math.floor(ink.length * 0.3))).map(([, i]) => [d[i * 4], d[i * 4 + 1], d[i * 4 + 2]]);
      const col = top.length ? top.reduce((a, c) => [a[0] + c[0], a[1] + c[1], a[2] + c[2]], [0, 0, 0]).map((v) => v / top.length) : [0, 0, 0];
      const surf = regionMode(Math.max(0, r.x0 - 3), Math.max(0, r.y0 - 3), Math.min(w, r.x1 + 3), Math.min(h, r.y1 + 3), 1);
      const density = ink.length / (ww * hh);
      const text = hh >= 6 && hh <= 120 && ww / hh > 1.1 && density > 0.04 && density < 0.75;
      return { y0: r.y0, y1: r.y1, x0: r.x0, x1: r.x1, h: hh, text, size: text ? Math.max(8, Math.round(1.08 * hh - 2)) : null /* calibrated on Geist, Geist Serif and Newsreader at 12–80px: ±10% for lines with ascenders and descenders */, color: IK.hex(...col), bg: IK.hex(...surf), ratio: IK.contrast(col, surf) };
    }).filter((r) => r.x1 - r.x0 >= 4).sort((a, b) => a.y0 - b.y0 || a.x0 - b.x0);
    // lines that share a left edge, color and rough height are one text style: the ones without descenders read small,
    // so the group takes its largest estimate
    const groups = [];
    for (const r of runs.filter((r) => r.text)) { const L = IK.lab(...[1, 3, 5].map((i) => parseInt(r.color.slice(i, i + 2), 16)));
      const g = groups.find((g) => Math.abs(g.x0 - r.x0) <= 6 && IK.dE(g.lab, L) < 12 && r.h <= g.h * 1.4 && r.h >= g.h / 1.4); if (g) { g.items.push(r); g.h = Math.max(g.h, r.h); } else groups.push({ x0: r.x0, lab: L, h: r.h, items: [r] }); }
    for (const g of groups) if (g.items.length > 1) { const mx = Math.max(...g.items.map((r) => r.size)); for (const r of g.items) { r.measured = r.size; r.size = mx; r.group = g.items.length; } }
    // line pitch between stacked lines of similar size in the same column
    for (const a of runs) for (const b of runs) if (a !== b && a.text && b.text && Math.abs(a.x0 - b.x0) < 8 && Math.abs(a.h - b.h) <= 4 && b.y0 > a.y0 && b.y0 - a.y0 < a.h * 2.4) { a.pitch = b.y0 - a.y0; b.pitch = b.pitch || a.pitch; }
    // alignment: centered within its container (or the page) or left
    for (const r of runs) { const box = containers.filter((c) => !c.fullWidth && c.x <= r.x0 && c.y <= r.y0 && c.x + c.w >= r.x1 && c.y + c.h >= r.y1).sort((a, b) => a.w * a.h - b.w * b.h)[0];
      const L = box ? box.x : 0, R = box ? box.x + box.w : w; r.center = Math.abs((r.x0 + r.x1) / 2 - (L + R) / 2) < 10 && r.x0 - L > 24; r.inBox = box ? containers.indexOf(box) + 1 : null;
      if (box && r.text) { r.padLeft = r.x0 - box.x; r.padTop = r.y0 - box.y; } }
    for (const c of containers) { const inside = runs.filter((r) => r.text && r.x0 >= c.x && r.x1 <= c.x + c.w && r.y0 >= c.y && r.y1 <= c.y + c.h); if (inside.length) { c.padLeft = Math.min(...inside.map((r) => r.x0)) - c.x; c.padTop = Math.min(...inside.map((r) => r.y0)) - c.y; } }

    const textRuns = runs.filter((r) => r.text);
    const colX0 = textRuns.length ? Math.min(...textRuns.map((r) => r.x0)) : 0, colX1 = textRuns.length ? Math.max(...textRuns.map((r) => r.x1)) : w;
    const pal = IK.palette(d, w, h, 10);
    for (const c of pal) { const near = IK.dE(c.lab, bgLab) < 6; c.role = near ? "background" : c.chroma > 30 ? "accent" : c.share > 0.08 ? "surface" : IK.contrast(c.rgb, bg) > 4 ? "text" : "muted / border"; delete c.lab; }
    const bandOut = bands.map(([y0, y1], i) => ({ i: i + 1, y0, y1, h: y1 - y0, bg: IK.hex(...regionMode(0, y0, w, Math.min(y1, y0 + 6), 3)), lines: runs.filter((r) => r.text && r.y0 >= y0 && r.y1 <= y1).length, boxes: containers.filter((c) => c.y >= y0 && c.y + c.h <= y1).length }));

    // annotated copy at CSS size
    const A = IK.grab(im, w, h); const g = A.g; g.font = "600 11px system-ui, sans-serif"; g.lineWidth = 1;
    const tag = (x, y, text, color) => { const tw = g.measureText(text).width + 8; x = Math.max(0, Math.min(w - tw, x)); g.fillStyle = color; g.fillRect(x, y, tw, 15); g.fillStyle = "#fff"; g.fillText(text, x + 4, y + 11); };
    for (const b of bandOut) { g.strokeStyle = "rgba(0,120,255,.9)"; g.setLineDash([6, 4]); g.strokeRect(0.5, b.y0 + 0.5, w - 1, b.h - 1); g.setLineDash([]); tag(0, b.y0, `band ${b.i}`, "rgba(0,120,255,.95)"); }
    containers.forEach((c, i) => { if (c.fullWidth) return; g.strokeStyle = c.level === 1 ? "rgba(0,170,110,.95)" : "rgba(230,140,0,.95)"; g.strokeRect(c.x + 0.5, c.y + 0.5, c.w - 1, c.h - 1); tag(c.x + c.w - 90, c.y + c.h - 15, `#${i + 1} r${c.radius} ${c.w}×${c.h}`, g.strokeStyle); });
    for (const r of runs) if (r.text) { g.strokeStyle = "rgba(255,40,80,.95)"; g.strokeRect(r.x0 - 0.5, r.y0 - 0.5, r.x1 - r.x0 + 1, r.h + 1); tag(r.x1 + 3, r.y0, `≈${r.size}`, "rgba(255,40,80,.95)"); }
    const annotated = A.c.toDataURL("image/png");
    const tiles = [];
    for (const b of bandOut) for (let y = b.y0; y < b.y1 && tiles.length < 16; y += 480) {
      const hh = Math.min(480, b.y1 - y); if (hh < 8) continue;
      const Tt = IK.grab(im, w * 2, hh * 2, 0, y * dpr, W, hh * dpr); tiles.push({ name: `band-${String(b.i).padStart(2, "0")}${y > b.y0 ? "-" + y : ""}.png`, y, h: hh, data: Tt.c.toDataURL("image/png") });
    }
    const gaps = []; const tr = textRuns.slice().sort((a, b) => a.y0 - b.y0);
    for (let i = 1; i < tr.length; i++) if (Math.abs(tr[i].x0 - tr[i - 1].x0) < 40 || tr[i].center && tr[i - 1].center) { const gp = tr[i].y0 - tr[i - 1].y1; if (gp > 0) gaps.push({ gap: gp }); }
    return { image: { width: W, height: H, dpr, cssWidth: w, cssHeight: h }, background: IK.hex(...bg), palette: pal.map(({ hex, rgb, share, role }) => ({ hex, rgb, share: Math.round(share * 1000) / 10, role })),
      column: { x0: colX0, x1: colX1, width: colX1 - colX0, centered: Math.abs((colX0 + colX1) / 2 - w / 2) < 16 },
      bands: bandOut, containers, runs, gaps, annotated, tiles };
  }, [src, +flag("--dpr") || 0]);

  write("annotated.png", spec.annotated); delete spec.annotated;
  for (const t of spec.tiles) { write(path.join("tiles", t.name), t.data); delete t.data; }
  fs.writeFileSync(path.join(out, "spec.json"), JSON.stringify(spec, null, 2));

  const snap = (v) => Math.round(v / 4) * 4;
  const I = spec.image, md = [];
  md.push(`# Design spec: ${path.basename(img)}`, "");
  md.push(`Read as **${I.cssWidth} × ${I.cssHeight} CSS px** at ${I.dpr}x (${I.width} × ${I.height} image pixels). Build at a ${I.cssWidth}px-wide viewport.`, "");
  md.push(`Background \`${spec.background}\`. Text spans x ${spec.column.x0}–${spec.column.x1} (${spec.column.width}px${spec.column.centered ? ", centered on the page" : ""}).`, "");
  md.push("## Palette", "", "| Color | Share | Role (guess) |", "|---|---|---|", ...spec.palette.map((c) => `| \`${c.hex}\` | ${c.share}% | ${c.role} |`), "");
  md.push("## Bands (where the full-width background changes)", "", "| Band | y | Height | Background | Text lines | Boxes |", "|---|---|---|---|---|---|",
    ...spec.bands.map((b) => `| ${b.i} | ${b.y0}–${b.y1} | ${b.h} | \`${b.bg}\` | ${b.lines} | ${b.boxes} |`), "");
  const boxes = spec.containers.map((c, i) => ({ ...c, n: i + 1 })).filter((c) => !c.fullWidth);
  if (boxes.length) md.push("## Boxes (cards, buttons, badges, images, inputs)", "", "Level 1 sits on the page; level 2 sits inside a level-1 box. Radius is read from the corner curve (±2px).", "",
    "| # | Level | x, y | Size | Fill | Border | Radius | Padding (left, top) |", "|---|---|---|---|---|---|---|---|",
    ...boxes.slice(0, 50).map((c) => `| ${c.n} | ${c.level} | ${c.x}, ${c.y} | ${c.w} × ${c.h} | \`${c.fill}\` | ${c.border ? "`" + c.border + "`" : "none"} | ${c.radius} | ${c.padLeft != null ? c.padLeft + ", " + c.padTop : ""} |`), "");
  const lines = spec.runs.filter((r) => r.text).slice(0, 60);
  md.push("## Text lines (top to bottom)", "", "≈ Size comes from the line's ink height, calibrated to within about 10% for lines with both ascenders and descenders. A line with no descenders (no g, p, q, y) or set in all caps reads 15–30% small; check it against its neighbours, the line pitch and the tiles.", "",
    "| y | x | Width | ≈ Size | Line pitch | Color | On | Contrast | Align | In box |", "|---|---|---|---|---|---|---|---|---|---|",
    ...lines.map((r) => `| ${r.y0} | ${r.x0} | ${r.x1 - r.x0} | ${r.size}px${r.group ? ` (style of ${r.group})` : ""} | ${r.pitch ? r.pitch + "px" : ""} | \`${r.color}\` | \`${r.bg}\` | ${r.ratio.toFixed(1)}:1 | ${r.center ? "center" : "left"} | ${r.inBox ? "#" + r.inBox : ""} |`), "");
  const blocks = spec.runs.filter((r) => !r.text);
  if (blocks.length) md.push("## Other marks (icons, art, illustration, glyph clusters)", "", "| y | x | Size |", "|---|---|---|", ...blocks.slice(0, 30).map((r) => `| ${r.y0} | ${r.x0} | ${r.x1 - r.x0} × ${r.h} |`), "");
  const big = spec.gaps.filter((g) => g.gap >= 8);
  md.push("## Vertical gaps between blocks", "", big.map((g) => `${g.gap}px (≈${snap(g.gap)})`).join(" · ") || "none", "");
  const sizes = [...new Set(lines.map((r) => r.size))].sort((a, b) => b - a);
  md.push("## Suggested starting tokens", "", `- Type sizes seen (≈): ${sizes.join(", ")}px. Snap to a 6–8 step scale.`, `- Spacing seen (snapped to 4): ${[...new Set(big.map((g) => snap(g.gap)))].sort((a, b) => a - b).join(", ")}px.`,
    `- Colors: background \`${spec.background}\`; text candidates ${spec.palette.filter((c) => c.role === "text").map((c) => "`" + c.hex + "`").join(", ") || "(none found)"}; accents ${spec.palette.filter((c) => c.role === "accent").map((c) => "`" + c.hex + "`").join(", ") || "(none)"}.`, "");
  md.push("## Files", "", "- `annotated.png`: bands (blue), boxes (green on the page, orange inside a box, with radius and size), text lines (red, with ≈ size).", "- `tiles/`: each band at 2x. Open them one at a time and read the details: font style, icons, borders, radii, exact copy.",
    `- Zoom anywhere: \`node extract-spec.mjs ${path.basename(img)} --crop x,y,w,h --zoom 3\`.`, "- Then build, and score the build with `compare-image.mjs`.");
  fs.writeFileSync(path.join(out, "spec.md"), md.join("\n") + "\n");
  console.log(`majestic-ui extract-spec · ${img}\n`);
  console.log(`${I.cssWidth}×${I.cssHeight} CSS px at ${I.dpr}x · background ${spec.background} · ${spec.bands.length} bands · ${boxes.length} boxes · ${lines.length} text lines`);
  console.log(`palette: ${spec.palette.slice(0, 8).map((c) => `${c.hex} ${c.share}% ${c.role}`).join(" | ")}`);
  console.log(`\nNOW OPEN: ${path.join(out, "annotated.png")}, then the tiles in ${path.join(out, "tiles")}\nSpec: ${path.join(out, "spec.md")}`);
} finally { cdp.ws.close(); session.cleanup(); }
