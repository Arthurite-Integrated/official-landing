import {render, screen} from "@testing-library/react";
import {describe, expect, it, vi} from "vite-plus/test";

import {EventDetailView} from "#/components/events/event-detail-view.tsx";
import {FEATURED_EVENTS} from "#/components/events/events-data.ts";

vi.mock("@tanstack/react-router", async () => {
  const React = await import("react");
  return {
    Link: ({children, className, to}: {readonly children: React.ReactNode; readonly className?: string; readonly to: string}) =>
      React.createElement("a", {className, href: to}, children),
  };
});

describe("EventDetailView", () => {
  it("renders event not found state when no event is provided", () => {
    render(<EventDetailView event={undefined} />);
    expect(screen.getByRole("heading", {name: "Event Not Found"})).toBeInTheDocument();
  });

  it("renders single event details, venue location, speakers, and gallery wall", () => {
    const mockEvent = FEATURED_EVENTS[0];
    render(<EventDetailView event={mockEvent} />);

    expect(screen.getByRole("heading", {level: 1})).toHaveTextContent(mockEvent.title.split(" ")[0]);
    expect(screen.getByRole("heading", {name: /Hosted in/i})).toHaveTextContent("Lagos, Nigeria");
    expect(screen.getByRole("heading", {name: "Speakers"})).toBeInTheDocument();
    expect(screen.getByAltText("Mildred N. Ekanem")).toBeInTheDocument();
    expect(screen.getByRole("heading", {name: /moments from/i})).toBeInTheDocument();
    expect(screen.getAllByRole("button", {name: /Open photo/i}).length).toBeGreaterThan(0);
    expect(screen.queryByText(/Con-fret Event/i)).not.toBeInTheDocument();
  });
});
