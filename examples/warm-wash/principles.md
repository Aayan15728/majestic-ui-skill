# warm-wash: principles

**Look.** Peach wash fading into a warm canvas, a faint white grid, accent hairlines curving to the CTA, corner brackets, a URL capture input and a browser-framed dashboard.

## Why it works
- **Atmosphere:** Warm wash: a vertical tint #ffcdb2 → #ffe3d3 → #fff3eb → canvas, a 120px white grid masked to the top third, a white radial behind the headline and 3 + 3 accent hairlines.
- **Headline emphasis (exactly one move):** Two-tone line inside the headline.
- **Signature (repeated 2–3 times):** Viewfinder corner brackets around the capture input, the badge and the dashboard.
- **Color strategy:** Committed warm: one coral accent over a peach-tinted canvas.
- **One primary action** in the first viewport, with at most one quiet secondary.
- **The preview proves the headline** instead of decorating it: Browser chrome around a revenue-by-source dashboard.

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
| gradient background | the peach wash | use the flat canvas with only the masked hairline grid, or start from gallery-tiles |
| drop shadow | the tinted shadow under the dashboard | replace it with a 1px hairline frame and a surface step |
