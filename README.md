# majestic-ui

An agent skill for building interfaces that hold up next to the best sites on the web: landing pages, app screens, dashboards and components.

## What's inside

| Path | What it is |
|---|---|
| `SKILL.md` | the workflow, the AVOID / ADD / KEEP rules and the 12-point quality gate |
| `SUMMARY.md` | one page with every shared rule and a five-step fast path, for short context or rushed runs |
| `references/modes.md` | build, redesign, polish, simplify, audit with a usability score, recreate, showpiece, refine; the contract |
| `references/direction.md` | choosing a look: visitor modes, finding the world, color strategy, overused faces, the viewport budget, the direction contract |
| `references/sections.md` | the lower page: section order, feature split, bento, pricing, comparison table, calculator, add-ons, FAQ, footer, and how each look carries its material down the page |
| `references/interactions.md` | accessible plain-JavaScript widgets: accordion, disclosure, switch, tabs, calculator, theme toggle, SVG chart, menus and dialogs |
| `references/nextjs.md` | building in Next.js: where each part of an example goes, `next/font`, tokens in CSS or Tailwind, server and client components, canvas, light and dark, checks in CI |
| `references/design-to-code.md` | turning a design image or screenshot into code: measure, build in passes, score, repeat |
| `references/shadcn.md` | using shadcn/ui prebuilt components and re-theming them to the project's tokens |
| `references/interface-rules.md` | the interface craft floor: keyboard, focus, forms, motion, content, performance, theming, locale, copy |
| `references/app-ui.md` | product and dashboard screens, density, and every state |
| `references/components.md` | reusable components: levels, API conventions, tokens, data attributes, keyboard maps |
| `references/aiunslopper.md` | fixing an existing AI-looking screen: triage, direction, ten passes, visuals, image treatments, the sign catalogue |
| `references/default-theme.md` | the defaults when the user states no preferences (Geist only, the Gallery palette, flat depth) and the light/dark token table |
| `examples/README.md` | the index of all 38 examples (34 landing pages, 3 product screens, 1 section kit) with a brief for each and the rules for copying them |
| `examples/<name>/` | one example: `index.html`, `web.jpg`, `mobile.jpg`, `design.md`, `style.md`, `principles.md` |
| `examples/sections-kit/` | every lower-page section in light and dark, plus `full.jpg` and `dark.jpg` of the whole page |
| `starters/nextjs/` | `sections-kit` ported to Next.js 16 with `next/font`, light and dark, client islands, and `npm run check:ui` |
| `examples/fonts/` | the shared, OFL-licensed font files |
| `scripts/verify-render.mjs` | a real-browser check at 1440 and 390 (dark with `--dark`, product screens with `--app`): contrast over painted art, fonts really drawn, font budget, overflow, focus, widget keys; writes a side-by-side `compare.png` with a look code |
| `scripts/vendor-fonts.mjs` | copies a page's fonts next to it (or inlines them, or adds a pinned CDN fallback) so they load wherever the file goes |
| `scripts/score-pages.mjs` | runs the lint and the render check over many pages and prints one ranked table, for comparing skill versions or design options |
| `scripts/extract-spec.mjs` | reads a design image into a spec: bands, boxes with radius and padding, text lines with sizes and colors, palette, zoomable tiles |
| `scripts/compare-image.mjs` | renders a page at a design image's size and scores structure, similarity and color, with the regions that differ and why |
| `scripts/inventory.mjs` | measures design sprawl in a codebase (colors, sizes, spacing, radii, shadows, button variants) and proposes consolidated tokens |
| `scripts/slop-lint.mjs` | a linter for slop tells, interface red flags and missing font files; `--defaults` also flags the undecided-default avoid list (Inter, drop shadows, Bricolage, purple, gradients) |

All scripts need only Node 22 or newer; the browser ones drive an installed Chrome, Chromium or Edge directly. 
## Install

Copy this folder into your agent's skills directory (for example `~/.claude/skills/majestic-ui`). Then, on any page:

```sh
node scripts/slop-lint.mjs path/to/page.html --defaults        # --defaults when the user gave no style preferences
node scripts/verify-render.mjs path/to/page.html --ref examples/gallery-tiles --out ./majestic-check
node scripts/vendor-fonts.mjs path/to/page.html                # or --inline for one self-contained file
node scripts/score-pages.mjs runs/old runs/new --defaults        # compare two sets of pages
node scripts/extract-spec.mjs design.png --out design-spec       # read a design image into numbers
node scripts/compare-image.mjs design.png page.html               # score a build against the design
node scripts/inventory.mjs src                                    # measure design sprawl in a codebase
```

`verify-render.mjs` options: `--dark` checks dark mode too; `--app` is for product screens (dashboards, docs, tools) and skips the two landing-page rules; `--cdp http://127.0.0.1:9222` reuses a running Chrome; `CHROME_PATH=…` points at a browser. With no browser at all it exits with code 3 and marks the visual checks UNVERIFIED instead of passing them.

## License

The skill, references, examples and scripts are MIT licensed (see `LICENSE`).

The bundled fonts in `examples/fonts/` (Funnel Display, Newsreader, Instrument Serif, Bricolage Grotesque, Geist, Geist Serif, Geist Pixel and Geist Mono) are **not** MIT. They are licensed under the SIL Open Font License 1.1, and their license files live in `examples/fonts/licenses/`. Keep those files with the fonts if you redistribute them; `vendor-fonts.mjs` copies them for you.

All brands, products, people and numbers in the examples are invented placeholders.
