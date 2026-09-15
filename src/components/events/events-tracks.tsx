import {Link} from "@tanstack/react-router";
import {Bot, Brain, Cpu, MoveUpRight, type LucideIcon} from "lucide-react";

import {EVENT_INFO, EVENT_TRACKS, type EventTrack} from "#/components/events/events-data.ts";
import {Button} from "#/components/ui/button.tsx";

function getTrackLucideIcon(iconType: EventTrack["iconType"]): LucideIcon {
  if (iconType === "robotics") return Bot;
  if (iconType === "ai") return Brain;
  return Cpu;
}

function CardNetArt({icon: Icon}: {readonly icon: LucideIcon}) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(31,32,34,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(31,32,34,0.06)_1px,transparent_1px)] [background-size:34px_34px] [mask-image:radial-gradient(120%_120%_at_50%_0%,#000_10%,transparent_70%)] transition-transform duration-700 ease-out group-hover:scale-110" />
      <div className="absolute -top-28 -right-24 size-72 rounded-full bg-[#006759]/10 blur-3xl transition-transform duration-700 ease-out group-hover:translate-x-6 group-hover:translate-y-4" />
      <Icon
        className="absolute top-1/2 right-[-2.5rem] size-64 -translate-y-1/2 text-foreground/6 transition-transform duration-700 ease-out group-hover:-translate-x-2"
        strokeWidth={0.6}
      />
    </div>
  );
}

function TrackCard({track}: {readonly track: EventTrack}) {
  const IconComponent = getTrackLucideIcon(track.iconType);

  return (
    <div className="group relative isolate flex flex-col justify-between overflow-hidden rounded-[2rem] border border-[#006759]/15 bg-[#f9f9f8] p-10 shadow-sm transition-all duration-300 hover:border-[#006759]/40 hover:shadow-lg lg:p-14 min-h-[340px] dark:bg-card">
      <CardNetArt icon={IconComponent} />

      <div>
        <div className="relative z-10 mb-8 flex items-center gap-5">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-[#006759]/20 bg-[#006759]/10 shadow-xs transition-transform duration-300 group-hover:scale-105">
            <IconComponent className="h-8 w-8 text-[#006759]" />
          </div>
          <h3 className="text-2xl font-bold tracking-tight text-[#1f2022] lg:text-3xl dark:text-foreground">{track.title}</h3>
        </div>

        <p className="relative z-10 text-base leading-relaxed text-[#6c6d6f] lg:text-lg dark:text-muted-foreground">{track.description}</p>
      </div>
    </div>
  );
}

export function EventsTracks() {
  return (
    <section className="bg-background py-28 text-[#1f2022] sm:py-36 lg:py-48">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <div className="mb-20 flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <p className="max-w-3xl text-2xl font-medium leading-relaxed text-[#1f2022] sm:text-3xl lg:text-4xl dark:text-foreground">
            {EVENT_INFO.introText}
          </p>
          <Link to={EVENT_INFO.ctaLink}>
            <Button className="h-14 rounded-full bg-[#006759] px-10 text-base font-semibold text-white shadow-lg transition-all hover:bg-[#005f55] hover:scale-105">
              {EVENT_INFO.ctaText}
              <MoveUpRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>

        <div className="grid gap-10 md:grid-cols-3">
          {EVENT_TRACKS.map((track) => (
            <TrackCard key={track.id} track={track} />
          ))}
        </div>
      </div>
    </section>
  );
}
