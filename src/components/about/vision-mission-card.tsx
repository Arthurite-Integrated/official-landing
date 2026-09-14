import {cn} from "@/lib/utils";
import type {VisionMissionStatement} from "#/components/about/vision-mission-content.ts";

const TONE_STYLES = {
  primary: {card: "bg-primary text-white", icon: "bg-white/10 text-white", quiet: "text-white/80", rule: "border-white/15"},
  muted: {
    card: "bg-[#f2f2f0] text-foreground",
    icon: "bg-primary/10 text-primary",
    quiet: "text-foreground/65",
    rule: "border-foreground/10",
  },
} as const;

type VisionMissionCardProps = {
  readonly number: string;
  readonly statement: VisionMissionStatement;
};

export function VisionMissionCard({number, statement}: VisionMissionCardProps) {
  const tone = TONE_STYLES[statement.tone];
  const Icon = statement.icon;

  return (
    <article className={cn("flex flex-col rounded-3xl p-8 sm:p-10 lg:p-12", tone.card)}>
      <div className="flex items-center justify-between">
        <span className={cn("grid size-12 place-items-center rounded-2xl", tone.icon)}>
          <Icon className="size-5" strokeWidth={1.75} aria-hidden />
        </span>
        <span aria-hidden className={cn("font-mono text-xs tracking-widest", tone.quiet)}>
          {number}
        </span>
      </div>

      <h3 className="mt-12 text-3xl font-medium tracking-tight sm:text-4xl">{statement.title}</h3>
      <p className="mt-5 mb-10 text-lg leading-relaxed sm:text-xl">{statement.statement}</p>
      <p className={cn("mt-auto border-t pt-6 text-base leading-relaxed", tone.rule, tone.quiet)}>{statement.extension}</p>
    </article>
  );
}
