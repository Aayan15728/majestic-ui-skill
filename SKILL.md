---
name: majestic-ui
description: Use for any website, landing page, app screen, dashboard or UI component you build, redesign, polish, unslop, review or audit, for turning a design image or screenshot into code, and for consolidating an existing codebase's design. Copies one of 38 reference pages, defaults to the Geist family, a gallery palette and a flat look when the user states no preferences, and holds every page to a premium floor and a 12-point gate checked in a real browser.
---

# Majestic UI

**The bar:** every page holds up next to the best indie and startup sites. "Clean" isn't enough; a clean page can still look like the default.

| § | Section | | § | Section |
|---|---|---|---|---|
| 1 | [How to work](#1-how-to-work) | | 9 | [Layout and density](#9-layout-and-density) |
| 2 | [Undecided defaults](#2-undecided-defaults) | | 10 | [Badge, CTA, proof](#10-badge-cta-proof) |
| 3 | [Choosing a look](#3-choosing-a-look) | | 11 | [Product preview](#11-product-preview) |
| 4 | [Copy](#4-copy) | | 12 | [Signature, motion, mobile](#12-signature-motion-mobile) |
| 5 | [Color](#5-color) | | 13 | [Craft floor](#13-craft-floor) |
| 6 | [Depth](#6-depth) | | 14 | [Refuse list](#14-refuse-list) |
| 7 | [Atmosphere](#7-atmosphere) | | 15 | [Quality gate](#15-quality-gate) |
| 8 | [Typography](#8-typography) | | | |

| Open | When |
|---|---|
| `SUMMARY.md` | context is short or time is tight: every shared rule on one page |
| `references/modes.md` | always: work modes, project context files, audits (P0–P3, usability score) |
| `references/direction.md` | a new look: visitor modes, finding the world, color strategy, overused faces, generated looks, refine moves |
| `references/design-to-code.md` | the user gives an image, screenshot or mockup to build |
| `references/default-theme.md` | nothing decided: Geist scale, Gallery tokens, converting an example, light/dark tokens |
| `references/sections.md` | anything below the hero: pricing, comparison, calculator, FAQ, footer… |
| `references/interactions.md` | anything that toggles, expands, switches or calculates |
| `references/shadcn.md` | React with Tailwind: prebuilt components, re-themed |
| `references/nextjs.md` | Next.js or React: where each part goes, fonts, server/client, CI |
| `references/app-ui.md` · `components.md` | product screens (dashboard, docs, tool) and states · reusable components |
| `references/aiunslopper.md` | an existing screen looks machine-made |
| `references/interface-rules.md` | while building, and as the audit checklist |
| `examples/README.md` | the 38 reference pages with briefs |

| Script (Node 22+, no install) | Does |
|---|---|
| `scripts/verify-render.mjs` | real-browser check: contrast over painted art, fonts drawn, overflow, focus, widget keys; `--dark`; `--app` for product screens; writes `compare.png` with a look code |
| `scripts/extract-spec.mjs` | reads a design image into numbers: bands, boxes, radii, text sizes, colors; zoomable tiles |
| `scripts/compare-image.mjs` | scores a build against a design image and names the regions that differ and why |
| `scripts/inventory.mjs` | measures design sprawl in a codebase and proposes the tokens to consolidate to |
| `scripts/slop-lint.mjs` | code lint; `--defaults` when nothing was decided |
| `scripts/vendor-fonts.mjs` | puts a page's fonts next to it, or inlines them |
| `scripts/score-pages.mjs` | ranks many pages or two skill versions |

If a file is missing, carry on with this one. Generated pages fail four ways, and every rule below stops one: **flat** (nothing behind the headline), **clumsy headline**, **weak proof**, **forgettable or crowded**.

---

## 1. How to work

0. **Read the project and name the target.** Pick the work mode and the visitor mode (`modes.md`, `direction.md`). Read the code, tokens, assets, `PRODUCT.md` and `DESIGN.md`; write those two files when missing and the work is more than a one-off. Work on one page, section, component or state at a time. **The user's request and the project's system outrank this skill**; additions inherit the existing look.
   - **An image to build?** Follow `design-to-code.md`: extract the spec, build in passes, compare until it matches.
   - **An existing codebase to improve?** Run `inventory.mjs` first and consolidate tokens before restyling.
   - **Looks machine-made?** Follow `aiunslopper.md`.
   - **A product screen** (dashboard, docs, tool)? Follow `app-ui.md`, start from `field-analytics`, `dither-docs` or `dither-workspace`, and check with `--app`.
   - **React with Tailwind?** Use shadcn's prebuilt components for controls (`shadcn.md`).
1. **Check what's decided:** fonts, colors and style, separately. Undecided falls back to section 2.
2. **Look first:** open the chosen example's `web.jpg` and `mobile.jpg`. That's what done means.
3. **Copy, don't invent:** read its `principles.md`, `design.md`, `style.md`; copy `index.html`; replace brand, copy, data, tokens and fonts; keep structure, spacing and details. Build from scratch only when nothing fits.
4. **Write the angle** (section 4) and, for a new look, the direction contract (`direction.md` §10) before CSS. With an identity-less product and the user present, offer two or three directions with one trade-off each; otherwise pick one and say why.
5. **Build** (sections 4–14; below the hero `sections.md`; widgets `interactions.md`), then **pass the gate** (section 15).
6. **Deliver with fonts:** `vendor-fonts.mjs <page>` (or `next/font` in Next.js). Update `DESIGN.md` when the system changed.

## 2. Undecided defaults

Recommendations for the ~99% of cases where the user stated no preference. A choice the user made or the project already has (brand guide, `DESIGN.md`, tokens, a fixed logo) always wins, including over the avoid list. A design image is a choice. Details: `default-theme.md`.

- **Fonts: the Geist family.** Geist for UI and most headlines (600, or 300 for an airy oversized one, −0.035 to −0.045em); Geist Serif for editorial display (its single 400, −0.02 to −0.03em); Geist Mono for code and data. Body 17/1.47. No italics exist: emphasis is two-tone (second phrase `#6e6e73`), 300 against 600, or serif over sans. Swap an example's Newsreader or Instrument Serif to Geist Serif. **Not Inter:** it's the face generated UI lands on by default, so an undecided page never uses it; take Inter only when the user or the project already chose it.
- **Colors: the Gallery palette.** Canvas `#ffffff`, parchment `#f5f5f7`, pearl `#fafafc`, ink `#1d1d1f`, muted `#6e6e73`, hairline `#e0e0e0`, dark tiles `#272729` / `#2a2a2c` / `#252527`, black; one action blue `#0066cc` (focus `#0071e3`, links on dark `#2997ff`) only for links, the primary pill and focus. Pills `11px 22px`, press `scale(.95)`; radii 8 / 11 / 18 / pill.
- **Avoid unless asked:** Inter; drop shadows; Bricolage Grotesque; purple or violet; blue gradients (solid blue is fine); gradient backgrounds of any hue; more than six things in the first screen or four competing anywhere.
- **Start from** `gallery-tiles` (sans) or `serif-globe` (serif, dark); convert other looks with the example's `principles.md`. Lint with `--defaults`.

## 3. Choosing a look

Each `examples/<name>/` holds `index.html`, `web.jpg` (1440×900), `mobile.jpg` (390×844), `design.md`, `style.md`, `principles.md`. Pick by what the product is, and say why in one line. Examples marked as departing from the defaults are used as-is only when the user chose that look.

| Folder | Look | For |
|---|---|---|
| `gallery-tiles` | **default**: white / near-black / parchment tiles, blue pills, product render | hardware, consumer, undecided |
| `serif-globe` | **default family, dark**: Geist Serif, glyph globe, real checkout | payments, commerce, dev platforms |
| `sections-kit` | **the lower page, light and dark**: board, split, band, bento, pricing, table, calculator, add-ons, FAQ, footer | every section under any hero |
| `warm-wash` | peach wash, brackets, URL capture, browser dashboard | light SaaS, analytics |
| `cinematic-black` | black, serif two-tone, lit desktop scene | premium desktop apps |
| `serif-stats` | serif with italic word, sourced stat cards, live board | directories, media |
| `playful-warm` | cream dune, icon tiles in headline, glossy button | creator tools |
| `dark-split` | dark split, highlight, laurel, drawn blob of contents | kits, courses |
| `ascii-workspace` | glyph art, integration tiles, diff and terminal | developer tools |
| `serif-phone` | serif + italic, phone with a real conversation | consumer, assistants |
| `pixel-panel` | orange panel, pixel blinds, window breaking out | Mac productivity |
| `bold-yellow` | announcement bar, heavy headline, yellow pill + price | services, offers |
| `voice-ribbon` | messy input → clean output ribbon | writing, voice |
| `dark-highlight-pill` | pill nav, highlight pill + app icon, editor | Mac creative apps |
| `pastel-dreamscape` | illustrated landscape, airy Geist 300 | studios, portfolios |
| `glyph-heritage` | dark brown, amber italic, glyph landmarks | culture, courses |
| `gradient-frame` | gradient frame, phone with data chips | fintech, mobile |
| `mountain-dawn` | drawn dawn ridges, condensed serif, rect buttons | outdoor, travel |
| `serif-cursors` | phone on arcs, multiplayer cursor tags | collaboration |
| `warm-grey-glow` | tight heavy grotesk, price-in-CTA, serif-number dashboard | finance, B2B |
| `electric-swirl` | electric-blue stipple, floating nav | dev tools, observability |
| `shape-flanks` | geometric confetti from both edges | crafted B2B, agencies |
| `stream-lines` | glyph lanes into one card | AI infrastructure, APIs |
| `pixel-photo` | scene dissolving into pixels, mono link box | lifestyle APIs |
| `riso-hills` | risograph grain, halftone, hatching | creative, media |
| `fluted-glow` | fluted glass glow, lime bar | security, infra |
| `peak-agency` | snowfield, dotted rails, highlight block | agencies |
| `dusk-range` | alpenglow range, editor rising | prosumer desktop |
| `rock-dashboard` | rails, dot matrices, boulders and fog over a dashboard | B2B with real UI |
| `pixel-forge` | blue pixel field, Geist Pixel, dithered grove | creative AI, games |
| `paper-canvas` | paper grain, lifted ruler corner, design-tool window | design and writing tools |
| `clear-sky` | painted sky, low sun, lit peaks, serif headline, desktop preview | assistants, consumer apps |
| `inset-panel` | cream page, hero inside a dark rounded panel, cards hanging from the CTA on connectors, tabs, highlighted testimonials | B2B SaaS, CRMs, sales tools |
| `crimson-mesa` | painted night scene: mesas, crimson plain, lone figure; centered logo; run log | dev platforms, automation |
| `paper-stack` | papers leaning in from the corners, pixel-word headline, search + filter finder, coupon dialog | courses, libraries, content |
| `field-analytics` | **product screen**: sidebar, KPIs, line chart with tooltip, flow bands, heatmap, rings, folder tiles | dashboards, admin, analytics |
| `dither-docs` | **product screen**: pill nav, section tree, article with a live dither demo, light and dark | docs, references |
| `dither-workspace` | **product screen**: sessions rail, prompt composer and glass cards over dithered art | agent and tool home screens |

## 4. Copy

- **Headline** 5–12 words in the product's own nouns; passes the swap test (a competitor couldn't paste it). Shapes: outcome + audience · imperative pair · the object itself · promise + qualifier · a category claim of three words or fewer.
- **Lead** starts concrete (a number, an action, a mechanism) with one or two facts bolded. **Fine print** under the CTA: price, trial, platforms or guarantee.
- **Avoid** autopilot phrases (without the noise · all in one place · supercharge · seamless · unlock · effortless · revolutionize · built for modern teams · Welcome back), exclamation marks, periods on buttons, and invented claims. Demo data may be invented; list every placeholder number in the report.

## 5. Color

- Decide a strategy first: Restrained, Committed (one color owns 30–60%), Drenched, or Full palette. Undecided means Restrained Gallery. Light or dark comes from one sentence of physical scene, never the category.
- Canvas has a temperature (`#fffdfb`, `#fbf6ea`, `#f6f5f1`; dark `#000`, `#141414`, `#191919`), except Gallery's white tiles. Ink is near-black; on dark, headings `rgb(237 237 237)` and body `rgb(163–170 …)`.
- Muted text is ink mixed into the canvas (`color-mix(in oklab, var(--ink) 62–68%, var(--canvas))`), tinted from the hue on colored surfaces; never stock greys like `#888`.
- **One accent** on the primary CTA, one data highlight and the signature: coral `#f0623a`, ember `#c2410c`, yellow `#fcc419`, forest `#1e6b45` or solid blue `#1d4ed8` work well. No purple, blue or purple-to-pink gradients, neon borders or rainbow charts.
- Every color a token on `:root`; 4.5:1 for body text and text on the accent, measured on what's painted behind it.

## 6. Depth

- Flat by default: no drop shadows, no `text-shadow`. Structure from 1px hairlines (`color-mix(in oklab, var(--ink) 9–14%, transparent)`, or `rgb(255 255 255 / .1)` on dark), surface steps and tile contrast; a glass edge `inset 0 1px 0 rgb(255 255 255 / .07)` on dark.
- When shadows are wanted: exactly one, on the preview, offset and soft, tinted to the canvas (`0 30px 80px -28px rgb(80 40 20 / .28)`). Never a colored halo; hard offset blocks only in a truly neobrutalist look.

## 7. Atmosphere

Never nothing behind the headline. One atmosphere, visible at 1440×900, calm right behind the text.

- **Flat (fine undecided):**
  - gallery tiles (`gallery-tiles`)
  - glyph art (`ascii-workspace`, `glyph-heritage`, `serif-globe`)
  - a colored panel (`pixel-panel`)
  - a text ribbon (`voice-ribbon`)
  - a dark split (`dark-split`)
  - hairline arcs (`serif-cursors`)
  - shape flanks (`shape-flanks`)
  - glyph lanes (`stream-lines`)
  - print texture (`riso-hills`, `paper-canvas`)
  - a pixel field (`pixel-forge`)
  - terrain in front (`rock-dashboard`)
  - an illustrated scene on a solid ground (`crimson-mesa`)
  - an inset panel: the hero inside one dark rounded field (`inset-panel`)
  - objects leaning in from the corners (`paper-stack`)
  - dithered art behind panels (`dither-workspace`)
  - a lit scene (`cinematic-black`)
  - editorial plain, only with a strong headline move plus stat cards or a live board (`serif-stats`, `serif-phone`, `bold-yellow`)
- **Gradient and color fields (only when chosen):** `warm-wash`, `playful-warm`, `dark-highlight-pill`, `mountain-dawn`, `gradient-frame`, `warm-grey-glow`, `electric-swirl`, `pixel-photo`, `fluted-glow`, `peak-agency`, `dusk-range`, `clear-sky`.
- `overflow-x: clip` on `main` when a layer is wider than the viewport.

## 8. Typography

- **Hero headline:** 56–88px desktop (max 6rem), 40–48px at 390, line height 0.98–1.1, 2 lines (3 max); `max-width` in `ch`.
- **Weight by face:**
  - book and condensed serifs and display grotesks: 400–500 (Geist Serif only 400);
  - neutral grotesks: 500 calm, 600 Gallery, 700 conversion;
  - chunky grotesks: 700–800.
- **Tracking:** −0.02 to −0.05em for display; 0 under 16px.
- **One emphasis move:** two-tone, an italic serif word, a highlight block, a drawn underline, an inline icon, or a grey kicker. No gradient text.
- **Text details:** `text-wrap: balance` on headings, `pretty` on paragraphs, `tabular-nums` on figures; measure 45–75ch; lead 16–19px (21–28 in Gallery), muted.
- **Font budget:** 1–3 families per project (hard max 5, and 4–5 need a stated reason); about 4 weights; 6–8 sizes.
- **Consistency:** one face per role everywhere; each heading level and component has one type spec as a token, reused on every page; reuse the project's faces before adding any.
- **Fonts are real, self-hosted webfonts.** Overused faces (`direction.md` §6) need a reason. No system font as the brand face, no mono as a costume.

## 9. Layout and density

- 4px grid; `flex`/`grid` with `gap`; tight inside groups, generous between.
- Hero rhythm: nav 52–88 · top padding 72–148 · badge→h1 20–32 · h1→lead 20–28 · lead→CTA 28–40 · CTA→fine print 16–24 · hero→preview 56–96.
- **Viewport budget:** first screen at most six things (nav, one badge, headline, lead, one CTA group, one visual); about four competing anywhere; one job and focal point per section.
- Hero centered at ≤ 1200px unless split. One nav style. Below the hero: one section-heading spec, one container idea, 96–128px between sections, every card holding a real artifact (`sections.md`).

## 10. Badge, CTA, proof

- **Badge:** at most one, only with real news or data (version + news, live counter, laurel, 6–9 integration tiles, dated chip). No category eyebrow, ✨, 🚀, "Introducing".
- **CTA:** one primary, at most one quiet secondary.
  - Capture: input + inset button, 52px tall, 440–480 wide, radius 12.
  - Pills: 44–52px, plus a grey, outline or glass secondary. Gallery pills: `#0066cc` + outline, `11px 22px`.
  - Big block: 260–280 × 56 with real scarcity only.
  - Price inside: a dark CTA with the price in a capsule.
  - Pill + "From $9 ›" link + guarantee.
- **Proof:** one or two, real or flagged: avatar stack + count, sourced stat cards, stat row between hairlines, press quote, logo strip, download count.

## 11. Product preview

56–96px below the hero, 1040–1200 wide (phone 280–340), radius 16–24, crossing the fold, framed by a hairline and surface step. One frame (browser, OS scene, app window, phone, split editor, live board, render). Inside: plausible names and numbers that prove the headline, 13–15px text, one accent highlight. No lorem, grey bars, fake sparklines, 11px dashboards, greetings, or floating "Trending ↗" toasts.

## 12. Signature, motion, mobile

- **Signature:** one detail repeated 2–3 times (brackets, rails, glyph art, pixel blinds, cursor tags, rings, confetti, halftone, handles, a lime accent on dark…).
- **Motion:** one curve `cubic-bezier(.22, 1, .36, 1)`; hero children rise 14px over 640ms, staggered 70ms; preview last at ~380ms; content visible by default. Hover is a 150ms color step; press `scale(.97)` (`.95` on pills). No `transition: all`, loops, floats, bounce or parallax (a live dot that is the signature gets `/* slop-ok: reason */`). `prefers-reduced-motion` turns it off.
- **At 390:**
  - no sideways scroll and no overlap;
  - headline 40–48px and full-width CTAs;
  - rows stacked, chips `nowrap`, long names truncated;
  - colliding decoration hidden, previews simplified;
  - nothing under 12px.
  
  Restructure, don't shrink.

## 13. Craft floor

The full list is `interface-rules.md`.
- **Semantics:**
  - `<button>` for actions, `<a href>` for destinations;
  - a skip link to `<main id="main">`;
  - headings in order;
  - a visible `:focus-visible` everywhere;
  - `aria-label` on icon-only buttons and `aria-hidden` on decoration.
- **Touch and forms:**
  - targets 24px desktop, 44px touch; never disable zoom;
  - real labels, the right `type`, `inputmode` and `autocomplete`;
  - placeholders end in `…`; paste is never blocked;
  - errors sit at the field and say how to fix it.
- **Text, media and theming:**
  - `…`, curly quotes, `10&nbsp;MB`, `tabular-nums`;
  - images with `width`, `height` and `alt` (hero `fetchpriority="high"`, the rest lazy);
  - `theme-color`, plus `color-scheme: dark` on dark pages;
  - `::selection`, `caret-color` and `accent-color` from the palette.
- **Content and states:**
  - containers survive long values;
  - designed empty, loading and error states;
  - status never conveyed by color alone;
  - labels say what happens.

## 14. Refuse list

Legitimate only when the brief asks; reaching for one freely means rewrite it:
- rows of same-size icon + heading + line cards, or cards nested in cards;
- the hero-metric template;
- a category eyebrow above the headline;
- 01 / 02 / 03 without meaning;
- gradient text, decorative glass;
- side stripes thicker than 1px;
- hard offset shadows;
- emoji as icons;
- a rounded icon tile above every heading;
- grey text on a colored surface;
- skipped heading levels or cramped padding;
- an unneeded modal;
- landing in a generated look (`direction.md` §7) when the brief left the look open.

## 15. Quality gate

**Premium floor.** All eight, or the page isn't done:
1. Authored art in the first screen.
2. One material idea carried through.
3. A confident 64–104px headline in two lines.
4. Restraint: one accent, the viewport budget.
5. Specific proof.
6. Exact details: hairlines, one radius scale, one icon stroke, tabular figures, styled focus.
7. Quiet motion.
8. Equal care on mobile.

The fastest fix is restarting from the closest example.

**Step 1: measure.** `node <skill>/scripts/verify-render.mjs <page or url> --ref <skill>/examples/<closest> --out ./majestic-check` (add `--dark` for dark mode and `--app` for a product screen; `--cdp` reuses a running Chrome). It must report **0 errors**; fix warnings or say why they stay. Exit code 3 means no browser: say the visual points are unchecked. For a design image, also run `compare-image.mjs` until it scores 90+ (`design-to-code.md`).

**Step 2: look.** Open `compare.png` and quote its 4-character look code in the report; the code exists only in the image. Open `desktop.png` and `mobile.png`, and crop details.

**Step 3: judge, yes or no.** Any "no" means fix and re-run, up to three rounds; name anything still failing.
1. **Atmosphere** visible (or a justified editorial plain).
2. **Headline:** 2–3 lines, the right weight, one emphasis move, passes the swap test.
3. **Specific copy** with fine print and no invented claims.
4. **Preferences and defaults:** the user's applied exactly; otherwise Geist, Gallery, nothing avoided, one accent, 1–3 families, one spec per role.
5. **Preview** proves the headline.
6. **Signature** seen twice.
7. **Depth:** flat, or one soft shadow if wanted.
8. **Rhythm:** spacing, budget, squint order.
9. **Mobile:** no overflow, full-width CTAs, 40–48px headline.
10. **Craft floor:** keyboard, names, theme color.
11. **States** designed and reachable.
12. **Premium and side by side:** the eight floor items, same league as the example, one memorable thing; name the weakest and fix it.

Then `node <skill>/scripts/slop-lint.mjs <files>` (`--defaults` when undecided): 0 errors. In a real project, wire both checks into a `check:ui` script and CI (`nextjs.md`).

**Honesty.** The lint reads code and the render check measures pixels; neither judges taste. Never report an unchecked point as passed. Stop once the request is met.

**Report** in 4–6 lines:
- the mode and the look, and why;
- the render result and the look code;
- which preferences were the user's and which were defaults;
- the signature;
- what changed between renders, and what was verified;
- the lint score and the placeholders to confirm.

**Redesign or polish:** gate the current page first and fix only failed points. **Audit:** change nothing unless asked; rank findings P0–P3 as `file:line: problem → smallest fix`, with the usability score (`modes.md`).
