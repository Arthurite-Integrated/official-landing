import {fireEvent, screen, waitFor} from "@testing-library/react";
import {afterEach, beforeEach, describe, expect, it, vi} from "vite-plus/test";

import {EventDetailView} from "#/components/events/event-detail-view.tsx";
import type {ApiEvent} from "#/lib/api/types.ts";
import {renderWithQueryClient} from "#/test-utils/query-client.tsx";

vi.mock("@tanstack/react-router", async () => {
  const React = await import("react");
  return {
    Link: ({children, className, to}: {readonly children: React.ReactNode; readonly className?: string; readonly to: string}) =>
      React.createElement("a", {className, href: to}, children),
  };
});

const apiEvent: ApiEvent = {
  id: "9dc88075-5ee6-49c5-87bb-b69d8b2ada9b",
  title: "ONE WITH AI — POWERING MOBILITY",
  coverImage: "https://cdn.arthurite.test/cover.jpg",
  description: "A deep-dive into AWS and EV ecosystems.",
  location: "Federal Palace Hotel, Lagos",
  startsAt: "2026-06-11T09:00:00.000Z",
  capacity: 100,
  registeredCount: 40,
  remainingCapacity: 60,
  registrationLink: null,
  createdAt: "2026-01-01T00:00:00.000Z",
};

const created = () =>
  new Response(JSON.stringify({timestamp: "2026-01-01T00:00:00.000Z", status: 201, success: true, data: {id: "reg-1"}}), {
    status: 201,
    headers: {"content-type": "application/json"},
  });

const errorEnvelope = (type: string, status = 409) =>
  new Response(JSON.stringify({timestamp: "2026-01-01T00:00:00.000Z", status, success: false, error: {message: "conflict", type}}), {
    status,
    headers: {"content-type": "application/json"},
  });

describe("EventDetailView", () => {
  beforeEach(() => {
    vi.stubEnv("VITE_API_BASE_URL", "https://api.arthurite.test/v1");
    vi.stubGlobal(
      "fetch",
      vi.fn(() => Promise.resolve(created()))
    );
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it("renders event not found state when no event is provided", () => {
    renderWithQueryClient(<EventDetailView event={undefined} />);

    expect(screen.getByRole("heading", {name: "Event Not Found"})).toBeInTheDocument();
  });

  it("renders the hero, venue and registration form for an API event", () => {
    renderWithQueryClient(<EventDetailView event={apiEvent} />);

    expect(screen.getByRole("heading", {level: 1})).toHaveTextContent("ONE WITH AI");
    expect(screen.getByRole("heading", {name: /Hosted in/i})).toBeInTheDocument();
    expect(screen.getByRole("heading", {name: /reserve your seat/i})).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Full name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Work email")).toBeInTheDocument();
  });

  it("registers the visitor through the API", async () => {
    renderWithQueryClient(<EventDetailView event={apiEvent} />);

    fireEvent.change(screen.getByPlaceholderText("Full name"), {target: {value: "Ada Okafor"}});
    fireEvent.change(screen.getByPlaceholderText("Work email"), {target: {value: "ada@acme.com"}});
    fireEvent.click(screen.getByRole("button", {name: /register for this event/i}));

    await waitFor(() =>
      expect(fetch).toHaveBeenCalledWith(
        `https://api.arthurite.test/v1/events/${apiEvent.id}/register`,
        expect.objectContaining({method: "POST"})
      )
    );
    expect(await screen.findByText(/registered/i)).toBeInTheDocument();
  });

  it("explains when the event is already registered to that email", async () => {
    vi.mocked(fetch).mockResolvedValue(errorEnvelope("ALREADY_REGISTERED"));
    renderWithQueryClient(<EventDetailView event={apiEvent} />);

    fireEvent.change(screen.getByPlaceholderText("Full name"), {target: {value: "Ada Okafor"}});
    fireEvent.change(screen.getByPlaceholderText("Work email"), {target: {value: "ada@acme.com"}});
    fireEvent.click(screen.getByRole("button", {name: /register for this event/i}));

    expect(await screen.findByRole("alert")).toHaveTextContent(/already registered/i);
  });

  it("explains when the event is full", async () => {
    vi.mocked(fetch).mockResolvedValue(errorEnvelope("EVENT_FULL"));
    renderWithQueryClient(<EventDetailView event={apiEvent} />);

    fireEvent.change(screen.getByPlaceholderText("Full name"), {target: {value: "Ada Okafor"}});
    fireEvent.change(screen.getByPlaceholderText("Work email"), {target: {value: "ada@acme.com"}});
    fireEvent.click(screen.getByRole("button", {name: /register for this event/i}));

    expect(await screen.findByRole("alert")).toHaveTextContent(/at capacity/i);
  });

  it("links out to the registration website when registrationLink is set", () => {
    renderWithQueryClient(<EventDetailView event={{...apiEvent, registrationLink: "https://arthuriteevents.com/register"}} />);

    expect(screen.getByRole("link", {name: /register on the event website/i})).toHaveAttribute(
      "href",
      "https://arthuriteevents.com/register"
    );
  });

  it("shows a sold out notice when no seats remain", () => {
    renderWithQueryClient(<EventDetailView event={{...apiEvent, remainingCapacity: 0}} />);

    expect(screen.getByText(/at capacity/i)).toBeInTheDocument();
    expect(screen.queryByPlaceholderText("Full name")).not.toBeInTheDocument();
  });
});
