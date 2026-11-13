# majestic-ui in one page

Read this when context is short or time is tight. It holds the rules every example shares. Anything the user said, or the project already has, outranks it.

## Fast path (6 steps)
1. **Context.** Read `PRODUCT.md` and `DESIGN.md` if the project has them; name the one page, section or component you're working on.
   - Image to build: `extract-spec.mjs design.png`, build in passes (block-out, type, spacing, color, details), `compare-image.mjs design.png page` until 90+ (`references/design-to-code.md`).
   - Existing codebase: `inventory.mjs` first, consolidate tokens, then restyle.
   - React with Tailwind: shadcn prebuilt components for controls, re-themed (`references/shadcn.md`).
   - Product screen (dashboard, docs, tool): copy `field-analytics`, `dither-docs` or `dither-workspace`; one highlight per chart; check with `verify-render.mjs --app` (`references/app-ui.md`).
2. **Decided?** Fonts, colors and style, each on its own: the user's words and the project's tokens win. Everything else uses the defaults below.
3. **Pick the closest example** from `examples/README.md` (default: `gallery-tiles`, dark: `serif-globe`). Open its `web.jpg` and `mobile.jpg`.
4. **Copy its `index.html`**, then swap brand, copy, data, tokens and fonts. Keep structure, spacing and details. Convert anything on the avoid list with that example's `principles.md`.
5. **Check:** `node scripts/slop-lint.mjs <page> --defaults` (0 errors), then `node scripts/verify-render.mjs <page> --ref examples/<closest> --out ./majestic-check` (0 errors; add `--dark` if the page has a dark mode and `--app` for a product screen; no npm install needed, exit code 3 means no browser, so say the visual points are unchecked). Then `node scripts/vendor-fonts.mjs <page>` so the fonts travel with the file.
6. **Look:** open `compare.png`, quote its look code, fix the weakest thing, report in 4 to 6 lines. If you can't render, say which points are unchecked.

## Defaults when nothing is decided (recommendations, not bans)
- **Fonts:** the Geist family only: Geist (UI, most headlines), Geist Serif (display, 400 only), Geist Mono (code, data). No italics: emphasis is two-tone, weight contrast or a serif headline over a sans lead.
- **Font budget:** 1 to 3 families for the whole project, 5 is the hard ceiling. About 4 weights per page, 6 to 8 sizes. One role, one face, everywhere.
- **Consistency:** every heading level and component has one type spec as a token, reused on every section and page. Same button, same radius, same icon stroke, same spacing steps throughout.
- **Colors:** Gallery palette: canvas `#fff`, parchment `#f5f5f7`, ink `#1d1d1f`, muted `#6e6e73`, hairline `#e0e0e0`, dark tiles `#272729`, one solid action blue `#0066cc`.
- **Avoid unless asked:** Inter (undecided text is Geist), drop shadows, Bricolage Grotesque, purple, blue gradients, gradient backgrounds, more than six things in the first screen.

## What every strong page shares
- **One idea carried through:** atmosphere, signature and buttons come from the same world. Authored art in the first screen (drawn, painted, rendered or a real product UI), never a stock blob.
- **Headline:** 5 to 12 words in the product's own nouns, 56 to 104px desktop (40 to 48 at 390), line height 1.0 to 1.1, tracking -0.02 to -0.045em, 2 lines, `text-wrap: balance`, exactly one emphasis move.
- **Copy:** a concrete lead (number, action or mechanism), fine print with a price or guarantee, no autopilot phrases ("seamless", "unlock", "supercharge"), no invented claims; list every placeholder number in the report.
- **Color:** a strategy first (Restrained, Committed, Drenched, Full palette). One accent hue for the primary action and one data highlight. Muted text is ink mixed into the canvas; contrast 4.5:1 for body, 3:1 for large text, measured on the painted background.
- **Depth:** flat. Hairlines, surface steps and tile contrast. A glass edge `inset 0 1px 0 rgb(255 255 255 / .07)` on dark. A single soft shadow only if the user wants one.
- **Layout:** 4px grid, `gap` not margin stacks. Hero rhythm: nav 52 to 88, top 72 to 148, badge to h1 20 to 32, h1 to lead 20 to 28, lead to CTA 28 to 40, hero to preview 56 to 96. First screen: nav, one badge, headline, lead, one CTA group, one visual. About four things compete anywhere.
- **Preview:** 1040 to 1200px wide (phone 280 to 340), radius 16 to 24, framed by a hairline and surface step, real names and numbers that prove the headline, 13 to 15px text.
- **Signature:** one detail repeated two or three times (brackets, rails, glyph art, halftone, handles, cursor tags).
- **Motion:** one curve `cubic-bezier(.22,1,.36,1)`, hero children rise 14px over 640ms staggered 70ms, hover 150ms color, press `scale(.97)`, no loops, `prefers-reduced-motion` honored, content visible by default.
- **Mobile at 390:** no sideways scroll, no overlaps, full-width CTAs, text 12px or more, targets 44px, art recomposed rather than shrunk.
- **Craft floor:** `<button>` vs `<a>`, skip link, visible `:focus-visible`, labels on fields, `aria-label` on icon buttons, `…` and curly quotes, `tabular-nums`, image `width`/`height`/`alt`, `theme-color`, `color-scheme` on dark, styled `::selection`, designed empty, error and loading states.

## In a Next.js app
Fonts from the `geist` package via `next/font` in the root layout; the example's `:root` tokens in `app/globals.css` (or Tailwind `@theme`); static sections as server components; tabs, switches, calculators, theme toggle and canvas as small `"use client"` islands; `themeColor` in the `viewport` export; check the production server (`next build && next start`). Guide: `references/nextjs.md`; working port: `starters/nextjs/`.

## Below the hero
One section-heading spec for the whole page, one container idea (the default: a `#f5f5f7` shell with an 8px inset around a white hairline card), 96 to 128px between sections, every card holding a real artifact. Order: feature split, logo row into a dark band, bento, pricing (billing `role=switch`, featured tier dark, real billed amounts), comparison `<table>` (sticky first column, scrolls inside its box), calculator (ranges, one `aria-live` result, assumptions written down), add-ons, FAQ (`<details>`), closing line, footer with a drawn piece of the world. Copy `examples/sections-kit/`; recipes in `references/sections.md`, widget code in `references/interactions.md`.

## Light and dark
Dark is its own token set, not an inversion: canvas `#0b0b0c`, shell `#161618`, card `#1c1c1e`, ink `rgb(237 237 237)`, muted `#a1a1a6`, hairline `rgb(255 255 255 / .09)`, pill `#0071e3`, link `#4ea4ff`. Nested surfaces get lighter. Wire it with `prefers-color-scheme` plus `[data-theme]`; full table in `references/default-theme.md`.

## Refuse list (rewrite on sight)
Rows of identical icon-heading-text cards · a rounded icon tile above every heading · grey text on a colored surface · the tasteful default (cream page, thin serif, italic accent, pill buttons) when nothing asked for it · the big-number-plus-three-stats hero · a decorative eyebrow above the headline · 01/02/03 labels without meaning · gradient text · decorative glass · colored side stripes on cards · hard offset shadows · emoji as icons · a modal where none is needed.

## Existing screen that looks AI-made
Follow `references/aiunslopper.md`: triage (full, polish or leave), write the five-line direction (Product, Character, World, Moments, Signature), run the ten passes in order (spacing, color, icons, copy, type, layout, details, visuals, motion, template check). Quiet chrome plus one or two rich moments.

## Which example for what
`sections-kit` every section below the hero, light and dark · `field-analytics` dashboards · `dither-docs` docs · `dither-workspace` agent and tool home screens · `inset-panel` B2B SaaS and sales tools · `crimson-mesa` dev platforms that want one image · `paper-stack` courses and content · `clear-sky` desktop assistants and consumer apps · `gallery-tiles` hardware, consumer, undecided · `serif-globe` premium dev and commerce, dark · `stream-lines` APIs and AI infrastructure · `shape-flanks` crafted B2B · `riso-hills` creative, media · `pixel-forge` creative AI, games · `rock-dashboard` B2B with a real UI · `paper-canvas` design and writing tools · `peak-agency` agencies · `dusk-range` prosumer Mac apps · `warm-wash` light SaaS · `cinematic-black` desktop utilities · `serif-stats` directories · `serif-phone` consumer apps · `voice-ribbon` writing and voice · `pixel-panel` productivity · `ascii-workspace` developer tools · `electric-swirl` observability · `fluted-glow` security · `bold-yellow` offers · `dark-split` courses and kits · `playful-warm` indie tools · `pastel-dreamscape` studios · `glyph-heritage` culture · `gradient-frame` fintech · `mountain-dawn` outdoor · `serif-cursors` collaboration · `warm-grey-glow` finance · `pixel-photo` travel and food APIs · `dark-highlight-pill` creative Mac apps.

## The gate in 12 words
Atmosphere, headline, copy, defaults, preview, signature, depth, rhythm, mobile, craft, states, premium. A "no" on any one means fix and re-run. Full text: `SKILL.md` section 15.
