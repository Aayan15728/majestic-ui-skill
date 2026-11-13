# dark-highlight-pill: style

The visual spec of `index.html`. Every value here is copied from the file's `:root` tokens and `@font-face` rules, so they stay in sync.

## Color tokens
| Token | Value |
|---|---|
| `--canvas` | `#191919` |
| `--surface` | `#232323` |
| `--surface-2` | `#2c2c2c` |
| `--ink` | `#f4f4f4` |
| `--ink-2` | `rgb(168 168 168)` |
| `--ink-3` | `rgb(128 128 128)` |
| `--hairline` | `rgb(255 255 255 / .1)` |
| `--glass-edge` | `inset 0 1px 0 rgb(255 255 255 / .07)` |
| `--blue` | `#2b7bff` |
| `--blue-light` | `#4e95ff` |
| `--hl-bg` | `#a9d3ff` |
| `--hl-ink` | `#1b5fd8` |

**Strategy:** Restrained dark with one blue accent.

## Typography
| Family | Weights bundled |
|---|---|
| Geist | 400, 500, 600, 700 |
| Geist Mono | 500 |

Geist 700 display.

Fonts load from `../fonts/`. When the user hasn't picked fonts, swap every family to Geist + Geist Mono (see `references/default-theme.md`).

## Other tokens
- `--font-ui`: `"Geist", ui-sans-serif, system-ui, sans-serif`
- `--font-mono`: `"Geist Mono", ui-monospace, monospace`
- `--ease`: `cubic-bezier(.22, 1, .36, 1)`
- `--gutter`: `20px`

## Shape and motion
- Radii used: 2px, 5px, 6px, 8px, 10px, 12px, 18px, 999px
- Motion: one curve, `cubic-bezier(.22, 1, .36, 1)`; hero children rise 14px with a 70ms stagger; `prefers-reduced-motion` turns it all off.
- Press feedback: a small `scale()` on buttons; hover is a 150ms color step.
