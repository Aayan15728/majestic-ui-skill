# serif-cursors: style

The visual spec of `index.html`. Every value here is copied from the file's `:root` tokens and `@font-face` rules, so they stay in sync.

## Color tokens
| Token | Value |
|---|---|
| `--canvas` | `#ffffff` |
| `--soft` | `#f6f6f4` |
| `--ink` | `#16171a` |
| `--ink-2` | `color-mix(in oklab, var(--ink) 64%, white)` |
| `--ink-3` | `color-mix(in oklab, var(--ink) 46%, white)` |
| `--hairline` | `rgb(22 23 26 / .09)` |
| `--you` | `#2f6bff` |
| `--them` | `#f5c518` |
| `--them-ink` | `#3a2c00` |
| `--good` | `#14935a` |

**Strategy:** Restrained: ink on white; the two partner colors (blue, yellow) only on cursors and the split bar.

## Typography
| Family | Weights bundled |
|---|---|
| Newsreader | 400, 400 italic, 500 |
| Geist | 400, 500, 600 |

Newsreader with italic, Geist UI.

Fonts load from `../fonts/`. When the user hasn't picked fonts, swap every family to Geist + Geist Mono (see `references/default-theme.md`).

## Other tokens
- `--font-display`: `"Newsreader", ui-serif, Georgia, serif`
- `--font-ui`: `"Geist", ui-sans-serif, system-ui, sans-serif`
- `--ease`: `cubic-bezier(.22, 1, .36, 1)`
- `--gutter`: `20px`

## Shape and motion
- Radii used: 4px, 6px, 8px, 14px, 18px, 20px, 36px, 44px, 999px
- Motion: one curve, `cubic-bezier(.22, 1, .36, 1)`; hero children rise 14px with a 70ms stagger; `prefers-reduced-motion` turns it all off.
- Press feedback: a small `scale()` on buttons; hover is a 150ms color step.
