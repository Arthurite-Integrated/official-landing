import {defineConfig} from "vite";
import {devtools} from "@tanstack/devtools-vite";

import {tanstackStart} from "@tanstack/react-start/plugin/vite";

import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import mdx from "fumadocs-mdx/vite";

import * as MdxConfig from "./source.config.ts";

const config = defineConfig({
  resolve: {tsconfigPaths: true},
  optimizeDeps: {include: ["hls.js"]},
  plugins: [
    devtools(),
    mdx(MdxConfig),
    tailwindcss(),
    tanstackStart({
      // Post pages are not listed: crawlLinks discovers every /blog/$slug from the links on /blog.
      pages: [{path: "/"}, {path: "/about"}, {path: "/blog"}],
      prerender: {enabled: true, crawlLinks: true},
    }),
    viteReact(),
  ],
});

export default config;
