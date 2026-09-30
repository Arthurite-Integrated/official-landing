import {useQuery} from "@tanstack/react-query";
import {createFileRoute} from "@tanstack/react-router";

import {EventDetailView} from "#/components/events/event-detail-view.tsx";
import {eventQueryOptions} from "#/lib/api/endpoints.ts";
import {ApiError} from "#/lib/api/client.ts";
import {Button} from "#/components/ui/button.tsx";

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

function EventLoadError({onRetry}: {readonly onRetry: () => void}) {
  return (
    <main className="w-full overflow-x-hidden bg-background">
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 pt-28 text-center">
        <h1 className="text-3xl font-bold text-foreground sm:text-4xl">We couldn't load this event</h1>
        <p className="mt-2 text-sm text-foreground/70">Something went wrong while fetching the event details.</p>
        <Button onClick={onRetry} className="mt-6 rounded-full bg-primary px-6 font-semibold text-white">
          Try again
        </Button>
      </div>
    </main>
  );
}

function SingleEventRoute() {
  const {slug} = Route.useParams();
  const {data: event, isPending, isError, error, refetch} = useQuery(eventQueryOptions(slug));

  if (isPending) return <EventDetailSkeleton />;
  if (isError && !(error instanceof ApiError && error.status === 404)) {
    return <EventLoadError onRetry={() => void refetch()} />;
  }
  return <EventDetailView event={isError ? undefined : event} />;
}
