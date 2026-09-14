import type {LucideIcon} from "lucide-react";

import {cn} from "@/lib/utils";
import {BentoCardArt} from "#/components/layout/bento-card-art.tsx";

export type BentoCardContent = {
  readonly art: string;
  readonly description: string;
  readonly highlights?: readonly string[];
  readonly icon: LucideIcon;
  readonly span: string;
  readonly title: string;
};

type BentoCardProps = {
  readonly card: BentoCardContent;
};

export function BentoCard({card}: BentoCardProps) {
  const Icon = card.icon;

  return (
    <article
      className={cn(
        "bento-reveal group @container relative isolate flex min-h-52 flex-col justify-between overflow-hidden rounded-3xl border border-foreground/10 bg-[#f2f2f0] p-6 transition-colors duration-500 hover:border-foreground/20 sm:p-7 lg:min-h-0",
        card.span
      )}
    >
      <BentoCardArt icon={Icon} />

      <div className="flex items-center gap-3">
        <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary/10 ring-1 ring-primary/20 backdrop-blur-sm">
          <Icon className="size-4.5 text-primary" strokeWidth={1.75} aria-hidden />
        </span>
        <h3 className="text-base font-medium tracking-tight text-foreground sm:text-lg">{card.title}</h3>
      </div>

      <div className="mt-8 lg:mt-10">
        <p className="max-w-md text-sm leading-relaxed text-foreground/80">{card.description}</p>

        {card.highlights ? (
          <ul className="mt-5 grid gap-x-6 gap-y-2.5 @md:grid-cols-2">
            {card.highlights.map((highlight) => (
              <li key={highlight} className="flex items-start gap-2 text-xs font-medium text-foreground/60">
                <span aria-hidden className="mt-1.5 size-1 shrink-0 rounded-full bg-primary" />
                {highlight}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </article>
  );
}
