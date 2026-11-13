# rock-dashboard: style

The visual spec of `index.html`. Every value here is copied from the file's `:root` tokens and `@font-face` rules, so they stay in sync.

## Color tokens
| Token | Value |
|---|---|
| `--sky` | `#cdd5dc` |
| `--sky-low` | `#d8d8d2` |
| `--ink` | `#111316` |
| `--ink-2` | `color-mix(in oklab, var(--ink) 66%, var(--sky))` |
| `--ink-3` | `color-mix(in oklab, var(--ink) 46%, var(--sky))` |
| `--rail` | `rgb(17 19 22 / .14)` |
| `--accent` | `#1f4ff0` |
| `--accent-deep` | `#1740d1` |
| `--card` | `#ffffff` |
| `--card-2` | `#f7f7f8` |
| `--hairline` | `rgb(17 19 22 / .08)` |

**Strategy:** Restrained: ink on blue-grey, one blue for the key word, the primary button and the chart.

## Typography
| Family | Weights bundled |
|---|---|
| Geist Serif | 400 |
| Geist | 400, 500, 600 |
| Geist Mono | 400 |

Geist Serif 400 headline at −0.03em, Geist UI, Geist Mono labels.

Fonts load from `../fonts/`. When the user hasn't picked fonts, swap every family to Geist + Geist Mono (see `references/default-theme.md`).

## Other tokens
- `--font-display`: `"Geist Serif", ui-serif, Georgia, serif`
- `--font-ui`: `"Geist", ui-sans-serif, system-ui, sans-serif`
- `--font-mono`: `"Geist Mono", ui-monospace, monospace`
- `--ease`: `cubic-bezier(.22, 1, .36, 1)`
- `--gutter`: `20px`

## Shape and motion
- Radii used: 2px, 8px, 12px, 16px, 22px, 999px
- Motion: one curve, `cubic-bezier(.22, 1, .36, 1)`; hero children rise 14px with a 70ms stagger; `prefers-reduced-motion` turns it all off.
- Press feedback: a small `scale()` on buttons; hover is a 150ms color step.
