import {fireEvent, render, screen} from "@testing-library/react";
import {afterEach, beforeEach, describe, expect, it, vi} from "vite-plus/test";

import {NewsletterSignup} from "#/components/newsletter/newsletter-signup.tsx";
import {NewsletterUnsubscribe} from "#/components/newsletter/newsletter-unsubscribe.tsx";

const respond = (status: number, body: unknown) => new Response(JSON.stringify(body), {status});
const success = (status: number) => respond(status, {timestamp: "t", status, success: true, data: {message: "Done"}});
const conflict = respond(409, {timestamp: "t", status: 409, success: false, error: {message: "taken", type: "ALREADY_SUBSCRIBED"}});

function submit(label: RegExp, email = "ada@acme.com") {
  fireEvent.change(screen.getByLabelText(/email address/i), {target: {value: email}});
  fireEvent.click(screen.getByRole("button", {name: label}));
}

describe("newsletter forms", () => {
  beforeEach(() => {
    vi.stubEnv("VITE_API_BASE_URL", "https://api.arthurite.test/v1");
    vi.stubGlobal(
      "fetch",
      vi.fn(() => Promise.resolve(success(201)))
    );
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it("signs the email up through the newsletter endpoint", async () => {
    render(<NewsletterSignup />);

    submit(/subscribe/i);

    expect(await screen.findByText(/thanks for subscribing/i)).toBeInTheDocument();
    expect(fetch).toHaveBeenCalledWith("https://api.arthurite.test/v1/newsletter/signup", expect.objectContaining({method: "POST"}));
  });

  it("confirms the signup when the email is already subscribed", async () => {
    vi.mocked(fetch).mockResolvedValue(conflict);
    render(<NewsletterSignup />);

    submit(/subscribe/i);

    expect(await screen.findByText(/thanks for subscribing/i)).toBeInTheDocument();
  });

  it("reports a failed signup", async () => {
    vi.mocked(fetch).mockResolvedValue(respond(500, {timestamp: "t", status: 500, success: false, error: {message: "boom"}}));
    render(<NewsletterSignup />);

    submit(/subscribe/i);

    expect(await screen.findByRole("alert")).toHaveTextContent(/couldn't subscribe/i);
  });

  it("unsubscribes the email through the newsletter endpoint", async () => {
    vi.mocked(fetch).mockResolvedValue(success(200));
    render(<NewsletterUnsubscribe />);

    submit(/unsubscribe/i);

    expect(await screen.findByText(/you've been unsubscribed/i)).toBeInTheDocument();
    expect(fetch).toHaveBeenCalledWith("https://api.arthurite.test/v1/newsletter/unsubscribe", expect.objectContaining({method: "POST"}));
  });
});
