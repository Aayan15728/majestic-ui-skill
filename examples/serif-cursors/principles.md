# serif-cursors: principles

**Look.** White, a serif headline with an italic line, a phone on concentric arcs, and floating stat cards with multiplayer cursor name tags.

## Why it works
- **Atmosphere:** Clear stage: hairline concentric arcs radiating from the phone.
- **Headline emphasis (exactly one move):** Italic serif second line.
- **Signature (repeated 2–3 times):** Cursor name tags, one per partner, on every card they touched.
- **Color strategy:** Restrained: ink on white; the two partner colors (blue, yellow) only on cursors and the split bar.
- **One primary action** in the first viewport, with at most one quiet secondary.
- **The preview proves the headline** instead of decorating it: A phone with the shared budget.

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
| drop shadow | stat card shadows | use hairlines only |
