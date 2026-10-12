import aiMl from "#/assets/aws/ai-machine-learning.svg";
import analytics from "#/assets/aws/analytics.svg";
import appIntegration from "#/assets/aws/application-integration.svg";
import compute from "#/assets/aws/compute.svg";
import containers from "#/assets/aws/containers.svg";
import databases from "#/assets/aws/databases.svg";
import devops from "#/assets/aws/devops.svg";
import networking from "#/assets/aws/networking.svg";
import security from "#/assets/aws/security.svg";
import serverless from "#/assets/aws/serverless.svg";
import storage from "#/assets/aws/storage.svg";

export type AwsService = {
  readonly description: string;
  readonly icon: string;
  readonly name: string;
  /** Keys the accent colour taken from the official icon (see styles.css). */
  readonly slug: string;
  /** Where the oversized logo sits in the backdrop, so each service reads differently. */
  readonly spot: string;
};

export const AwsServices: readonly AwsService[] = [
  {
    description:
      "Provision scalable, high-performance computing capacity tailored to your workloads, from elastic virtual machines to high-throughput compute clusters that automatically scale with demand.",
    icon: compute,
    name: "Compute",
    slug: "compute",
    spot: "-top-[14%] -right-[12%] h-[128%]",
  },
  {
    description:
      "Deploy secure, cost-effective, and highly durable object, block, and file storage architectures designed for instant availability, automated lifecycle tiers, and enterprise backup.",
    icon: storage,
    name: "Storage",
    slug: "storage",
    spot: "-bottom-[18%] -right-[16%] h-[120%]",
  },
  {
    description:
      "Architect managed relational, NoSQL, and in-memory database engines with automatic failover, continuous backups, and multi-region replication for mission-critical reliability.",
    icon: databases,
    name: "Databases",
    slug: "databases",
    spot: "-top-[10%] -right-[6%] h-[134%]",
  },
  {
    description:
      "Build robust, low-latency cloud networks with isolated virtual clouds, hybrid VPN connections, dedicated interconnects, and global content delivery acceleration.",
    icon: networking,
    name: "Networking",
    slug: "networking",
    spot: "-bottom-[12%] -right-[22%] h-[140%]",
  },
  {
    description:
      "Safeguard your cloud perimeter with identity and access controls, continuous compliance monitoring, automated vulnerability scanning, and granular data encryption.",
    icon: security,
    name: "Security",
    slug: "security",
    spot: "-top-[4%] -right-[8%] h-[116%]",
  },
  {
    description:
      "Accelerate innovation with predictive analytics, generative AI foundation models, intelligent chatbots, and end-to-end machine learning workflows built for enterprise production.",
    icon: aiMl,
    name: "AI & Machine Learning",
    slug: "ai-machine-learning",
    spot: "-top-[20%] -right-[2%] h-[146%]",
  },
  {
    description:
      "Transform raw business data into actionable real-time insights with high-speed querying, centralized data lakes, and automated visual dashboards for faster decisions.",
    icon: analytics,
    name: "Analytics",
    slug: "analytics",
    spot: "-bottom-[16%] -right-[10%] h-[124%]",
  },
  {
    description:
      "Package, deploy, and manage microservices with resilient container orchestration, standardizing application environments for rapid, zero-downtime releases.",
    icon: containers,
    name: "Containers",
    slug: "containers",
    spot: "-top-[16%] -right-[18%] h-[130%]",
  },
  {
    description:
      "Execute event-driven code and microservices without provisioning or managing servers, cutting operational overhead while paying only for compute time consumed.",
    icon: serverless,
    name: "Serverless",
    slug: "serverless",
    spot: "-bottom-[8%] -right-[14%] h-[138%]",
  },
  {
    description:
      "Streamline delivery pipelines with continuous integration, automated deployment, infrastructure as code, and proactive monitoring that speeds up release cycles safely.",
    icon: devops,
    name: "DevOps",
    slug: "devops",
    spot: "-top-[8%] -right-[24%] h-[122%]",
  },
  {
    description:
      "Connect disparate systems, decouple microservices, and orchestrate complex business workflows using managed message queues, event buses, and asynchronous APIs.",
    icon: appIntegration,
    name: "Application Integration",
    slug: "application-integration",
    spot: "-bottom-[22%] -right-[4%] h-[144%]",
  },
];
