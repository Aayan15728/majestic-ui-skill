# field-analytics: principles

**Look.** A light app window on a flat painted meadow: a grouped sidebar with counts and a storage meter, three KPI cards, a revenue line chart with a keyboard-readable tooltip, a billing-flow band chart, a bar chart, a dot heatmap, ring chart, a health list and folder tiles. White cards, hairlines, one orange.

## Why it works
- **Atmosphere:** A meadow of five flat green bands behind the window, visible as a 20px margin. Inside the app, none.
- **Headline emphasis (exactly one move):** None in the title (28px). Each card's big number is the emphasis.
- **Signature (repeated 2–3 times):** One orange highlight per chart: the current line, the cash band, Friday's bar, the busiest dots, the top client's ring.
- **Color strategy:** Restrained: warm neutrals, one orange in four tints for all data, ink and grey for comparison series; green and red only on deltas, always with an arrow.
- **One primary action** in the first viewport, with at most one quiet secondary.
- **The preview proves the headline** instead of decorating it: The screen is the product.

## Rules it keeps
- Real nouns and numbers in the copy, no hype words, no exclamation marks.
- 4px spacing grid, `gap` instead of margin stacks, the hero rhythm and viewport budget from SKILL.md section 9.
- Headline at 2–3 lines on desktop, `text-wrap: balance`, a `max-width` in `ch`.
- Craft floor: skip link to `main#main`, `:focus-visible` ring, `theme-color`, labels and `aria-hidden` on decoration, `prefers-reduced-motion`.
- At 390px: no horizontal scroll, no collisions, full-width CTAs where they stack.

## Against the undecided defaults
This example follows every undecided default, so it can be copied as is when the user hasn't stated preferences.
