import type {ApiTestimonial} from "#/lib/api/types.ts";
import {initialsOf} from "#/lib/initials.ts";

export type ClientReview = {
  /** Flat position in the wall grid (0-based, across all rows). */
  readonly cell: number;
  readonly id: string;
  readonly initials: string;
  readonly name: string;
  readonly quote: string;
  readonly role: string;
};

export const ClientReviewsContent = {
  eyebrow: "CLIENT REVIEWS",
  heading: "What our clients say about working with us.",
  map: {src: "/client-reviews/map.png"},
  // Grid shape: tiles per row, top to bottom.
  rows: [6, 7, 8, 7],
} as const;

export const WALL_SIZE = ClientReviewsContent.rows.reduce((sum, count) => sum + count, 0);

/** Spreads reviews evenly across the wall, so dashboard additions keep the honeycomb balanced. */
function spreadCell(index: number, count: number, wallSize: number): number {
  return Math.floor(((index + 0.5) * wallSize) / count);
}

export function toClientReviews(testimonials: readonly ApiTestimonial[], wallSize: number): readonly ClientReview[] {
  const shown = [...testimonials].sort((a, b) => a.sortOrder - b.sortOrder).slice(0, wallSize);

  return shown.map((testimonial, index) => ({
    cell: spreadCell(index, shown.length, wallSize),
    id: testimonial.id,
    initials: initialsOf(testimonial.name),
    name: testimonial.name,
    quote: testimonial.quote,
    role: testimonial.role,
  }));
}
