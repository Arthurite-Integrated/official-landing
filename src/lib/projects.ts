import type {ApiProject} from "#/lib/api/types.ts";
import {ProjectsSchema} from "#/lib/projects-schema.ts";

export {ProjectsSchema, stepIndex} from "#/lib/projects-schema.ts";
export type {Project, ProjectStat} from "#/lib/projects-schema.ts";

export function toProjects(items: readonly ApiProject[]) {
  return ProjectsSchema.parse(
    [...items]
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .map((project) => ({
        caseStudyUrl: project.caseStudyUrl ?? null,
        duration: project.duration,
        image: project.coverImage ?? null,
        industry: project.industry,
        liveUrl: project.liveUrl ?? null,
        name: project.name,
        projectType: project.projectType,
        slug: project.slug,
        stats: project.stats ?? [],
        summary: project.summary,
        videoUrl: project.videoUrl ?? null,
        year: project.year,
      }))
  );
}
