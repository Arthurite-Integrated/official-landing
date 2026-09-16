import {HERO_SCROLL_BOUNDARY_ID} from "#/hooks/use-navigation-tone.ts";
import {EVENT_INFO} from "#/components/events/events-data.ts";

function HeroTextOverlay() {
  return (
    <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-[#0a1418] via-[#0a1418]/90 to-transparent p-6 sm:p-12 lg:p-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-col items-center justify-between gap-4 border-t border-white/15 pt-6 text-center text-xs font-semibold tracking-wider text-slate-300 uppercase md:flex-row md:text-left sm:text-sm">
          <span>{EVENT_INFO.dates}</span>
          <span className="hidden h-1.5 w-1.5 rounded-full bg-teal-400 md:inline-block" />
          <span className="max-w-md text-slate-200">{EVENT_INFO.tagline}</span>
          <span className="hidden h-1.5 w-1.5 rounded-full bg-teal-400 md:inline-block" />
          <span>{EVENT_INFO.location}</span>
        </div>

        <div>
          <h1 className="flex flex-wrap items-baseline gap-x-4 text-4xl font-black tracking-tight uppercase sm:text-6xl lg:text-8xl">
            <span className="bg-gradient-to-r from-white via-slate-100 to-slate-200 bg-clip-text text-transparent">{EVENT_INFO.title}</span>
            <span className="bg-gradient-to-r from-teal-400 via-emerald-300 to-teal-200 bg-clip-text text-transparent underline decoration-teal-500/50 decoration-wavy">
              {EVENT_INFO.subtitle}
            </span>
          </h1>
        </div>
      </div>
    </div>
  );
}

export function EventsHero() {
  return (
    <header className="relative w-full overflow-hidden bg-[#0a1418]">
      <div className="relative h-[95vh] min-h-[650px] max-h-[950px] w-full overflow-hidden bg-[#0a1418]">
        <img
          src="/images/events/green-liquid-metal.png"
          alt="Green Liquid Metallic Abstract Background"
          className="absolute inset-0 h-full w-full object-cover object-center opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1418]/40 via-transparent to-[#0a1418]" />
        <HeroTextOverlay />
      </div>
      <div id={HERO_SCROLL_BOUNDARY_ID} className="h-0 w-full" />
    </header>
  );
}
