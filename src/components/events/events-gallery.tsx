import {useMemo, useState} from "react";
import {Search} from "lucide-react";

import {BentoPhotoGrid} from "#/components/events/bento-photo-grid.tsx";
import {GALLERY_CATEGORIES, GALLERY_PHOTOS} from "#/components/events/events-data.ts";
import {Input} from "#/components/ui/input.tsx";

// function GalleryHeading() {
//   return (
//     <div className="mb-12 text-center">
//       <span className="inline-block rounded-full border border-foreground/20 bg-foreground/5 px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-foreground/70">
//         - PHOTO SHOWCASE
//       </span>
//       <h2 className="mt-3 text-3xl font-black tracking-tight text-foreground sm:text-4xl lg:text-5xl">
//         Event <span className="text-primary">Gallery</span>
//       </h2>
//       <p className="mt-3 mx-auto max-w-xl text-sm text-muted-foreground">
//         Authentic moments, stage presentations, and highlights from our AWS events in Lagos
//       </p>
//     </div>
//   );
// }

function CategoryFilters({selected, onSelect}: {readonly selected: string; readonly onSelect: (cat: string) => void}) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {GALLERY_CATEGORIES.map((cat) => (
        <button
          key={cat}
          type="button"
          onClick={() => onSelect(cat)}
          className={`rounded-full px-4 py-2 text-xs font-bold transition-all ${
            selected === cat
              ? "bg-primary text-white shadow-md"
              : "border border-foreground/10 bg-card text-muted-foreground hover:bg-muted hover:text-foreground"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

export function EventsGallery() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredImages = useMemo(() => {
    return GALLERY_PHOTOS.filter((photo) => {
      const matchesCat = selectedCategory === "All" || photo.category === selectedCategory;
      const matchesQ =
        searchQuery.trim() === "" ||
        photo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        photo.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesQ;
    }).map((p) => p.imageSrc);
  }, [selectedCategory, searchQuery]);

  return (
    <section className="border-t border-foreground/10 bg-background py-20 text-foreground sm:py-28">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        {/* <GalleryHeading /> */}

        <div className="mb-10 flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="relative w-full md:w-80">
            <Search className="absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search past events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-11 rounded-full border-foreground/15 bg-card pl-10 pr-4 text-xs shadow-sm focus-visible:ring-primary"
            />
          </div>
          <CategoryFilters selected={selectedCategory} onSelect={setSelectedCategory} />
        </div>

        {filteredImages.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-foreground/20 p-16 text-center text-muted-foreground">
            <p className="text-sm font-semibold">No photos match your search.</p>
          </div>
        ) : (
          <BentoPhotoGrid images={filteredImages} />
        )}
      </div>
    </section>
  );
}
