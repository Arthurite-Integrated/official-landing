import {Link} from "@tanstack/react-router";

import {PLACEHOLDER_STREAM} from "#/components/about/about-media.ts";
import {HeroVideo} from "#/components/layout/hero-video.tsx";

const PILL =
  "flex h-10 w-full items-center justify-center rounded-full px-6 text-base font-medium transition-colors duration-150 sm:w-auto md:h-12 md:px-8 md:text-lg";

export function AboutHero() {
  return (
    <section className="mx-auto max-w-6xl px-5 pt-32 pb-20 sm:px-8 md:pb-40 lg:pt-44 xl:max-w-7xl">
      <header>
        <div className="mx-auto mb-10 flex max-w-xl flex-col gap-8 text-center md:gap-10">
          <h1 className="mx-auto text-5xl leading-[1.02] font-medium tracking-tighter text-balance text-foreground sm:text-6xl lg:text-7xl">
            Build the future of cloud
          </h1>
          <p className="mx-auto text-lg leading-relaxed text-foreground/60 md:text-xl">
            We help businesses build and operate reliable cloud infrastructure on AWS, with a focus on performance, security, and cost
            efficiency.
          </p>
        </div>

        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link to="/contact" className={`${PILL} bg-primary text-white hover:bg-primary/90`}>
            Work with us
          </Link>
          <Link to="/careers" className={`${PILL} bg-foreground/5 text-foreground hover:bg-foreground/10`}>
            Join our team
          </Link>
        </div>
      </header>

      <div className="relative mt-20 aspect-video overflow-hidden rounded-xl bg-foreground/10 md:rounded-3xl">
        <HeroVideo src={PLACEHOLDER_STREAM} />
      </div>
    </section>
  );
}
