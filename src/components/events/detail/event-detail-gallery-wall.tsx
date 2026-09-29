import {BentoPhotoGrid} from "#/components/events/bento-photo-grid.tsx";
import type {EventItem} from "#/components/events/events-data.ts";

function GalleryWallHeading({eventTitle}: {readonly eventTitle: string}) {
  return (
    <div className="mb-12 text-center">
      <h2 className="text-lg font-black tracking-tight text-white sm:text-xl lg:text-2xl">
        Moments From <br />
        <span className="font-bold text-slate-400">{eventTitle}</span>
      </h2>
    </div>
  );
}

export function EventDetailGalleryWall({event}: {readonly event: EventItem}) {
  if (event.galleryImages.length === 0) return null;

  return (
    <section className="relative overflow-hidden bg-[#0a1418] py-28 text-white sm:py-36">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,103,89,0.2),transparent_70%)]" />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-10">
        <GalleryWallHeading eventTitle={event.title} />
        <BentoPhotoGrid images={event.galleryImages} />
      </div>
    </section>
  );
}
