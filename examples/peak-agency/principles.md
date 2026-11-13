# peak-agency: principles

**Look.** A snowfield painted to canvas fading into white, dotted frame rails, a floating white nav card with dashed dividers, a blue highlight block on the headline and glossy blue buttons.

## Why it works
- **Atmosphere:** Snowfield: a ridged height field lit from the upper left (hillshade), snow on lit faces and blue rock in shadow, fading into the page by the headline's second line.
- **Headline emphasis (exactly one move):** A solid blue highlight block behind the second phrase.
- **Signature (repeated 2–3 times):** Dotted rails and dashed dividers, on the frame, the nav card and the hero's bottom rule.
- **Color strategy:** Restrained: ink on white with one blue used for the highlight, the buttons and the nav dots.
- **One primary action** in the first viewport, with at most one quiet secondary.
- **The preview proves the headline** instead of decorating it: None; the snowfield and the client list carry the first screen.

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
| drop shadow | the nav card and the glossy buttons | use hairlines and a flat blue button |
