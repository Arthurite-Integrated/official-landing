import type {LucideIcon} from "lucide-react";
import {Cloud, Compass, Zap} from "lucide-react";

import {BentoCardArt} from "#/components/layout/bento-card-art.tsx";
import {CAREERS_BENEFITS} from "#/components/layout/careers-data.ts";

const SECTION_TITLE_ID = "careers-benefits-title";

function getBenefitLucideIcon(iconName: "cloud" | "growth" | "impact"): LucideIcon {
  switch (iconName) {
    case "cloud":
      return Cloud;
    case "growth":
      return Compass;
    case "impact":
      return Zap;
    default:
      return Cloud;
  }
}

export function CareersBenefits() {
  return (
    <section aria-labelledby={SECTION_TITLE_ID} className="relative isolate overflow-hidden bg-background px-5 py-24 sm:px-8 lg:py-32">
      <div className="relative z-10 mx-auto max-w-6xl xl:max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <h2 id={SECTION_TITLE_ID} className="text-4xl leading-[1.06] font-medium tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Why Work With Us
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-foreground/70 sm:text-lg">
            We're a cloud-focused company driven by impact — from building infrastructure to running events and training the next generation
            of tech talent.
          </p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {CAREERS_BENEFITS.map((benefit) => (
            <article
              key={benefit.id}
              className="group @container relative isolate flex min-h-64 flex-col justify-between overflow-hidden rounded-3xl border border-foreground/10 bg-sand p-6 sm:p-8 transition-all duration-500 hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-[0_0_40px_rgba(0,103,89,0.12)] md:min-h-72 lg:min-h-80"
            >
              <BentoCardArt icon={getBenefitLucideIcon(benefit.iconName)} />

              <div className="flex shrink-0 items-baseline gap-3">
                <span className="text-4xl font-medium text-foreground/35 sm:text-5xl">{benefit.number}</span>
                <h3 className="text-2xl font-medium tracking-tight text-foreground sm:text-3xl">{benefit.title}</h3>
              </div>

              <div className="mt-8 sm:mt-12">
                <p className="max-w-sm text-sm leading-relaxed font-medium text-foreground/75 sm:text-base">{benefit.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
