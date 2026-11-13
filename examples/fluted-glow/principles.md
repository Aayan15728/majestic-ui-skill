# fluted-glow: principles

**Look.** Near-black with an ember, rose, violet and cobalt glow seen through vertical fluted glass, a lime announcement bar, a book serif headline and hard white and black rect buttons.

## Why it works
- **Atmosphere:** Fluted glow: blurred radial color fields under a repeating vertical stripe of light and shade, darkened behind the text.
- **Headline emphasis (exactly one move):** Size only: a two-line book serif at 104px.
- **Signature (repeated 2–3 times):** Lime: the NEW chip, the bar's underline, the stat number and the hover state.
- **Color strategy:** Full palette glow behind a near-black stage, with lime as the single interface accent.
- **One primary action** in the first viewport, with at most one quiet secondary.
- **The preview proves the headline** instead of decorating it: None above the fold; add an action log below.

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
| purple | the violet glow | drop violet; keep ember and cobalt or use one hue |
| gradient background | the whole glow field | use a solid near-black with the flutes as a subtle texture |
| blue gradient | the cobalt side | remove it or swap for ember |
