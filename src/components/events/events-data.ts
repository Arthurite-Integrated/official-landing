export interface EventInfo {
  readonly dates: string;
  readonly tagline: string;
  readonly location: string;
  readonly title: string;
  readonly subtitle: string;
  readonly introText: string;
  readonly ctaText: string;
  readonly ctaLink: string;
}

export interface EventTrack {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly iconType: "robotics" | "ai" | "quantum";
}

export interface EventStat {
  readonly value: string;
  readonly label: string;
  readonly highlight?: boolean;
}

export interface EventItem {
  readonly id: string;
  readonly slug: string;
  readonly title: string;
  readonly description: string;
  readonly date: string;
  readonly location: string;
  readonly category: string;
  readonly badge?: string;
  readonly imageSrc?: string;
  readonly fullContent?: string;
  readonly keyTakeaways?: readonly string[];
}

export interface GalleryPhoto {
  readonly id: string;
  readonly title: string;
  readonly category: "GenAI" | "AWS Cloud" | "Workshops" | "Community";
  readonly date: string;
  readonly imageSrc: string;
  readonly aspectClass: string;
}

export const EVENT_INFO: EventInfo = {
  dates: "September 10-12",
  tagline: "The latest advancements and future breakthroughs",
  location: "Lagos Nigeria",
  title: "FUTURE TECH",
  subtitle: "2026",
  introText: "Bringing together tech enthusiasts, industry leaders, and innovators to explore the future of technology",
  ctaText: "Get Ticket Now",
  ctaLink: "/contact",
};

export const EVENT_TRACKS: readonly EventTrack[] = [
  {
    id: "robotics",
    title: "Robotics and Automation",
    description:
      "Involve the use of intelligent machines to perform tasks, enhancing efficiency and precision across industries like manufacturing, healthcare, and logistics.",
    iconType: "robotics",
  },
  {
    id: "ai",
    title: "Artificial Intelligence",
    description:
      "Encompasses machines' ability to simulate human intelligence, enabling automation, data analysis, and autonomous decision-making across various applications from healthcare to finance.",
    iconType: "ai",
  },
  {
    id: "quantum",
    title: "Quantum Computing",
    description:
      "Harnesses quantum mechanics to process information exponentially faster than classical computers and solving complex problems across fields like cryptography, material science, and optimization algorithms.",
    iconType: "quantum",
  },
];

export const EVENT_STATS: readonly EventStat[] = [
  {value: "34", label: "SPEAKERS"},
  {value: "80", label: "HOURS", highlight: true},
  {value: "3", label: "DAYS"},
  {value: "∞", label: "IDEAS"},
];

export const FEATURED_EVENTS: readonly EventItem[] = [
  {
    id: "bedrock-agent-core",
    slug: "bedrock-agent-core",
    title: "BUILDING SECURE, SCALABLE AI SOLUTIONS WITH AMAZON BEDROCK AGENT CORE.",
    description:
      "Discover how Amazon Bedrock Agent Core enables enterprises to deploy production-ready AI agents with custom knowledge bases and strict security controls.",
    date: "Date: Oct 24, 2026 - 10:00 AM",
    location: "Location: Victoria Island, Lagos & Hybrid",
    category: "GenAI & Autonomous Agents",
    badge: "AI EVENT",
    imageSrc: "/services/real_ai.jpg",
    fullContent:
      "Join senior AWS architects and AI engineers for an intensive session on building production-grade autonomous agents. Learn how Amazon Bedrock Agent Core provides deterministic execution guardrails, real-time memory retrieval, and seamless enterprise tool orchestration without compromising corporate data privacy.",
    keyTakeaways: [
      "Architecting production-ready agents using Bedrock Agent Core",
      "Retrieval-Augmented Generation (RAG) with vector databases",
      "Enterprise security, IAM scoping, and data protection",
      "Real-world case studies from African cloud deployments",
    ],
  },
  {
    id: "next-gen-intelligence-summit",
    slug: "next-gen-intelligence-summit",
    title: "NEXT-GEN INTELLIGENCE & CLOUD AUTOMATION SUMMIT",
    description:
      "Explore the frontier of cloud-native AI pipelines, real-time predictive analytics, and automated MLOps for enterprise scale.",
    date: "Date: Nov 12, 2026 - 09:30 AM",
    location: "Location: Eko Convention Centre, Lagos",
    category: "Next-Gen Intelligence",
    badge: "NEXT-GEN INTELLIGENCE",
    imageSrc: "/services/real_ml.jpg",
    fullContent:
      "Experience live demonstrations of automated feature stores, Amazon SageMaker pipelines, and serverless AI orchestration. Industry leaders will reveal how next-gen intelligence automates complex business decisions and reduces operational latency.",
    keyTakeaways: [
      "End-to-end MLOps pipeline automation on AWS",
      "Real-time streaming data inference architectures",
      "Cost-optimizing GPU compute workloads for GenAI",
      "Integrating predictive analytics into legacy ERP systems",
    ],
  },
  {
    id: "cloud-tax-filing-compliance",
    slug: "cloud-tax-filing-compliance",
    title: "AUTOMATED CLOUD TAX FILING & COMPLIANCE FOR ENTERPRISES",
    description:
      "Master automated enterprise tax computation, real-time audit reporting, and multi-region tax compliance pipelines built natively on AWS.",
    date: "Date: Dec 05, 2026 - 11:00 AM",
    location: "Location: Financial District, Abuja & Hybrid",
    category: "Tax & Compliance",
    badge: "TAX FILING EVENT",
    imageSrc: "/services/real_sec.jpg",
    fullContent:
      "Navigating tax compliance across multiple jurisdictions requires precision, security, and automation. This workshop demonstrates how to build serverless tax calculation engines, immutable audit trails, and automated regulatory reporting pipelines on AWS.",
    keyTakeaways: [
      "Automating multi-currency tax calculation engines on AWS",
      "Immutable audit logging using AWS KMS and CloudTrail",
      "Filing automation for regulatory authorities",
      "Zero-trust data encryption for corporate financial records",
    ],
  },
];

export function getEventBySlug(slug: string): EventItem | undefined {
  return FEATURED_EVENTS.find((evt) => evt.slug === slug);
}

export const UPCOMING_EVENTS: readonly EventItem[] = FEATURED_EVENTS;

export const GALLERY_CATEGORIES = ["All", "GenAI", "AWS Cloud", "Workshops", "Community"] as const;

export const GALLERY_PHOTOS: readonly GalleryPhoto[] = [
  {
    id: "g1",
    title: "Bedrock Agent Core Masterclass",
    category: "GenAI",
    date: "Oct 2025",
    imageSrc: "/services/emerald_ai.png",
    aspectClass: "aspect-[4/3]",
  },
  {
    id: "g2",
    title: "AWS Cloud Architecture Summit",
    category: "AWS Cloud",
    date: "Aug 2025",
    imageSrc: "/services/emerald_arch.png",
    aspectClass: "aspect-[3/4]",
  },
  {
    id: "g3",
    title: "DevOps & IaC Hands-on Lab",
    category: "Workshops",
    date: "Jul 2025",
    imageSrc: "/services/emerald_mig.png",
    aspectClass: "aspect-square",
  },
  {
    id: "g4",
    title: "Lagos Cloud Innovators Meetup",
    category: "Community",
    date: "May 2025",
    imageSrc: "/services/emerald_sec.png",
    aspectClass: "aspect-[16/9]",
  },
  {
    id: "g5",
    title: "GenAI Hackathon & Showcase",
    category: "GenAI",
    date: "Mar 2025",
    imageSrc: "/services/real_ai.jpg",
    aspectClass: "aspect-[4/5]",
  },
  {
    id: "g6",
    title: "Cloud Security & Compliance Panel",
    category: "AWS Cloud",
    date: "Jan 2025",
    imageSrc: "/services/real_sec.jpg",
    aspectClass: "aspect-[4/3]",
  },
  {
    id: "g7",
    title: "Serverless Microservices Workshop",
    category: "Workshops",
    date: "Nov 2024",
    imageSrc: "/services/real_ml.jpg",
    aspectClass: "aspect-[3/4]",
  },
  {
    id: "g8",
    title: "Arthurite Annual Tech Roundtable",
    category: "Community",
    date: "Sep 2024",
    imageSrc: "/services/real_arch.jpg",
    aspectClass: "aspect-square",
  },
  {
    id: "g9",
    title: "AWS Cost Optimization Summit",
    category: "AWS Cloud",
    date: "Jul 2024",
    imageSrc: "/services/emerald_opt.png",
    aspectClass: "aspect-[16/9]",
  },
];

export const CTA_CONTENT = {
  title: "Want to get deeper into cloud topics?",
  buttonText: "Explore Blog",
  buttonLink: "/blog",
};

export * from "#/components/events/events-agenda-data.ts";
