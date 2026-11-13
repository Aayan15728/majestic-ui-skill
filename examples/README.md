# Examples

Thirty-eight complete reference pages: thirty-four landing pages, three product screens (docs, an agent workspace, a dashboard) and one kit of lower-page sections. Each folder holds one page and everything an agent needs to copy it well:

| File | What it is |
|---|---|
| `index.html` | the page itself, self-contained except for fonts in `../fonts/` |
| `web.jpg` | the first viewport at 1440 × 900 |
| `mobile.jpg` | the first viewport at 390 × 844 |
| `design.md` | the brief, who it's for, the first-viewport composition, page structure, components and mobile behavior |
| `style.md` | the exact tokens: colors, fonts and weights, radii, motion |
| `principles.md` | why it works, the rules it keeps, and which undecided defaults it breaks and how to adapt it |

## Rules for using an example
1. **Pick by what the product is,** using the table below. Say in one line why the look fits.
2. **Look before reading.** Open `web.jpg` and `mobile.jpg`. That is what "done" means.
3. **Read in order:** `principles.md` (what must survive), then `design.md` (the structure), then `style.md` (the values).
4. **Copy `index.html`** and replace the brand, copy, data and assets. Keep the structure, spacing and details.
5. **Apply the user's preferences first.** Their fonts, colors and style always win over the example.
6. **If the user hasn't decided,** apply the undecided defaults from SKILL.md: Geist only, the Gallery palette, and none of the avoid list (drop shadows, Bricolage Grotesque, purple, blue gradients, gradient backgrounds, crowded viewports). Each `principles.md` lists exactly what to change. `gallery-tiles` needs no changes.
7. **Never ship the invented brands,** names or numbers from these files.
8. **Pass the gate** in SKILL.md section 15 and run the lint (with `--defaults` when the user stated no preferences).

## Index
| Folder | Brief | Use it for | Departs from undecided defaults |
|---|---|---|---|
| [`gallery-tiles`](gallery-tiles/) | Sell a hand-sized speaker on one idea: it tunes itself to the room. | hardware and consumer products, and any page where the user gave no fonts, colors or style | none |
| [`ascii-workspace`](ascii-workspace/) | Show developers that all their coding agents can share one local workspace. | open-source and developer desktop tools | 1 |
| [`bold-yellow`](bold-yellow/) | Get Android developers past the closed-testing requirement fast. | services, conversion and offer pages | 1 |
| [`cinematic-black`](cinematic-black/) | Show Mac power users that everything they copied is one keystroke away. | premium desktop apps and utilities | 1 |
| [`clear-sky`](clear-sky/) | Get people to download the desktop app. | desktop and mobile consumer apps, assistants, productivity tools that run beside other apps | 3 |
| [`crimson-mesa`](crimson-mesa/) | Make a workflow tool feel like a place worth going. | developer platforms, automation and infrastructure tools, launches that want one unforgettable image | none |
| [`dark-highlight-pill`](dark-highlight-pill/) | Show creators they can record and polish a demo in one app. | Mac creative and recording apps | 3 |
| [`dark-split`](dark-split/) | Sell a starter kit to developers who want to launch this week. | boilerplates, kits, bundles and courses | 1 |
| [`dither-docs`](dither-docs/) | Let a developer read one concept, see it running, and copy the code. | documentation, API references, component libraries, changelogs, any long technical reading page | 1 |
| [`dither-workspace`](dither-workspace/) | Open the app and start a task in one keystroke. | agent and AI tool home screens, developer consoles, start pages for apps that begin with a prompt | 2 |
| [`dusk-range`](dusk-range/) | Get Mac users to download the trial. | consumer and prosumer desktop apps, creative tools, anything with a calm, scenic voice | 2 |
| [`electric-swirl`](electric-swirl/) | Show engineers the one log line that broke production. | developer tools, observability and infrastructure | 3 |
| [`field-analytics`](field-analytics/) | Answer 'how are we doing this quarter' in one screen: money first, then hours, then delivery. | dashboards, analytics, admin panels, any product screen with several chart types | none |
| [`fluted-glow`](fluted-glow/) | Get platform and security teams to try a control point for agent actions. | security, governance and infrastructure brands that want drama | 3 |
| [`glyph-heritage`](glyph-heritage/) | Fill a winter cohort of an ink-and-wash drawing course. | courses, cohorts, travel and culture products | 2 |
| [`gradient-frame`](gradient-frame/) | Get people to start saving without changing habits. | fintech and consumer mobile apps | 3 |
| [`inset-panel`](inset-panel/) | Get a sales lead to start a trial. | B2B SaaS, CRMs, sales and marketing tools, any product with several small dashboards to show at once | none |
| [`mountain-dawn`](mountain-dawn/) | Get climbers to plan tomorrow's route with sun timing and snow lines. | outdoor, travel, maps and calm premium brands | 1 |
| [`paper-canvas`](paper-canvas/) | Get designers and engineers to download the app. | design and creative tools, editors, documentation and writing products | 1 |
| [`paper-stack`](paper-stack/) | Show that the courses are built from real reading. | courses, learning platforms, libraries, research and reading tools, content products | none |
| [`pastel-dreamscape`](pastel-dreamscape/) | Win briefs for soft, playable 3D brand worlds. | 3D and design studios, agencies and portfolios | 2 |
| [`peak-agency`](peak-agency/) | Get founders and marketing leads to book a call with the studio. | agencies, studios, consultancies and services that sell craft | 1 |
| [`pixel-forge`](pixel-forge/) | Get people to type their first prompt. | creative AI tools, games, pixel and retro products | none |
| [`pixel-panel`](pixel-panel/) | Show that agents can work right where files already live. | Mac and productivity apps | 2 |
| [`pixel-photo`](pixel-photo/) | Get developers to start building travel booking into their agents. | APIs and infrastructure with a lifestyle angle: travel, food, events, mobility | 2 |
| [`playful-warm`](playful-warm/) | Show creators that dull numbers can become posts people stop for. | creator and indie tools that want to feel playful | 3 |
| [`riso-hills`](riso-hills/) | Get video editors to upload a cut and hear a fitted soundtrack. | creative tools, music, film, media and anything with a warm, made-by-hand voice | none |
| [`rock-dashboard`](rock-dashboard/) | Get product teams to try guided onboarding. | B2B SaaS with a real product UI to show, growth and analytics tools | 2 |
| [`sections-kit`](sections-kit/) | Show every common lower-page section at the same standard as the hero, with keyboard-correct interactions and a dark mode that keeps contrast. | any landing page that needs sections below the hero: pricing, comparison, calculator, FAQ, add-ons, footer; and as the reference for light and dark tokens | none |
| [`serif-cursors`](serif-cursors/) | Show two people editing one budget at the same time. | collaborative and shared tools, couple and family apps | 1 |
| [`serif-globe`](serif-globe/) | Get creators and software makers to move their store over by showing a checkout that already handles tax. | payments, commerce infrastructure, developer platforms with a premium feel | none |
| [`serif-phone`](serif-phone/) | Introduce an assistant you text like a friend. | consumer apps, assistants and mobile-first products | 1 |
| [`serif-stats`](serif-stats/) | Get makers to list their product today by proving the directory sends traffic. | directories, communities, ads and media pages | 1 |
| [`shape-flanks`](shape-flanks/) | Get growth teams to book a demo by framing growth as engineering. | B2B platforms that want to feel crafted and a little playful, agencies, design-led tools | none |
| [`stream-lines`](stream-lines/) | Get teams with inference bills to talk to sales. | AI infrastructure, routing, APIs, data pipelines | none |
| [`voice-ribbon`](voice-ribbon/) | Show that you can talk instead of type. | AI writing, voice and transformation tools | 1 |
| [`warm-grey-glow`](warm-grey-glow/) | Get freelancers to hand over their books. | bookkeeping, finance and B2B dashboards | 3 |
| [`warm-wash`](warm-wash/) | Convince founders to swap pageview analytics for one that ties visits to paying customers. | light SaaS, analytics and B2B tools | 2 |

`gallery-tiles` is the default: start there when the user gave no fonts, colors or style.
