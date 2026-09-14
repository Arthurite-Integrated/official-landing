import {render, screen} from "@testing-library/react";
import {describe, expect, it} from "vitest";

import {VisionMissionContent} from "#/components/about/vision-mission-content.ts";
import {VisionMission} from "#/components/about/vision-mission.tsx";

const {eyebrow, heading, statements} = VisionMissionContent;

describe("VisionMission", () => {
  it("names the section after its heading", () => {
    render(<VisionMission />);

    expect(screen.getByRole("region", {name: heading})).toBeInTheDocument();
  });

  it("labels the section with what drives us", () => {
    render(<VisionMission />);

    expect(screen.getByText(eyebrow)).toBeInTheDocument();
  });

  it("gives each statement its own card", () => {
    render(<VisionMission />);

    expect(screen.getAllByRole("article")).toHaveLength(statements.length);
  });

  it("titles the mission and the vision", () => {
    render(<VisionMission />);

    for (const statement of statements) {
      expect(screen.getByRole("heading", {level: 3, name: statement.title})).toBeInTheDocument();
    }
  });

  it("states what Arthurite Universal Limited sets out to do", () => {
    render(<VisionMission />);

    for (const statement of statements) {
      expect(screen.getByText(statement.statement)).toBeInTheDocument();
    }
  });

  it("explains how Arthurite Integrated extends each statement", () => {
    render(<VisionMission />);

    for (const statement of statements) {
      expect(screen.getByText(statement.extension)).toBeInTheDocument();
    }
  });
});
