import {Play} from "lucide-react";

import type {Project} from "#/lib/projects.ts";

type ProjectMediaProps = {
  readonly project: Project;
};

export function ProjectMedia({project}: ProjectMediaProps) {
  return (
    <div className="relative">
      <div aria-hidden className="project-media-glow absolute -inset-8 -z-10" />

      <div className="relative aspect-16/10 overflow-hidden rounded-2xl border border-primary/12 bg-primary/6 shadow-[0_24px_60px_-32px_rgba(1,69,14,0.55)]">
        {project.image === null ? (
          <div aria-hidden className="project-media-placeholder grid h-full place-items-center">
            <span className="text-sm font-medium tracking-[0.22em] text-primary/35 uppercase">{project.name}</span>
          </div>
        ) : (
          <img src={project.image} alt={`${project.name} project`} className="h-full w-full object-cover" />
        )}

        {project.videoUrl === null ? null : (
          <a
            href={project.videoUrl}
            target="_blank"
            rel="noreferrer"
            aria-label={`Play the ${project.name} walkthrough`}
            className="absolute inset-0 grid place-items-center transition-colors hover:bg-primary/10"
          >
            <span className="grid size-16 place-items-center rounded-full bg-[#22c55e] text-white shadow-lg transition-transform duration-300 hover:scale-105">
              <Play className="size-6 translate-x-px fill-current" aria-hidden />
            </span>
          </a>
        )}
      </div>
    </div>
  );
}
