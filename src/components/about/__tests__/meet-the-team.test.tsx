import {fireEvent, render, screen} from "@testing-library/react";
import {describe, expect, it, vi} from "vitest";

import {MeetTheTeam} from "#/components/about/meet-the-team.tsx";
import {TeamMembers} from "#/components/about/team-content.ts";

vi.mock("@tanstack/react-router", async () => {
  const React = await import("react");

  return {
    Link: ({children, className, to}: {readonly children: React.ReactNode; readonly className?: string; readonly to: string}) =>
      React.createElement("a", {className, href: to}, children),
  };
});

const firstMember = TeamMembers[0];
const secondMember = TeamMembers[1];
const lastMember = TeamMembers[TeamMembers.length - 1];

function currentMemberName() {
  return screen.getByRole("heading", {level: 3});
}

describe("MeetTheTeam", () => {
  it("names the section meet the team", () => {
    render(<MeetTheTeam />);

    expect(screen.getByRole("region", {name: /meet the team/i})).toBeInTheDocument();
  });

  it("introduces the first team member by name", () => {
    render(<MeetTheTeam />);

    expect(currentMemberName()).toHaveTextContent(firstMember.name);
  });

  it("gives the team member's position", () => {
    render(<MeetTheTeam />);

    expect(screen.getByText(firstMember.position)).toBeInTheDocument();
  });

  it("quotes the team member", () => {
    render(<MeetTheTeam />);

    expect(screen.getByText(firstMember.quote, {exact: false})).toBeInTheDocument();
  });

  it("shows a photo card for every team member", () => {
    const {container} = render(<MeetTheTeam />);

    expect(container.querySelectorAll('[data-slot="team-card"]')).toHaveLength(TeamMembers.length);
  });

  it("moves to the next team member", () => {
    render(<MeetTheTeam />);
    fireEvent.click(screen.getByRole("button", {name: "Next team member"}));

    expect(currentMemberName()).toHaveTextContent(secondMember.name);
  });

  it("wraps from the first team member back to the last", () => {
    render(<MeetTheTeam />);
    fireEvent.click(screen.getByRole("button", {name: "Previous team member"}));

    expect(currentMemberName()).toHaveTextContent(lastMember.name);
  });

  it("moves to the next team member when the photos are pressed", () => {
    render(<MeetTheTeam />);
    fireEvent.click(screen.getByRole("button", {name: "Show next team member"}));

    expect(currentMemberName()).toHaveTextContent(secondMember.name);
  });

  it("announces the team member politely when it changes", () => {
    const {container} = render(<MeetTheTeam />);

    expect(container.querySelector('[aria-live="polite"]')).toHaveTextContent(firstMember.name);
  });

  it("points visitors to our open roles", () => {
    render(<MeetTheTeam />);

    expect(screen.getByRole("link", {name: /join our team/i})).toHaveAttribute("href", "/careers");
  });
});
