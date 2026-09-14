import {render, screen} from "@testing-library/react";
import {describe, expect, it} from "vitest";

import {PersonPortrait} from "#/components/about/person-portrait.tsx";

const NAME = "Engr. Somtochukwu Ezepue";
const INITIALS = "SE";

describe("PersonPortrait", () => {
  it("shows the person's photo once one is added", () => {
    render(<PersonPortrait photo="/about/founder.jpg" name={NAME} initials={INITIALS} />);

    expect(screen.getByRole("img", {name: NAME})).toHaveAttribute("src", "/about/founder.jpg");
  });

  it("shows the person's initials until the photo is added", () => {
    const {container} = render(<PersonPortrait photo={null} name={NAME} initials={INITIALS} />);

    expect(container).toHaveTextContent(INITIALS);
  });

  it("keeps the initials placeholder out of the accessibility tree", () => {
    render(<PersonPortrait photo={null} name={NAME} initials={INITIALS} />);

    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });

  it("takes its shape from the layout it sits in", () => {
    const {container} = render(<PersonPortrait photo={null} name={NAME} initials={INITIALS} className="aspect-4/5" />);

    expect(container.firstChild).toHaveClass("aspect-4/5");
  });
});
