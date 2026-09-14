import {render, screen} from "@testing-library/react";
import {describe, expect, it, vi} from "vitest";

import {AboutHero} from "#/components/about/about-hero.tsx";
import {useHlsVideo} from "#/hooks/use-hls-video.ts";

vi.mock("#/hooks/use-hls-video.ts", () => ({useHlsVideo: vi.fn()}));

vi.mock("@tanstack/react-router", async () => {
  const React = await import("react");

  return {
    Link: ({children, className, to}: {readonly children: React.ReactNode; readonly className?: string; readonly to: string}) =>
      React.createElement("a", {className, href: to}, children),
  };
});

const PLACEHOLDER_STREAM = "https://storage.googleapis.com/shaka-demo-assets/angel-one-hls/hls.m3u8";

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

  it("streams the placeholder video", () => {
    render(<AboutHero />);

    expect(vi.mocked(useHlsVideo)).toHaveBeenCalledWith(expect.anything(), PLACEHOLDER_STREAM);
  });

  it("keeps the video out of the accessibility tree", () => {
    const {container} = render(<AboutHero />);

    expect(container.querySelector("video")).toHaveAttribute("aria-hidden", "true");
  });
});
