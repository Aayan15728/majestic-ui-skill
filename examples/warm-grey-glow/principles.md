# warm-grey-glow: principles

**Look.** Warm grey canvas, a very tight heavy grotesk, a news chip, one black CTA with the price inside, a rating with avatars, a dashboard with serif numbers and an orange-rose blur glow off the right edge.

## Why it works
- **Atmosphere:** Off-edge glow behind the dashboard.
- **Headline emphasis (exactly one move):** Weight and tight tracking alone.
- **Signature (repeated 2–3 times):** Serif numbers inside a sans dashboard.
- **Color strategy:** Restrained warm grey with one warm glow.
- **One primary action** in the first viewport, with at most one quiet secondary.
- **The preview proves the headline** instead of decorating it: A dashboard with KPIs, chart and transactions.

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
| Bricolage Grotesque | the display face | use Geist 700 with −0.045em tracking |
| gradient background | the blur glow | drop it |
| drop shadow | dashboard shadow | use the glass edge and hairline |
