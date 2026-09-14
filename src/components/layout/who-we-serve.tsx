import {WhoWeServeCard} from "#/components/layout/who-we-serve-card.tsx";
import {IndustryItems} from "#/components/layout/who-we-serve-data.ts";

const SECTION_TITLE_ID = "who-we-serve-title";

function WhoWeServeHeader() {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <h2 id={SECTION_TITLE_ID} className="text-4xl leading-[1.06] font-medium tracking-tight text-foreground sm:text-5xl lg:text-6xl">
        Who We Serve
      </h2>

      <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-foreground/70 sm:text-lg">
        We help teams in different industries adapt and thrive with cloud systems tailored to their operations.
      </p>
    </div>
  );
}

export function WhoWeServe() {
  return (
    <section aria-labelledby={SECTION_TITLE_ID} className="relative isolate overflow-hidden bg-background px-5 py-24 sm:px-8 lg:py-32">
      <div className="mx-auto max-w-6xl xl:max-w-7xl">
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
