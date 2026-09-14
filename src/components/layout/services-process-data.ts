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
    gradient: "",
    icon: Compass,
    label: "Discovery & Assessment",
    number: "01",
  },
  {
    description: "We design a cloud architecture that fits your workload, security needs, and expected growth before anything is deployed.",
    gradient: "",
    icon: PencilRuler,
    label: "Architecture & Planning",
    number: "02",
  },
  {
    description: "Your infrastructure is set up or migrated in phases to reduce risk, maintain uptime, and ensure data integrity.",
    gradient: "",
    icon: Wrench,
    label: "Setup & Migration",
    number: "03",
  },
  {
    description: "We test performance, security, and cost efficiency, then fine-tune the environment for stability and scale.",
    gradient: "",
    icon: TestTubes,
    label: "Testing & Optimization",
    number: "04",
  },
  {
    description: "Once live, we monitor systems closely to ensure everything runs smoothly from day one.",
    gradient: "",
    icon: Activity,
    label: "Go-Live & Monitoring",
    number: "05",
  },
  {
    description: "We provide continuous support, updates, and optimization as your business and usage evolve.",
    gradient: "",
    icon: LifeBuoy,
    label: "Ongoing Support & Improvement",
    number: "06",
  },
];
