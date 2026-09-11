import {Link} from "@tanstack/react-router";
import {ArrowRight} from "lucide-react";

import {ServicesOfferCard} from "#/components/layout/services-offer-card.tsx";
import {ServiceOffers} from "#/components/layout/services-offer-data.ts";

const SECTION_TITLE_ID = "what-we-offer-title";

function ServicesOfferHeader() {
  return (
    <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
      <div className="max-w-2xl">
        <p className="text-xs font-semibold tracking-[0.28em] text-white/50 uppercase">What We Offer</p>
        <h2 id={SECTION_TITLE_ID} className="mt-4 text-4xl leading-[1.06] font-medium tracking-tight text-white sm:text-5xl">
          One partner for the whole cloud lifecycle.
        </h2>
        <p className="mt-4 text-base leading-relaxed text-white/65 sm:text-lg">
          We help businesses build and operate reliable cloud infrastructure. Whether you’re moving to the cloud for the first time or
          improving what you already have, we focus on performance, security, and cost efficiency.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Link
          to="/contact"
          className="inline-flex h-11 items-center gap-2 rounded-full border border-white/25 bg-white/10 px-6 text-sm font-medium text-white shadow-lg backdrop-blur-md transition-all duration-300 hover:border-white/40 hover:bg-white/20"
        >
          Book Consultation
          <ArrowRight className="size-4 text-white" aria-hidden />
        </Link>
      </div>
    </div>
  );
}

export function ServicesWhatWeOffer() {
  return (
    <section aria-labelledby={SECTION_TITLE_ID} className="bg-black px-5 py-24 sm:px-8 lg:py-32">
      <div className="mx-auto max-w-6xl xl:max-w-7xl">
        <ServicesOfferHeader />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {ServiceOffers.map((offer, index) => (
            <ServicesOfferCard key={offer.title} offer={offer} isFeatured={index === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}
