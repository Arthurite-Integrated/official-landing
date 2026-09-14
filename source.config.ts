import {defineCollections, defineConfig, frontmatterSchema} from "fumadocs-mdx/config";
import {z} from "zod";

import {BLOG_CATEGORIES} from "./src/lib/blog/categories.ts";

// The frontmatter contract for posts in the blog-posts repo, mounted at content/blog. `.strict()` fails the
// build on a field it does not know, so a typo in a post never ships silently. blog-posts' CONTRIBUTING.md
// documents these fields for authors and must change together with this schema.
export const blog = defineCollections({
  type: "doc",
  dir: "content/blog/posts",
  files: ["**/*.mdx"],
  schema: frontmatterSchema
    .omit({description: true})
    .extend({
      author: z.string().min(1),
      category: z.enum(BLOG_CATEGORIES),
      cover: z.string().min(1).optional(),
      date: z.coerce.date(),
      excerpt: z.string().min(1),
      featured: z.boolean().default(false),
    })
    .strict(),
});

export default defineConfig({});
