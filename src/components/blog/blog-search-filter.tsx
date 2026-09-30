import {Search} from "lucide-react";

import {Input} from "#/components/ui/input.tsx";
import {BLOG_CATEGORIES} from "#/lib/blog/categories.ts";

type BlogSearchFilterProps = {
  readonly selectedCategory: string;
  readonly searchQuery: string;
  readonly onSelectCategory: (category: string) => void;
  readonly onSearchChange: (query: string) => void;
};

const CATEGORIES = ["All", ...BLOG_CATEGORIES] as const;

export function BlogSearchFilter({selectedCategory, searchQuery, onSelectCategory, onSearchChange}: BlogSearchFilterProps) {
  return (
    <div className="mt-12 flex flex-col items-center justify-between gap-6 md:flex-row lg:mt-16">
      <div className="relative w-full md:w-80">
        <Search className="absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-foreground/50" />
        <Input
          type="text"
          placeholder="Search blog posts..."
          value={searchQuery}
          onChange={(event) => onSearchChange(event.target.value)}
          className="h-11 rounded-full border-foreground/15 bg-card pl-10 pr-4 text-sm shadow-xs focus-visible:ring-1 focus-visible:ring-primary"
        />
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2">
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => onSelectCategory(cat)}
              className={`rounded-full px-4 py-2 text-xs font-semibold transition-all cursor-pointer ${
                isActive
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "border border-foreground/10 bg-card text-foreground/70 hover:bg-muted hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>
    </div>
  );
}
