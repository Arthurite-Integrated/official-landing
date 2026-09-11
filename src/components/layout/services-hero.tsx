import {Link} from "@tanstack/react-router";
import {ArrowRight} from "lucide-react";

import {HERO_SCROLL_BOUNDARY_ID} from "#/hooks/use-navigation-tone.ts";

const HERO_TITLE_ID = "services-hero-title";

function ServicesHeroHeader() {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className="text-xs font-semibold tracking-[0.28em] text-white/50 uppercase">AWS Advanced Consulting Partner</p>

      <h1 id={HERO_TITLE_ID} className="mt-5 text-4xl leading-[1.06] font-medium tracking-tight text-white sm:text-5xl lg:text-6xl">
        Scalable, Reliable Cloud Services for African Businesses
      </h1>

      <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
        We design, migrate, and manage cloud infrastructure on AWS — so you can focus on building your business, not managing servers.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <Link
          to="/contact"
          className="inline-flex h-12 items-center gap-2 rounded-full bg-primary px-7 text-sm font-semibold text-primary-bg transition-colors hover:bg-primary/90"
        >
          Get Started
          <ArrowRight className="size-4" aria-hidden />
        </Link>
        <Link
          to="/about"
          className="inline-flex h-12 items-center rounded-full border border-white/25 px-7 text-sm font-semibold text-white transition-colors hover:bg-white/10"
        >
          Learn More About Us
        </Link>
      </div>
    </div>
  );
}

function ServicesHeroImage() {
  return (
    <div className="mx-auto mt-14 max-w-6xl lg:mt-20">
      <div className="overflow-hidden rounded-3xl shadow-[0_32px_80px_rgba(1,69,14,0.14)]">
        <video autoPlay loop muted playsInline className="h-64 w-full object-cover sm:h-80 lg:h-[480px]">
          <source src="/services-hero.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
  );
}

export function ServicesHero() {
  return (
    <section
      aria-labelledby={HERO_TITLE_ID}
      className="relative isolate overflow-hidden px-5 pb-20 pt-28 sm:px-8 sm:pb-28 lg:pb-36 lg:pt-36"
      style={{
        background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(15,84,47,0.55) 0%, rgba(4,22,12,0.30) 60%, transparent 85%), #020905",
      }}
    >
      <ServicesHeroHeader />
      <ServicesHeroImage />
      <div id={HERO_SCROLL_BOUNDARY_ID} aria-hidden className="absolute inset-x-0 bottom-0 h-px" />
    </section>
  );
}
