// @ts-nocheck
/// <reference types="vite/client" />
import {server} from "fumadocs-mdx/runtime/server";
import type * as Config from "../source.config";

const create = server<
  typeof Config,
  import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
    DocData: {};
  }
>();

export const blog = await create.doc(
  "blog",
  "content/blog/posts",
  import.meta.glob(["./**/*.mdx"], {
    base: "./../content/blog/posts",
    query: "?collection=blog",
    eager: true,
  })
);
