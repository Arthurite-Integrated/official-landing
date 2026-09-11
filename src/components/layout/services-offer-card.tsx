import {Link} from "@tanstack/react-router";
import {ArrowUpRight} from "lucide-react";

import {cn} from "@/lib/utils";
import type {ServiceOffer} from "#/components/layout/services-offer-data.ts";

type ServicesOfferCardProps = {
  readonly isFeatured?: boolean;
  readonly offer: ServiceOffer;
};

export function ServicesOfferCard({isFeatured = false, offer}: ServicesOfferCardProps) {
  return (
    <article
      className={cn(
        "group relative flex flex-col justify-end overflow-hidden rounded-3xl bg-[#03120b] [transition:height_600ms_cubic-bezier(0.22,1,0.36,1)]",
        isFeatured
          ? "[height:15rem] hover:[height:16.2rem] lg:row-span-2 lg:[height:31.5rem] lg:hover:[height:32.7rem]"
          : "[height:15rem] hover:[height:16.2rem]"
      )}
    >
      <img
        src={offer.image}
        alt={offer.title}
        className="absolute inset-0 size-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[#062414]/65 mix-blend-color transition-opacity duration-500 group-hover:opacity-40"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[#0a3a20]/25 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-10"
      />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#020905] via-[#04160c]/60 to-transparent" />

      <div className="relative z-10 flex items-end justify-between gap-3 p-5 sm:p-6">
        <h3 className="text-lg font-medium tracking-tight text-white sm:text-xl">
          <Link to="/contact" className="hover:no-underline">
            {offer.title}
          </Link>
        </h3>

        <Link
          to="/contact"
          aria-label={`Learn more about ${offer.title}`}
          className="flex size-9 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/15 shadow-md backdrop-blur-md transition-all duration-300 hover:border-white/40 hover:bg-white/30"
        >
          <ArrowUpRight className="size-4 text-white" />
        </Link>
      </div>
    </article>
  );
}
