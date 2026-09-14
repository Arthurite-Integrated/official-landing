import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import {afterEach, describe, expect, it, vi} from "vitest";

import {ContactPage} from "#/components/contact/contact-page.tsx";
import {CONTACT_EMAIL} from "#/components/layout/footer-content.ts";

describe("ContactPage", () => {
  afterEach(() => {
    Reflect.deleteProperty(navigator, "clipboard");
  });

  it("introduces the page with a heading", () => {
    render(<ContactPage />);

    expect(screen.getByRole("heading", {level: 1})).toHaveTextContent(/let's talk cloud/i);
  });

  it("shows the contact form", () => {
    render(<ContactPage />);

    expect(screen.getByRole("form", {name: /contact our team/i})).toBeInTheDocument();
  });

  it("links the support email", () => {
    render(<ContactPage />);

    expect(screen.getByRole("link", {name: CONTACT_EMAIL})).toHaveAttribute("href", `mailto:${CONTACT_EMAIL}`);
  });

  it("copies the support email", async () => {
    const writeText = vi.fn(() => Promise.resolve());
    Object.defineProperty(navigator, "clipboard", {configurable: true, value: {writeText}});

    render(<ContactPage />);
    fireEvent.click(screen.getByRole("button", {name: /copy email/i}));

    await waitFor(() => expect(screen.getByRole("button", {name: /copied/i})).toBeInTheDocument());
    expect(writeText).toHaveBeenCalledWith(CONTACT_EMAIL);
  });

  it("confirms once the email is copied", async () => {
    Object.defineProperty(navigator, "clipboard", {configurable: true, value: {writeText: () => Promise.resolve()}});

    render(<ContactPage />);
    fireEvent.click(screen.getByRole("button", {name: /copy email/i}));

    expect(await screen.findByRole("button", {name: /copied/i})).toBeInTheDocument();
  });

  it("shows the teams that trust us", () => {
    render(<ContactPage />);

    expect(screen.getByText("The teams that can't afford downtime build with us.")).toBeInTheDocument();
  });
});
