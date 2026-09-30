import {Link} from "@tanstack/react-router";
import {Bot, Brain, Cpu, MoveUpRight, type LucideIcon} from "lucide-react";

import {EVENT_INFO, EVENT_TRACKS, type EventTrack} from "#/components/events/events-data.ts";
import {Button} from "#/components/ui/button.tsx";

const TRACK_ICONS: Record<EventTrack["iconType"], LucideIcon> = {
  robotics: Bot,
  ai: Brain,
  quantum: Cpu,
};

function CardNetArt({icon: Icon}: {readonly icon: LucideIcon}) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(31,32,34,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(31,32,34,0.06)_1px,transparent_1px)] [background-size:34px_34px] [mask-image:radial-gradient(120%_120%_at_50%_0%,#000_10%,transparent_70%)] transition-transform duration-700 ease-out group-hover:scale-110" />
      <div className="absolute -top-28 -right-24 size-72 rounded-full bg-primary/10 blur-3xl transition-transform duration-700 ease-out group-hover:translate-x-6 group-hover:translate-y-4" />
      <Icon
        className="absolute top-1/2 right-[-2.5rem] size-64 -translate-y-1/2 text-foreground/6 transition-transform duration-700 ease-out group-hover:-translate-x-2"
        strokeWidth={0.6}
      />
    </div>
  );
}

function TrackCard({track}: {readonly track: EventTrack}) {
  const IconComponent = TRACK_ICONS[track.iconType];

  return (
    <div className="group relative isolate flex flex-col justify-between overflow-hidden rounded-[2rem] border border-primary/15 bg-sand p-10 shadow-sm transition-all duration-300 hover:border-primary/40 hover:shadow-lg lg:p-14 min-h-[340px]">
      <CardNetArt icon={IconComponent} />

      <div>
        <div className="relative z-10 mb-8 flex items-center gap-5">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 shadow-xs transition-transform duration-300 group-hover:scale-105">
            <IconComponent className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-2xl font-bold tracking-tight text-sea-ink lg:text-3xl">{track.title}</h3>
        </div>

        <p className="relative z-10 text-base leading-relaxed text-sea-ink-soft lg:text-lg">{track.description}</p>
      </div>
    </div>
  );
}

export function EventsTracks() {
  return (
    <section className="bg-background py-28 text-sea-ink sm:py-36 lg:py-48">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <div className="mb-20 flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <p className="max-w-3xl text-2xl font-medium leading-relaxed text-sea-ink sm:text-3xl lg:text-4xl">{EVENT_INFO.introText}</p>
          <Link to={EVENT_INFO.ctaLink}>
            <Button className="h-14 rounded-full bg-primary px-10 text-base font-semibold text-white shadow-lg transition-all hover:bg-lagoon-deep hover:scale-105">
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
