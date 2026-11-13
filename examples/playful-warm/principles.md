# playful-warm: principles

**Look.** Cream canvas with a blurred dune and a doodle, chunky grotesk, icon tiles inside the headline, a hand-drawn underline and a glossy button.

## Why it works
- **Atmosphere:** Sand dune + doodle: one huge blurred peach shape behind the preview and one hand-drawn doodle.
- **Headline emphasis (exactly one move):** Icon tiles set inline in the headline.
- **Signature (repeated 2–3 times):** A hand-drawn underline, repeated as the doodle.
- **Color strategy:** Committed warm: orange accent on cream.
- **One primary action** in the first viewport, with at most one quiet secondary.
- **The preview proves the headline** instead of decorating it: Generated share cards.

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
| Bricolage Grotesque | the display face | use Geist 700 (or the user's face) |
| gradient background | the blurred dune | drop it and keep the doodle on the flat cream |
| drop shadow | card shadows | use hairlines |
