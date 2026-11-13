# electric-swirl: style

The visual spec of `index.html`. Every value here is copied from the file's `:root` tokens and `@font-face` rules, so they stay in sync.

## Color tokens
| Token | Value |
|---|---|
| `--field` | `#1d3cf5` |
| `--field-deep` | `#1530d0` |
| `--on-field` | `#ffffff` |
| `--on-field-2` | `rgb(255 255 255 / .78)` |
| `--on-field-3` | `rgb(255 255 255 / .56)` |
| `--bar` | `#ffffff` |
| `--ink` | `#0b1030` |
| `--ink-2` | `color-mix(in oklab, var(--ink) 62%, white)` |
| `--hairline` | `rgb(11 16 48 / .1)` |
| `--lamp` | `#fff3c4` |

**Strategy:** Drenched: the surface is the color.

## Typography
| Family | Weights bundled |
|---|---|
| Geist | 400, 500, 600 |
| Geist Mono | 400, 500 |

Geist 600 display, Geist Mono for the log line and command.

Fonts load from `../fonts/`. When the user hasn't picked fonts, swap every family to Geist + Geist Mono (see `references/default-theme.md`).

## Other tokens
- `--font-ui`: `"Geist", ui-sans-serif, system-ui, sans-serif`
- `--font-mono`: `"Geist Mono", ui-monospace, monospace`
- `--ease`: `cubic-bezier(.22, 1, .36, 1)`
- `--gutter`: `20px`

## Shape and motion
- Radii used: 6px, 8px, 10px, 12px, 14px
- Motion: one curve, `cubic-bezier(.22, 1, .36, 1)`; hero children rise 14px with a 70ms stagger; `prefers-reduced-motion` turns it all off.
- Press feedback: a small `scale()` on buttons; hover is a 150ms color step.
