import projectsFile from "#/content/projects.json";
import {ProjectsSchema} from "#/lib/projects-schema.ts";

export {ProjectsSchema, stepIndex} from "#/lib/projects-schema.ts";
export type {Project, ProjectStat} from "#/lib/projects-schema.ts";

/** Parsed at import time, so a malformed entry in projects.json fails the build instead of the page. */
export const Projects = ProjectsSchema.parse(projectsFile.projects);
