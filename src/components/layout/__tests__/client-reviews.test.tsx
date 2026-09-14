import {fireEvent, render, screen} from "@testing-library/react";
import {describe, expect, it} from "vitest";

import {ClientReviewsContent} from "#/components/layout/client-reviews-content.ts";
import {ClientReviews} from "#/components/layout/client-reviews.tsx";

const {people, rows} = ClientReviewsContent;
const [firstClient, secondClient] = people;

describe("ClientReviews", () => {
  it("names the section after its heading", () => {
    render(<ClientReviews />);

    expect(screen.getByRole("region", {name: ClientReviewsContent.heading})).toBeInTheDocument();
  });

  it("labels the section with the client reviews eyebrow", () => {
    render(<ClientReviews />);

    expect(screen.getByText(ClientReviewsContent.eyebrow)).toBeInTheDocument();
  });

  it("gives every client a selectable avatar", () => {
    render(<ClientReviews />);

    expect(screen.getAllByRole("button")).toHaveLength(people.length);
  });

  it("fills the rest of the wall with decorative tiles", () => {
    const {container} = render(<ClientReviews />);
    const wallSize = rows.reduce((sum, count) => sum + count, 0);

    expect(container.querySelectorAll('[data-slot="review-filler"][aria-hidden="true"]')).toHaveLength(wallSize - people.length);
  });

  it("opens on the first client's review", () => {
    render(<ClientReviews />);

    expect(screen.getByRole("figure")).toHaveTextContent(firstClient.name);
  });

  it("marks the first client's avatar as selected", () => {
    render(<ClientReviews />);

    expect(screen.getByRole("button", {name: `Read ${firstClient.name}'s testimonial`})).toHaveAttribute("aria-pressed", "true");
  });

  it("shows another client's review when their avatar is chosen", () => {
    render(<ClientReviews />);
    fireEvent.click(screen.getByRole("button", {name: `Read ${secondClient.name}'s testimonial`}));

    expect(screen.getByRole("figure")).toHaveTextContent(secondClient.name);
  });

  it("keeps only the chosen avatar selected", () => {
    render(<ClientReviews />);
    fireEvent.click(screen.getByRole("button", {name: `Read ${secondClient.name}'s testimonial`}));

    expect(screen.getAllByRole("button", {pressed: true})).toHaveLength(1);
  });

  it("attributes the quote with the client's role", () => {
    render(<ClientReviews />);

    expect(screen.getByRole("figure")).toHaveTextContent(`/ ${firstClient.role}`);
  });
});
