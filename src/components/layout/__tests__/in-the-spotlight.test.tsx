import {render, screen} from "@testing-library/react";
import {afterEach, beforeEach, describe, expect, it, vi} from "vite-plus/test";

import {InTheSpotlight} from "#/components/layout/in-the-spotlight.tsx";
import {SpotlightCard} from "#/components/layout/spotlight-card.tsx";
import {toSpotlightItems} from "#/components/layout/spotlight-items.ts";
import type {SpotlightItem} from "#/components/layout/spotlight-card.tsx";
import type {ApiSpotlight} from "#/lib/api/types.ts";
import {renderWithQueryClient} from "#/test-utils/query-client.tsx";

const baseItem: SpotlightItem = {
  image: null,
  source: "The Guardian",
  title: "Featured on The Guardian newspaper",
  url: null,
};

const spotlight = (title: string, sortOrder: number): ApiSpotlight => ({
  id: `spotlight-${sortOrder}`,
  section: "spotlight",
  title,
  source: "The Guardian",
  coverImage: `https://cdn.arthurite.test/${sortOrder}.jpg`,
  url: "https://guardian.ng/",
  status: "published",
  sortOrder,
  createdAt: "2026-01-01T00:00:00.000Z",
});

const SPOTLIGHT = [spotlight("Later feature", 1), spotlight("First feature", 0)];

const spotlightResponse = () =>
  new Response(JSON.stringify({success: true, data: {items: SPOTLIGHT, pagination: {limit: 100, nextCursor: null}}}), {status: 200});

describe("InTheSpotlight", () => {
  beforeEach(() => {
    vi.stubEnv("VITE_API_BASE_URL", "https://api.arthurite.test/v1");
    vi.stubGlobal(
      "fetch",
      vi.fn(() => Promise.resolve(spotlightResponse()))
    );
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it("names the section after its heading", () => {
    renderWithQueryClient(<InTheSpotlight />);

    expect(screen.getByRole("region", {name: "In the Spotlight"})).toBeInTheDocument();
  });

  it("renders cards returned by the spotlight API", async () => {
    renderWithQueryClient(<InTheSpotlight />);

    expect(await screen.findByRole("heading", {name: "First feature"})).toBeInTheDocument();
    expect(screen.getAllByRole("article")).toHaveLength(SPOTLIGHT.length);
  });

  it("shows a loading state while spotlight items are fetched", () => {
    renderWithQueryClient(<InTheSpotlight />);

    expect(screen.getByLabelText("Loading spotlight items")).toBeInTheDocument();
  });

  it("explains when spotlight items cannot be loaded", async () => {
    vi.mocked(fetch).mockRejectedValue(new Error("offline"));
    renderWithQueryClient(<InTheSpotlight />);

    expect(await screen.findByRole("alert", {}, {timeout: 3000})).toHaveTextContent("couldn't load spotlight");
  });

  it("uses the spotlight endpoint", async () => {
    renderWithQueryClient(<InTheSpotlight />);
    await screen.findByRole("heading", {name: "First feature"});

    expect(fetch).toHaveBeenCalledWith("https://api.arthurite.test/v1/spotlight?limit=100", expect.anything());
  });
});

describe("SpotlightCard", () => {
  it("shows the headline", () => {
    render(<SpotlightCard item={baseItem} />);

    expect(screen.getByRole("heading", {name: baseItem.title})).toBeInTheDocument();
  });

  it("credits the publication", () => {
    render(<SpotlightCard item={baseItem} />);

    expect(screen.getByText("The Guardian")).toBeInTheDocument();
  });

  it("omits the link until one is added", () => {
    render(<SpotlightCard item={baseItem} />);

    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });

  it("links to the article once one is added", () => {
    render(<SpotlightCard item={{...baseItem, url: "https://guardian.ng/article"}} />);

    expect(screen.getByRole("link", {name: baseItem.title})).toHaveAttribute("href", "https://guardian.ng/article");
  });

  it("opens the article in a new tab", () => {
    render(<SpotlightCard item={{...baseItem, url: "https://guardian.ng/article"}} />);

    expect(screen.getByRole("link", {name: baseItem.title})).toHaveAttribute("target", "_blank");
  });

  it("shows no cover image until one is added", () => {
    const {container} = render(<SpotlightCard item={baseItem} />);

    expect(container.querySelector("img")).toBeNull();
  });

  it("shows the cover image once one is added", () => {
    const {container} = render(<SpotlightCard item={{...baseItem, image: "/spotlight/guardian.jpg"}} />);

    expect(container.querySelector("img")).toHaveAttribute("src", "/spotlight/guardian.jpg");
  });
});

describe("toSpotlightItems", () => {
  it("sorts spotlight items and maps API image fields to the card model", () => {
    const items = toSpotlightItems(SPOTLIGHT);

    expect(items.map((item) => item.title)).toEqual(["First feature", "Later feature"]);
    expect(items[0]).toMatchObject({image: "https://cdn.arthurite.test/0.jpg", source: "The Guardian", url: "https://guardian.ng/"});
  });
});
