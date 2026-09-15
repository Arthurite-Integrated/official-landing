import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {describe, expect, it, vi} from "vitest";

import {EventsFeatured} from "#/components/events/events-featured.tsx";
import {EventsGallery} from "#/components/events/events-gallery.tsx";
import {EventsHero} from "#/components/events/events-hero.tsx";
import {EventsStats} from "#/components/events/events-stats.tsx";
import {EventsTracks} from "#/components/events/events-tracks.tsx";

vi.mock("@tanstack/react-router", async () => {
  const React = await import("react");
  return {
    Link: ({children, className, to}: {readonly children: React.ReactNode; readonly className?: string; readonly to: string}) =>
      React.createElement("a", {className, href: to}, children),
  };
});

describe("EventsHero", () => {
  it("renders main heading, dates, and subtitle", () => {
    render(<EventsHero />);

    expect(screen.getByRole("heading", {level: 1})).toHaveTextContent(/FUTURE TECH/i);
    expect(screen.getByText("September 10-12")).toBeInTheDocument();
    expect(screen.getByText("2026")).toBeInTheDocument();
  });
});

describe("EventsTracks", () => {
  it("renders lead statement, CTA button, and 3 track headings matching card style", () => {
    render(<EventsTracks />);

    expect(screen.getByText(/Bringing together tech enthusiasts, industry leaders, and innovators/i)).toBeInTheDocument();
    expect(screen.getByRole("link", {name: /Get Ticket Now/i})).toHaveAttribute("href", "/contact");

    expect(screen.getByRole("heading", {name: "Robotics and Automation"})).toBeInTheDocument();
    expect(screen.getByRole("heading", {name: "Artificial Intelligence"})).toBeInTheDocument();
    expect(screen.getByRole("heading", {name: "Quantum Computing"})).toBeInTheDocument();
  });
});

describe("EventsStats", () => {
  it("renders key stats items and venue auditorium headline", () => {
    render(<EventsStats />);

    expect(screen.getByRole("region", {name: /Event Highlights & Venue/i})).toBeInTheDocument();
    expect(screen.getByRole("button", {name: "34 SPEAKERS"})).toBeInTheDocument();
    expect(screen.getByRole("button", {name: "80 HOURS"})).toBeInTheDocument();
    expect(screen.getByRole("button", {name: "3 DAYS"})).toBeInTheDocument();
    expect(screen.getByRole("button", {name: "∞ IDEAS"})).toBeInTheDocument();
  });
});

describe("EventsFeatured", () => {
  it("renders featured event title and register action", () => {
    render(<EventsFeatured />);

    expect(screen.getByRole("heading", {name: "Featured Event"})).toBeInTheDocument();
    expect(screen.getByText(/BUILDING SECURE, SCALABLE AI SOLUTIONS WITH AMAZON BEDROCK AGENT CORE/i)).toBeInTheDocument();
  });
});

describe("EventsGallery", () => {
  it("renders masonry photo gallery with search and category filters", async () => {
    const user = userEvent.setup();
    render(<EventsGallery />);

    expect(screen.getByRole("heading", {name: "Event Gallery"})).toBeInTheDocument();
    const searchInput = screen.getByPlaceholderText("Search past events...");
    await user.type(searchInput, "Bedrock");

    expect(screen.getByText("Bedrock Agent Core Masterclass")).toBeInTheDocument();
  });
});
