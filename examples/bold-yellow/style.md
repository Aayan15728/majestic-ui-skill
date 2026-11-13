# bold-yellow: style

The visual spec of `index.html`. Every value here is copied from the file's `:root` tokens and `@font-face` rules, so they stay in sync.

## Color tokens
| Token | Value |
|---|---|
| `--canvas` | `#ffffff` |
| `--surface` | `#f6f6f7` |
| `--ink` | `#1a1a1a` |
| `--ink-2` | `color-mix(in oklab, var(--ink) 62%, #fff)` |
| `--ink-3` | `color-mix(in oklab, var(--ink) 50%, #fff)` |
| `--hairline` | `color-mix(in oklab, var(--ink) 10%, transparent)` |
| `--accent` | `#ffe500` |
| `--accent-deep` | `#e6c200` |
| `--link` | `#0a66d8` |
| `--good` | `#16a34a` |

**Strategy:** Committed: bright yellow accent on white.

## Typography
| Family | Weights bundled |
|---|---|
| Geist | 400, 500, 600, 700 |

Geist 700–800 for the headline.

Fonts load from `../fonts/`. When the user hasn't picked fonts, swap every family to Geist + Geist Mono (see `references/default-theme.md`).

## Other tokens
- `--font-ui`: `"Geist", ui-sans-serif, system-ui, sans-serif`
- `--ease`: `cubic-bezier(.22, 1, .36, 1)`
- `--gutter`: `20px`

## Shape and motion
- Radii used: 3px, 8px, 14px, 24px, 999px
- Motion: one curve, `cubic-bezier(.22, 1, .36, 1)`; hero children rise 14px with a 70ms stagger; `prefers-reduced-motion` turns it all off.
- Press feedback: a small `scale()` on buttons; hover is a 150ms color step.
