import {render, screen} from "@testing-library/react";
import {describe, expect, it} from "vitest";

import {FounderStatementContent} from "#/components/about/founder-statement-content.ts";
import {FounderStatement} from "#/components/about/founder-statement.tsx";

const {name, paragraphs, role} = FounderStatementContent;

describe("FounderStatement", () => {
  it("names the section a word from our founder", () => {
    render(<FounderStatement />);

    expect(screen.getByRole("region", {name: "A word from our founder"})).toBeInTheDocument();
  });

  it("quotes every paragraph of the statement", () => {
    render(<FounderStatement />);

    for (const paragraph of paragraphs) {
      expect(screen.getByText(paragraph)).toBeInTheDocument();
    }
  });

  it("attributes the statement to the founder by name", () => {
    render(<FounderStatement />);

    expect(screen.getByRole("figure")).toHaveTextContent(name);
  });

  it("gives the founder's role alongside the name", () => {
    render(<FounderStatement />);

    expect(screen.getByRole("figure")).toHaveTextContent(role);
  });
});
