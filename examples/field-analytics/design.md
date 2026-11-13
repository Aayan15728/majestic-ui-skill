# field-analytics: design

**Brief.** Answer 'how are we doing this quarter' in one screen: money first, then hours, then delivery. Every chart has one highlighted thing.

| | |
|---|---|
| Brand (invented) | harlow.studio, a studio's revenue and delivery dashboard |
| Page title | Analytics — harlow.studio |
| Visitor mode | Operate |
| Use it for | dashboards, analytics, admin panels, any product screen with several chart types |
| Not for | landing pages; use it as the preview inside one instead |

## First viewport (1440 × 900)
Sidebar; breadcrumb and bell; title, one-line summary, period switch, Filter and Export; three KPI cards; the revenue chart and billing flow; the top of the third row.

See `web.jpg` for the desktop render and `mobile.jpg` for 390 × 844. `full.jpg` shows the whole screen.

## Page structure
1. Sidebar: workspace switcher, three groups, settings, storage.
2. Header and toolbar.
3. KPI row.
4. Revenue (line + previous period, range switch, tooltip) and Billing flow.
5. Billable hours, Tasks shipped, Top clients.
6. Delivery health and Shared folders.

## Components
- **CTA:** Export is the one dark button; everything else is a quiet control.
- **Proof:** Every figure has a comparison: a delta chip, a previous-period line or a target.
- **Preview:** The screen is the product.

## Mobile (390px)
- The window goes edge to edge and the sidebar becomes a drawer behind a menu button (Escape closes it).
- Cards stack; the chart is redrawn at the real width so labels stay 12px.
- Segmented controls grow to 44px; folders go two by two.

## Copying it
Copy `index.html`, keep the structure and spacing, and replace the brand, copy, data and (if the user has their own) tokens and fonts. All names, numbers and quotes in the file are placeholders.
