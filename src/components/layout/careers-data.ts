import type {ApiJob} from "#/lib/api/types.ts";

export type BenefitPillar = {
  readonly id: string;
  readonly number: string;
  readonly title: string;
  readonly description: string;
  readonly iconName: "cloud" | "growth" | "impact";
};

export type OpenRole = {
  readonly id: string;
  readonly title: string;
  readonly category: string;
  readonly department: string;
  readonly location: string;
  readonly description: string;
};

export function toOpenRole(job: ApiJob): OpenRole {
  return {
    id: job.id,
    title: job.title,
    category: job.category,
    department: job.subcategory,
    location: `${job.mode} / ${job.location}`,
    description: job.description,
  };
}

export const CAREERS_BENEFITS: readonly BenefitPillar[] = [
  {
    id: "benefit-cloud-exp",
    number: "01",
    title: "Real Cloud Experience",
    description: "Work on live AWS infrastructure projects with enterprise clients that rely on zero-downtime performance and security.",
    iconName: "cloud",
  },
  {
    id: "benefit-growth",
    number: "02",
    title: "Structured Growth",
    description: "Clear career advancement tracks, AWS certification sponsorship, and continuous 1-on-1 mentorship from senior architects.",
    iconName: "growth",
  },
  {
    id: "benefit-impact",
    number: "03",
    title: "Meaningful Impact",
    description:
      "Create technology solutions that power critical operations across energy, financial technology, and high-growth startups.",
    iconName: "impact",
  },
];
