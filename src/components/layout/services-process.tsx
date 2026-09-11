import {Link} from "@tanstack/react-router";
import {ArrowUpRight} from "lucide-react";

import {ProcessStepCard} from "#/components/layout/process-step-card.tsx";
import {ProcessSteps} from "#/components/layout/services-process-data.ts";

const SECTION_TITLE_ID = "services-process-title";

/**
 * Semi-circle arc: outer cards sit lower, centre cards rise,
 * creating a dome across the 3×2 grid.
 *
 * Row 1 (indices 0,1,2): [+28, -12, +28]
 * Row 2 (indices 3,4,5): [+16,  -4, +16]
 */
const ARC_OFFSETS_PX = [110, 50, 0, 0, 50, 110] as const;

function ProcessHeader() {
  return (
    <header className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
      <div className="max-w-xl">
        <h2 id={SECTION_TITLE_ID} className="text-4xl leading-[1.06] font-medium tracking-tight text-emerald-400 sm:text-5xl lg:text-6xl">
          Implementation Process
        </h2>
        <p className="mt-5 text-base leading-relaxed text-white/55 sm:text-lg lg:text-xl">
          A clear, structured approach that takes your cloud project from planning to production with no guesswork.
        </p>
      </div>

      <Link
        to="/contact"
        className="group inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/8 py-3 pr-3 pl-6 text-sm font-semibold text-white backdrop-blur-md transition-all duration-300 hover:border-white/35 hover:bg-white/15"
      >
        Book a free consultation
        <span className="grid size-8 place-items-center rounded-full bg-white/12 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
          <ArrowUpRight className="size-4" aria-hidden />
        </span>
      </Link>
    </header>
  );
}

export function ServicesProcess() {
  return (
    <section
      aria-labelledby={SECTION_TITLE_ID}
      className="overflow-hidden py-32 sm:py-40 lg:pt-40 lg:pb-64"
      style={{backgroundColor: "#020905"}}
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8 xl:max-w-7xl">
        <ProcessHeader />
      </div>

      <div className="mt-16 w-full px-4 sm:px-6 lg:mt-32 lg:px-8 xl:px-12">
        <div className="flex flex-col gap-5 sm:gap-6 lg:flex-row lg:gap-3 xl:gap-4">
          {ProcessSteps.map((step, index) => (
            <div
              key={step.number}
              className="min-w-0 flex-1 transition-all duration-500 ease-out lg:[transform:translateY(var(--arc-y))] lg:hover:flex-[2.2]"
              style={{"--arc-y": `${String(ARC_OFFSETS_PX[index])}px`} as React.CSSProperties}
            >
              <ProcessStepCard step={step} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
