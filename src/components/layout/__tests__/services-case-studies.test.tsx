import {render, screen} from "@testing-library/react";
import {describe, expect, it, vi} from "vitest";

import {ServicesCaseStudies} from "#/components/layout/services-case-studies.tsx";
import {ClientCaseStudies} from "#/components/layout/services-case-studies-data.ts";

vi.mock("@tanstack/react-router", async () => {
  const React = await import("react");
  return {
    Link: ({children, className, to}: {readonly children: React.ReactNode; readonly className?: string; readonly to: string}) =>
      React.createElement("a", {className, href: to}, children),
  };
});

describe("ServicesCaseStudies", () => {
  it("names the section after its heading", () => {
    render(<ServicesCaseStudies />);
    expect(screen.getByRole("region", {name: /what our clients say/i})).toBeInTheDocument();
  });

  it("renders a card for every case study", () => {
    render(<ServicesCaseStudies />);
    expect(screen.getAllByRole("article")).toHaveLength(ClientCaseStudies.length);
  });

  it("renders each client quote", () => {
    render(<ServicesCaseStudies />);

    for (const study of ClientCaseStudies) {
      expect(screen.getByText(new RegExp(study.authorName))).toBeInTheDocument();
    }
  });

  it("renders the work with us CTA link", () => {
    render(<ServicesCaseStudies />);
    expect(screen.getByRole("link", {name: /work with us/i})).toBeInTheDocument();
  });
});

describe("ClientCaseStudies Data", () => {
  it("keeps every case study id unique", () => {
    const ids = ClientCaseStudies.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("keeps every author name unique", () => {
    const names = ClientCaseStudies.map((s) => s.authorName);
    expect(new Set(names).size).toBe(names.length);
  });
});
