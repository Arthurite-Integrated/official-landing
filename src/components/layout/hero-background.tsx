import {type ReactNode} from "react";

import {cn} from "@/lib/utils";
import {HeroVideo} from "#/components/layout/hero-video.tsx";
import {HERO_SCROLL_BOUNDARY_ID} from "#/hooks/use-navigation-tone.ts";

const HLS_VIDEO_URL = "/video/hero/index.m3u8";
const HERO_POSTER_URL = "/video/hero/poster.webp";

type HeroBackgroundProps = {
  readonly children: ReactNode;
  readonly className?: string;
};

export function HeroBackground({children, className}: HeroBackgroundProps) {
  return (
    <section className={cn("relative z-20 flex min-h-[92vh] w-full flex-col bg-sea-ink", className)}>
      <div aria-hidden className="absolute inset-0 overflow-hidden">
        <HeroVideo src={HLS_VIDEO_URL} poster={HERO_POSTER_URL} />
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.62)_0%,rgba(0,0,0,0.18)_38%,rgba(0,0,0,0.72)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(0,0,0,0.55)_100%)]" />
      </div>

      <div className="relative z-10 flex w-full flex-1 flex-col">{children}</div>

      <div id={HERO_SCROLL_BOUNDARY_ID} aria-hidden className="absolute inset-x-0 bottom-0 h-px" />
    </section>
  );
}
