import {Link} from "@tanstack/react-router";

import type {EventItem} from "#/components/events/events-data.ts";
import {EventDetailFooterCta} from "#/components/events/detail/event-detail-footer-cta.tsx";
import {EventDetailGalleryWall} from "#/components/events/detail/event-detail-gallery-wall.tsx";
import {EventDetailHero} from "#/components/events/detail/event-detail-hero.tsx";
import {EventDetailInsights} from "#/components/events/detail/event-detail-insights.tsx";
import {EventDetailLocations} from "#/components/events/detail/event-detail-locations.tsx";
import {EventDetailSessions} from "#/components/events/detail/event-detail-sessions.tsx";
import {EventDetailSpeakers} from "#/components/events/detail/event-detail-speakers.tsx";
import {Button} from "#/components/ui/button.tsx";

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
    <main className="w-full overflow-x-hidden bg-background">
      <EventDetailHero event={event} />
      <EventDetailLocations />
      <EventDetailSessions />
      <EventDetailSpeakers />
      <EventDetailGalleryWall />
      <EventDetailInsights />
      <EventDetailFooterCta />
    </main>
  );
}
