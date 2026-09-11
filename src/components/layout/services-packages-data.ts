export type ServicePackage = {
  readonly description: string;
  readonly features: readonly string[];
  readonly isPopular?: boolean;
  readonly monthlyPrice: string;
  readonly name: string;
  readonly yearlyPrice: string;
};

export const ServicePackages: readonly ServicePackage[] = [
  {
    description: "Essential cloud foundation for startups and small teams.",
    features: [
      "Multi-account landing zone",
      "Core security & access baseline",
      "Essential monitoring & alert setup",
      "Cost visibility dashboard",
      "8/5 Email & Slack support",
    ],
    monthlyPrice: "$1,500",
    name: "Starter",
    yearlyPrice: "$1,200",
  },
  {
    description: "Comprehensive cloud management for growing applications.",
    features: [
      "Everything in Starter, plus:",
      "Automated CI/CD deployment pipelines",
      "Advanced security & compliance hardening",
      "24/7 monitoring & incident response",
      "Quarterly FinOps cost optimization review",
      "Dedicated Slack channel & priority SLA",
    ],
    isPopular: true,
    monthlyPrice: "$3,500",
    name: "Growth",
    yearlyPrice: "$2,800",
  },
  {
    description: "Tailored infrastructure & dedicated support for enterprise workloads.",
    features: [
      "Everything in Growth, plus:",
      "Dedicated AWS Solutions Architect",
      "Multi-region high availability design",
      "Continuous compliance management",
      "Custom SLA & 15-minute response time",
      "Tailored migration & modernization roadmap",
    ],
    monthlyPrice: "$7,500",
    name: "Enterprise",
    yearlyPrice: "$6,000",
  },
];
