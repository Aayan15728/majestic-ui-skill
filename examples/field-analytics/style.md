# field-analytics: style

The visual spec of `index.html`. Every value here is copied from the file's `:root` tokens and `@font-face` rules, so they stay in sync.

## Color tokens
| Token | Value |
|---|---|
| `--desk` | `#b9cf9a` |
| `--app` | `#f6f6f3` |
| `--side` | `#fbfbf9` |
| `--card` | `#ffffff` |
| `--line` | `#e7e7e2` |
| `--line-2` | `#d6d6cf` |
| `--ink` | `#1b1b19` |
| `--ink-2` | `#63635d` |
| `--fill` | `#efefea` |
| `--accent` | `#f05a1f` |
| `--accent-ink` | `#b93c0a` |
| `--accent-1` | `#fde3d4` |
| `--accent-2` | `#f9b48f` |
| `--accent-3` | `#f5854f` |
| `--up` | `#17683f` |
| `--down` | `#a8321f` |

**Strategy:** Restrained: warm neutrals, one orange in four tints for all data, ink and grey for comparison series; green and red only on deltas, always with an arrow.

## Typography
| Family | Weights bundled |
|---|---|
| Geist | 400, 500, 600 |

Geist only: 28px/600 title, 26 to 30px/500 figures with tabular numerals, 14px body, 12 to 13px labels.

Fonts load from `../fonts/`. When the user hasn't picked fonts, swap every family to Geist + Geist Mono (see `references/default-theme.md`).

## Other tokens
- `--font-ui`: `"Geist", ui-sans-serif, system-ui, sans-serif`
- `--ease`: `cubic-bezier(.22, 1, .36, 1)`
- `--gutter`: `16px`

## Shape and motion
- Radii used: 4px, 6px, 7px, 8px, 9px, 10px, 12px, 14px
- Motion: one curve, `cubic-bezier(.22, 1, .36, 1)`; hero children rise 14px with a 70ms stagger; `prefers-reduced-motion` turns it all off.
- Press feedback: a small `scale()` on buttons; hover is a 150ms color step.
