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
        "group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-7 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_4px_32px_rgba(0,0,0,0.35)] backdrop-blur-2xl transition-all duration-500 hover:-translate-y-1 hover:border-emerald-400/25 hover:bg-white/[0.07] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_8px_48px_rgba(0,0,0,0.45),0_0_32px_rgba(16,185,129,0.08)] sm:p-8",
        className
      )}
    >
      {/* frost texture grain */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-3xl opacity-[0.025] [background-image:url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22300%22 height=%22300%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22300%22 height=%22300%22 filter=%22url(%23n)%22/%3E%3C/svg%3E')]"
      />

      {/* ambient glow orb */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-12 -top-12 size-40 rounded-full bg-emerald-400/10 blur-2xl transition-all duration-700 group-hover:bg-emerald-400/18"
      />

      <Quote className="relative z-10 mb-5 size-7 text-emerald-400/50" aria-hidden />

      <blockquote className="relative z-10 flex-1 text-base leading-relaxed text-white/80 sm:text-[1.0625rem]">"{study.quote}"</blockquote>

      <div className="relative z-10 mt-7">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/12 to-transparent" />

        <div className="mt-5 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-white/90">{study.authorName}</p>
            <p className="text-xs text-white/40">
              {study.authorRole}, {study.authorCompany}
            </p>
          </div>

          <Link
            to={study.ctaUrl}
            className="shrink-0 rounded-full border border-white/12 bg-white/6 px-4 py-2 text-xs font-semibold text-white/70 backdrop-blur-md transition-all duration-300 hover:border-emerald-400/35 hover:bg-emerald-500/10 hover:text-emerald-300"
          >
            {study.ctaLabel}
          </Link>
        </div>
      </div>
    </article>
  );
}
