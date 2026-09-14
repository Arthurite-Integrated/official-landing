import type {SpotlightItem} from "#/components/layout/spotlight-items.ts";

type SpotlightCardProps = {
  readonly item: SpotlightItem;
};

export function SpotlightCard({item}: SpotlightCardProps) {
  return (
    <article className="group relative isolate flex aspect-16/15 w-full flex-col justify-end overflow-hidden rounded-2xl border border-foreground/10 bg-[#f2f2f0] p-6 transition-colors duration-300 hover:border-primary/30">
      {item.image === null ? (
        <div aria-hidden className="absolute inset-0 -z-10 bg-linear-to-br from-lagoon/10 via-foam to-foam" />
      ) : (
        <img
          src={item.image}
          alt=""
          className="absolute inset-0 -z-10 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      )}

      {item.image !== null ? (
        <div aria-hidden className="absolute inset-0 -z-10 bg-linear-to-t from-foreground/90 via-foreground/40 to-transparent" />
      ) : null}

      <h3 className="text-base leading-snug text-foreground sm:text-lg">
        {item.url === null ? (
          item.title
        ) : (
          <a href={item.url} target="_blank" rel="noreferrer" className="after:absolute after:inset-0">
            {item.title}
          </a>
        )}
      </h3>
      <p className="mt-2 text-sm text-foreground/60">{item.source}</p>
    </article>
  );
}
