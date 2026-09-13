import {fireEvent, render, screen} from "@testing-library/react";
import {describe, expect, it} from "vitest";

import {MANAGED_SERVICES} from "#/components/layout/managed-services-data.ts";
import {ManagedServices} from "#/components/layout/managed-services.tsx";

describe("ManagedServices", () => {
  it("names the section after its heading", () => {
    render(<ManagedServices />);

    expect(screen.getByRole("region", {name: /managed services/i})).toBeInTheDocument();
  });

  it("introduces managed services under the heading", () => {
    render(<ManagedServices />);

    expect(screen.getByText(/we handle the day-to-day operations of your cloud/i)).toBeInTheDocument();
  });

  it("renders a card button for every managed service", () => {
    render(<ManagedServices />);

    for (const service of MANAGED_SERVICES) {
      expect(screen.getByRole("button", {name: new RegExp(service.name, "i")})).toBeInTheDocument();
    }
  });

  it("marks the first managed service as pressed/active initially", () => {
    render(<ManagedServices />);

    expect(screen.getByRole("button", {name: new RegExp(MANAGED_SERVICES[0].name, "i")})).toHaveAttribute("aria-pressed", "true");
  });

  it("leaves other service cards unpressed initially", () => {
    render(<ManagedServices />);

    expect(screen.getByRole("button", {name: new RegExp(MANAGED_SERVICES[1].name, "i")})).toHaveAttribute("aria-pressed", "false");
  });

  it("updates active card state when clicked", () => {
    render(<ManagedServices />);

    const secondCard = screen.getByRole("button", {name: new RegExp(MANAGED_SERVICES[1].name, "i")});
    fireEvent.click(secondCard);

    expect(secondCard).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("button", {name: new RegExp(MANAGED_SERVICES[0].name, "i")})).toHaveAttribute("aria-pressed", "false");
  });

  it("renders scroll navigation buttons on mobile", () => {
    render(<ManagedServices />);

    expect(screen.getByRole("button", {name: /scroll left/i})).toBeInTheDocument();
    expect(screen.getByRole("button", {name: /scroll right/i})).toBeInTheDocument();
  });
});

describe("MANAGED_SERVICES Data", () => {
  it("keeps every managed service name unique", () => {
    const names = MANAGED_SERVICES.map((service) => service.name);

    expect(new Set(names).size).toBe(names.length);
  });

  it("keeps every managed service slug unique", () => {
    const slugs = MANAGED_SERVICES.map((service) => service.slug);

    expect(new Set(slugs).size).toBe(slugs.length);
  });
});
