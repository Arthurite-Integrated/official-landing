import {Suspense} from "react";
import {Link} from "@tanstack/react-router";
import {ArrowLeft} from "lucide-react";

import {BlogPostBody} from "#/components/blog/blog-post-body.tsx";
import {PostMeta} from "#/components/blog/post-meta.tsx";
import type {BlogPost} from "#/lib/blog/posts.ts";

type BlogPostViewProps = {
  readonly post: BlogPost;
};

export function BlogPostView({post}: BlogPostViewProps) {
  return (
    <main className="bg-background">
      <article className="mx-auto max-w-3xl px-5 pt-32 pb-24 sm:px-8 lg:pt-40 lg:pb-32">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-sm font-medium text-foreground/60 transition-colors hover:text-primary"
        >
          <ArrowLeft className="size-4" aria-hidden />
          All posts
        </Link>

        <header className="mt-10">
          <PostMeta category={post.category} date={post.date} />
          <h1 className="mt-4 text-4xl leading-[1.05] font-medium tracking-tight text-foreground sm:text-5xl">{post.title}</h1>
          <p className="mt-5 text-lg leading-relaxed text-foreground/70">{post.excerpt}</p>
          <p className="mt-6 text-sm text-foreground/60">
            By <span className="font-medium text-foreground">{post.author}</span>
          </p>
        </header>

        {post.cover === null ? null : <img src={post.cover} alt="" className="mt-12 aspect-16/9 w-full rounded-3xl object-cover" />}

        <div className="prose prose-lg mt-12 max-w-none prose-headings:font-medium prose-headings:tracking-tight prose-a:text-primary prose-img:rounded-2xl">
          <Suspense fallback={null}>
            <BlogPostBody path={post.path} />
          </Suspense>
        </div>
      </article>
    </main>
  );
}
