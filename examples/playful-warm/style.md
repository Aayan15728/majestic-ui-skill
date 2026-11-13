# playful-warm: style

The visual spec of `index.html`. Every value here is copied from the file's `:root` tokens and `@font-face` rules, so they stay in sync.

## Color tokens
| Token | Value |
|---|---|
| `--canvas` | `#fbf6ea` |
| `--ink` | `#17140f` |
| `--ink-2` | `color-mix(in oklab, var(--ink) 64%, var(--canvas))` |
| `--ink-3` | `color-mix(in oklab, var(--ink) 48%, var(--canvas))` |
| `--hairline` | `color-mix(in oklab, var(--ink) 10%, transparent)` |
| `--accent` | `#f26a12` |
| `--accent-light` | `#ff9d48` |
| `--accent-ring` | `#f5b56f` |
| `--dune` | `#f6c493` |

**Strategy:** Committed warm: orange accent on cream.

## Typography
| Family | Weights bundled |
|---|---|
| Bricolage | 600, 700 |
| Geist | 400, 500, 600 |
| Geist Mono | 400, 500 |

Bricolage 700–800 for display, Geist UI, Geist Mono labels.

Fonts load from `../fonts/`. When the user hasn't picked fonts, swap every family to Geist + Geist Mono (see `references/default-theme.md`).

## Other tokens
- `--font-display`: `"Bricolage", ui-sans-serif, system-ui, sans-serif`
- `--font-ui`: `"Geist", ui-sans-serif, system-ui, sans-serif`
- `--font-mono`: `"Geist Mono", ui-monospace, monospace`
- `--ease`: `cubic-bezier(.22, 1, .36, 1)`
- `--gutter`: `20px`

## Shape and motion
- Radii used: 4px, 8px, 9px, 10px, 12px, 14px, 24px, 999px
- Motion: one curve, `cubic-bezier(.22, 1, .36, 1)`; hero children rise 14px with a 70ms stagger; `prefers-reduced-motion` turns it all off.
- Press feedback: a small `scale()` on buttons; hover is a 150ms color step.
