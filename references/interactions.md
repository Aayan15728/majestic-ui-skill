# Interactions in plain JavaScript

Small, accessible patterns for the widgets landing pages and dashboards actually use, with no framework. Each one is live in `examples/sections-kit/index.html`, and `scripts/verify-render.mjs` presses the keys on accordions, switches, disclosures and tabs to check they respond.

## Contents
1. Rules for every widget
2. Accordion (FAQ)
3. Disclosure button
4. Switch (billing toggle)
5. Tabs (date ranges, preview panes)
6. Calculator with ranges and a live result
7. Theme toggle (light / dark)
8. Interactive SVG chart
9. Menu sheet and dialog
10. Search with filters and a live count
11. Chart with a readable tooltip
12. Offer dialog with a code and a countdown
13. Prompt composer
14. Things to avoid

---

## 1. Rules for every widget

- **Native element first.** `<details>`, `<button>`, `<input type="range">`, `<output>`, `<dialog>` already handle keys, focus and announcements. Add ARIA only for what HTML can't express (switch, tabs).
- **State lives in one attribute** (`aria-checked`, `aria-selected`, `aria-expanded`, `aria-pressed`, `open`) and CSS styles from it: `[aria-checked="true"]`. No parallel `.is-active` class to drift out of sync.
- **Keys:** Enter and Space activate buttons (free with `<button>`); arrows move inside composite widgets (tabs, radio groups); Escape closes anything that floats; Tab leaves the widget.
- **Focus is always visible** (`:focus-visible` ring from the tokens) and never trapped, except inside a modal dialog.
- **Targets** 24px on desktop, 44px on touch. A small visual (a 28px switch) gets a 44px button around it.
- **Motion** uses the page curve, 150–300ms, and `prefers-reduced-motion` turns it off.
- **One live region per result**, `aria-live="polite"`, holding only the changing value.

## 2. Accordion (FAQ)

```html
<details open>
  <summary>How do I install it?<svg class="icon" aria-hidden="true">…chevron…</svg></summary>
  <div class="ans">Add the script to your head tag… <a href="/docs/install">Read the install guide</a></div>
</details>
```
```css
summary { list-style: none; display: flex; justify-content: space-between; align-items: center; min-height: 56px; cursor: pointer; }
summary::-webkit-details-marker { display: none; }
details[open] summary svg { rotate: 180deg; }
summary svg { transition: rotate 200ms var(--ease); }
```
- No script. Enter and Space toggle, the open state is announced, find-in-page opens matching items.
- For one-open-at-a-time, give each `<details>` the same `name="faq"` attribute (exclusive accordion) instead of writing script.
- Don't hide the marker without adding your own chevron; the item must still look expandable.

## 3. Disclosure button

For a "show more" region that isn't a list of questions:
```html
<button type="button" aria-expanded="false" aria-controls="more">Show all 12 integrations</button>
<div id="more" hidden>…</div>
```
```js
document.querySelectorAll("button[aria-controls][aria-expanded]").forEach((b) => b.addEventListener("click", () => {
  const open = b.getAttribute("aria-expanded") !== "true";
  b.setAttribute("aria-expanded", String(open));
  document.getElementById(b.getAttribute("aria-controls")).hidden = !open;
}));
```

## 4. Switch (billing toggle)

```html
<label for="bill" id="bill-label">Bill yearly</label>
<button class="switch" type="button" role="switch" id="bill" aria-checked="false" aria-labelledby="bill-label"></button>
<span class="save">2 months free</span>
```
```css
.switch { position: relative; width: 52px; height: 44px; border: 0; padding: 0; background: transparent; } /* 44px target */
.switch::before { content: ""; position: absolute; left: 2px; top: 8px; width: 48px; height: 28px; border-radius: 999px; background: var(--hairline-2); }
.switch::after { content: ""; position: absolute; left: 6px; top: 12px; width: 20px; height: 20px; border-radius: 999px; background: #fff; transition: translate 200ms var(--ease); }
.switch[aria-checked="true"]::before { background: var(--action); }
.switch[aria-checked="true"]::after { translate: 20px 0; }
```
```js
const bill = document.getElementById("bill");
document.getElementById("bill-label").addEventListener("click", () => bill.click()); // a label doesn't click a non-form button
bill.addEventListener("click", () => {
  const yearly = bill.getAttribute("aria-checked") !== "true";
  bill.setAttribute("aria-checked", String(yearly));
  document.querySelectorAll("[data-m][data-y]").forEach((el) => { el.textContent = yearly ? el.dataset.y : el.dataset.m; });
});
```
- Prices sit in the markup as `data-m` / `data-y`, so the page works and reads correctly before script runs.
- A `<button>` gets Space and Enter for free; don't add key handlers.
- Two options with no on/off meaning (Monthly / Yearly as equals) can instead be a two-button segmented control with `aria-pressed`, or a radio group.

## 5. Tabs (date ranges, preview panes)

```html
<div role="tablist" aria-label="Date range">
  <button role="tab" id="r7"  aria-selected="false" aria-controls="panel" tabindex="-1" data-r="7">7 days</button>
  <button role="tab" id="r30" aria-selected="true"  aria-controls="panel" data-r="30">30 days</button>
  <button role="tab" id="r90" aria-selected="false" aria-controls="panel" tabindex="-1" data-r="90">90 days</button>
</div>
<div id="panel" role="tabpanel" aria-labelledby="r30">…</div>
```
```js
const tabs = [...document.querySelectorAll('[role="tab"]')], panel = document.getElementById("panel");
function select(t, focus) {
  tabs.forEach((x) => { const on = x === t; x.setAttribute("aria-selected", String(on)); x.tabIndex = on ? 0 : -1; });
  panel.setAttribute("aria-labelledby", t.id);
  render(t.dataset.r);               // update the chart and numbers
  if (focus) t.focus();
}
tabs.forEach((t, i) => {
  t.addEventListener("click", () => select(t, false));
  t.addEventListener("keydown", (e) => {
    const k = { ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: tabs.length - 1 }[e.key];
    if (k === undefined) return;
    e.preventDefault(); select(tabs[(k + tabs.length) % tabs.length], true);
  });
});
```
- Roving tabindex: only the selected tab is in the Tab order; arrows move between tabs and select them.
- Tabs switch views of the same thing. If the "tabs" lead to different pages, they are links in a nav.

## 6. Calculator with ranges and a live result

```html
<form id="calc" onsubmit="return false">
  <label for="visits">Visits a month <output for="visits" id="o-visits">20,000</output></label>
  <input id="visits" type="range" min="1000" max="200000" step="1000" value="20000">
  …
</form>
<strong id="gain" aria-live="polite">+$2,784</strong>
<p class="note">An estimate, not a promise: it assumes …</p>
```
```js
const $ = (id) => document.getElementById(id);
const money = (n) => "$" + Math.round(n).toLocaleString("en-US");
function calc() {
  const v = +$("visits").value /* … */;
  $("o-visits").textContent = v.toLocaleString("en-US");
  $("gain").textContent = "+" + money(/* formula */);
  document.querySelectorAll('#calc input[type="range"]').forEach((r) =>
    r.style.setProperty("--p", ((r.value - r.min) / (r.max - r.min)) * 100 + "%")); // filled track
}
$("calc").addEventListener("input", calc); calc();
```
- One `input` listener on the form covers every field.
- Only the result is live; the outputs next to each range are read when focused.
- The page renders the default result in HTML so it isn't empty before script.
- Ranges move with arrow keys, Page Up/Down and Home/End natively. Offer a number field as well when exact values matter.

## 7. Theme toggle (light / dark)

```html
<script> /* in <head>, before CSS paints */
  try { const t = localStorage.getItem("site-theme"); if (t === "dark" || t === "light") document.documentElement.dataset.theme = t; } catch (e) {}
</script>
<button class="theme" type="button" id="theme" aria-label="Dark mode" aria-pressed="false">…sun and moon icons…</button>
```
```js
const root = document.documentElement, btn = document.getElementById("theme");
const isDark = () => root.dataset.theme ? root.dataset.theme === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
const sync = () => { btn.setAttribute("aria-pressed", String(isDark())); redrawCanvasArt(); };
btn.addEventListener("click", () => {
  root.dataset.theme = isDark() ? "light" : "dark";
  try { localStorage.setItem("site-theme", root.dataset.theme); } catch (e) {}
  sync();
});
matchMedia("(prefers-color-scheme: dark)").addEventListener("change", sync);
sync();
```
- The label stays "Dark mode"; `aria-pressed` says whether it's on. Don't swap the label and the state at the same time.
- Storage can throw (private windows, blocked storage); every access is in `try`.
- Tokens for both themes: `default-theme.md`, "Light and dark".

## 8. Interactive SVG chart

- Draw with one `<path>` for the line and one for the area, in a `viewBox` with `preserveAspectRatio="none"`; regenerate the `d` attribute when the data changes. Smooth with cubic segments whose control points sit at the horizontal midpoint between points (no overshoot).
- `role="img"` and an `aria-label` on the SVG, and the headline number in real text next to it. The chart is the picture; the number and the top-sources list are the data.
- Colors from tokens (`stroke: var(--action)`, area `color-mix(in oklab, var(--action) 9%, transparent)`), so dark mode follows for free.
- Bars instead of lines when there are fewer than about eight points or the values are categories.
- Tooltips only with keyboard access too (focusable points or a data table toggle); otherwise skip them.

## 9. Menu sheet and dialog

- Mobile menu: a `<button aria-expanded aria-controls>` that shows a nav panel; Escape closes it and returns focus to the button. It's a disclosure, not a modal; don't trap focus.
- Anything that must block the page (sign-in, a confirm step) is a `<dialog>` opened with `showModal()`: focus trap, Escape and the backdrop come free. Put a visible close button first in the dialog and restore focus on close.

## 10. Search with filters and a live count

One source list, filtered in place (`paper-stack`).
```js
function apply() {
  const text = q.value.trim().toLowerCase(); let shown = 0;
  for (const li of cards.children) { const ok = (kind === "all" || li.dataset.k === kind) && li.dataset.t.includes(text); li.hidden = !ok; if (ok) shown++; }
  count.textContent = shown + (shown === 1 ? " match" : " matches");   // count is aria-live="polite"
  empty.hidden = shown > 0;                                             // empty state names the query and offers Clear
}
```
- `<input type="search">` with a real `<label>`; filter chips are buttons with `aria-pressed`; only the count is a live region.
- A `/` shortcut may focus the field, but never while the visitor is typing in another field or a dialog is open.
- Put the searchable text in a `data-` attribute (lowercased once), so filtering never re-reads the DOM text.

## 11. Chart with a readable tooltip

A hover tooltip alone hides the data from keyboard and touch users (`field-analytics`).
- Draw the chart at the container's real pixel size in script (a `ResizeObserver` redraw), so axis labels stay 12px at every width. A scaled `viewBox` shrinks text on phones.
- The chart wrapper is focusable (`tabindex="0"`, `role="group"`, a label that says the arrow keys work). Left and Right move a marker point to point; Home and End jump; Escape hides it. Pointer movement picks the nearest point.
- The tooltip is plain HTML positioned over the chart: the period, the value, the comparison and the change with an arrow. It flips to the left near the right edge. A visually hidden live region reads the same sentence on keyboard moves only.
- Range and period switches are button groups with `aria-pressed`; changing one redraws the chart and updates the headline figure beside it.
- One highlighted series per chart. The comparison is grey and dashed; status colors (up, down) always come with an arrow or a word.

## 12. Offer dialog with a code and a countdown

Only for an offer that is real (`paper-stack`).
- A native `<dialog>` opened by a button with `aria-haspopup="dialog"`; the close button comes first; a click on the backdrop closes it. Never open it on page load, on scroll or on exit intent.
- The code is a button that copies itself and confirms in place for about a second.
- The countdown counts to a real expiry (here: one hour from the first open, kept for the session). `role="timer"` without `aria-live`, so it isn't read aloud every second. When it reaches zero, say the offer has expired and stop. A timer that resets on reload is a lie.
- One action in the dialog, and one line saying what the offer applies to.

## 13. Prompt composer

For apps that start with a request (`dither-workspace`).
- A labelled `<textarea>` in a panel that shows focus on the whole panel (`:focus-within`). The placeholder gives three example tasks and ends with `…`.
- Send is disabled until there is text. Ctrl or Cmd + Enter submits; plain Enter adds a line. Say the shortcut next to the button.
- After sending: clear the field, add the new item where the visitor will look for it (the top of the recent list), and confirm once in a live region.
- Mode switches beside it are small button groups with `aria-pressed`; secondary tools (attach, dictate) hide first on phones.

## 14. Things to avoid

- Clickable `<div>` or `<span>`; a card that navigates gets a real link stretched over it with `::before`.
- Re-implementing `<details>` with script and `max-height` animations.
- `aria-live` on a whole section, or more than one live region updating at once.
- Hover-only reveals: anything shown on hover must show on focus too.
- Carousels that move on their own. If something must loop (a logo marquee), it pauses on hover and focus, has a visible pause button, and stops under `prefers-reduced-motion`.
- Visually hidden text (`.sr`) inside a horizontally scrolling box without a positioned ancestor in that box: it escapes and widens the page.
