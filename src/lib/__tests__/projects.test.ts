import {describe, expect, it} from "vite-plus/test";

import type {ApiProject} from "#/lib/api/types.ts";
import {toProjects} from "#/lib/projects.ts";

const project = (sortOrder: number): ApiProject => ({
  id: `project-${sortOrder}`,
  section: "projects",
  slug: `project-${sortOrder}`,
  name: `Project ${sortOrder}`,
  summary: "Project summary",
  year: "2025",
  projectType: "Cloud Infrastructure",
  industry: "Fintech",
  duration: "12 Weeks",
  coverImage: null,
  videoUrl: null,
  caseStudyUrl: null,
  liveUrl: null,
  stats: [{label: "Uptime", value: "99.9%"}],
  status: "published",
  sortOrder,
  createdAt: "2026-01-01T00:00:00.000Z",
});

describe("toProjects", () => {
  it("maps API media fields to the carousel model and orders items", () => {
    const projects = toProjects([project(1), project(0)]);

    expect(projects.map((item) => item.name)).toEqual(["Project 0", "Project 1"]);
    expect(projects[0]).toMatchObject({image: null, stats: [{label: "Uptime", value: "99.9%"}]});
  });

  it("returns no projects for an empty API response", () => {
    expect(toProjects([])).toEqual([]);
  });
});
