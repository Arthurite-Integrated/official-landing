import {Building2, MapPin, Sparkles, Users2} from "lucide-react";

import type {EventItem} from "#/components/events/events-data.ts";

const VENUE_PHOTO = "https://res.cloudinary.com/dq8fswidj/image/upload/c_limit,f_auto,q_auto,w_1200/DSC_2332_lya0sv?_a=BAMAROFG0";

function VenueImageCard({photoSrc}: {readonly photoSrc: string}) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-slate-900 shadow-2xl">
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <img
          src={photoSrc}
          alt="Federal Palace Hotel, Lagos — Arthurite AWS Event Venue"
          className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1418] via-transparent to-transparent opacity-80" />
      </div>
      <div className="p-6">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
          <MapPin className="h-4 w-4" />
          <span>Federal Palace Hotel & Casino</span>
        </div>
        <p className="mt-2 text-xs text-slate-300">6-8 Ahmadu Bello Way, Victoria Island, Lagos, Nigeria</p>
      </div>
    </div>
  );
}

function VenueDetails({event}: {readonly event?: EventItem}) {
  const locationName = event?.location ?? "Federal Palace Hotel, Victoria Island, Lagos";

  return (
    <div className="space-y-6">
      <div>
        <span className="inline-block rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-slate-300">
          - EVENT LOCATION -
        </span>
        <h2 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
          Hosted in <span className="text-emerald-400">Lagos, Nigeria</span>
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-300">
          Our cloud and AI summits bring together technology leaders, developers, and AWS experts at the prestigious {locationName}.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md">
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white">
            <Building2 className="h-5 w-5" />
          </div>
          <h4 className="text-sm font-bold text-white">World-Class Infrastructure</h4>
          <p className="mt-1 text-xs text-slate-300">
            State-of-the-art conference halls fitted for tech keynote presentations and live Cloud demos.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md">
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white">
            <Users2 className="h-5 w-5" />
          </div>
          <h4 className="text-sm font-bold text-white">Executive Networking</h4>
          <p className="mt-1 text-xs text-slate-300">
            Dedicated lounges for tech founders, AWS cloud architects, and enterprise decision-makers.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-xs font-semibold text-emerald-300">
        <Sparkles className="h-5 w-5 shrink-0 text-emerald-400" />
        <span>Experience high-impact AWS keynotes, GenAI workshops, and hands-on mobility demos live in Lagos.</span>
      </div>
    </div>
  );
}

export function EventDetailLocations({event}: {readonly event?: EventItem}) {
  const photoSrc = event?.galleryImages?.[0] ?? VENUE_PHOTO;

  return (
    <section className="border-t border-white/5 bg-[#0a1418] py-20 text-white sm:py-28">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6">
            <VenueImageCard photoSrc={photoSrc} />
          </div>

          <div className="lg:col-span-6">
            <VenueDetails event={event} />
          </div>
        </div>
      </div>
    </section>
  );
}
