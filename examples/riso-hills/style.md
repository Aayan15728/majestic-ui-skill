# riso-hills: style

The visual spec of `index.html`. Every value here is copied from the file's `:root` tokens and `@font-face` rules, so they stay in sync.

## Color tokens
| Token | Value |
|---|---|
| `--paper` | `#ebb424` |
| `--cream` | `#fbf1d9` |
| `--ink` | `#1a1712` |
| `--ink-2` | `#3a2f12` |
| `--cloud-ink` | `#4a86b8` |
| `--hill-1` | `#9fcb48` |
| `--hill-2` | `#6db33f` |
| `--hill-3` | `#3e8a3a` |
| `--hill-4` | `#2c6b35` |

**Strategy:** Drenched: the mustard paper is the color, with cream, blue and greens from the print.

## Typography
| Family | Weights bundled |
|---|---|
| Geist | 400, 500, 700, 800 |
| Geist Mono | 500 |

Geist 700 and 800, all-caps second line at −0.045em, Geist Mono for the small label.

Fonts load from `../fonts/`. When the user hasn't picked fonts, swap every family to Geist + Geist Mono (see `references/default-theme.md`).

## Other tokens
- `--font-ui`: `"Geist", ui-sans-serif, system-ui, sans-serif`
- `--font-mono`: `"Geist Mono", ui-monospace, monospace`
- `--ease`: `cubic-bezier(.22, 1, .36, 1)`
- `--gutter`: `20px`

## Shape and motion
- Radii used: 6px, 8px, 999px
- Motion: one curve, `cubic-bezier(.22, 1, .36, 1)`; hero children rise 14px with a 70ms stagger; `prefers-reduced-motion` turns it all off.
- Press feedback: a small `scale()` on buttons; hover is a 150ms color step.
