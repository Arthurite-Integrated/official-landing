import {Link} from "@tanstack/react-router";

import {PostCover} from "#/components/blog/post-cover.tsx";
import {PostMeta} from "#/components/blog/post-meta.tsx";
import type {BlogPost} from "#/lib/blog/posts.ts";

type BlogPostCardProps = {
  readonly post: BlogPost;
};

export function BlogPostCard({post}: BlogPostCardProps) {
  return (
    <article className="group relative flex flex-col gap-5">
      <PostCover cover={post.cover} className="aspect-16/10" />

      <div className="flex flex-col gap-3">
        <PostMeta category={post.category} date={post.date} />
        <h3 className="text-xl leading-snug font-medium tracking-tight text-foreground transition-colors group-hover:text-primary">
          <Link to="/blog/$slug" params={{slug: post.slug}} className="after:absolute after:inset-0">
            {post.title}
          </Link>
        </h3>
        <p className="line-clamp-3 leading-relaxed text-foreground/70">{post.excerpt}</p>
      </div>
    </article>
  );
}
