# glyph-heritage: style

The visual spec of `index.html`. Every value here is copied from the file's `:root` tokens and `@font-face` rules, so they stay in sync.

## Color tokens
| Token | Value |
|---|---|
| `--canvas` | `#18100b` |
| `--surface` | `#23180f` |
| `--ink` | `#f3e6d3` |
| `--ink-2` | `rgb(243 230 211 / .7)` |
| `--ink-3` | `rgb(243 230 211 / .5)` |
| `--hairline` | `rgb(243 230 211 / .12)` |
| `--accent` | `#e2a560` |
| `--accent-ink` | `#2a1806` |
| `--cover` | `#5b201b` |
| `--gold` | `#d9ab62` |

**Strategy:** Committed warm dark: amber on brown.

## Typography
| Family | Weights bundled |
|---|---|
| Newsreader | 400, 400 italic, 500 |
| Geist | 400, 500 |
| Geist Mono | 400 |

Newsreader with italic (overused face, keep only when asked for a serif), Geist UI, Geist Mono labels.

Fonts load from `../fonts/`. When the user hasn't picked fonts, swap every family to Geist + Geist Mono (see `references/default-theme.md`).

## Other tokens
- `--font-display`: `"Newsreader", ui-serif, Georgia, serif`
- `--font-ui`: `"Geist", ui-sans-serif, system-ui, sans-serif`
- `--font-mono`: `"Geist Mono", ui-monospace, monospace`
- `--ease`: `cubic-bezier(.22, 1, .36, 1)`
- `--gutter`: `20px`

## Shape and motion
- Radii used: 4px, 6px, 8px, 10px, 16px, 999px
- Motion: one curve, `cubic-bezier(.22, 1, .36, 1)`; hero children rise 14px with a 70ms stagger; `prefers-reduced-motion` turns it all off.
- Press feedback: a small `scale()` on buttons; hover is a 150ms color step.
