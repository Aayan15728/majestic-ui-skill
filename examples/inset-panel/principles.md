# inset-panel: principles

**Look.** A cream canvas with the hero set inside one large near-black rounded panel: cream Geist Serif headline, an orange pill, and three cream product cards hanging from the button on drawn connector lines. Below: an invented logo strip, a pill tab bar that swaps the feature copy, a flat illustrated panel with a chart card, and plain testimonials with the claim highlighted.

## Why it works
- **Atmosphere:** The inset panel itself: a dark rounded field (32px radius, 8px in from the page edge) on cream, so the first screen has a strong shape before any art.
- **Headline emphasis (exactly one move):** Serif over sans: the headline is the only serif on the dark panel; everything else is Geist.
- **Signature (repeated 2–3 times):** Hairline connectors with small dots that run from the button down to the cards, echoed by the dashed guide line in the weekly chart and the hatched bars.
- **Color strategy:** Committed two-tone: cream and near-black share the page about evenly; one orange is the only chroma, on the CTA, the active tab and the data.
- **One primary action** in the first viewport, with at most one quiet secondary.
- **The preview proves the headline** instead of decorating it: Three cream cards: a gauge with three progress rows, a pipeline card with stacked blocks and two comparisons, and a ledger with hatched quota bars. The center card sits higher and in front.

## Rules it keeps
- Real nouns and numbers in the copy, no hype words, no exclamation marks.
- 4px spacing grid, `gap` instead of margin stacks, the hero rhythm and viewport budget from SKILL.md section 9.
- Headline at 2–3 lines on desktop, `text-wrap: balance`, a `max-width` in `ch`.
- Craft floor: skip link to `main#main`, `:focus-visible` ring, `theme-color`, labels and `aria-hidden` on decoration, `prefers-reduced-motion`.
- At 390px: no horizontal scroll, no collisions, full-width CTAs where they stack.

## Against the undecided defaults
This example follows every undecided default, so it can be copied as is when the user hasn't stated preferences.
