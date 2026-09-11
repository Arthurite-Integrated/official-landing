import fc from "fast-check";
import {describe, expect, it} from "vitest";

import {ProjectsSchema, stepIndex} from "#/lib/projects-schema.ts";

const validProject = {
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

describe("ProjectsSchema", () => {
  it("accepts a project with every optional link left empty", () => {
    expect(() => ProjectsSchema.parse([validProject])).not.toThrow();
  });

  it("accepts a case study link once it is filled in", () => {
    const withLink = {...validProject, caseStudyUrl: "https://drive.google.com/file/d/abc/view"};

    expect(() => ProjectsSchema.parse([withLink])).not.toThrow();
  });

  it("rejects a case study link that is not a url", () => {
    expect(() => ProjectsSchema.parse([{...validProject, caseStudyUrl: "drive-link-goes-here"}])).toThrow();
  });

  it("rejects a project missing its name", () => {
    const {name: _name, ...withoutName} = validProject;

    expect(() => ProjectsSchema.parse([withoutName])).toThrow();
  });

  it.each(["duration", "image", "industry", "name", "projectType", "slug", "summary", "year"] as const)("rejects an empty %s", (field) => {
    expect(() => ProjectsSchema.parse([{...validProject, [field]: ""}])).toThrow();
  });

  it("rejects a stat with an empty label", () => {
    expect(() => ProjectsSchema.parse([{...validProject, stats: [{label: "", value: "99.9%"}]}])).toThrow();
  });

  it("rejects a stat with an empty value", () => {
    expect(() => ProjectsSchema.parse([{...validProject, stats: [{label: "Uptime", value: ""}]}])).toThrow();
  });

  it("accepts the largest allowed run of stats", () => {
    const four = Array.from({length: 4}, (_unused, index) => ({label: `Metric ${index}`, value: `${index}`}));

    expect(() => ProjectsSchema.parse([{...validProject, stats: four}])).not.toThrow();
  });

  it("rejects more than four stats", () => {
    const five = Array.from({length: 5}, (_unused, index) => ({label: `Metric ${index}`, value: `${index}`}));

    expect(() => ProjectsSchema.parse([{...validProject, stats: five}])).toThrow();
  });

  it("rejects an empty project list", () => {
    expect(() => ProjectsSchema.parse([])).toThrow();
  });
});

describe("stepIndex", () => {
  it("moves forward", () => {
    expect(stepIndex(0, 1, 3)).toBe(1);
  });

  it("wraps past the last project", () => {
    expect(stepIndex(2, 1, 3)).toBe(0);
  });

  it("wraps back before the first project", () => {
    expect(stepIndex(0, -1, 3)).toBe(2);
  });

  it("stays put when there is only one project", () => {
    expect(stepIndex(0, 1, 1)).toBe(0);
  });

  it("always lands on a real project", () => {
    fc.assert(
      fc.property(fc.integer({min: 0, max: 20}), fc.integer({min: -5, max: 5}), fc.integer({min: 1, max: 20}), (current, delta, count) => {
        const index = stepIndex(current % count, delta, count);

        return Number.isInteger(index) && index >= 0 && index < count;
      })
    );
  });
});
