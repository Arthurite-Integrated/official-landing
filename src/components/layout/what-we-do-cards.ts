import {Boxes, BrainCircuit, Code2, CloudUpload, Gauge, LifeBuoy, ShieldCheck, Sparkles} from "lucide-react";

import type {BentoCardContent} from "#/components/layout/bento-card.tsx";

const WIDE = "sm:col-span-2 lg:col-span-2 lg:row-span-2";
const TALL = "lg:row-span-2";

export const WhatWeDoCards: readonly BentoCardContent[] = [
  {
    art: "bg-[radial-gradient(135%_135%_at_0%_0%,#18a353_0%,#0a5c30_38%,#04160c_100%)]",
    description: "We design cloud systems that handle growth, traffic and change without breaking or becoming expensive to maintain.",
    highlights: ["Well-Architected reviews", "Multi-account landing zones", "High-availability design", "Cost-aware from day one"],
    icon: Boxes,
    span: WIDE,
    title: "Cloud Architecture & Design",
  },
  {
    art: "bg-[radial-gradient(130%_130%_at_100%_0%,#2ec4a6_0%,#0b5545_42%,#04160c_100%)]",
    description: "We move applications, data and workloads to AWS with clear planning and minimal downtime.",
    icon: CloudUpload,
    span: "",
    title: "Cloud Migration",
  },
  {
    art: "bg-[radial-gradient(130%_150%_at_50%_0%,#5db83f_0%,#12561f_42%,#04160c_100%)]",
    description: "We improve performance and cut wasted spend by reviewing and refining how your infrastructure runs.",
    icon: Gauge,
    span: "",
    title: "Cloud Optimization",
  },
  {
    art: "bg-[radial-gradient(130%_130%_at_50%_110%,#1e9e7a_0%,#0a4a33_42%,#04160c_100%)]",
    description: "Security is built into every part of the environment, from access control to data protection.",
    highlights: ["Identity and access control", "Encryption and key management", "Continuous compliance"],
    icon: ShieldCheck,
    span: TALL,
    title: "Cloud Security",
  },
  {
    art: "bg-[radial-gradient(130%_130%_at_15%_105%,#1f9a63_0%,#08492c_44%,#04160c_100%)]",
    description: "We monitor, maintain and support your cloud infrastructure so your team stays focused on building the business.",
    highlights: ["24/7 monitoring", "Patching and backups", "Incident response", "Cost and usage reporting"],
    icon: LifeBuoy,
    span: WIDE,
    title: "Managed Cloud Services",
  },
  {
    art: "bg-[radial-gradient(140%_140%_at_100%_100%,#45c7bb_0%,#0a5148_44%,#04160c_100%)]",
    description: "We integrate AI into your products and workflows in a way that fits the systems you already run.",
    icon: Sparkles,
    span: "",
    title: "AI Services",
  },
  {
    art: "bg-[radial-gradient(140%_140%_at_0%_100%,#58bd7c_0%,#0d5334_44%,#04160c_100%)]",
    description: "We build models that solve real problems, from data preparation to reliable production inference.",
    icon: BrainCircuit,
    span: "lg:col-start-1",
    title: "Machine Learning",
  },
  {
    art: "bg-[radial-gradient(130%_130%_at_100%_0%,#6fe0d6_0%,#0c5f4d_40%,#04160c_100%)]",
    description: "We design and build cloud solutions tailored to your operations, so they fit how you work and support long-term growth.",
    highlights: ["Serverless APIs", "Data platforms", "Internal tools", "Third-party integrations"],
    icon: Code2,
    span: WIDE,
    title: "Custom Solution Development",
  },
];
