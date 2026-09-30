import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {describe, expect, it, vi} from "vite-plus/test";

import {EventsAgenda} from "#/components/events/events-agenda.tsx";
import {EventsFeatured} from "#/components/events/events-featured.tsx";
import {EventsGallery} from "#/components/events/events-gallery.tsx";
import {EventsHero} from "#/components/events/events-hero.tsx";
import {EventsSpeakers} from "#/components/events/events-speakers.tsx";
import {EventsTracks} from "#/components/events/events-tracks.tsx";
import {EventsUpcoming} from "#/components/events/events-upcoming.tsx";

vi.mock("@tanstack/react-router", async () => {
  const React = await import("react");
  return {
    Link: ({children, className, to}: {readonly children: React.ReactNode; readonly className?: string; readonly to: string}) =>
      React.createElement("a", {className, href: to}, children),
  };
});

describe("EventsHero", () => {
  it("renders main heading and subtitle", () => {
    render(<EventsHero />);

    expect(screen.getByRole("heading", {level: 1})).toHaveTextContent(/ARTHURITE/i);
    expect(screen.getByText("EVENTS")).toBeInTheDocument();
  });
});

describe("EventsTracks", () => {
  it("renders lead statement, CTA button, and 3 track headings", () => {
    render(<EventsTracks />);

    expect(screen.getByText(/Bringing together technology leaders/i)).toBeInTheDocument();
    expect(screen.getByRole("link", {name: /Get in Touch/i})).toHaveAttribute("href", "/contact");

    expect(screen.getByRole("heading", {name: "Generative AI & AWS"})).toBeInTheDocument();
    expect(screen.getByRole("heading", {name: "EV & Smart Mobility"})).toBeInTheDocument();
    expect(screen.getByRole("heading", {name: "Digital Transformation"})).toBeInTheDocument();
  });
});

describe("EventsAgenda", () => {
  it("renders event schedule heading and first event day title", () => {
    render(<EventsAgenda />);

    expect(screen.getByRole("heading", {name: "Event Schedule & Agenda"})).toBeInTheDocument();
    expect(screen.getByText(/One with AI/i)).toBeInTheDocument();
  });
});

describe("EventsSpeakers", () => {
  it("renders speakers section heading and speaker names from One with AI", () => {
    render(<EventsSpeakers />);

    expect(screen.getByRole("heading", {name: "Speakers"})).toBeInTheDocument();
    expect(screen.getByAltText("Mildred N. Ekanem")).toBeInTheDocument();
  });
});

describe("EventsFeatured", () => {
  it("renders featured events heading and first event title without register button", async () => {
    const user = userEvent.setup();
    render(<EventsFeatured />);

    expect(screen.getByRole("heading", {name: "Featured Events"})).toBeInTheDocument();
    expect(screen.getAllByText(/ONE WITH AI/i)[0]).toBeInTheDocument();
    expect(screen.queryByText("Register Now")).not.toBeInTheDocument();

    const nextButton = screen.getByRole("button", {name: "Next event"});
    await user.click(nextButton);

    expect(screen.getAllByText(/NEXT-GEN INTELLIGENCE/i)[0]).toBeInTheDocument();
  });
});

describe("EventsUpcoming", () => {
  it("renders single full-width card with no upcoming events notice and link to events platform", () => {
    render(<EventsUpcoming />);

    expect(screen.getByRole("heading", {name: "No Upcoming Event Yet"})).toBeInTheDocument();
    const externalLink = screen.getByRole("link", {name: /Visit Arthurite Events Website/i});
    expect(externalLink).toHaveAttribute("href", "https://arthuriteevents.com/");
  });
});

describe("EventsGallery", () => {
  it("renders bento photo gallery with 25 per page pagination, search, and category filters", async () => {
    const user = userEvent.setup();
    render(<EventsGallery />);

    expect(screen.getByPlaceholderText("Search past events...")).toBeInTheDocument();
    expect(screen.getByRole("button", {name: "Page 1"})).toBeInTheDocument();
    expect(screen.getByRole("button", {name: "Page 2"})).toBeInTheDocument();

    // Check pagination navigation
    const nextPageBtn = screen.getByRole("button", {name: "Next page"});
    await user.click(nextPageBtn);
    expect(screen.getByRole("button", {name: "Page 2"})).toHaveAttribute("aria-current", "page");

    // Search filter
    const searchInput = screen.getByPlaceholderText("Search past events...");
    await user.type(searchInput, "One with AI");

    const photoButtons = screen.getAllByRole("button", {name: /Open photo/i});
    expect(photoButtons.length).toBeGreaterThan(0);
    expect(screen.getAllByRole("img", {name: /Event showcase/i})[0]).toHaveAttribute("src", expect.stringContaining("DSC_"));
  });
});
