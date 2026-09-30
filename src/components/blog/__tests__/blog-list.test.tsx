import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {describe, expect, it, vi} from "vite-plus/test";

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

function generateTestPosts(count: number): BlogPost[] {
  return Array.from({length: count}, (_, i) => ({
    author: `Author ${i}`,
    category: i % 2 === 0 ? "Cloud" : "AI & Data",
    cover: null,
    date: `2026-09-${String(28 - (i % 20)).padStart(2, "0")}`,
    excerpt: `Excerpt for post number ${i + 1}`,
    featured: i === 0,
    path: `post-${i + 1}.mdx`,
    slug: `post-${i + 1}`,
    title: `Blog Post Title ${i + 1}`,
  }));
}

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

    expect(screen.getAllByText("Company").length).toBeGreaterThan(0);
  });

  it("shows a cover image only for posts that have one", () => {
    const {container} = render(<BlogList posts={posts} />);

    expect([...container.querySelectorAll("img")].map((image) => image.getAttribute("src"))).toEqual([newest.cover]);
  });

  it("filters posts by search query input", async () => {
    const user = userEvent.setup();
    render(<BlogList posts={posts} />);

    const searchInput = screen.getByPlaceholderText(/search blog posts/i);
    await user.type(searchInput, "Graviton");

    expect(screen.getByText("Why we run on Graviton")).toBeInTheDocument();
    expect(screen.queryByText("Planning a migration to AWS")).not.toBeInTheDocument();
  });

  it("filters posts by category tab", async () => {
    const user = userEvent.setup();
    render(<BlogList posts={posts} />);

    const cloudTab = screen.getByRole("button", {name: "Cloud"});
    await user.click(cloudTab);

    expect(screen.getByText("Planning a migration to AWS")).toBeInTheDocument();
    expect(screen.queryByText("What we learned hosting GenAI Lagos")).not.toBeInTheDocument();
  });

  it("paginates posts at 9 posts per page", async () => {
    const user = userEvent.setup();
    const manyPosts = generateTestPosts(15);
    render(<BlogList posts={manyPosts} />);

    // 1 featured + 9 rest on page 1 = 10 articles on page 1
    const page1Articles = screen.getAllByRole("article");
    expect(page1Articles).toHaveLength(10);

    const nextButton = screen.getByRole("button", {name: /next/i});
    await user.click(nextButton);

    // Page 2 displays the remaining 5 rest posts
    const page2Articles = screen.getAllByRole("article");
    expect(page2Articles).toHaveLength(5);
  });

  it("displays empty state when search returns no results", async () => {
    const user = userEvent.setup();
    render(<BlogList posts={posts} />);

    const searchInput = screen.getByPlaceholderText(/search blog posts/i);
    await user.type(searchInput, "nonexistentquery123");

    expect(screen.getByText(/no blog posts found/i)).toBeInTheDocument();

    const resetButton = screen.getByRole("button", {name: /reset filters/i});
    await user.click(resetButton);

    expect(screen.getByRole("heading", {level: 2, name: featured.title})).toBeInTheDocument();
  });
});
