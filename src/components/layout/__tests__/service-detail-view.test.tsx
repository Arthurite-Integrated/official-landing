import {render, screen} from "@testing-library/react";
import {describe, expect, it, vi} from "vitest";

import {ServiceDetailView} from "#/components/layout/service-detail-view.tsx";
import {SERVICES_DATA} from "#/lib/services-data.ts";

vi.mock("@tanstack/react-router", async () => {
  const React = await import("react");
  return {
    Link: ({children, className, to}: {readonly children: React.ReactNode; readonly className?: string; readonly to: string}) =>
      React.createElement("a", {className, href: to}, children),
  };
});

describe("ServiceDetailView", () => {
  it("renders Service Not Found state when no service is provided", () => {
    render(<ServiceDetailView service={undefined} />);
    expect(screen.getByRole("heading", {name: /service not found/i})).toBeInTheDocument();
  });

  it("renders service details for a valid service", () => {
    const sampleService = SERVICES_DATA[0];
    render(<ServiceDetailView service={sampleService} />);
    expect(screen.getByRole("heading", {name: sampleService.title})).toBeInTheDocument();
    expect(screen.getByText(sampleService.tagline)).toBeInTheDocument();
    expect(screen.getByText(sampleService.description)).toBeInTheDocument();
  });
});
