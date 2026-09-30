import {defineConfig} from "vite-plus";
import {resolve} from "path";

// Tests run without the fumadocs-mdx Vite plugin, so its generated collection modules are swapped for fixtures.
const fumadocsCollectionMocks = {
  name: "fumadocs-collection-mocks",
  enforce: "pre" as const,
  resolveId(id: string) {
    if (id === "fumadocs-mdx:collections/server") {
      return resolve(__dirname, "./src/test-utils/fumadocs-server-collections.mock.ts");
    }
    if (id === "fumadocs-mdx:collections/browser") {
      return resolve(__dirname, "./src/test-utils/fumadocs-browser-collections.mock.ts");
    }
  },
};

export default defineConfig({
  plugins: [fumadocsCollectionMocks],
  test: {
    // Vitest v4 compatibility: preserve mock call history.
    // Remove after tests no longer rely on calls from setup or earlier tests.
    // https://viteplus.dev/guide/vitest-v5#remove-unneeded-compatibility-settings
    // https://vitest.dev/guide/migration/#clearmocks-is-enabled-by-default
    clearMocks: false,
    globals: true,
    environment: "jsdom",
    pool: "forks",
    include: ["src/**/*.{test,spec}.{js,ts,jsx,tsx}"],
    setupFiles: ["./vitest.setup.ts"],
    css: true,
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "json-summary", "html", "lcov"],
      cleanOnRerun: true,
      exclude: [
        "node_modules/",
        "dist/",
        "**/*.config.{js,ts}",
        "**/types.ts",
        "**/*.d.ts",
        "**/index.ts",
        "**/__tests__/**",
        "**/*.gen.ts",
        // Server-function wiring only; the logic it calls lives in posts.server.ts, which is tested.
        "src/lib/blog/loader.ts",
      ],
      include: ["src/lib/**/*.{js,ts,jsx,tsx}"],
      thresholds: {
        lines: 90,
        functions: 90,
        branches: 90,
        statements: 90,
      },
    },
  },
  resolve: {
    alias: {
      "#": resolve(__dirname, "./src"),
      "@": resolve(__dirname, "./src"),
    },
  },
});
