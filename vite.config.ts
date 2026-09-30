import {defineConfig, lazyPlugins} from "vite-plus";
import {devtools} from "@tanstack/devtools-vite";

import {tanstackStart} from "@tanstack/react-start/plugin/vite";

import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import mdx from "fumadocs-mdx/vite";

import * as MdxConfig from "./source.config.ts";

const config = defineConfig({
  fmt: {
    printWidth: 140,
    tabWidth: 2,
    useTabs: false,
    semi: true,
    singleQuote: false,
    trailingComma: "es5",
    arrowParens: "always",
    bracketSpacing: false,
    endOfLine: "lf",
  },
  lint: {
    plugins: ["react", "react-perf", "typescript", "jsx-a11y"],
    rules: {
      "react/react-in-jsx-scope": "off",
      "jsx-a11y/prefer-tag-over-role": "off",
      "typescript/no-explicit-any": "warn",
      "eslint/complexity": [
        "error",
        {
          max: 10,
        },
      ],
      "eslint/max-lines-per-function": [
        "error",
        {
          max: 50,
          skipComments: true,
          skipBlankLines: true,
        },
      ],
      "eslint/max-lines": [
        "error",
        {
          max: 250,
          skipBlankLines: true,
          skipComments: true,
        },
      ],
      "eslint/max-params": ["error", 3],
      "eslint/max-depth": ["error", 3],
      "eslint/max-statements": ["error", 25],
      "eslint/max-classes-per-file": ["error", 1],
      "vite-plus/prefer-vite-plus-imports": "error",
    },
    ignorePatterns: ["*.html", "docker", "public", "__tests__", "*.test.*", "*.spec.*", "*.ct.*", "*.gen.ts", ".source", "dist"],
    options: {
      typeAware: true,
      typeCheck: true,
    },
    jsPlugins: [
      {
        name: "vite-plus",
        specifier: "vite-plus/oxlint-plugin",
      },
    ],
  },
  test: {
    // Vitest v4 compatibility: preserve mock call history.
    // Remove after tests no longer rely on calls from setup or earlier tests.
    // https://viteplus.dev/guide/vitest-v5#remove-unneeded-compatibility-settings
    // https://vitest.dev/guide/migration/#clearmocks-is-enabled-by-default
    clearMocks: false,
  },
  staged: {
    "*.{js,ts,jsx,tsx,json,md,yaml,yml,css}": "vp fmt",
    "*.{js,ts,jsx,tsx}": ["vp lint --max-warnings=0 --no-error-on-unmatched-pattern", "vp test related --run --bail=1 --passWithNoTests"],
  },
  resolve: {tsconfigPaths: true},
  optimizeDeps: {include: ["hls.js"]},
  plugins: lazyPlugins(() => [
    devtools(),
    mdx(MdxConfig),
    tailwindcss(),
    tanstackStart({
      // Post pages are not listed: crawlLinks discovers every /blog/$slug from the links on /blog.
      pages: [{path: "/"}, {path: "/about"}, {path: "/blog"}],
      prerender: {enabled: true, crawlLinks: true},
    }),
    viteReact(),
  ]),
});

export default config;
