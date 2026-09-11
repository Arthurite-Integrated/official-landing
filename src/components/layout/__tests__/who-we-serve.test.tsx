import {render, screen} from "@testing-library/react";
import {describe, expect, it} from "vitest";

import {WhoWeServe} from "#/components/layout/who-we-serve.tsx";
import {IndustryItems} from "#/components/layout/who-we-serve-data.ts";

describe("WhoWeServe", () => {
  it("names the section after its heading", () => {
    render(<WhoWeServe />);
    expect(screen.getByRole("region", {name: /who we serve/i})).toBeInTheDocument();
  });

  it("labels the section with Who We Serve kicker", () => {
    render(<WhoWeServe />);
    expect(screen.getByText("Who We Serve", {selector: "span"})).toBeInTheDocument();
  });

  it("renders a card for all 6 industry sectors", () => {
    render(<WhoWeServe />);
    expect(screen.getAllByRole("article")).toHaveLength(IndustryItems.length);
  });

  it("renders each industry title and description", () => {
    render(<WhoWeServe />);

    for (const item of IndustryItems) {
      expect(screen.getByRole("heading", {name: item.title})).toBeInTheDocument();
      expect(screen.getByText(item.description)).toBeInTheDocument();
    }
  });

  it("renders an image for each industry with accessible alt text", () => {
    render(<WhoWeServe />);

    for (const item of IndustryItems) {
      expect(screen.getByAltText(item.title)).toBeInTheDocument();
    }
  });
});

describe("IndustryItems Data", () => {
  it("keeps every industry title and id unique", () => {
    const titles = IndustryItems.map((item) => item.title);
    const ids = IndustryItems.map((item) => item.id);

    expect(new Set(titles).size).toBe(titles.length);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
