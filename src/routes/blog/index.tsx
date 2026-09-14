import {createFileRoute} from "@tanstack/react-router";

import {BlogList} from "#/components/blog/blog-list.tsx";
import {listBlogPosts} from "#/lib/blog/loader.ts";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      {title: "Blog | Arthurite Integrated"},
      {name: "description", content: "Notes from the Arthurite Integrated team on cloud, AI, and building on AWS."},
    ],
  }),
  loader: () => listBlogPosts(),
  component: BlogIndex,
});

function BlogIndex() {
  return <BlogList posts={Route.useLoaderData()} />;
}
