import {Link} from "@tanstack/react-router";

import {HeroComposer} from "#/components/layout/hero-composer.tsx";
import {Button} from "#/components/ui/button.tsx";
import {submitEnquiry} from "#/lib/submit-enquiry.ts";

export function HomeHero() {
  return (
    <div className="flex flex-1 flex-col px-6 pt-28 sm:px-10">
      <div className="flex flex-1 flex-col items-center justify-center text-center">
        <p className="text-xs font-semibold tracking-[0.28em] text-white/70 uppercase">AWS Advanced Consulting Partner</p>

        <h1 className="mt-6 max-w-4xl text-5xl leading-[1.04] font-medium text-white sm:text-6xl lg:text-7xl">
          Cloud that moves at the speed of your ambition
        </h1>

        <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/75">
          You have the ambition. Arthurite makes it real — migrations, modernisation and managed operations on AWS.
        </p>

        <Link to="/services" className="mt-8 inline-flex">
          <Button className="h-12 rounded-full bg-white px-7 text-sm font-semibold text-primary hover:bg-primary-bg">
            Explore services
          </Button>
        </Link>
      </div>

      <div className="flex translate-y-12 justify-center">
        <HeroComposer onSubmit={submitEnquiry} />
      </div>
    </div>
  );
}
