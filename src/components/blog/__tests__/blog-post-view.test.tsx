import {render, screen} from "@testing-library/react";
import {describe, expect, it, vi} from "vitest";

import {BlogPostView} from "#/components/blog/blog-post-view.tsx";
import type {BlogPost} from "#/lib/blog/posts.ts";

vi.mock("@tanstack/react-router", async () => {
  const React = await import("react");

  return {
    Link: ({children, className, to}: {readonly children: React.ReactNode; readonly className?: string; readonly to: string}) =>
      React.createElement("a", {className, href: to}, children),
  };
});

const post: BlogPost = {
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

describe("BlogPostView", () => {
  it("titles the page with the post headline", () => {
    render(<BlogPostView post={post} />);

    expect(screen.getByRole("heading", {level: 1, name: post.title})).toBeInTheDocument();
  });

  it("credits the author", () => {
    render(<BlogPostView post={post} />);

    expect(screen.getByText("Ada Okafor")).toBeInTheDocument();
  });

  it("dates the post", () => {
    render(<BlogPostView post={post} />);

    expect(screen.getByText("10 September 2026")).toHaveAttribute("dateTime", "2026-09-10");
  });

  it("links back to every post", () => {
    render(<BlogPostView post={post} />);

    expect(screen.getByRole("link", {name: /all posts/i})).toHaveAttribute("href", "/blog");
  });

  it("shows the cover image", () => {
    const {container} = render(<BlogPostView post={post} />);

    expect(container.querySelector("img")).toHaveAttribute("src", post.cover);
  });

  it("renders the post body", async () => {
    render(<BlogPostView post={post} />);

    expect(await screen.findByText(`Body of ${post.path}`)).toBeInTheDocument();
  });
});
