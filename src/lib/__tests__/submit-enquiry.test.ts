import {afterEach, beforeEach, describe, expect, it, vi} from "vitest";

import type {ContactRequest} from "#/lib/contact-request.ts";
import {submitContactRequest, submitEnquiry} from "#/lib/submit-enquiry.ts";

const ENDPOINT = "https://api.arthurite.test/enquiries";

describe("submitEnquiry", () => {
  beforeEach(() => {
    vi.stubEnv("VITE_ENQUIRY_ENDPOINT", ENDPOINT);
    vi.stubGlobal(
      "fetch",
      vi.fn(() => Promise.resolve(new Response(null, {status: 202})))
    );
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it("posts to the configured endpoint", async () => {
    await submitEnquiry("Audit our AWS spend");

    expect(fetch).toHaveBeenCalledWith(ENDPOINT, expect.objectContaining({method: "POST"}));
  });

  it("sends the prompt as a JSON body", async () => {
    await submitEnquiry("Audit our AWS spend");

    const [, request] = vi.mocked(fetch).mock.calls[0] as [string, RequestInit];
    expect(request.body).toBe(JSON.stringify({prompt: "Audit our AWS spend"}));
  });

  it("declares a JSON content type", async () => {
    await submitEnquiry("Audit our AWS spend");

    const [, request] = vi.mocked(fetch).mock.calls[0] as [string, RequestInit];
    expect(request.headers).toEqual({"content-type": "application/json"});
  });

  it("rejects when the endpoint responds with an error", async () => {
    vi.mocked(fetch).mockResolvedValue(new Response(null, {status: 500}));

    await expect(submitEnquiry("Audit our AWS spend")).rejects.toThrow("500");
  });

  it("rejects when no endpoint is configured", async () => {
    vi.stubEnv("VITE_ENQUIRY_ENDPOINT", "");

    await expect(submitEnquiry("Audit our AWS spend")).rejects.toThrow(/not configured/i);
  });

  it("does not call the network when no endpoint is configured", async () => {
    vi.stubEnv("VITE_ENQUIRY_ENDPOINT", "");

    await expect(submitEnquiry("Audit our AWS spend")).rejects.toThrow();
    expect(fetch).not.toHaveBeenCalled();
  });
});

describe("submitContactRequest", () => {
  const request: ContactRequest = {
    company: "Acme Logistics",
    companySize: "51-200",
    email: "ada@acme.com",
    firstName: "Ada",
    jobTitle: "CTO",
    lastName: "Okafor",
    message: "We want to migrate to AWS.",
    phone: "",
  };

  beforeEach(() => {
    vi.stubEnv("VITE_ENQUIRY_ENDPOINT", ENDPOINT);
    vi.stubGlobal(
      "fetch",
      vi.fn(() => Promise.resolve(new Response(null, {status: 202})))
    );
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it("sends the contact request as a JSON body", async () => {
    await submitContactRequest(request);

    const [, init] = vi.mocked(fetch).mock.calls[0] as [string, RequestInit];
    expect(init.body).toBe(JSON.stringify(request));
  });

  it("rejects when the endpoint responds with an error", async () => {
    vi.mocked(fetch).mockResolvedValue(new Response(null, {status: 500}));

    await expect(submitContactRequest(request)).rejects.toThrow("500");
  });
});
