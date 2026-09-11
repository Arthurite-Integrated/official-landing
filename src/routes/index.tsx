import {createFileRoute} from "@tanstack/react-router";

import {HeroBackground} from "#/components/layout/hero-background.tsx";
import {CoreAwsServices} from "#/components/layout/core-aws-services.tsx";
import {HomeHero} from "#/components/layout/home-hero.tsx";
import {HowWeWork} from "#/components/layout/how-we-work.tsx";
import {PartnerMarquee} from "#/components/layout/partner-marquee.tsx";
import {ProjectCarousel} from "#/components/layout/project-carousel.tsx";
import {WhatWeDo} from "#/components/layout/what-we-do.tsx";
import {Projects} from "#/lib/projects.ts";
import AdvancedPartnerBadge from "../assets/advance-partner-badge.png";

const PROJECTS_TITLE_ID = "selected-work-title";

export const Route = createFileRoute("/")({component: App});

function App() {
  return (
    <main>
      <HeroBackground>
        <HomeHero />
      </HeroBackground>
      <div className={`h-124 lg:h-200 flex items-center justify-center relative`}>
        <p className={`mx-auto px-5 max-w-7xl lg:w-4/5 text-center text-xl lg:text-5xl font-bold tracking-wider`}>
          We help businesses build and operate reliable cloud infrastructure. We focus on performance, security, and cost efficiency.
        </p>
        <div className={`absolute bottom-10 right-5 lg:right-10`}>
          <img src={AdvancedPartnerBadge} alt="Advanced partner badge" className={`w-25 h-25 lg:w-50 lg:h-50`} />
        </div>
      </div>
      <PartnerMarquee />
      <WhatWeDo />
      <section aria-labelledby={PROJECTS_TITLE_ID} className="px-5 py-24 sm:px-8 lg:py-32">
        <div className="mx-auto max-w-6xl xl:max-w-7xl">
          <header className="max-w-xl">
            <h2 id={PROJECTS_TITLE_ID} className="text-4xl leading-[1.06] font-medium tracking-tight text-primary sm:text-5xl">
              Selected work
            </h2>
            <p className="mt-5 text-base leading-relaxed text-primary/70 sm:text-lg">
              A look at the cloud infrastructure and custom solutions we have delivered for teams across industries.
            </p>
          </header>

          <div className="mt-14 lg:mt-20">
            <ProjectCarousel projects={Projects} />
          </div>
        </div>
      </section>
      <HowWeWork />
      <CoreAwsServices />
    </main>
  );
}
