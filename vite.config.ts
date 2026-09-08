import {defineConfig} from "vite";
import {devtools} from "@tanstack/devtools-vite";

import {tanstackStart} from "@tanstack/react-start/plugin/vite";

import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const config = defineConfig({
  resolve: {tsconfigPaths: true},
  optimizeDeps: {include: ["hls.js"]},
  plugins: [
    devtools(),
    tailwindcss(),
    tanstackStart({
      pages: [{path: "/"}, {path: "/about"}],
      prerender: {enabled: true, crawlLinks: true},
    }),
    viteReact(),
  ],
});

export default config;
