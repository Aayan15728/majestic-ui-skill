# crimson-mesa: principles

**Look.** A night scene painted in code: black sky with dim haze and stars, two blue-grey mesas lit from the left, a crimson plain streaked with frost, a rock slab and a small cloaked figure. White Geist headline, a centered logo in the nav, a white button and a dark glass one.

## Why it works
- **Atmosphere:** Painted landscape on one canvas, drawn once per size from a seeded generator: sky, haze, far ridge, perspective streaks, stones, mesas with fluting and ledges, a slab and a figure. The sky stays near-black behind all text.
- **Headline emphasis (exactly one move):** Scale and weight only: one white 88px headline, no second color or face.
- **Signature (repeated 2–3 times):** The lone figure on the slab, facing the plain; echoed by the single square crimson markers in the list below.
- **Color strategy:** Drenched dark with one saturated field: crimson owns the lower third of the first screen and appears nowhere else except small list markers.
- **One primary action** in the first viewport, with at most one quiet secondary.
- **The preview proves the headline** instead of decorating it: Below the fold: a run log card with step inputs and outputs in Geist Mono, durations, and Approve / Reject on the waiting step.

## Rules it keeps
- Real nouns and numbers in the copy, no hype words, no exclamation marks.
- 4px spacing grid, `gap` instead of margin stacks, the hero rhythm and viewport budget from SKILL.md section 9.
- Headline at 2–3 lines on desktop, `text-wrap: balance`, a `max-width` in `ch`.
- Craft floor: skip link to `main#main`, `:focus-visible` ring, `theme-color`, labels and `aria-hidden` on decoration, `prefers-reduced-motion`.
- At 390px: no horizontal scroll, no collisions, full-width CTAs where they stack.

## Against the undecided defaults
This example follows every undecided default, so it can be copied as is when the user hasn't stated preferences.
