# serif-globe: style

The visual spec of `index.html`. Every value here is copied from the file's `:root` tokens and `@font-face` rules, so they stay in sync.

## Color tokens
| Token | Value |
|---|---|
| `--canvas` | `#0c0c0c` |
| `--surface` | `#161616` |
| `--surface-2` | `#1d1d1d` |
| `--ink` | `rgb(237 237 237)` |
| `--ink-2` | `rgb(170 170 170)` |
| `--ink-3` | `rgb(124 124 124)` |
| `--hairline` | `rgb(255 255 255 / .1)` |
| `--hairline-2` | `rgb(255 255 255 / .16)` |
| `--accent` | `#ececec` |
| `--accent-ink` | `#111111` |

**Strategy:** Restrained dark: near-white ink and one off-white action color; the only hues live in the small tile marks.

## Typography
| Family | Weights bundled |
|---|---|
| Geist Serif | 400 |
| Geist | 400, 500 |
| Geist Mono | 500 |

Geist Serif 400 for display (one weight, no italic), Geist UI, Geist Mono for the chip.

Fonts load from `../fonts/`. When the user hasn't picked fonts, swap every family to Geist + Geist Mono (see `references/default-theme.md`).

## Other tokens
- `--font-display`: `"Geist Serif", ui-serif, Georgia, serif`
- `--font-ui`: `"Geist", ui-sans-serif, system-ui, sans-serif`
- `--font-mono`: `"Geist Mono", ui-monospace, monospace`
- `--ease`: `cubic-bezier(.22, 1, .36, 1)`
- `--gutter`: `20px`

## Shape and motion
- Radii used: 8px, 12px, 16px, 18px, 20px, 28px, 999px
- Motion: one curve, `cubic-bezier(.22, 1, .36, 1)`; hero children rise 14px with a 70ms stagger; `prefers-reduced-motion` turns it all off.
- Press feedback: a small `scale()` on buttons; hover is a 150ms color step.
