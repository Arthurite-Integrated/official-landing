import {useMemo} from "react";
import {useQuery} from "@tanstack/react-query";

import {PartnerLogoList} from "#/components/layout/partner-logo-list.tsx";
import {toPartnerLogos} from "#/components/layout/partner-logos.ts";
import {DataEmptyState} from "#/components/layout/data-empty-state.tsx";
import {partnersQueryOptions} from "#/lib/api/endpoints.ts";

export function PartnerMarquee() {
  const {data, isPending, isError} = useQuery(partnersQueryOptions());
  const partners = useMemo(() => toPartnerLogos(data ?? []), [data]);

  return (
    <section aria-label="Our partners and clients" className="py-16 sm:py-20">
      <p className="text-center text-[0.95rem] text-neutral-500">The teams that can't afford downtime build with us.</p>

      {isPending ? (
        <div
          aria-busy="true"
          aria-label="Loading partners"
          className="mx-auto mt-12 h-14 max-w-5xl animate-pulse rounded-full bg-foreground/5"
        />
      ) : isError ? (
        <p role="alert" className="mt-8 text-center text-sm text-foreground/50">
          We couldn't load our partners right now.
        </p>
      ) : partners.length === 0 ? (
        <div className="mx-auto mt-12 max-w-5xl px-5">
          <DataEmptyState title="No partners to feature for now" description="Our partner community will be shown here as it grows." />
        </div>
      ) : (
        <div className="partner-marquee mt-12 flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_7%,#000_93%,transparent)]">
          <div className="partner-marquee-track flex w-max items-center">
            <PartnerLogoList partners={partners} />
            <PartnerLogoList partners={partners} duplicate />
          </div>
        </div>
      )}
    </section>
  );
}
