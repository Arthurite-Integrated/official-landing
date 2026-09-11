import {ProjectFact} from "#/components/layout/project-fact.tsx";
import {ProjectLinks} from "#/components/layout/project-links.tsx";
import {ProjectMedia} from "#/components/layout/project-media.tsx";
import type {Project} from "#/lib/projects.ts";

type ProjectCardProps = {
  readonly project: Project;
};

export function ProjectCard({project}: ProjectCardProps) {
  return (
    <article className="grid gap-10 rounded-[1.75rem] border border-primary/22 bg-white/45 p-6 sm:p-10 lg:grid-cols-2 lg:gap-14 lg:p-12">
      <div className="flex flex-col gap-8">
        <ProjectMedia project={project} />

        <dl className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
          {project.stats.map((stat) => (
            <div key={stat.label}>
              <dt className="text-2xl font-semibold tracking-tight text-primary sm:text-3xl">{stat.value}</dt>
              <dd className="mt-1 text-sm leading-relaxed text-primary/65">{stat.label}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="flex flex-col lg:border-l lg:border-primary/15 lg:pl-14">
        <h3 className="text-3xl font-semibold tracking-tight text-primary sm:text-4xl">{project.name}</h3>
        <p className="mt-5 text-base leading-relaxed text-primary/75">{project.summary}</p>

        <dl className="mt-10 grid gap-2.5 text-sm lg:mt-auto lg:pt-12">
          <ProjectFact label="Year" value={project.year} />
          <ProjectFact label="Project Type" value={project.projectType} />
          <ProjectFact label="Industry" value={project.industry} />
          <ProjectFact label="Duration" value={project.duration} />
        </dl>

        <ProjectLinks project={project} />
      </div>
    </article>
  );
}
