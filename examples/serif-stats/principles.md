# serif-stats: principles

**Look.** White page, a book serif headline with an italic word and a grey line, three stat cards with sources, and a live leaderboard.

## Why it works
- **Atmosphere:** Editorial plain: allowed because the serif headline plus stat cards and a live board carry the page.
- **Headline emphasis (exactly one move):** Italic serif word plus a grey second line.
- **Signature (repeated 2–3 times):** Source captions under every number, repeated on the board rows.
- **Color strategy:** Restrained: ink on white with one solid blue accent.
- **One primary action** in the first viewport, with at most one quiet secondary.
- **The preview proves the headline** instead of decorating it: A live leaderboard.

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
| drop shadow | the soft shadow on the board | use a hairline border and the #f4f4f6 surface |
