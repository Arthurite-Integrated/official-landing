import {screen} from "@testing-library/react";
import {afterEach, beforeEach, describe, expect, it, vi} from "vite-plus/test";

import {AwardsAndRecognition} from "#/components/layout/awards-recognition.tsx";
import type {ApiAward} from "#/lib/api/types.ts";
import {renderWithQueryClient} from "#/test-utils/query-client.tsx";

const award: ApiAward = {
  id: "award-1",
  section: "awards",
  year: "2025",
  award: "NDE Award of Recognition",
  description: "Community impact across six geographical zones.",
  status: "published",
  sortOrder: 0,
  createdAt: "2026-01-01T00:00:00.000Z",
};

const response = () =>
  new Response(JSON.stringify({success: true, data: {items: [award], pagination: {limit: 100, nextCursor: null}}}), {status: 200});

describe("AwardsAndRecognition", () => {
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

  it("renders awards returned by the API", async () => {
    renderWithQueryClient(<AwardsAndRecognition />);

    expect(await screen.findByText(award.award)).toBeInTheDocument();
    expect(screen.getByText(award.description)).toBeInTheDocument();
  });

  it("shows a loading state while awards are fetched", () => {
    renderWithQueryClient(<AwardsAndRecognition />);

    expect(screen.getByLabelText("Loading awards")).toBeInTheDocument();
  });

  it("explains when awards cannot be loaded", async () => {
    vi.mocked(fetch).mockRejectedValue(new Error("offline"));
    renderWithQueryClient(<AwardsAndRecognition />);

    expect(await screen.findByRole("alert", {}, {timeout: 3000})).toHaveTextContent("couldn't load awards");
  });
});
