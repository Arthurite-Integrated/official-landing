import {render, screen} from "@testing-library/react";
import {describe, expect, it} from "vitest";

import {WhoWeAreContent} from "#/components/about/who-we-are-content.ts";
import {WhoWeAre} from "#/components/about/who-we-are.tsx";

const {capabilities, closing, lede, subheading} = WhoWeAreContent;

describe("WhoWeAre", () => {
  it("names the section who we are", () => {
    render(<WhoWeAre />);

    expect(screen.getByRole("region", {name: "Who we are"})).toBeInTheDocument();
  });

  it("sums up what we specialise in", () => {
    render(<WhoWeAre />);

    expect(screen.getByText(subheading)).toBeInTheDocument();
  });

  it("introduces the company", () => {
    render(<WhoWeAre />);

    expect(screen.getByText(lede)).toBeInTheDocument();
  });

  it("lists every capability", () => {
    render(<WhoWeAre />);

    expect(screen.getAllByRole("listitem")).toHaveLength(capabilities.length);
  });

  it("titles every capability", () => {
    render(<WhoWeAre />);

    for (const capability of capabilities) {
      expect(screen.getByRole("heading", {level: 3, name: capability.title})).toBeInTheDocument();
    }
  });

  it("describes every capability", () => {
    render(<WhoWeAre />);

    for (const capability of capabilities) {
      expect(screen.getByText(capability.description)).toBeInTheDocument();
    }
  });

  it("closes on what sets us apart", () => {
    render(<WhoWeAre />);

    expect(screen.getByText(closing.statement)).toBeInTheDocument();
  });

  it("leads the closing statement with what we do not do", () => {
    render(<WhoWeAre />);

    expect(screen.getByText(closing.lead)).toBeInTheDocument();
  });

  it("keeps the video out of the accessibility tree", () => {
    const {container} = render(<WhoWeAre />);

    expect(container.querySelector("video")).toHaveAttribute("aria-hidden", "true");
  });
});
