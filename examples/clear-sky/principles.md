# clear-sky: principles

**Look.** A deep blue sky opening to a white horizon, a low sun with a horizontal flare, illustrated peaks lit from the sun, a white Geist Serif headline over a fading hairline, a glossy blue button, and a desktop preview: warm wallpaper, a dark floating toolbar, a call window and a glass answer card.

## Why it works
- **Atmosphere:** Painted sky: a canvas drawn once at three-quarter resolution; the sky stays deep (#1b62bb to #2a72c4) behind all text so white passes 4.5:1, then opens to a white horizon with posterized, sun-lit peaks and fog.
- **Headline emphasis (exactly one move):** A thin hairline under the headline that fades at both ends; the headline itself is one calm serif voice.
- **Signature (repeated 2–3 times):** The sun's horizontal flare, echoed by the hairline under the headline and the glass pill toolbar floating over the wallpaper.
- **Color strategy:** Committed: the sky blue owns the first screen; the warm wallpaper is the only counter-color, and only inside the product frame.
- **One primary action** in the first viewport, with at most one quiet secondary.
- **The preview proves the headline** instead of decorating it: A desktop scene: warm wallpaper with rays, a dark pill toolbar, a four-person call and the assistant's glass card.

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
| gradient background | the painted sky and the wallpaper | a solid #1b62bb field with the peaks drawn flat in two blues, or move to gallery-tiles |
| blue gradient | the sky and the glossy button | solid #0066cc pill, solid sky |
| colored shadow | the button glow | remove it; the pill stands on the sky by color |
