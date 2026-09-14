import type {LucideIcon} from "lucide-react";

import {WhyChooseUsCards, type WhyUsCard} from "#/components/layout/why-choose-us-cards.ts";

type WhyUsCardProps = {
  readonly card: WhyUsCard;
};

function WhyUsCard({card}: WhyUsCardProps) {
  const Icon = card.icon as LucideIcon;

  return (
    <article className="group relative isolate flex h-full min-h-80 w-80 flex-col justify-between overflow-hidden rounded-3xl bg-[#f2f2f0] p-7 sm:p-9">
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

type WhyChooseUsTrackProps = {
  readonly suffix: string;
  readonly isDuplicate?: boolean;
};

function WhyChooseUsTrack({suffix, isDuplicate}: WhyChooseUsTrackProps) {
  return (
    <>
      {WhyChooseUsCards.map((card) => (
        <li key={`${card.title}-${suffix}`} aria-hidden={isDuplicate}>
          <WhyUsCard card={card} />
        </li>
      ))}
    </>
  );
}

const WHY_US_TITLE_ID = "why-choose-us-title";

export function WhyChooseUs() {
  return (
    <section aria-labelledby={WHY_US_TITLE_ID} className="bg-background py-24 sm:py-32">
      <div className="mx-auto mb-14 max-w-6xl px-5 text-center sm:px-8 lg:mb-20">
        <h2 id={WHY_US_TITLE_ID} className="text-4xl font-medium tracking-tight text-foreground sm:text-5xl">
          Why choose us?
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-foreground/70 sm:text-lg">
          We focus on practical cloud solutions that are secure, scalable, and built to support long-term growth.
        </p>
      </div>

      <div className="why-choose-marquee flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_7%,#000_93%,transparent)]">
        <ul className="why-choose-marquee-track flex w-max gap-4">
          <WhyChooseUsTrack suffix="a" />
          <WhyChooseUsTrack suffix="b" isDuplicate />
          <WhyChooseUsTrack suffix="c" isDuplicate />
          <WhyChooseUsTrack suffix="d" isDuplicate />
        </ul>
      </div>
    </section>
  );
}
