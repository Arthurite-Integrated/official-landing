import {useMemo, useState} from "react";
import {Camera, Maximize2, Search} from "lucide-react";

import {GALLERY_CATEGORIES, GALLERY_PHOTOS, type GalleryPhoto} from "#/components/events/events-data.ts";
import {GalleryLightboxModal} from "#/components/events/gallery-lightbox.tsx";
import {Input} from "#/components/ui/input.tsx";

function GalleryPhotoItem({photo, onOpen}: {readonly photo: GalleryPhoto; readonly onOpen: (photo: GalleryPhoto) => void}) {
  return (
    <button
      type="button"
      onClick={() => onOpen(photo)}
      className="group relative block w-full break-inside-avoid overflow-hidden rounded-3xl border border-foreground/10 bg-card p-2.5 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-[#006759]/40 hover:shadow-2xl dark:border-white/10"
    >
      <div className={`relative w-full overflow-hidden rounded-2xl bg-slate-900 ${photo.aspectClass}`}>
        <img
          src={photo.imageSrc}
          alt={photo.title}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 transition-opacity group-hover:opacity-100" />

        <div className="absolute top-3 right-3 flex items-center gap-1.5">
          <span className="rounded-full bg-black/60 px-2.5 py-0.5 text-[10px] font-bold text-white backdrop-blur-md border border-white/20">
            {photo.category}
          </span>
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md transition-transform group-hover:scale-110">
            <Maximize2 className="h-3.5 w-3.5 text-emerald-300" />
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 text-left text-white">
          <p className="text-[10px] font-bold tracking-widest text-emerald-300 uppercase">{photo.date}</p>
          <h3 className="mt-0.5 text-sm font-black tracking-tight text-white group-hover:text-emerald-200">{photo.title}</h3>
        </div>
      </div>
    </button>
  );
}

interface GalleryHeaderProps {
  readonly searchQuery: string;
  readonly onSearchChange: (value: string) => void;
  readonly selectedCategory: string;
  readonly onCategorySelect: (cat: string) => void;
}

function GalleryHeaderControls({searchQuery, onSearchChange, selectedCategory, onCategorySelect}: GalleryHeaderProps) {
  return (
    <div className="mb-12 flex flex-col items-center justify-between gap-6 md:flex-row">
      <div className="relative w-full md:w-80">
        <Search className="absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search past events..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="h-11 rounded-full border-foreground/15 bg-card pl-10 pr-4 text-xs shadow-sm focus-visible:ring-[#006759]"
        />
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2">
        {GALLERY_CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => onCategorySelect(cat)}
              className={`rounded-full px-4 py-2 text-xs font-bold transition-all ${
                isSelected
                  ? "bg-[#006759] text-white shadow-md dark:bg-emerald-500"
                  : "bg-card text-muted-foreground hover:bg-muted hover:text-foreground border border-foreground/10"
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

function GalleryHeading() {
  return (
    <div className="mb-12 text-center">
      <span className="inline-block rounded-full border border-foreground/20 bg-foreground/5 px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-foreground/70">
        - PHOTO SHOWCASE
      </span>
      <h2 className="mt-3 text-3xl font-black tracking-tight text-foreground sm:text-4xl lg:text-5xl">
        Event <span className="text-[#006759] dark:text-emerald-400">Gallery</span>
      </h2>
      <p className="mt-3 text-sm text-muted-foreground max-w-xl mx-auto">
        Authentic moments, stage presentations, and workshop highlights from our global AWS summits
      </p>
    </div>
  );
}

function GalleryPhotoGrid({
  photos,
  onOpenPhoto,
}: {
  readonly photos: readonly GalleryPhoto[];
  readonly onOpenPhoto: (photo: GalleryPhoto) => void;
}) {
  if (photos.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-foreground/20 p-16 text-center text-muted-foreground">
        <Camera className="mx-auto h-10 w-10 text-muted-foreground/50 mb-3" />
        <p className="text-sm font-semibold">No event photos match your search criteria.</p>
      </div>
    );
  }

  return (
    <div className="columns-1 gap-6 space-y-6 sm:columns-2 lg:columns-3">
      {photos.map((photo) => (
        <GalleryPhotoItem key={photo.id} photo={photo} onOpen={onOpenPhoto} />
      ))}
    </div>
  );
}

export function EventsGallery() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activePhoto, setActivePhoto] = useState<GalleryPhoto | null>(null);

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
    <section className="bg-background py-20 text-foreground sm:py-28 border-t border-foreground/10">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <GalleryHeading />
        <GalleryHeaderControls
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onCategorySelect={setSelectedCategory}
        />
        <GalleryPhotoGrid photos={filteredPhotos} onOpenPhoto={setActivePhoto} />
        <GalleryLightboxModal
          activePhoto={activePhoto}
          photos={filteredPhotos}
          onClose={() => setActivePhoto(null)}
          onSelectPhoto={setActivePhoto}
        />
      </div>
    </section>
  );
}
