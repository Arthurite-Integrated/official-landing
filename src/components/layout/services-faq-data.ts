export type FaqCategory = "All" | "Migration" | "Pricing" | "Security" | "Support";

export type FaqItem = {
  readonly id: string;
  readonly category: Exclude<FaqCategory, "All">;
  readonly question: string;
  readonly answer: string;
};

export const FAQ_CATEGORIES: readonly FaqCategory[] = ["All", "Migration", "Pricing", "Security", "Support"];

export const SERVICES_FAQ_ITEMS: readonly FaqItem[] = [
  {
    id: "faq-migration-duration",
    category: "Migration",
    question: "How long does a typical AWS cloud migration take?",
    answer:
      "Timeline depends on your infrastructure complexity. Initial discovery and AWS Landing Zone setup take 1–2 weeks, while application migration typically ranges from 4 to 12 weeks with zero unplanned downtime.",
  },
  {
    id: "faq-legacy-modernization",
    category: "Migration",
    question: "Can Arthurite assist with legacy workload modernization, not just lift-and-shift?",
    answer:
      "Yes. We specialize in re-architecting legacy monoliths into scalable microservices, containerized workloads (ECS/EKS), and serverless architectures optimized for performance and cost efficiency.",
  },
  {
    id: "faq-billing-model",
    category: "Pricing",
    question: "How are your cloud service packages billed?",
    answer:
      "We offer flexible monthly subscriptions, discounted annual packages (20% savings), and fixed-price milestone billing for enterprise migration projects.",
  },
  {
    id: "faq-aws-infra-costs",
    category: "Pricing",
    question: "Are AWS infrastructure costs included in Arthurite's service fee?",
    answer:
      "AWS infrastructure fees are paid directly to AWS (or via AWS Consolidated Billing). Our service fees cover architecture design, deployment, 24/7 monitoring, security management, and technical support.",
  },
  {
    id: "faq-data-security-ndpr",
    category: "Security",
    question: "How do you ensure data security and local compliance (e.g. NDPR)?",
    answer:
      "We implement AWS Well-Architected Security pillars, end-to-end encryption at rest and in transit, automated IAM policies, and strict compliance frameworks tailored for Nigerian and global regulatory standards.",
  },
  {
    id: "faq-support-slas",
    category: "Support",
    question: "What SLAs and support response times do you guarantee?",
    answer:
      "Our Growth and Enterprise packages feature 24/7 proactive monitoring with a guaranteed 15-minute SLA for critical (P1) infrastructure incidents.",
  },
];
