# Direction: deciding what the page is before styling it

Read this before writing CSS for a new page, a redesign, or any look that isn't already fixed by the project. It turns a brief into one committed direction and keeps the page out of the handful of looks every generated site lands on.

## Contents
1. Who the page is for: visitor modes
2. What already exists
3. Find the world
4. Light or dark
5. Color strategy
6. Typefaces
7. The generated-site looks to steer away from
8. Viewport budget
9. Tests before you build
10. The direction contract
11. Refining an existing page

---

## 1. Who the page is for: visitor modes

Name the mode from the surface being built, not from the company. A developer tool's landing page is still Persuade, and a fashion brand's help center is still Read.

| Mode | The visitor succeeds when they… | Ambition shows as | Examples |
|---|---|---|---|
| **Persuade** | decide and act | a bold, specific point of view, one memorable moment | landing pages, pricing, launches |
| **Operate** | finish a task | precision, consistency, familiar patterns, density that fits frequency | dashboards, editors, settings, admin |
| **Read** | understand something | structure, measure, wayfinding, a reading experience worth staying in | docs, articles, changelogs, guides |
| **Experience** | spend time inside the work | the artifact leads from the first screen and the interface steps back | portfolios, galleries, showcases |

Persuade and Experience earn the bolder atmospheres and color strategies. Operate and Read put the brand into small, exact details and keep structure predictable (see `app-ui.md`).

## 2. What already exists

- **The brief wins.** A font, palette, era, material or reference site the user named is binding, even when this skill would pick differently. Steering a clear brief toward your own taste is a failure.
- **Refine keeps, redesign replaces.** A refinement keeps the identity, copy, behavior and everything outside its scope. A redesign keeps the product's facts and function but treats the old look as evidence, not authority. Never split the difference by polishing a look you were asked to replace.
- **An existing identity counts even without a design doc.** Coherent tokens and components in the code are the system; document them instead of inventing a new one.
- **Additions inherit.** A new section, state or feature inside an established page never becomes a new identity exercise.

## 3. Find the world

When the look is genuinely open:
1. Write the product's unique mechanism in one sentence, and the audience's real scene (who, where, doing what).
2. Name the page this category always ships, and its predictable opposite. Both are off the list.
3. List five to seven concrete things from the audience's own world: objects, places, publications, rituals, notations, signage, the graphic traditions they read every day. One line each on why it fits the mechanism and what it looks like (ground color, type voice, the one recognizable mark). Spread them over at least three material families (paper, light, metal, fabric, screen…). Ask what the product would be as a physical object, and what its world looked like before the web.
4. Pick by two tests only: does the audience recognize it as theirs, and does it make the product clearer? Then map it onto the closest example in `examples/` and build.

Every claim the direction shows must be true. Demonstration data can be invented and labelled as placeholder; prices, customers, benchmarks and capabilities cannot.

## 4. Light or dark

Never pick by category ("dev tools are dark"). Write one sentence of physical scene, for example "a freelancer checking numbers on a laptop in a bright café", and let the light in that scene decide.

## 5. Color strategy

Choose the strategy before choosing colors:

| Strategy | What it means | Fits |
|---|---|---|
| **Restrained** | tinted neutrals plus one accent with real jobs (action, selection, one highlight) | most Operate and Read surfaces, and the undecided default |
| **Committed** | one saturated color owns 30–60% of the surface | confident Persuade pages |
| **Drenched** | the surface is the color | campaigns, launches, one-idea pages |
| **Full palette** | three or four named color roles | playful brands, illustration-led work |

Color commits at region scale: a field that owns a whole area beats accents sprinkled over a grey page. On a colored surface, secondary text is a tint of that surface's hue or of the foreground, never generic grey. When the user hasn't decided, stay Restrained with the Gallery palette and avoid purple and blue gradients.

## 6. Typefaces

Treat a typeface like an object from the subject's world. Operate and Read surfaces do well with one workhorse family (Geist is the undecided default). Persuade and Experience surfaces deserve a face with a point of view, but these faces are so common in generated pages that each needs a reason no other face could meet: Fraunces, Playfair Display, Cormorant, Lora, Crimson, Newsreader, Syne, Space Grotesk, Space Mono, IBM Plex, Inter (anywhere, unless the user or project already chose it), DM Sans, DM Serif, Outfit, Plus Jakarta Sans, Instrument Sans, Bricolage Grotesque. "It's a book product, so serif" is the association the list exists to break. Bricolage Grotesque is never used unless the user asks for it.

## 7. The generated-site looks to steer away from

Generated interfaces cluster into a few looks whatever the subject. Each is fine when the brief asks for it, and several bundled examples are built on them for users who pick that look. When the brief leaves the look open and you land in one, the direction failed and needs rework:
- warm cream ground, a high-contrast serif display face and a terracotta or signal-red accent
- near-black with one neon accent and glowing edges
- broadsheet hairlines, an italic display serif and small tracked mono labels
- flat saturated color with black boxes, hard offset shadows and heavy condensed type
- a purple-to-blue gradient hero with a glassy card and a sparkle badge
- the tasteful default: a cream page, a thin serif display face with one italic accent word, and pill buttons. It looks considered, which is why every generator lands on it
- one neutral grotesk for every role, display included, with nothing that gives the page a voice

The check: if someone could guess your look from the product category alone, or from "the category plus what the skill told you to avoid", keep working.

## 8. Viewport budget

Crowding is the fastest way to look generated. The first viewport holds **at most six things**: the nav, one badge or proof line, the headline, the lead, one CTA group (one primary, at most one quiet secondary) and one visual. Fine print under the CTA counts as part of the CTA group.
- **AVOID** a second CTA row, a feature grid, a logo wall, a stats row and a testimonial all above the fold. Pick the one that proves the headline; the rest go below.
- **AVOID** more than about four things competing for attention at once anywhere on the page. A dense section earns a quiet one after it.
- Every later section has one job and one focal point. If a section needs two headings to explain itself, it's two sections.

## 9. Tests before you build

- **Memory test:** if someone left after the first viewport, what would they describe an hour later? A mood isn't an answer; a specific object or moment is.
- **Squint test:** blur the render. You should still see the primary element, the secondary element and the groups, in that order.
- **Skeleton test:** strip all copy. Does the structure alone still say what this is and why it matters? If only the words carry it, the design is just big text.
- **Swap test:** could a competitor paste the headline onto their page unchanged? Rewrite it.
- **Category test:** could the look be guessed from the category? See section 7.

## 10. The direction contract

Write it in your plan (never in the shipped page), in about 150 words, alongside the contract in `modes.md`:
```
THESIS:          the one idea this page owns, and the category-default layout it refuses
WORLD:           palette, type and component language, recognizable with all copy removed
STORY:           what the visitor understands, believes and does, in order
FIRST VIEWPORT:  exactly what sits where, at what scale, and where the primary action is
FORM:            the example it builds on and what changes
```
If a line reads like a mood ("clean and modern"), the direction isn't decided yet.

## 11. Refining an existing page

Each refinement keeps the page's identity and touches only its target:

| Request | What it means |
|---|---|
| **Bolder** | raise one named section to the strength the rest of the system already has: its own type scale at full size, its own motif, a change of pace. Fewer, larger moves, never more effects, and no new colors, fonts or shadows. |
| **Quieter** | less saturation, lighter weights (900 → 600), more space, fewer decorations and less motion, while keeping a point of view. Quiet without intent collapses into grey-on-white generic. |
| **Distill** | find the one goal, keep what serves it, merge or remove the rest: one primary action, one family, 3–4 sizes, 1–2 colors plus neutrals, no nested cards. |
| **Polish** | fix broken paths first, then missing states, then hierarchy and drift, then visual and motion details, then cleanup. Never a hidden redesign. |
| **Harden** | long and missing content, translation growth, slow and offline networks, permissions, errors with recovery. |
| **Typeset** | clear role scale, 45–75ch measure, line height tuned to the face, one family unless a second has a job only it can do. |
| **Colorize** | give color a role (action, state, wayfinding, one region), not decoration. |
| **Clarify** | labels name actions, errors name the problem and the fix, the product's own words throughout. |
| **Adapt** | restructure for the screen (reorder, collapse, reveal), not just shrink. |
| **Delight** | one product-specific moment at a meaningful point (first use, completion, recovery), never a celebration for an ordinary click. |
| **Layout** | fix the rhythm: one spacing scale, groups tight inside and generous between, one alignment axis per section, the viewport budget. No new components. |
| **Animate** | one motion with a reason (cause and effect, or the page's one authored moment), on the page curve, with reduced motion respected. Remove motion that has no reason. |
| **Optimize** | what the visitor feels: image sizes and formats, font loading and fallbacks, layout shift, script on the main thread, the time until the hero is usable. |
| **Onboard** | first run and empty states that teach: one next step, an example to start from, nothing that needs a tour. |
| **Go all out** | for a showpiece only: one technically ambitious moment (a drawn scene, a live demo, a scroll-linked sequence) that still serves the brief, with a fast fallback and reduced motion respected. Everything around it stays calm. |
