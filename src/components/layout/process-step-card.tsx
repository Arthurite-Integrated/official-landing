import {cn} from "@/lib/utils";
import {BentoCardArt} from "#/components/layout/bento-card-art.tsx";
import type {ProcessStep} from "#/components/layout/services-process-data.ts";

type ProcessStepCardProps = {
  readonly step: ProcessStep;
};

export function ProcessStepCard({step}: ProcessStepCardProps) {
  return (
    <article
      className={cn(
        "group @container relative isolate flex min-h-[16rem] w-full flex-col justify-between overflow-hidden rounded-3xl border border-white/12 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] sm:min-h-[18rem] sm:p-7 lg:h-[27rem]",
        step.gradient
      )}
    >
      <BentoCardArt icon={step.icon} />

      <div className="flex shrink-0 items-baseline gap-3">
        <span className="text-4xl font-medium text-white/30 sm:text-5xl">{step.number}</span>
        <h3 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">{step.label}</h3>
      </div>

      <div className="overflow-hidden">
        <p className="text-sm leading-relaxed font-medium text-white/75 opacity-100 translate-y-0 transition-all duration-500 ease-out sm:text-base lg:opacity-0 lg:translate-y-3 lg:group-hover:opacity-100 lg:group-hover:translate-y-0">
          {step.description}
        </p>
      </div>
    </article>
  );
}
