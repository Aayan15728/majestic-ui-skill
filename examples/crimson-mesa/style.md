# crimson-mesa: style

The visual spec of `index.html`. Every value here is copied from the file's `:root` tokens and `@font-face` rules, so they stay in sync.

## Color tokens
| Token | Value |
|---|---|
| `--night` | `#07080c` |
| `--night-2` | `#101218` |
| `--panel` | `#12141b` |
| `--panel-2` | `#191c25` |
| `--line` | `rgb(255 255 255 / .1)` |
| `--line-2` | `rgb(255 255 255 / .16)` |
| `--ink` | `rgb(244 244 246)` |
| `--ink-2` | `#c4c7cf` |
| `--ink-3` | `#969aa5` |
| `--crimson` | `#d4151b` |
| `--ember` | `#f26a1b` |
| `--ok` | `#4fbf7f` |

**Strategy:** Drenched dark with one saturated field: crimson owns the lower third of the first screen and appears nowhere else except small list markers.

## Typography
| Family | Weights bundled |
|---|---|
| Geist | 400, 500, 600 |
| Geist Mono | 400 |

Geist 600 at 88px (−0.04em) for the headline, 500 for nav and buttons, Geist Mono for the run log and the kicker.

Fonts load from `../fonts/`. When the user hasn't picked fonts, swap every family to Geist + Geist Mono (see `references/default-theme.md`).

## Other tokens
- `--font-ui`: `"Geist", ui-sans-serif, system-ui, sans-serif`
- `--font-mono`: `"Geist Mono", ui-monospace, monospace`
- `--ease`: `cubic-bezier(.22, 1, .36, 1)`
- `--gutter`: `20px`

## Shape and motion
- Radii used: 1px, 5px, 6px, 8px, 10px, 16px
- Motion: one curve, `cubic-bezier(.22, 1, .36, 1)`; hero children rise 14px with a 70ms stagger; `prefers-reduced-motion` turns it all off.
- Press feedback: a small `scale()` on buttons; hover is a 150ms color step.
