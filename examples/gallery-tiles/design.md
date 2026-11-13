# gallery-tiles: design

**Brief.** Sell a hand-sized speaker on one idea: it tunes itself to the room. Visitors should understand the product in one look and find Buy without hunting.

| | |
|---|---|
| Brand (invented) | Aurel One, a portable room-tuning speaker |
| Page title | Aurel One — a speaker that listens to the room |
| Visitor mode | Persuade |
| Use it for | hardware and consumer products, and any page where the user gave no fonts, colors or style |
| Not for | dense operational dashboards, or brands that already own a strong color |

## First viewport (1440 × 900)
Translucent 44px global nav, 52px product bar with a small Buy pill, a centered two-tone headline at 80px (one line on desktop), a 28px lead, two pills, then the product on its floor crossing the fold.

See `web.jpg` for the desktop render and `mobile.jpg` for 390 × 844.

## Page structure
1. Hero tile (white): headline, lead, Buy + Hear it in a store, product render.
2. Dark tile (#272729): a two-tone section headline, a short paragraph, one blue link, three stat cards with large numbers.
3. Parchment tile (#f5f5f7): a section headline and two white cards, each with a chip, a title, one line and the product.
4. Footer on parchment: one line of fine print and a copyright.

## Components
- **CTA:** Primary blue pill (Buy) plus an outline pill (Hear it in a store). Pills are 11 × 22px, 17px text, press scale(.95).
- **Proof:** Three stat cards on the dark tile (8 sec, 6 drivers, 20 hrs), each with a one-line meaning.
- **Preview:** A drawn product render (SVG) instead of a UI frame; hardware is the product, so the object is the proof.

## Mobile (390px)
- Global nav keeps two links, the rest hide.
- Product bar drops its text links and keeps Buy.
- Stage shrinks to 320px and the speaker to 210px; rings shrink with it.
- Stat cards and product cards stack into one column.

## Copying it
Copy `index.html`, keep the structure and spacing, and replace the brand, copy, data and (if the user has their own) tokens and fonts. All names, numbers and quotes in the file are placeholders.
