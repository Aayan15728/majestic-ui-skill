# ascii-workspace: principles

**Look.** Warm off-white, ASCII-glyph artwork on the right, an integration tile row, a left-aligned headline and an app window with chat, diff and terminal.

## Why it works
- **Atmosphere:** ASCII artwork: a scene painted once to canvas as monospace glyphs in soft colors.
- **Headline emphasis (exactly one move):** Weight contrast in a left-aligned headline.
- **Signature (repeated 2–3 times):** Glyph artwork, echoed in the terminal pane.
- **Color strategy:** Restrained: ink on #f6f5f1, one solid blue accent.
- **One primary action** in the first viewport, with at most one quiet secondary.
- **The preview proves the headline** instead of decorating it: An app window with traffic lights and three panes.

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
| drop shadow | the shadow under the app window | use a hairline frame |
