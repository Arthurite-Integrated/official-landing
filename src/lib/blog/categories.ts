// Every post names exactly one of these in its frontmatter. blog-posts' CONTRIBUTING.md lists them for authors.
export const BLOG_CATEGORIES = ["Cloud", "AI & Data", "Engineering", "Company"] as const;

export type BlogCategory = (typeof BLOG_CATEGORIES)[number];
