import type {BlogCategory} from "#/lib/blog/categories.ts";

const POST_PATH = /^(?:\d{4}\/\d{2}\/\d{2}\/)?([a-z0-9]+(?:-[a-z0-9]+)*)\.mdx$/;
const CALENDAR_DAY_LENGTH = "YYYY-MM-DD".length;

/** A post as fumadocs-mdx reads it from content/blog/posts, after source.config.ts validated its frontmatter. */
export type BlogEntry = {
  readonly author: string;
  readonly category: BlogCategory;
  readonly cover?: string | undefined;
  readonly date: Date;
  readonly excerpt: string;
  readonly featured: boolean;
  readonly info: {readonly path: string};
  readonly title: string;
};

export type BlogPost = {
  readonly author: string;
  readonly category: BlogCategory;
  /** Built URL of the cover image, or null when the post has none. */
  readonly cover: string | null;
  /** Calendar day, `YYYY-MM-DD`. */
  readonly date: string;
  readonly excerpt: string;
  readonly featured: boolean;
  /** Path inside the collection, used to load the post body. */
  readonly path: string;
  readonly slug: string;
  readonly title: string;
};

/**
 * The post slug is the filename, so it must be lowercase words and hyphens.
 * Files may be organized under `posts/YYYY/MM/DD/` for editorial filing, but
 * that path does not appear in the URL.
 */
export function slugFromPath(path: string): string {
  const match = POST_PATH.exec(path);

  if (match === null) {
    throw new Error(
      `Blog post "${path}" must be named with lowercase words separated by hyphens, directly inside posts/ or posts/YYYY/MM/DD/.`
    );
  }

  return match[1]!;
}

export function indexByFileName(urls: Readonly<Record<string, string>>): Record<string, string> {
  return Object.fromEntries(Object.entries(urls).map(([path, url]) => [path.slice(path.lastIndexOf("/") + 1), url]));
}

function resolveCover(fileName: string | undefined, slug: string, coverUrls: Readonly<Record<string, string>>): string | null {
  if (fileName === undefined) {
    return null;
  }

  const url = coverUrls[fileName];

  if (url === undefined) {
    throw new Error(`Cover "${fileName}" for blog post "${slug}" is not in images/.`);
  }

  return url;
}

export function toBlogPost(entry: BlogEntry, coverUrls: Readonly<Record<string, string>>): BlogPost {
  const slug = slugFromPath(entry.info.path);

  return {
    author: entry.author,
    category: entry.category,
    cover: resolveCover(entry.cover, slug, coverUrls),
    date: entry.date.toISOString().slice(0, CALENDAR_DAY_LENGTH),
    excerpt: entry.excerpt,
    featured: entry.featured,
    path: entry.info.path,
    slug,
    title: entry.title,
  };
}

export function sortNewestFirst(posts: readonly BlogPost[]): BlogPost[] {
  return [...posts].sort((left, right) => right.date.localeCompare(left.date));
}

/** The newest post marked `featured`, or the newest post when none is. */
export function pickFeaturedPost(posts: readonly BlogPost[]): BlogPost | undefined {
  const newestFirst = sortNewestFirst(posts);

  return newestFirst.find((post) => post.featured) ?? newestFirst[0];
}
