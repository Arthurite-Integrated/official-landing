import {createFileRoute} from "@tanstack/react-router";

import {EventDetailView} from "#/components/events/event-detail-view.tsx";
import {getEventBySlug} from "#/components/events/events-data.ts";

export const Route = createFileRoute("/events/$slug")({
  loader: ({params}) => getEventBySlug(params.slug),
  head: ({loaderData}) => ({
    meta:
      loaderData === undefined
        ? [{title: "Event Not Found | Arthurite Integrated"}]
        : [{title: `${loaderData.title} | Arthurite Integrated`}, {name: "description", content: loaderData.description}],
  }),
  component: SingleEventRoute,
});

function SingleEventRoute() {
  const event = Route.useLoaderData();
  return <EventDetailView event={event} />;
}
