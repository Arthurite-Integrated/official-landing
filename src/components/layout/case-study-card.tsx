import {cn} from "@/lib/utils";
import {Link} from "@tanstack/react-router";
import {Quote} from "lucide-react";

import type {ClientCaseStudy} from "#/components/layout/services-case-studies-data.ts";

type CaseStudyCardProps = {
  readonly className?: string;
  readonly study: ClientCaseStudy;
};

export function CaseStudyCard({className, study}: CaseStudyCardProps) {
  return (
    <article
      className={cn(
        "group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-foreground/10 bg-[#f2f2f0] p-7 transition-all duration-500 hover:-translate-y-1 hover:border-primary/25 sm:p-8",
        className
      )}
    >
      <Quote className="relative z-10 mb-5 size-7 text-primary/50" aria-hidden />

      <blockquote className="relative z-10 flex-1 text-base leading-relaxed text-foreground/80 sm:text-[1.0625rem]">
        "{study.quote}"
      </blockquote>

      <div className="relative z-10 mt-7">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />

        <div className="mt-5 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-foreground">{study.authorName}</p>
            <p className="text-xs text-foreground/50">
              {study.authorRole}, {study.authorCompany}
            </p>
          </div>

          <Link
            to={study.ctaUrl}
            className="shrink-0 rounded-full border border-foreground/10 bg-foreground/5 px-4 py-2 text-xs font-semibold text-foreground/70 transition-all duration-300 hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
          >
            {study.ctaLabel}
          </Link>
        </div>
      </div>
    </article>
  );
}
