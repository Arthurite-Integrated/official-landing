import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import {describe, expect, it, vi} from "vitest";

import {ContactForm} from "#/components/contact/contact-form.tsx";
import {COMPANY_SIZES} from "#/lib/contact-request.ts";

const FIELD_LABELS = [/first name/i, /last name/i, /work email/i, /phone/i, /job title/i, /company name/i, /company size/i, /message/i];

function fillCompleteRequest() {
  fireEvent.change(screen.getByLabelText(/first name/i), {target: {value: "Ada"}});
  fireEvent.change(screen.getByLabelText(/last name/i), {target: {value: "Okafor"}});
  fireEvent.change(screen.getByLabelText(/work email/i), {target: {value: "ada@acme.com"}});
  fireEvent.change(screen.getByLabelText(/job title/i), {target: {value: "CTO"}});
  fireEvent.change(screen.getByLabelText(/company name/i), {target: {value: "Acme Logistics"}});
  fireEvent.change(screen.getByLabelText(/company size/i), {target: {value: "51-200"}});
  fireEvent.change(screen.getByLabelText(/message/i), {target: {value: "We want to migrate to AWS."}});
}

function submit() {
  fireEvent.click(screen.getByRole("button", {name: /submit/i}));
}

describe("ContactForm", () => {
  it("labels every field", () => {
    render(<ContactForm onSubmit={vi.fn()} />);

    for (const label of FIELD_LABELS) {
      expect(screen.getByLabelText(label)).toBeInTheDocument();
    }
  });

  it("offers every company size", () => {
    render(<ContactForm onSubmit={vi.fn()} />);

    for (const size of COMPANY_SIZES) {
      expect(screen.getByRole("option", {name: size})).toBeInTheDocument();
    }
  });

  it("explains what is missing when submitted empty", () => {
    render(<ContactForm onSubmit={vi.fn()} />);
    submit();

    expect(screen.getByText("Enter your first name")).toBeInTheDocument();
  });

  it("flags invalid fields for assistive technology", () => {
    render(<ContactForm onSubmit={vi.fn()} />);
    submit();

    expect(screen.getByLabelText(/first name/i)).toHaveAttribute("aria-invalid", "true");
  });

  it("does not send an incomplete request", () => {
    const onSubmit = vi.fn();

    render(<ContactForm onSubmit={onSubmit} />);
    submit();

    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("sends the completed request", async () => {
    const onSubmit = vi.fn(() => Promise.resolve());

    render(<ContactForm onSubmit={onSubmit} />);
    fillCompleteRequest();
    submit();

    await waitFor(() =>
      expect(onSubmit).toHaveBeenCalledWith({
        company: "Acme Logistics",
        companySize: "51-200",
        email: "ada@acme.com",
        firstName: "Ada",
        jobTitle: "CTO",
        lastName: "Okafor",
        message: "We want to migrate to AWS.",
        phone: "",
      })
    );
  });

  it("thanks the visitor once the request is sent", async () => {
    render(<ContactForm onSubmit={() => Promise.resolve()} />);
    fillCompleteRequest();
    submit();

    expect(await screen.findByRole("status")).toHaveTextContent(/thanks, ada/i);
  });

  it("explains when the request could not be sent", async () => {
    render(<ContactForm onSubmit={() => Promise.reject(new Error("offline"))} />);
    fillCompleteRequest();
    submit();

    expect(await screen.findByRole("alert")).toHaveTextContent(/couldn't send/i);
  });

  it("disables the button while the request is sending", async () => {
    render(<ContactForm onSubmit={() => new Promise(() => {})} />);
    fillCompleteRequest();
    submit();

    expect(await screen.findByRole("button", {name: /sending/i})).toBeDisabled();
  });
});
