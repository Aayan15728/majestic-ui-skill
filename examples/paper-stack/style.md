# paper-stack: style

The visual spec of `index.html`. Every value here is copied from the file's `:root` tokens and `@font-face` rules, so they stay in sync.

## Color tokens
| Token | Value |
|---|---|
| `--canvas` | `#f6f6f4` |
| `--card` | `#ffffff` |
| `--fill` | `#ecece8` |
| `--line` | `#e2e2dd` |
| `--line-2` | `#cfcfc8` |
| `--ink` | `#1c1c1a` |
| `--ink-2` | `#5e5e58` |
| `--night` | `#1f1f1d` |
| `--accent` | `#1d4ed8` |
| `--accent-soft` | `#e6ecfb` |
| `--live` | `#d92d20` |
| `--ok` | `#18794e` |

**Strategy:** Restrained: warm greys and near-black; one cobalt for the badge, focus and the coupon; red only for the LIVE status chip.

## Typography
| Family | Weights bundled |
|---|---|
| Geist | 400, 500, 600 |
| Geist Mono | 400, 500 |
| Geist Pixel | 400 |

Geist 500 at 76px (−0.045em) with one word in Geist Pixel; Geist 600 for section and card titles; Geist Mono caps at 12px for meta labels.

Fonts load from `../fonts/`. When the user hasn't picked fonts, swap every family to Geist + Geist Mono (see `references/default-theme.md`).

## Other tokens
- `--font-ui`: `"Geist", ui-sans-serif, system-ui, sans-serif`
- `--font-mono`: `"Geist Mono", ui-monospace, monospace`
- `--font-pixel`: `"Geist Pixel", "Geist Mono", monospace`
- `--ease`: `cubic-bezier(.22, 1, .36, 1)`
- `--gutter`: `20px`

## Shape and motion
- Radii used: 1px, 3px, 4px, 6px, 8px, 10px, 12px, 14px, 24px, 999px
- Motion: one curve, `cubic-bezier(.22, 1, .36, 1)`; hero children rise 14px with a 70ms stagger; `prefers-reduced-motion` turns it all off.
- Press feedback: a small `scale()` on buttons; hover is a 150ms color step.
