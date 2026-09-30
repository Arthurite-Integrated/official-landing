---
trigger: always_on
---

# Commit Workflow

## Rules

- Use conventional commits: `feat:`, `fix:`, `refactor:`, `test:`, `docs:`, `chore:`
- One logical change per commit
- Commit only what was changed by the current step
- Always run lint + test before committing
- Step-by-step approach: finish one thing, verify, commit, move on

## Before Every Commit

```sh
vp lint --max-warnings=0
bunx -y react-doctor@latest . --verbose --diff
vp test run
bun run stryker:incremental
bun run test:ct  # if UI components changed
```

## Commit Message Format

```
type(scope): short description

Optional body explaining why, not what.
```
