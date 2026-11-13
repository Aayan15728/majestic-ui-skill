"use client";
import { useRef, useState, type KeyboardEvent } from "react";

// Tabs with roving tabindex (arrows, Home, End) switching one SVG chart and a source list.
type Range = "7" | "30" | "90";
const DATA: Record<Range, { total: string; delta: string; pts: number[]; src: [string, number][] }> = {
  "7": { total: "$3,120", delta: "+6% vs previous", pts: [30, 34, 31, 44, 40, 52, 49], src: [["Social thread", 1240], ["Newsletter", 860], ["Search", 610], ["Docs", 410]] },
  "30": { total: "$12,840", delta: "+18% vs previous", pts: [22, 26, 24, 30, 28, 35, 33, 31, 38, 42, 40, 39, 46, 44, 50, 47, 52, 58, 55, 54, 61, 59, 64, 62, 70, 66, 72, 75, 71, 78], src: [["Social thread", 4180], ["Newsletter", 3260], ["Search", 2650], ["Docs", 1540]] },
  "90": { total: "$34,610", delta: "+41% vs previous", pts: [12, 14, 13, 18, 17, 20, 24, 22, 27, 30, 29, 34, 33, 38, 41, 40, 46, 44, 50, 55, 53, 58, 62, 61, 67, 70, 74, 72, 79, 84], src: [["Newsletter", 11920], ["Social thread", 10280], ["Search", 7690], ["Docs", 4720]] },
};
const RANGES: Range[] = ["7", "30", "90"];
const money = (n: number) => "$" + Math.round(n).toLocaleString("en-US");

function path(pts: number[]) {
  const n = pts.length, X = (i: number) => (i / (n - 1)) * 640, Y = (v: number) => 190 - (v / 90) * 170;
  let p = `M0 ${Y(pts[0])}`;
  for (let i = 1; i < n; i++) { const cx = (X(i - 1) + X(i)) / 2; p += ` C${cx} ${Y(pts[i - 1])} ${cx} ${Y(pts[i])} ${X(i)} ${Y(pts[i])}`; }
  return p;
}

export function RevenueBoard() {
  const [range, setRange] = useState<Range>("30");
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const d = DATA[range], line = path(d.pts), top = d.src[0][1];
  function onKey(e: KeyboardEvent, i: number) {
    const k = ({ ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: RANGES.length - 1 } as Record<string, number>)[e.key];
    if (k === undefined) return;
    e.preventDefault();
    const j = (k + RANGES.length) % RANGES.length;
    setRange(RANGES[j]);
    refs.current[j]?.focus();
  }
  return (
    <div className="board" aria-label="Sumlight revenue dashboard">
      <div className="board-in">
        <div>
          <div className="board-top">
            <div><h2>Revenue by first touch</h2><p>makerlog.app</p></div>
            <div className="seg" role="tablist" aria-label="Date range">
              {RANGES.map((r, i) => (
                <button key={r} ref={(el) => { refs.current[i] = el; }} role="tab" id={`r${r}`} aria-selected={range === r} aria-controls="range-panel"
                  tabIndex={range === r ? 0 : -1} onClick={() => setRange(r)} onKeyDown={(e) => onKey(e, i)}>{r} days</button>
              ))}
            </div>
          </div>
          <div id="range-panel" role="tabpanel" aria-labelledby={`r${range}`}>
            <div className="big"><strong className="num">{d.total}</strong><span className="num">{d.delta}</span></div>
            <svg className="chart" viewBox="0 0 640 200" preserveAspectRatio="none" role="img" aria-label="Daily revenue">
              <g className="grid"><line x1="0" x2="640" y1="40" y2="40" /><line x1="0" x2="640" y1="100" y2="100" /><line x1="0" x2="640" y1="160" y2="160" /></g>
              <path className="area" d={line + " L640 200 L0 200 Z"} />
              <path className="line" d={line} />
            </svg>
          </div>
        </div>
        <div className="sources">
          <h3>Top sources</h3>
          <ul>
            {d.src.map(([name, v]) => (
              <li key={name}>
                <span aria-hidden="true" />
                <span>{name}</span>
                <b className="num" style={{ fontWeight: 500 }}>{money(v)}</b>
                <span className="bar" aria-hidden="true"><i style={{ width: `${Math.round((v / top) * 100)}%` }} /></span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
