export type IndustryItem = {
  readonly description: string;
  readonly id: string;
  readonly image: string;
  readonly title: string;
};

export const IndustryItems: readonly IndustryItem[] = [
  {
    description:
      "Cloud systems that support energy monitoring, asset tracking, and data-driven operations across renewable infrastructure and distributed energy networks.",
    id: "renewable-energy",
    image: "/who_we_serve/image 59.png",
    title: "Renewable Energy",
  },
  {
    description:
      "Secure and scalable cloud infrastructure for payments, transactions, and financial data, designed to support compliance, performance, and growth.",
    id: "financial-technology",
    image: "/who_we_serve/image 60.png",
    title: "Financial Technology",
  },
  {
    description:
      "Cloud platforms for connected vehicles, fleet management, and data processing, supporting real-time insights and evolving mobility solutions.",
    id: "automobiles-evs",
    image: "/who_we_serve/image 56.png",
    title: "Automobiles & EVs",
  },
  {
    description:
      "Reliable cloud environments for collaboration, data management, and client delivery, supporting efficient workflows and scalable service operations.",
    id: "consulting-services",
    image: "/who_we_serve/Frame 2147227561.png",
    title: "Consulting Services",
  },
  {
    description:
      "Cloud solutions for managing operational data, asset performance, and field systems, built to handle complex environments across upstream and downstream operations.",
    id: "oil-gas",
    image: "/who_we_serve/image 56 (1).png",
    title: "Oil & Gas",
  },
  {
    description:
      "Secure cloud infrastructure for monitoring systems, data analysis, and controlled access, designed for reliability, privacy, and mission-critical operations.",
    id: "military-surveillance",
    image: "/who_we_serve/image 56 (2).png",
    title: "Military & Surveillance",
  },
];
