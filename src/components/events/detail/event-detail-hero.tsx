import {ArrowUpRight} from "lucide-react";

import type {EventItem} from "#/components/events/events-data.ts";

function HeroHeadline({title}: {readonly title: string}) {
  const words = title.split(" ");
  const firstPart = words.slice(0, 3).join(" ") || "Discover Creative Sparks";
  const highlighted = words.slice(3, 5).join(" ") || "Through Ideas";
  const lastPart = words.slice(5).join(" ") || "That Inspire Action";

  return (
    <h1 className="mb-6 max-w-3xl text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl leading-tight sm:leading-tight">
      {firstPart} <span className="inline-block rounded-xl bg-primary px-3.5 py-1 text-white shadow-lg">{highlighted}</span> {lastPart}
    </h1>
  );
}

function HeroGlassWidget({event}: {readonly event: EventItem}) {
  return (
    <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-md shadow-2xl transition-transform hover:scale-105">
      <div className="mb-3 flex items-center gap-2">
        <div className="flex -space-x-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white ring-2 ring-black">
            AO
          </div>
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-600 text-[10px] font-bold text-white ring-2 ring-black">
            CN
          </div>
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-teal-600 text-[10px] font-bold text-white ring-2 ring-black">
            FA
          </div>
        </div>
      </div>
      <p className="text-[11px] font-medium text-slate-300">{event.date} // Lagos, Nigeria</p>
      <div className="mt-1 flex items-center justify-between gap-3 text-sm font-black text-white">
        <span className="truncate">{event.title}</span>
        <ArrowUpRight className="h-4 w-4 shrink-0 text-emerald-400" />
      </div>
    </div>
  );
}

function HeroBottomRow({event}: {readonly event: EventItem}) {
  return (
    <div className="grid gap-6 pt-12 lg:grid-cols-12 lg:items-end">
      <div className="lg:col-span-6">
        <p className="max-w-md text-xs sm:text-sm leading-relaxed text-slate-300">
          A global stage where cloud architects, storytellers, artists, and innovators come together to explore bold ideas, share impactful
          work.
        </p>
      </div>

      <div className="lg:col-span-6 lg:flex lg:justify-end">
        <div className="w-full max-w-xs">
          <HeroGlassWidget event={event} />
        </div>
      </div>
    </div>
  );
}

export function EventDetailHero({event}: {readonly event: EventItem}) {
  const bgImage = event.imageSrc ?? "/services/real_ai.jpg";

  return (
    <section className="relative flex min-h-[85vh] flex-col justify-between overflow-hidden bg-[#0a1418] pt-32 pb-16 text-white sm:pt-40 sm:pb-20">
      <div className="absolute inset-0 z-0">
        <img src={bgImage} alt={event.title} className="h-full w-full object-cover object-center opacity-35" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1418] via-[#0a1418]/70 to-[#0a1418]/40" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 sm:px-10">
        <div className="mb-8">
          <HeroHeadline title={event.title} />
        </div>

        <HeroBottomRow event={event} />
      </div>
    </section>
  );
}
