import {useMemo, useState} from "react";

import {BlogFeaturedPost} from "#/components/blog/blog-featured-post.tsx";
import {BlogPagination} from "#/components/blog/blog-pagination.tsx";
import {BlogPostCard} from "#/components/blog/blog-post-card.tsx";
import {BlogSearchFilter} from "#/components/blog/blog-search-filter.tsx";
import {pickFeaturedPost, sortNewestFirst} from "#/lib/blog/posts.ts";
import type {BlogPost} from "#/lib/blog/posts.ts";

const POSTS_PER_PAGE = 9;

type BlogListProps = {
  readonly posts: readonly BlogPost[];
};

function matchesSearchAndCategory(post: BlogPost, category: string, query: string): boolean {
  const matchesCat = category === "All" || post.category === category;
  if (!matchesCat) {
    return false;
  }

  const trimmedQuery = query.trim().toLowerCase();
  if (trimmedQuery === "") {
    return true;
  }

  return (
    post.title.toLowerCase().includes(trimmedQuery) ||
    post.excerpt.toLowerCase().includes(trimmedQuery) ||
    post.author.toLowerCase().includes(trimmedQuery) ||
    post.category.toLowerCase().includes(trimmedQuery)
  );
}

function BlogHeader() {
  return (
    <header className="max-w-2xl">
      <h1 className="text-5xl leading-[0.95] font-medium tracking-tight text-foreground sm:text-6xl lg:text-7xl">Blog</h1>
      <p className="mt-6 text-lg leading-relaxed text-foreground/70">Notes from our team on cloud, AI, and building on AWS.</p>
    </header>
  );
}

function BlogEmptyResults({onReset}: {readonly onReset: () => void}) {
  return (
    <div className="mt-16 rounded-3xl border border-dashed border-foreground/20 p-16 text-center text-foreground/70">
      <p className="text-base font-medium">No blog posts found matching your search.</p>
      <button
        type="button"
        onClick={onReset}
        className="mt-4 inline-flex items-center rounded-full bg-primary px-5 py-2.5 text-xs font-semibold text-primary-foreground transition-all shadow-xs hover:opacity-90 cursor-pointer"
      >
        Reset filters
      </button>
    </div>
  );
}

function BlogGrid({posts}: {readonly posts: readonly BlogPost[]}) {
  if (posts.length === 0) {
    return null;
  }
  return (
    <div className="mt-16 grid gap-x-8 gap-y-14 border-t border-foreground/10 pt-16 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <BlogPostCard key={post.slug} post={post} />
      ))}
    </div>
  );
}

function useBlogFilterState(posts: readonly BlogPost[]) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);

  const featured = pickFeaturedPost(posts);
  const rest = useMemo(() => sortNewestFirst(posts).filter((post) => post.slug !== featured?.slug), [posts, featured]);

  const showFeatured = useMemo(
    () => (featured ? matchesSearchAndCategory(featured, selectedCategory, searchQuery) : false),
    [featured, selectedCategory, searchQuery]
  );

  const filteredRest = useMemo(
    () => rest.filter((post) => matchesSearchAndCategory(post, selectedCategory, searchQuery)),
    [rest, selectedCategory, searchQuery]
  );

  const totalPages = Math.ceil(filteredRest.length / POSTS_PER_PAGE);

  const paginatedRest = useMemo(() => {
    const start = (currentPage - 1) * POSTS_PER_PAGE;
    return filteredRest.slice(start, start + POSTS_PER_PAGE);
  }, [filteredRest, currentPage]);

  const handleSelectCategory = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setSelectedCategory("All");
    setSearchQuery("");
    setCurrentPage(1);
  };

  return {
    currentPage,
    featured,
    filteredRest,
    handleResetFilters,
    handleSearchChange,
    handleSelectCategory,
    paginatedRest,
    searchQuery,
    selectedCategory,
    setCurrentPage,
    showFeatured,
    totalPages,
  };
}

export function BlogList({posts}: BlogListProps) {
  const state = useBlogFilterState(posts);

  if (posts.length === 0) {
    return (
      <main className="bg-background">
        <div className="mx-auto max-w-6xl px-5 pt-32 pb-24 sm:px-8 lg:pt-44 lg:pb-32 xl:max-w-7xl">
          <BlogHeader />
          <p className="mt-16 rounded-3xl bg-primary-bg px-8 py-16 text-center text-foreground/70">No posts yet. Check back soon.</p>
        </div>
      </main>
    );
  }

  const hasNoResults = !state.showFeatured && state.filteredRest.length === 0;

  return (
    <main className="bg-background">
      <div className="mx-auto max-w-6xl px-5 pt-32 pb-24 sm:px-8 lg:pt-44 lg:pb-32 xl:max-w-7xl">
        <BlogHeader />
        <BlogSearchFilter
          selectedCategory={state.selectedCategory}
          searchQuery={state.searchQuery}
          onSelectCategory={state.handleSelectCategory}
          onSearchChange={state.handleSearchChange}
        />
        {state.showFeatured && state.currentPage === 1 && (
          <div className="mt-12 lg:mt-16">
            <BlogFeaturedPost post={state.featured!} />
          </div>
        )}
        {hasNoResults ? (
          <BlogEmptyResults onReset={state.handleResetFilters} />
        ) : (
          <>
            <BlogGrid posts={state.paginatedRest} />
            <BlogPagination currentPage={state.currentPage} totalPages={state.totalPages} onPageChange={state.setCurrentPage} />
          </>
        )}
      </div>
    </main>
  );
}
