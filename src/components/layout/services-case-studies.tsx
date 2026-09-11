import {Link} from "@tanstack/react-router";
import {ArrowRight} from "lucide-react";

import {CaseStudyCard} from "#/components/layout/case-study-card.tsx";
import {ClientCaseStudies} from "#/components/layout/services-case-studies-data.ts";

const SECTION_TITLE_ID = "case-studies-title";

function CaseStudiesHeader() {
  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
      <div className="max-w-2xl">
        <p className="text-xs font-semibold tracking-[0.28em] text-white/50 uppercase">Client Reviews</p>
        <h2 id={SECTION_TITLE_ID} className="mt-4 text-4xl leading-[1.06] font-medium tracking-tight text-white sm:text-5xl">
          What Our Clients Say
        </h2>
        <p className="mt-4 text-base leading-relaxed text-white/65 sm:text-lg">
          We help cloud teams in different industries build with confidence. Here's what they say about working with us.
        </p>
      </div>

      <Link
        to="/contact"
        className="inline-flex h-11 shrink-0 items-center gap-2 rounded-full border border-white/20 bg-white/8 px-6 text-sm font-medium text-white backdrop-blur-md transition-all duration-300 hover:border-white/35 hover:bg-white/15"
      >
        Work With Us
        <ArrowRight className="size-4" aria-hidden />
      </Link>
    </div>
  );
}

export function ServicesCaseStudies() {
  return (
    <section
      aria-labelledby={SECTION_TITLE_ID}
      className="relative isolate overflow-hidden px-5 py-24 sm:px-8 lg:py-32"
      style={{
        background:
          "radial-gradient(ellipse 70% 55% at 50% 100%, rgba(16,185,129,0.14) 0%, rgba(4,22,12,0.20) 55%, transparent 85%), #020905",
      }}
    >
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.025)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]"
      />

      <div className="relative z-10 mx-auto max-w-6xl xl:max-w-7xl">
        <CaseStudiesHeader />

        <div className="mt-14 grid gap-6 md:grid-cols-4 lg:mt-16">
          {ClientCaseStudies.map((study, index) => {
            const spans = ["md:col-span-3", "md:col-span-1", "md:col-span-2", "md:col-span-2"] as const;
            return <CaseStudyCard key={study.id} study={study} className={spans[index]} />;
          })}
        </div>
      </div>
    </section>
  );
}
