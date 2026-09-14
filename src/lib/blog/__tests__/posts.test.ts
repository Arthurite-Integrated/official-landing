import fc from "fast-check";
import {describe, expect, it} from "vitest";

import {indexByFileName, pickFeaturedPost, slugFromPath, sortNewestFirst, toBlogPost} from "#/lib/blog/posts.ts";
import type {BlogEntry, BlogPost} from "#/lib/blog/posts.ts";

const entry: BlogEntry = {
  author: "Ada Okafor",
  category: "Cloud",
  date: new Date("2026-09-10"),
  excerpt: "What to decide before moving a single workload.",
  featured: false,
  info: {path: "planning-an-aws-migration.mdx"},
  title: "Planning a migration to AWS",
};

function post(slug: string, date: string, featured = false): BlogPost {
  return {...toBlogPost({...entry, info: {path: `${slug}.mdx`}, date: new Date(date)}, {}), featured};
}

const kebabSlug = fc.stringMatching(/^[a-z0-9]+(-[a-z0-9]+)*$/);

describe("slugFromPath", () => {
  it("uses the filename without its extension", () => {
    expect(slugFromPath("planning-an-aws-migration.mdx")).toBe("planning-an-aws-migration");
  });

  it("round-trips every lowercase hyphenated filename", () => {
    fc.assert(fc.property(kebabSlug, (slug) => slugFromPath(`${slug}.mdx`) === slug));
  });

  it("rejects a filename that would make an unsafe URL", () => {
    expect(() => slugFromPath("Planning AWS.mdx")).toThrow(/lowercase words separated by hyphens/);
  });

  it("rejects posts filed in a subfolder", () => {
    expect(() => slugFromPath("drafts/planning.mdx")).toThrow(/lowercase words separated by hyphens/);
  });
});

describe("indexByFileName", () => {
  it("keys image URLs by their filename", () => {
    expect(indexByFileName({"/content/blog/images/cover.jpg": "/assets/cover-123.jpg"})).toEqual({"cover.jpg": "/assets/cover-123.jpg"});
  });
});

describe("toBlogPost", () => {
  it("links the post to its filename", () => {
    expect(toBlogPost(entry, {}).slug).toBe("planning-an-aws-migration");
  });

  it("keeps the source path for loading the post body", () => {
    expect(toBlogPost(entry, {}).path).toBe("planning-an-aws-migration.mdx");
  });

  it("stores the date as a calendar day", () => {
    expect(toBlogPost(entry, {}).date).toBe("2026-09-10");
  });

  it("has no cover when none is set", () => {
    expect(toBlogPost(entry, {}).cover).toBeNull();
  });

  it("resolves the cover to its built image URL", () => {
    const withCover = {...entry, cover: "migration.jpg"};

    expect(toBlogPost(withCover, {"migration.jpg": "/assets/migration-1a2b.jpg"}).cover).toBe("/assets/migration-1a2b.jpg");
  });

  it("fails when the cover is not in the images folder", () => {
    expect(() => toBlogPost({...entry, cover: "missing.jpg"}, {})).toThrow(/not in images\//);
  });
});

describe("sortNewestFirst", () => {
  it("puts the most recent post first", () => {
    const posts = [post("older", "2026-01-05"), post("newest", "2026-09-10"), post("middle", "2026-04-20")];

    expect(sortNewestFirst(posts).map((item) => item.slug)).toEqual(["newest", "middle", "older"]);
  });

  it("never orders an older post before a newer one", () => {
    const day = fc.date({min: new Date("2020-01-01"), max: new Date("2030-12-31"), noInvalidDate: true});

    fc.assert(
      fc.property(fc.array(day), (dates) => {
        const sorted = sortNewestFirst(dates.map((date, index) => post(`post-${index}`, date.toISOString().slice(0, 10))));

        return sorted.every((item, index) => index === 0 || sorted[index - 1]!.date >= item.date);
      })
    );
  });
});

describe("pickFeaturedPost", () => {
  it("prefers the newest featured post", () => {
    const posts = [post("newest", "2026-09-10"), post("featured", "2026-08-01", true), post("old-featured", "2026-01-01", true)];

    expect(pickFeaturedPost(posts)?.slug).toBe("featured");
  });

  it("falls back to the newest post when none is featured", () => {
    const posts = [post("newest", "2026-09-10"), post("older", "2026-08-01")];

    expect(pickFeaturedPost(posts)?.slug).toBe("newest");
  });

  it("has nothing to feature when there are no posts", () => {
    expect(pickFeaturedPost([])).toBeUndefined();
  });
});
