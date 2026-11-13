# serif-globe: principles

**Look.** Near-black, a Geist Serif two-sentence headline, a globe printed in monospace glyphs behind the hero, a row of assistant tiles and a real checkout preview.

## Why it works
- **Atmosphere:** Glyph globe: a lit sphere with a noise land mask, drawn once to canvas as faint monospace characters behind the headline.
- **Headline emphasis (exactly one move):** Two stacked sentences in Geist Serif, no italic, no second color: the rhythm of the pair is the move.
- **Signature (repeated 2–3 times):** Monospace glyphs (the globe, the NEW chip, the tile grid) and pill buttons in white and outline.
- **Color strategy:** Restrained dark: near-white ink and one off-white action color; the only hues live in the small tile marks.
- **One primary action** in the first viewport, with at most one quiet secondary.
- **The preview proves the headline** instead of decorating it: A full checkout with order summary.

## Rules it keeps
- Real nouns and numbers in the copy, no hype words, no exclamation marks.
- 4px spacing grid, `gap` instead of margin stacks, the hero rhythm and viewport budget from SKILL.md section 9.
- Headline at 2–3 lines on desktop, `text-wrap: balance`, a `max-width` in `ch`.
- Craft floor: skip link to `main#main`, `:focus-visible` ring, `theme-color`, labels and `aria-hidden` on decoration, `prefers-reduced-motion`.
- At 390px: no horizontal scroll, no collisions, full-width CTAs where they stack.

## Against the undecided defaults
This example follows every undecided default, so it can be copied as is when the user hasn't stated preferences.
