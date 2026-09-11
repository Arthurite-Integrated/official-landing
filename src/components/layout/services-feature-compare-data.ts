export type FeatureRow = {
  readonly category: string;
  readonly enterprise: boolean | string;
  readonly growth: boolean | string;
  readonly name: string;
  readonly starter: boolean | string;
};

export const CompareCategories = ["All Features", "Infrastructure & DevOps", "Security & Compliance", "Support & SLA"] as const;

export type CompareCategory = (typeof CompareCategories)[number];

export const CompareFeatureRows: readonly FeatureRow[] = [
  {
    category: "Infrastructure & DevOps",
    enterprise: "Multi-Region / Custom",
    growth: "Multi-Account AWS",
    name: "AWS Architecture Setup",
    starter: "Single Region AWS",
  },
  {
    category: "Infrastructure & DevOps",
    enterprise: true,
    growth: true,
    name: "Automated CI/CD Pipelines",
    starter: false,
  },
  {
    category: "Infrastructure & DevOps",
    enterprise: true,
    growth: true,
    name: "Infrastructure as Code (Terraform/CDK)",
    starter: true,
  },
  {
    category: "Security & Compliance",
    enterprise: true,
    growth: true,
    name: "Security & IAM Access Baseline",
    starter: true,
  },
  {
    category: "Security & Compliance",
    enterprise: true,
    growth: true,
    name: "Continuous Vulnerability Scanning",
    starter: false,
  },
  {
    category: "Security & Compliance",
    enterprise: "SOC2 / ISO / HIPAA",
    growth: "Baseline Hardening",
    name: "Compliance Alignment",
    starter: "Basic Baseline",
  },
  {
    category: "Support & SLA",
    enterprise: "15-Min Response",
    growth: "1-Hour Response",
    name: "Incident Response Time",
    starter: "4-Hour Response",
  },
  {
    category: "Support & SLA",
    enterprise: "24/7 Dedicated Team",
    growth: "24/7 Active Monitoring",
    name: "Monitoring & Coverage",
    starter: "8/5 Business Hours",
  },
  {
    category: "Support & SLA",
    enterprise: "Dedicated Architect",
    growth: "FinOps Monthly",
    name: "FinOps & Cost Reviews",
    starter: "Dashboard Only",
  },
  {
    category: "Support & SLA",
    enterprise: "Dedicated Slack & Phone",
    growth: "Shared Slack Channel",
    name: "Support Channels",
    starter: "Email & Helpdesk",
  },
];
