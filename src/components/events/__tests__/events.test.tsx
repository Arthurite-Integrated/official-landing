import {render, screen, waitFor} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {afterEach, beforeEach, describe, expect, it, vi} from "vite-plus/test";

import {EventsAgenda} from "#/components/events/events-agenda.tsx";
import {EventsFeatured} from "#/components/events/events-featured.tsx";
import {EventsGallery} from "#/components/events/events-gallery.tsx";
import {EventsHero} from "#/components/events/events-hero.tsx";
import {EventsSpeakers} from "#/components/events/events-speakers.tsx";
import {EventsTracks} from "#/components/events/events-tracks.tsx";
import {EventsUpcoming} from "#/components/events/events-upcoming.tsx";
import type {ApiEvent} from "#/lib/api/types.ts";
import {renderWithQueryClient} from "#/test-utils/query-client.tsx";

vi.mock("@tanstack/react-router", async () => {
  const React = await import("react");
  return {
    Link: ({children, className, to}: {readonly children: React.ReactNode; readonly className?: string; readonly to: string}) =>
      React.createElement("a", {className, href: to}, children),
  };
});

const apiEvent = (id: string, title: string): ApiEvent => ({
  id,
  title,
  coverImage: "https://cdn.arthurite.test/cover.jpg",
  description: `${title} description.`,
  location: "Lagos",
  startsAt: "2026-06-11T09:00:00.000Z",
  registeredCount: 0,
  createdAt: "2026-01-01T00:00:00.000Z",
});

function stubEventsFetch(items: ApiEvent[]) {
  vi.stubEnv("VITE_API_BASE_URL", "https://api.arthurite.test/v1");
  vi.stubGlobal(
    "fetch",
    vi.fn(() =>
      Promise.resolve(
        new Response(
          JSON.stringify({success: true, status: 200, timestamp: "t", data: {items, pagination: {limit: 20, nextCursor: null}}}),
          {
            status: 200,
            headers: {"content-type": "application/json"},
          }
        )
      )
    )
  );
}

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
  beforeEach(() => {
    stubEventsFetch([apiEvent("evt-1", "ONE WITH AI"), apiEvent("evt-2", "NEXT-GEN INTELLIGENCE")]);
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it("renders featured events from the API and paginates", async () => {
    const user = userEvent.setup();
    renderWithQueryClient(<EventsFeatured />);

    expect(await screen.findByRole("heading", {name: "Featured Events"})).toBeInTheDocument();
    expect(await screen.findAllByText(/ONE WITH AI/i)).not.toHaveLength(0);
    expect(screen.queryByText("Register Now")).not.toBeInTheDocument();

    const nextButton = screen.getByRole("button", {name: "Next event"});
    await user.click(nextButton);

    expect(screen.getAllByText(/NEXT-GEN INTELLIGENCE/i)[0]).toBeInTheDocument();
  });

  it("renders nothing while the API has no upcoming events", async () => {
    stubEventsFetch([]);
    renderWithQueryClient(<EventsFeatured />);

    await waitFor(() => expect(fetch).toHaveBeenCalled());
    expect(screen.queryByRole("heading", {name: "Featured Events"})).not.toBeInTheDocument();
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
