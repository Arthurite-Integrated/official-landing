import {ChevronLeft, ChevronRight, X} from "lucide-react";
import type {GalleryPhoto} from "#/components/events/events-data.ts";

function LightboxNavControls({
  onClose,
  prevPhoto,
  nextPhoto,
  onSelectPhoto,
}: {
  readonly onClose: () => void;
  readonly prevPhoto?: GalleryPhoto;
  readonly nextPhoto?: GalleryPhoto;
  readonly onSelectPhoto: (photo: GalleryPhoto) => void;
}) {
  return (
    <>
      <button
        type="button"
        onClick={onClose}
        aria-label="Close photo preview"
        className="absolute top-6 right-6 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
      >
        <X className="h-5 w-5" />
      </button>

      {prevPhoto && (
        <button
          type="button"
          onClick={() => onSelectPhoto(prevPhoto)}
          aria-label="Previous photo"
          className="absolute left-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors sm:left-8"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
      )}

      {nextPhoto && (
        <button
          type="button"
          onClick={() => onSelectPhoto(nextPhoto)}
          aria-label="Next photo"
          className="absolute right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors sm:right-8"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      )}
    </>
  );
}

function LightboxCardContent({
  activePhoto,
  currentIndex,
  totalCount,
}: {
  readonly activePhoto: GalleryPhoto;
  readonly currentIndex: number;
  readonly totalCount: number;
}) {
  return (
    <div className="relative max-h-[85vh] max-w-4xl overflow-hidden rounded-3xl border border-white/20 bg-slate-950 p-3 shadow-2xl">
      <img
        src={activePhoto.imageSrc}
        alt={activePhoto.title}
        className="max-h-[70vh] w-auto max-w-full rounded-2xl object-contain mx-auto"
      />
      <div className="mt-3 flex items-center justify-between px-3 pb-1 text-white">
        <div>
          <span className="rounded-full bg-primary px-3 py-0.5 text-[10px] font-bold text-white">{activePhoto.category}</span>
          <h3 className="mt-1 text-lg font-black text-white">{activePhoto.title}</h3>
          <p className="text-xs text-slate-400">{activePhoto.date}</p>
        </div>
        <span className="text-xs text-slate-500 font-bold">
          {currentIndex + 1} / {totalCount}
        </span>
      </div>
    </div>
  );
}

export function GalleryLightboxModal({
  activePhoto,
  photos,
  onClose,
  onSelectPhoto,
}: {
  readonly activePhoto: GalleryPhoto | null;
  readonly photos: readonly GalleryPhoto[];
  readonly onClose: () => void;
  readonly onSelectPhoto: (photo: GalleryPhoto) => void;
}) {
  if (!activePhoto) return null;

  const currentIndex = photos.findIndex((p) => p.id === activePhoto.id);
  const prevPhoto = photos[currentIndex - 1] ?? photos[photos.length - 1];
  const nextPhoto = photos[currentIndex + 1] ?? photos[0];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Event photo lightbox preview"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md transition-all animate-in fade-in"
    >
      <LightboxNavControls onClose={onClose} prevPhoto={prevPhoto} nextPhoto={nextPhoto} onSelectPhoto={onSelectPhoto} />
      <LightboxCardContent activePhoto={activePhoto} currentIndex={currentIndex} totalCount={photos.length} />
    </div>
  );
}
