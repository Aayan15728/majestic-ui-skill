# clear-sky: style

The visual spec of `index.html`. Every value here is copied from the file's `:root` tokens and `@font-face` rules, so they stay in sync.

## Color tokens
| Token | Value |
|---|---|
| `--sky-top` | `#1b62bb` |
| `--sky-text` | `#2a72c4` |
| `--page` | `#ffffff` |
| `--ink` | `#0f1c2e` |
| `--ink-2` | `#4a5568` |
| `--on-sky` | `#ffffff` |
| `--on-sky-2` | `rgb(255 255 255 / .92)` |
| `--action` | `#1d4ed8` |
| `--action-hi` | `#2f6fe8` |
| `--action-ink` | `#ffffff` |
| `--glass` | `rgb(22 22 26 / .78)` |
| `--glass-line` | `rgb(255 255 255 / .12)` |
| `--app` | `#141417` |
| `--app-2` | `#1c1c21` |
| `--app-ink` | `rgb(237 237 240)` |
| `--app-ink-2` | `#a3a3ad` |
| `--warm-1` | `#fde3c4` |
| `--warm-2` | `#f6b67a` |
| `--warm-3` | `#ef8f4d` |

**Strategy:** Committed: the sky blue owns the first screen; the warm wallpaper is the only counter-color, and only inside the product frame.

## Typography
| Family | Weights bundled |
|---|---|
| Geist Serif | 400 |
| Geist | 400, 500, 600 |

Geist Serif 400 at 80px (44px on phones), Geist 500/600 for nav, lead and buttons.

Fonts load from `../fonts/`. When the user hasn't picked fonts, swap every family to Geist + Geist Mono (see `references/default-theme.md`).

## Other tokens
- `--font-display`: `"Geist Serif", ui-serif, Georgia, serif`
- `--font-ui`: `"Geist", ui-sans-serif, system-ui, sans-serif`
- `--ease`: `cubic-bezier(.22, 1, .36, 1)`
- `--gutter`: `20px`

## Shape and motion
- Radii used: 2px, 4px, 6px, 8px, 10px, 12px, 14px, 16px, 18px, 999px
- Motion: one curve, `cubic-bezier(.22, 1, .36, 1)`; hero children rise 14px with a 70ms stagger; `prefers-reduced-motion` turns it all off.
- Press feedback: a small `scale()` on buttons; hover is a 150ms color step.
