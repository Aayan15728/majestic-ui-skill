# dither-workspace: design

**Brief.** Open the app and start a task in one keystroke. The composer is the first thing; everything else answers 'what happened while I was away'.

| | |
|---|---|
| Brand (invented) | Mason, a coding agent's home screen |
| Page title | Mason — sessions |
| Visitor mode | Operate |
| Use it for | agent and AI tool home screens, developer consoles, start pages for apps that begin with a prompt |
| Not for | dense data tables or forms; the art needs breathing room |

## First viewport (1440 × 900)
The rail with New session and five recent sessions; the product name; the composer with attach, mode, speed and send; then two rows of glass cards.

See `web.jpg` for the desktop render and `mobile.jpg` for 390 × 844.

## Page structure
1. Sessions rail.
2. Composer: textarea, attachments, mode, Normal / Fast, dictate, send (Ctrl + Enter).
3. Cards: Activity, Recent sessions, Usage, Pull requests, This month.

## Components
- **CTA:** The round send button, disabled until there is text; submitting adds the session to the rail and confirms in a live region.
- **Proof:** Real-looking history: 26 weeks of activity, three open pull requests with status, month-over-month deltas.
- **Preview:** The screen is the product.

## Mobile (390px)
- The rail becomes a top bar with New session.
- Secondary composer tools hide; controls grow to 44px.
- Cards stack in one column; the heatmap shows 18 weeks.

## Copying it
Copy `index.html`, keep the structure and spacing, and replace the brand, copy, data and (if the user has their own) tokens and fonts. All names, numbers and quotes in the file are placeholders.
