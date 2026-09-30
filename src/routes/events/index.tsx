import {createFileRoute} from "@tanstack/react-router";

import {EventsFeatured} from "#/components/events/events-featured.tsx";
import {EventsGallery} from "#/components/events/events-gallery.tsx";
import {EventsHero} from "#/components/events/events-hero.tsx";
import {EventsTracks} from "#/components/events/events-tracks.tsx";

export const Route = createFileRoute("/events/")({
  component: EventsPage,
});

function EventsPage() {
  return (
    <main className="w-full overflow-x-hidden bg-background">
      <EventsHero />
      <EventsFeatured />
      <EventsTracks />
      <EventsGallery />
    </main>
  );
}
