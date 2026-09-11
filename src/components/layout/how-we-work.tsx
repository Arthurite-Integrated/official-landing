import {Link} from "@tanstack/react-router";
import {ArrowUpRight} from "lucide-react";

import {WorkStepCard} from "#/components/layout/work-step-card.tsx";
import {WorkSteps} from "#/components/layout/work-steps.ts";

const SECTION_TITLE_ID = "how-we-work-title";

export function HowWeWork() {
  return (
    <section aria-labelledby={SECTION_TITLE_ID} className="px-5 py-24 sm:px-8 lg:py-32">
      <div className="mx-auto max-w-6xl xl:max-w-7xl">
        <header className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <h2 id={SECTION_TITLE_ID} className="text-4xl leading-[1.06] font-medium tracking-tight text-primary sm:text-5xl">
              How we work
            </h2>
            <p className="mt-5 text-base leading-relaxed text-primary/70 sm:text-lg">
              Our process is simple, practical, and focused on building cloud infrastructure that works long term.
            </p>
          </div>

          <Link
            to="/contact"
            className="group inline-flex w-fit items-center gap-2 rounded-full bg-primary py-3 pr-3 pl-6 text-sm font-semibold text-primary-bg transition-colors hover:bg-primary/90"
          >
            Book a free consultation
            <span className="grid size-8 place-items-center rounded-full bg-primary-bg/15 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              <ArrowUpRight className="size-4" aria-hidden />
            </span>
          </Link>
        </header>

        <div className="work-step-row mt-14 flex flex-col gap-4 md:grid md:grid-cols-2 lg:mt-20 lg:flex lg:flex-row">
          {WorkSteps.map((step) => (
            <WorkStepCard key={step.number} step={step} />
          ))}
        </div>
      </div>
    </section>
  );
}
