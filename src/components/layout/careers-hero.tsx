import {ArrowRight} from "lucide-react";

function CareersHeroHeader() {
  return (
    <div className="relative z-10 mx-auto max-w-5xl text-center">
      <p className="text-xs font-semibold tracking-[0.28em] text-foreground/50 uppercase">Join Arthurite</p>

      <h1 className="mt-5 text-4xl leading-[1.06] font-medium tracking-tight text-foreground sm:text-6xl lg:text-7xl">Join Our Team</h1>

      <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-foreground/70 sm:text-xl">
        Be part of a growing cloud technology company building reliable, secure, and scalable infrastructure solutions in the AWS ecosystem.
      </p>

      <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
        <a
          href="#open-roles"
          className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20"
        >
          <span>View Open Roles</span>
          <ArrowRight className="size-4" aria-hidden="true" />
        </a>

        <a
          href="#atip-program"
          className="inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-foreground/5 px-7 py-3.5 text-sm font-semibold text-foreground backdrop-blur-md transition-all duration-200 hover:border-foreground/30 hover:bg-foreground/10"
        >
          Explore ATIP Internship
        </a>
      </div>
    </div>
  );
}

function CareersHeroVideo() {
  return (
    <div className="relative z-10 mx-auto mt-14 max-w-6xl overflow-hidden rounded-3xl border border-foreground/10 bg-[#f2f2f0] p-3 backdrop-blur-2xl sm:p-4">
      <div className="relative overflow-hidden rounded-2xl bg-neutral-900">
        <video autoPlay loop muted playsInline className="h-64 w-full object-cover sm:h-80 lg:h-[480px]">
          <source src="/services-hero.mp4" type="video/mp4" />
        </video>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      </div>
    </div>
  );
}

export function CareersHero() {
  return (
    <section className="relative isolate overflow-hidden bg-background px-5 pt-28 pb-20 sm:px-8 sm:pt-36 lg:pb-28">
      <CareersHeroHeader />
      <CareersHeroVideo />
    </section>
  );
}
