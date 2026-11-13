# inset-panel: style

The visual spec of `index.html`. Every value here is copied from the file's `:root` tokens and `@font-face` rules, so they stay in sync.

## Color tokens
| Token | Value |
|---|---|
| `--canvas` | `#efe7d8` |
| `--paper` | `#f7f2e8` |
| `--paper-2` | `#e6dccb` |
| `--ink` | `#1a1714` |
| `--ink-2` | `#5d554c` |
| `--line` | `#d8ccb8` |
| `--night` | `#151413` |
| `--night-2` | `#232120` |
| `--night-line` | `rgb(239 231 216 / .16)` |
| `--on-night` | `#efe7d8` |
| `--on-night-2` | `#a69e93` |
| `--accent` | `#f0621f` |
| `--accent-ink` | `#c8410c` |
| `--accent-btn` | `#d4460f` |
| `--accent-soft` | `#f9d6c0` |

**Strategy:** Committed two-tone: cream and near-black share the page about evenly; one orange is the only chroma, on the CTA, the active tab and the data.

## Typography
| Family | Weights bundled |
|---|---|
| Geist Serif | 400 |
| Geist | 400, 500, 600 |

Geist Serif 400 at 88px (−0.035em) for the hero, 64 and 46px for section headings; Geist 400/500/600 for everything else; numbers tabular.

Fonts load from `../fonts/`. When the user hasn't picked fonts, swap every family to Geist + Geist Mono (see `references/default-theme.md`).

## Other tokens
- `--font-display`: `"Geist Serif", ui-serif, Georgia, serif`
- `--font-ui`: `"Geist", ui-sans-serif, system-ui, sans-serif`
- `--ease`: `cubic-bezier(.22, 1, .36, 1)`
- `--gutter`: `20px`

## Shape and motion
- Radii used: 3px, 4px, 5px, 6px, 8px, 10px, 12px, 16px, 20px, 24px, 28px, 32px, 999px
- Motion: one curve, `cubic-bezier(.22, 1, .36, 1)`; hero children rise 14px with a 70ms stagger; `prefers-reduced-motion` turns it all off.
- Press feedback: a small `scale()` on buttons; hover is a 150ms color step.
