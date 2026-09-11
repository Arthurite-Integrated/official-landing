import {render, screen} from "@testing-library/react";
import {describe, expect, it, vi} from "vitest";

import {HowWeWork} from "#/components/layout/how-we-work.tsx";
import {WorkSteps} from "#/components/layout/work-steps.ts";

vi.mock("@tanstack/react-router", async () => {
  const React = await import("react");

  return {
    Link: ({children, className, to}: {readonly children: React.ReactNode; readonly className?: string; readonly to: string}) =>
      React.createElement("a", {className, href: to}, children),
  };
});

describe("HowWeWork", () => {
  it("names the section after its heading", () => {
    render(<HowWeWork />);

    expect(screen.getByRole("region", {name: /how we work/i})).toBeInTheDocument();
  });

  it("explains the process under the heading", () => {
    render(<HowWeWork />);

    expect(screen.getByText(/our process is simple, practical/i)).toBeInTheDocument();
  });

  it("sends the call to action to the contact page", () => {
    render(<HowWeWork />);

    expect(screen.getByRole("link", {name: /book a free consultation/i})).toHaveAttribute("href", "/contact");
  });

  it("renders a card for every step", () => {
    render(<HowWeWork />);

    expect(screen.getAllByRole("article")).toHaveLength(WorkSteps.length);
  });

  it("titles each card with its step label", () => {
    render(<HowWeWork />);

    for (const step of WorkSteps) {
      expect(screen.getByRole("heading", {name: step.label})).toBeInTheDocument();
    }
  });

  it("shows the summary of every step", () => {
    render(<HowWeWork />);

    for (const step of WorkSteps) {
      expect(screen.getByText(step.summary)).toBeInTheDocument();
    }
  });

  it("keeps the expanded detail of every step in the document", () => {
    render(<HowWeWork />);

    for (const step of WorkSteps) {
      expect(screen.getByText(step.detail)).toBeInTheDocument();
    }
  });
});

describe("WorkSteps", () => {
  it("numbers the steps in order from 01", () => {
    expect(WorkSteps.map((step) => step.number)).toEqual(["01", "02", "03", "04"]);
  });

  it("keeps every step label unique", () => {
    const labels = WorkSteps.map((step) => step.label);

    expect(new Set(labels).size).toBe(labels.length);
  });
});
