# voice-ribbon: style

The visual spec of `index.html`. Every value here is copied from the file's `:root` tokens and `@font-face` rules, so they stay in sync.

## Color tokens
| Token | Value |
|---|---|
| `--canvas` | `#fdfce9` |
| `--ink` | `#161613` |
| `--ink-2` | `color-mix(in oklab, var(--ink) 68%, var(--canvas))` |
| `--ink-3` | `color-mix(in oklab, var(--ink) 50%, var(--canvas))` |
| `--hairline` | `color-mix(in oklab, var(--ink) 14%, transparent)` |
| `--lilac` | `#ead9fd` |
| `--lilac-hover` | `#dfc6fb` |
| `--murmur` | `#a8a79c` |

**Strategy:** Restrained warm: ink on butter, the dark band carries contrast.

## Typography
| Family | Weights bundled |
|---|---|
| Newsreader | 400, 400 italic |
| Geist | 400, 500, 600 |

Newsreader with italic, Geist UI.

Fonts load from `../fonts/`. When the user hasn't picked fonts, swap every family to Geist + Geist Mono (see `references/default-theme.md`).

## Other tokens
- `--font-display`: `"Newsreader", ui-serif, Georgia, serif`
- `--font-ui`: `"Geist", ui-sans-serif, system-ui, sans-serif`
- `--ease`: `cubic-bezier(.22, 1, .36, 1)`
- `--gutter`: `20px`

## Shape and motion
- Radii used: 1px, 3px, 8px, 12px, 16px, 32px, 56px, 999px
- Motion: one curve, `cubic-bezier(.22, 1, .36, 1)`; hero children rise 14px with a 70ms stagger; `prefers-reduced-motion` turns it all off.
- Press feedback: a small `scale()` on buttons; hover is a 150ms color step.
