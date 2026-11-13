# Default theme: Geist + Gallery

These are recommendations for the agent, not rules for the user. Anything the user states (a font, a color, a style, a reference site) replaces the matching part of this file.

Use this file when the user hasn't decided fonts or colors. A decision counts if the user named a font or a color, or if the project already has one: brand guidelines, a `DESIGN.md`, Tailwind or CSS tokens, or a logo with fixed colors. Whatever exists wins. Fonts and colors are separate checks, so a user who named only a font still gets the Gallery colors, and a user who gave only colors still gets Geist.

The reference page for both defaults together is `examples/gallery-tiles.html`.

---

## Fonts: the Geist family only

- **KEEP** the budget: **1 to 3 families for a whole project** (Geist, Geist Serif, Geist Mono is already three), never more than 5. One role, one face, everywhere: headlines, body and code each have exactly one face, and every heading level and component reuses one size/weight/tracking token.

- **KEEP** to one family with three cuts: **Geist** (sans) for UI and most headlines, **Geist Serif** for display headlines when the page wants an editorial or premium voice, and **Geist Mono** for code, keycaps, timestamps and small data labels. No other family and no system font standing in for the brand face.
- **KEEP** to this even when the example you copy uses Newsreader, Instrument Serif, Funnel Display or Bricolage: serif display faces become Geist Serif, sans display faces become Geist.
- **AVOID** Inter when nothing is decided, for body text as much as headlines. It is the face generated interfaces fall back to, so it reads as "no decision"; Geist fills every role Inter would. Keep Inter only when the user asks for it or the project already uses it (then reuse it, never add a second neutral grotesk beside it).
- **ADD** the files from `examples/fonts/` (`geist-sans-latin-300/400/500/600/700/800-normal.woff2`, `geist-serif-regular.woff2`, `geist-mono-latin-400/500-normal.woff2`), or load them from the official `geist` npm package (`geist/font/sans`, `geist/font/serif/regular`, `geist/font/mono`). All are SIL Open Font License; keep `examples/fonts/licenses/geist-family-OFL.txt` with them.
- **Geist Serif** is a high-contrast display serif with fine, saw-toothed serifs and sharp hairlines. It ships one weight (400) and no italic, plus decorative variants (Square, Triangle, Heart) for logos only. Use it at 40px and up; never for body text or UI.
- **KEEP** these roles:

| Role | Size | Face and weight | Line height | Tracking |
|---|---|---|---|---|
| Hero headline (sans) | 56–80px desktop, 40–48px at 390 | Geist 600 (or 300 for an airy, oversized headline) | 1.0–1.07 | −0.035 to −0.045em |
| Hero headline (serif) | 64–104px desktop, 44–52px at 390 | Geist Serif 400 | 1.0–1.05 | −0.02 to −0.03em |
| Section headline | 40–56px | Geist 600 or Geist Serif 400 | 1.07–1.12 | −0.02 to −0.03em |
| Tagline | 21px | Geist 600, muted | 1.19 | −0.01em |
| Lead | 19–28px | Geist 400 | 1.14–1.55 | −0.01 to −0.02em |
| Body | 17px | Geist 400 | 1.47 | −0.01em |
| Caption, nav | 12–15px | Geist 400–500 | 1.3–1.43 | 0 |
| Mono label | 12–14px | Geist Mono 400–500 | 1.3 | 0 |

- **AVOID** fake italics: none of the three cuts ships an italic. Emphasis is one of:
  - **two-tone:** the second phrase in the muted ink (`#6e6e73` on light, `#a1a1a6` on dark). The default.
  - **weight contrast:** Geist 300 against Geist 600 in one headline.
  - **cut contrast:** a Geist Serif headline over a Geist lead and Geist Mono labels.
  - **rhythm:** two short stacked sentences (see `serif-globe`).
- **AVOID** `font-weight: 800/900` for Geist headlines on calm pages. 600 is the Gallery voice; 700–800 only on heavy conversion or poster-like pages.

## Colors: the Gallery palette

A museum-wall system: product on white, parchment and near-black tiles, and one blue that only means "you can act here".

```css
:root {
  --canvas: #ffffff;        /* main tiles */
  --parchment: #f5f5f7;     /* alternate tiles, footer, quiet cards */
  --pearl: #fafafc;         /* nav glass, capsule buttons */
  --ink: #1d1d1f;           /* all text on light, and the dark utility button */
  --ink-80: #333333;        /* secondary text on pearl */
  --muted: #6e6e73;         /* captions, two-tone headline half, legal: 5.0:1 on white, 4.6:1 on parchment */
  --hairline: #e0e0e0;      /* or rgb(0 0 0 / .08) over images */
  --divider: #f0f0f0;
  --action: #0066cc;        /* links and the primary pill: the only accent */
  --focus: #0071e3;         /* focus ring, hover on the primary pill */
  --action-on-dark: #2997ff;/* links and outline pills on dark tiles */
  --tile-dark-1: #272729;   /* dark tiles, rotate 1/2/3 so stacked tiles separate */
  --tile-dark-2: #2a2a2c;
  --tile-dark-3: #252527;
  --black: #000000;         /* global nav bar, full-black hero tiles */
  --on-dark: #ffffff;
  --on-dark-muted: #a1a1a6; /* body text on dark tiles */
  --chip: rgb(210 210 215 / .64); /* translucent chips, round icon buttons */
}
```

- **ADD** the blue in exactly three places: text links, the primary pill, and the focus ring. Never on headlines, icons for decoration, backgrounds or charts with more than one series.
- **ADD** rhythm by alternating full-bleed tiles: white → dark → parchment → white. Each tile holds one idea, centered, with 72–80px of top padding.
- **AVOID** decorative gradients, colored glows, tinted shadows and a second accent hue. The product imagery carries all the color the page has.
- **KEEP** contrast: `#1d1d1f` on `#fff` and on `#f5f5f7` is above 15:1, white on `#0066cc` passes, and `#2997ff` is only for links on dark tiles (it doesn't pass as small text on white).

## Shape, depth and motion

- **KEEP** the radius scale: 8 (small controls, utility buttons), 11 (capsules, inputs), 18 (cards and tiles inside a section), pill (every primary and secondary button).
- **ADD** pills at `padding: 11px 22px`, 17px text, at least 44px tall. The primary pill is `--action` with white text; the secondary is transparent with a 1px `--action` ring and blue text, filling blue on hover. On dark tiles the secondary uses `--action-on-dark`.
- **AVOID** drop shadows. Cards, buttons, nav, text and product renders separate by surface color, hairlines and tile contrast. A product can stand on a flat parchment floor shape or inside hairline rings. Add a soft product shadow (`3px 5px 30px rgb(0 0 0 / .22)`, on the image only) only when the user asks for one.
- **ADD** a translucent sticky nav: 44px, `rgb(250 250 252 / .8)` with `backdrop-filter: saturate(180%) blur(20px)`, 12px links. A product sub-bar (52px, product name at 21px/600, a small Buy pill) can sit under it.
- **KEEP** press feedback as `transform: scale(.95)` on pills, and hover as a 150ms color step. The hero still rises in (14px, 70ms stagger) with reduced motion respected.

## Atmosphere

The Gallery theme replaces gradients and washes with the **Gallery tiles** atmosphere: the first screen is a white or black tile whose atmosphere is a large, well-lit product render standing on a flat floor shape, with faint hairline rings or a horizon line under it and no drop shadow. That passes gate point 1. If you copied an example with a different atmosphere, keep its structure but re-tint it: washes become parchment, colored panels become a dark tile, and glows are removed.

## Mapping an example onto the defaults

| Example token | Becomes |
|---|---|
| warm or tinted canvas | `--canvas` (#fff) or `--parchment` |
| dark canvas (#141414, #191919, #1f1f1f) | `--black` or `--tile-dark-1` |
| accent (coral, yellow, lilac…) | `--action`, on the primary CTA, links and one data highlight only |
| muted text from color-mix | `--muted` on light, `--on-dark-muted` on dark |
| display serif / Bricolage / Funnel Display | Geist 600 (or 300 for an oversized airy headline) |
| italic emphasis | two-tone, or 300 against 600 |
| the example's big preview shadow | removed; a 1px hairline frame or a surface step instead |
| Bricolage Grotesque or another chunky display face | Geist 700, −0.045em |
| gradient background, wash, glow, sky | a solid field: `--canvas`, `--parchment` or a dark tile |
| purple anything, blue gradients | removed; the only blue is the solid `--action` on links, the primary pill and focus |

## Light and dark: flipping any look without losing it

A dark version is not the light page with colors inverted. Inverting turns white cards into black holes, makes the accent glow, and lets muted text sink below 4.5:1. Build dark as its own token set that keeps the same **structure of steps**: if light goes canvas → shell → card (darker to lighter or lighter to darker), dark keeps the same order of separation, now rising in lightness toward the viewer.

### The token table

| Role | Light (Gallery) | Dark | Rule |
|---|---|---|---|
| canvas | `#ffffff` | `#0b0b0c` | near-black with a hint of temperature, never `#000` under text-heavy sections |
| shell (outer card, section tint) | `#f5f5f7` | `#161618` | one step up from the canvas |
| card (inner card, inputs) | `#ffffff` | `#1c1c1e` | one more step up; nested surfaces get lighter, not darker |
| raise (hover) | `#fafafc` | `#202022` | half a step |
| ink | `#1d1d1f` | `rgb(237 237 237)` | never pure white for body text |
| muted text | `#6e6e73` | `#a1a1a6` | check 4.5:1 on the shell, not just on the canvas |
| icon grey | `#86868b` | `#6e6e73` | icons and rules only, never text |
| hairline | `#e0e0e0` | `rgb(255 255 255 / .09)` | white alpha on dark, so it works on every surface step |
| strong hairline | `#d2d2d7` | `rgb(255 255 255 / .15)` | inputs, switches |
| action (pill) | `#0066cc` | `#0071e3` | slightly brighter so white text still passes |
| link text | `#0066cc` | `#4ea4ff` | lighter on dark; `#0066cc` text fails on near-black |
| success | `#1e7f4f` | `#4cc38a` | status colors lighten and desaturate a little |
| warning tag | `#fff4e5` on `#9a4b00` | `#3a2a12` on `#ffc56b` | tinted fills become dark tints with light ink |
| featured card / dark band | `#1d1d1f` | `#26262a` / `#161618` | on a dark page "the dark one" becomes the raised one |
| glass edge | none | `inset 0 1px 0 rgb(255 255 255 / .07)` | the only lift a dark card needs |

### How to wire it

```css
:root { /* light tokens */ color-scheme: light; }
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) { /* dark tokens */ color-scheme: dark; }
}
:root[data-theme="dark"] { /* the same dark tokens */ color-scheme: dark; }
```

- Two `theme-color` metas, one per `media="(prefers-color-scheme: …)"`.
- Set `data-theme` from a saved choice in a tiny inline script in `<head>`, before the stylesheet paints, so there is no flash.
- The toggle is a `<button aria-pressed>` with an `aria-label` ("Dark mode"); see `interactions.md`.
- Canvas art reads its color from a CSS variable (an `r g b` triplet such as `--dot: 29 29 31`) and redraws when the theme changes.
- Images and product renders: give screenshots a dark variant, or sit them on a shell with a hairline; never `filter: invert()`.
- Run `verify-render.mjs --dark`: it renders the page in dark mode and measures contrast on what is actually painted.

### Flipping a specific look

| Light look | Dark version keeps | Changes |
|---|---|---|
| `gallery-tiles` | tile rhythm, rings around the product | white tiles become `#0b0b0c` / `#161618`, parchment becomes `#1c1c1e`, dark tiles become `#26262a` so they still separate |
| `warm-wash` | brackets, capture input, dashboard frame | the wash becomes a flat warm near-black `#14110f`; coral accent stays but text on it moves to `#141210` |
| `paper-canvas` | grain, lifted corner, handles | paper becomes `#1a1814`; grain opacity halves; ink becomes warm `rgb(236 231 222)` |
| `shape-flanks` | confetti at the edges | shapes drop to 60% lightness so they don't glow |
| `stream-lines` | lanes and the hairline card | lanes use `rgb(255 255 255 / .06)`; blue second line becomes `#4ea4ff` |
| `serif-stats`, `serif-phone` | serif headline, cards | italic accent word keeps its hue, lightened one step |

Dark-first looks (`cinematic-black`, `serif-globe`, `fluted-glow`, `dusk-range`) flip the other way with the same table read right to left: surfaces step *down* in lightness toward the viewer's focus, and hairlines become `rgb(0 0 0 / .08)`.
