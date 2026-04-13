import {defineConfig} from "vitest/config";
import {resolve} from "path";

export default defineConfig({
  test: {
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
      ],
      include: ["src/**/*.{js,ts,jsx,tsx}"],
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
