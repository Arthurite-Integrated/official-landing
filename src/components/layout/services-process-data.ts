import {Activity, Compass, LifeBuoy, PencilRuler, TestTubes, Wrench} from "lucide-react";
import type {LucideIcon} from "lucide-react";

export type ProcessStep = {
  readonly description: string;
  readonly gradient: string;
  readonly icon: LucideIcon;
  readonly label: string;
  readonly number: string;
};

export const ProcessSteps: readonly ProcessStep[] = [
  {
    description:
      "We start by understanding your business goals, existing systems, and technical requirements to define the right cloud approach.",
    gradient: "bg-[radial-gradient(135%_135%_at_0%_0%,#18a353_0%,#0a5c30_38%,#04160c_100%)]",
    icon: Compass,
    label: "Discovery & Assessment",
    number: "01",
  },
  {
    description: "We design a cloud architecture that fits your workload, security needs, and expected growth before anything is deployed.",
    gradient: "bg-[radial-gradient(130%_130%_at_100%_0%,#2ec4a6_0%,#0b5545_42%,#04160c_100%)]",
    icon: PencilRuler,
    label: "Architecture & Planning",
    number: "02",
  },
  {
    description: "Your infrastructure is set up or migrated in phases to reduce risk, maintain uptime, and ensure data integrity.",
    gradient: "bg-[radial-gradient(130%_130%_at_50%_110%,#1e9e7a_0%,#0a4a33_42%,#04160c_100%)]",
    icon: Wrench,
    label: "Setup & Migration",
    number: "03",
  },
  {
    description: "We test performance, security, and cost efficiency, then fine-tune the environment for stability and scale.",
    gradient: "bg-[radial-gradient(140%_140%_at_0%_100%,#45c7bb_0%,#0a5148_44%,#04160c_100%)]",
    icon: TestTubes,
    label: "Testing & Optimization",
    number: "04",
  },
  {
    description: "Once live, we monitor systems closely to ensure everything runs smoothly from day one.",
    gradient: "bg-[radial-gradient(135%_135%_at_100%_100%,#18a353_0%,#0a5c30_40%,#04160c_100%)]",
    icon: Activity,
    label: "Go-Live & Monitoring",
    number: "05",
  },
  {
    description: "We provide continuous support, updates, and optimization as your business and usage evolve.",
    gradient: "bg-[radial-gradient(130%_130%_at_50%_0%,#2ec4a6_0%,#0b5545_42%,#04160c_100%)]",
    icon: LifeBuoy,
    label: "Ongoing Support & Improvement",
    number: "06",
  },
];
