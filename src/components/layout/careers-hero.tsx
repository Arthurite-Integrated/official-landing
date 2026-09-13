import {ArrowRight} from "lucide-react";

function CareersHeroHeader() {
  return (
    <div className="relative z-10 mx-auto max-w-5xl text-center">
      <p className="text-xs font-semibold tracking-[0.28em] text-white/50 uppercase">Join Arthurite</p>

      <h1 className="mt-5 text-4xl leading-[1.06] font-medium tracking-tight text-white sm:text-6xl lg:text-7xl">Join Our Team</h1>

      <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/70 sm:text-xl">
        Be part of a growing cloud technology company building reliable, secure, and scalable infrastructure solutions in the AWS ecosystem.
      </p>

      <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
        <a
          href="#open-roles"
          className="inline-flex items-center gap-2 rounded-full bg-emerald-400 px-7 py-3.5 text-sm font-semibold text-black transition-all duration-200 hover:bg-emerald-300 hover:shadow-lg hover:shadow-emerald-400/20"
        >
          <span>View Open Roles</span>
          <ArrowRight className="size-4" aria-hidden="true" />
        </a>

        <a
          href="#atip-program"
          className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition-all duration-200 hover:border-white/40 hover:bg-white/10"
        >
          Explore ATIP Internship
        </a>
      </div>
    </div>
  );
}

function CareersHeroVideo() {
  return (
    <div className="relative z-10 mx-auto mt-14 max-w-6xl overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-3 backdrop-blur-2xl sm:p-4">
      <div className="relative overflow-hidden rounded-2xl bg-neutral-900">
        <video autoPlay loop muted playsInline className="h-64 w-full object-cover sm:h-80 lg:h-[480px]">
          <source src="/services-hero.mp4" type="video/mp4" />
        </video>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
      </div>
    </div>
  );
}

export function CareersHero() {
  return (
    <section className="relative isolate overflow-hidden bg-black px-5 pt-28 pb-20 sm:px-8 sm:pt-36 lg:pb-28">
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_10%,rgba(16,185,129,0.18),transparent_80%)]"
      />
      <CareersHeroHeader />
      <CareersHeroVideo />
    </section>
  );
}
