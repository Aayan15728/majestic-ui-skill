# gallery-tiles: principles

**Look.** The default theme: Geist only, full-bleed white, near-black and parchment tiles, blue pills, a product render with no drop shadow.

## Why it works
- **Atmosphere:** Gallery tiles: the first white tile holds a large lit product render standing on a flat parchment floor inside two hairline rings.
- **Headline emphasis (exactly one move):** Two-tone headline: the second sentence in muted #6e6e73.
- **Signature (repeated 2–3 times):** Hairline rings around the product, repeated in the stat-card icons (concentric circles).
- **Color strategy:** Restrained: neutrals plus one action blue used only for links, the primary pill and focus.
- **One primary action** in the first viewport, with at most one quiet secondary.
- **The preview proves the headline** instead of decorating it: A drawn product render (SVG) instead of a UI frame; hardware is the product, so the object is the proof.

## Rules it keeps
- Real nouns and numbers in the copy, no hype words, no exclamation marks.
- 4px spacing grid, `gap` instead of margin stacks, the hero rhythm and viewport budget from SKILL.md section 9.
- Headline at 2–3 lines on desktop, `text-wrap: balance`, a `max-width` in `ch`.
- Craft floor: skip link to `main#main`, `:focus-visible` ring, `theme-color`, labels and `aria-hidden` on decoration, `prefers-reduced-motion`.
- At 390px: no horizontal scroll, no collisions, full-width CTAs where they stack.

## Against the undecided defaults
This example follows every undecided default, so it can be copied as is when the user hasn't stated preferences.
