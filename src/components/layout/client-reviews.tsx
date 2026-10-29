import {useMemo} from "react";
import {useQuery} from "@tanstack/react-query";

import {ClientReviewWall} from "#/components/layout/client-review-wall.tsx";
import {ClientReviewsContent, toClientReviews, WALL_SIZE} from "#/components/layout/client-reviews-content.ts";
import {Eyebrow} from "#/components/layout/eyebrow.tsx";
import {DataEmptyState} from "#/components/layout/data-empty-state.tsx";
import {testimonialsQueryOptions} from "#/lib/api/endpoints.ts";

const CLIENT_REVIEWS_TITLE_ID = "client-reviews-heading";

function ClientReviewsBody() {
  const {data, isPending, isError} = useQuery(testimonialsQueryOptions());
  const people = useMemo(() => toClientReviews(data ?? [], WALL_SIZE), [data]);

  if (isPending) {
    return (
      <div
        aria-busy="true"
        aria-label="Loading client reviews"
        className="h-80 w-full max-w-3xl animate-pulse rounded-3xl bg-foreground/5"
      />
    );
  }

  if (isError) {
    return (
      <p role="alert" className="text-base text-foreground/50">
        We couldn't load client reviews right now. Please try again later.
      </p>
    );
  }

  return people.length > 0 ? (
    <ClientReviewWall people={people} />
  ) : (
    <div className="w-full max-w-3xl">
      <DataEmptyState title="No client reviews to share for now" description="Client feedback will appear here as it becomes available." />
    </div>
  );
}

export function ClientReviews() {
  return (
    <section id="client-reviews" aria-labelledby={CLIENT_REVIEWS_TITLE_ID} className="bg-primary-bg">
      <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-9 overflow-hidden px-6 py-16 md:px-10 lg:py-25">
        <div className="flex max-w-[624px] flex-col items-center gap-3.5 text-center">
          <Eyebrow label={ClientReviewsContent.eyebrow} />
          <h2
            id={CLIENT_REVIEWS_TITLE_ID}
            className="text-[32px] leading-[1.1] font-bold tracking-[-0.01em] text-foreground sm:text-[38px] lg:text-[42px]"
          >
            {ClientReviewsContent.heading}
          </h2>
        </div>

        <ClientReviewsBody />
      </div>
    </section>
  );
}
