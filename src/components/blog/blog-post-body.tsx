import browserCollections from "fumadocs-mdx:collections/browser";

// `id` lets code-split copies of this loader share the posts they have already fetched.
const postBodyLoader = browserCollections.blog.createClientLoader({
  id: "blog",
  component: ({default: Body}) => <Body />,
});

type BlogPostBodyProps = {
  readonly path: string;
};

/** Suspends while the compiled MDX for `path` loads, so render it inside a Suspense boundary. */
export function BlogPostBody({path}: BlogPostBodyProps) {
  return postBodyLoader.useContent(path);
}
