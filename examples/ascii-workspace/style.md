# ascii-workspace: style

The visual spec of `index.html`. Every value here is copied from the file's `:root` tokens and `@font-face` rules, so they stay in sync.

## Color tokens
| Token | Value |
|---|---|
| `--canvas` | `#f6f5f1` |
| `--surface` | `#ffffff` |
| `--ink` | `#111111` |
| `--ink-2` | `color-mix(in oklab, var(--ink) 66%, var(--canvas))` |
| `--ink-3` | `color-mix(in oklab, var(--ink) 48%, var(--canvas))` |
| `--hairline` | `color-mix(in oklab, var(--ink) 10%, transparent)` |
| `--accent` | `#2f6feb` |

**Strategy:** Restrained: ink on #f6f5f1, one solid blue accent.

## Typography
| Family | Weights bundled |
|---|---|
| Geist | 400, 500, 600 |
| Geist Mono | 400, 500 |

Geist display and UI, Geist Mono for code.

Fonts load from `../fonts/`. When the user hasn't picked fonts, swap every family to Geist + Geist Mono (see `references/default-theme.md`).

## Other tokens
- `--font-ui`: `"Geist", ui-sans-serif, system-ui, sans-serif`
- `--font-mono`: `"Geist Mono", ui-monospace, monospace`
- `--ease`: `cubic-bezier(.22, 1, .36, 1)`
- `--gutter`: `20px`

## Shape and motion
- Radii used: 8px, 12px, 14px, 16px, 999px
- Motion: one curve, `cubic-bezier(.22, 1, .36, 1)`; hero children rise 14px with a 70ms stagger; `prefers-reduced-motion` turns it all off.
- Press feedback: a small `scale()` on buttons; hover is a 150ms color step.
