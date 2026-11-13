# AI unslopper

Use this file when a screen already exists and looks machine-made: an AI-generated page, a "vibecoded" dashboard, a template that was filled in without decisions. It turns that screen into one that looks designed, without changing what the product is. For new pages, SKILL.md and `direction.md` come first; this file is for fixing.

## Contents
1. The idea
2. Run it
3. Triage: how much to change
4. The five-line direction
5. The ten passes, in order
6. Visuals that belong to the product
7. Image treatments in code
8. The sign catalogue
9. The template trap
10. Never
11. Before/after story
12. Final check

---

## 1. The idea

Slop and craft differ in **where the richness goes**. A machine-made screen spreads color and effects across the chrome: glowing buttons, gradient backgrounds, tinted borders, emoji labels. A designed screen keeps the chrome quiet (neutral surfaces, one accent, plain hairlines) and spends all of its color, material and detail on **one or two moments of content**: a rendered object, a chart drawn with care, a scene from the product's world.

Cleaning is only half the job. A screen with every sign removed but nothing of its own is just the next template. Every unslop run must end with a screen that could only belong to this product.

## 2. Run it

1. **See the real thing.** Render the screen and take a screenshot before reading the code, so you judge what people see.
   - Only a live URL: save the page as HTML and screenshot it, then work on the copy.
   - Only a screenshot: rebuild it first as one static HTML file that matches closely, and treat that as the original (Recreate mode in `modes.md`).
2. **Audit.** Walk section 8 and write one line per sign you find, with where it lives (`file:line`, or the screen region).
3. **Triage** (section 3), then **write the direction** (section 4). If the user is present, show them the audit and the direction and wait for a yes before editing: changing direction later means redoing every pass. Skip the wait only if they already said "just do it".
4. **Fix in the ten passes**, in order, each one across the whole screen before the next. If nearly every line changes, plan the passes, then write the new screen in one go with every pass applied.
5. **Check** with section 12, render again, and compare against the audit list. Anything still listed gets fixed.
6. **Report** the direction, two or three lines per pass, and any image prompt you wrote but couldn't run.

Keep it quick: no more than three render-and-compare rounds per run.

## 3. Triage: how much to change

| What the audit shows | Mode | What you do |
|---|---|---|
| Many signs across color, type, icons and copy | **Full unslop** | all ten passes and a new direction |
| A mostly designed screen with a few signs | **Polish** | fix only the listed signs, take the direction from the existing brand, keep palette, type, layout and visuals; bigger ideas go in the report as suggestions |
| No real signs | **Leave it** | say so plainly, suggest at most three precise refinements with exact values, and apply them only if asked |

Never change a good screen just to make it different.

## 4. The five-line direction

Write these before touching any code. Take them from what the product does and who it serves, never from what is trending.

```
Product:    what it does and for whom, in one plain sentence
Character:  two or three concrete words ("calm, exact, a little warm")
World:      the place or material the product belongs to
Moments:    the one or two spots that get rich color and detail
Signature:  one small detail only this product would have
```

- **Character** may not use clean, modern, sleek, minimal or premium. Those words describe every template and decide nothing.
- **World** sets the tint of the neutrals, the accent and the visual. A notes app lives near paper and ink, a monitoring tool near instruments and night shifts, a travel app near maps and window light, an invoicing tool near receipts and ledgers.
- **Moments** come from what the product shows: a rendered card inside the preview, a chart whose every color means a series, an object from the world next to the content.
- **Signature** is one detail used consistently: a live status dot, keycaps, a hand-drawn underline, a route line. One, not five.
- A real brand (a logo file, a color, a typeface that isn't slop) is kept, and the direction is built around it. A violet-to-blue gradient, sparkles or a glow is not a brand, even when it sits in the logo, unless the user says it is.

## 5. The ten passes, in order

The order matters. Spacing first, because everything reads differently once the rhythm is right. Copy before type and layout, because the headline's length decides its size and position. Visuals and motion last, because they must fit a screen that already works without them.

### Pass 1: spacing
- Everything on a 4px grid: margins, paddings, gaps and fixed heights. A 2px nudge inside a small control is fine; odd values that exactly center something can stay.
- Same thing, same size: every row in a list shares one height and gap, every card in a row shares one padding.
- Space shows grouping: smaller inside a group than between groups. A section label sits closer to its own items than to the section above.
- Things line up: icons in one column, labels on one start line, numbers right-aligned in one column. No stray `translate` or one-off margin.
- Density follows the surface: compact panels and sidebars tight, cards roomier, page edges generous. Navigation is the densest part of an app and the first place spacing breaks; measure it after the pass.
- Replace every arbitrary value (`mt-[13px]`, `py-[11px]`) with a step from the scale.

### Pass 2: color
- One neutral ramp, tinted very slightly toward the world (graphite for most tools, warm for paper and craft, ink-blue for night and technical). Background, raised surfaces, hairlines and text all come from it.
- App and dashboard surfaces stay essentially grey; people look at them for hours. If the background reads as orange, brown, blue or green, it has gone too far. The world shows in the accent, the charts and the moments. Landing pages may tint further.
- Three text roles (primary, secondary, muted), not ten near-identical tints.
- One accent in the chrome, used rarely: the primary action, the selection, the one number that matters. Without a brand color, take it from the world; avoid the purple-to-blue family.
- Inside the moments, color can be rich, as long as every hue means something.
- Text on the accent, and accent used as text, reaches 4.5:1. Darken it or use dark text when it doesn't.
- On dark screens, an off-white primary button with dark text often looks more deliberate than a colored one.
- Remove hue-to-hue gradients on surfaces, gradient text, colored glows and shadows, radial washes and blobs, and neon borders. A gradient is allowed only as a tiny tone shift within one neutral.
- Hairlines are the text color at very low opacity. Dark screens get depth from surface steps; light screens from small, neutral, soft shadows (or none, under the undecided defaults).

### Pass 3: icons
- Every emoji used as an icon or as label decoration becomes a line icon from one set (the project's own, or one consistent library).
- One size and one stroke weight everywhere; icons take the color of their text role, never their own.
- Same icon box width in every row, fixed gap to the label.
- Drop icons that add nothing. Categories that need color get a small status dot.

### Pass 4: copy
- Headlines say what the product does for whom, in words that could not fit another product, using facts already on the page.
- No exclamation marks, no greeting headlines ("Welcome back, Sam 👋" becomes the page or the period: "October 2026").
- Short labels ("Search", not "Search anything…"). Changes say what they compare to ("+12% vs last month").
- No trailing periods on headlines, labels, buttons or captions.
- No hype words; no "AI-powered" on everything.
- Claims nobody can check ("Loved by 10,000+ teams", "10x faster") are confirmed with the user and made quiet and specific, or removed. List them in the report.
- Mock data looks real: plausible numbers and names, never `[X]` or `123,456`.
- "PRO", "New ✨" and "Beta 🚀" badges go unless the product truly needs them, and then become quiet text.

### Pass 5: type
- Pick type for the character, or keep the project's font if it is a real brand choice. A default nobody chose may be replaced. One interface family plus at most one partner (a mono for figures and meta, or a display face for big headlines only).
- Few sizes, two main weights (regular and medium), a semibold only for rare emphasis. Hierarchy comes from size and color, not from piling on weight. Very heavy headings are a sign unless the look is deliberately poster-heavy.
- Sentence case everywhere: uppercase, wide-tracked labels become normal words.
- Small text never gets negative tracking; tight tracking is for large display type only.
- Numbers use tabular figures and one format across the screen.
- Italic is not an emphasis tool in interface text. A deliberate italic in a display serif headline is a design move, not emphasis.

### Pass 6: layout
- Keep the sections and their order; inside a section, alignment and proportions may change.
- Apps keep real app proportions: a full-height shell, a sidebar of about a fifth of the width, fluid content capped at a comfortable maximum, and the page as long as its content. Never squeeze an app into a narrow centered column.
- The strongest landing hero is a **scene**: one image from the product's world fills the hero, its subject sits to one side, the headline sits on the calm empty part of the same image, and the product view rises from the bottom edge.
- Without a scene, use an asymmetric split (text one side, visual at least half the width) or text over a large product view. Everything stacked and centered is the template default; keep it only for a short hero.
- Long headlines align left; centered text works for one or two short lines.
- One primary action and at most one secondary. Log in is a quiet text link, not a second button.
- Compose the first screen as a whole: no dead band. If content is short, let the product view start low and run past the fold.
- On phones, stack in reading order and simplify dense previews (fewer rows and columns) instead of shrinking them.

### Pass 7: details
- Nested radius: inner radius = outer radius − the padding between them, never below 4px. Not everything is a pill.
- Counts and meta become quiet text (often mono, muted), not glowing pills. Shortcuts become small keycaps.
- Charts sit on a muted grid with muted mono labels. One main chart is clearly the biggest, drawn with care; anything else is smaller and different in kind (a ranked list with thin bars, a short table).
- One accent per chart, on the thing that matters; the rest in neutral steps. Several hues only to tell series apart, with one leading.
- Stat cards are numbers: label, figure, change with its comparison. No sparklines, tallies or icons as filler. A real-looking object is allowed when it is the very thing the number counts (a receipt beside paid revenue).
- Vary the grid: three or four compact stats above one wide chart, or a wide chart beside a narrow list. Equal cards with equal content read as a template.
- Pick the chart for the data: trend → line, comparison → bars, share → one stacked bar or a ranked list, single goal → progress bar.
- Active state is a small surface step with a hairline highlight. Hover and focus exist and stay in the palette.
- The logo is the product name in the main family plus a simple flat mark. No gradient wordmark, no sparkle tile, no glossy orb.

### Pass 8: visuals
- Decorative filler goes: glossy blobs, orbs, nebulas, floating cubes, glowing grids, holographic brains, robots.
- A landing hero gets a visual that shows something true (section 6). Dashboards rarely need images; their moments come from the product itself.
- The product view carries a moment, not just a plain card: a rendered object on a figure, a rich chart, a small object from the world.

### Pass 9: motion
- Remove looping motion on things that aren't live (pulse, ping, breathing glows, shimmer on headings), floats and parallax.
- Remove catch-all transitions, bouncy springs and hover scale on cards.
- Keep motion that explains: a quick color or surface change on hover, a tiny scale-down on press, a menu fading and rising a few pixels from its origin, a number tweening when it changes.
- Animate only color, background, border, opacity and transform, with one easing curve and a few durations. One short entrance on load, with a small stagger.

### Pass 10: the template check
Swap the product's name for a competitor's. If the screen would still fit, push the direction harder in the copy, the visual and the signature until it doesn't.

## 6. Visuals that belong to the product

1. **Does it need one?** Dashboards, settings and most app screens don't. Landing heroes and empty states usually do.
2. **Write the scene as one sentence** from the world and character. If it can't be said in one sentence, it isn't clear yet. Shapes of a good sentence (derive your own): a backup tool → a small lighthouse on a dark rocky coast, its beam reaching into fog; a meditation app → one cup of tea steaming on a windowsill at first light.
3. **Show the product under it,** or as the visual when there's no image tool: a coded preview of the one moment that proves the headline (one week with a booked slot, one diff with a comment, one streak on one card), with plausible data.

**Styles that work** (pick one and keep it for the whole page):
- painted background art: a calm sky or landscape with one subject and open space for text
- a cinematic photo of one real object in simple dramatic light
- soft stylized 3D: one small matte scene or object in gentle light
- a product object render: a card, a phone, a parcel, studio-lit with true materials
- light and optics: one physical phenomenon on a dark field
- engraving or print: one ink on a tinted page, but only when the whole page lives in that world
- a code treatment over an image (section 7)

**What fails:** asking an image model for grain or texture (it bakes in a checker pattern; add texture in code), a print style on one image of an otherwise plain page (reads as a filter), busy collages, and purple-blue glossy abstractions of any kind.

**Objects for moments:** one object, studio-lit, on a plain background in the exact page color, at the angle the layout needs, cut out or masked into the page, overlapping the edge of a card a little rotated with a soft shadow in the ramp's darkest tone. Everything in one visual tells the same story: the invoice number in the list matches the one on the phone.

**Generating:** when an image tool is available, show the user the prompt, model and size and ask before running it. Run once, judge against the sentence and palette, and change the prompt rather than rerolling. Save into the project's assets. Without a tool, build what you can in code, write the prompt in the report, and leave an empty slot of the exact size (a plain surface step, no text in it) so nothing half-finished ships.

**Prompt recipe, in order:** subject (the sentence) · setting · light and palette (name the page background color so edges blend, and the light direction) · one style · composition (where the subject sits so text has room; wide for a hero, calm lower fifth for the product view) · exclusions (no text, letters, logos, UI or watermark) · format (the slot's ratio at twice its display size).

**On the page:** WebP or AVIF at 2×, a real `alt`, edges matched to the page with a soft mask or a gradient into the page color (a hard rectangle of a different color is a sign), static or one slow subtle motion, high fetch priority and fixed dimensions for the hero.

## 7. Image treatments in code

Optional, and only on the main visual when it fits the character.
- **Glyphs:** redraw the image as a grid of characters, brightness choosing the character. Strongest when the characters come from the product's own material: digits and currency for finance, braces and slashes for code, note names for music, letters of a key word for writing, dots and bars for monitoring. Cells of 6–10px in the type system's mono. A few cells changing slowly keeps it alive.
- **Halftone:** dots on a grid sized by brightness, in one ink on the page color; suits editorial and crafted characters.
- **Dithering:** an ordered or error-diffusion dither into two or three ramp colors; suits retro, technical and playful characters. Do it once on load.
- **Duotone:** map brightness onto two colors (the darkest surface and the accent or primary text). The simplest way to make any image belong to the palette.

**Performance rules:** read pixels once when the image loads, never inside the animation loop; prepare glyph atlases ahead of time and draw them as images; animate at 8–12 steps a second and change only a few cells per step; pause when off-screen; cap the device pixel ratio at 2.

The bundled examples use these: `ascii-workspace`, `glyph-heritage`, `serif-globe` (glyphs), `riso-hills` (halftone and hatching), `pixel-forge` and `pixel-photo` (dithered pixels).

## 8. The sign catalogue

Each sign → its fix.

**Surfaces and color**
- purple-to-blue or violet-to-pink gradients anywhere → one neutral surface, accent only where it means something
- gradient text in headings, numbers or the logo → solid primary text
- colored glows (`0 0 20px` violet shadows, glowing pills, drop-shadow on emoji) → remove; depth from surface steps and hairlines
- radial washes or blurred blobs behind content → remove
- neon or saturated borders → a hairline at low opacity
- many near-identical tints for text → three roles from one ramp
- everything highlighted so nothing stands out → one accent, used once or twice
- glass cards with an inner white highlight and a colored shadow → a plain raised surface with a hairline

**Type**
- 800–900 weight headings → regular or medium, hierarchy by size
- uppercase wide-tracked labels → sentence case
- too many sizes and weights → a short scale, two weights
- mixed number formats (`$48,210` next to `$124,860.40`) → one format, tabular figures
- negative tracking on small text → zero or slightly positive
- italic used for emphasis in UI text → color or weight

**Icons**
- emoji as nav icons, label decoration or status → one line icon set, or nothing
- emoji inside counts (`18 👤`) → the plain number
- icons in many sizes and colors, or nudged off their column → one size, one stroke, one box width
- a sparkle for anything AI → remove, or a plain icon only where it explains something

**Spacing**
- arbitrary values (`mt-[13px]`, `h-[31px]`) → 4px steps
- uneven row heights or gaps in one list, uneven padding in sibling cards → one value each
- groups closer to their neighbors than to their own items → tighter inside, looser between
- a big gap above a section and a cramped one below → a balanced rhythm

**Copy**
- greeting headlines → the page or period as title
- exclamation marks, `!!` → plain statements
- changes with no reference (`+12%!!`) → `+12% vs last month`
- wordy placeholders (`Search anything...`) → `Search`
- hype words → what the thing actually does
- trailing periods on labels and buttons → none
- fake-looking data (`$123,456`, `[X]`) → plausible figures

**Components**
- glowing pills for counts, plans, shortcuts or status → quiet mono text or a keycap
- `PRO`, `New ✨`, `Beta 🚀` everywhere → removed, or one quiet text badge
- every element a full pill → radius by size, nested-radius math
- rainbow, glowing or pill-shaped chart bars, uppercase day labels → one or two series, muted grid, mono labels, one highlight
- every chart in several shades of the accent → neutral steps, accent on the one thing that matters
- sparklines and mini bars in every stat card → number, label, change
- equal cards side by side with the same chart → one main chart, compact stats, varied widths
- a gradient logo tile with a sparkle, or a glossy orb mark → the name as text plus a flat mark

**Landing pages**
- a pill badge like `✨ Introducing X 2.0` above the headline → remove, or a quiet link if it's real news
- a headline that fits any product → what this product does for whom
- shimmer or gradient on the headline → solid text
- floating blobs, orbs, grids and glowing lines behind the hero → a plain background or one real visual
- everything stacked and centered → an asymmetric split, or text over a large product view
- three or more buttons, or chips and avatars stacked under them → one primary, at most one secondary
- unsourced proof (`Trusted by 10,000+`, rows of avatar dots, five stars) → confirm, then quiet and specific, or remove
- parallax and float-on-scroll → static layout
- feature cards with an emoji, a bold title and a vague line → fewer features, concrete copy, line icons or none

**Visuals**
- glossy 3D blobs, chrome liquid, purple nebulae → the product itself or one concrete metaphor for what it does
- robots, glowing brains, circuits, holograms for anything AI → remove, or show what the AI produces
- text, fake buttons or fake logos baked into an image → real text on the page, a clean image
- an image with a hard edge and a different black than the page → matched background, soft mask
- a visual on every section → one, where it helps, usually only the hero

**Motion**
- pulse, ping or breathing glow on things that aren't live → static
- catch-all transitions and hover scale on cards and buttons → color or surface change, tiny press scale
- bouncy springs and overshoot → one ease-out curve
- everything flying in from different sides → one short fade and rise with a small stagger
- animating width, height, top or left → transform and opacity

## 9. The template trap

None of these are slop, but they're what a cleaned screen falls back to when nobody decided anything. Check for them after the passes:
- pure grey canvas, a default sans, white text and the old brand color on one button, for a product whose world is warm or bright → a ramp tinted toward the world and an accent from it
- a headline that would survive a name swap → the product's own nouns
- a hero visual that is an empty box or a generic picture → a coded product preview or an image from the world
- every product getting the same layout, type and palette → let the direction choose

## 10. Never

- Never rename the product, even when its name contains "AI". Keep a real logo. When the logo itself is slop (an emoji, a sparkle in a gradient tile), redraw it flat: the wordmark alone, or a simple glyph from the product's idea in one solid color.
- Never change what the product is: features, content and section order stay unless the user asks. Placeholder content that means nothing may be replaced with content that does.
- Never replace removed decoration with new decoration, or swap one trend for another (glass, grain, noise, neon, bento grids).
- Never invent features, claims or data.
- Never fall back to the same look for every product.

## 11. Before/after story (optional)

When the user wants something to share, build the change as a short morph instead of two screenshots: one page whose styles change step by step (spacing, then color and icons, then type and copy, then details), each step only adding CSS so padding, sizes, colors and radii tween in place in a wave from the top left. Mark the worst signs with red boxes for a first beat, show spacing measurements counting from the old value to the new one, and crop square and close on the part that changes most, about ten seconds long. The shipped result is still normal code in the project's own stack.

## 12. Final check

- [ ] The five-line direction is written and every pass follows it
- [ ] Every spacing value is on the 4px grid; equal things are equal
- [ ] Icons, labels and numbers each sit in one aligned column
- [ ] One tinted neutral ramp, three text roles, one accent with enough contrast
- [ ] No hue gradients, gradient text, glows, colored shadows or blobs
- [ ] No emoji left in the interface; one icon set at one size and stroke
- [ ] Type fits the character: few sizes, regular and medium weights, no tracked uppercase labels, no negative tracking on small text
- [ ] No exclamation marks, trailing periods on short strings, greeting headlines or unverified claims
- [ ] Numbers in one format with tabular figures
- [ ] Nested radii add up
- [ ] The hero has a real visual or a product preview with at least one moment
- [ ] The first screen is composed as a whole, with no dead band
- [ ] No looping or bouncy motion, one easing curve, no animated layout properties
- [ ] The name-swap test fails: the screen only fits this product
