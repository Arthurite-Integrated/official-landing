import {ArrowRight, ExternalLink} from "lucide-react";

import type {Project} from "#/lib/projects.ts";

type ProjectLinksProps = {
  readonly project: Project;
};

export function ProjectLinks({project}: ProjectLinksProps) {
  return (
    <div className="mt-10 flex flex-wrap items-center gap-3">
      {project.caseStudyUrl === null ? null : (
        <a
          href={project.caseStudyUrl}
          target="_blank"
          rel="noreferrer"
          className="group inline-flex items-center gap-2.5 rounded-full bg-primary py-3 pr-3 pl-6 text-sm font-semibold text-primary-bg transition-colors hover:bg-primary/90"
        >
          Read full case study
          <span className="grid size-7 place-items-center rounded-full bg-primary-bg/18 transition-transform duration-300 group-hover:translate-x-0.5">
            <ArrowRight className="size-3.5" aria-hidden />
          </span>
        </a>
      )}

      {project.liveUrl === null ? null : (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-primary/25 px-6 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary/8"
        >
          See it live
          <ExternalLink className="size-3.5" aria-hidden />
        </a>
      )}
    </div>
  );
}
