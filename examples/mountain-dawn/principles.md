# mountain-dawn: principles

**Look.** An SVG dawn sky over layered ridges, a white condensed serif with an italic dawn-colored line, hard-edged light and black rect buttons, a logo strip and hairline-split dark cards.

## Why it works
- **Atmosphere:** Drawn sky: an SVG dawn over 3–4 ridges with atmospheric perspective.
- **Headline emphasis (exactly one move):** Italic dawn-colored second line.
- **Signature (repeated 2–3 times):** Hard-edged rect buttons and square markers, echoed on the cards.
- **Color strategy:** Restrained dark with one dawn accent.
- **One primary action** in the first viewport, with at most one quiet secondary.
- **The preview proves the headline** instead of decorating it: Data drawings inside the feature cards.

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
| gradient background | the dawn sky gradient | use a solid night sky with the ridges as flat layers |
