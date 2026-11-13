# dark-split: style

The visual spec of `index.html`. Every value here is copied from the file's `:root` tokens and `@font-face` rules, so they stay in sync.

## Color tokens
| Token | Value |
|---|---|
| `--canvas` | `#1f1f1f` |
| `--surface` | `#161616` |
| `--ink` | `#ececec` |
| `--ink-2` | `rgb(170 170 170)` |
| `--ink-3` | `rgb(128 128 128)` |
| `--hairline` | `rgb(255 255 255 / .12)` |
| `--accent` | `#fcc419` |
| `--accent-ink` | `#1d1400` |
| `--mark` | `#e9dccb` |
| `--mark-ink` | `#2b1b05` |
| `--good` | `#7bd88f` |

**Strategy:** Committed: yellow accent on #1f1f1f.

## Typography
| Family | Weights bundled |
|---|---|
| Bricolage | 700, 800 |
| Geist | 400, 500, 600 |
| Geist Mono | 500 |

Bricolage 800 display, Geist UI, Geist Mono keycaps.

Fonts load from `../fonts/`. When the user hasn't picked fonts, swap every family to Geist + Geist Mono (see `references/default-theme.md`).

## Other tokens
- `--font-display`: `"Bricolage", ui-sans-serif, system-ui, sans-serif`
- `--font-ui`: `"Geist", ui-sans-serif, system-ui, sans-serif`
- `--font-mono`: `"Geist Mono", ui-monospace, monospace`
- `--ease`: `cubic-bezier(.22, 1, .36, 1)`
- `--gutter`: `20px`

## Shape and motion
- Radii used: 4px, 6px, 8px, 10px, 12px, 14px
- Motion: one curve, `cubic-bezier(.22, 1, .36, 1)`; hero children rise 14px with a 70ms stagger; `prefers-reduced-motion` turns it all off.
- Press feedback: a small `scale()` on buttons; hover is a 150ms color step.
