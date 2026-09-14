export type SpotlightItem = {
  /** Path under `public/`, e.g. "/spotlight/guardian.jpg". Null shows the branded panel instead. */
  readonly image: string | null;
  readonly source: string;
  readonly title: string;
  /** Link to the article or page. Null keeps the card unlinked. */
  readonly url: string | null;
};

export const SpotlightItems: readonly SpotlightItem[] = [
  {
    image: null,
    source: "GenAI event, Lagos",
    title: "We hosted Nigeria's first GenAI-focused event",
    url: null,
  },
  {
    image: null,
    source: "AWS Marketing Central",
    title: "Our work is showcased as an AWS customer and partner example",
    url: null,
  },
  {
    image: null,
    source: "The Guardian",
    title: "Advancing cloud and AI conversations in Nigeria's tech ecosystem",
    url: null,
  },
];
