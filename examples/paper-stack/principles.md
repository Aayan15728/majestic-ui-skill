# paper-stack: principles

**Look.** A light grey page with papers leaning in from the four corners: a stack of invented book covers, a reading note with a dark checkpoint bar, a paper and a review card. A Geist headline whose last word is set in Geist Pixel, a dark button, then a lab finder (search, filter chips, live count) over cards topped with a band of glyphs, and a coupon dialog.

## Why it works
- **Atmosphere:** Objects: tilted cards at the corners, cropped by the section edge, leaving the center clear.
- **Headline emphasis (exactly one move):** One word in a second face: 'Mapped.' in Geist Pixel.
- **Signature (repeated 2–3 times):** Monospace glyphs: the caps meta labels, the glyph band across each lab card and the pixel word in the headline.
- **Color strategy:** Restrained: warm greys and near-black; one cobalt for the badge, focus and the coupon; red only for the LIVE status chip.
- **One primary action** in the first viewport, with at most one quiet secondary.
- **The preview proves the headline** instead of decorating it: The lab finder is the preview: type, filter, and the catalogue responds.

## Rules it keeps
- Real nouns and numbers in the copy, no hype words, no exclamation marks.
- 4px spacing grid, `gap` instead of margin stacks, the hero rhythm and viewport budget from SKILL.md section 9.
- Headline at 2–3 lines on desktop, `text-wrap: balance`, a `max-width` in `ch`.
- Craft floor: skip link to `main#main`, `:focus-visible` ring, `theme-color`, labels and `aria-hidden` on decoration, `prefers-reduced-motion`.
- At 390px: no horizontal scroll, no collisions, full-width CTAs where they stack.

## Against the undecided defaults
This example follows every undecided default, so it can be copied as is when the user hasn't stated preferences.
