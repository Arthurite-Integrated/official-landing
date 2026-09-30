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

| Category        | Tool                                           |
| --------------- | ---------------------------------------------- |
| Framework       | React 19 + TanStack Start (SSR)                |
| Language        | TypeScript (strict mode)                       |
| Styling         | TailwindCSS v4 + tw-animate-css                |
| UI Components   | shadcn/ui (new-york style) + Radix UI          |
| Routing         | TanStack Router (file-based)                   |
| State/Data      | TanStack Query + TanStack Form                 |
| Validation      | Zod v4                                         |
| Blog            | Fumadocs MDX                                   |
| Icons           | Lucide React                                   |
| Build           | Vite+ 1.0 (Rolldown-Vite 8)                    |
| Runtime         | Node 24 + npm                                  |
| Compiler        | React Compiler (babel plugin)                  |
| Linting         | Oxlint via vp (anti-slop rules, zero warnings) |
| Formatting      | Oxfmt via vp                                   |
| Testing         | Vitest 5 + Testing Library + fast-check        |
| Mutation Tests  | Stryker                                        |
| Component Tests | Playwright CT                                  |
| Git Hooks       | Vite+ hooks (`vp staged` pre-commit)           |

## Path Aliases

- `#/*` → `./src/*` (primary, used in imports)
- `@/*` → `./src/*` (shadcn/ui compatibility)

## Available Commands

```sh
git submodule update --init # Fetch blog posts into content/blog (once after cloning)
npm run dev                # Start dev server on port 3000 (vp dev)
npm run build              # Production build (vp build)
npm run preview            # Preview production build
npm test                   # Run Vitest tests (vp test run)
npm run test:coverage      # Run tests with coverage report
npm run test:ui            # Vitest interactive UI
npm run lint               # Oxlint via vp (--max-warnings=0)
npm run lint:fix           # Oxlint with auto-fix
npm run format             # Oxfmt via vp fmt
npm run stryker            # Full mutation testing
npm run stryker:incremental # Incremental mutation testing
npm run test:ct            # Playwright component tests
npm run test:ct:ui         # Playwright CT interactive UI
vp check                   # Format + lint + typecheck in one pass
vp staged                  # Run staged-file checks (pre-commit hook)
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
- CI pipeline (Layer 9)

<!--VITE PLUS START-->

# Using Vite+, the Unified Toolchain for the Web

This project is using Vite+, a unified toolchain built on top of Vite, Rolldown, Vitest, tsdown, Oxlint, Oxfmt, and Vite Task. Vite+ wraps runtime management, package management, and frontend tooling in a single global CLI called `vp`. Vite+ is distinct from Vite, and it invokes Vite through `vp dev` and `vp build`. Run `vp help` to print a list of commands and `vp <command> --help` for information about a specific command.

Docs are local at `node_modules/vite-plus/docs` or online at https://viteplus.dev/guide/.

## Built-in Commands vs Scripts

`vp <name>` runs a built-in command. `vp run <name>` runs a `package.json` script or a `vite.config.ts` task. Scripts cannot overwrite built-ins, so `vp dev` and `vp run dev` may do different things. Check `package.json` and `vite.config.ts` first, and run `vp run <name>` when the project defines a script or task with that name.

## Tool Versions

Run `vp toolchain` to show versions and relationships in the active Vite+
release. Add a tool name to select part of the graph. For example, run
`vp toolchain vite`. Use `--global` to ignore the local `vite-plus` package. Use
`vp why <package>` to show the package-manager dependency graph.

## Review Checklist

- [ ] Run `vp install` after pulling remote changes and before getting started.
- [ ] Run `vp check` and `vp test` to format, lint, type check and test changes.
- [ ] Check if there are `vite.config.ts` tasks or `package.json` scripts necessary for validation, run via `vp run <script>`.
- [ ] If setup, runtime, or package-manager behavior looks wrong, run `vp env doctor` and include its output when asking for help.

<!--VITE PLUS END-->
