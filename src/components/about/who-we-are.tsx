import {PLACEHOLDER_STREAM} from "#/components/about/about-media.ts";
import {WhoWeAreCapabilities} from "#/components/about/who-we-are-capabilities.tsx";
import {WhoWeAreContent} from "#/components/about/who-we-are-content.ts";
import {HeroVideo} from "#/components/layout/hero-video.tsx";

const WHO_WE_ARE_TITLE_ID = "who-we-are-title";

export function WhoWeAre() {
  const {capabilities, closing, heading, lede, subheading} = WhoWeAreContent;

  return (
    <section aria-labelledby={WHO_WE_ARE_TITLE_ID} className="bg-background px-5 pb-24 sm:px-8 lg:pb-32">
      <div className="mx-auto max-w-6xl xl:max-w-7xl">
        <header className="mb-12 max-w-2xl lg:mb-16">
          <h2 id={WHO_WE_ARE_TITLE_ID} className="text-4xl font-medium tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            {heading}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-balance text-foreground/70 sm:text-lg">{subheading}</p>
        </header>

        <div className="rounded-[2rem] bg-[#f2f2f0] p-2 sm:p-3 lg:rounded-[2.5rem] lg:p-4">
          <div className="relative aspect-video overflow-hidden rounded-3xl bg-primary lg:aspect-21/9 lg:rounded-[2rem]">
            <HeroVideo src={PLACEHOLDER_STREAM} />
            <div aria-hidden className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent" />
          </div>

          <div className="grid gap-10 px-4 pt-10 pb-6 sm:px-8 lg:grid-cols-12 lg:gap-16 lg:px-12 lg:pt-14 lg:pb-10">
            <p className="text-2xl leading-snug font-medium tracking-tight text-foreground sm:text-3xl lg:col-span-5">{lede}</p>

            <WhoWeAreCapabilities capabilities={capabilities} className="lg:col-span-7" />

            <p className="border-t border-foreground/10 pt-10 text-3xl leading-[1.15] font-medium tracking-tight text-balance text-foreground sm:text-4xl lg:col-span-12 lg:pt-12">
              <span className="text-foreground/35">{closing.lead}</span> {closing.statement}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
