export type BenefitPillar = {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly iconName: "cloud" | "growth" | "impact";
};

export type RoleCategory = "Engineering" | "Architecture" | "Operations";

export type OpenRole = {
  readonly id: string;
  readonly title: string;
  readonly category: RoleCategory;
  readonly department: string;
  readonly location: string;
  readonly type: string;
};

export const CAREERS_BENEFITS: readonly BenefitPillar[] = [
  {
    id: "benefit-cloud-exp",
    title: "Real Cloud Experience",
    description: "Work on live AWS infrastructure projects with enterprise clients that rely on zero-downtime performance and security.",
    iconName: "cloud",
  },
  {
    id: "benefit-growth",
    title: "Structured Growth",
    description: "Clear career advancement tracks, AWS certification sponsorship, and continuous 1-on-1 mentorship from senior architects.",
    iconName: "growth",
  },
  {
    id: "benefit-impact",
    title: "Meaningful Impact",
    description:
      "Create technology solutions that power critical operations across energy, financial technology, and high-growth startups.",
    iconName: "impact",
  },
];

export const ROLE_CATEGORIES: readonly RoleCategory[] = ["Engineering", "Architecture", "Operations"];

export const ROLE_LOCATIONS: readonly string[] = ["Hybrid / Lagos", "Remote / Hybrid", "Remote"];

export const OPEN_ROLES: readonly OpenRole[] = [
  {
    id: "role-solution-architect",
    title: "Solution Architect",
    category: "Architecture",
    department: "Cloud Architecture",
    location: "Hybrid / Lagos",
    type: "Full-time",
  },
  {
    id: "role-cloud-architect",
    title: "Cloud Infrastructure Architect",
    category: "Architecture",
    department: "Cloud Architecture",
    location: "Remote / Hybrid",
    type: "Full-time",
  },
  {
    id: "role-data-architect",
    title: "Data & Analytics Architect",
    category: "Architecture",
    department: "Data Engineering",
    location: "Hybrid / Lagos",
    type: "Full-time",
  },
  {
    id: "role-devops-engineer",
    title: "Cloud DevOps Engineer",
    category: "Engineering",
    department: "Platform Engineering",
    location: "Remote / Hybrid",
    type: "Full-time",
  },
  {
    id: "role-backend-engineer",
    title: "Backend Engineer (Node.js / Python)",
    category: "Engineering",
    department: "Platform Engineering",
    location: "Remote",
    type: "Full-time",
  },
  {
    id: "role-frontend-engineer",
    title: "Frontend Engineer (React / TypeScript)",
    category: "Engineering",
    department: "Product Engineering",
    location: "Remote / Hybrid",
    type: "Full-time",
  },
  {
    id: "role-fullstack-engineer",
    title: "Full-Stack Cloud Engineer",
    category: "Engineering",
    department: "Product Engineering",
    location: "Hybrid / Lagos",
    type: "Full-time",
  },
  {
    id: "role-cloud-security-specialist",
    title: "Cloud Security Specialist",
    category: "Operations",
    department: "Security & Compliance",
    location: "Hybrid / Lagos",
    type: "Full-time",
  },
  {
    id: "role-sre",
    title: "Site Reliability Engineer",
    category: "Operations",
    department: "Infrastructure Operations",
    location: "Remote / Hybrid",
    type: "Full-time",
  },
  {
    id: "role-cloud-support",
    title: "Cloud Support Engineer",
    category: "Operations",
    department: "Infrastructure Operations",
    location: "Hybrid / Lagos",
    type: "Full-time",
  },
];
