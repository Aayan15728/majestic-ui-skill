# paper-canvas: style

The visual spec of `index.html`. Every value here is copied from the file's `:root` tokens and `@font-face` rules, so they stay in sync.

## Color tokens
| Token | Value |
|---|---|
| `--paper` | `#f4f2ec` |
| `--paper-2` | `#fbfaf6` |
| `--fold` | `#e7e3d5` |
| `--ink` | `#161614` |
| `--ink-2` | `color-mix(in oklab, var(--ink) 58%, var(--paper))` |
| `--ink-3` | `color-mix(in oklab, var(--ink) 44%, var(--paper))` |
| `--hairline` | `rgb(22 22 20 / .12)` |
| `--line` | `rgb(22 22 20 / .16)` |
| `--accent` | `#5b8def` |

**Strategy:** Restrained warm: ink on paper, one soft blue inside the product.

## Typography
| Family | Weights bundled |
|---|---|
| Geist | 300, 400, 500 |
| Geist Mono | 400 |

Geist 400 lowercase headline at −0.035em, Geist UI, Geist Mono in the properties.

Fonts load from `../fonts/`. When the user hasn't picked fonts, swap every family to Geist + Geist Mono (see `references/default-theme.md`).

## Other tokens
- `--font-ui`: `"Geist", ui-sans-serif, system-ui, sans-serif`
- `--font-mono`: `"Geist Mono", ui-monospace, monospace`
- `--ease`: `cubic-bezier(.22, 1, .36, 1)`
- `--gutter`: `20px`

## Shape and motion
- Radii used: 3px, 4px, 6px, 8px, 12px
- Motion: one curve, `cubic-bezier(.22, 1, .36, 1)`; hero children rise 14px with a 70ms stagger; `prefers-reduced-motion` turns it all off.
- Press feedback: a small `scale()` on buttons; hover is a 150ms color step.
