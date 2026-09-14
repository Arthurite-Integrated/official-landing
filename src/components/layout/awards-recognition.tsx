type Award = {
  readonly year: string;
  readonly description: string;
  readonly award: string;
};

const AWARDS: readonly Award[] = [
  {
    year: "2025",
    description: "Community impact during the Cloud & AI Training across 6 geographical zones.",
    award: "NDE Award of Recognition",
  },
  {
    year: "2025",
    description: "AWS recognized Arthurite for excellence in the use of the market central too.",
    award: "AWS Marketing Central Recognition",
  },
  {
    year: "2026",
    description: "Leading AWS partner that supports SMBs within Nigeria.",
    award: "SMB Community Recognition",
  },
  {
    year: "2024",
    description: "Community impact during the Cloud & AI Training across 6 geographical zones.",
    award: "NDE Award of Recognition",
  },
];

const AWARDS_TITLE_ID = "awards-and-recognition-title";

export function AwardsAndRecognition() {
  return (
    <section aria-labelledby={AWARDS_TITLE_ID} className="bg-background px-5 py-24 sm:px-8 lg:py-32">
      <div className="mx-auto max-w-6xl xl:max-w-7xl">
        <header className="mx-auto mb-14 max-w-3xl text-center lg:mb-20">
          <h2 id={AWARDS_TITLE_ID} className="text-4xl font-medium tracking-tight text-foreground sm:text-5xl">
            Awards & Recognition
          </h2>
          <p className="mt-5 text-base leading-relaxed text-foreground/70 sm:text-lg">
            Celebrating milestones, industry recognition, and awards that reflect our expertise in cloud infrastructure and innovation.
          </p>
        </header>

        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {AWARDS.map((item) => (
            <li
              key={`${item.year}-${item.award}`}
              className="flex min-h-[22rem] flex-col justify-between rounded-2xl border border-foreground/10 bg-white p-7 sm:min-h-[24rem]"
            >
              <p className="text-3xl font-medium tracking-tight text-foreground">{item.year}</p>
              <p className="mt-6 text-base leading-snug text-foreground/80">{item.description}</p>
              <p className="mt-auto pt-8 text-right text-lg font-medium text-foreground/90">{item.award}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
