import {Link} from "@tanstack/react-router";
import {ArrowRight, Camera} from "lucide-react";

import {GALLERY_PHOTOS} from "#/components/events/events-data.ts";
import {Button} from "#/components/ui/button.tsx";

function CentralGalleryHeader() {
  return (
    <div className="relative z-10 max-w-xl text-center">
      <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-teal-500/30 bg-teal-500/10 px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-emerald-300">
        <Camera className="h-3.5 w-3.5 text-emerald-400" />
        <span>// EVENT GALLERY</span>
      </div>
      <h2 className="mb-6 text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
        Creative Moments From <br />
        <span className="text-slate-400 font-bold">Our Global Showcase</span>
      </h2>
      <Link to="/contact">
        <Button className="h-11 rounded-full bg-[#006759] px-6 text-xs font-bold text-white shadow-lg hover:bg-emerald-600">
          <span>View Gallery</span>
          <ArrowRight className="h-4 w-4" />
        </Button>
      </Link>
    </div>
  );
}

export function EventDetailGalleryWall() {
  const photoList = GALLERY_PHOTOS.slice(0, 6);

  return (
    <section className="relative overflow-hidden bg-[#0a1418] py-28 text-white sm:py-36">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,103,89,0.25),transparent_70%)]" />

      <div className="relative mx-auto flex max-w-7xl items-center justify-center px-6 text-center sm:px-10">
        <CentralGalleryHeader />
      </div>

      <div className="mt-14 mx-auto max-w-7xl px-6 sm:px-10">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {photoList.map((photo) => (
            <div
              key={photo.id}
              className="group relative aspect-4/3 overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-md transition-all duration-500 hover:scale-105 hover:border-emerald-400/40"
            >
              <img src={photo.imageSrc} alt={photo.title} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="absolute bottom-2 left-2 right-2 text-[10px] font-bold text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                {photo.title}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
