# Interface rules

The craft floor under every look. A page can have a great hero and still feel cheap if these slip. Check them while you build and again at the gate. In an audit, report each miss as `file:line: problem → fix`.

## Contents
1. Semantics and keyboard
2. Focus
3. Forms
4. Motion
5. Typography and text details
6. Content resilience
7. Images and media
8. Performance
9. Navigation and state
10. Touch, zoom and safe areas
11. Theme and browser chrome
12. Locale
13. States and feedback
14. Copy
15. Visual details
16. Red flags to grep for

---

## 1. Semantics and keyboard
- Actions are `<button>`. Destinations are `<a href>`, so open-in-new-tab, middle-click and copy-link keep working. A clickable `<div>` or `<span>` is a bug.
- Reach for native elements (`button`, `a`, `label`, `input`, `table`, `dialog`, `details`) before any `role` or `aria-*`. ARIA patches what HTML can't say; it doesn't replace it.
- Every interactive widget has a **keyboard map**: which keys do what (Tab, Shift+Tab, Arrow keys, Home/End, Enter, Space, Escape). Write it down for anything custom, and implement all of it.
- Icon-only buttons get an `aria-label` that names the action ("Close dialog", not "X"). Decorative icons and art get `aria-hidden="true"`.
- One `<h1>` per page, then headings in order with no skipped levels. Add a "Skip to content" link as the first focusable element, pointing at `<main id="main">`.
- Anchor targets get `scroll-margin-top` equal to the sticky header height, so a linked heading isn't hidden behind the nav.
- Status changes (toasts, saved, inline validation) are announced through a polite live region (`aria-live="polite"`).
- Media that carries meaning gets captions or a transcript. Media players work by keyboard.

## 2. Focus
- Every focusable element shows a clear ring on `:focus-visible` (2px, offset 2–3px, the accent or ink color). Never remove `outline` without putting a visible replacement in its place.
- Use `:focus-visible`, not `:focus`, so mouse clicks don't flash rings. Use `:focus-within` to highlight a compound control (a search field with a button inside).
- Sticky headers, cookie bars and floating CTAs must never cover the element that has focus.
- Dialogs and drawers trap focus while open, move it to the first sensible control, close on Escape, and return focus to the trigger when they close. The page behind becomes `inert`.

## 3. Forms
- Every field has a visible `<label>` (or an accessible name when the design truly has no visible one). Clicking the label focuses the field. A placeholder is never the label.
- Set `type` and `inputmode` correctly (`email`, `tel`, `url`, `numeric`) and give each field a meaningful `name` and `autocomplete` token, so the right keyboard appears and autofill works.
- Placeholders show an example of the expected value and end with an ellipsis: `you@company.com…`, `sk_live_…`.
- Don't block paste, and don't block keystrokes. Let people type, then explain what's wrong.
- Turn spellcheck off for emails, usernames, codes and keys. Trim stray whitespace that keyboards and text expanders add.
- Keep submit enabled until the request starts. Then show progress on the button, keep its label, and prevent a double submit. Don't pre-disable a submit button to hide validation.
- Errors appear next to the field, say how to fix it, and on submit focus moves to the first invalid field.
- Enter submits a single-field form. In a textarea, Enter is a new line and Cmd/Ctrl+Enter submits.
- Fields that aren't credentials (search, coupon) shouldn't wake the password manager: avoid reserved names and set `autocomplete="off"` or a specific token. One-time-code fields use `autocomplete="one-time-code"` and accept pasted codes.
- Warn before leaving a page with unsaved changes.
- On mobile, input text is at least 16px so iOS doesn't zoom on focus.

## 4. Motion
- Animate only to explain a change (cause and effect) or for one deliberate moment of delight. Decoration that loops is noise.
- Animate `transform` and `opacity`. Width, height, top, left and big blurs cost layout and repaint.
- List the transitioned properties explicitly; `transition: all` animates things you never meant to.
- Pick easing by what moves: things entering ease out, things leaving ease in, things moving on screen ease in-out. One house curve covers most of it.
- Set `transform-origin` to where the motion physically starts (a menu grows from its trigger). For SVG, animate a `<g>` wrapper with `transform-box: fill-box; transform-origin: center`.
- Motion can always be interrupted: a second click reverses a half-open panel instead of waiting.
- Anything that moves on its own for more than 5 seconds gets a pause control. Decorative loops stop under `prefers-reduced-motion`, and every page has a reduced-motion path.
- Prefer CSS, then the Web Animations API, then a JS library. Keep heavy animation off the main thread.
- Don't scale text nodes directly (it shimmers); animate a wrapper.

## 5. Typography and text details
- Font budget: 1 to 3 families per project (5 is the hard ceiling), about 4 weights per page, 6 to 8 sizes in the scale. One role, one face; one token per heading level and per component, reused everywhere.
- Use the real ellipsis `…`, curly quotes `“ ” ‘ ’`, and an en dash for ranges (`9–5`).
- Glue things that must not wrap apart with a non-breaking space: `10&nbsp;MB`, `⌘&nbsp;K`, `Step&nbsp;3`, short brand names.
- Loading and in-progress labels end with an ellipsis: `Saving…`, `Generating…`. So do menu items that open a further step: `Rename…`.
- Numbers that get compared (prices, stats, tables, timers) use `font-variant-numeric: tabular-nums`.
- Headings use `text-wrap: balance`, paragraphs `text-wrap: pretty`, so no single word dangles on the last line.

## 6. Content resilience
- Design for the short, the typical and the absurdly long value: names, titles, emails, file names, prices.
- Text containers decide what happens on overflow: truncate with an ellipsis, clamp to N lines, or break long words. Flex and grid children that hold text need `min-width: 0` or the truncation never kicks in.
- Empty strings and empty lists render a designed empty state, never a broken box.
- Skeletons match the final layout exactly, so content doesn't jump when it arrives.
- Don't let a status rely on color alone; pair it with a label or an icon.

## 7. Images and media
- Every `<img>` has `width` and `height` (or an `aspect-ratio`) so the page doesn't shift as it loads.
- The hero image loads eagerly with `fetchpriority="high"`; everything below the fold gets `loading="lazy"`.
- Every `<img>` has `alt` that says what it shows, or `alt=""` if it's pure decoration.
- Use muted, looping `<video playsinline>` instead of an animated GIF, with a still poster and a reduced-motion fallback.

## 8. Performance
- `preconnect` to font and asset origins. Preload the one or two fonts the first screen needs, use `font-display: swap`, and subset to the characters and weights you actually use.
- Long lists (50+ rows) are virtualized or use `content-visibility: auto`.
- Never read layout (`getBoundingClientRect`, `offsetHeight`, `scrollTop`) in the middle of rendering. Batch reads, then writes.
- Inputs stay cheap per keystroke; prefer uncontrolled fields when nothing needs every character.
- Push expensive work into a Web Worker.
- Mutations should feel instant: update the UI optimistically when success is likely, and roll back with a clear message when it fails.
- A spinner or skeleton waits about 150–300ms before appearing, then stays at least 300–500ms, so fast responses don't flicker.
- Test on a throttled CPU and network, in Safari, and on a phone in low-power mode.

## 9. Navigation and state
- State someone might want to share or come back to lives in the URL: tabs, filters, sort, pagination, the open panel. Refresh, Back and a pasted link all restore it.
- Back and Forward restore the scroll position.
- Destructive actions ask for confirmation or offer Undo for a few seconds. They never happen on a single unguarded click.
- Every screen offers a way forward or back: no dead ends after an error, an empty result or a finished flow.
- `<title>` describes the current page and state.

## 10. Touch, zoom and safe areas
- Never disable zoom (`user-scalable=no`, `maximum-scale=1`).
- Hit targets are at least 24px on desktop and 44px on touch, even when the visible control is smaller. A label and its checkbox share one hit area, with no dead gaps. If something looks clickable, all of it is clickable.
- Set `touch-action: manipulation` on controls to remove the double-tap delay, and set the tap highlight color on purpose.
- Modals, drawers and sheets use `overscroll-behavior: contain`, so scrolling them doesn't scroll the page.
- While dragging, turn off text selection and make the dragged item `inert`. Every drag, swipe or pinch has a click and keyboard alternative.
- Full-bleed layouts respect `env(safe-area-inset-*)` around notches and home indicators.
- Autofocus only on desktop, and only when a screen has one obvious input.
- Check mobile, laptop and ultra-wide (zoom to 50% to fake it), and turn on always-visible scrollbars once to catch stray overflow.

## 11. Theme and browser chrome
- Style the parts the browser draws, from the palette: `::selection`, `caret-color`, `accent-color` on native checkboxes and ranges, `text-underline-offset` on links, and scrollbar colors (`scrollbar-color`). Default blue selection on a warm page is the cheapest tell that a page was assembled, not designed.
- Dark pages set `color-scheme: dark` on `<html>`, so scrollbars, form controls and autofill match.
- `<meta name="theme-color">` matches the page background, so the mobile browser bar blends in.
- Native `<select>` gets an explicit background and text color (Windows dark mode otherwise renders it unreadable).
- Dark mode redefines the same tokens. It never needs a second set of component styles.

## 12. Locale
- Format dates, times, numbers and currency with `Intl.DateTimeFormat` and `Intl.NumberFormat`, never hand-built strings.
- Choose language from `Accept-Language` and `navigator.languages`, never from IP.
- Wrap brand names, code and identifiers in `translate="no"` so auto-translate leaves them alone.
- Show keyboard shortcuts with the platform's symbols (⌘ on Mac, Ctrl elsewhere).

## 13. States and feedback
- Design every state the product can actually reach: loading, empty (first use and no results), partial, error, offline, disabled (with a reason), success, and too much data.
- Hover, active and focus each raise contrast a little above rest, so the control visibly answers the pointer.
- Loading buttons keep their label and add an indicator, so the width doesn't jump.
- Tooltips are a last resort; explain inline first. If you use them, delay the first one in a group and show neighbors instantly after.

## 14. Copy
- Active voice and second person: "Connect your repo", not "Your repo can be connected".
- Button labels say what happens: "Save API key", "Send invites", never "Continue", "Submit" or "OK" on their own.
- Error messages say what happened and how to fix it: "That key has expired. Create a new one in Settings → API."
- Use numerals for counts ("8 seats"), a space between number and unit ("10 MB"), and one currency format per context (0 or 2 decimals, never mixed).
- Keep nouns consistent: if it's a "workspace" in the nav, it's a "workspace" everywhere.
- Marketing headings and buttons use sentence case.

## 15. Visual details
- When you need a shadow, build it from two layers: a tight contact shadow plus a soft ambient one. Pair it with a semi-transparent border so edges stay crisp on any background.
- Nested radii are concentric: inner radius = outer radius − the padding between them.
- On a colored or tinted background, tint borders, shadows and muted text toward that hue instead of using neutral grey.
- Charts use color-blind-safe palettes, and labels carry the meaning too.
- Check contrast perceptually (APCA when available, WCAG 4.5:1 as the floor).
- Dark gradients and masks can band; add a subtle noise layer or use an image when you see steps.
- Align everything to something (a grid line, a baseline, an edge or an optical center), and nudge by 1px when the eye disagrees with the math. Balance icon stroke weight against the text next to it.

## 16. Red flags to grep for
`user-scalable=no` · `maximum-scale=1` · `outline: none` or `outline-none` with no focus-visible style · `onPaste` with `preventDefault` · `transition: all` · `<div onClick` / `<span onClick` · `<img` without `width`/`height` · inputs with no label · icon buttons with no `aria-label` · `...` in UI text · hard-coded date and number formats · `autoFocus` on mobile screens · animated GIFs · drag-only actions.
