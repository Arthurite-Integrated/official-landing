import {createFileRoute} from "@tanstack/react-router";

import {EventsAgenda} from "#/components/events/events-agenda.tsx";
import {EventsCta} from "#/components/events/events-cta.tsx";
import {EventsFeatured} from "#/components/events/events-featured.tsx";
import {EventsHero} from "#/components/events/events-hero.tsx";
import {EventsSpeakers} from "#/components/events/events-speakers.tsx";
import {EventsTracks} from "#/components/events/events-tracks.tsx";
import {EventsUpcoming} from "#/components/events/events-upcoming.tsx";

export const Route = createFileRoute("/events/")({
  component: EventsPage,
});

function EventsPage() {
  return (
    <main className="w-full overflow-x-hidden bg-background">
      <EventsHero />
      <EventsTracks />
      <EventsFeatured />
      <EventsAgenda />
      <EventsSpeakers />
      <EventsUpcoming />
      <EventsCta />
    </main>
  );
}
