# dusk-range: style

The visual spec of `index.html`. Every value here is copied from the file's `:root` tokens and `@font-face` rules, so they stay in sync.

## Color tokens
| Token | Value |
|---|---|
| `--ink` | `#ffffff` |
| `--ink-2` | `rgb(255 255 255 / .9)` |
| `--ink-3` | `rgb(255 255 255 / .72)` |
| `--bar` | `#1c1c1e` |
| `--sky-blue` | `#0a7fc4` |
| `--sky-blue-deep` | `#086aa6` |
| `--page` | `#ffffff` |
| `--window` | `#232326` |
| `--window-2` | `#2c2c30` |
| `--hairline` | `rgb(255 255 255 / .1)` |

**Strategy:** Committed scene: the sky and light carry the color; one sky-blue on actions.

## Typography
| Family | Weights bundled |
|---|---|
| Geist | 400, 500, 600 |
| Geist Mono | 400 |

Geist 600 headline at −0.04em, Geist UI, Geist Mono for the size chip.

Fonts load from `../fonts/`. When the user hasn't picked fonts, swap every family to Geist + Geist Mono (see `references/default-theme.md`).

## Other tokens
- `--font-ui`: `"Geist", ui-sans-serif, system-ui, sans-serif`
- `--font-mono`: `"Geist Mono", ui-monospace, monospace`
- `--ease`: `cubic-bezier(.22, 1, .36, 1)`
- `--gutter`: `20px`

## Shape and motion
- Radii used: 6px, 8px, 10px, 12px, 16px
- Motion: one curve, `cubic-bezier(.22, 1, .36, 1)`; hero children rise 14px with a 70ms stagger; `prefers-reduced-motion` turns it all off.
- Press feedback: a small `scale()` on buttons; hover is a 150ms color step.
