import {Eye, Target, type LucideIcon} from "lucide-react";

export type VisionMissionStatement = {
  readonly extension: string;
  readonly icon: LucideIcon;
  readonly statement: string;
  readonly title: string;
  readonly tone: "primary" | "muted";
};

const STATEMENTS: readonly VisionMissionStatement[] = [
  {
    title: "Mission",
    icon: Target,
    tone: "primary",
    statement:
      "At Arthurite Universal Limited, we strive to be a leading provider of supply chain, consultancy, and engineering solutions, starting in Nigeria and expanding globally.",
    extension:
      "As a subsidiary, Arthurite Integrated extends this vision by delivering AWS cloud solutions to businesses and providing cloud education to equip professionals with in-demand skills.",
  },
  {
    title: "Vision",
    icon: Eye,
    tone: "muted",
    statement:
      "At Arthurite Universal Limited, we aim to procure goods and deliver services sustainably and cost-effectively, ensuring client satisfaction while continuously growing to achieve our global vision.",
    extension:
      "As a subsidiary, Arthurite Integrated extends this vision by empowering businesses with AWS cloud solutions and providing world-class cloud education, driving digital transformation across industries.",
  },
];

export const VisionMissionContent = {
  eyebrow: "What drives us",
  heading: "Our mission and vision",
  statements: STATEMENTS,
} as const;
