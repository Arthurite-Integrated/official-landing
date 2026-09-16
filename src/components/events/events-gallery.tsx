import {useMemo, useState} from "react";
import {Camera, Search} from "lucide-react";

import {GALLERY_CATEGORIES, GALLERY_PHOTOS, type GalleryPhoto} from "#/components/events/events-data.ts";
import {Input} from "#/components/ui/input.tsx";

function GalleryCard({photo}: {readonly photo: GalleryPhoto}) {
  return (
    <div className="group relative break-inside-avoid overflow-hidden rounded-2xl border border-primary/10 bg-card shadow-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
      <div className={`relative w-full overflow-hidden ${photo.aspectClass}`}>
        <img
          src={photo.imageSrc}
          alt={photo.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="rounded-full bg-white/20 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-md">
              {photo.category}
            </span>
            <Camera className="h-4 w-4 text-emerald-300" />
          </div>
          <div>
            <span className="text-[10px] font-semibold tracking-widest text-slate-300 uppercase">{photo.date}</span>
            <h3 className="text-sm font-bold tracking-tight text-white group-hover:text-teal-200">{photo.title}</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

interface GalleryControlsProps {
  readonly searchQuery: string;
  readonly onSearchChange: (value: string) => void;
  readonly selectedCategory: string;
  readonly onCategorySelect: (cat: string) => void;
}

function GalleryControls({searchQuery, onSearchChange, selectedCategory, onCategorySelect}: GalleryControlsProps) {
  return (
    <div className="mb-10 flex flex-col items-center justify-between gap-4 sm:flex-row">
      <div className="relative w-full sm:w-80">
        <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search past events..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="rounded-full border-primary/20 bg-card pl-9"
        />
      </div>
      <div className="flex flex-wrap gap-2">
        {GALLERY_CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => onCategorySelect(cat)}
            className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
              selectedCategory === cat ? "bg-[#006759] text-white" : "bg-card text-muted-foreground hover:bg-muted"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}

export function EventsGallery() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredPhotos = useMemo(() => {
    return GALLERY_PHOTOS.filter((photo) => {
      const matchesCat = selectedCategory === "All" || photo.category === selectedCategory;
      const matchesQ =
        searchQuery.trim() === "" ||
        photo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        photo.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesQ;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section className="bg-background py-16 text-foreground sm:py-20">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-[#006759] sm:text-4xl dark:text-emerald-400">Event Gallery</h2>
          <p className="mt-2 text-base text-muted-foreground">Glimpse back at photos from past events</p>
        </div>
        <GalleryControls
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onCategorySelect={setSelectedCategory}
        />
        {filteredPhotos.length === 0 ? (
          <div className="rounded-2xl border border-dashed p-12 text-center text-muted-foreground">
            No event photos match your search criteria.
          </div>
        ) : (
          <div className="columns-1 gap-6 space-y-6 sm:columns-2 lg:columns-3">
            {filteredPhotos.map((photo) => (
              <GalleryCard key={photo.id} photo={photo} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
