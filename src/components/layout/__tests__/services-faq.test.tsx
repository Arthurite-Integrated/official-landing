import {fireEvent, render, screen} from "@testing-library/react";
import {describe, expect, it, vi} from "vitest";

import {ServicesFaq} from "#/components/layout/services-faq.tsx";
import {SERVICES_FAQ_ITEMS} from "#/components/layout/services-faq-data.ts";

vi.mock("@tanstack/react-router", async () => {
  const React = await import("react");
  return {
    Link: ({children, className, to}: {readonly children: React.ReactNode; readonly className?: string; readonly to: string}) =>
      React.createElement("a", {className, href: to}, children),
  };
});

describe("ServicesFaq", () => {
  it("renders section with accessible title region", () => {
    render(<ServicesFaq />);
    expect(screen.getByRole("region", {name: /frequently asked questions/i})).toBeInTheDocument();
  });

  it("renders all initial FAQ questions", () => {
    render(<ServicesFaq />);
    SERVICES_FAQ_ITEMS.slice(0, 3).forEach((item) => {
      expect(screen.getByText(item.question)).toBeInTheDocument();
    });
  });

  it("filters FAQ items when category buttons are clicked", () => {
    render(<ServicesFaq />);
    const migrationTab = screen.getByRole("button", {name: /^migration$/i});
    fireEvent.click(migrationTab);

    const migrationItems = SERVICES_FAQ_ITEMS.filter((item) => item.category === "Migration");
    const nonMigrationItems = SERVICES_FAQ_ITEMS.filter((item) => item.category !== "Migration");

    migrationItems.forEach((item) => {
      expect(screen.getByText(item.question)).toBeInTheDocument();
    });

    nonMigrationItems.forEach((item) => {
      expect(screen.queryByText(item.question)).not.toBeInTheDocument();
    });
  });

  it("toggles item expansion on click", () => {
    render(<ServicesFaq />);
    const firstItem = SERVICES_FAQ_ITEMS[0];
    const trigger = screen.getByRole("button", {name: firstItem.question});
    const answer = screen.getByText(firstItem.answer);

    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(answer).not.toBeVisible();

    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(answer).toBeVisible();

    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(answer).not.toBeVisible();
  });

  it("renders CTA callout link to contact page", () => {
    render(<ServicesFaq />);
    expect(screen.getByRole("heading", {name: /still have questions\?/i})).toBeInTheDocument();
    const ctaLink = screen.getByRole("link", {name: /speak with an aws architect/i});
    expect(ctaLink).toHaveAttribute("href", "/contact");
  });
});
