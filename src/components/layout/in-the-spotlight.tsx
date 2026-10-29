import {useMemo} from "react";
import {useQuery} from "@tanstack/react-query";

import {SpotlightCard} from "#/components/layout/spotlight-card.tsx";
import {toSpotlightItems} from "#/components/layout/spotlight-items.ts";
import {DataEmptyState} from "#/components/layout/data-empty-state.tsx";
import {spotlightQueryOptions} from "#/lib/api/endpoints.ts";

const SPOTLIGHT_TITLE_ID = "in-the-spotlight-title";

export function InTheSpotlight() {
  const {data, isPending, isError} = useQuery(spotlightQueryOptions());
  const items = useMemo(() => toSpotlightItems(data ?? []), [data]);

  return (
    <section aria-labelledby={SPOTLIGHT_TITLE_ID} className="bg-background px-5 py-24 sm:px-8 lg:py-32">
      <div className="mx-auto max-w-6xl xl:max-w-7xl">
        <header className="mx-auto mb-14 max-w-2xl text-center lg:mb-20">
          <h2 id={SPOTLIGHT_TITLE_ID} className="text-4xl font-medium tracking-tight text-foreground sm:text-5xl">
            In the Spotlight
          </h2>
          <p className="mt-5 text-base leading-relaxed text-foreground/70 sm:text-lg">
            From AWS to The Guardian, our cloud work is getting noticed.
          </p>
        </header>

        {isPending ? (
          <div aria-busy="true" aria-label="Loading spotlight items" className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2].map((index) => (
              <div key={index} className="aspect-16/15 animate-pulse rounded-2xl bg-foreground/5" />
            ))}
          </div>
        ) : isError ? (
          <p role="alert" className="mt-10 text-center text-base text-foreground/50">
            We couldn't load spotlight items right now. Please try again later.
          </p>
        ) : items.length === 0 ? (
          <div className="mt-10">
            <DataEmptyState
              title="No spotlight for now"
              description="Check back soon to see the latest places our work has been featured."
            />
          </div>
        ) : (
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <li key={item.title}>
                <SpotlightCard item={item} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
