# dusk-range: principles

**Look.** An alpenglow mountain range painted to canvas (lilac sky, peach light, hazy ridges), a dark pill nav with a sky-blue button, a white headline and an editor window rising from the bottom.

## Why it works
- **Atmosphere:** Painted range: four ridges with hillshade lit from the right, blended snow, haze between layers and soft clouds, fading to white at the bottom.
- **Headline emphasis (exactly one move):** Size and the white-on-scene contrast; one confident line break.
- **Signature (repeated 2–3 times):** The sky-blue glossy pill, in the nav, the CTA and the editor's Share link.
- **Color strategy:** Committed scene: the sky and light carry the color; one sky-blue on actions.
- **One primary action** in the first viewport, with at most one quiet secondary.
- **The preview proves the headline** instead of decorating it: An editor window showing an annotated capture.

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
| gradient background | the painted sky | use a solid dusk color behind the ridges, or a real photo |
| drop shadow | nav, window and buttons | use hairlines and surface steps |
