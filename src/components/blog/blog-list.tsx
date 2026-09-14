import {BlogFeaturedPost} from "#/components/blog/blog-featured-post.tsx";
import {BlogPostCard} from "#/components/blog/blog-post-card.tsx";
import {pickFeaturedPost, sortNewestFirst} from "#/lib/blog/posts.ts";
import type {BlogPost} from "#/lib/blog/posts.ts";

type BlogListProps = {
  readonly posts: readonly BlogPost[];
};

export function BlogList({posts}: BlogListProps) {
  const featured = pickFeaturedPost(posts);
  const rest = sortNewestFirst(posts).filter((post) => post.slug !== featured?.slug);

  return (
    <main className="bg-background">
      <div className="mx-auto max-w-6xl px-5 pt-32 pb-24 sm:px-8 lg:pt-44 lg:pb-32 xl:max-w-7xl">
        <header className="max-w-2xl">
          <h1 className="text-5xl leading-[0.95] font-medium tracking-tight text-foreground sm:text-6xl lg:text-7xl">Blog</h1>
          <p className="mt-6 text-lg leading-relaxed text-foreground/70">Notes from our team on cloud, AI, and building on AWS.</p>
        </header>

        {featured === undefined ? (
          <p className="mt-16 rounded-3xl bg-primary-bg px-8 py-16 text-center text-foreground/70">No posts yet. Check back soon.</p>
        ) : (
          <div className="mt-16 lg:mt-20">
            <BlogFeaturedPost post={featured} />
          </div>
        )}

        {rest.length === 0 ? null : (
          <div className="mt-20 grid gap-x-8 gap-y-14 border-t border-foreground/10 pt-16 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((post) => (
              <BlogPostCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
