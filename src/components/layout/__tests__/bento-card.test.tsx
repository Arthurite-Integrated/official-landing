import {render, screen} from "@testing-library/react";
import {ShieldCheck} from "lucide-react";
import {describe, expect, it} from "vitest";

import {BentoCard, type BentoCardContent} from "#/components/layout/bento-card.tsx";

const baseCard: BentoCardContent = {
  art: "bg-[#03120b]",
  description: "Security is built into every layer of the cloud environment.",
  icon: ShieldCheck,
  span: "lg:row-span-2",
  title: "Cloud Security",
};

describe("BentoCard", () => {
  it("renders the service title as a heading", () => {
    render(<BentoCard card={baseCard} />);

    expect(screen.getByRole("heading", {name: "Cloud Security"})).toBeInTheDocument();
  });

  it("renders the service description", () => {
    render(<BentoCard card={baseCard} />);

    expect(screen.getByText(baseCard.description)).toBeInTheDocument();
  });

  it("applies the bento span classes to the card", () => {
    render(<BentoCard card={baseCard} />);

    expect(screen.getByRole("article")).toHaveClass("lg:row-span-2");
  });

  it("applies the card artwork classes to the card", () => {
    render(<BentoCard card={baseCard} />);

    expect(screen.getByRole("article")).toHaveClass("bg-[#03120b]");
  });

  it("lists every highlight when highlights are provided", () => {
    render(<BentoCard card={{...baseCard, highlights: ["Identity and access control", "Threat detection"]}} />);

    expect(screen.getAllByRole("listitem")).toHaveLength(2);
  });

  it("omits the highlight list when no highlights are provided", () => {
    render(<BentoCard card={baseCard} />);

    expect(screen.queryByRole("list")).not.toBeInTheDocument();
  });
});
