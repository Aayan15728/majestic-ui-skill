# warm-grey-glow: style

The visual spec of `index.html`. Every value here is copied from the file's `:root` tokens and `@font-face` rules, so they stay in sync.

## Color tokens
| Token | Value |
|---|---|
| `--canvas` | `#ecebe7` |
| `--panel` | `#f7f6f3` |
| `--white` | `#ffffff` |
| `--ink` | `#141413` |
| `--ink-2` | `color-mix(in oklab, var(--ink) 64%, var(--canvas))` |
| `--ink-3` | `color-mix(in oklab, var(--ink) 46%, var(--canvas))` |
| `--hairline` | `rgb(20 20 19 / .09)` |
| `--glow-a` | `#ff9a57` |
| `--glow-b` | `#f4b5c6` |
| `--good` | `#1e8a52` |

**Strategy:** Restrained warm grey with one warm glow.

## Typography
| Family | Weights bundled |
|---|---|
| Bricolage | 700, 800 |
| Newsreader | 400 |
| Geist | 400, 500, 600 |
| Geist Mono | 400 |

Bricolage 800 display, Newsreader numbers, Geist UI, Geist Mono deltas.

Fonts load from `../fonts/`. When the user hasn't picked fonts, swap every family to Geist + Geist Mono (see `references/default-theme.md`).

## Other tokens
- `--font-display`: `"Bricolage", ui-sans-serif, system-ui, sans-serif`
- `--font-num`: `"Newsreader", ui-serif, Georgia, serif`
- `--font-ui`: `"Geist", ui-sans-serif, system-ui, sans-serif`
- `--font-mono`: `"Geist Mono", ui-monospace, monospace`
- `--ease`: `cubic-bezier(.22, 1, .36, 1)`
- `--gutter`: `20px`

## Shape and motion
- Radii used: 6px, 8px, 10px, 14px, 20px, 999px
- Motion: one curve, `cubic-bezier(.22, 1, .36, 1)`; hero children rise 14px with a 70ms stagger; `prefers-reduced-motion` turns it all off.
- Press feedback: a small `scale()` on buttons; hover is a 150ms color step.
