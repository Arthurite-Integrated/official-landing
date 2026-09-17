import {fireEvent, render, screen} from "@testing-library/react";
import {describe, expect, it, vi} from "vitest";

import {ServicesMarketplaceGrid} from "#/components/layout/services-marketplace-grid.tsx";
import {SERVICES_DATA} from "#/lib/services-data.ts";

vi.mock("@tanstack/react-router", async () => {
  const React = await import("react");
  return {
    Link: ({children, className, to}: {readonly children: React.ReactNode; readonly className?: string; readonly to: string}) =>
      React.createElement("a", {className, href: to}, children),
  };
});

describe("ServicesMarketplaceGrid", () => {
  it("renders section title region", () => {
    render(<ServicesMarketplaceGrid />);
    expect(screen.getByRole("region", {name: /our cloud services/i})).toBeInTheDocument();
  });

  it("renders a card for every service in SERVICES_DATA", () => {
    render(<ServicesMarketplaceGrid />);
    for (const service of SERVICES_DATA) {
      expect(screen.getByRole("heading", {name: service.title})).toBeInTheDocument();
      expect(screen.getByAltText(service.title)).toBeInTheDocument();
    }
  });

  it("filters services when typing into search input", () => {
    render(<ServicesMarketplaceGrid />);
    const searchInput = screen.getByPlaceholderText(/search services/i);
    fireEvent.change(searchInput, {target: {value: "security"}});

    expect(screen.getByRole("heading", {name: "Cloud Security"})).toBeInTheDocument();
    expect(screen.queryByRole("heading", {name: "Cloud Migration"})).not.toBeInTheDocument();
  });
});
