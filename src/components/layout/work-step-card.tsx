import {cn} from "@/lib/utils";
import {BentoCardArt} from "#/components/layout/bento-card-art.tsx";
import type {WorkStep} from "#/components/layout/work-steps.ts";

type WorkStepCardProps = {
  readonly step: WorkStep;
};

export function WorkStepCard({step}: WorkStepCardProps) {
  return (
    <article
      className={cn(
        "work-step-card group @container relative isolate flex min-h-56 flex-col justify-between overflow-hidden rounded-3xl border border-foreground/10 bg-[#f2f2f0] p-6 sm:p-7 md:min-h-72 lg:min-h-[26rem] lg:basis-0 lg:flex-1 xl:min-h-[28rem]"
      )}
    >
      <BentoCardArt icon={step.icon} />

      <div className="flex shrink-0 items-baseline gap-3 whitespace-nowrap">
        <span className="text-4xl font-medium text-foreground/35 sm:text-5xl">{step.number}</span>
        <h3 className="text-2xl font-medium tracking-tight text-foreground sm:text-3xl">{step.label}</h3>
      </div>

      <div>
        <p className="max-w-sm text-sm leading-relaxed font-medium text-foreground sm:text-base">{step.summary}</p>

        <div className="work-step-detail grid">
          <p className="max-w-sm overflow-hidden text-sm leading-relaxed text-foreground/65">{step.detail}</p>
        </div>
      </div>
    </article>
  );
}
