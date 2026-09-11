import {render, screen} from "@testing-library/react";
import {describe, expect, it, vi} from "vitest";

import {ServicesProcess} from "#/components/layout/services-process.tsx";
import {ProcessSteps} from "#/components/layout/services-process-data.ts";

vi.mock("@tanstack/react-router", async () => {
  const React = await import("react");
  return {
    Link: ({children, className, to}: {readonly children: React.ReactNode; readonly className?: string; readonly to: string}) =>
      React.createElement("a", {className, href: to}, children),
  };
});

describe("ServicesProcess", () => {
  it("names the section after its heading", () => {
    render(<ServicesProcess />);
    expect(screen.getByRole("region", {name: /implementation process/i})).toBeInTheDocument();
  });

  it("renders the correct subheading", () => {
    render(<ServicesProcess />);
    expect(
      screen.getByText("A clear, structured approach that takes your cloud project from planning to production with no guesswork.")
    ).toBeInTheDocument();
  });

  it("renders a card for every process step", () => {
    render(<ServicesProcess />);
    expect(screen.getAllByRole("article")).toHaveLength(ProcessSteps.length);
  });

  it("renders each step number and label", () => {
    render(<ServicesProcess />);

    for (const step of ProcessSteps) {
      expect(screen.getByText(step.number)).toBeInTheDocument();
      expect(screen.getByRole("heading", {name: step.label})).toBeInTheDocument();
    }
  });

  it("renders the consultation CTA link", () => {
    render(<ServicesProcess />);
    expect(screen.getByRole("link", {name: /book a free consultation/i})).toBeInTheDocument();
  });
});

describe("ProcessSteps Data", () => {
  it("keeps every step number unique", () => {
    const numbers = ProcessSteps.map((s) => s.number);
    expect(new Set(numbers).size).toBe(numbers.length);
  });

  it("keeps every step label unique", () => {
    const labels = ProcessSteps.map((s) => s.label);
    expect(new Set(labels).size).toBe(labels.length);
  });
});
