# rock-dashboard: principles

**Look.** Blue-grey stage with frame rails, corner ticks, bracketed mono labels and dot-matrix columns, a Geist Serif headline with one blue word, a full dashboard, and sandstone boulders and fog over its lower edge.

## Why it works
- **Atmosphere:** Frame rails with dot-matrix columns above, and boulders painted to canvas (blocky silhouettes, facets, strata, occluded rims) with fog in front.
- **Headline emphasis (exactly one move):** One word of the serif headline in the accent blue.
- **Signature (repeated 2–3 times):** Bracketed mono labels and dot matrices, repeated as the dot-matrix bar chart.
- **Color strategy:** Restrained: ink on blue-grey, one blue for the key word, the primary button and the chart.
- **One primary action** in the first viewport, with at most one quiet secondary.
- **The preview proves the headline** instead of decorating it: A full app window with three panes.

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
| drop shadow | the glossy button and the dashboard frame | use hairlines |
| gradient background | the sky to sand fade | a solid blue-grey |
