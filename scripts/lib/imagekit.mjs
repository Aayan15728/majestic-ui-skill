// In-page image toolkit for the design-to-code scripts. Installed into a blank browser page as window.IK,
// so all pixel work runs in the browser's canvas with no npm packages.
export const IMAGEKIT = String.raw`
window.IK = (() => {
  const load = async (src) => { const im = new Image(); im.src = src; await im.decode(); return im; };
  const grab = (im, w, h, sx = 0, sy = 0, sw = im.naturalWidth || im.width, sh = im.naturalHeight || im.height) => {
    const c = document.createElement("canvas"); c.width = w; c.height = h;
    const g = c.getContext("2d", { willReadFrequently: true }); g.imageSmoothingEnabled = true; g.imageSmoothingQuality = "high";
    g.fillStyle = "#fff"; g.fillRect(0, 0, w, h); g.drawImage(im, sx, sy, sw, sh, 0, 0, w, h);
    return { c, g, d: g.getImageData(0, 0, w, h).data, w, h };
  };
  const lin = (v) => ((v /= 255) <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
  const lab = (r, g, b) => {
    const R = lin(r), G = lin(g), B = lin(b);
    let x = (R * 0.4124 + G * 0.3576 + B * 0.1805) / 0.95047, y = R * 0.2126 + G * 0.7152 + B * 0.0722, z = (R * 0.0193 + G * 0.1192 + B * 0.9505) / 1.08883;
    const f = (t) => (t > 0.008856 ? Math.cbrt(t) : 7.787 * t + 16 / 116); x = f(x); y = f(y); z = f(z);
    return [116 * y - 16, 500 * (x - y), 200 * (y - z)];
  };
  const dE = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
  const hex = (r, g, b) => "#" + [r, g, b].map((v) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, "0")).join("");
  const luma = (d, i) => 0.2126 * d[i] + 0.7152 * d[i + 1] + 0.0722 * d[i + 2];
  const contrast = (a, b) => { const L = (c) => 0.2126 * lin(c[0]) + 0.7152 * lin(c[1]) + 0.0722 * lin(c[2]); const x = L(a), y = L(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); };

  // dominant colors: k-means++ in Lab on a sample, merged when closer than 5 dE
  function palette(d, w, h, k = 10) {
    const n = w * h, step = Math.max(1, Math.floor(n / 40000)), pts = [];
    for (let i = 0; i < n; i += step) { const o = i * 4; pts.push([d[o], d[o + 1], d[o + 2], lab(d[o], d[o + 1], d[o + 2])]); }
    const cs = [pts[Math.floor(pts.length / 2)][3]];
    while (cs.length < k) {
      let best = null, bd = -1;
      for (let j = 0; j < pts.length; j += 7) { let m = 1e9; for (const c of cs) m = Math.min(m, dE(pts[j][3], c)); if (m > bd) { bd = m; best = pts[j][3]; } }
      if (bd < 3) break; cs.push(best);
    }
    let asg = new Int32Array(pts.length);
    for (let it = 0; it < 12; it++) {
      const sum = cs.map(() => [0, 0, 0, 0]);
      for (let j = 0; j < pts.length; j++) { let bi = 0, bd = 1e9; for (let c = 0; c < cs.length; c++) { const v = dE(pts[j][3], cs[c]); if (v < bd) { bd = v; bi = c; } } asg[j] = bi; const s = sum[bi]; s[0] += pts[j][3][0]; s[1] += pts[j][3][1]; s[2] += pts[j][3][2]; s[3]++; }
      for (let c = 0; c < cs.length; c++) if (sum[c][3]) cs[c] = [sum[c][0] / sum[c][3], sum[c][1] / sum[c][3], sum[c][2] / sum[c][3]];
    }
    let out = cs.map((c, ci) => { let r = 0, g = 0, b = 0, m = 0; for (let j = 0; j < pts.length; j++) if (asg[j] === ci) { r += pts[j][0]; g += pts[j][1]; b += pts[j][2]; m++; } return m ? { rgb: [r / m, g / m, b / m], lab: c, share: m / pts.length } : null; }).filter(Boolean);
    out.sort((a, b) => b.share - a.share);
    const merged = [];
    for (const c of out) { const t = merged.find((x) => dE(x.lab, c.lab) < 5); if (t) t.share += c.share; else merged.push(c); }
    return merged.map((c) => ({ hex: hex(...c.rgb), rgb: c.rgb.map(Math.round), lab: c.lab, share: c.share, chroma: Math.hypot(c.lab[1], c.lab[2]) }));
  }

  // Sobel edge mask on luminance
  function edges(d, w, h, th = 0.09) {
    const L = new Float32Array(w * h); for (let i = 0; i < w * h; i++) L[i] = luma(d, i * 4) / 255;
    const m = new Uint8Array(w * h);
    for (let y = 1; y < h - 1; y++) for (let x = 1; x < w - 1; x++) {
      const i = y * w + x;
      const gx = -L[i - w - 1] - 2 * L[i - 1] - L[i + w - 1] + L[i - w + 1] + 2 * L[i + 1] + L[i + w + 1];
      const gy = -L[i - w - 1] - 2 * L[i - w] - L[i - w + 1] + L[i + w - 1] + 2 * L[i + w] + L[i + w + 1];
      if (Math.hypot(gx, gy) / 4 > th) m[i] = 1;
    }
    return m;
  }
  function dilate(m, w, h, r) {
    const o = new Uint8Array(w * h);
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) if (m[y * w + x]) for (let dy = -r; dy <= r; dy++) for (let dx = -r; dx <= r; dx++) { const X = x + dx, Y = y + dy; if (X >= 0 && Y >= 0 && X < w && Y < h) o[Y * w + X] = 1; }
    return o;
  }
  // edge agreement with tolerance: F1 of target edges found near page edges and back
  function edgeF1(a, b, w, h, x0 = 0, y0 = 0, x1 = w, y1 = h, dx = 0, dy = 0, aD, bD) {
    let ta = 0, hitA = 0, tb = 0, hitB = 0;
    for (let y = y0; y < y1; y++) for (let x = x0; x < x1; x++) {
      const i = y * w + x, X = x + dx, Y = y + dy; const j = X >= 0 && Y >= 0 && X < w && Y < h ? Y * w + X : -1;
      if (a[i]) { ta++; if (j >= 0 && bD[j]) hitA++; }
      if (j >= 0 && b[j]) { tb++; if (aD[i]) hitB++; }
    }
    if (ta + tb === 0) return 1;
    const p = tb ? hitB / tb : 0, r = ta ? hitA / ta : 0;
    return p + r ? (2 * p * r) / (p + r) : 0;
  }
  // structural similarity on luminance, 8x8 windows
  function ssim(da, db, w, h, x0 = 0, y0 = 0, x1 = w, y1 = h) {
    const C1 = (0.01 * 255) ** 2, C2 = (0.03 * 255) ** 2; let s = 0, n = 0;
    for (let y = y0; y + 8 <= y1; y += 4) for (let x = x0; x + 8 <= x1; x += 4) {
      let ma = 0, mb = 0; for (let v = 0; v < 8; v++) for (let u = 0; u < 8; u++) { const i = ((y + v) * w + x + u) * 4; ma += luma(da, i); mb += luma(db, i); }
      ma /= 64; mb /= 64; let va = 0, vb = 0, cv = 0;
      for (let v = 0; v < 8; v++) for (let u = 0; u < 8; u++) { const i = ((y + v) * w + x + u) * 4; const a = luma(da, i) - ma, b = luma(db, i) - mb; va += a * a; vb += b * b; cv += a * b; }
      va /= 63; vb /= 63; cv /= 63;
      s += ((2 * ma * mb + C1) * (2 * cv + C2)) / ((ma * ma + mb * mb + C1) * (va + vb + C2)); n++;
    }
    return n ? s / n : 1;
  }
  return { load, grab, lab, dE, hex, luma, contrast, palette, edges, dilate, edgeF1, ssim };
})();
`;
