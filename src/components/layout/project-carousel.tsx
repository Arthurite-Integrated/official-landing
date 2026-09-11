import {useState} from "react";
import {ChevronLeft, ChevronRight} from "lucide-react";

import {ProjectCard} from "#/components/layout/project-card.tsx";
import {stepIndex} from "#/lib/projects.ts";
import type {Project} from "#/lib/projects.ts";

type ProjectCarouselProps = {
  readonly projects: readonly Project[];
};

function position(index: number): string {
  return String(index + 1).padStart(2, "0");
}

export function ProjectCarousel({projects}: ProjectCarouselProps) {
  const [current, setCurrent] = useState(0);
  const count = projects.length;
  const active = projects[current];
  const solo = count <= 1;

  if (active === undefined) {
    return null;
  }

  return (
    <div className="flex flex-col gap-8">
      <ProjectCard project={active} />

      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold tracking-[0.2em] text-primary/55 tabular-nums">
          {position(current)} / {position(count - 1)}
        </p>

        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Previous project"
            disabled={solo}
            onClick={() => setCurrent((index) => stepIndex(index, -1, count))}
            className="grid size-11 place-items-center rounded-full border border-primary/25 text-primary transition-colors hover:bg-primary/8 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent"
          >
            <ChevronLeft className="size-5" aria-hidden />
          </button>

          <button
            type="button"
            aria-label="Next project"
            disabled={solo}
            onClick={() => setCurrent((index) => stepIndex(index, 1, count))}
            className="grid size-11 place-items-center rounded-full border border-primary/25 text-primary transition-colors hover:bg-primary/8 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent"
          >
            <ChevronRight className="size-5" aria-hidden />
          </button>
        </div>
      </div>
    </div>
  );
}
