import type {LucideIcon} from "lucide-react";

import {WhyChooseUsCards, type WhyUsCard} from "#/components/layout/why-choose-us-cards.ts";

const WHY_US_TITLE_ID = "why-choose-us-title";

type WhyUsCardProps = {
  readonly card: WhyUsCard;
};

function WhyUsCard({card}: WhyUsCardProps) {
  const Icon = card.icon as LucideIcon;

  return (
    <article className="group relative isolate flex min-h-80 flex-col justify-between overflow-hidden rounded-3xl bg-[#f2f2f0] p-7 sm:p-9">
      <span className="grid size-12 place-items-center rounded-2xl bg-primary/10 text-primary">
        <Icon className="size-5" strokeWidth={1.75} aria-hidden />
      </span>

      <div className="mt-10">
        <h3 className="text-xl font-medium tracking-tight text-foreground sm:text-2xl">{card.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-foreground/75 sm:text-base">{card.description}</p>
      </div>
    </article>
  );
}

export function WhyChooseUs() {
  return (
    <section aria-labelledby={WHY_US_TITLE_ID} className="bg-background px-5 py-24 sm:px-8 lg:py-32">
      <div className="mx-auto max-w-6xl">
        <header className="mx-auto mb-14 max-w-2xl text-center lg:mb-20">
          <h2 id={WHY_US_TITLE_ID} className="text-4xl font-medium tracking-tight text-foreground sm:text-5xl">
            Why choose us?
          </h2>
          <p className="mt-5 text-base leading-relaxed text-foreground/70 sm:text-lg">
            We focus on practical cloud solutions that are secure, scalable, and built to support long-term growth.
          </p>
        </header>

        <ul className="grid gap-4 sm:grid-cols-2">
          {WhyChooseUsCards.map((card) => (
            <li key={card.title}>
              <WhyUsCard card={card} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
