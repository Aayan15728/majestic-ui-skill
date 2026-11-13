# mountain-dawn: style

The visual spec of `index.html`. Every value here is copied from the file's `:root` tokens and `@font-face` rules, so they stay in sync.

## Color tokens
| Token | Value |
|---|---|
| `--night` | `#0a0e16` |
| `--surface` | `#121824` |
| `--ink` | `#f4f1ec` |
| `--ink-2` | `rgb(244 241 236 / .72)` |
| `--ink-3` | `rgb(244 241 236 / .5)` |
| `--hairline` | `rgb(244 241 236 / .1)` |
| `--dawn` | `#ffb27a` |

**Strategy:** Restrained dark with one dawn accent.

## Typography
| Family | Weights bundled |
|---|---|
| Instrument Serif | 400, 400 italic |
| Geist | 400, 500 |
| Geist Mono | 400 |

Instrument Serif with italic for display, Geist UI, Geist Mono labels.

Fonts load from `../fonts/`. When the user hasn't picked fonts, swap every family to Geist + Geist Mono (see `references/default-theme.md`).

## Other tokens
- `--font-display`: `"Instrument Serif", ui-serif, Georgia, serif`
- `--font-ui`: `"Geist", ui-sans-serif, system-ui, sans-serif`
- `--font-mono`: `"Geist Mono", ui-monospace, monospace`
- `--ease`: `cubic-bezier(.22, 1, .36, 1)`
- `--gutter`: `20px`

## Shape and motion
- Radii used: 2px
- Motion: one curve, `cubic-bezier(.22, 1, .36, 1)`; hero children rise 14px with a 70ms stagger; `prefers-reduced-motion` turns it all off.
- Press feedback: a small `scale()` on buttons; hover is a 150ms color step.
