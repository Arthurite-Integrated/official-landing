import {SpotlightCard} from "#/components/layout/spotlight-card.tsx";
import {SpotlightItems} from "#/components/layout/spotlight-items.ts";

const SPOTLIGHT_TITLE_ID = "in-the-spotlight-title";

export function InTheSpotlight() {
  return (
    <section aria-labelledby={SPOTLIGHT_TITLE_ID} className="bg-background px-5 py-24 sm:px-8 lg:py-32">
      <div className="mx-auto max-w-6xl xl:max-w-7xl">
        <header>
          <h2 id={SPOTLIGHT_TITLE_ID} className="text-2xl font-normal tracking-tight text-foreground sm:text-3xl">
            In the Spotlight
          </h2>
          <p className="mt-2 text-base text-foreground/70">From AWS to The Guardian, our cloud work is getting noticed.</p>
        </header>

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SpotlightItems.map((item) => (
            <li key={item.title}>
              <SpotlightCard item={item} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
