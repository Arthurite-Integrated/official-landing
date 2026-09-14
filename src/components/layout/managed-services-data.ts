import appManagement from "#/assets/aws/app-management.svg";
import cloudSecurity from "#/assets/aws/cloud-security.svg";
import costOptimization from "#/assets/aws/cost-optimization.svg";
import managedCloud from "#/assets/aws/managed-cloud.svg";
import managedSupport from "#/assets/aws/managed-support.svg";

export type ManagedService = {
  readonly description: string;
  readonly icon: string;
  readonly name: string;
  readonly slug: string;
};

export const MANAGED_SERVICES: readonly ManagedService[] = [
  {
    description:
      "We handle the day-to-day operation of your cloud environment so your systems stay stable, available, and well-maintained.",
    icon: managedCloud,
    name: "Managed Cloud",
    slug: "managed-cloud",
  },
  {
    description: "Ongoing technical support to resolve issues quickly and keep your infrastructure running without interruptions.",
    icon: managedSupport,
    name: "Managed Support",
    slug: "managed-support",
  },
  {
    description: "Continuous monitoring and enforcement of security across your cloud environment to protect systems and data.",
    icon: cloudSecurity,
    name: "Cloud Security Management",
    slug: "cloud-security",
  },
  {
    description: "We maintain and support your cloud-based applications to ensure consistent performance and reliability.",
    icon: appManagement,
    name: "Application Management",
    slug: "app-management",
  },
  {
    description: "We monitor and refine your cloud usage to reduce waste and ensure you're only paying for what you need.",
    icon: costOptimization,
    name: "AWS Cost Optimization",
    slug: "cost-optimization",
  },
];
