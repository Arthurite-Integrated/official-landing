import {createFileRoute} from "@tanstack/react-router";

import {BlogPostView} from "#/components/blog/blog-post-view.tsx";
import {loadBlogPost} from "#/lib/blog/loader.ts";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({params}) => loadBlogPost({data: params.slug}),
  head: ({loaderData}) => ({
    meta:
      loaderData === undefined
        ? []
        : [{title: `${loaderData.title} | Arthurite Integrated`}, {name: "description", content: loaderData.excerpt}],
  }),
  component: BlogPostRoute,
});

function BlogPostRoute() {
  return <BlogPostView post={Route.useLoaderData()} />;
}
