import {render, screen} from "@testing-library/react";
import {describe, expect, it, vi} from "vitest";

import {ServicesWhatWeOffer} from "#/components/layout/services-what-we-offer.tsx";
import {ServiceOffers} from "#/components/layout/services-offer-data.ts";

vi.mock("@tanstack/react-router", async () => {
  const React = await import("react");
  return {
    Link: ({children, className, to}: {readonly children: React.ReactNode; readonly className?: string; readonly to: string}) =>
      React.createElement("a", {className, href: to}, children),
  };
});

describe("ServicesWhatWeOffer", () => {
  it("names the section after its heading", () => {
    render(<ServicesWhatWeOffer />);
    expect(screen.getByRole("region", {name: /one partner for the whole cloud lifecycle/i})).toBeInTheDocument();
  });

  it("labels the section with What We Offer kicker", () => {
    render(<ServicesWhatWeOffer />);
    expect(screen.getByText("What We Offer")).toBeInTheDocument();
  });

  it("renders a card for all 8 service offers", () => {
    render(<ServicesWhatWeOffer />);
    expect(screen.getAllByRole("article")).toHaveLength(ServiceOffers.length);
  });

  it("renders each service offer title", () => {
    render(<ServicesWhatWeOffer />);

    for (const offer of ServiceOffers) {
      expect(screen.getByRole("heading", {name: offer.title})).toBeInTheDocument();
    }
  });

  it("provides a CTA button leading to contact", () => {
    render(<ServicesWhatWeOffer />);
    expect(screen.getByRole("link", {name: /book consultation/i})).toHaveAttribute("href", "/contact");
  });
});

describe("ServiceOffers Data", () => {
  it("keeps every service offer title unique", () => {
    const titles = ServiceOffers.map((offer) => offer.title);
    expect(new Set(titles).size).toBe(titles.length);
  });
});
