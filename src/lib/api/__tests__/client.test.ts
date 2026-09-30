import {afterEach, beforeEach, describe, expect, it, vi} from "vite-plus/test";
import {z} from "zod";

import {ApiError, apiRequest} from "#/lib/api/client.ts";

const BASE = "https://api.arthurite.test/v1";

const messageSchema = z.object({message: z.string()});

const envelope = (data: unknown, status = 200) =>
  new Response(JSON.stringify({timestamp: "2026-01-01T00:00:00.000Z", status, success: true, data}), {
    status,
    headers: {"content-type": "application/json"},
  });

const errorEnvelope = (error: unknown, status: number) =>
  new Response(JSON.stringify({timestamp: "2026-01-01T00:00:00.000Z", status, success: false, error}), {
    status,
    headers: {"content-type": "application/json"},
  });

describe("apiRequest", () => {
  beforeEach(() => {
    vi.stubEnv("VITE_API_BASE_URL", BASE);
    vi.stubGlobal(
      "fetch",
      vi.fn(() => Promise.resolve(envelope({message: "ok"})))
    );
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it("prepends the configured base URL to the path", async () => {
    await apiRequest("/contact", {method: "POST", body: {x: 1}, schema: messageSchema});

    expect(fetch).toHaveBeenCalledWith(`${BASE}/contact`, expect.objectContaining({method: "POST"}));
  });

  it("sends JSON bodies with a JSON content type", async () => {
    await apiRequest("/contact", {method: "POST", body: {x: 1}, schema: messageSchema});

    const [, init] = vi.mocked(fetch).mock.calls[0] as [string, RequestInit];
    expect(init.body).toBe(JSON.stringify({x: 1}));
    expect(init.headers).toEqual({"content-type": "application/json"});
  });

  it("omits the body for GET requests", async () => {
    await apiRequest("/events", {schema: messageSchema});

    const [, init] = vi.mocked(fetch).mock.calls[0] as [string, RequestInit];
    expect(init.method).toBe("GET");
    expect(init.body).toBeUndefined();
  });

  it("appends query parameters, skipping undefined values", async () => {
    await apiRequest("/events", {query: {limit: 20, status: "upcoming", cursor: undefined}, schema: messageSchema});

    expect(fetch).toHaveBeenCalledWith(`${BASE}/events?limit=20&status=upcoming`, expect.anything());
  });

  it("returns the unwrapped data payload on success", async () => {
    const result = await apiRequest("/health", {schema: messageSchema});

    expect(result).toEqual({message: "ok"});
  });

  it("throws an ApiError carrying status, type and details on an error envelope", async () => {
    vi.mocked(fetch).mockResolvedValue(errorEnvelope({message: "Event is at capacity", type: "EVENT_FULL", details: {capacity: 10}}, 409));

    const failure = await apiRequest("/events/1/register", {
      method: "POST",
      body: {},
      schema: messageSchema,
    }).catch((error: unknown) => error);

    expect(failure).toBeInstanceOf(ApiError);
    expect(failure).toMatchObject({status: 409, type: "EVENT_FULL", message: "Event is at capacity", details: {capacity: 10}});
  });

  it("falls back to the HTTP status when the body is not a recognisable envelope", async () => {
    vi.mocked(fetch).mockResolvedValue(new Response("Bad Gateway", {status: 502}));

    const failure = await apiRequest("/events", {schema: messageSchema}).catch((error: unknown) => error);

    expect(failure).toBeInstanceOf(ApiError);
    expect(failure).toMatchObject({status: 502});
  });

  it("throws when the success payload does not match the schema", async () => {
    vi.mocked(fetch).mockResolvedValue(envelope({unexpected: true}));

    await expect(apiRequest("/events", {schema: messageSchema})).rejects.toThrow();
  });

  it("rejects when no base URL is configured", async () => {
    vi.stubEnv("VITE_API_BASE_URL", "");

    await expect(apiRequest("/events", {schema: messageSchema})).rejects.toThrow(/not configured/i);
    expect(fetch).not.toHaveBeenCalled();
  });
});
