import {notFound} from "@tanstack/react-router";
import {createServerFn} from "@tanstack/react-start";
import {staticFunctionMiddleware} from "@tanstack/start-static-server-functions";

import {getAllBlogPosts, getBlogPost} from "#/lib/blog/posts.server.ts";

// staticFunctionMiddleware saves each result as JSON while prerendering, so client-side navigation to the blog
// keeps working on static hosting, where no server functions run.
export const listBlogPosts = createServerFn({method: "GET"})
  .middleware([staticFunctionMiddleware])
  .handler(() => getAllBlogPosts());

export const loadBlogPost = createServerFn({method: "GET"})
  .middleware([staticFunctionMiddleware])
  .validator((slug: string) => slug)
  .handler(({data: slug}) => {
    const post = getBlogPost(slug);

    if (post === undefined) {
      throw notFound();
    }

    return post;
  });
