# glyph-heritage: principles

**Look.** Dark brown, a serif headline with an italic amber line, two landmarks printed as warm glyphs on both flanks, and a leather journal with a module card leaning on it.

## Why it works
- **Atmosphere:** Glyph flanks: a tower and a dome rendered as monospace glyphs, plus a warm floor light.
- **Headline emphasis (exactly one move):** Italic amber second line.
- **Signature (repeated 2–3 times):** Glyph art, echoed by the compass emblem on the journal and logo.
- **Color strategy:** Committed warm dark: amber on brown.
- **One primary action** in the first viewport, with at most one quiet secondary.
- **The preview proves the headline** instead of decorating it: A journal object plus a module card with progress.

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
| drop shadow | the journal and card shadows | use hairlines and the surface step |
| gradient background | the warm floor radial | drop it; the glyphs carry the atmosphere |
