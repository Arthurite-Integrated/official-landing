import {BentoCard} from "#/components/layout/bento-card.tsx";
import {WhatWeDoCards} from "#/components/layout/what-we-do-cards.ts";

const SECTION_TITLE_ID = "what-we-do-title";

export function WhatWeDo() {
  return (
    <section aria-labelledby={SECTION_TITLE_ID} className="relative isolate overflow-hidden bg-[#04160c] px-5 py-24 sm:px-8 lg:py-32">
      <div
        aria-hidden
        className="absolute -top-40 left-1/2 -z-10 h-96 w-[46rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(79,184,178,0.22),transparent)] blur-2xl"
      />

      <div className="mx-auto max-w-6xl">
        <header className="max-w-2xl">
          <p className="text-xs font-semibold tracking-[0.28em] text-white/45 uppercase">What we do</p>
          <h2 id={SECTION_TITLE_ID} className="mt-5 text-4xl leading-[1.06] font-medium tracking-tight text-white sm:text-5xl">
            One partner for the whole cloud lifecycle.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-white/60 sm:text-lg">
            Eight practices that cover the work end to end — designing the foundation, moving what you already run, and keeping it fast,
            secure and affordable once it is live.
          </p>
        </header>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:auto-rows-[12rem] lg:grid-flow-row-dense lg:grid-cols-3">
          {WhatWeDoCards.map((card) => (
            <BentoCard key={card.title} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}
