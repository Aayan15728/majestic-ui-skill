# paper-canvas: principles

**Look.** Warm paper with grain, a lifted corner with a ruler, a lowercase two-tone headline, a dark rect button with a text link, a detailed design-tool window, and a hairline grid section with square handles and a staircase of cells.

## Why it works
- **Atmosphere:** Paper: SVG grain over a warm canvas, and a lifted corner with a grid and ruler ticks.
- **Headline emphasis (exactly one move):** Two-tone: the first line in ink, the rest in warm grey, all lowercase.
- **Signature (repeated 2–3 times):** Square handles where hairlines meet, like a selected frame, repeated as the pixel staircase.
- **Color strategy:** Restrained warm: ink on paper, one soft blue inside the product.
- **One primary action** in the first viewport, with at most one quiet secondary.
- **The preview proves the headline** instead of decorating it: A design tool with tabs, pages, tools, an artboard and properties.

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
| drop shadow | the window | use the hairline frame alone |
