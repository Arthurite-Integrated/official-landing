import {useQuery} from "@tanstack/react-query";

import {awardsQueryOptions} from "#/lib/api/endpoints.ts";
import {DataEmptyState} from "#/components/layout/data-empty-state.tsx";

const AWARDS_TITLE_ID = "awards-and-recognition-title";

export function AwardsAndRecognition() {
  const {data, isPending, isError} = useQuery(awardsQueryOptions());

  return (
    <section aria-labelledby={AWARDS_TITLE_ID} className="bg-background px-5 py-24 sm:px-8 lg:py-32">
      <div className="mx-auto max-w-6xl xl:max-w-7xl">
        <header className="mx-auto mb-14 max-w-3xl text-center lg:mb-20">
          <h2 id={AWARDS_TITLE_ID} className="text-4xl font-medium tracking-tight text-foreground sm:text-5xl">
            Awards & Recognition
          </h2>
          <p className="mt-5 text-base leading-relaxed text-foreground/70 sm:text-lg">
            Celebrating milestones, industry recognition, and awards that reflect our expertise in cloud infrastructure and innovation.
          </p>
        </header>

        {isPending ? (
          <div aria-busy="true" aria-label="Loading awards" className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[0, 1, 2, 3].map((index) => (
              <div key={index} className="h-[22rem] animate-pulse rounded-2xl bg-foreground/5" />
            ))}
          </div>
        ) : isError ? (
          <p role="alert" className="text-center text-base text-foreground/50">
            We couldn't load awards right now. Please try again later.
          </p>
        ) : (data ?? []).length === 0 ? (
          <DataEmptyState
            title="No awards to share for now"
            description="Recognition and milestones will appear here when they are available."
          />
        ) : (
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {(data ?? []).map((item) => (
              <li
                key={item.id}
                className="flex min-h-[22rem] flex-col justify-between rounded-2xl border border-foreground/10 bg-foam p-7 sm:min-h-[24rem]"
              >
                <p className="text-3xl font-medium tracking-tight text-foreground">{item.year}</p>
                <p className="mt-6 text-base leading-snug text-foreground/80">{item.description}</p>
                <p className="mt-auto pt-8 text-right text-lg font-medium text-foreground/90">{item.award}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
