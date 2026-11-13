# gallery-tiles: style

The visual spec of `index.html`. Every value here is copied from the file's `:root` tokens and `@font-face` rules, so they stay in sync.

## Color tokens
| Token | Value |
|---|---|
| `--canvas` | `#ffffff` |
| `--parchment` | `#f5f5f7` |
| `--pearl` | `#fafafc` |
| `--ink` | `#1d1d1f` |
| `--muted` | `#6e6e73` |
| `--hairline` | `rgb(0 0 0 / .08)` |
| `--action` | `#0066cc` |
| `--focus` | `#0071e3` |
| `--link-dark` | `#2997ff` |
| `--tile-dark` | `#272729` |
| `--tile-dark-2` | `#2a2a2c` |
| `--chip` | `rgb(210 210 215 / .64)` |

**Strategy:** Restrained: neutrals plus one action blue used only for links, the primary pill and focus.

## Typography
| Family | Weights bundled |
|---|---|
| Geist | 300, 400, 500, 600 |
| Geist Mono | 400 |

Geist 600 headlines at clamp(48px, 7vw, 80px), tracking −0.035em; lead Geist 400 at 21–28px; body 17px/1.47; nav 12px.

Fonts load from `../fonts/`. When the user hasn't picked fonts, swap every family to Geist + Geist Mono (see `references/default-theme.md`).

## Other tokens
- `--r-sm`: `8px`
- `--r-md`: `11px`
- `--r-lg`: `18px`
- `--r-pill`: `980px`
- `--font-ui`: `"Geist", ui-sans-serif, system-ui, sans-serif`
- `--font-mono`: `"Geist Mono", ui-monospace, monospace`
- `--ease`: `cubic-bezier(.22, 1, .36, 1)`
- `--gutter`: `20px`

## Shape and motion
- Radii used: 4px
- Motion: one curve, `cubic-bezier(.22, 1, .36, 1)`; hero children rise 14px with a 70ms stagger; `prefers-reduced-motion` turns it all off.
- Press feedback: a small `scale()` on buttons; hover is a 150ms color step.
