import {useState} from "react";

import {cn} from "@/lib/utils";
import {ServicesPackageCard} from "#/components/layout/services-package-card.tsx";
import {ServicePackages} from "#/components/layout/services-packages-data.ts";

const SECTION_TITLE_ID = "service-packages-title";

type PackagesToggleProps = {
  readonly isYearly: boolean;
  readonly onChange: (yearly: boolean) => void;
};

function ServicesPackagesToggle({isYearly, onChange}: PackagesToggleProps) {
  return (
    <div className="mt-8 flex flex-col items-center gap-3 sm:mt-10">
      <span className="text-xs font-medium tracking-wide text-emerald-400">Save 20% with yearly billing</span>
      <div className="flex rounded-full border border-white/15 bg-white/5 p-1 backdrop-blur-md">
        <button
          type="button"
          onClick={() => onChange(false)}
          className={cn(
            "rounded-full px-5 py-2 text-xs font-semibold transition-all duration-300",
            !isYearly ? "bg-white text-primary shadow-md" : "text-white/70 hover:text-white"
          )}
        >
          Monthly
        </button>
        <button
          type="button"
          onClick={() => onChange(true)}
          className={cn(
            "rounded-full px-5 py-2 text-xs font-semibold transition-all duration-300",
            isYearly ? "bg-white text-primary shadow-md" : "text-white/70 hover:text-white"
          )}
        >
          Yearly
        </button>
      </div>
    </div>
  );
}

function ServicesPackagesHeader({isYearly, onToggle}: PackagesToggleProps) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className="text-xs font-semibold tracking-[0.28em] text-white/50 uppercase">Service Packages</p>
      <h2 id={SECTION_TITLE_ID} className="mt-4 text-4xl leading-[1.06] font-medium tracking-tight text-white sm:text-5xl">
        Plans & Pricing
      </h2>
      <p className="mt-4 text-base leading-relaxed text-white/65 sm:text-lg">
        Transparent, predictable cloud architecture and management packages designed to scale with your business.
      </p>

      <ServicesPackagesToggle isYearly={isYearly} onChange={onToggle} />
    </div>
  );
}

export function ServicesPackages() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section
      aria-labelledby={SECTION_TITLE_ID}
      className="relative isolate overflow-hidden px-5 py-24 sm:px-8 lg:py-32"
      style={{
        background:
          "radial-gradient(ellipse 80% 60% at 20% 0%, rgba(47,106,74,0.55) 0%, transparent 65%), radial-gradient(ellipse 60% 50% at 80% 10%, rgba(79,184,178,0.28) 0%, transparent 60%), #04160c",
      }}
    >
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
