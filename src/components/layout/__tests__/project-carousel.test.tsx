import {fireEvent, render, screen} from "@testing-library/react";
import {describe, expect, it} from "vitest";

import {ProjectCarousel} from "#/components/layout/project-carousel.tsx";
import type {Project} from "#/lib/projects.ts";

const baseProject: Project = {
  caseStudyUrl: null,
  duration: "12 Weeks",
  image: null,
  industry: "Fintech",
  liveUrl: null,
  name: "SWAP OS",
  projectType: "Cloud Infrastructure & DevOps",
  slug: "swap-os",
  stats: [{label: "Infrastructure uptime after deployment", value: "99.9%"}],
  summary: "We redesigned the infrastructure to be more reliable and scalable.",
  videoUrl: null,
  year: "2025",
};

const three: readonly Project[] = [
  baseProject,
  {...baseProject, name: "Second Project", slug: "second"},
  {...baseProject, name: "Third Project", slug: "third"},
];

describe("ProjectCarousel", () => {
  it("shows the first project first", () => {
    render(<ProjectCarousel projects={three} />);

    expect(screen.getByRole("heading", {name: "SWAP OS"})).toBeInTheDocument();
  });

  it("shows the next project when next is pressed", () => {
    render(<ProjectCarousel projects={three} />);
    fireEvent.click(screen.getByRole("button", {name: /next project/i}));

    expect(screen.getByRole("heading", {name: "Second Project"})).toBeInTheDocument();
  });

  it("wraps to the last project when previous is pressed first", () => {
    render(<ProjectCarousel projects={three} />);
    fireEvent.click(screen.getByRole("button", {name: /previous project/i}));

    expect(screen.getByRole("heading", {name: "Third Project"})).toBeInTheDocument();
  });

  it("reports the position in the set", () => {
    render(<ProjectCarousel projects={three} />);

    expect(screen.getByText("01 / 03")).toBeInTheDocument();
  });

  it("advances the reported position", () => {
    render(<ProjectCarousel projects={three} />);
    fireEvent.click(screen.getByRole("button", {name: /next project/i}));

    expect(screen.getByText("02 / 03")).toBeInTheDocument();
  });

  it("disables navigation when there is only one project", () => {
    render(<ProjectCarousel projects={[baseProject]} />);

    expect(screen.getByRole("button", {name: /next project/i})).toBeDisabled();
  });

  it("shows the project details", () => {
    render(<ProjectCarousel projects={three} />);

    expect(screen.getByText("Cloud Infrastructure & DevOps")).toBeInTheDocument();
  });

  it("shows every stat of the active project", () => {
    render(<ProjectCarousel projects={three} />);

    expect(screen.getByText("99.9%")).toBeInTheDocument();
  });

  it("omits the case study link until one is added", () => {
    render(<ProjectCarousel projects={three} />);

    expect(screen.queryByRole("link", {name: /read full case study/i})).not.toBeInTheDocument();
  });

  it("links to the case study once one is added", () => {
    const withLink = [{...baseProject, caseStudyUrl: "https://drive.google.com/file/d/abc/view"}];

    render(<ProjectCarousel projects={withLink} />);

    expect(screen.getByRole("link", {name: /read full case study/i})).toHaveAttribute("href", "https://drive.google.com/file/d/abc/view");
  });

  it("links to the live site once one is added", () => {
    const withLink = [{...baseProject, liveUrl: "https://swapos.example.com"}];

    render(<ProjectCarousel projects={withLink} />);

    expect(screen.getByRole("link", {name: /see it live/i})).toHaveAttribute("href", "https://swapos.example.com");
  });

  it("opens external links in a new tab", () => {
    const withLink = [{...baseProject, caseStudyUrl: "https://drive.google.com/file/d/abc/view"}];

    render(<ProjectCarousel projects={withLink} />);

    expect(screen.getByRole("link", {name: /read full case study/i})).toHaveAttribute("rel", "noreferrer");
  });

  it("plays the walkthrough when a video is added", () => {
    const withVideo = [{...baseProject, videoUrl: "https://youtu.be/abc"}];

    render(<ProjectCarousel projects={withVideo} />);

    expect(screen.getByRole("link", {name: /play the swap os walkthrough/i})).toBeInTheDocument();
  });
});
