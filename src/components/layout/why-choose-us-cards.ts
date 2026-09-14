import {Brain, Cloud, ShieldCheck, TrendingUp} from "lucide-react";
import type {LucideIcon} from "lucide-react";

export type WhyUsCard = {
  readonly description: string;
  readonly icon: LucideIcon;
  readonly title: string;
};

export const WhyChooseUsCards: readonly WhyUsCard[] = [
  {
    icon: Cloud,
    title: "Cloud Done Right",
    description: "We take a structured, thoughtful approach to cloud architecture and delivery.",
  },
  {
    icon: ShieldCheck,
    title: "Verified AWS Capability",
    description: "Our AWS partnership reflects proven experience and alignment with industry standards.",
  },
  {
    icon: Brain,
    title: "GenAI That Works in Production",
    description:
      "We build generative AI systems that go beyond demos, designed to run reliably and deliver measurable value in real use cases.",
  },
  {
    icon: TrendingUp,
    title: "Infrastructure That Grows With You",
    description: "Systems are designed to scale as your business evolves.",
  },
];
