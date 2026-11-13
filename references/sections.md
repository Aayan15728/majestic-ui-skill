# Sections below the hero

The examples are strict about the first screen. Real pages go on for another five to ten sections, and that is where generated pages fall apart: the hero has a world, and everything under it turns into rows of icon cards. This file is the recipe for the lower page. The working reference for every pattern here is `examples/sections-kit/` (`full.jpg` is the whole page, `dark.jpg` the same page in dark mode). The keyboard and script side of each pattern is in `interactions.md`.

## Contents
1. The rules every lower section keeps
2. Order: which sections, in what sequence
3. Patterns
   - Feature split · Logo row and dark band · Bento · Capability tabs · Testimonials · Finder · Pricing · Comparison table · Calculator · Add-ons · FAQ · Closing · Footer
4. Carrying a look's material into its lower sections
5. Checklist

---

## 1. The rules every lower section keeps

- **One section heading spec for the whole page.** Same face, size, weight, tracking and emphasis move in every section (the kit: Geist Serif 48px, two-tone, 36px on phones). Changing heading style per section is the fastest way to look assembled from parts.
- **One job per section and one focal point.** If a section needs two headings, it is two sections.
- **One container idea, repeated.** The kit uses card-in-card (a tinted shell with an 8px inset around a hairline card) for the board, journey, tiers, table and FAQ. A print look uses paper panels with a printed rule; a dark look uses raised panels with a glass edge. Pick one and reuse it.
- **Rhythm:** 96–128px between sections on desktop, 72–96px on phones; heading → content 48–56px. More space above a heading than below it.
- **Content proves, decoration doesn't.** Every card holds a real artifact: a snippet, a number, a list, a tiny interface. A card that is only an icon, a title and a line of text is the refuse-list pattern.
- **Same buttons everywhere.** The hero's pill spec is used by every tier, add-on and closing CTA. One primary per section.
- **Placeholders flagged.** Prices, customers, quotes and logo names are invented in the examples; list the ones you keep as placeholders in your report.

## 2. Order

For a product landing page, pick the sections the product needs, in roughly this order:

| # | Section | Job | Skip when |
|---|---|---|---|
| 1 | Hero + preview | promise and proof | never |
| 2 | Feature split (1–3 rows) | how the core thing works, with one quote | the preview already shows it all |
| 3 | Logo row → dark band | trust, then a pause that resets attention | no real customers yet (use a count or a quote instead) |
| 4 | Bento | the breadth: five to seven capabilities, each with an artifact | one-feature product |
| 5 | Pricing | the decision | enterprise-only sales |
| 6 | Comparison | answers "which plan" or "why not the usual tool" | only one plan |
| 7 | Calculator | turns a vague benefit into the visitor's own number | the benefit isn't numeric |
| 8 | Add-ons | upsells that don't belong in tiers | none exist |
| 9 | FAQ | objections, five to eight of them | — |
| 10 | Closing | one line, one button | — |
| 11 | Footer | navigation, legal, a last piece of the world | — |

Never more than about nine sections; the viewport budget applies to each screen as you scroll.

## 3. Patterns

### Feature split
- Two columns, 360px copy and the rest for the visual, 72px gap, vertically centered. Alternate sides for further rows.
- Copy: a small tinted tag naming the feature (13px, the only colored chip in the section), a 28px sans subhead in 2 lines, a two-to-three-line paragraph, then a quote separated by a dashed hairline: avatar, name, role, quote in ink.
- Visual: a shell holding a real interface piece that shows the mechanism (the kit shows one customer's three visits ending in a payment, with times in mono).
- Phones: stack copy above visual; the visual keeps its content and loses only padding.

### Logo row and dark band
- Logo row: one line of muted text that says something specific ("Counting revenue for 3,400 small teams, including"), then six to eight wordmarks in the muted ink, never colored, 20px tall, wrapping on phones. Use real customers or nothing.
- The band: full-bleed, the page's darkest surface, with the light canvas rounding into it (a 32px strip with `border-radius: 0 0 32px 32px` above and its mirror below). Inside: one two-tone sentence and four to six verbs, each an icon (28px, 1.4 stroke) over a label, each linking to the section that explains it.

### Bento
- A 6-column grid, cells spanning 4 + 2, then 2 + 2 + 2. Shell-colored cells, radius 24, padding 28, min-height 280.
- Each cell: a 17px title, one muted line, and an artifact pinned to the bottom (`margin-top: auto`): code, a stack of alerts fading by opacity, funnel bars, provider tiles, a file list.
- Give cells `min-width: 0` and the grid `minmax(0, 1fr)` on phones, or a single unwrapped code line will widen the page.

### Capability tabs
For three to five capabilities that share one layout (`inset-panel`).
- One pill track in the page's darkest surface, the active tab in the accent; one panel below whose heading, paragraph, short feature list and visual all swap together.
- The visual changes with the tab (different bars, a different highlighted day), or the tabs are decoration. The feature list is four items at most: a 18px line icon, a 2–3 word name and one line.
- `role="tablist"` with roving `tabindex` and arrow keys (`interactions.md` §5). On phones the track becomes a 2 × 2 grid; never let a tab scroll out of sight.

### Testimonials
Three quotes, no cards (`inset-panel`).
- Each is centered text: a rating if it's real, the quote at body size, then an avatar with a name and a role or site.
- **Highlight the claim:** wrap the one measurable phrase in `<mark>` with a soft tint of the accent (`box-decoration-break: clone` so it wraps cleanly). One highlight per quote; the eye should be able to read only the three highlights and get the pitch.
- Quotes carry a number or a concrete change ("reply rate went from 4% to 11%"). "Amazing product" proves nothing.
- Real people with permission, or mark them as placeholders in the report. Stars are drawn SVG in the accent with a text alternative ("5 out of 5"), never emoji.

### Finder (search, filters, cards)
For a catalogue the visitor can try before signing up: labs, templates, integrations, docs (`paper-stack`).
- One card holds a labelled search field (52px), filter chips with their counts, and a live count of matches. The label and the count use the page's meta voice.
- Results are one list filtered in place by text and by chip. Counts on chips are true. An empty result shows what was searched and a Clear button (`interactions.md` §10).
- Cards: a meta line (number, duration, kind), a title, one line of what you'll do, and a whole-card link with a visible arrow. A thin band of the page's material across the top of each card (glyphs, dots, a pattern seeded per card) replaces the icon tile.

### Pricing
- Heading left, billing switch right (`role="switch"`, a visible label, a "2 months free" tag that states the real saving).
- Two or three tiers. The featured tier is the only dark one, placed second on desktop and first on phones. Card-in-card: the outer shell holds the name, a tag and a one-line description; the inner card holds the price, the billing line, the CTA and three checks at most.
- Price in the display face at 48px; the yearly view shows the monthly equivalent with the monthly price struck through and the real billed amount on the line below. Never show only a struck price.
- Below the tiers: an "included in every paid plan" grid (three columns, hairline cells, a 16px icon and two to three words each), then a one-line footnote with currency, cancellation terms and a link to the free option.

### Comparison table
- A real `<table>` with `<caption>`, `scope="col"` and `scope="row"`. Wrap it: shell → a scroll container with `overflow-x: auto`, `tabindex="0"`, `role="region"` and a label, so keyboard users can scroll it.
- First column sticky (`position: sticky; left: 0` with the card background). One highlighted column: blue header text and a 4% tint down the column.
- Checks are a 20px circled tick in the success color, crosses a 16px muted ×, each with visually hidden text ("Included" / "Not included"). Text values beat icons wherever there's a number.
- Give the scroll container `position: relative`. Visually hidden text inside table cells is `position: absolute`; without a positioned ancestor inside the scroller it escapes and widens the whole page on phones (the render check reports it as overflow).
- Phones: keep the table, show a one-line hint ("Swipe the table sideways to see Pro and Team.").
- Comparing against other tools instead of plans: same table, with your column highlighted and the others named generically unless the user supplies real competitors and checked facts.

### Calculator
- Two cards side by side: inputs on a shell, the result on the dark surface.
- Inputs are native `<input type="range">` (or number fields) with a `<label>` and an `<output for>` showing the value in mono. Ranges are 44px tall for touch; the filled part of the track uses a CSS variable set from script.
- The result: a muted label, the number in the display face at 64px inside one `aria-live="polite"` element, a one-line before → after, two bars, and a footnote that says the assumptions plainly ("An estimate, not a promise: it assumes …").
- Every formula is visible in the code and the footnote. Never invent a benchmark to make the number bigger.

### Add-ons
- A 2 × 2 grid of shell cards: a 24px icon in the link color, a sentence in the display face with the add-on name as a colored lead-in ("**Weekly digest.** The five sources that paid…"), the price at the bottom with its unit, and a 44px round arrow link bottom-right.
- The arrow link carries the `aria-label` and stretches its hit area over the whole card with a `::before` overlay, so the card is clickable without a clickable `<div>`.

### FAQ
- `<details>` / `<summary>` inside a shell, max-width 720px, centered heading. Closed items are rows separated by hairlines; the open item becomes a white card. A 16px chevron rotates 180°.
- Five to eight questions phrased the way customers ask them. Answers are two to three sentences and may end with one link (44px tall target).
- The first item can start open. Don't animate height; the instant open is clearer and needs no script.

### Closing
- One two-tone line in the display face (56px, 2–3 lines), the fine print again, one primary button. Nothing else.

### Footer
- Top hairline, logo with a one-line description, three to four 44px icon links, then four link columns (14px, muted, 28px rows).
- A last piece of the page's world under it, drawn once to canvas: dotted hills for a flat look, a hatched horizon for print, a dithered strip for pixel, glyph rows for an ASCII look. Its color comes from a CSS variable so it follows the theme.
- A bottom bar with copyright and legal links.

## 4. Carrying a look's material into its lower sections

Each example's material should survive the scroll. Map the kit's parts onto the look you copied:

| Family | Examples | Section container | Featured tier / band | Dividers | Footer art |
|---|---|---|---|---|---|
| Flat light (Gallery) | `gallery-tiles`, `serif-stats`, `serif-phone`, `serif-cursors`, `bold-yellow`, `stream-lines`, `shape-flanks` | shell + hairline card | ink-dark card, dark tile band | 1px hairline | dotted hills, rings |
| Warm light | `warm-wash`, `playful-warm`, `voice-ribbon`, `warm-grey-glow`, `ascii-workspace`, `inset-panel`, `paper-stack` | cream shell, corner brackets on the featured card | ink card with the accent CTA | hairline tinted toward the canvas | glyph rows or brackets |
| Dark | `cinematic-black`, `serif-globe`, `fluted-glow`, `dark-highlight-pill`, `dark-split`, `glyph-heritage`, `dusk-range` | raised `#161618` panel with a glass edge | the featured tier is the *lightest* surface or carries the one accent | `rgb(255 255 255 / .09)` | globe or glyph dust, faint |
| Print / paper | `riso-hills`, `paper-canvas` | paper panels with grain, printed 1px rules | ink-filled tier, halftone band | hatched or dashed rules | hatched hills, ruler ticks |
| Pixel | `pixel-forge`, `pixel-panel`, `pixel-photo` | square-cornered panels on the pixel grid | solid accent tier with a stepped pixel edge | 1px rules on the grid | dithered strip |
| Scenic | `peak-agency`, `mountain-dawn`, `rock-dashboard`, `pastel-dreamscape`, `electric-swirl`, `crimson-mesa`, `clear-sky` | plain light or dark shells; let the scene return only at the footer | dark tier | hairline | the hero scene, cropped low |
| Frame | `gradient-frame`, `pixel-panel`, `inset-panel` | sections live inside the same frame inset | a tier that breaks the frame edge | hairline | frame closes |

Keep the type spec and the radius scale of the look you copied; only the containers and dividers change. When the user hasn't decided their style, the flat light row is the answer.

## 5. Checklist

- [ ] Every section heading uses the same spec; the emphasis move is the same as the hero's.
- [ ] No section is a row of icon + title + line cards.
- [ ] Pricing shows the real billed amount; struck prices only next to a real current price.
- [ ] The table is a `<table>` with caption and scopes, scrolls inside its own container, and the page doesn't widen at 390px.
- [ ] Calculator assumptions are written next to the result.
- [ ] Accordion, switch and tabs pass the keyboard checks in `verify-render.mjs`.
- [ ] Dark mode, if offered, passes `verify-render.mjs --dark`.
- [ ] The footer carries the page's world, drawn from a theme variable.
