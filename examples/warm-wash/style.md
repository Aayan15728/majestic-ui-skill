# warm-wash: style

The visual spec of `index.html`. Every value here is copied from the file's `:root` tokens and `@font-face` rules, so they stay in sync.

## Color tokens
| Token | Value |
|---|---|
| `--canvas` | `#fffdfb` |
| `--ink` | `#141210` |
| `--ink-2` | `color-mix(in oklab, var(--ink) 66%, var(--canvas))` |
| `--ink-3` | `color-mix(in oklab, var(--ink) 50%, var(--canvas))` |
| `--hairline` | `color-mix(in oklab, var(--ink) 9%, transparent)` |
| `--accent` | `#f0623a` |
| `--accent-deep` | `#c2410c` |
| `--wash-1` | `#ffcdb2` |
| `--wash-2` | `#ffe3d3` |
| `--wash-3` | `#fff3eb` |
| `--mark` | `color-mix(in oklab, var(--ink) 55%, transparent)` |

**Strategy:** Committed warm: one coral accent over a peach-tinted canvas.

## Typography
| Family | Weights bundled |
|---|---|
| Funnel Display | 500, 600 |
| Geist | 400, 500, 600 |
| Geist Mono | 400, 500 |

Funnel Display 500–600 for display, Geist for UI, Geist Mono for the badge and figures.

Fonts load from `../fonts/`. When the user hasn't picked fonts, swap every family to Geist + Geist Mono (see `references/default-theme.md`).

## Other tokens
- `--r-control`: `10px`
- `--r-frame`: `18px`
- `--font-display`: `"Funnel Display", ui-sans-serif, system-ui, sans-serif`
- `--font-ui`: `"Geist", ui-sans-serif, system-ui, sans-serif`
- `--font-mono`: `"Geist Mono", ui-monospace, monospace`
- `--ease`: `cubic-bezier(.22, 1, .36, 1)`
- `--gutter`: `20px`

## Shape and motion
- Radii used: 2px, 3px, 4px, 5px, 8px, 9px, 12px, 14px
- Motion: one curve, `cubic-bezier(.22, 1, .36, 1)`; hero children rise 14px with a 70ms stagger; `prefers-reduced-motion` turns it all off.
- Press feedback: a small `scale()` on buttons; hover is a 150ms color step.
