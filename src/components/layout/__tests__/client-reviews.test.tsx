import {fireEvent, screen} from "@testing-library/react";
import {afterEach, beforeEach, describe, expect, it, vi} from "vite-plus/test";

import {ClientReviewsContent} from "#/components/layout/client-reviews-content.ts";
import {ClientReviews} from "#/components/layout/client-reviews.tsx";
import type {ApiTestimonial} from "#/lib/api/types.ts";
import {renderWithQueryClient} from "#/test-utils/query-client.tsx";

const testimonial = (name: string, sortOrder: number): ApiTestimonial => ({
  id: `testimonial-${sortOrder}`,
  name,
  role: `${name} role`,
  quote: `${name} enjoyed working with Arthurite.`,
  sortOrder,
});

const firstClient = testimonial("Dr. Amaka O.", 0);
const secondClient = testimonial("Emmanuel K.", 1);
const TESTIMONIALS = [secondClient, firstClient];

const testimonialsResponse = () =>
  new Response(JSON.stringify({success: true, data: {items: TESTIMONIALS, pagination: {limit: 100, nextCursor: null}}}), {status: 200});

async function renderReviews() {
  const view = renderWithQueryClient(<ClientReviews />);
  await screen.findByRole("figure");
  return view;
}

function avatarOf(client: ApiTestimonial) {
  return screen.getByRole("button", {name: `Read ${client.name}'s testimonial`});
}

describe("ClientReviews", () => {
  beforeEach(() => {
    vi.stubEnv("VITE_API_BASE_URL", "https://api.arthurite.test");
    vi.stubGlobal(
      "fetch",
      vi.fn(() => Promise.resolve(testimonialsResponse()))
    );
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it("names the section after its heading", async () => {
    await renderReviews();

    expect(screen.getByRole("region", {name: ClientReviewsContent.heading})).toBeInTheDocument();
  });

  it("labels the section with the client reviews eyebrow", async () => {
    await renderReviews();

    expect(screen.getByText(ClientReviewsContent.eyebrow)).toBeInTheDocument();
  });

  it("shows a loading state while the reviews are fetched", () => {
    renderWithQueryClient(<ClientReviews />);

    expect(screen.getByLabelText("Loading client reviews")).toBeInTheDocument();
  });

  it("explains when the reviews cannot be loaded", async () => {
    vi.mocked(fetch).mockRejectedValue(new Error("offline"));
    renderWithQueryClient(<ClientReviews />);

    expect(await screen.findByRole("alert", {}, {timeout: 3000})).toHaveTextContent(/couldn't load client reviews/i);
  });

  it("gives every client a selectable avatar", async () => {
    await renderReviews();

    expect(screen.getAllByRole("button")).toHaveLength(TESTIMONIALS.length);
  });

  it("shows the client's initials on their avatar", async () => {
    await renderReviews();

    expect(avatarOf(firstClient)).toHaveTextContent("DAO");
  });

  it("fills the rest of the wall with decorative tiles", async () => {
    const {container} = await renderReviews();
    const wallSize = ClientReviewsContent.rows.reduce((sum, count) => sum + count, 0);

    expect(container.querySelectorAll('[data-slot="review-filler"][aria-hidden="true"]')).toHaveLength(wallSize - TESTIMONIALS.length);
  });

  it("opens on the review with the lowest sort order", async () => {
    await renderReviews();

    expect(screen.getByRole("figure")).toHaveTextContent(firstClient.name);
  });

  it("marks the first client's avatar as selected", async () => {
    await renderReviews();

    expect(avatarOf(firstClient)).toHaveAttribute("aria-pressed", "true");
  });

  it("shows another client's review when their avatar is chosen", async () => {
    await renderReviews();
    fireEvent.click(avatarOf(secondClient));

    expect(screen.getByRole("figure")).toHaveTextContent(secondClient.quote);
  });

  it("keeps only the chosen avatar selected", async () => {
    await renderReviews();
    fireEvent.click(avatarOf(secondClient));

    expect(screen.getAllByRole("button", {pressed: true})).toHaveLength(1);
  });

  it("attributes the quote with the client's role", async () => {
    await renderReviews();

    expect(screen.getByRole("figure")).toHaveTextContent(`/ ${firstClient.role}`);
  });
});
