import {fireEvent, screen} from "@testing-library/react";
import {afterEach, beforeEach, describe, expect, it, vi} from "vite-plus/test";

import {MeetTheTeam} from "#/components/about/meet-the-team.tsx";
import type {ApiStaff} from "#/lib/api/types.ts";
import {renderWithQueryClient} from "#/test-utils/query-client.tsx";

vi.mock("@tanstack/react-router", async () => {
  const React = await import("react");

  return {
    Link: ({children, className, to}: {readonly children: React.ReactNode; readonly className?: string; readonly to: string}) =>
      React.createElement("a", {className, href: to}, children),
  };
});

const staffMember = (name: string, sortOrder: number): ApiStaff => ({
  id: name.toLowerCase().replaceAll(" ", "-"),
  slug: name.toLowerCase().replaceAll(" ", "-"),
  name,
  position: `${name} position`,
  photo: `https://cdn.arthurite.test/${sortOrder}.png`,
  bio: `${name} enjoys working at Arthurite.`,
  sortOrder,
});

const firstMember = staffMember("Paul Aderoju", 0);
const secondMember = staffMember("Ayomikun Ayobami", 1);
const lastMember = staffMember("Bello Abake Mardiyat", 2);
const STAFF = [secondMember, lastMember, firstMember];

const staffResponse = () =>
  new Response(JSON.stringify({success: true, data: {items: STAFF, pagination: {limit: 100, nextCursor: null}}}), {status: 200});

async function renderTeam() {
  const view = renderWithQueryClient(<MeetTheTeam />);
  await screen.findByRole("heading", {level: 3});
  return view;
}

function currentMemberName() {
  return screen.getByRole("heading", {level: 3});
}

describe("MeetTheTeam", () => {
  beforeEach(() => {
    vi.stubEnv("VITE_API_BASE_URL", "https://api.arthurite.test");
    vi.stubGlobal(
      "fetch",
      vi.fn(() => Promise.resolve(staffResponse()))
    );
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it("names the section meet the team", async () => {
    await renderTeam();

    expect(screen.getByRole("region", {name: /meet the team/i})).toBeInTheDocument();
  });

  it("shows a loading state while the team is fetched", () => {
    renderWithQueryClient(<MeetTheTeam />);

    expect(screen.getByLabelText("Loading team")).toBeInTheDocument();
  });

  it("explains when the team cannot be loaded", async () => {
    vi.mocked(fetch).mockRejectedValue(new Error("offline"));
    renderWithQueryClient(<MeetTheTeam />);

    expect(await screen.findByRole("alert", {}, {timeout: 3000})).toHaveTextContent(/couldn't load the team/i);
  });

  it("introduces the member with the lowest sort order first", async () => {
    await renderTeam();

    expect(currentMemberName()).toHaveTextContent(firstMember.name);
  });

  it("gives the team member's position", async () => {
    await renderTeam();

    expect(screen.getByText(firstMember.position)).toBeInTheDocument();
  });

  it("quotes the team member's bio", async () => {
    await renderTeam();

    expect(screen.getByText(firstMember.bio, {exact: false})).toBeInTheDocument();
  });

  it("shows a photo card for every team member", async () => {
    const {container} = await renderTeam();

    expect(container.querySelectorAll('[data-slot="team-card"]')).toHaveLength(STAFF.length);
  });

  it("moves to the next team member", async () => {
    await renderTeam();
    fireEvent.click(screen.getByRole("button", {name: "Next team member"}));

    expect(currentMemberName()).toHaveTextContent(secondMember.name);
  });

  it("wraps from the first team member back to the last", async () => {
    await renderTeam();
    fireEvent.click(screen.getByRole("button", {name: "Previous team member"}));

    expect(currentMemberName()).toHaveTextContent(lastMember.name);
  });

  it("moves to the next team member when the photos are pressed", async () => {
    await renderTeam();
    fireEvent.click(screen.getByRole("button", {name: "Show next team member"}));

    expect(currentMemberName()).toHaveTextContent(secondMember.name);
  });

  it("announces the team member politely when it changes", async () => {
    const {container} = await renderTeam();

    expect(container.querySelector('[aria-live="polite"]')).toHaveTextContent(firstMember.name);
  });

  it("points visitors to our open roles", async () => {
    await renderTeam();

    expect(screen.getByRole("link", {name: /join our team/i})).toHaveAttribute("href", "/careers");
  });
});
