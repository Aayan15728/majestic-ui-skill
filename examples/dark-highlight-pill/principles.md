# dark-highlight-pill: principles

**Look.** #191919, a floating pill nav, a version badge, a heavy headline with a light-blue highlight pill and an inline app icon, a blue gradient pill and a full editor preview.

## Why it works
- **Atmosphere:** Glow under preview: one soft radial behind the editor, never behind the text.
- **Headline emphasis (exactly one move):** Highlight pill + inline app icon.
- **Signature (repeated 2–3 times):** Inline app icon plus the highlight pill.
- **Color strategy:** Restrained dark with one blue accent.
- **One primary action** in the first viewport, with at most one quiet secondary.
- **The preview proves the headline** instead of decorating it: A full editor with timeline.

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
| blue gradient | the gradient pill | use a solid accent pill |
| gradient background | the glow under the preview | drop it; separate the editor with a hairline |
| drop shadow | the editor shadow | use a hairline |
