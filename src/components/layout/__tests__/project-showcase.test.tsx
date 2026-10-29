import {screen} from "@testing-library/react";
import {afterEach, beforeEach, describe, expect, it, vi} from "vite-plus/test";

import {ProjectShowcase} from "#/components/layout/project-showcase.tsx";
import type {ApiProject} from "#/lib/api/types.ts";
import {renderWithQueryClient} from "#/test-utils/query-client.tsx";

const project: ApiProject = {
  id: "project-1",
  section: "projects",
  slug: "swap-os",
  name: "SWAP OS",
  summary: "We made payments reliable.",
  year: "2025",
  projectType: "Cloud Infrastructure & DevOps",
  industry: "Fintech",
  duration: "12 Weeks",
  coverImage: null,
  videoUrl: null,
  caseStudyUrl: null,
  liveUrl: null,
  stats: [{label: "Uptime", value: "99.9%"}],
  status: "published",
  sortOrder: 0,
  createdAt: "2026-01-01T00:00:00.000Z",
};

const response = () =>
  new Response(JSON.stringify({success: true, data: {items: [project], pagination: {limit: 100, nextCursor: null}}}), {status: 200});

describe("ProjectShowcase", () => {
  beforeEach(() => {
    vi.stubEnv("VITE_API_BASE_URL", "https://api.arthurite.test/v1");
    vi.stubGlobal(
      "fetch",
      vi.fn(() => Promise.resolve(response()))
    );
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it("renders the project carousel with API data", async () => {
    renderWithQueryClient(<ProjectShowcase />);

    expect(await screen.findByRole("heading", {name: "SWAP OS"})).toBeInTheDocument();
    expect(screen.getByText("We made payments reliable.")).toBeInTheDocument();
  });

  it("shows a loading state while projects are fetched", () => {
    renderWithQueryClient(<ProjectShowcase />);

    expect(screen.getByLabelText("Loading selected work")).toBeInTheDocument();
  });

  it("explains when projects cannot be loaded", async () => {
    vi.mocked(fetch).mockRejectedValue(new Error("offline"));
    renderWithQueryClient(<ProjectShowcase />);

    expect(await screen.findByRole("alert", {}, {timeout: 3000})).toHaveTextContent("couldn't load selected work");
  });
});
