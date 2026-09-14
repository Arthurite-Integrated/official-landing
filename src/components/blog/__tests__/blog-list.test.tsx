import {render, screen} from "@testing-library/react";
import {describe, expect, it, vi} from "vitest";

import {BlogList} from "#/components/blog/blog-list.tsx";
import type {BlogPost} from "#/lib/blog/posts.ts";

vi.mock("@tanstack/react-router", async () => {
  const React = await import("react");

  return {
    Link: ({
      children,
      className,
      params,
      to,
    }: {
      readonly children: React.ReactNode;
      readonly className?: string;
      readonly params?: {readonly slug: string};
      readonly to: string;
    }) => React.createElement("a", {className, href: params === undefined ? to : to.replace("$slug", params.slug)}, children),
  };
});

const newest: BlogPost = {
  author: "Ada Okafor",
  category: "Cloud",
  cover: "/assets/migration.jpg",
  date: "2026-09-10",
  excerpt: "What to decide before moving a single workload.",
  featured: false,
  path: "planning-an-aws-migration.mdx",
  slug: "planning-an-aws-migration",
  title: "Planning a migration to AWS",
};

const featured: BlogPost = {
  ...newest,
  category: "Engineering",
  cover: null,
  date: "2026-08-02",
  featured: true,
  path: "why-we-run-on-graviton.mdx",
  slug: "why-we-run-on-graviton",
  title: "Why we run on Graviton",
};

const older: BlogPost = {
  ...newest,
  category: "Company",
  cover: null,
  date: "2026-07-01",
  path: "genai-lagos-recap.mdx",
  slug: "genai-lagos-recap",
  title: "What we learned hosting GenAI Lagos",
};

const posts = [newest, featured, older];

describe("BlogList", () => {
  it("introduces the page with a heading", () => {
    render(<BlogList posts={posts} />);

    expect(screen.getByRole("heading", {level: 1, name: "Blog"})).toBeInTheDocument();
  });

  it("says so when there are no posts yet", () => {
    render(<BlogList posts={[]} />);

    expect(screen.getByText(/no posts yet/i)).toBeInTheDocument();
  });

  it("gives the featured post the large slot", () => {
    render(<BlogList posts={posts} />);

    expect(screen.getByRole("heading", {level: 2, name: featured.title})).toBeInTheDocument();
  });

  it("shows every post once", () => {
    render(<BlogList posts={posts} />);

    expect(screen.getAllByRole("article")).toHaveLength(posts.length);
  });

  it("links every post to its page", () => {
    render(<BlogList posts={posts} />);

    for (const post of posts) {
      expect(screen.getByRole("link", {name: post.title})).toHaveAttribute("href", `/blog/${post.slug}`);
    }
  });

  it("dates each post", () => {
    render(<BlogList posts={posts} />);

    expect(screen.getByText("10 September 2026")).toHaveAttribute("dateTime", "2026-09-10");
  });

  it("labels each post with its category", () => {
    render(<BlogList posts={posts} />);

    expect(screen.getByText("Company")).toBeInTheDocument();
  });

  it("shows a cover image only for posts that have one", () => {
    const {container} = render(<BlogList posts={posts} />);

    expect([...container.querySelectorAll("img")].map((image) => image.getAttribute("src"))).toEqual([newest.cover]);
  });
});
