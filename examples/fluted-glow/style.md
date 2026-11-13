# fluted-glow: style

The visual spec of `index.html`. Every value here is copied from the file's `:root` tokens and `@font-face` rules, so they stay in sync.

## Color tokens
| Token | Value |
|---|---|
| `--canvas` | `#08070d` |
| `--ink` | `#f5f3ee` |
| `--ink-2` | `rgb(245 243 238 / .82)` |
| `--hairline` | `rgb(255 255 255 / .2)` |
| `--lime` | `#c8f04a` |
| `--lime-ink` | `#11160a` |
| `--glow-ember` | `#ff8a3d` |
| `--glow-rose` | `#e2468c` |
| `--glow-violet` | `#6b3fd6` |
| `--glow-cobalt` | `#2c48d8` |

**Strategy:** Full palette glow behind a near-black stage, with lime as the single interface accent.

## Typography
| Family | Weights bundled |
|---|---|
| Newsreader | 400, 400 italic, 500 |
| Geist | 400 |
| Geist Mono | 400, 500 |

Newsreader 400 display, italic for the wordmark, Geist UI, Geist Mono for nav and buttons.

Fonts load from `../fonts/`. When the user hasn't picked fonts, swap every family to Geist + Geist Mono (see `references/default-theme.md`).

## Other tokens
- `--font-display`: `"Newsreader", ui-serif, Georgia, serif`
- `--font-ui`: `"Geist", ui-sans-serif, system-ui, sans-serif`
- `--font-mono`: `"Geist Mono", ui-monospace, monospace`
- `--ease`: `cubic-bezier(.22, 1, .36, 1)`
- `--gutter`: `20px`

## Shape and motion
- Radii used: 999px
- Motion: one curve, `cubic-bezier(.22, 1, .36, 1)`; hero children rise 14px with a 70ms stagger; `prefers-reduced-motion` turns it all off.
- Press feedback: a small `scale()` on buttons; hover is a 150ms color step.
