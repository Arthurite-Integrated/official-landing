import "@tanstack/react-start/server-only";
import {blog} from "fumadocs-mdx:collections/server";

import {indexByFileName, sortNewestFirst, toBlogPost} from "#/lib/blog/posts.ts";
import type {BlogPost} from "#/lib/blog/posts.ts";

const COVER_URLS = indexByFileName(
  // Stryker disable next-line all: Vite only accepts literal import.meta.glob arguments, so a mutated one stops the file compiling.
  import.meta.glob<string>("/content/blog/images/*.{avif,gif,jpeg,jpg,png,svg,webp}", {eager: true, import: "default", query: "?url"})
);

export function getAllBlogPosts(): BlogPost[] {
  return sortNewestFirst(blog.map((entry) => toBlogPost(entry, COVER_URLS)));
}

export function getBlogPost(slug: string): BlogPost | undefined {
  return getAllBlogPosts().find((post) => post.slug === slug);
}
