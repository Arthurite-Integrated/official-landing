import {render} from "@testing-library/react";
import {describe, expect, it, vi} from "vite-plus/test";

import {HeroBackground} from "#/components/layout/hero-background.tsx";
import {HeroVideo} from "#/components/layout/hero-video.tsx";

const useHlsVideoMock = vi.fn();

vi.mock("#/hooks/use-hls-video.ts", () => ({
  useHlsVideo: (...args: unknown[]) => useHlsVideoMock(...args),
}));

describe("HeroVideo", () => {
  it("renders a muted loopable video with the provided poster and preload metadata", () => {
    const {container} = render(<HeroVideo src="/video/hero/index.m3u8" poster="/video/hero/poster.webp" />);
    const video = container.querySelector("video");

    expect(video).toHaveAttribute("poster", "/video/hero/poster.webp");
  });
});

describe("HeroBackground", () => {
  it("wires the local HLS hero stream and poster into HeroVideo", () => {
    const {container} = render(
      <HeroBackground>
        <span>Hero child</span>
      </HeroBackground>
    );
    const video = container.querySelector("video");

    expect(video).toHaveAttribute("poster", "/video/hero/poster.webp");
    expect(useHlsVideoMock).toHaveBeenCalledWith(expect.any(Object), "/video/hero/index.m3u8");
  });
});
