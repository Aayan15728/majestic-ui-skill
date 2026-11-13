# electric-swirl: principles

**Look.** A saturated electric-blue field with a stippled swirl and a street lamp casting a denser warm cone, a floating white nav bar and glass logo tiles.

## Why it works
- **Atmosphere:** Electric block with a stippled swirl and a lamp cone.
- **Headline emphasis (exactly one move):** Weight: Geist 600 at 100px.
- **Signature (repeated 2–3 times):** Stipple dots, repeated in the lamp cone.
- **Color strategy:** Drenched: the surface is the color.
- **One primary action** in the first viewport, with at most one quiet secondary.
- **The preview proves the headline** instead of decorating it: The concept scene stands in; pair it with a real log view lower down.

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
| blue background | the electric-blue field | only use it when the user wants a bold color; otherwise use a solid non-blue field (ember, ink, forest) |
| gradient background | the radial behind the field | use the solid field |
| drop shadow | the nav bar shadow | use a hairline |
