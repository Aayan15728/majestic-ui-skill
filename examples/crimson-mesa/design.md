# crimson-mesa: design

**Brief.** Make a workflow tool feel like a place worth going. The scene carries the mood; the run log just below the fold proves the three claims in the lead.

| | |
|---|---|
| Brand (invented) | Knotwork, workflow automation with typed, replayable runs |
| Page title | Knotwork — ship the workflow, skip the glue code |
| Visitor mode | Persuade |
| Use it for | developer platforms, automation and infrastructure tools, launches that want one unforgettable image |
| Not for | products that need to look calm or clinical, or pages that must show UI in the first screen |

## First viewport (1440 × 900)
A hairline-ruled nav with links left, the mark centered and Log in / Sign up right; a funding badge; a two-line headline; a two-line lead; two buttons sitting just above the horizon; the mesas either side and the figure below the buttons.

See `web.jpg` for the desktop render and `mobile.jpg` for 390 × 844.

## Page structure
1. Hero over the painted scene.
2. Run log: a heading with a grey second sentence, three plain points, and a log card with four typed steps, an approval waiting on a person, and Replay.

## Components
- **CTA:** A white button and a dark glass button, both 52px tall with a 10px radius, side by side.
- **Proof:** A one-line funding badge above the headline (replace it with a real one or remove it), and the run log.
- **Preview:** Below the fold: a run log card with step inputs and outputs in Geist Mono, durations, and Approve / Reject on the waiting step.

## Mobile (390px)
- Links hide; the logo moves left.
- Headline 44px in three lines; buttons stack full width.
- The scene is repainted for the narrow view: horizon lower, mesas pushed to the edges, so nothing sits behind the text.
- The log's code lines wrap; footers stack.

## Copying it
Copy `index.html`, keep the structure and spacing, and replace the brand, copy, data and (if the user has their own) tokens and fonts. All names, numbers and quotes in the file are placeholders.
