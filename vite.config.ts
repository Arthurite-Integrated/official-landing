import {defineConfig} from "vite";
import {devtools} from "@tanstack/devtools-vite";

import {tanstackStart} from "@tanstack/react-start/plugin/vite";

import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const config = defineConfig({
  resolve: {tsconfigPaths: true},
  plugins: [
    devtools(),
    tailwindcss(),
    tanstackStart({
      pages: [{path: "/"}, {path: "/about"}],
      prerender: {enabled: true, crawlLinks: true},
    }),
    viteReact({
      babel: {
        plugins: ["babel-plugin-react-compiler"],
      },
    }),
  ],
});

export default config;
