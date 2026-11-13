# cinematic-black: style

The visual spec of `index.html`. Every value here is copied from the file's `:root` tokens and `@font-face` rules, so they stay in sync.

## Color tokens
| Token | Value |
|---|---|
| `--canvas` | `#000` |
| `--ink` | `rgb(237 237 237)` |
| `--ink-2` | `rgb(163 163 163)` |
| `--ink-3` | `rgb(128 128 128)` |
| `--hairline` | `rgb(255 255 255 / .1)` |
| `--surface` | `#121214` |
| `--surface-2` | `#1a1a1d` |
| `--accent` | `#ffb547` |
| `--glass-edge` | `inset 0 1px 0 rgb(255 255 255 / .08)` |

**Strategy:** Restrained dark: near-white ink on black, one amber accent inside the scene.

## Typography
| Family | Weights bundled |
|---|---|
| Newsreader | 400, 500 |
| Geist | 400, 500, 600 |
| Geist Mono | 400 |

Newsreader 400–500 for display (on the overused-faces list, so keep it only when the user wants an editorial serif), Geist for UI, Geist Mono for keycaps.

Fonts load from `../fonts/`. When the user hasn't picked fonts, swap every family to Geist + Geist Mono (see `references/default-theme.md`).

## Other tokens
- `--font-display`: `"Newsreader", ui-serif, Georgia, serif`
- `--font-ui`: `"Geist", ui-sans-serif, system-ui, sans-serif`
- `--font-mono`: `"Geist Mono", ui-monospace, monospace`
- `--ease`: `cubic-bezier(.22, 1, .36, 1)`
- `--gutter`: `20px`

## Shape and motion
- Radii used: 6px, 7px, 8px, 10px, 11px, 16px, 20px, 999px
- Motion: one curve, `cubic-bezier(.22, 1, .36, 1)`; hero children rise 14px with a 70ms stagger; `prefers-reduced-motion` turns it all off.
- Press feedback: a small `scale()` on buttons; hover is a 150ms color step.
