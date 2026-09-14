import {useState} from "react";

import {cn} from "@/lib/utils";
import {ServicesPackageCard} from "#/components/layout/services-package-card.tsx";
import {ServicePackages} from "#/components/layout/services-packages-data.ts";

const SECTION_TITLE_ID = "service-packages-title";

type ServicesPackagesToggleProps = {
  readonly isYearly: boolean;
  readonly onToggle: (yearly: boolean) => void;
};

function ServicesPackagesToggle({isYearly, onToggle}: ServicesPackagesToggleProps) {
  return (
    <div className="mt-8 flex flex-col items-center gap-3 sm:mt-10">
      <span className="text-xs font-medium tracking-wide text-primary">Save 20% with yearly billing</span>
      <div className="flex rounded-full border border-foreground/15 bg-foreground/5 p-1">
        <button
          type="button"
          onClick={() => onToggle(false)}
          className={cn(
            "rounded-full px-5 py-2 text-xs font-semibold transition-all duration-300",
            !isYearly ? "bg-primary text-white shadow-md" : "text-foreground/60 hover:text-foreground"
          )}
        >
          Monthly
        </button>
        <button
          type="button"
          onClick={() => onToggle(true)}
          className={cn(
            "rounded-full px-5 py-2 text-xs font-semibold transition-all duration-300",
            isYearly ? "bg-primary text-white shadow-md" : "text-foreground/60 hover:text-foreground"
          )}
        >
          Yearly
        </button>
      </div>
    </div>
  );
}

type ServicesPackagesHeaderProps = {
  readonly isYearly: boolean;
  readonly onToggle: (yearly: boolean) => void;
};

function ServicesPackagesHeader({isYearly, onToggle}: ServicesPackagesHeaderProps) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className="text-xs font-semibold tracking-[0.28em] text-foreground/50 uppercase">Service Packages</p>
      <h2 id={SECTION_TITLE_ID} className="mt-4 text-4xl leading-[1.06] font-medium tracking-tight text-foreground sm:text-5xl">
        Plans & Pricing
      </h2>
      <p className="mt-4 text-base leading-relaxed text-foreground/70 sm:text-lg">
        Transparent, predictable cloud architecture and management packages designed to scale with your business.
      </p>

      <ServicesPackagesToggle isYearly={isYearly} onToggle={onToggle} />
    </div>
  );
}

export function ServicesPackages() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section aria-labelledby={SECTION_TITLE_ID} className="relative isolate overflow-hidden bg-background px-5 py-24 sm:px-8 lg:py-32">
      <div className="mx-auto max-w-6xl xl:max-w-7xl">
        <ServicesPackagesHeader isYearly={isYearly} onToggle={setIsYearly} />

        <div className="mt-14 grid gap-8 md:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {ServicePackages.map((pkg) => (
            <ServicesPackageCard key={pkg.name} pkg={pkg} isYearly={isYearly} />
          ))}
        </div>
      </div>
    </section>
  );
}
