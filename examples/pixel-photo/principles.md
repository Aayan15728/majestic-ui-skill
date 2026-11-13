# pixel-photo: principles

**Look.** A sunlit coastal scene that breaks into pixel blocks at the bottom, a black announcement bar, a logo tile, a white box of mono uppercase links and coral buttons.

## Why it works
- **Atmosphere:** Pixel photo: a drawn (or real) photo whose bottom band and a scatter of sky pixels are re-sampled into square blocks with a few coral cells.
- **Headline emphasis (exactly one move):** Size alone: a 2-line headline at 68px, mono body for contrast.
- **Signature (repeated 2–3 times):** Square pixel blocks, echoed by the square logo tile and the rect buttons.
- **Color strategy:** Committed scene: sky and sand carry the color, one coral accent on actions.
- **One primary action** in the first viewport, with at most one quiet secondary.
- **The preview proves the headline** instead of decorating it: The scene stands in; follow with real request and response blocks below.

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
| gradient background | the sky gradient | use a solid sky color or a real photo |
| blue gradient | the sky | a flat pale sky or a warm-toned photo |
