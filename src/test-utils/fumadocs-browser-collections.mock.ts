import {createElement} from "react";

// Stands in for the `fumadocs-mdx:collections/browser` module that `fumadocs-mdx` generates from content/blog.
const browserCollections = {
  blog: {
    createClientLoader: () => ({
      useContent: (path: string) => createElement("p", null, `Body of ${path}`),
    }),
  },
};

export default browserCollections;
