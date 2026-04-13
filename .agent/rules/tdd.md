---
trigger: always_on
---

# TDD Workflow

## Core Protocol

Every new feature or bug fix follows the red/green/refactor cycle:

1. **Red** — AI or human writes a failing test that describes the desired behavior
2. **Green** — Write the minimum code to make the test pass
3. **Refactor** — Clean up without changing behavior, tests stay green

## Rules

- No production code without a corresponding test
- Tests describe behavior, not implementation
- One assertion per test when possible
- Test names read as specifications: "returns null for non-object input"
- Property-based tests (fast-check) for pure functions with well-defined domains
- Mock external dependencies, not internal logic

## Who Writes the Test

Either AI or human can write the failing test first. What matters is:

- The test exists before the implementation
- The test fails for the right reason (not a syntax error)
- The test clearly expresses the expected behavior
