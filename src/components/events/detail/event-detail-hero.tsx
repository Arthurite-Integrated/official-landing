import {Link} from "@tanstack/react-router";
import {ArrowLeft, ArrowRight, Calendar, MapPin, Sparkles} from "lucide-react";

import type {EventItem} from "#/components/events/events-data.ts";
import {Button} from "#/components/ui/button.tsx";

function HeroBadge({category}: {readonly category: string}) {
  return (
    <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#006759]/40 bg-[#006759]/15 px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-emerald-300">
      <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
      <span>// {category}</span>
    </div>
  );
}

function HeroActions() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Link to="/contact">
        <Button className="h-12 rounded-full bg-[#006759] px-7 text-xs font-bold text-white shadow-lg transition-all hover:bg-emerald-600">
          <span>Register Now</span>
          <ArrowRight className="h-4 w-4" />
        </Button>
      </Link>
      <Link
        to="/events"
        className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 transition-colors hover:text-emerald-300"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Events
      </Link>
    </div>
  );
}

function HeroShowcaseWidget({event}: {readonly event: EventItem}) {
  return (
    <div className="relative flex items-center justify-center lg:col-span-5">
      <div className="relative aspect-4/3 w-full overflow-hidden rounded-3xl border border-teal-500/30 bg-slate-900 shadow-2xl">
        {event.imageSrc ? (
          <img src={event.imageSrc} alt={event.title} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center p-8 text-center text-slate-400">
            <Sparkles className="h-16 w-16 text-teal-400/40" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />

        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-2xl border border-white/10 bg-slate-900/80 p-3.5 backdrop-blur-md">
          <div className="flex items-center gap-2.5">
            <div className="flex -space-x-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#006759] text-[10px] font-bold text-white ring-2 ring-slate-900">
                AO
              </div>
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-600 text-[10px] font-bold text-white ring-2 ring-slate-900">
                CN
              </div>
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-teal-600 text-[10px] font-bold text-white ring-2 ring-slate-900">
                FA
              </div>
            </div>
            <div className="text-left">
              <p className="text-[11px] font-bold text-white">Arthurite Summit</p>
              <p className="text-[9px] text-slate-400">Enterprise AI & Cloud</p>
            </div>
          </div>
          <span className="rounded-full bg-[#006759] px-2.5 py-1 text-[10px] font-bold text-white">LIVE</span>
        </div>
      </div>
    </div>
  );
}

export function EventDetailHero({event}: {readonly event: EventItem}) {
  return (
    <section className="relative overflow-hidden bg-[#0a1418] pt-28 pb-20 text-white sm:pt-36 sm:pb-28">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(0,103,89,0.3),transparent_70%)]" />
      <div className="relative mx-auto max-w-7xl px-6 sm:px-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <HeroBadge category={event.category} />
            <h1 className="mb-6 text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
              {event.title.split(" ").slice(0, 3).join(" ")}{" "}
              <span className="rounded-md bg-emerald-400 px-2 py-0.5 text-[#0a1418] font-black">
                {event.title.split(" ").slice(3, 5).join(" ") || "INNOVATION"}
              </span>{" "}
              {event.title.split(" ").slice(5).join(" ")}
            </h1>
            <p className="mb-8 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">{event.description}</p>

            <div className="mb-10 flex flex-wrap gap-4 text-xs font-medium text-slate-300">
              <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 backdrop-blur-xs">
                <Calendar className="h-4 w-4 text-emerald-400" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 backdrop-blur-xs">
                <MapPin className="h-4 w-4 text-emerald-400" />
                <span>{event.location}</span>
              </div>
            </div>

            <HeroActions />
          </div>

          <HeroShowcaseWidget event={event} />
        </div>
      </div>
    </section>
  );
}
