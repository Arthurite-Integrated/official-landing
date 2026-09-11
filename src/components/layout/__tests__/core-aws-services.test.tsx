import {fireEvent, render, screen} from "@testing-library/react";
import {describe, expect, it, vi} from "vitest";

import {AwsServices} from "#/components/layout/aws-services.ts";
import {CoreAwsServices} from "#/components/layout/core-aws-services.tsx";

describe("CoreAwsServices", () => {
  it("names the section after its heading", () => {
    render(<CoreAwsServices />);

    expect(screen.getByRole("region", {name: /our core aws services/i})).toBeInTheDocument();
  });

  it("introduces the services under the heading", () => {
    render(<CoreAwsServices />);

    expect(screen.getByText(/we deliver essential aws services/i)).toBeInTheDocument();
  });

  it("offers a control for every service", () => {
    render(<CoreAwsServices />);

    expect(screen.getAllByRole("button")).toHaveLength(AwsServices.length);
  });

  it("names each control after its service", () => {
    render(<CoreAwsServices />);

    for (const service of AwsServices) {
      expect(screen.getByRole("button", {name: service.name})).toBeInTheDocument();
    }
  });

  it("marks the first service as current before any scrolling", () => {
    render(<CoreAwsServices />);

    expect(screen.getByRole("button", {name: AwsServices[0].name})).toHaveAttribute("aria-current", "true");
  });

  it("leaves the other services unmarked", () => {
    render(<CoreAwsServices />);

    expect(screen.getByRole("button", {name: AwsServices[1].name})).not.toHaveAttribute("aria-current");
  });

  it("scrolls a service into view when its control is pressed", () => {
    const scrollIntoView = vi.fn();
    Element.prototype.scrollIntoView = scrollIntoView;

    render(<CoreAwsServices />);
    fireEvent.click(screen.getByRole("button", {name: AwsServices[2].name}));

    expect(scrollIntoView).toHaveBeenCalledWith({behavior: "smooth", block: "center"});
  });

  it("shows the description of every service", () => {
    render(<CoreAwsServices />);

    for (const service of AwsServices) {
      expect(screen.getAllByText(service.description).length).toBeGreaterThan(0);
    }
  });

  it("shows the active service logo inside the card", () => {
    const {container} = render(<CoreAwsServices />);
    const card = container.querySelector('[data-slot="aws-service-card"]');

    expect(card?.querySelector("img")).toHaveAttribute("alt", AwsServices[0].name);
  });

  it("shows the active description under the card", () => {
    const {container} = render(<CoreAwsServices />);
    const panel = container.querySelector('[data-slot="aws-service-panel"]');

    expect(panel?.textContent).toContain(AwsServices[0].description);
  });

  it("paints a backdrop for every service", () => {
    const {container} = render(<CoreAwsServices />);

    expect(container.querySelectorAll('[data-slot="aws-backdrop"]')).toHaveLength(AwsServices.length);
  });

  it("shows the official icon of every service", () => {
    render(<CoreAwsServices />);

    for (const service of AwsServices) {
      expect(screen.getAllByRole("img", {name: service.name}).length).toBeGreaterThan(0);
    }
  });
});

describe("AwsServices", () => {
  it("keeps every service name unique", () => {
    const names = AwsServices.map((service) => service.name);

    expect(new Set(names).size).toBe(names.length);
  });

  it("gives every service a slug that keys its backdrop colour", () => {
    const slugs = AwsServices.map((service) => service.slug);

    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("places every backdrop logo differently", () => {
    const spots = AwsServices.map((service) => service.spot);

    expect(new Set(spots).size).toBe(spots.length);
  });
});
