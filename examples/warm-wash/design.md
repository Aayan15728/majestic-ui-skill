# warm-wash: design

**Brief.** Convince founders to swap pageview analytics for one that ties visits to paying customers. The URL field is the first step, so the CTA is a capture input.

| | |
|---|---|
| Brand (invented) | Openlytics, privacy-friendly web analytics that counts customers |
| Page title | Openlytics — analytics that counts customers |
| Visitor mode | Persuade |
| Use it for | light SaaS, analytics and B2B tools |
| Not for | dark or moody brands, or anything that must feel austere |

## First viewport (1440 × 900)
Centered nav with logo left and Log in right, a mono badge in corner brackets, a two-line Funnel Display headline, a lead, a 52px capture input with an inset button, fine print, and the dashboard rising over the fold.

See `web.jpg` for the desktop render and `mobile.jpg` for 390 × 844.

## Page structure
1. Hero with capture input.
2. Browser-framed dashboard with revenue by source, the one chart that proves the headline.

## Components
- **CTA:** Capture: a 52px tall, ~460px wide input with an icon and an inset coral button, radius 12.
- **Proof:** Fine print with the trial and price under the input; the dashboard numbers are the proof.
- **Preview:** Browser chrome around a revenue-by-source dashboard.

## Mobile (390px)
- Links hide, input goes full width.
- Hairlines and grid shrink; the dashboard drops its sidebar.

## Copying it
Copy `index.html`, keep the structure and spacing, and replace the brand, copy, data and (if the user has their own) tokens and fonts. All names, numbers and quotes in the file are placeholders.
