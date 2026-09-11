import {describe, expect, it} from "vitest";

import {Projects} from "#/lib/projects.ts";

describe("Projects", () => {
  it("loads the projects file", () => {
    expect(Projects.length).toBeGreaterThan(0);
  });

  it("keeps every project slug unique", () => {
    const slugs = Projects.map((project) => project.slug);

    expect(new Set(slugs).size).toBe(slugs.length);
  });
});
