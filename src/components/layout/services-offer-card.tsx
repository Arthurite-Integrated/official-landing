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
          ? "[height:20rem] hover:[height:21.6rem] lg:row-span-2 lg:[height:41.5rem] lg:hover:[height:43rem]"
          : "[height:20rem] hover:[height:21.6rem]"
      )}
    >
      <img
        src={offer.image}
        alt={offer.title}
        className="absolute inset-0 size-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

      <div className="relative z-10 flex items-end justify-between gap-4 p-6 sm:p-7">
        <h3 className="text-xl font-medium tracking-tight text-white sm:text-2xl">
          <Link to="/contact" className="hover:no-underline">
            {offer.title}
          </Link>
        </h3>

        <Link
          to="/contact"
          aria-label={`Learn more about ${offer.title}`}
          className="flex size-10 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/15 shadow-md backdrop-blur-md transition-all duration-300 hover:border-white/40 hover:bg-white/30"
        >
          <ArrowUpRight className="size-5 text-white" />
        </Link>
      </div>
    </article>
  );
}
