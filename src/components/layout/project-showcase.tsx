import {useMemo} from "react";
import {useQuery} from "@tanstack/react-query";

import {ProjectCarousel} from "#/components/layout/project-carousel.tsx";
import {DataEmptyState} from "#/components/layout/data-empty-state.tsx";
import {projectsQueryOptions} from "#/lib/api/endpoints.ts";
import {toProjects} from "#/lib/projects.ts";

export function ProjectShowcase() {
  const {data, isPending, isError} = useQuery(projectsQueryOptions());
  const projects = useMemo(() => toProjects(data ?? []), [data]);

  if (isPending) {
    return <div aria-busy="true" aria-label="Loading selected work" className="h-96 animate-pulse rounded-3xl bg-primary/5" />;
  }

  if (isError) {
    return (
      <p role="alert" className="text-base text-primary/60">
        We couldn't load selected work right now. Please try again later.
      </p>
    );
  }

  return projects.length === 0 ? (
    <DataEmptyState title="No projects to show for now" description="Our selected work will appear here as projects are added." />
  ) : (
    <ProjectCarousel projects={projects} />
  );
}
