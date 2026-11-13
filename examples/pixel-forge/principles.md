# pixel-forge: principles

**Look.** A white page cut out of a blue pixel field, a Geist Pixel headline, a dithered pixel-art grove with a prompt box over it, dissolving pixel edges and dashed and double-ring buttons.

## Why it works
- **Atmosphere:** Pixel field and grove: big two-tint pixels on the blue, and a scene painted at 1/6 resolution with ordered dithering, scaled up with no smoothing.
- **Headline emphasis (exactly one move):** The pixel face itself, with one blue dash.
- **Signature (repeated 2–3 times):** Stepped, unblurred pixel shadows and dashed outlines.
- **Color strategy:** Committed: a solid blue field around a white page; the grove has its own 16-color palette.
- **One primary action** in the first viewport, with at most one quiet secondary.
- **The preview proves the headline** instead of decorating it: The generated scene itself.

## Rules it keeps
- Real nouns and numbers in the copy, no hype words, no exclamation marks.
- 4px spacing grid, `gap` instead of margin stacks, the hero rhythm and viewport budget from SKILL.md section 9.
- Headline at 2–3 lines on desktop, `text-wrap: balance`, a `max-width` in `ch`.
- Craft floor: skip link to `main#main`, `:focus-visible` ring, `theme-color`, labels and `aria-hidden` on decoration, `prefers-reduced-motion`.
- At 390px: no horizontal scroll, no collisions, full-width CTAs where they stack.

## Against the undecided defaults
This example follows every undecided default, so it can be copied as is when the user hasn't stated preferences.
