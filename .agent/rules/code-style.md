---
trigger: always_on
---

# Code Style

## TypeScript

- Strict mode enabled (`strict: true` in tsconfig)
- Never use `any` — use proper types, `unknown`, or generics
- Prefer explicit interfaces and type definitions
- No unused locals or parameters

## Complexity Limits (enforced by Oxlint)

| Rule                        | Limit |
| --------------------------- | ----- |
| Cyclomatic complexity       | 10    |
| Max lines per function      | 50    |
| Max parameters              | 4     |
| Max nesting depth           | 4     |
| Max statements per function | 15    |

## Component Design

- One component per file
- Keep components under 80 lines
- Split components into small, focused units (single responsibility)
- Extract reusable logic into custom hooks
- Prefer composition over monolithic components

## Styling

- Use TailwindCSS utility classes
- No inline styles
- Use `clsx` for conditional class composition
