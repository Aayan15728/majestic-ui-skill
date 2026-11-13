# bold-yellow: principles

**Look.** White, a grey announcement bar, a kicker plus a heavy two-sentence headline, a bold-word sub-line, a yellow pill with a price link, and a progress card.

## Why it works
- **Atmosphere:** Editorial plain carried by the heavy headline and the progress card.
- **Headline emphasis (exactly one move):** Grey kicker + bold-word sub-line.
- **Signature (repeated 2–3 times):** Bold words in the sub-line, echoed in the progress card labels.
- **Color strategy:** Committed: bright yellow accent on white.
- **One primary action** in the first viewport, with at most one quiet secondary.
- **The preview proves the headline** instead of decorating it: A progress card.

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
| drop shadow | the progress card shadow | use a hairline |
