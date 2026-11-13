# shadcn/ui: prebuilt components, this skill's look

When the project is React (Next.js, Vite, Remix) with Tailwind, use shadcn/ui's prebuilt components for interface controls instead of hand-building them. They are accessible, keyboard-correct, and copied into your codebase (`components/ui/`), so you own and restyle them. What this skill adds is the look: shadcn's stock theme is itself one of the generic looks (neutral greys, a small shadow on every control, the same radius everywhere), so it is always re-themed to the project's tokens or the undecided defaults.

Checked against the shadcn docs as of November 2026: Tailwind v4, OKLCH variables by default (any CSS color works), `@theme inline`, a `.dark` variant and `components.json`. Re-check after a major shadcn release.

## Contents
1. What to take from shadcn and what to build
2. Setup
3. The theme: mapping tokens onto shadcn's variables
4. Restyling the components themselves
5. Variants and consistency
6. Dark mode with this skill's tokens
7. Checks

---

## 1. What to take from shadcn and what to build

**Use the prebuilt component** (`npx shadcn@latest add <name>`) for:

| Group | Components |
|---|---|
| Controls | button, input, textarea, select, checkbox, radio-group, switch, slider, toggle, toggle-group, label, form fields with errors |
| Overlays | dialog, alert-dialog, sheet, drawer, popover, tooltip, hover-card, dropdown-menu, context-menu, command (palette) |
| Navigation | tabs, navigation-menu, breadcrumb, pagination, sidebar, menubar |
| Data | table (plus a data table with sorting and filters), calendar and date picker, chart wrappers |
| Feedback | toast (sonner), alert, progress, skeleton, badge, avatar |
| Structure | accordion, collapsible, card, separator, scroll-area, resizable |

**Build it yourself** from the examples:
- the hero, its atmosphere and art, the product preview, the signature details, and section compositions (`sections.md`);
- anything canvas-drawn.

Marketing sections may use shadcn's Button and Card inside them, restyled. They should never be assembled from stock Cards in a row, which is the refuse-list pattern.

On a page that isn't React, use the platform's native elements and `interactions.md` instead. Vue and Svelte have community ports of the same components; the same theming rules apply.

## 2. Setup

```bash
npx shadcn@latest init          # writes components.json and the theme block in your global CSS
npx shadcn@latest add button input select dialog dropdown-menu tabs accordion sonner
```
- Keep `"cssVariables": true` (the default) in `components.json`, so every color is a token you can retheme in one place. Switching it later means reinstalling the components.
- Load fonts with `next/font` in the root layout (see `nextjs.md`) and point Tailwind's font tokens at them; shadcn components inherit the body font.
- Components land in `components/ui/`. Edit them there; that's the design system.

## 3. The theme: mapping tokens onto shadcn's variables

shadcn reads a fixed set of variables (`--background`, `--foreground`, `--primary`, `--muted`, `--border`, `--ring`, `--radius` and so on) and maps them to Tailwind utilities with `@theme inline`. Set them from the project's tokens. When nothing is decided, use the Gallery palette:

```css
/* app/globals.css: replace the generated :root and .dark values */
:root {
  --radius: 0.6875rem;                 /* 11px base; the explicit scale below wins */
  --background: #ffffff;   --foreground: #1d1d1f;
  --card: #ffffff;         --card-foreground: #1d1d1f;
  --popover: #ffffff;      --popover-foreground: #1d1d1f;
  --primary: #0066cc;      --primary-foreground: #ffffff;
  --secondary: #f5f5f7;    --secondary-foreground: #1d1d1f;
  --muted: #f5f5f7;        --muted-foreground: #6e6e73;
  --accent: #f5f5f7;       --accent-foreground: #1d1d1f;
  --destructive: #d70015;
  --border: #e0e0e0;       --input: #d2d2d7;       --ring: #0071e3;
  --chart-1: #0066cc; --chart-2: #1d1d1f; --chart-3: #6e6e73; --chart-4: #a1a1a6; --chart-5: #d2d2d7;
  --sidebar: #fafafc; --sidebar-foreground: #1d1d1f; --sidebar-primary: #0066cc; --sidebar-primary-foreground: #ffffff;
  --sidebar-accent: #f5f5f7; --sidebar-accent-foreground: #1d1d1f; --sidebar-border: #e0e0e0; --sidebar-ring: #0071e3;
}
.dark {
  --background: #0b0b0c;   --foreground: #ededed;
  --card: #1c1c1e;         --card-foreground: #ededed;
  --popover: #1c1c1e;      --popover-foreground: #ededed;
  --primary: #0071e3;      --primary-foreground: #ffffff;
  --secondary: #202022;    --secondary-foreground: #ededed;
  --muted: #161618;        --muted-foreground: #a1a1a6;
  --accent: #202022;       --accent-foreground: #ededed;
  --destructive: #ff6961;
  --border: rgb(255 255 255 / .09); --input: rgb(255 255 255 / .15); --ring: #4ea4ff;
  --chart-1: #4ea4ff; --chart-2: #ededed; --chart-3: #a1a1a6; --chart-4: #6e6e73; --chart-5: #3a3a3c;
  --sidebar: #111113; --sidebar-foreground: #ededed; --sidebar-primary: #0071e3; --sidebar-primary-foreground: #ffffff;
  --sidebar-accent: #202022; --sidebar-accent-foreground: #ededed; --sidebar-border: rgb(255 255 255 / .09); --sidebar-ring: #4ea4ff;
}
@theme inline {
  /* one explicit radius scale (8 / 11 / 18 / pill) instead of multiples of --radius */
  --radius-sm: 8px; --radius-md: 11px; --radius-lg: 18px; --radius-xl: 24px;
  --font-sans: var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif;
  --font-serif: var(--font-geist-serif-regular), ui-serif, Georgia, serif;
  --font-mono: var(--font-geist-mono), ui-monospace, monospace;
}
```
- Keep the generated `@theme inline` lines that map each color (`--color-primary: var(--primary)` and so on) and add the radius and font lines above.
- Copying a look from `examples/`: take its `:root` tokens and assign them by role. The canvas is `--background`, ink is `--foreground`, the shell or parchment is `--muted` and `--secondary`, the one accent is `--primary` and `--ring`, the hairline is `--border`.
- Chart colors follow the one-accent rule: the accent for the main series, then neutrals. Never five hues.

## 4. Restyling the components themselves

The stock components carry the stock look in their class lists. Edit `components/ui/*.tsx` once, so every use inherits it:

| In the stock component | Change to (undecided defaults) |
|---|---|
| a small `shadow` on buttons, inputs, selects, cards | remove it; depth comes from the border and the surface step |
| the same radius on every element | buttons `rounded-full` (Gallery pills), inputs `rounded-md` (11px), cards and dialogs `rounded-lg` (18px) |
| default button height (36px) | 44px default; a 36px `sm` only on dense desktop surfaces |
| focus ring from the generic token | `--ring` from the palette, 2px, offset 2 to 3px, visible on every control |
| hover as an opacity change | a 150ms color step to a defined hover token |
| font weight 500 on everything | the type roles from `default-theme.md` (500 for controls, 600 for headings) |
| card = border + shadow + padding 24 | border or surface step, padding 28, no shadow, and never cards nested in cards |
| dialog overlay `black/50` | `black/40` with no blur, or a flat scrim token |

If the user chose shadows or a specific radius, their choice replaces the right-hand column.

## 5. Variants and consistency

- Every style of a component is a variant in its `cva` definition in `components/ui/`, never a long `className` at the call site. `<Button variant="secondary" size="lg">` is consistent; `<Button className="bg-[#0a7] rounded-sm px-7">` is how products end up with nine button styles.
- About four button variants cover nearly everything: `default` (the one accent), `secondary` (surface), `outline` or `ghost` (quiet), and `destructive`. Add `link` if needed. A new variant needs a reason.
- Sizes on the 4px grid and the type scale; icons from one set (shadcn uses Lucide) at one stroke width.
- Run `scripts/inventory.mjs` before and after: it counts button and input class-list variants, colors, sizes, radii and shadows, and proposes the merge.

## 6. Dark mode with this skill's tokens

shadcn's dark variant matches a `.dark` class on an ancestor. This skill's pages use `data-theme="dark"` on `<html>` plus `prefers-color-scheme`. Pick one convention per project:

- **Use `.dark`:** set the class on `<html>` from the pre-paint script (or a theme library configured for the class attribute), and write the dark tokens under `.dark`.
- **Use `data-theme`:** change the variant line and put the dark tokens under the attribute:
  ```css
  @custom-variant dark (&:is([data-theme="dark"] *));
  [data-theme="dark"] { /* the dark tokens from section 3 */ }
  ```
Either way the toggle, the no-flash script and the `themechange` redraw for canvas art work as in `nextjs.md` section 6.

## 7. Checks

- `verify-render.mjs` covers every overlay and control from the keyboard: Tab order, visible focus, Escape closing dialogs and menus, Space and Enter on switches and toggles, arrows in tabs and menus.
- Run it with `--dark`; a re-themed dark mode is where contrast slips.
- `slop-lint.mjs` on `components/ui` catches leftover `transition-all`, generic shadows and off-grid values from the stock code.
