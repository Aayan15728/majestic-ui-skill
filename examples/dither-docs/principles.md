# dither-docs: principles

**Look.** A documentation page in pure black (or white): a floating pill nav, a quiet section tree on the left, an article column with a live demo, and an on-this-page list on the right. The demo is a slow periwinkle dither field drawn in code.

## Why it works
- **Atmosphere:** None behind the text, on purpose (a Read surface). The art lives inside the demo frame.
- **Headline emphasis (exactly one move):** None in the title; hierarchy comes from size (40 / 24 / 16) and from muted secondary text.
- **Signature (repeated 2–3 times):** The dot grid: the logo is seven dots, the demo is thousands of them, and inline code sits on dot-ground chips.
- **Color strategy:** Restrained: neutrals only in the chrome; one periwinkle used for the demo, links and focus.
- **One primary action** in the first viewport, with at most one quiet secondary.
- **The preview proves the headline** instead of decorating it: A 672 × 400 canvas: value noise thresholded by an 8 × 8 Bayer matrix, redrawn 12 times a second, colors read from the theme tokens.

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
| looping motion | the dither demo | keep it only where motion is the subject; it already pauses off-screen and holds still under reduced motion |
