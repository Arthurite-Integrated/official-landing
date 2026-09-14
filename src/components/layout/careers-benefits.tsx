import {Cloud, Compass, Zap} from "lucide-react";

import {CAREERS_BENEFITS} from "#/components/layout/careers-data.ts";

const SECTION_TITLE_ID = "careers-benefits-title";

function getBenefitIcon(iconName: string) {
  switch (iconName) {
    case "cloud":
      return <Cloud className="size-8 text-primary" aria-hidden="true" />;
    case "growth":
      return <Compass className="size-8 text-primary" aria-hidden="true" />;
    case "impact":
      return <Zap className="size-8 text-primary" aria-hidden="true" />;
    default:
      return <Cloud className="size-8 text-primary" aria-hidden="true" />;
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
            <div
              key={benefit.id}
              className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-foreground/10 bg-[#f2f2f0] p-8 transition-all duration-500 hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-[0_0_40px_rgba(0,103,89,0.12)]"
            >
              <div>
                <div className="flex size-16 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 p-3">
                  {getBenefitIcon(benefit.iconName)}
                </div>

                <h3 className="mt-6 text-2xl font-medium tracking-tight text-foreground transition-colors duration-300 group-hover:text-primary">
                  {benefit.title}
                </h3>

                <p className="mt-3 text-base leading-relaxed text-foreground/65">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
