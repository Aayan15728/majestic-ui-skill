# sections-kit: design

**Brief.** Show every common lower-page section at the same standard as the hero, with keyboard-correct interactions and a dark mode that keeps contrast.

| | |
|---|---|
| Brand (invented) | Sumlight, revenue analytics that ties each payment to the visit that started it |
| Page title | Sumlight — revenue analytics that names the post that paid |
| Visitor mode | Persuade |
| Use it for | any landing page that needs sections below the hero: pricing, comparison, calculator, FAQ, add-ons, footer; and as the reference for light and dark tokens |
| Not for | single-screen heroes, or looks whose material is not flat (convert with references/sections.md) |

## First viewport (1440 × 900)
Nav with a theme toggle; a two-tone Geist Serif headline; a lead with one bold fact; a capture input; fine print; the tabbed revenue board crossing the fold.

See `web.jpg` for the desktop render and `mobile.jpg` for 390 × 844.

## Page structure
1. Hero + tabbed board (7 / 30 / 90 days, line chart and top sources).
2. Feature split: copy, tag, quote with avatar left; a three-step customer journey right.
3. Logo row of invented wordmarks, then a full-bleed dark band with five verbs.
4. Bento: five cells of different spans, each with a small real artifact (code, alerts, funnel, billing tiles, files).
5. Pricing: billing switch, three tiers with the featured one dark, strike-through yearly prices, an included-features grid, a footnote.
6. Comparison table: sticky first column, highlighted column, check and cross icons with text alternatives, horizontal scroll on phones.
7. ROI calculator: four labelled ranges with outputs, a dark result card with a live region, bars and an honest estimate note.
8. Add-ons: four cards with a blue lead-in phrase, a serif price and a round arrow; the whole card is the hit area.
9. FAQ: details/summary in a shell; the open item becomes a white card.
10. Closing line, one button, then the footer with link columns and dotted hills.

## Components
- **CTA:** Primary blue pill and an ink pill in the nav; capture input in the hero; the same pill spec repeated in every tier and the closing.
- **Proof:** A quote with name and company, a logo row, the journey timeline, and the board numbers (all placeholders).
- **Preview:** The tabbed revenue board in the hero and the journey card in the feature split.

## Mobile (390px)
- Nav links and Log in hide; the theme toggle stays.
- The board stacks its sources under the chart, tabs stretch to 44px.
- Pricing stacks with the featured tier first.
- The table scrolls inside its shell with the first column pinned, plus a swipe hint.
- Bento, calculator and add-ons become one column; footer columns go 2 × 2.

## Copying it
Copy `index.html`, keep the structure and spacing, and replace the brand, copy, data and (if the user has their own) tokens and fonts. All names, numbers and quotes in the file are placeholders.
