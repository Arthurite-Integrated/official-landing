---
trigger: always_on
---

# Testing Standards

## Tools

| Tool          | Purpose                           | Command                        |
| ------------- | --------------------------------- | ------------------------------ |
| Vitest        | Unit and integration tests        | bun run test                   |
| fast-check    | Property-based testing            | Used within Vitest             |
| react-doctor  | React best practices audit        | bunx react-doctor@latest .     |
| Stryker       | Mutation testing                  | bun run stryker                |
| Playwright CT | Component testing in real browser | bun run test:ct                |

## File Locations

- Unit/integration tests: `src/**/__tests__/*.test.ts(x)`
- Property-based tests: alongside unit tests, using `fc.assert` / `fc.property`
- Playwright CT tests: `src/**/__tests__/*.ct.tsx`

## Coverage Thresholds

- Line coverage: 90%+
- Function coverage: 90%+
- Branch coverage: 90%+
- Statement coverage: 90%+
- Mutation score: 80%+

## Test Patterns

- Tests must be deterministic: mock network calls, isolate state per test
- Use `@testing-library/react` for component tests
- Prefer small focused tests over large integration tests
- Use property-based tests for pure functions with well-defined input domains
- Arrange-Act-Assert structure
- One logical assertion per test
