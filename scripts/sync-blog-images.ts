import {cp, mkdir, rm} from "node:fs/promises";
import {resolve} from "node:path";

const source = resolve("content/blog/images");
const destination = resolve("public/blog-images");

await rm(destination, {recursive: true, force: true});
await mkdir(destination, {recursive: true});

await cp(source, destination, {
  recursive: true,
});

console.log("Blog images synced to public/blog-images");
