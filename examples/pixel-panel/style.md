# pixel-panel: style

The visual spec of `index.html`. Every value here is copied from the file's `:root` tokens and `@font-face` rules, so they stay in sync.

## Color tokens
| Token | Value |
|---|---|
| `--canvas` | `#f4f3f1` |
| `--panel` | `#f3b47a` |
| `--ink` | `#1f2328` |
| `--ink-2` | `color-mix(in oklab, var(--ink) 70%, #fff)` |
| `--ink-3` | `color-mix(in oklab, var(--ink) 52%, #fff)` |
| `--hairline` | `color-mix(in oklab, var(--ink) 10%, transparent)` |
| `--brand` | `#f08a24` |
| `--select` | `#0a7aff` |

**Strategy:** Drenched hero: the orange panel is the color.

## Typography
| Family | Weights bundled |
|---|---|
| Geist | 400, 500, 600 |

Geist display and UI.

Fonts load from `../fonts/`. When the user hasn't picked fonts, swap every family to Geist + Geist Mono (see `references/default-theme.md`).

## Other tokens
- `--font-ui`: `"Geist", ui-sans-serif, system-ui, sans-serif`
- `--ease`: `cubic-bezier(.22, 1, .36, 1)`
- `--gutter`: `20px`

## Shape and motion
- Radii used: 6px, 8px, 10px, 12px, 14px, 16px, 24px
- Motion: one curve, `cubic-bezier(.22, 1, .36, 1)`; hero children rise 14px with a 70ms stagger; `prefers-reduced-motion` turns it all off.
- Press feedback: a small `scale()` on buttons; hover is a 150ms color step.
