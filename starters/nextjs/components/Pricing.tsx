"use client";
import { useState } from "react";
import { Icon, CHECK } from "./icons";

// role="switch" on a native <button>: Space and Enter work without key handlers. Prices render on the server as monthly.
type Tier = { name: string; tag?: string; blurb: string; m: string; y: string; strike?: string; billedM: string; billedY: string; cta: string; featured?: boolean; checks: string[] };
const TIERS: Tier[] = [
  { name: "Hobby", blurb: "One site, the essentials.", m: "$0", y: "$0", billedM: "Free while you're under 1,000 visits.", billedY: "Free while you're under 1,000 visits.", cta: "Start on Hobby", checks: ["1 website, 1,000 visits a month", "Revenue by first touch"] },
  { name: "Pro", tag: "Most chosen", blurb: "Everything a solo founder needs.", m: "$14", y: "$11.67", strike: "$14", billedM: "Billed monthly. Switch to yearly anytime.", billedY: "Billed $140 once a year.", cta: "Start 14-day trial", featured: true, checks: ["5 websites, 100k visits a month", "Full journeys and funnels", "Revenue alerts and API"] },
  { name: "Team", blurb: "For teams that split the work.", m: "$39", y: "$32.50", strike: "$39", billedM: "Billed monthly, 5 seats included.", billedY: "Billed $390 once a year, 5 seats.", cta: "Start 14-day trial", checks: ["Unlimited websites, 1M visits", "Shared views and roles"] },
];

export function Pricing() {
  const [yearly, setYearly] = useState(false);
  return (
    <section className="wrap sec" id="pricing" aria-labelledby="price-title">
      <div className="price-head">
        <h2 className="sec-head" id="price-title">Start free. <span>Pay when it pays.</span></h2>
        <div className="billing">
          <label htmlFor="bill" id="bill-label">Bill yearly</label>
          <button className="switch" type="button" role="switch" id="bill" aria-checked={yearly} aria-labelledby="bill-label" onClick={() => setYearly(!yearly)} />
          <span className="save">2 months free</span>
        </div>
      </div>
      <div className="tiers">
        {TIERS.map((t) => (
          <div key={t.name} className={t.featured ? "tier featured" : "tier"}>
            <div className="tier-top"><h3>{t.name}{t.tag && <span className="save">{t.tag}</span>}</h3><p>{t.blurb}</p></div>
            <div className="tier-in">
              <div className="amount">
                <strong className="num">{yearly ? t.y : t.m}</strong>
                {yearly && t.strike && <s className="num">{t.strike}</s>}
                <span>/month</span>
              </div>
              <p className="billed num">{yearly ? t.billedY : t.billedM}</p>
              <a className={t.featured ? "btn primary block" : "btn ghost block"} href="#start">{t.cta}</a>
              <ul className="checks">{t.checks.map((c) => <li key={c}><Icon d={CHECK} />{c}</li>)}</ul>
            </div>
          </div>
        ))}
      </div>
      <p className="foot-note">Prices in USD. Cancel from your settings in two clicks. <a className="link" href="#start">Prefer to start free?</a></p>
    </section>
  );
}
