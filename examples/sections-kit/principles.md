# sections-kit: principles

**Look.** The lower page done properly, in the Gallery default with a working dark mode: a tabbed revenue board, a feature split with a journey timeline and a quote, a logo row into a dark band, a bento, three pricing tiers with a billing switch, a comparison table, an ROI calculator, add-on cards, an FAQ accordion and a dotted-hill footer.

## Why it works
- **Atmosphere:** Flat: shells (#f5f5f7) holding white inner cards, full-bleed dark band with rounded white edges, dotted hills drawn to canvas in the footer.
- **Headline emphasis (exactly one move):** Two-tone Geist Serif section heads: the first phrase in ink, the second in muted. Same spec in every section.
- **Signature (repeated 2–3 times):** Card-in-card: an outer tinted shell with an 8px inset around an inner hairline card, used by the board, journey, pricing tiers, table and FAQ.
- **Color strategy:** Restrained: Gallery neutrals, one action blue; a dark featured tier and a dark band as the only big contrast steps. Dark mode raises surfaces in lightness steps instead of inverting.
- **One primary action** in the first viewport, with at most one quiet secondary.
- **The preview proves the headline** instead of decorating it: The tabbed revenue board in the hero and the journey card in the feature split.

## Rules it keeps
- Real nouns and numbers in the copy, no hype words, no exclamation marks.
- 4px spacing grid, `gap` instead of margin stacks, the hero rhythm and viewport budget from SKILL.md section 9.
- Headline at 2–3 lines on desktop, `text-wrap: balance`, a `max-width` in `ch`.
- Craft floor: skip link to `main#main`, `:focus-visible` ring, `theme-color`, labels and `aria-hidden` on decoration, `prefers-reduced-motion`.
- At 390px: no horizontal scroll, no collisions, full-width CTAs where they stack.

## Against the undecided defaults
This example follows every undecided default, so it can be copied as is when the user hasn't stated preferences.
