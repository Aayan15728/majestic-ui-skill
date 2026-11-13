# shape-flanks: style

The visual spec of `index.html`. Every value here is copied from the file's `:root` tokens and `@font-face` rules, so they stay in sync.

## Color tokens
| Token | Value |
|---|---|
| `--canvas` | `#ffffff` |
| `--ink` | `#141414` |
| `--ink-2` | `color-mix(in oklab, var(--ink) 64%, white)` |
| `--ink-3` | `color-mix(in oklab, var(--ink) 46%, white)` |
| `--hairline` | `rgb(20 20 20 / .1)` |
| `--soft` | `#f4f3f0` |
| `--s-coral` | `#ef6a45` |
| `--s-aqua` | `#8fe3cf` |
| `--s-sky` | `#a9c4f5` |
| `--s-sun` | `#f3d36b` |

**Strategy:** Full palette at the edges (coral, aqua, sky, sun, black); the center stays black on white.

## Typography
| Family | Weights bundled |
|---|---|
| Instrument Serif | 400, 400 italic |
| Geist | 400, 600 |
| Geist Mono | 400, 500 |

Instrument Serif with italic for display, Geist UI, Geist Mono for the toggle, buttons and the count line.

Fonts load from `../fonts/`. When the user hasn't picked fonts, swap every family to Geist + Geist Mono (see `references/default-theme.md`).

## Other tokens
- `--font-display`: `"Instrument Serif", ui-serif, Georgia, serif`
- `--font-ui`: `"Geist", ui-sans-serif, system-ui, sans-serif`
- `--font-mono`: `"Geist Mono", ui-monospace, monospace`
- `--ease`: `cubic-bezier(.22, 1, .36, 1)`
- `--gutter`: `20px`

## Shape and motion
- Radii used: 6px, 8px, 12px, 999px
- Motion: one curve, `cubic-bezier(.22, 1, .36, 1)`; hero children rise 14px with a 70ms stagger; `prefers-reduced-motion` turns it all off.
- Press feedback: a small `scale()` on buttons; hover is a 150ms color step.
