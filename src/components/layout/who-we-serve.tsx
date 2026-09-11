import {WhoWeServeCard} from "#/components/layout/who-we-serve-card.tsx";
import {IndustryItems} from "#/components/layout/who-we-serve-data.ts";

const SECTION_TITLE_ID = "who-we-serve-title";

function WhoWeServeHeader() {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-950/40 px-4 py-1.5 backdrop-blur-md">
        <span className="size-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_rgba(52,211,153,0.9)]" />
        <span className="text-xs font-semibold tracking-[0.24em] text-emerald-300 uppercase">Who We Serve</span>
      </div>

      <h2 id={SECTION_TITLE_ID} className="mt-6 text-4xl leading-[1.06] font-medium tracking-tight text-white sm:text-5xl lg:text-6xl">
        Who We Serve
      </h2>

      <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
        We help teams in different industries adapt and thrive with cloud systems tailored to their operations.
      </p>
    </div>
  );
}

export function WhoWeServe() {
  return (
    <section
      aria-labelledby={SECTION_TITLE_ID}
      className="relative isolate overflow-hidden px-5 py-24 sm:px-8 lg:py-32"
      style={{
        background:
          "radial-gradient(ellipse 90% 70% at 50% 20%, rgba(16,185,129,0.18) 0%, rgba(4,32,18,0.35) 50%, transparent 85%), radial-gradient(ellipse 60% 50% at 20% 80%, rgba(6,182,212,0.12) 0%, transparent 65%), #020905",
      }}
    >
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_80%)]"
      />

      <div className="relative z-10 mx-auto max-w-6xl xl:max-w-7xl">
        <WhoWeServeHeader />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3">
          {IndustryItems.map((item, index) => (
            <WhoWeServeCard key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
