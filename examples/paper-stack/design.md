# paper-stack: design

**Brief.** Show that the courses are built from real reading. The corner papers are the syllabus; the lab finder lets a visitor try the catalogue before signing up.

| | |
|---|---|
| Brand (invented) | Rungs, sequenced engineering courses with hands-on labs |
| Page title | Rungs — what staff engineers know, mapped |
| Visitor mode | Persuade |
| Use it for | courses, learning platforms, libraries, research and reading tools, content products |
| Not for | single-feature apps with one screenshot to show |

## First viewport (1440 × 900)
Nav with seven links, an offer pill, search and Sign in; a LIVE badge; a two-line headline; a two-line lead; a dark button and a text link; a live count; papers in all four corners.

See `web.jpg` for the desktop render and `mobile.jpg` for 390 × 844. `full.jpg` shows the whole page and `dialog.jpg` the coupon dialog open.

## Page structure
1. Hero with corner papers.
2. Labs: a search field with a mono label, three filter chips with counts, a live match count, nine cards, and an empty state with Clear search.
3. Coupon dialog (native dialog): ticket, code with copy, a one-hour countdown that starts on first open, one button.

## Components
- **CTA:** A dark 48px button with a darker bottom edge and an arrow, plus an underlined 'See a lab' link.
- **Proof:** '199 people studying right now' under the buttons; replace with a real live number or remove.
- **Preview:** The lab finder is the preview: type, filter, and the catalogue responds.

## Mobile (390px)
- Links and three of the papers hide; the reading note drops under the proof line.
- Headline 46px; the button goes full width.
- Chips grow to 44px; cards stack; the dialog's ticket shrinks.

## Copying it
Copy `index.html`, keep the structure and spacing, and replace the brand, copy, data and (if the user has their own) tokens and fonts. All names, numbers and quotes in the file are placeholders.
