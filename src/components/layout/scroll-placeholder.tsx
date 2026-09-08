const PLACEHOLDER_CARDS = ["Migration strategy workshop", "Platform modernization sprint", "Managed cloud operations"];

export function ScrollPlaceholder() {
  return (
    <section className="px-6 py-24 sm:px-10 sm:py-32">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-12">
        <div className="max-w-3xl space-y-4">
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-primary/60">Placeholder section</p>
          <h2 className="font-[Fraunces] text-4xl leading-tight text-primary sm:text-6xl">
            Scroll this section to confirm the navigation swaps from hero mode to the primary header.
          </h2>
          <p className="max-w-2xl text-base leading-7 text-primary/72 sm:text-lg">
            This block is intentionally oversized while we fine-tune the page flow. Once the rest of the homepage sections are ready, we can
            replace it with the real content.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {PLACEHOLDER_CARDS.map((card) => (
            <article
              key={card}
              className="rounded-4xl border border-primary/12 bg-white/70 p-8 shadow-[0_24px_70px_-50px_rgba(1,69,14,0.45)]"
            >
              <p className="text-sm font-medium uppercase tracking-[0.22em] text-primary/45">Placeholder card</p>
              <p className="mt-8 font-[Fraunces] text-3xl leading-tight text-primary">{card}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
