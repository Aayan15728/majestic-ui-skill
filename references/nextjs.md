# Building with Next.js

Every example in this skill is one HTML file, so the design is easy to read and copy. In a Next.js app the same page becomes a layout, a global stylesheet and a handful of components. Nothing about the design changes; only where each part lives. A working port of `examples/sections-kit` is in `starters/nextjs/`. It builds on Next.js 16 with the App Router, and both checks pass against its production server.

## Contents
1. Where each part of an example goes
2. Fonts
3. Tokens: plain CSS or Tailwind
4. Server and client components
5. Canvas art and other drawn atmospheres
6. Light and dark
7. Metadata, theme color, images and links
8. Motion
9. Running the checks on a Next.js app
10. Pitfalls

---

## 1. Where each part of an example goes

| In the example's `index.html` | In Next.js |
|---|---|
| `@font-face` rules | `next/font` in `app/layout.tsx` (section 2); no font files to copy |
| `:root` tokens, light and dark | `app/globals.css`, unchanged; or Tailwind's `@theme` (section 3) |
| the rest of the `<style>` block | `app/globals.css`, or a CSS Module per component when the project uses them |
| `<title>`, `<meta name="theme-color">` | `export const metadata` and `export const viewport` in the layout or page |
| the inline theme script in `<head>` | a `<script dangerouslySetInnerHTML>` in the layout's `<head>` |
| static markup (nav, hero copy, FAQ, table, footer) | server components in `components/` |
| anything with state or listeners (tabs, switch, calculator, theme toggle) | small `"use client"` components |
| canvas painters (`#sky`, `#peaks`, `#hills`) | a `"use client"` component that draws in `useEffect` |
| `<img>` | `next/image` with `width`, `height` and `alt` |
| `href="#…"` to other pages | `next/link` |

Port in this order: tokens and fonts, then the static sections, then the interactive islands, then the canvas. Render after each step.

## 2. Fonts

The official `geist` package ships the whole family as `next/font` objects, self-hosted and preloaded, with no layout shift:

```tsx
// app/layout.tsx
import { GeistSans } from "geist/font/sans";            // --font-geist-sans
import { GeistMono } from "geist/font/mono";            // --font-geist-mono
import { GeistSerifRegular } from "geist/font/serif";   // --font-geist-serif-regular (the single 400 cut)
// Pixel cuts: import { GeistPixelSquare } from "geist/font/pixel"  → --font-geist-pixel-square

<html lang="en" className={`${GeistSans.variable} ${GeistMono.variable} ${GeistSerifRegular.variable}`} suppressHydrationWarning>
```
```css
/* app/globals.css: point the example's tokens at the next/font variables */
:root {
  --font-ui: var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif;
  --font-display: var(--font-geist-serif-regular), ui-serif, Georgia, serif;
  --font-mono: var(--font-geist-mono), ui-monospace, monospace;
}
```
- Install with `npm i geist`. For a face outside the Geist family, use `next/font/google` or `next/font/local` with the files from `examples/fonts/` and their licenses.
- `scripts/vendor-fonts.mjs` isn't needed here; `next/font` already ships the files with the build.
- The font budget still applies: one to three families for the whole app, declared once in the root layout.

## 3. Tokens: plain CSS or Tailwind

Plain CSS: copy the example's `:root` block and both dark blocks into `app/globals.css` as they are. Every component reads `var(--…)`.

Tailwind v4: put the same values in `@theme` so they become utilities, and keep the dark values as CSS variables that the theme tokens point to:
```css
@import "tailwindcss";
@theme {
  --color-canvas: var(--canvas);  --color-shell: var(--shell);  --color-card: var(--card);
  --color-ink: var(--ink);        --color-muted: var(--ink-2);  --color-hairline: var(--hairline);
  --color-action: var(--action);
  --font-display: var(--font-geist-serif-regular), ui-serif, serif;
  --font-sans: var(--font-geist-sans), ui-sans-serif, sans-serif;
  --font-mono: var(--font-geist-mono), ui-monospace, monospace;
  --ease-page: cubic-bezier(.22, 1, .36, 1);
}
:root { --canvas: #ffffff; --shell: #f5f5f7; /* …light tokens… */ }
:root[data-theme="dark"] { --canvas: #0b0b0c; --shell: #161618; /* …dark tokens… */ }
```
Then `bg-shell`, `text-muted`, `border-hairline`, `font-display` follow the theme with no `dark:` variants. Keep the spacing on Tailwind's 4px scale, and keep one radius scale (`rounded-[18px]` for cards, `rounded-full` for pills) rather than mixing every preset. Long pages of utilities drift fast; when one element needs more than about twelve classes, give it a class in CSS.

## 4. Server and client components

- Everything is a server component unless it needs state, effects or event handlers. A landing page usually needs four small client islands: the theme toggle, a tabbed preview, a billing switch or calculator, and the canvas.
- Keep the `"use client"` boundary at the smallest component that holds state. Pass plain data down from the server page; don't move the whole page to the client to toggle one price.
- Render the default state on the server (monthly prices, the 30-day tab, the first FAQ open), so the page reads correctly before JavaScript and in the render check's first frame.
- `<details>` accordions need no client code. Give them the same `name` for one-open-at-a-time.
- Widget behavior follows `interactions.md`. In React: keep state in `useState`, write it to the ARIA attribute (`aria-checked={yearly}`, `aria-selected={range === r}`), and let CSS style from the attribute.

## 5. Canvas art and other drawn atmospheres

```tsx
"use client";
import { useEffect, useRef } from "react";

export function DottedHills() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const draw = () => { /* the example's painter, unchanged; read colors with getComputedStyle(document.documentElement) */ };
    draw();
    const ro = new ResizeObserver(draw); ro.observe(c);                 // redraw on size, not on every frame
    window.addEventListener("themechange", draw);                       // redraw when the theme flips
    return () => { ro.disconnect(); window.removeEventListener("themechange", draw); };
  }, []);
  return <canvas ref={ref} aria-hidden="true" />;
}
```
- Painters touch `window` and `document`, so they only run inside `useEffect`. Give the canvas its size in CSS so the server render reserves the space.
- Heavy painters (the per-pixel skies and terrain) render at half or three-quarter resolution and draw once; for a big scene, render it once at build time to a WebP and use `next/image` instead.
- Colors come from CSS variables (an `r g b` triplet such as `--dot: 29 29 31`), so dark mode is a redraw, not a second painter.

## 6. Light and dark

- Tokens as in `default-theme.md`, "Light and dark": light on `:root`, dark under `prefers-color-scheme` guarded by `:root:not([data-theme="light"])`, and again under `:root[data-theme="dark"]`.
- Set the saved choice before paint with a tiny script in the layout's `<head>`, and put `suppressHydrationWarning` on `<html>`, because the script changes an attribute React didn't render:
```tsx
const themeScript = `try{var t=localStorage.getItem("site-theme");if(t==="dark"||t==="light")document.documentElement.dataset.theme=t}catch(e){}`;
<head><script dangerouslySetInnerHTML={{ __html: themeScript }} /></head>
```
- The toggle is a client component with `aria-pressed`; after changing `data-theme` it dispatches a `themechange` event so canvases redraw. A theme library works too if it writes the same `data-theme` attribute.

## 7. Metadata, theme color, images and links

```tsx
export const metadata: Metadata = { title: "Product — the promise in one line", description: "…" };
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0b0c" },
  ],
};
```
- `themeColor` lives in the `viewport` export, not in `metadata`.
- Put an `app/icon.svg` in place; a missing favicon is a 404 the render check reports.
- `next/image` for every raster image, with real `width`, `height` and `alt`. For the hero image use `fetchPriority="high"` (or `loading="eager"`); since Next.js 16 the old `priority` prop is deprecated in favor of `preload`, and the docs recommend `fetchPriority` or `loading` in most cases.
- `next/link` for internal routes; in-page anchors (`#pricing`) can stay plain `<a>`.

## 8. Motion

- Keep the examples' CSS motion: the `rise` keyframes, one curve, `prefers-reduced-motion` turning it off. It runs before hydration and costs no JavaScript.
- Reach for a motion library only for gestures, layout transitions or scroll-linked sequences, and keep the same curve and durations.
- Never hide content until JavaScript animates it in; server-rendered content must be visible in the first paint.

## 9. Running the checks on a Next.js app

Both checks work on a running app: the lint reads `.tsx` and CSS files, and the render check opens the URL.

```bash
npm run build && npm run start -- -p 3123 &
node <skill>/scripts/slop-lint.mjs app components --defaults      # --defaults when the user gave no style
node <skill>/scripts/verify-render.mjs http://127.0.0.1:3123 --dark --ref <skill>/examples/sections-kit --out majestic-check
```
Check against the production server (`next start`), not `next dev`: the dev overlay and unminified code change what's measured.

The starter wraps this in one command, `npm run check:ui` (`starters/nextjs/scripts/check-ui.mjs`): it builds, starts the server, runs both checks and exits non-zero on any error. Point it at the skill with `MAJESTIC_UI_DIR`, and at a reference example with `MAJESTIC_REF`.

**In CI**, so nobody has to remember:
```yaml
# .github/workflows/ui-check.yml
name: UI check
on: [pull_request]
jobs:
  ui:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 22 }
      - run: npm ci
      - run: npm run check:ui
        env: { MAJESTIC_UI_DIR: .claude/skills/majestic-ui }
      - uses: actions/upload-artifact@v4
        if: always()
        with: { name: majestic-check, path: majestic-check }
```
GitHub's Ubuntu runners include Chrome, which the render check finds on its own. The uploaded screenshots let a reviewer open `compare.png` on the pull request.

## 10. Pitfalls

- **Hydration warnings from the theme:** the pre-paint script plus `suppressHydrationWarning` on `<html>` only. Don't read `localStorage` during render.
- **A client component that only needs to be static:** if it has no state or effects, remove `"use client"`.
- **Visually hidden text inside a scrolling table:** give the scroll container `position: relative`, or the text escapes and widens the page on phones.
- **Fonts declared twice:** fonts belong in the root layout only; a second `next/font` call in a page loads a second copy.
- **`dark:` utilities scattered everywhere:** when tokens carry the theme, components almost never need `dark:` variants.
- **Measuring the dev server:** always run the render check against `next build && next start`.
