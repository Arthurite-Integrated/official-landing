import {afterEach, beforeEach, describe, expect, it, vi} from "vitest";

import {submitEnquiry} from "#/lib/submit-enquiry.ts";

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
