# pixel-forge: style

The visual spec of `index.html`. Every value here is copied from the file's `:root` tokens and `@font-face` rules, so they stay in sync.

## Color tokens
| Token | Value |
|---|---|
| `--field` | `#3d5cf5` |
| `--field-light` | `#6f86ff` |
| `--page` | `#ffffff` |
| `--ink` | `#121318` |
| `--ink-2` | `color-mix(in oklab, var(--ink) 66%, white)` |
| `--ink-3` | `color-mix(in oklab, var(--ink) 48%, white)` |
| `--hairline` | `rgb(18 19 24 / .12)` |
| `--accent` | `#2f55f2` |

**Strategy:** Committed: a solid blue field around a white page; the grove has its own 16-color palette.

## Typography
| Family | Weights bundled |
|---|---|
| Geist Pixel | 400 |
| Geist | 400, 500, 600 |

Geist Pixel (Square) for the logo and headline, Geist UI.

Fonts load from `../fonts/`. When the user hasn't picked fonts, swap every family to Geist + Geist Mono (see `references/default-theme.md`).

## Other tokens
- `--font-pixel`: `"Geist Pixel", ui-monospace, monospace`
- `--font-ui`: `"Geist", ui-sans-serif, system-ui, sans-serif`
- `--ease`: `cubic-bezier(.22, 1, .36, 1)`
- `--gutter`: `20px`

## Shape and motion
- Radii used: none
- Motion: one curve, `cubic-bezier(.22, 1, .36, 1)`; hero children rise 14px with a 70ms stagger; `prefers-reduced-motion` turns it all off.
- Press feedback: a small `scale()` on buttons; hover is a 150ms color step.
