export type ClientReview = {
  readonly avatar: string;
  readonly cell: number;
  readonly id: string;
  readonly name: string;
  readonly quote: string;
  readonly role: string;
};

const QUOTE =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

export const ClientReviewsContent = {
  eyebrow: "CLIENT REVIEWS",
  heading: "What our clients say about working with us.",
  map: {src: "/client-reviews/map.png"},
  // `cell` is the flat position in the wall grid (0-based, across the rows below). Tiles without a client stay decorative.
  people: [
    {
      id: "chiptech-1",
      name: "Chiptech solutions",
      role: "A tech driven company",
      quote: QUOTE,
      avatar: "https://placehold.co/125x140/006759/ffffff?text=CT",
      cell: 2,
    },
    {
      id: "client-2",
      name: "Client two",
      role: "A tech driven company",
      quote: QUOTE,
      avatar: "https://placehold.co/125x140/006759/ffffff?text=C2",
      cell: 5,
    },
    {
      id: "client-3",
      name: "Client three",
      role: "A tech driven company",
      quote: QUOTE,
      avatar: "https://placehold.co/125x140/006759/ffffff?text=C3",
      cell: 9,
    },
    {
      id: "client-4",
      name: "Client four",
      role: "A tech driven company",
      quote: QUOTE,
      avatar: "https://placehold.co/125x140/006759/ffffff?text=C4",
      cell: 13,
    },
    {
      id: "client-5",
      name: "Client five",
      role: "A tech driven company",
      quote: QUOTE,
      avatar: "https://placehold.co/125x140/006759/ffffff?text=C5",
      cell: 16,
    },
    {
      id: "client-6",
      name: "Client six",
      role: "A tech driven company",
      quote: QUOTE,
      avatar: "https://placehold.co/125x140/006759/ffffff?text=C6",
      cell: 20,
    },
    {
      id: "client-7",
      name: "Client seven",
      role: "A tech driven company",
      quote: QUOTE,
      avatar: "https://placehold.co/125x140/006759/ffffff?text=C7",
      cell: 23,
    },
    {
      id: "client-8",
      name: "Client eight",
      role: "A tech driven company",
      quote: QUOTE,
      avatar: "https://placehold.co/125x140/006759/ffffff?text=C8",
      cell: 26,
    },
  ],
  // Grid shape: tiles per row, top to bottom.
  rows: [6, 7, 8, 7],
} as const;
