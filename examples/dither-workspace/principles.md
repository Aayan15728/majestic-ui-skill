# dither-workspace: principles

**Look.** A dark app: a sessions rail on the left and, on the right, a dithered planet horizon (orange limb, blue air, black space) behind glass panels: a prompt composer, an activity heatmap, recent sessions, usage, pull requests and this month's numbers.

## Why it works
- **Atmosphere:** Dithered art painted once to a low-resolution canvas and scaled up with crisp pixels: a planet's lit limb crossing the view on a shallow diagonal.
- **Headline emphasis (exactly one move):** None; this is a product screen. The composer's size and position do the work.
- **Signature (repeated 2–3 times):** Pixels: the 3px dither dots of the art repeat as the squares of the activity heatmap.
- **Color strategy:** Restrained dark chrome with one blue for data; the art supplies the only warm color.
- **One primary action** in the first viewport, with at most one quiet secondary.
- **The preview proves the headline** instead of decorating it: The screen is the product.

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
| glass panels | every card and the composer | use opaque #121317 panels with a hairline; the art then shows only in the gaps |
| crowded first screen | 19 controls | normal for a product screen: check it with verify-render --app |
