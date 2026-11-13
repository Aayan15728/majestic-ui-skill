# cinematic-black: principles

**Look.** Pure black, a serif two-tone headline, white and dark pills, and a lit macOS desktop scene with a command palette.

## Why it works
- **Atmosphere:** Lit scene: the page stays black and the color arrives inside the product scene (a dusk desktop) with a faint warm radial above it.
- **Headline emphasis (exactly one move):** Serif two-tone: the second phrase in grey.
- **Signature (repeated 2–3 times):** The keycap and the palette's highlighted row, repeated in the badge and the fine print.
- **Color strategy:** Restrained dark: near-white ink on black, one amber accent inside the scene.
- **One primary action** in the first viewport, with at most one quiet secondary.
- **The preview proves the headline** instead of decorating it: An OS desktop scene with an open command palette.

## Rules it keeps
- Real nouns and numbers in the copy, no hype words, no exclamation marks.
- 4px spacing grid, `gap` instead of margin stacks, the hero rhythm and viewport budget from SKILL.md section 9.
- Headline at 2–3 lines on desktop, `text-wrap: balance`, a `max-width` in `ch`.
- Craft floor: skip link to `main#main`, `:focus-visible` ring, `theme-color`, labels and `aria-hidden` on decoration, `prefers-reduced-motion`.
- At 390px: no horizontal scroll, no collisions, full-width CTAs where they stack.

## Against the undecided defaults
This look uses things the skill tells agents to avoid when the user hasn't decided. Keep them when the user picked this look or asked for them; otherwise adapt:

| Departure | Where | If the user hasn't decided |
|---|---|---|
| drop shadow | the deep shadow under the desktop scene | separate the scene with a hairline and a surface step instead |
