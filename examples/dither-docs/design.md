# dither-docs: design

**Brief.** Let a developer read one concept, see it running, and copy the code. Everything except the article and its demo stays quiet.

| | |
|---|---|
| Brand (invented) | Grainkit, a component library for dithered graphics |
| Page title | Motion — Grainkit docs |
| Visitor mode | Read |
| Use it for | documentation, API references, component libraries, changelogs, any long technical reading page |
| Not for | marketing pages; it has no hero and makes no pitch |

## First viewport (1440 × 900)
Pill nav with logo, three links, search, star count and theme toggle; the tree with the current page marked; the title with Copy page and previous / next; a one-line summary, one paragraph, and the Preview / Code demo.

See `web.jpg` for the desktop render and `mobile.jpg` for 390 × 844. Both are the dark theme; `light.jpg` is the light one.

## Page structure
1. Header with actions.
2. Demo block: Preview and Code tabs, Replay and Expand.
3. Five short sections with anchors, a table and a code block.
4. Previous / next pager.

## Components
- **CTA:** None. The primary action is Copy page, a split button in the title row.
- **Proof:** The demo follows its own rules: it stops when off-screen or hidden, and holds one still frame under reduced motion (and says so).
- **Preview:** A 672 × 400 canvas: value noise thresholded by an 8 × 8 Bayer matrix, redrawn 12 times a second, colors read from the theme tokens.

## Mobile (390px)
- The tree collapses into one disclosure showing the current section.
- The pill nav keeps the logo, the current section, search and the theme toggle.
- Actions move under the title; tool labels hide and the buttons become 44px icons.
- The on-this-page list hides; heading links become full-width tap targets.

## Copying it
Copy `index.html`, keep the structure and spacing, and replace the brand, copy, data and (if the user has their own) tokens and fonts. All names, numbers and quotes in the file are placeholders.
