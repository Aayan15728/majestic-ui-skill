# serif-stats: style

The visual spec of `index.html`. Every value here is copied from the file's `:root` tokens and `@font-face` rules, so they stay in sync.

## Color tokens
| Token | Value |
|---|---|
| `--canvas` | `#ffffff` |
| `--surface` | `#f4f4f6` |
| `--ink` | `#0f0f12` |
| `--ink-2` | `color-mix(in oklab, var(--ink) 62%, var(--canvas))` |
| `--ink-3` | `color-mix(in oklab, var(--ink) 48%, var(--canvas))` |
| `--dim` | `#7b7b80` |
| `--hairline` | `color-mix(in oklab, var(--ink) 9%, transparent)` |
| `--accent` | `#1d4ed8` |
| `--accent-soft` | `#e8eeff` |
| `--brand` | `#f0532d` |

**Strategy:** Restrained: ink on white with one solid blue accent.

## Typography
| Family | Weights bundled |
|---|---|
| Newsreader | 400, 400 italic, 500 |
| Geist | 400, 500, 600 |
| Geist Mono | 500 |

Newsreader 400 with italic for display, Geist UI, Geist Mono for counts.

Fonts load from `../fonts/`. When the user hasn't picked fonts, swap every family to Geist + Geist Mono (see `references/default-theme.md`).

## Other tokens
- `--font-display`: `"Newsreader", ui-serif, Georgia, serif`
- `--font-ui`: `"Geist", ui-sans-serif, system-ui, sans-serif`
- `--font-mono`: `"Geist Mono", ui-monospace, monospace`
- `--ease`: `cubic-bezier(.22, 1, .36, 1)`
- `--gutter`: `20px`

## Shape and motion
- Radii used: 6px, 8px, 12px, 18px, 20px, 999px
- Motion: one curve, `cubic-bezier(.22, 1, .36, 1)`; hero children rise 14px with a 70ms stagger; `prefers-reduced-motion` turns it all off.
- Press feedback: a small `scale()` on buttons; hover is a 150ms color step.
