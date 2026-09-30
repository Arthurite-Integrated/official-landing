import {Search} from "lucide-react";

import {cn} from "@/lib/utils";

type RoleSidebarProps = {
  readonly categories: readonly string[];
  readonly activeCategory: string | null;
  readonly onSelectCategory: (category: string | null) => void;
};

export function RoleSidebar({categories, activeCategory, onSelectCategory}: RoleSidebarProps) {
  return (
    <nav aria-label="Role categories" className="hidden lg:block lg:w-48 xl:w-56">
      <div className="sticky top-32 space-y-1">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => onSelectCategory(activeCategory === category ? null : category)}
            className={cn(
              "block w-full rounded-lg px-3 py-2 text-left text-sm transition-all duration-200",
              activeCategory === category
                ? "border-l-2 border-primary bg-primary/10 font-medium text-foreground"
                : "border-l-2 border-transparent text-foreground/50 hover:text-foreground/80"
            )}
          >
            {category}
          </button>
        ))}
      </div>
    </nav>
  );
}

type RoleSearchBarProps = {
  readonly searchQuery: string;
  readonly onSearchChange: (value: string) => void;
  readonly locationFilter: string;
  readonly onLocationChange: (value: string) => void;
  readonly locations: readonly string[];
};

export function RoleSearchBar({searchQuery, onSearchChange, locationFilter, onLocationChange, locations}: RoleSearchBarProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-foreground/40" aria-hidden="true" />
        <input
          type="text"
          placeholder="Search job titles..."
          value={searchQuery}
          onChange={(event) => onSearchChange(event.target.value)}
          className="w-full rounded-xl border border-foreground/15 bg-foam py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-foreground/40 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/20"
        />
      </div>
      <select
        value={locationFilter}
        onChange={(event) => onLocationChange(event.target.value)}
        aria-label="Filter by location"
        className="appearance-none rounded-xl border border-foreground/15 bg-foam px-4 py-2.5 text-sm text-foreground/80 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/20"
      >
        <option value="">All locations</option>
        {locations.map((location) => (
          <option key={location} value={location}>
            {location}
          </option>
        ))}
      </select>
    </div>
  );
}

export function MobileCategoryFilter({categories, activeCategory, onSelectCategory}: RoleSidebarProps) {
  return (
    <div className="mt-8 flex flex-wrap items-center gap-2 lg:hidden">
      {categories.map((category) => (
        <button
          key={category}
          type="button"
          onClick={() => onSelectCategory(activeCategory === category ? null : category)}
          className={cn(
            "rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide transition-all duration-200",
            activeCategory === category
              ? "bg-primary text-white"
              : "border border-foreground/15 bg-foreground/5 text-foreground/60 hover:text-foreground"
          )}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
