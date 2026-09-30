import {fireEvent, render, screen} from "@testing-library/react";
import {describe, expect, it, vi} from "vite-plus/test";

import {NewsletterForm} from "#/components/newsletter/newsletter-form.tsx";

const COPY = {submitLabel: "Subscribe", successMessage: "You're on the list.", failureMessage: "Something went wrong."};

function submitEmail(value: string) {
  fireEvent.change(screen.getByLabelText(/email address/i), {target: {value}});
  fireEvent.click(screen.getByRole("button", {name: COPY.submitLabel}));
}

describe("NewsletterForm", () => {
  it("submits the trimmed email", async () => {
    const onSubmit = vi.fn(() => Promise.resolve());
    render(<NewsletterForm onSubmit={onSubmit} {...COPY} />);

    submitEmail("  ada@acme.com ");

    expect(await screen.findByText(COPY.successMessage)).toBeInTheDocument();
    expect(onSubmit).toHaveBeenCalledWith("ada@acme.com");
  });

  it("rejects an invalid email without submitting", () => {
    const onSubmit = vi.fn(() => Promise.resolve());
    render(<NewsletterForm onSubmit={onSubmit} {...COPY} />);

    submitEmail("not-an-email");

    expect(screen.getByRole("alert")).toHaveTextContent(/valid email/i);
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("explains when the submission fails", async () => {
    render(<NewsletterForm onSubmit={() => Promise.reject(new Error("boom"))} {...COPY} />);

    submitEmail("ada@acme.com");

    expect(await screen.findByRole("alert")).toHaveTextContent(COPY.failureMessage);
  });

  it("disables the button while sending", () => {
    render(<NewsletterForm onSubmit={() => new Promise(() => undefined)} {...COPY} />);

    submitEmail("ada@acme.com");

    expect(screen.getByRole("button", {name: /sending/i})).toBeDisabled();
  });
});
