import {fireEvent, render, screen} from "@testing-library/react";
import {describe, expect, it, vi} from "vitest";

import {ServicesPackages} from "#/components/layout/services-packages.tsx";
import {ServicePackages} from "#/components/layout/services-packages-data.ts";

vi.mock("@tanstack/react-router", async () => {
  const React = await import("react");
  return {
    Link: ({children, className, to}: {readonly children: React.ReactNode; readonly className?: string; readonly to: string}) =>
      React.createElement("a", {className, href: to}, children),
  };
});

describe("ServicesPackages", () => {
  it("names the section after its heading", () => {
    render(<ServicesPackages />);
    expect(screen.getByRole("region", {name: /plans & pricing/i})).toBeInTheDocument();
  });

  it("renders a card for all three packages", () => {
    render(<ServicesPackages />);
    expect(screen.getAllByRole("article")).toHaveLength(ServicePackages.length);
  });

  it("displays monthly prices by default", () => {
    render(<ServicesPackages />);
    expect(screen.getByText("$1,500")).toBeInTheDocument();
    expect(screen.getByText("$3,500")).toBeInTheDocument();
    expect(screen.getByText("$7,500")).toBeInTheDocument();
  });

  it("updates prices when yearly billing toggle is selected", () => {
    render(<ServicesPackages />);
    const yearlyButton = screen.getByRole("button", {name: "Yearly"});
    fireEvent.click(yearlyButton);

    expect(screen.getByText("$1,200")).toBeInTheDocument();
    expect(screen.getByText("$2,800")).toBeInTheDocument();
    expect(screen.getByText("$6,000")).toBeInTheDocument();
  });

  it("highlights the Growth package as most popular", () => {
    render(<ServicesPackages />);
    expect(screen.getByText("Most Popular")).toBeInTheDocument();
  });

  it("renders feature lists for each package", () => {
    render(<ServicesPackages />);
    expect(screen.getByText("Multi-account landing zone")).toBeInTheDocument();
    expect(screen.getByText("Automated CI/CD deployment pipelines")).toBeInTheDocument();
    expect(screen.getByText("Dedicated AWS Solutions Architect")).toBeInTheDocument();
  });
});
