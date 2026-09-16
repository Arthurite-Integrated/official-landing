import {Link} from "@tanstack/react-router";
import {Calendar, MapPin} from "lucide-react";

import {UPCOMING_EVENTS, type EventItem} from "#/components/events/events-data.ts";
import {Button} from "#/components/ui/button.tsx";

function UpcomingCard({event}: {readonly event: EventItem}) {
  return (
    <article className="flex flex-col justify-between overflow-hidden rounded-2xl border border-primary/10 bg-card p-6 shadow-sm transition-all hover:shadow-md dark:border-white/10">
      <div>
        <div className="mb-6 flex h-40 w-full flex-col justify-between rounded-xl bg-gradient-to-br from-[#006759] to-[#004d42] p-4 text-white shadow-inner">
          <span className="self-start rounded bg-white/20 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
            {event.category}
          </span>
          <div className="text-xs font-semibold text-emerald-200">Arthurite Integrated Event</div>
        </div>
        <h3 className="mb-3 text-xl font-bold tracking-tight text-foreground">{event.title}</h3>
        <p className="mb-4 text-xs leading-relaxed text-muted-foreground">{event.description}</p>
        <div className="mb-6 space-y-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar className="h-3.5 w-3.5 text-[#006759] dark:text-teal-400" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-3.5 w-3.5 text-[#006759] dark:text-teal-400" />
            <span>{event.location}</span>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <Link to="/contact">
          <Button className="h-9 rounded-full bg-[#006759] px-4 text-xs font-semibold text-white hover:bg-teal-700">Register Now</Button>
        </Link>
        <Link to="/contact">
          <Button variant="outline" className="h-9 rounded-full px-4 text-xs font-semibold text-muted-foreground hover:bg-muted">
            View Event Details
          </Button>
        </Link>
      </div>
    </article>
  );
}

export function EventsUpcoming() {
  return (
    <section className="bg-sand/50 py-16 text-foreground sm:py-20 dark:bg-slate-900/50">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-[#006759] sm:text-4xl dark:text-emerald-400">Upcoming Events</h2>
          <p className="mt-2 text-base text-muted-foreground">Explore upcoming events and register to join our cloud and tech experts.</p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {UPCOMING_EVENTS.map((event) => (
            <UpcomingCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </section>
  );
}
