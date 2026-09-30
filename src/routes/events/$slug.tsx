import {useQuery} from "@tanstack/react-query";
import {createFileRoute} from "@tanstack/react-router";

import {EventDetailView} from "#/components/events/event-detail-view.tsx";
import {eventQueryOptions} from "#/lib/api/endpoints.ts";

export const Route = createFileRoute("/events/$slug")({
  component: SingleEventRoute,
});

function EventDetailSkeleton() {
  return (
    <main className="w-full overflow-x-hidden bg-background">
      <div className="min-h-[85vh] animate-pulse bg-[#0a1418]" aria-busy="true" aria-label="Loading event" />
    </main>
  );
}

function SingleEventRoute() {
  const {slug} = Route.useParams();
  const {data: event, isPending, isError} = useQuery(eventQueryOptions(slug));

  if (isPending) return <EventDetailSkeleton />;
  return <EventDetailView event={isError ? undefined : event} />;
}
