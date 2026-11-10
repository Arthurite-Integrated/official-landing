import {render, screen} from "@testing-library/react";
import {describe, expect, it, vi} from "vite-plus/test";

import {AboutHero} from "#/components/about/about-hero.tsx";

vi.mock("@tanstack/react-router", async () => {
  const React = await import("react");

  return {
    Link: ({children, className, to}: {readonly children: React.ReactNode; readonly className?: string; readonly to: string}) =>
      React.createElement("a", {className, href: to}, children),
  };
});

describe("AboutHero", () => {
  it("introduces the page with a heading", () => {
    render(<AboutHero />);

    expect(screen.getByRole("heading", {level: 1})).toHaveTextContent("Build the future of cloud");
  });

  it("invites businesses to work with us", () => {
    render(<AboutHero />);

    expect(screen.getByRole("link", {name: /work with us/i})).toHaveAttribute("href", "/contact");
  });

  it("offers primary and secondary calls to action", () => {
    render(<AboutHero />);

    expect(screen.getAllByRole("link")).toHaveLength(2);
  });

  it("displays the Arthurite team hero photo", () => {
    render(<AboutHero />);

    expect(screen.getByRole("img", {name: /arthurite team/i})).toHaveAttribute("src", "/about/about-hero.webp");
  });
});
