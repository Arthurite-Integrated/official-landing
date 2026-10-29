import type {ApiSpotlight} from "#/lib/api/types.ts";

import type {SpotlightItem} from "#/components/layout/spotlight-card.tsx";

export function toSpotlightItems(items: readonly ApiSpotlight[]): readonly SpotlightItem[] {
  return [...items]
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map((item) => ({image: item.coverImage, source: item.source, title: item.title, url: item.url ?? null}));
}
