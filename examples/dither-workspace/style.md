# dither-workspace: style

The visual spec of `index.html`. Every value here is copied from the file's `:root` tokens and `@font-face` rules, so they stay in sync.

## Color tokens
| Token | Value |
|---|---|
| `--shell` | `#0b0b0c` |
| `--side` | `#0e0e10` |
| `--glass` | `rgb(13 14 18 / .8)` |
| `--glass-2` | `rgb(255 255 255 / .06)` |
| `--line` | `rgb(255 255 255 / .1)` |
| `--line-2` | `rgb(255 255 255 / .18)` |
| `--ink` | `#ececee` |
| `--ink-2` | `#b4b6bd` |
| `--ink-3` | `#94969e` |
| `--heat-0` | `#1a2740` |
| `--heat-1` | `#24437a` |
| `--heat-2` | `#2f5fb0` |
| `--heat-3` | `#4f86e0` |
| `--heat-4` | `#86b4ff` |
| `--ok` | `#49c27d` |
| `--down` | `#ff8a80` |

**Strategy:** Restrained dark chrome with one blue for data; the art supplies the only warm color.

## Typography
| Family | Weights bundled |
|---|---|
| Geist | 400, 500, 600 |
| Geist Mono | 400 |

Geist 400/500/600 at 14px base; 26px for the product name; Geist Mono for deltas.

Fonts load from `../fonts/`. When the user hasn't picked fonts, swap every family to Geist + Geist Mono (see `references/default-theme.md`).

## Other tokens
- `--font-ui`: `"Geist", ui-sans-serif, system-ui, sans-serif`
- `--font-mono`: `"Geist Mono", ui-monospace, monospace`
- `--ease`: `cubic-bezier(.22, 1, .36, 1)`
- `--gutter`: `16px`

## Shape and motion
- Radii used: 2px, 4px, 7px, 8px, 9px, 14px
- Motion: one curve, `cubic-bezier(.22, 1, .36, 1)`; hero children rise 14px with a 70ms stagger; `prefers-reduced-motion` turns it all off.
- Press feedback: a small `scale()` on buttons; hover is a 150ms color step.
