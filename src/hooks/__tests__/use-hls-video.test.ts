import {renderHook} from "@testing-library/react";
import {createRef} from "react";
import {beforeEach, describe, expect, it, vi} from "vitest";

import {useHlsVideo} from "#/hooks/use-hls-video.ts";

const SRC = "https://example.test/stream.m3u8";

const hlsInstance = {
  attachMedia: vi.fn(),
  destroy: vi.fn(),
  loadSource: vi.fn(),
  on: vi.fn(),
  once: vi.fn(),
};

vi.mock("hls.js", () => ({
  default: Object.assign(
    function HlsMock() {
      return hlsInstance;
    },
    {Events: {MANIFEST_PARSED: "hlsManifestParsed"}, isSupported: () => true}
  ),
}));

function createVideo(nativeSupport: string) {
  const video = document.createElement("video");
  video.canPlayType = vi.fn(() => nativeSupport) as HTMLVideoElement["canPlayType"];
  video.play = vi.fn(() => Promise.resolve());
  return video;
}

function renderWithVideo(video: HTMLVideoElement) {
  const ref = createRef<HTMLVideoElement>();
  Object.assign(ref, {current: video});
  return renderHook(() => useHlsVideo(ref, SRC));
}

describe("useHlsVideo", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("plays through the native player when the browser supports HLS", () => {
    const video = createVideo("maybe");

    renderWithVideo(video);

    expect(video.src).toBe(SRC);
  });

  it("does not load hls.js when the browser supports HLS natively", () => {
    const video = createVideo("maybe");

    renderWithVideo(video);

    expect(hlsInstance.loadSource).not.toHaveBeenCalled();
  });

  it("falls back to hls.js when the browser lacks native HLS", async () => {
    const video = createVideo("");

    renderWithVideo(video);
    await vi.waitFor(() => expect(hlsInstance.loadSource).toHaveBeenCalledWith(SRC));

    expect(hlsInstance.attachMedia).toHaveBeenCalledWith(video);
  });

  it("tears down the hls.js instance on unmount", async () => {
    const video = createVideo("");

    const {unmount} = renderWithVideo(video);
    await vi.waitFor(() => expect(hlsInstance.loadSource).toHaveBeenCalled());
    unmount();

    expect(hlsInstance.destroy).toHaveBeenCalled();
  });

  it("does nothing when the video element is missing", () => {
    const ref = createRef<HTMLVideoElement>();

    renderHook(() => useHlsVideo(ref, SRC));

    expect(hlsInstance.loadSource).not.toHaveBeenCalled();
  });
});
