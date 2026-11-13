# pastel-dreamscape: principles

**Look.** Pastel blue-to-pink sky over an illustrated landscape, an airy Geist 300 headline on the left, a lead and white pill on the right, vertical frame rails and a recent-work row.

## Why it works
- **Atmosphere:** Illustrated landscape under a pastel sky.
- **Headline emphasis (exactly one move):** Weight: Geist 300 at 100px against Geist 500 UI.
- **Signature (repeated 2–3 times):** Vertical frame rails at the gutters.
- **Color strategy:** Full palette pastel: sky, mint, peach and pink, one ink.
- **One primary action** in the first viewport, with at most one quiet secondary.
- **The preview proves the headline** instead of decorating it: Four work thumbnails.

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
| gradient background | the pastel sky | use a solid pale sky (#c4dbf6) behind the landscape |
| drop shadow | thumbnail shadows | use the inset white hairline only |
