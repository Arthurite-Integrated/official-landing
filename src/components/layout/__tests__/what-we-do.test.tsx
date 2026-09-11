import {render, screen} from "@testing-library/react";
import {describe, expect, it} from "vitest";

import {WhatWeDoCards} from "#/components/layout/what-we-do-cards.ts";
import {WhatWeDo} from "#/components/layout/what-we-do.tsx";

describe("WhatWeDo", () => {
  it("names the section after its heading", () => {
    render(<WhatWeDo />);

    expect(screen.getByRole("region", {name: /one partner for the whole cloud lifecycle/i})).toBeInTheDocument();
  });

  it("labels the section with a what we do eyebrow", () => {
    render(<WhatWeDo />);

    expect(screen.getByText("What we do")).toBeInTheDocument();
  });

  it("renders a card for every service", () => {
    render(<WhatWeDo />);

    expect(screen.getAllByRole("article")).toHaveLength(WhatWeDoCards.length);
  });

  it("renders each service title", () => {
    render(<WhatWeDo />);

    for (const card of WhatWeDoCards) {
      expect(screen.getByRole("heading", {name: card.title})).toBeInTheDocument();
    }
  });
});

describe("WhatWeDoCards", () => {
  it("keeps every service title unique", () => {
    const titles = WhatWeDoCards.map((card) => card.title);

    expect(new Set(titles).size).toBe(titles.length);
  });

  it("tiles the wide cards on a three column bento grid", () => {
    const wideCards = WhatWeDoCards.filter((card) => card.span.includes("lg:col-span-2"));

    expect(wideCards).toHaveLength(3);
  });
});
