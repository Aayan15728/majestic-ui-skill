# Building components

Use this when the work is a reusable UI piece (a button, a dialog, a combobox, a pricing table) rather than a single page. A good component is easy to drop in, easy to restyle, works for everyone, and can be read and changed by whoever owns it.

## Know what you're building
| Level | What it is | Example |
|---|---|---|
| Primitive | behavior and accessibility, no styling | dialog logic, focus trap, roving tabindex |
| Component | a styled, reusable unit built on primitives | Button, Select, Tabs |
| Pattern | a recurring solution described in words, framework-free | inline form validation, confirm-before-delete, optimistic update |
| Block | an opinionated, ready-to-ship composition for one use case | pricing table, auth screen, billing settings |
| Page | blocks arranged into one route | a landing page, a settings page |
| Template | several pages plus routing, layouts and providers | a SaaS starter |
| Utility | non-visual helper | `useControllableState`, a class merger |

Name the level before you start. It decides how generic the API must be: a primitive has to work everywhere, while a block may hard-code its layout and copy.

## Principles
1. **Compose, don't configure.** Prefer small parts that nest (`<Tabs><Tabs.List><Tabs.Trigger/></Tabs.List><Tabs.Content/></Tabs>`) over one component with forty props. Let callers pass children and slots.
2. **Accessible out of the box.** Use the right element, a complete keyboard map, managed focus and correct ARIA state. Accessibility is part of "done", not a later feature.
3. **Restylable without a fight.** Visuals come from tokens and merged class names, never from hard-coded values a consumer can't override.
4. **Light.** No heavy dependency for a small behavior. Optional extras (virtualization, animation) stay optional.
5. **Open.** Readable source someone can copy into their repo and change. No black boxes.
6. **Documented.** Each component has its purpose, props with defaults, its keyboard map, accessibility notes, and live examples.

## API conventions
- **Naming of parts:** `Root` (state and context), `Trigger` (opens or toggles), `Content` (what appears), `Item` (a repeatable entry), plus `Title` / `Description` for labelled regions.
- **Variants are props, not new components:** `variant="primary|secondary|ghost|destructive"`, `size="sm|md|lg"`. Define them in one place (a variant map, such as the cva pattern), with defaults.
- **Class merging:** accept a `className`, and merge it last through a helper that resolves conflicts (a `cn()` built on clsx + tailwind-merge), so callers win.
- **Forward everything:** pass refs, `id`, `aria-*`, `data-*` and event handlers through to the real DOM element.
- **Render as another element:** when a trigger must really be a link or a router `Link`, support an `asChild` (or `as`) escape hatch that merges props onto the child instead of nesting a `<button>` inside an `<a>`. The child must accept and spread those props, and must be a single element.
- **Controlled and uncontrolled:** support both. `value` + `onValueChange` for control, `defaultValue` for self-managed state, merged through one hook so the component never fights its parent.

## State and styling hooks
- **`data-state`** carries visual state for CSS: `data-state="open|closed"`, `"active|inactive"`, `"checked|unchecked"`, plus `data-disabled`, `data-orientation`, `data-side`. Style with `[data-state=open]` instead of juggling conditional classes.
- **`data-slot`** gives each part a stable name (`data-slot="card-header"`), so parents and global styles can target parts without depending on markup depth: `[data-slot=card]:has([data-slot=card-footer])`.
- **Props versus data attributes:** use props for choices the caller makes (variant, size, behavior), and data attributes for state the component reports (open, active, side).

## Tokens
- Name tokens by role, not by value: `--background`, `--foreground`, `--muted`, `--muted-foreground`, `--border`, `--ring`, `--primary`, `--primary-foreground`, `--destructive`, `--radius`.
- Every surface token has a matching `-foreground` partner that passes contrast on it. Pair them in components (`bg-primary text-primary-foreground`) so swapping a theme can't break legibility.
- Dark mode and brand themes redefine the token values under a selector (`.dark`, `[data-theme=…]`). Components never mention raw colors.
- Use OKLCH for even, predictable steps when generating scales.

## Accessibility checklist per component
- Correct element or role, and an accessible name.
- A full keyboard map, implemented and documented.
- Focus: initial target, trap if modal, restore on close, visible ring.
- Relationships wired: `aria-controls`, `aria-expanded`, `aria-selected`, `aria-labelledby`, `aria-describedby`.
- Announcements: `aria-live` for async results and progress.
- Disabled controls explain why, and stay focusable when the reason matters (`aria-disabled` instead of `disabled`).
- Touch target at least 44px on mobile, and contrast passes in every variant and state.
- Never a placeholder as the label, and never an empty button.

## Shipping
- **Copy-in (registry) distribution** suits blocks and styled components people will customize. **Package distribution** suits primitives and utilities that benefit from versioned updates.
- Document install, minimal usage, every variant, the controlled example, the keyboard map and theming. Show it rendered, not just as code.
