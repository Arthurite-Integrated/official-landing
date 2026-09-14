import {describe, expect, it} from "vitest";

import {getAllBlogPosts, getBlogPost} from "#/lib/blog/posts.server.ts";

describe("getAllBlogPosts", () => {
  it("lists every post in the collection newest first", () => {
    expect(getAllBlogPosts().map((post) => post.slug)).toEqual([
      "planning-an-aws-migration",
      "genai-lagos-recap",
      "why-we-run-on-graviton",
    ]);
  });
});

describe("getBlogPost", () => {
  it("finds a post by its slug", () => {
    expect(getBlogPost("genai-lagos-recap")?.title).toBe("What we learned hosting GenAI Lagos");
  });

  it("finds nothing for an unknown slug", () => {
    expect(getBlogPost("no-such-post")).toBeUndefined();
  });
});
