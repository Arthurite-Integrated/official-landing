import {fireEvent, render, screen} from "@testing-library/react";
import {describe, expect, it} from "vitest";

import {ServicesFeatureCompare} from "#/components/layout/services-feature-compare.tsx";
import {CompareCategories, CompareFeatureRows} from "#/components/layout/services-feature-compare-data.ts";

describe("ServicesFeatureCompare", () => {
  it("names the section after its heading", () => {
    render(<ServicesFeatureCompare />);
    expect(screen.getByRole("region", {name: /compare package features/i})).toBeInTheDocument();
  });

  it("renders headers for Starter, Growth, and Enterprise tiers", () => {
    render(<ServicesFeatureCompare />);
    expect(screen.getByRole("columnheader", {name: /starter/i})).toBeInTheDocument();
    expect(screen.getByRole("columnheader", {name: /growth/i})).toBeInTheDocument();
    expect(screen.getByRole("columnheader", {name: /enterprise/i})).toBeInTheDocument();
  });

  it("renders a toggle button for every comparison category", () => {
    render(<ServicesFeatureCompare />);

    for (const category of CompareCategories) {
      expect(screen.getByRole("button", {name: category})).toBeInTheDocument();
    }
  });

  it("filters feature rows when a category toggle button is clicked", () => {
    render(<ServicesFeatureCompare />);

    const devopsButton = screen.getByRole("button", {name: "Infrastructure & DevOps"});
    fireEvent.click(devopsButton);

    const devopsRows = CompareFeatureRows.filter((r) => r.category === "Infrastructure & DevOps");
    for (const row of devopsRows) {
      expect(screen.getByRole("rowheader", {name: row.name})).toBeInTheDocument();
    }

    const secRows = CompareFeatureRows.filter((r) => r.category === "Security & Compliance");
    for (const row of secRows) {
      expect(screen.queryByRole("rowheader", {name: row.name})).not.toBeInTheDocument();
    }
  });

  it("renders SLA and policy bullet notes at the bottom", () => {
    render(<ServicesFeatureCompare />);
    expect(screen.getByText(/all packages include aws well-architected alignment/i)).toBeInTheDocument();
  });
});

describe("CompareFeatureRows Data", () => {
  it("keeps every feature row name unique", () => {
    const names = CompareFeatureRows.map((r) => r.name);
    expect(new Set(names).size).toBe(names.length);
  });
});
