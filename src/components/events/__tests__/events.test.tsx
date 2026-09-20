import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {describe, expect, it, vi} from "vitest";

import {EventsAgenda} from "#/components/events/events-agenda.tsx";
import {EventsFeatured} from "#/components/events/events-featured.tsx";
import {EventsGallery} from "#/components/events/events-gallery.tsx";
import {EventsHero} from "#/components/events/events-hero.tsx";
import {EventsSpeakers} from "#/components/events/events-speakers.tsx";
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

describe("EventsAgenda", () => {
  it("renders event schedule timeline days and session titles", () => {
    render(<EventsAgenda />);

    expect(screen.getByRole("heading", {name: "Event Schedule & Agenda"})).toBeInTheDocument();
    expect(screen.getByText("Day 1 - Cloud & AI Summit")).toBeInTheDocument();
  });
});

describe("EventsSpeakers", () => {
  it("renders keynote speakers section heading", () => {
    render(<EventsSpeakers />);

    expect(screen.getByRole("heading", {name: "Featured Speakers"})).toBeInTheDocument();
  });
});

describe("EventsFeatured", () => {
  it("renders featured events heading and carousel slides", async () => {
    const user = userEvent.setup();
    render(<EventsFeatured />);

    expect(screen.getByRole("heading", {name: "Featured Events"})).toBeInTheDocument();
    expect(screen.getAllByText(/BUILDING SECURE, SCALABLE AI SOLUTIONS WITH AMAZON BEDROCK AGENT CORE/i)[0]).toBeInTheDocument();

    const nextButton = screen.getByRole("button", {name: "Next event"});
    await user.click(nextButton);

    expect(screen.getAllByText(/NEXT-GEN INTELLIGENCE & CLOUD AUTOMATION SUMMIT/i)[0]).toBeInTheDocument();

    await user.click(nextButton);
    expect(screen.getAllByText(/AUTOMATED CLOUD TAX FILING & COMPLIANCE FOR ENTERPRISES/i)[0]).toBeInTheDocument();
  });
});

describe("EventsGallery", () => {
  it("renders masonry photo gallery with search and category filters", async () => {
    const user = userEvent.setup();
    render(<EventsGallery />);

    expect(screen.getByRole("heading", {name: "Event Gallery"})).toBeInTheDocument();
    const searchInput = screen.getByPlaceholderText("Search past events...");
    await user.type(searchInput, "One with AI");

    expect(screen.getByText("One with AI Masterclass Stage")).toBeInTheDocument();
  });
});
