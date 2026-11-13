"use client";
import { useEffect, useRef } from "react";

// Canvas art: drawn once per size and theme, color read from a CSS variable, hidden from assistive tech.
export function DottedHills() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const draw = () => {
      const dpr = Math.min(devicePixelRatio || 1, 2), w = c.clientWidth, h = c.clientHeight;
      c.width = w * dpr; c.height = h * dpr;
      const g = c.getContext("2d"); if (!g) return;
      g.setTransform(dpr, 0, 0, dpr, 0, 0); g.clearRect(0, 0, w, h);
      const rgb = getComputedStyle(document.documentElement).getPropertyValue("--dot").trim();
      const peaks = [[0.12, 0.42, 0.14], [0.46, 0.92, 0.2], [0.7, 0.5, 0.11], [0.98, 0.6, 0.12]];
      const ridge = (x: number) => Math.max(...peaks.map(([px, ph, pw]) => ph * Math.exp(-(((x / w) - px) ** 2) / (2 * pw * pw))));
      const step = w < 600 ? 9 : 11;
      for (let y = step / 2; y < h; y += step) for (let x = step / 2; x < w; x += step) {
        const top = h - ridge(x) * h; if (y < top) continue;
        const depth = Math.min(1, (y - top) / (h * 0.55)), fade = 1 - (y / h) * 0.55;
        g.fillStyle = `rgb(${rgb} / ${(0.12 + (1 - depth) * 0.3) * fade})`;
        g.beginPath(); g.arc(x, y, 0.6 + (1 - depth) * 1.6, 0, 6.283); g.fill();
      }
    };
    draw();
    const ro = new ResizeObserver(draw); ro.observe(c);
    const mq = matchMedia("(prefers-color-scheme: dark)");
    mq.addEventListener("change", draw); window.addEventListener("themechange", draw);
    return () => { ro.disconnect(); mq.removeEventListener("change", draw); window.removeEventListener("themechange", draw); };
  }, []);
  return <canvas ref={ref} id="hills" aria-hidden="true" />;
}
