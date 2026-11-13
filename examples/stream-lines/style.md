# stream-lines: style

The visual spec of `index.html`. Every value here is copied from the file's `:root` tokens and `@font-face` rules, so they stay in sync.

## Color tokens
| Token | Value |
|---|---|
| `--canvas` | `#fbfaf8` |
| `--card` | `#fbfaf8` |
| `--ink` | `#1b1b1a` |
| `--ink-2` | `color-mix(in oklab, var(--ink) 64%, var(--canvas))` |
| `--ink-3` | `color-mix(in oklab, var(--ink) 46%, var(--canvas))` |
| `--hairline` | `rgb(27 27 26 / .12)` |
| `--accent` | `#2f5bd8` |
| `--accent-hover` | `#2550c7` |
| `--lane-a` | `#c3cff5` |
| `--lane-b` | `#bfe9ec` |

**Strategy:** Restrained: ink on warm white, one solid blue used for the second headline line, the button and the routes.

## Typography
| Family | Weights bundled |
|---|---|
| Geist | 400, 500, 600 |
| Geist Mono | 400 |

Geist 500 headline at −0.04em, Geist Mono for the glyphs and the chip.

Fonts load from `../fonts/`. When the user hasn't picked fonts, swap every family to Geist + Geist Mono (see `references/default-theme.md`).

## Other tokens
- `--font-ui`: `"Geist", ui-sans-serif, system-ui, sans-serif`
- `--font-mono`: `"Geist Mono", ui-monospace, monospace`
- `--ease`: `cubic-bezier(.22, 1, .36, 1)`
- `--gutter`: `20px`

## Shape and motion
- Radii used: none
- Motion: one curve, `cubic-bezier(.22, 1, .36, 1)`; hero children rise 14px with a 70ms stagger; `prefers-reduced-motion` turns it all off.
- Press feedback: a small `scale()` on buttons; hover is a 150ms color step.
