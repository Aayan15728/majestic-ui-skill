# peak-agency: style

The visual spec of `index.html`. Every value here is copied from the file's `:root` tokens and `@font-face` rules, so they stay in sync.

## Color tokens
| Token | Value |
|---|---|
| `--canvas` | `#ffffff` |
| `--ink` | `#2b2d31` |
| `--ink-2` | `color-mix(in oklab, var(--ink) 74%, white)` |
| `--ink-3` | `color-mix(in oklab, var(--ink) 50%, white)` |
| `--hairline` | `rgb(43 45 49 / .1)` |
| `--dash` | `rgb(43 45 49 / .22)` |
| `--accent` | `#2f6bff` |
| `--accent-deep` | `#1f55e6` |
| `--tile` | `#f3f4f6` |

**Strategy:** Restrained: ink on white with one blue used for the highlight, the buttons and the nav dots.

## Typography
| Family | Weights bundled |
|---|---|
| Geist | 400, 500, 600 |
| Geist Mono | 400 |

Geist 600 headline at −0.035em, Geist UI.

Fonts load from `../fonts/`. When the user hasn't picked fonts, swap every family to Geist + Geist Mono (see `references/default-theme.md`).

## Other tokens
- `--font-ui`: `"Geist", ui-sans-serif, system-ui, sans-serif`
- `--font-mono`: `"Geist Mono", ui-monospace, monospace`
- `--ease`: `cubic-bezier(.22, 1, .36, 1)`
- `--gutter`: `20px`
- `--frame`: `1032px`

## Shape and motion
- Radii used: 6px, 8px, 12px
- Motion: one curve, `cubic-bezier(.22, 1, .36, 1)`; hero children rise 14px with a 70ms stagger; `prefers-reduced-motion` turns it all off.
- Press feedback: a small `scale()` on buttons; hover is a 150ms color step.
