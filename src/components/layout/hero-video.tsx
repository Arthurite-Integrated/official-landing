import {useRef} from "react";

import {cn} from "@/lib/utils";
import {useHlsVideo} from "#/hooks/use-hls-video.ts";

type HeroVideoProps = {
  readonly src: string;
  readonly poster?: string;
  readonly className?: string;
};

export function HeroVideo({src, poster, className}: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useHlsVideo(videoRef, src);

  return (
    <video
      ref={videoRef}
      poster={poster}
      preload="none"
      aria-hidden
      autoPlay
      loop
      muted
      playsInline
      tabIndex={-1}
      className={cn("absolute inset-0 size-full object-cover", className)}
    />
  );
}
