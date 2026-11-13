# voice-ribbon: principles

**Look.** Pale butter canvas, a serif headline with an italic line, a floating bordered nav with a segmented toggle, a text ribbon that turns messy input into clean output, and a dark panel below.

## Why it works
- **Atmosphere:** Text ribbon: messy grey text curls in, passes a waveform pill, and leaves as bold white text on a dark band.
- **Headline emphasis (exactly one move):** Italic serif second line.
- **Signature (repeated 2–3 times):** The ribbon itself.
- **Color strategy:** Restrained warm: ink on butter, the dark band carries contrast.
- **One primary action** in the first viewport, with at most one quiet secondary.
- **The preview proves the headline** instead of decorating it: The transformation ribbon.

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
| drop shadow | the panel shadow | use the dark band's contrast alone |
