import {ArrowRight, ChevronDown} from "lucide-react";

function CareersHeroHeader() {
  return (
    <div className="relative z-10 flex flex-col items-start text-left">
      <div className="inline-flex items-center rounded-lg border border-foreground/20 bg-background/80 px-3.5 py-1.5 text-xs font-semibold tracking-widest text-foreground uppercase backdrop-blur-md">
        OUR PURPOSE
      </div>

      <h1 className="mt-8 max-w-2xl text-5xl leading-[1.02] font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl xl:text-8xl">
        Join Our Team
      </h1>

      <p className="mt-6 max-w-xl text-base leading-relaxed text-foreground/75 sm:text-lg lg:text-xl">
        Be part of a growing cloud technology company building reliable, secure, and scalable infrastructure solutions in the AWS ecosystem.
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-4 sm:mt-10">
        <a
          href="#open-roles"
          className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5"
        >
          <span>View Open Roles</span>
          <ArrowRight className="size-4" aria-hidden="true" />
        </a>

        <a
          href="#atip-program"
          className="inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-background/80 px-7 py-3.5 text-sm font-semibold text-foreground backdrop-blur-md transition-all duration-300 hover:border-foreground/30 hover:bg-foreground/5 hover:-translate-y-0.5"
        >
          Explore ATIP Internship
        </a>
      </div>

      <div className="mt-16 hidden sm:block">
        <a
          href="#why-work-with-us"
          className="inline-flex items-center gap-2 text-xs font-medium tracking-wide text-foreground/50 transition-colors duration-200 hover:text-foreground"
        >
          <span>Scroll Down</span>
          <ChevronDown className="size-4 animate-bounce" aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}

export function CareersHero() {
  return (
    <section className="relative isolate min-h-[85vh] overflow-hidden bg-background px-5 pt-28 pb-20 sm:px-8 sm:pt-36 lg:flex lg:items-center lg:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 right-0 bottom-0 -z-10 w-full overflow-hidden select-none lg:w-[58%] xl:w-[62%]"
      >
        <div className="absolute top-0 right-0 h-full w-full">
          <img
            src="/images/careers-hero-helix-bg.png"
            alt=""
            className="h-full w-full object-cover object-right-top opacity-90 transition-transform duration-1000 ease-out hover:scale-105 dark:opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent lg:via-background/20" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background/50" />
        </div>
      </div>

      <div className="mx-auto w-full max-w-6xl xl:max-w-7xl">
        <div className="grid lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7 xl:col-span-6">
            <CareersHeroHeader />
          </div>
        </div>
      </div>
    </section>
  );
}
