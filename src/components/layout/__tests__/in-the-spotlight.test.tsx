import {render, screen} from "@testing-library/react";
import {describe, expect, it} from "vitest";

import {InTheSpotlight} from "#/components/layout/in-the-spotlight.tsx";
import {SpotlightCard} from "#/components/layout/spotlight-card.tsx";
import {SpotlightItems} from "#/components/layout/spotlight-items.ts";
import type {SpotlightItem} from "#/components/layout/spotlight-items.ts";

const baseItem: SpotlightItem = {
  image: null,
  source: "The Guardian",
  title: "Featured on The Guardian newspaper",
  url: null,
};

describe("InTheSpotlight", () => {
  it("names the section after its heading", () => {
    render(<InTheSpotlight />);

    expect(screen.getByRole("region", {name: "In the Spotlight"})).toBeInTheDocument();
  });

  it("renders a card for every spotlight item", () => {
    render(<InTheSpotlight />);

    expect(screen.getAllByRole("article")).toHaveLength(SpotlightItems.length);
  });

  it("lays the cards out as a list", () => {
    render(<InTheSpotlight />);

    expect(screen.getAllByRole("listitem")).toHaveLength(SpotlightItems.length);
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

describe("SpotlightItems", () => {
  it("keeps every headline unique", () => {
    const titles = SpotlightItems.map((item) => item.title);

    expect(new Set(titles).size).toBe(titles.length);
  });
});
