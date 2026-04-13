---
trigger: always_on
---

# Anti-Slop Rules

## What Is Slop

Slop is code that looks productive but adds no value: premature abstractions,
dead code, over-engineering, "just in case" fallbacks, and patterns applied
without reason.

## Rules

- **No dead code** — delete unused functions, variables, imports, and types
- **No premature abstraction** — extract only when there is real duplication
- **No "just in case" code** — don't add error handling for scenarios that can't happen
- **No TODO/FIXME without a linked issue** — if it matters, track it. If not, delete it
- **No magic numbers or strings** — use named constants for values that have meaning
- **Functions do one thing** — if a function name needs "and" to describe it, split it
- **Naming must be descriptive** — a reader should understand what a function does from its name
- **No feature flags or backwards-compatibility shims** — just change the code
- **No unnecessary comments** — only comment why, never what
