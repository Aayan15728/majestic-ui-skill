# gradient-frame: principles

**Look.** A blue-to-orange gradient frame around one white rounded page, a chunky grotesk two-tone headline, a rating row, and a phone in a gradient card with floating chips that quote its numbers.

## Why it works
- **Atmosphere:** Gradient frame around the page.
- **Headline emphasis (exactly one move):** Two-tone headline.
- **Signature (repeated 2–3 times):** Floating chips that repeat the phone's numbers.
- **Color strategy:** Committed two-hue frame, white page.
- **One primary action** in the first viewport, with at most one quiet secondary.
- **The preview proves the headline** instead of decorating it: A phone in a soft card.

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
| Bricolage Grotesque | the display face | use Geist 700 |
| blue gradient | the frame and card | use a solid colored frame (any non-blue, non-purple hue) or none |
| drop shadow | chip and phone shadows | use hairlines |
