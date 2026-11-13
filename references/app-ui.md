# App and dashboard screens

Marketing pages persuade. App screens get work done. The landing-page rules about atmosphere and signatures relax here; clarity, density and trust take over. People live in these screens for hours, so familiar beats clever.

## Start from a product-screen example
| Screen | Copy | It shows |
|---|---|---|
| Dashboard, analytics, admin | `examples/field-analytics` | grouped sidebar, KPI cards, line chart with a keyboard tooltip, flow bands, bars, dot heatmap, rings, health list, folder tiles, a drawer on phones |
| Docs, reference, changelog | `examples/dither-docs` | pill nav, section tree, article with a live demo, on-this-page list, light and dark |
| Agent or tool home | `examples/dither-workspace` | sessions rail, prompt composer, activity heatmap, status lists over quiet art |

Check product screens with `verify-render.mjs --app`: it keeps every contrast, focus, keyboard, overflow and font check, and skips the two landing-page rules (hero headline size, first-screen budget).

## The job comes first
- Say in one line what this screen is for, who uses it, and the one action they come here to take. The layout should make that action the most obvious thing on screen.
- Show where people are (page title, active nav item, breadcrumb) and what they can do next.
- Match density to the work. An operator scanning 200 rows wants compact tables, 32–36px rows and 13–14px text. A first-run setup screen wants room. Never pad a power tool to look "airy".

## Structure
- Use standard parts people already know: a sidebar or top nav, tabs, tables, forms, menus, dialogs, toasts. Don't invent a new navigation model for a settings page.
- Group with spacing and alignment first. Add a border, a background or a card only when spacing alone can't show the group. Cards inside cards inside cards is a smell.
- Keep one component vocabulary across the product: one button set, one input style, one table style, one radius scale.
- A page title of 24–32px is right here; hero-size headlines belong on landing pages.
- Sidebar: a workspace switcher on top, two to four labelled groups, counts as quiet chips, settings and quota at the bottom, the current item marked with `aria-current`.
- File and folder tiles: a drawn object (back, sheets, front flap in two tones of one hue), a name and one meta line; the whole tile is a link and the sheets lift on hover and focus.
- Proportions that work: sidebar 240–280px, header 56–64px, content capped around 1440–1600px, page padding 24–32px.
- Charts: one main chart is clearly the biggest thing, on a muted grid, with one accent on the series that matters. **One highlight per chart** (the current line, today's bar, the top ring); every other series is a neutral or a tint of the same accent, never a rainbow. Tooltips must work from the keyboard (`interactions.md` §11). Supporting data is a ranked list or a small table, not a second chart of the same size. A stat card is a label, a number and its change with what it's compared to ("+12% vs last month"). No sparklines added just to fill the space.

## States are the product
Design and wire every reachable state, not only the happy one:

| State | What it needs |
|---|---|
| Loading | a skeleton shaped like the real content; the shell stays put |
| First use / empty | why it's empty, plus the one action that fills it |
| No results | the active filter, and a way to clear it |
| Error | what failed, whether data is safe, and a retry or recovery path |
| Partial / degraded | what works and what doesn't |
| Disabled | why it's disabled, on hover or in helper text |
| Success | a quiet confirmation (toast or inline), then out of the way |
| Too much | long names truncate, big numbers abbreviate, long lists virtualize |
| Permissions | what a viewer sees versus an editor, without broken controls |

## Interaction
- Menus, popovers and tooltips must never be clipped by a scroll container; portal them above.
- Selection, sorting, filters and open panels live in the URL.
- Bulk actions appear when rows are selected, and destructive ones ask or offer Undo.
- Keyboard: list navigation with arrows, Escape closes the topmost layer, and the common actions have shortcuts shown in menus.
- Keep motion short and functional (120–200ms) for opening, closing and confirming. Don't choreograph routine page loads.

## Responsive
- Decide structurally what happens on small screens: the sidebar becomes a drawer, tables become cards or scroll horizontally inside their own container, and toolbars collapse into an overflow menu. Important actions stay reachable.

## Finish
- Use the screen with real-looking data at the widths people actually use, fix what blocks the task or breaks consistency, and leave working areas outside the request alone.
