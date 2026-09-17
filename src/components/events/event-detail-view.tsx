import {Link} from "@tanstack/react-router";
import {ArrowLeft, Calendar, CheckCircle2, MapPin, Sparkles} from "lucide-react";

import type {EventItem} from "#/components/events/events-data.ts";
import {EventsGallery} from "#/components/events/events-gallery.tsx";
import {EventsSpeakers} from "#/components/events/events-speakers.tsx";
import {Button} from "#/components/ui/button.tsx";

function EventHeroImage({event}: {readonly event: EventItem}) {
  return (
    <div className="lg:col-span-5">
      <div className="relative aspect-4/3 w-full overflow-hidden rounded-3xl border border-teal-500/30 bg-slate-900 shadow-2xl">
        {event.imageSrc ? (
          <img src={event.imageSrc} alt={event.title} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center p-8 text-center text-slate-400">
            <Sparkles className="h-16 w-16 text-teal-400/40" />
          </div>
        )}
      </div>
    </div>
  );
}

function EventHeroDetails({event}: {readonly event: EventItem}) {
  return (
    <div className="lg:col-span-7">
      <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-teal-500/30 bg-teal-500/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-teal-300">
        <Sparkles className="h-3.5 w-3.5 text-teal-400" />
        {event.badge ?? event.category}
      </div>
      <h1 className="mb-6 text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">{event.title}</h1>
      <p className="mb-8 text-base leading-relaxed text-slate-300 sm:text-lg">{event.description}</p>
      <div className="mb-8 flex flex-wrap gap-4 text-xs font-medium text-slate-300 sm:text-sm">
        <div className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 backdrop-blur-xs">
          <Calendar className="h-4.5 w-4.5 text-teal-400" />
          <span>{event.date}</span>
        </div>
        <div className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 backdrop-blur-xs">
          <MapPin className="h-4.5 w-4.5 text-emerald-400" />
          <span>{event.location}</span>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <Link to="/contact">
          <Button className="h-12 rounded-full bg-[#006759] px-8 text-sm font-semibold text-white hover:bg-teal-600">
            Register / Reserve Seat
          </Button>
        </Link>
      </div>
    </div>
  );
}

function EventDetailHero({event}: {readonly event: EventItem}) {
  return (
    <section className="relative overflow-hidden bg-[#0a1418] pt-28 pb-16 text-white sm:pt-36 sm:pb-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(0,103,89,0.35),transparent_60%)]" />
      <div className="relative mx-auto max-w-7xl px-6 sm:px-10">
        <Link
          to="/events"
          className="mb-8 inline-flex items-center gap-2 text-xs font-semibold text-teal-300 transition-colors hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Events
        </Link>

        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          <EventHeroDetails event={event} />
          <EventHeroImage event={event} />
        </div>
      </div>
    </section>
  );
}

function EventDetailOverview({event}: {readonly event: EventItem}) {
  return (
    <section className="bg-background py-16 text-foreground sm:py-20">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 className="mb-4 text-2xl font-bold tracking-tight text-[#006759] sm:text-3xl dark:text-emerald-400">Event Overview</h2>
            <p className="text-base leading-relaxed text-foreground/80">{event.fullContent ?? event.description}</p>
          </div>

          {event.keyTakeaways && event.keyTakeaways.length > 0 && (
            <div className="lg:col-span-5">
              <div className="rounded-3xl border border-foreground/10 bg-foreground/5 p-8">
                <h3 className="mb-4 text-lg font-bold tracking-tight text-foreground">Key Takeaways & Benefits</h3>
                <ul className="space-y-3 text-sm text-foreground/80">
                  {event.keyTakeaways.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#006759] dark:text-teal-400" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function EventNotFoundView() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 pt-28 text-center">
      <h1 className="text-3xl font-bold text-foreground sm:text-4xl">Event Not Found</h1>
      <p className="mt-2 text-sm text-foreground/70">The event you are looking for does not exist or has been updated.</p>
      <Link to="/events" className="mt-6">
        <Button className="rounded-full bg-primary px-6 font-semibold text-white">Back to Events</Button>
      </Link>
    </div>
  );
}

export function EventDetailView({event}: {readonly event?: EventItem}) {
  if (!event) return <EventNotFoundView />;

  return (
    <main className="w-full overflow-x-hidden">
      <EventDetailHero event={event} />
      <EventDetailOverview event={event} />
      <EventsSpeakers />
      <EventsGallery />
    </main>
  );
}
