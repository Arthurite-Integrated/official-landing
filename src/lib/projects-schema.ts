import {z} from "zod";

const ProjectStatSchema = z.object({
  label: z.string().min(1),
  value: z.string().min(1),
});

const ProjectSchema = z.object({
  /** Google Drive link to the full write-up. Leave null to hide the button. */
  caseStudyUrl: z.url().nullable(),
  duration: z.string().min(1),
  /** Path under `public/`, e.g. "/projects/swap-os.jpg". Null shows the branded panel instead. */
  image: z.string().min(1).nullable(),
  industry: z.string().min(1),
  liveUrl: z.url().nullable(),
  name: z.string().min(1),
  projectType: z.string().min(1),
  slug: z.string().min(1),
  stats: z.array(ProjectStatSchema).max(4),
  summary: z.string().min(1),
  videoUrl: z.url().nullable(),
  year: z.string().min(1),
});

export const ProjectsSchema = z.array(ProjectSchema).min(1);

export type Project = z.infer<typeof ProjectSchema>;
export type ProjectStat = z.infer<typeof ProjectStatSchema>;

export function stepIndex(current: number, delta: number, count: number): number {
  return (((current + delta) % count) + count) % count;
}
