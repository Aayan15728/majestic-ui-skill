# sections-kit: style

The visual spec of `index.html`. Every value here is copied from the file's `:root` tokens and `@font-face` rules, so they stay in sync.

## Color tokens
| Token | Value |
|---|---|
| `--canvas` | `#ffffff` |
| `--shell` | `#f5f5f7` |
| `--card` | `#ffffff` |
| `--raise` | `#fafafc` |
| `--ink` | `#1d1d1f` |
| `--ink-2` | `#6e6e73` |
| `--ink-3` | `#86868b` |
| `--hairline` | `#e0e0e0` |
| `--hairline-2` | `#d2d2d7` |
| `--band` | `#1d1d1f` |
| `--band-ink` | `rgb(237 237 237)` |
| `--band-ink-2` | `#a1a1a6` |
| `--feature` | `#1d1d1f` |
| `--feature-inner` | `#0f0f10` |
| `--feature-ink` | `rgb(237 237 237)` |
| `--feature-ink-2` | `#a1a1a6` |
| `--action` | `#0066cc` |
| `--action-hover` | `#0071e3` |
| `--action-ink` | `#ffffff` |
| `--link` | `#0066cc` |
| `--good` | `#1e7f4f` |
| `--tag` | `#fff4e5` |
| `--tag-ink` | `#9a4b00` |
| `--dot` | `29 29 31` |

**Strategy:** Restrained: Gallery neutrals, one action blue; a dark featured tier and a dark band as the only big contrast steps. Dark mode raises surfaces in lightness steps instead of inverting.

## Typography
| Family | Weights bundled |
|---|---|
| Geist | 400, 500, 600 |
| Geist Serif | 400 |
| Geist Mono | 400 |

Geist Serif 400 for the hero (76px) and every section head (48px, 36px on phones), Geist 400/500/600 for UI, Geist Mono for code, times and outputs. Three families, about four weights.

Fonts load from `../fonts/`. When the user hasn't picked fonts, swap every family to Geist + Geist Mono (see `references/default-theme.md`).

## Other tokens
- `--font-ui`: `"Geist", ui-sans-serif, system-ui, sans-serif`
- `--font-display`: `"Geist Serif", ui-serif, Georgia, serif`
- `--font-mono`: `"Geist Mono", ui-monospace, monospace`
- `--ease`: `cubic-bezier(.22, 1, .36, 1)`
- `--gutter`: `20px`

## Shape and motion
- Radii used: 3px, 4px, 6px, 8px, 12px, 14px, 16px, 18px, 20px, 24px, 32px, 999px
- Motion: one curve, `cubic-bezier(.22, 1, .36, 1)`; hero children rise 14px with a 70ms stagger; `prefers-reduced-motion` turns it all off.
- Press feedback: a small `scale()` on buttons; hover is a 150ms color step.
