# pixel-photo: style

The visual spec of `index.html`. Every value here is copied from the file's `:root` tokens and `@font-face` rules, so they stay in sync.

## Color tokens
| Token | Value |
|---|---|
| `--sky` | `#a9dcf5` |
| `--ink` | `#1b1b1b` |
| `--ink-2` | `rgb(27 27 27 / .82)` |
| `--paper` | `#fafafa` |
| `--hairline` | `rgb(27 27 27 / .12)` |
| `--coral` | `#ff7f7a` |
| `--coral-light` | `#ffb2a6` |
| `--bar` | `#1b1b1b` |

**Strategy:** Committed scene: sky and sand carry the color, one coral accent on actions.

## Typography
| Family | Weights bundled |
|---|---|
| Geist | 400, 500 |
| Geist Mono | 400, 500 |

Geist 500 headline, Geist Mono lead, nav and buttons (uppercase without added tracking).

Fonts load from `../fonts/`. When the user hasn't picked fonts, swap every family to Geist + Geist Mono (see `references/default-theme.md`).

## Other tokens
- `--font-ui`: `"Geist", ui-sans-serif, system-ui, sans-serif`
- `--font-mono`: `"Geist Mono", ui-monospace, monospace`
- `--ease`: `cubic-bezier(.22, 1, .36, 1)`
- `--gutter`: `20px`

## Shape and motion
- Radii used: 4px, 8px
- Motion: one curve, `cubic-bezier(.22, 1, .36, 1)`; hero children rise 14px with a 70ms stagger; `prefers-reduced-motion` turns it all off.
- Press feedback: a small `scale()` on buttons; hover is a 150ms color step.
