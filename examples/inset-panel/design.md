# inset-panel: design

**Brief.** Get a sales lead to start a trial. The three cards under the button show the whole promise at a glance: leads engaged, replies rising, deals signed.

| | |
|---|---|
| Brand (invented) | Quotaline, a CRM that writes and sends sales follow-ups |
| Page title | Quotaline — the CRM that sends the follow-up for you |
| Visitor mode | Persuade |
| Use it for | B2B SaaS, CRMs, sales and marketing tools, any product with several small dashboards to show at once |
| Not for | developer tools that want a technical voice, or brands that can't carry a warm paper palette |

## First viewport (1440 × 900)
Nav on cream with a dark Contact sales pill; inside the panel an avatar stack with a count, a two-line serif headline at 88px, a two-line lead, the orange pill, then the connector lines and the tops of three cards crossing the fold.

See `web.jpg` for the desktop render and `mobile.jpg` for 390 × 844. `full.jpg` shows the whole page.

## Page structure
1. Hero panel with proof line, headline, lead, CTA and the three-card deck.
2. Logo strip: five invented wordmarks, each with its own drawn mark.
3. Intro row: serif heading left, one-sentence lead right.
4. Capability tabs (Outreach, Automation, Analytics, Integrations): each swaps the heading, paragraph, four features and the chart.
5. Testimonials: three plain quotes, the measurable claim highlighted, initials avatars.
6. Closing panel that repeats the hero's material with the price in the fine print.

## Components
- **CTA:** One orange pill, 56px tall, with a chevron; white text on #d4460f passes 4.5:1. The dark pill in the nav is the quiet secondary.
- **Proof:** An avatar stack with a count above the headline, and three testimonials whose highlighted phrase is a number or a concrete change.
- **Preview:** Three cream cards: a gauge with three progress rows, a pipeline card with stacked blocks and two comparisons, and a ledger with hatched quota bars. The center card sits higher and in front.

## Mobile (390px)
- Nav keeps the logo and Contact sales.
- Headline 46px in three lines; the CTA goes full width.
- Only the center card shows; the arch connector hides and the single line stays.
- Tabs become a 2 × 2 grid inside the dark track; features stack; quotes stack.

## Copying it
Copy `index.html`, keep the structure and spacing, and replace the brand, copy, data and (if the user has their own) tokens and fonts. All names, numbers and quotes in the file are placeholders.
