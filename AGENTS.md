# Arthurite Integrated — Landing Website

Marketing website for Arthurite Integrated, an AWS Advanced Partner based in Nigeria. The company offers cloud services and builds custom solutions on AWS Cloud.

## Repository Structure

```
content/
  blog/             — Git submodule: Arthurite-Integrated/blog-posts (see Blog)
src/
  components/       — Reusable UI components
    blog/           — Blog list and post pages
    ui/             — shadcn/ui primitives
  hooks/            — Custom React hooks
  integrations/     — Third-party integrations
  lib/              — Utility functions and shared logic
    blog/           — Reading, validating, and ordering blog posts
    tanstack-query/ — TanStack Query configuration
  routes/           — TanStack Start file-based routes
  test-utils/       — Test fixtures, including the fumadocs collection mocks
  utils/            — Helper utilities
  styles.css        — Global styles (TailwindCSS v4)
  router.tsx        — Router configuration
  routeTree.gen.ts  — Auto-generated route tree (do not edit)
public/             — Static assets
source.config.ts    — Fumadocs MDX collection and blog frontmatter schema
```

## Technology Stack

| Category        | Tool                                    |
| --------------- | --------------------------------------- |
| Framework       | React 19 + TanStack Start (SSR)         |
| Language        | TypeScript (strict mode)                |
| Styling         | TailwindCSS v4 + tw-animate-css         |
| UI Components   | shadcn/ui (new-york style) + Radix UI   |
| Routing         | TanStack Router (file-based)            |
| State/Data      | TanStack Query + TanStack Form          |
| Validation      | Zod v4                                  |
| Blog            | Fumadocs MDX                            |
| Icons           | Lucide React                            |
| Build           | Vite 8                                  |
| Runtime         | Bun                                     |
| Compiler        | React Compiler (babel plugin)           |
| Linting         | Oxlint (anti-slop rules, zero warnings) |
| Formatting      | Oxfmt                                   |
| Testing         | Vitest + Testing Library + fast-check   |
| Mutation Tests  | Stryker                                 |
| Component Tests | Playwright CT                           |
| Git Hooks       | Lefthook                                |

## Path Aliases

- `#/*` → `./src/*` (primary, used in imports)
- `@/*` → `./src/*` (shadcn/ui compatibility)

## Available Commands

```sh
git submodule update --init # Fetch blog posts into content/blog (once after cloning)
bun dev                    # Start dev server on port 3000
bun run build              # Production build
bun run preview            # Preview production build
bun run test               # Run Vitest tests
bun run test:coverage      # Run tests with coverage report
bun run test:ui            # Vitest interactive UI
bun lint                   # Oxlint (--max-warnings=0)
bun lint:fix               # Oxlint with auto-fix
bun format                 # Oxfmt formatting
bun run stryker            # Full mutation testing
bun run stryker:incremental # Incremental mutation testing
bun run test:ct            # Playwright component tests
bun run test:ct:ui         # Playwright CT interactive UI
```

## Blog

Posts live in [`Arthurite-Integrated/blog-posts`](https://github.com/Arthurite-Integrated/blog-posts), mounted as a git
submodule at `content/blog`. Without `git submodule update --init`, `/blog` builds with no posts.

| What                                     | Where                                      |
| ---------------------------------------- | ------------------------------------------ |
| Frontmatter schema (gates the build)     | `source.config.ts`                         |
| Categories                               | `src/lib/blog/categories.ts`               |
| Slugs, covers, ordering, featured post   | `src/lib/blog/posts.ts`                    |
| Reading the collection                   | `src/lib/blog/posts.server.ts`             |
| Route loaders (static server functions)  | `src/lib/blog/loader.ts`                   |
| Pages                                    | `src/routes/blog/`, `src/components/blog/` |
| Publishing (moves the submodule pointer) | `.github/workflows/blog-update.yml`        |

- **The filename is the URL.** `posts/<slug>.mdx` serves at `/blog/<slug>`; `slugFromPath` fails the build on anything
  but lowercase words and hyphens.
- **Covers** are filenames inside `content/blog/images/`; a cover that is not there fails the build.
- **Post pages are prerendered by `crawlLinks`** from the links on `/blog`, so they are not listed in `vite.config.ts`.
- **Never commit a `content/blog` pointer change by hand.** blog-posts' "Publish to landing" workflow sends the merged
  sha, and `blog-update.yml` points the submodule at it through a pull request, because `main` requires one.
- **A schema or category change** must be mirrored in blog-posts' `CONTRIBUTING.md`, which documents both for authors.
- **Tests** swap the generated `fumadocs-mdx:collections/*` modules for fixtures in `src/test-utils/` (see
  `vitest.config.ts`).

## Agent Rules

All agents must follow the rules in `.agent/rules/`:

- **tdd.md** — Red/green/refactor protocol for all new code
- **anti-slop.md** — Zero tolerance for dead code, premature abstractions, over-engineering
- **testing.md** — Testing tools, file locations, coverage thresholds (90%+)
- **code-style.md** — TypeScript strict, complexity limits, component design
- **commits.md** — Conventional commits, verification before every commit

## CI Pipeline

GitHub Actions (`.github/workflows/publish.yml`):

- Lint (zero warnings gate)
- React best practices audit (react-doctor)
- Build
- Tests with coverage (90%+ thresholds)
- Mutation testing on PRs (80%+ score)
- Release Please on main

## Deferred / Not Yet Configured

- Contact page (planned)
- Stryker mutation testing (Layer 6)
- Playwright CT component tests (Layer 7)
- Lefthook git hooks (Layer 8)
- CI pipeline (Layer 9)
