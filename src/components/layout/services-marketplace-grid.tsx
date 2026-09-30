import {useState} from "react";
import {Link} from "@tanstack/react-router";
import {Search, X} from "lucide-react";

import type {ServiceItem} from "#/lib/services-data.ts";
import {SERVICES_DATA} from "#/lib/services-data.ts";

const SECTION_TITLE_ID = "services-section-title";

function ServicesSearchInput({
  searchQuery,
  onSearchChange,
}: {
  readonly searchQuery: string;
  readonly onSearchChange: (value: string) => void;
}) {
  return (
    <div className="relative w-full max-w-xs shrink-0 sm:max-w-sm">
      <Search className="absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-foreground/40" />
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search services..."
        className="h-10 w-full rounded-full border border-foreground/15 bg-background pl-10 pr-10 text-sm text-foreground shadow-sm placeholder:text-foreground/40 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
      />
      {searchQuery !== "" && (
        <button
          type="button"
          onClick={() => onSearchChange("")}
          aria-label="Clear search"
          className="absolute top-1/2 right-3 -translate-y-1/2 text-foreground/40 hover:text-foreground"
        >
          <X className="size-4" />
        </button>
      )}
    </div>
  );
}

function CategoryPillsList({
  categories,
  selectedCategory,
  onSelectCategory,
}: {
  readonly categories: readonly string[];
  readonly selectedCategory: string;
  readonly onSelectCategory: (category: string) => void;
}) {
  return (
    <div className="flex flex-1 items-center gap-2 overflow-x-auto no-scrollbar py-1">
      {categories.map((cat) => {
        const isSelected = selectedCategory === cat;
        return (
          <button
            key={cat}
            type="button"
            onClick={() => onSelectCategory(cat)}
            className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
              isSelected
                ? "bg-primary text-white shadow-sm"
                : "border border-foreground/10 bg-foreground/5 text-foreground/70 hover:bg-foreground/10 hover:text-foreground"
            }`}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
}

function ServiceCardItem({service}: {readonly service: ServiceItem}) {
  return (
    <Link
      to="/services/$slug"
      params={{slug: service.slug}}
      className="group flex flex-col gap-2.5 overflow-hidden transition-all duration-300 hover:-translate-y-1"
    >
      <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl bg-neutral-200 shadow-sm">
        <img
          src={service.image}
          alt={service.title}
          className="h-full w-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
        />
        <div className="pointer-events-none absolute inset-0 bg-black/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      <div className="flex items-center justify-between gap-2 px-1 text-xs text-foreground">
        <div className="flex items-center gap-1.5 overflow-hidden">
          <div className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white shadow-xs">
            A
          </div>
          <h3 className="truncate font-semibold text-foreground transition-colors group-hover:text-primary">{service.title}</h3>
        </div>

        <span className="shrink-0 rounded-md bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">{service.category}</span>
      </div>
    </Link>
  );
}

function EmptySearchResultsView({onReset}: {readonly onReset: () => void}) {
  return (
    <div className="col-span-full py-20 text-center">
      <p className="text-lg font-medium text-foreground">No services found matching your criteria</p>
      <p className="mt-2 text-sm text-foreground/60">Try searching for a different keyword or resetting your filters.</p>
      <button
        type="button"
        onClick={onReset}
        className="mt-6 rounded-full bg-primary px-6 py-2.5 text-xs font-semibold text-white transition-all hover:bg-primary/90"
      >
        Reset Filters
      </button>
    </div>
  );
}

export function ServicesMarketplaceGrid() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", ...Array.from(new Set(SERVICES_DATA.map((s) => s.category)))];

  const filteredServices = SERVICES_DATA.filter((svc) => {
    const matchesCategory = selectedCategory === "All" || svc.category === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === "" ||
      svc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      svc.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      svc.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section aria-labelledby={SECTION_TITLE_ID} className="w-full bg-background pt-24 pb-16 sm:pt-28">
      <h2 id={SECTION_TITLE_ID} className="sr-only">
        Our Cloud Services
      </h2>

      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="flex flex-col gap-4 border-b border-foreground/10 pb-4 md:flex-row md:items-center md:justify-between">
          <CategoryPillsList categories={categories} selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />
          <ServicesSearchInput searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        </div>
      </div>

      <div className="w-full max-w-none px-4 py-8 sm:px-6 lg:px-8 xl:px-10">
        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredServices.length > 0 ? (
            filteredServices.map((service) => <ServiceCardItem key={service.slug} service={service} />)
          ) : (
            <EmptySearchResultsView
              onReset={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
            />
          )}
        </div>
      </div>
    </section>
  );
}
