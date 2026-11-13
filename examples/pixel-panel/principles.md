# pixel-panel: principles

**Look.** The hero sits inside a rounded orange panel with pixel blocks and vertical blinds; a file-browser window breaks out of the bottom edge.

## Why it works
- **Atmosphere:** Colored panel with pixel blocks and vertical blinds.
- **Headline emphasis (exactly one move):** Two-tone headline.
- **Signature (repeated 2–3 times):** Pixel blocks, repeated as a dissolve on the window edge.
- **Color strategy:** Drenched hero: the orange panel is the color.
- **One primary action** in the first viewport, with at most one quiet secondary.
- **The preview proves the headline** instead of decorating it: A file browser window.

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
| drop shadow | the window shadow | use a hairline and a surface step |
| gradient background | the panel's soft gradient | make the panel a solid color |
