# gradient-frame: style

The visual spec of `index.html`. Every value here is copied from the file's `:root` tokens and `@font-face` rules, so they stay in sync.

## Color tokens
| Token | Value |
|---|---|
| `--edge-a` | `#3a6dff` |
| `--edge-b` | `#ff8a3d` |
| `--page` | `#ffffff` |
| `--ink` | `#0e1220` |
| `--ink-2` | `color-mix(in oklab, var(--ink) 64%, white)` |
| `--ink-3` | `color-mix(in oklab, var(--ink) 46%, white)` |
| `--hairline` | `rgb(14 18 32 / .09)` |
| `--accent` | `#3a6dff` |
| `--good` | `#129e5b` |

**Strategy:** Committed two-hue frame, white page.

## Typography
| Family | Weights bundled |
|---|---|
| Bricolage | 700, 800 |
| Geist | 400, 500, 600 |
| Geist Mono | 500 |

Bricolage 800 display, Geist UI.

Fonts load from `../fonts/`. When the user hasn't picked fonts, swap every family to Geist + Geist Mono (see `references/default-theme.md`).

## Other tokens
- `--font-display`: `"Bricolage", ui-sans-serif, system-ui, sans-serif`
- `--font-ui`: `"Geist", ui-sans-serif, system-ui, sans-serif`
- `--font-mono`: `"Geist Mono", ui-monospace, monospace`
- `--ease`: `cubic-bezier(.22, 1, .36, 1)`
- `--gutter`: `20px`
- `--frame`: `10px`

## Shape and motion
- Radii used: 6px, 8px, 10px, 16px, 20px, 24px, 28px, 34px, 44px, 999px
- Motion: one curve, `cubic-bezier(.22, 1, .36, 1)`; hero children rise 14px with a 70ms stagger; `prefers-reduced-motion` turns it all off.
- Press feedback: a small `scale()` on buttons; hover is a 150ms color step.
