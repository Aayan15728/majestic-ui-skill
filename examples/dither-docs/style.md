# dither-docs: style

The visual spec of `index.html`. Every value here is copied from the file's `:root` tokens and `@font-face` rules, so they stay in sync.

## Color tokens
| Token | Value |
|---|---|
| `--canvas` | `#000000` |
| `--surface` | `#0e0e0f` |
| `--surface-2` | `#1a1a1c` |
| `--surface-3` | `#242427` |
| `--line` | `rgb(255 255 255 / .1)` |
| `--line-2` | `rgb(255 255 255 / .16)` |
| `--ink` | `#ededed` |
| `--ink-2` | `#a1a1a6` |
| `--ink-3` | `#8a8a90` |
| `--dot` | `#8f9bff` |
| `--dot-ground` | `#111112` |
| `--link` | `#a9b3ff` |

**Strategy:** Restrained: neutrals only in the chrome; one periwinkle used for the demo, links and focus.

## Typography
| Family | Weights bundled |
|---|---|
| Geist | 400, 500, 600 |
| Geist Mono | 400, 500 |

Geist 600 at 40px (−0.03em) for the title, 24px for sections, 16/1.6 body; Geist Mono for code and the logo.

Fonts load from `../fonts/`. When the user hasn't picked fonts, swap every family to Geist + Geist Mono (see `references/default-theme.md`).

## Other tokens
- `--font-ui`: `"Geist", ui-sans-serif, system-ui, sans-serif`
- `--font-mono`: `"Geist Mono", ui-monospace, monospace`
- `--ease`: `cubic-bezier(.22, 1, .36, 1)`
- `--gutter`: `20px`

## Shape and motion
- Radii used: 6px, 8px, 12px, 16px, 999px
- Motion: one curve, `cubic-bezier(.22, 1, .36, 1)`; hero children rise 14px with a 70ms stagger; `prefers-reduced-motion` turns it all off.
- Press feedback: a small `scale()` on buttons; hover is a 150ms color step.
