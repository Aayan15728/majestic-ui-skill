// Shared by the majestic-ui scripts: find or reach a Chrome / Chromium / Edge and drive it over the DevTools protocol.
// Zero dependencies (Node 22+ has fetch and WebSocket built in).
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawn } from "node:child_process";

export const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export function findBrowser() {
  const home = os.homedir(), pf = process.env["PROGRAMFILES"] || "C:\\Program Files", pf86 = process.env["PROGRAMFILES(X86)"] || "C:\\Program Files (x86)", lad = process.env.LOCALAPPDATA || "";
  const list = [process.env.CHROME_PATH,
    "/usr/bin/google-chrome", "/usr/bin/google-chrome-stable", "/usr/bin/chromium", "/usr/bin/chromium-browser", "/snap/bin/chromium", "/usr/bin/microsoft-edge",
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", "/Applications/Chromium.app/Contents/MacOS/Chromium", "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
    `${pf}\\Google\\Chrome\\Application\\chrome.exe`, `${pf86}\\Google\\Chrome\\Application\\chrome.exe`, `${lad}\\Google\\Chrome\\Application\\chrome.exe`,
    `${pf86}\\Microsoft\\Edge\\Application\\msedge.exe`, `${pf}\\Microsoft\\Edge\\Application\\msedge.exe`];
  for (const base of [path.join(home, ".cache", "ms-playwright"), path.join(home, "Library", "Caches", "ms-playwright"), path.join(lad, "ms-playwright")]) {
    try { for (const d of fs.readdirSync(base)) if (/^chromium-/.test(d)) list.push(path.join(base, d, "chrome-linux", "chrome"), path.join(base, d, "chrome-win", "chrome.exe"), path.join(base, d, "chrome-mac", "Chromium.app", "Contents", "MacOS", "Chromium")); } catch {}
  }
  return list.find((p) => p && fs.existsSync(p));
}


// Returns { wsUrl, cleanup } or null when no browser exists. cdpUrl reuses a browser started with --remote-debugging-port.
export async function launch(cdpUrl) {
  if (cdpUrl) {
    const r = await fetch(cdpUrl.replace(/\/$/, "") + "/json/version"); const j = await r.json();
    return { wsUrl: j.webSocketDebuggerUrl, cleanup() {} };
  }
  const exe = findBrowser();
  if (!exe) return null;
  const tmpProfile = fs.mkdtempSync(path.join(os.tmpdir(), "majestic-chrome-"));
  const args = ["--headless=new", "--remote-debugging-port=0", `--user-data-dir=${tmpProfile}`, "--no-first-run", "--no-default-browser-check", "--disable-gpu",
    "--hide-scrollbars", "--mute-audio", "--allow-file-access-from-files", "about:blank"];
  if (process.platform === "linux" && process.getuid?.() === 0) args.unshift("--no-sandbox");
  const child = spawn(exe, args, { stdio: ["ignore", "ignore", "pipe"] });
  const cleanup = () => { try { child.kill(); } catch {} try { fs.rmSync(tmpProfile, { recursive: true, force: true }); } catch {} };
  const wsUrl = await new Promise((resolve, reject) => {
    let buf = "";
    const t = setTimeout(() => reject(new Error("browser did not start in 20s")), 20000);
    child.stderr.on("data", (d) => { buf += d; const m = buf.match(/DevTools listening on (ws:\/\/\S+)/); if (m) { clearTimeout(t); resolve(m[1]); } });
    child.on("exit", (c) => { clearTimeout(t); reject(new Error("browser exited early (code " + c + ")")); });
  }).catch((e) => { cleanup(); throw e; });
  return { wsUrl, cleanup };
}

// ---------- a very small DevTools client ----------
export class CDP {
  constructor(ws) { this.ws = ws; this.id = 0; this.pending = new Map(); this.listeners = [];
    ws.addEventListener("message", (e) => { const m = JSON.parse(e.data);
      if (m.id && this.pending.has(m.id)) { const { resolve, reject } = this.pending.get(m.id); this.pending.delete(m.id); m.error ? reject(new Error(m.error.message)) : resolve(m.result); }
      else if (m.method) for (const l of this.listeners) l(m); }); }
  static async open(wsUrl) { const ws = new WebSocket(wsUrl); await new Promise((res, rej) => { ws.addEventListener("open", res); ws.addEventListener("error", () => rej(new Error("cannot connect to the browser"))); }); return new CDP(ws); }
  send(method, params = {}, sessionId) { const id = ++this.id; this.ws.send(JSON.stringify({ id, method, params, sessionId })); return new Promise((resolve, reject) => this.pending.set(id, { resolve, reject })); }
  on(fn) { this.listeners.push(fn); return () => { this.listeners = this.listeners.filter((x) => x !== fn); }; }
}
export class Page {
  static async create(cdp, { w, h, dpr = 1, dark = false }) {
    const { targetId } = await cdp.send("Target.createTarget", { url: "about:blank" });
    const { sessionId } = await cdp.send("Target.attachToTarget", { targetId, flatten: true });
    const p = new Page(); Object.assign(p, { cdp, targetId, sessionId, w, h, dpr, errors: [] });
    p.off = cdp.on((m) => { if (m.sessionId !== sessionId) return;
      if (m.method === "Runtime.exceptionThrown") p.errors.push((m.params.exceptionDetails.exception?.description || m.params.exceptionDetails.text || "").split("\n")[0].slice(0, 140));
      if (m.method === "Log.entryAdded" && m.params.entry.level === "error") p.errors.push(m.params.entry.text.slice(0, 140));
      if (m.method === "Network.loadingFailed" && !m.params.canceled) p.errors.push("request failed: " + (p.reqs?.[m.params.requestId] || "").slice(-70));
      if (m.method === "Network.requestWillBeSent") (p.reqs ??= {})[m.params.requestId] = m.params.request.url;
      if (m.method === "Page.loadEventFired") p.loaded?.(); });
    for (const d of ["Page", "Runtime", "Log", "Network"]) await p.s(d + ".enable");
    await p.metrics(dpr);
    if (dark) await p.s("Emulation.setEmulatedMedia", { features: [{ name: "prefers-color-scheme", value: "dark" }] });
    return p;
  }
  s(method, params) { return this.cdp.send(method, params, this.sessionId); }
  metrics(dpr) { return this.s("Emulation.setDeviceMetricsOverride", { width: this.w, height: this.h, deviceScaleFactor: dpr, mobile: this.w < 600 }); }
  async goto(u) { const done = new Promise((r) => { this.loaded = r; }); await this.s("Page.navigate", { url: u }); await Promise.race([done, sleep(20000)]); }
  async eval(fn, arg) {
    const r = await this.s("Runtime.evaluate", { expression: `(${fn})(${JSON.stringify(arg ?? null)})`, awaitPromise: true, returnByValue: true });
    if (r.exceptionDetails) throw new Error("page script failed: " + (r.exceptionDetails.exception?.description || r.exceptionDetails.text));
    return r.result.value;
  }
  async shot() { return Buffer.from((await this.s("Page.captureScreenshot", { format: "png" })).data, "base64"); }
  // The whole page in CSS pixels, captured one viewport at a time while scrolling, so nothing is resized:
  // capturing beyond the viewport would re-run every vh / svh rule and move what we measured.
  async bands() {
    const docH = Math.min(await this.eval(() => document.documentElement.scrollHeight), 14000), out = [];
    for (let y = 0; y < docH; y += this.h) {
      const at = await this.eval((yy) => { scrollTo({ top: yy, left: 0, behavior: "instant" }); return scrollY; }, y); // "instant": a page with scroll-behavior: smooth would still be moving when the band is captured
      await sleep(160);
      const height = Math.min(this.h, docH - at);
      const { data } = await this.s("Page.captureScreenshot", { format: "png", clip: { x: 0, y: at, width: this.w, height, scale: 1 / this.dpr } });
      out.push({ y: at, data: "data:image/png;base64," + data });
      // fixed and sticky layers were measured in the first band; hide them so they don't cover what's under them later
      if (y === 0) await this.eval(() => { for (const e of document.querySelectorAll("body *")) { const p = getComputedStyle(e).position; if (p === "fixed" || p === "sticky") e.style.setProperty("visibility", "hidden", "important"); } });
      if (at + height >= docH) break;
    }
    await this.eval(() => scrollTo({ top: 0, left: 0, behavior: "instant" }));
    return { docH, w: this.w, bands: out };
  }
  async key(key, code, vk, text) {
    await this.s("Input.dispatchKeyEvent", { type: text ? "keyDown" : "rawKeyDown", key, code, windowsVirtualKeyCode: vk, nativeVirtualKeyCode: vk, text });
    await this.s("Input.dispatchKeyEvent", { type: "keyUp", key, code, windowsVirtualKeyCode: vk, nativeVirtualKeyCode: vk });
    await sleep(60);
  }
  async setHtml(html) { const { frameTree } = await this.s("Page.getFrameTree"); await this.s("Page.setDocumentContent", { frameId: frameTree.frame.id, html }); }
  async close() { this.off(); await this.cdp.send("Target.closeTarget", { targetId: this.targetId }).catch(() => {}); }
}

