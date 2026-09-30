import "@tanstack/react-start/server-only";
import {blog} from "fumadocs-mdx:collections/server";

import {sortNewestFirst, toBlogPost} from "#/lib/blog/posts.ts";
import type {BlogPost} from "#/lib/blog/posts.ts";

const COVER_URLS = Object.fromEntries(
  blog.filter((entry) => entry.cover !== undefined).map((entry) => [entry.cover!, `/blog-images/${encodeURIComponent(entry.cover!)}`])
);

export function getAllBlogPosts(): BlogPost[] {
  return sortNewestFirst(blog.map((entry) => toBlogPost(entry, COVER_URLS)));
}

export function getBlogPost(slug: string): BlogPost | undefined {
  return getAllBlogPosts().find((post) => post.slug === slug);
}
