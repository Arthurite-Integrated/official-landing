import {useEffect, type RefObject} from "react";

const NATIVE_HLS_MIME = "application/vnd.apple.mpegurl";

/** Start ABR optimistically so the hero does not open on the lowest rendition. */
const INITIAL_BANDWIDTH_ESTIMATE = 5_000_000;

export function useHlsVideo(videoRef: RefObject<HTMLVideoElement | null>, src: string) {
  useEffect(() => {
    const video = videoRef.current;
    if (video === null) return;

    const play = () => void video.play().catch(() => {});

    if (video.canPlayType(NATIVE_HLS_MIME) !== "") {
      video.src = src;
      play();
      return;
    }

    let player: {destroy: () => void} | undefined;
    let cancelled = false;

    void import("hls.js").then(({default: Hls}) => {
      if (cancelled || !Hls.isSupported()) return;

      const instance = new Hls({
        enableWorker: true,
        capLevelToPlayerSize: true,
        abrEwmaDefaultEstimate: INITIAL_BANDWIDTH_ESTIMATE,
      });

      instance.on(Hls.Events.MANIFEST_PARSED, play);
      instance.attachMedia(video);
      instance.loadSource(src);
      player = instance;
    });

    return () => {
      cancelled = true;
      player?.destroy();
    };
  }, [src, videoRef]);
}
