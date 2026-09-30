import {Link} from "@tanstack/react-router";

import {EventDetailFooterCta} from "#/components/events/detail/event-detail-footer-cta.tsx";
import {EventDetailHero} from "#/components/events/detail/event-detail-hero.tsx";
import {EventDetailLocations} from "#/components/events/detail/event-detail-locations.tsx";
import {EventRegister} from "#/components/events/detail/event-register.tsx";
import {toEventItem} from "#/components/events/events-data.ts";
import {Button} from "#/components/ui/button.tsx";
import type {ApiEvent} from "#/lib/api/types.ts";

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

export function EventDetailView({event}: {readonly event?: ApiEvent}) {
  if (!event) return <EventNotFoundView />;

  const item = toEventItem(event);

  return (
    <main className="w-full overflow-x-hidden bg-background">
      <EventDetailHero event={item} />
      <EventDetailLocations event={item} />
      <EventRegister event={event} />
      <EventDetailFooterCta />
    </main>
  );
}
