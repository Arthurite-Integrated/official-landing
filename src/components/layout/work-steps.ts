import {Compass, LifeBuoy, PencilRuler, Wrench} from "lucide-react";
import type {LucideIcon} from "lucide-react";

export type WorkStep = {
  readonly art: string;
  readonly detail: string;
  readonly icon: LucideIcon;
  readonly label: string;
  readonly number: string;
  readonly summary: string;
};

export const WorkSteps: readonly WorkStep[] = [
  {
    art: "bg-[radial-gradient(135%_135%_at_0%_0%,#18a353_0%,#0a5c30_38%,#04160c_100%)]",
    detail: "We map what you already run — applications, data, spend and constraints — before proposing anything.",
    icon: Compass,
    label: "Understand",
    number: "01",
    summary: "We understand your business and current setup.",
  },
  {
    art: "bg-[radial-gradient(130%_130%_at_100%_0%,#2ec4a6_0%,#0b5545_42%,#04160c_100%)]",
    detail: "An architecture matched to your workload, budget and team, agreed with you before anything is built.",
    icon: PencilRuler,
    label: "Design",
    number: "02",
    summary: "We design the right cloud approach for your needs.",
  },
  {
    art: "bg-[radial-gradient(130%_130%_at_50%_110%,#1e9e7a_0%,#0a4a33_42%,#04160c_100%)]",
    detail: "Landing zones, migrations and modernisation delivered in planned stages with minimal downtime.",
    icon: Wrench,
    label: "Build",
    number: "03",
    summary: "We build, migrate, or improve your infrastructure.",
  },
  {
    art: "bg-[radial-gradient(140%_140%_at_100%_100%,#45c7bb_0%,#0a5148_44%,#04160c_100%)]",
    detail: "Monitoring, patching, incident response and cost reviews that keep the platform healthy long after launch.",
    icon: LifeBuoy,
    label: "Support",
    number: "04",
    summary: "We support and optimize over time.",
  },
];
