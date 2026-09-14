import {cn} from "#/lib/utils.ts";

import type {SpotlightItem} from "#/components/layout/spotlight-items.ts";

type SpotlightCardProps = {
  readonly item: SpotlightItem;
};

function isExternalUrl(url: string): boolean {
  return url.startsWith("http://") || url.startsWith("https://");
}

export function SpotlightCard({item}: SpotlightCardProps) {
  const hasImage = item.image !== null;

  return (
    <article className="group relative isolate flex aspect-16/15 w-full flex-col justify-end overflow-hidden rounded-2xl border border-foreground/10 bg-[#f2f2f0] p-6 transition-colors duration-300 hover:border-primary/30">
      {hasImage ? (
        <>
          <img
            src={item.image}
            alt=""
            className="absolute inset-0 -z-10 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div aria-hidden className="absolute inset-0 -z-10 bg-linear-to-t from-foreground/90 via-foreground/40 to-transparent" />
        </>
      ) : (
        <div aria-hidden className="absolute inset-0 -z-10 bg-linear-to-br from-lagoon/10 via-foam to-foam" />
      )}

      <h3 className={cn("text-base font-medium leading-snug sm:text-lg", hasImage ? "text-white" : "text-foreground")}>
        {item.url === null ? (
          item.title
        ) : (
          <a
            href={item.url}
            target={isExternalUrl(item.url) ? "_blank" : undefined}
            rel={isExternalUrl(item.url) ? "noreferrer" : undefined}
            className="after:absolute after:inset-0"
          >
            {item.title}
          </a>
        )}
      </h3>
      <p className={cn("mt-2 text-sm", hasImage ? "text-white/70" : "text-foreground/60")}>{item.source}</p>
    </article>
  );
}
