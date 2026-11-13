# pastel-dreamscape: style

The visual spec of `index.html`. Every value here is copied from the file's `:root` tokens and `@font-face` rules, so they stay in sync.

## Color tokens
| Token | Value |
|---|---|
| `--sky-top` | `#8fbdf0` |
| `--sky-mid` | `#c4dbf6` |
| `--sky-low` | `#f7d9e2` |
| `--ink` | `#12243a` |
| `--ink-2` | `rgb(18 36 58 / .72)` |
| `--on-sky` | `#12243a` |

**Strategy:** Full palette pastel: sky, mint, peach and pink, one ink.

## Typography
| Family | Weights bundled |
|---|---|
| Geist | 300, 400, 500 |
| Geist Mono | 400 |

Geist 300 display, Geist 400–500 UI, Geist Mono for the availability line.

Fonts load from `../fonts/`. When the user hasn't picked fonts, swap every family to Geist + Geist Mono (see `references/default-theme.md`).

## Other tokens
- `--frame`: `rgb(255 255 255 / .42)`
- `--font-ui`: `"Geist", ui-sans-serif, system-ui, sans-serif`
- `--font-mono`: `"Geist Mono", ui-monospace, monospace`
- `--ease`: `cubic-bezier(.22, 1, .36, 1)`
- `--gutter`: `20px`

## Shape and motion
- Radii used: 6px, 8px, 16px, 999px
- Motion: one curve, `cubic-bezier(.22, 1, .36, 1)`; hero children rise 14px with a 70ms stagger; `prefers-reduced-motion` turns it all off.
- Press feedback: a small `scale()` on buttons; hover is a 150ms color step.
