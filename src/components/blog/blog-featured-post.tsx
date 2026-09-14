import {Link} from "@tanstack/react-router";

import {PostCover} from "#/components/blog/post-cover.tsx";
import {PostMeta} from "#/components/blog/post-meta.tsx";
import type {BlogPost} from "#/lib/blog/posts.ts";

type BlogFeaturedPostProps = {
  readonly post: BlogPost;
};

export function BlogFeaturedPost({post}: BlogFeaturedPostProps) {
  return (
    <article className="group relative grid items-center gap-8 lg:grid-cols-[1.25fr_1fr] lg:gap-14">
      <PostCover cover={post.cover} className="aspect-16/10" />

      <div className="flex flex-col gap-4">
        <PostMeta category={post.category} date={post.date} />
        <h2 className="text-3xl leading-tight font-medium tracking-tight text-foreground transition-colors group-hover:text-primary sm:text-4xl">
          <Link to="/blog/$slug" params={{slug: post.slug}} className="after:absolute after:inset-0">
            {post.title}
          </Link>
        </h2>
        <p className="text-lg leading-relaxed text-foreground/70">{post.excerpt}</p>
        <p className="text-sm text-foreground/60">{post.author}</p>
      </div>
    </article>
  );
}
