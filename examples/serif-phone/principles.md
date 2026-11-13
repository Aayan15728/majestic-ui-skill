# serif-phone: principles

**Look.** Near-white, a serif headline with an italic second line, one soft CTA, a phone with a real conversation and floating petals.

## Why it works
- **Atmosphere:** Editorial plain with a phone and petals as the moment.
- **Headline emphasis (exactly one move):** Italic serif second line.
- **Signature (repeated 2–3 times):** Floating petals around the phone.
- **Color strategy:** Restrained: navy ink on near-white.
- **One primary action** in the first viewport, with at most one quiet secondary.
- **The preview proves the headline** instead of decorating it: A phone with a real message thread.

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
| drop shadow | the phone shadow | use the bezel and a hairline only |
