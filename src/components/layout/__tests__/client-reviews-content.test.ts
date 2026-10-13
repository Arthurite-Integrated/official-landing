import fc from "fast-check";
import {describe, expect, it} from "vite-plus/test";

import {toClientReviews} from "#/components/layout/client-reviews-content.ts";
import type {ApiTestimonial} from "#/lib/api/types.ts";

const WALL_SIZE = 28;

const testimonial = (name: string, sortOrder: number): ApiTestimonial => ({
  id: `id-${sortOrder}`,
  name,
  role: `${name} role`,
  quote: `${name} quote`,
  sortOrder,
});

const testimonials = (count: number) => Array.from({length: count}, (_, index) => testimonial(`Client ${index}`, index));

describe("toClientReviews", () => {
  it("orders reviews by their dashboard sort order", () => {
    const reviews = toClientReviews([testimonial("Later", 5), testimonial("Earlier", 1)], WALL_SIZE);

    expect(reviews.map((review) => review.name)).toEqual(["Earlier", "Later"]);
  });

  it("derives initials from the client's name", () => {
    expect(toClientReviews([testimonial("Dr. Amaka O.", 0)], WALL_SIZE)[0]?.initials).toBe("DAO");
  });

  it("keeps the quote and role", () => {
    const [review] = toClientReviews([testimonial("Amina Y.", 0)], WALL_SIZE);

    expect(review).toMatchObject({quote: "Amina Y. quote", role: "Amina Y. role"});
  });

  it("shows no more reviews than the wall has tiles", () => {
    expect(toClientReviews(testimonials(WALL_SIZE + 4), WALL_SIZE)).toHaveLength(WALL_SIZE);
  });

  it("places every review on its own tile inside the wall", () => {
    fc.assert(
      fc.property(fc.integer({min: 1, max: WALL_SIZE}), (count) => {
        const cells = toClientReviews(testimonials(count), WALL_SIZE).map((review) => review.cell);

        expect(new Set(cells).size).toBe(count);
        expect(cells.every((cell) => cell >= 0 && cell < WALL_SIZE)).toBe(true);
      })
    );
  });
});
