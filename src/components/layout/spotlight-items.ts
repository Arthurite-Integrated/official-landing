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
    image: "https://placehold.co/800x750/006759/ffffff?text=GenAI+Event",
    source: "GenAI event, Lagos",
    title: "We hosted Nigeria's first GenAI-focused event",
    url: "/events",
  },
  {
    image: "https://placehold.co/800x750/1f2022/ffffff?text=AWS",
    source: "AWS Marketing Central",
    title: "Our work is showcased as an AWS customer and partner example",
    url: "/services",
  },
  {
    image: "https://placehold.co/800x750/333333/ffffff?text=The+Guardian",
    source: "The Guardian",
    title: "Advancing cloud and AI conversations in Nigeria's tech ecosystem",
    url: "/blog",
  },
];
