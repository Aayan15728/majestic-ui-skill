# serif-phone: style

The visual spec of `index.html`. Every value here is copied from the file's `:root` tokens and `@font-face` rules, so they stay in sync.

## Color tokens
| Token | Value |
|---|---|
| `--canvas` | `#fdfdfc` |
| `--ink` | `#0e1a2b` |
| `--ink-2` | `color-mix(in oklab, var(--ink) 70%, var(--canvas))` |
| `--ink-3` | `color-mix(in oklab, var(--ink) 50%, var(--canvas))` |
| `--hairline` | `color-mix(in oklab, var(--ink) 10%, transparent)` |
| `--petal` | `#dcd9d6` |
| `--bubble-me` | `#0a84ff` |
| `--bubble-them` | `#e9e9eb` |

**Strategy:** Restrained: navy ink on near-white.

## Typography
| Family | Weights bundled |
|---|---|
| Newsreader | 400, 400 italic, 500 |
| Geist | 400, 500, 600 |

Newsreader with italic for display, Geist UI.

Fonts load from `../fonts/`. When the user hasn't picked fonts, swap every family to Geist + Geist Mono (see `references/default-theme.md`).

## Other tokens
- `--font-display`: `"Newsreader", ui-serif, Georgia, serif`
- `--font-ui`: `"Geist", ui-sans-serif, system-ui, sans-serif`
- `--ease`: `cubic-bezier(.22, 1, .36, 1)`
- `--gutter`: `20px`

## Shape and motion
- Radii used: 7px, 8px, 10px, 16px, 18px, 20px, 44px, 56px, 999px
- Motion: one curve, `cubic-bezier(.22, 1, .36, 1)`; hero children rise 14px with a 70ms stagger; `prefers-reduced-motion` turns it all off.
- Press feedback: a small `scale()` on buttons; hover is a 150ms color step.
