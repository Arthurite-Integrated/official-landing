import {QueryClient} from "@tanstack/react-query";
import {afterEach, beforeEach, describe, expect, it, vi} from "vite-plus/test";

import type {ApiEvent, ApiJob} from "#/lib/api/types.ts";
import {
  applyForInternship,
  applyForJob,
  eventQueryOptions,
  eventsQueryOptions,
  getEvent,
  jobsQueryOptions,
  listEvents,
  listJobs,
  registerForEvent,
  submitContactRequest,
  subscribeToNewsletter,
  unsubscribeFromNewsletter,
  uploadCv,
} from "#/lib/api/endpoints.ts";

const BASE = "https://api.arthurite.test/v1";

const eventFixture: ApiEvent = {
  id: "9dc88075-5ee6-49c5-87bb-b69d8b2ada9b",
  title: "AWS Cloud Summit",
  coverImage: "https://cdn.arthurite.test/cover.jpg",
  description: "A day of cloud architecture.",
  location: "Lagos",
  startsAt: "2026-10-01T09:00:00.000Z",
  capacity: 100,
  registeredCount: 40,
  remainingCapacity: 60,
  registrationLink: null,
  createdAt: "2026-01-01T00:00:00.000Z",
};

const jobFixture: ApiJob = {
  id: "9dc88075-5ee6-49c5-87bb-b69d8b2ada9b",
  title: "Backend Engineer",
  category: "Engineering",
  subcategory: "Infrastructure",
  mode: "Remote",
  location: "Lagos",
  description: "Build the landing page API and internal services on AWS.",
  status: "open",
  createdAt: "2026-01-01T00:00:00.000Z",
};

const ok = (data: unknown, status = 200) =>
  new Response(JSON.stringify({timestamp: "2026-01-01T00:00:00.000Z", status, success: true, data}), {
    status,
    headers: {"content-type": "application/json"},
  });

const UPLOAD = {
  uploadUrl: "https://s3.example.com/bucket",
  fields: {key: "cv/a.pdf", policy: "p"},
  fileUrl: "https://cdn.example.com/a.pdf",
  expiresIn: 300,
};

const page = (items: unknown[]) => ({items, pagination: {limit: 20, nextCursor: null}});

describe("api endpoints", () => {
  beforeEach(() => {
    vi.stubEnv("VITE_API_BASE_URL", BASE);
    vi.stubGlobal(
      "fetch",
      vi.fn(() => Promise.resolve(ok(null)))
    );
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it("lists events with cursor and limit", async () => {
    vi.mocked(fetch).mockResolvedValue(ok(page([eventFixture])));

    const result = await listEvents({cursor: "abc", limit: 10});

    expect(fetch).toHaveBeenCalledWith(`${BASE}/events?cursor=abc&limit=10`, expect.objectContaining({method: "GET"}));
    expect(result.items).toHaveLength(1);
    expect(result.pagination.nextCursor).toBeNull();
  });

  it("fetches a single event by id", async () => {
    vi.mocked(fetch).mockResolvedValue(ok(eventFixture));

    const event = await getEvent(eventFixture.id);

    expect(fetch).toHaveBeenCalledWith(`${BASE}/events/${eventFixture.id}`, expect.anything());
    expect(event.title).toBe("AWS Cloud Summit");
  });

  it("exposes a single event as a query keyed by its id", async () => {
    vi.mocked(fetch).mockResolvedValue(ok(eventFixture));

    const event = await new QueryClient().fetchQuery(eventQueryOptions(eventFixture.id));

    expect(event.title).toBe("AWS Cloud Summit");
    expect(eventQueryOptions(eventFixture.id).queryKey).toEqual(["events", "detail", eventFixture.id]);
  });

  it("registers for an event", async () => {
    vi.mocked(fetch).mockResolvedValue(ok({id: "reg-1"}, 201));

    await registerForEvent(eventFixture.id, {fullName: "Ada Okafor", email: "ada@acme.com"});

    const [, init] = vi.mocked(fetch).mock.calls[0] as [string, RequestInit];
    expect(vi.mocked(fetch).mock.calls[0]?.[0]).toBe(`${BASE}/events/${eventFixture.id}/register`);
    expect(init.body).toBe(JSON.stringify({fullName: "Ada Okafor", email: "ada@acme.com"}));
  });

  it("submits a contact request using the API field names", async () => {
    vi.mocked(fetch).mockResolvedValue(ok({id: "c-1"}, 201));

    await submitContactRequest({
      firstName: "Ada",
      lastName: "Okafor",
      workEmail: "ada@acme.com",
      phone: "+2348012345678",
      jobTitle: "CTO",
      companyName: "Acme",
      companySize: "51-200",
      message: "We want to migrate to AWS.",
    });

    const [url, init] = vi.mocked(fetch).mock.calls[0] as [string, RequestInit];
    expect(url).toBe(`${BASE}/contact`);
    expect(init.body).toBe(
      JSON.stringify({
        firstName: "Ada",
        lastName: "Okafor",
        workEmail: "ada@acme.com",
        phone: "+2348012345678",
        jobTitle: "CTO",
        companyName: "Acme",
        companySize: "51-200",
        message: "We want to migrate to AWS.",
      })
    );
  });

  it("lists jobs without any admin-only filter", async () => {
    vi.mocked(fetch).mockResolvedValue(ok(page([jobFixture])));

    const result = await listJobs();

    expect(fetch).toHaveBeenCalledWith(`${BASE}/careers`, expect.anything());
    expect(result.items[0]?.title).toBe("Backend Engineer");
  });

  it("requests a presigned CV upload describing the file", async () => {
    vi.mocked(fetch).mockResolvedValue(new Response(null, {status: 500}));

    await uploadCv(new File(["pdf"], "ada-cv.pdf", {type: "application/pdf"})).catch(() => undefined);

    const [url, init] = vi.mocked(fetch).mock.calls[0] as [string, RequestInit];
    expect(url).toBe(`${BASE}/upload`);
    expect(init.body).toBe(JSON.stringify({purpose: "cv", fileName: "ada-cv.pdf", contentType: "application/pdf", size: 3}));
  });

  it("posts the file to the presigned S3 URL with fields before the file", async () => {
    vi.mocked(fetch)
      .mockResolvedValueOnce(ok(UPLOAD))
      .mockResolvedValueOnce(new Response(null, {status: 204}));
    const file = new File(["pdf"], "ada-cv.pdf", {type: "application/pdf"});

    await uploadCv(file);

    const [url, init] = vi.mocked(fetch).mock.calls[1] as [string, RequestInit];
    expect(url).toBe(UPLOAD.uploadUrl);
    expect(init.method).toBe("POST");
    const form = init.body as FormData;
    expect(form.get("key")).toBe("cv/a.pdf");
    expect(form.get("file")).toBe(file);
    expect([...form.keys()].at(-1)).toBe("file");
  });

  it("rejects the CV upload when S3 refuses the file", async () => {
    vi.mocked(fetch)
      .mockResolvedValueOnce(ok(UPLOAD))
      .mockResolvedValueOnce(new Response(null, {status: 403}));

    await expect(uploadCv(new File(["pdf"], "a.pdf", {type: "application/pdf"}))).rejects.toThrow(/upload/i);
  });

  it("submits a job application", async () => {
    vi.mocked(fetch).mockResolvedValue(ok({id: "app-1"}, 201));

    await applyForJob({
      jobId: jobFixture.id,
      fullName: "Ada Okafor",
      email: "ada@acme.com",
      phone: "+2348012345678",
      cvUrl: "https://cdn.example.com/a.pdf",
    });

    expect(fetch).toHaveBeenCalledWith(`${BASE}/careers/apply`, expect.objectContaining({method: "POST"}));
  });

  it("submits an internship application", async () => {
    vi.mocked(fetch).mockResolvedValue(ok({id: "int-1"}, 201));

    await applyForInternship({fullName: "Ada Okafor", email: "ada@acme.com", areaOfInterest: "DevOps"});

    const [url, init] = vi.mocked(fetch).mock.calls[0] as [string, RequestInit];
    expect(url).toBe(`${BASE}/careers/internship`);
    expect(init.body).toBe(JSON.stringify({fullName: "Ada Okafor", email: "ada@acme.com", areaOfInterest: "DevOps"}));
  });

  it("follows the cursor until every job is loaded", async () => {
    const second = {...jobFixture, id: "second", title: "Solutions Engineer"};
    vi.mocked(fetch)
      .mockResolvedValueOnce(ok({items: [jobFixture], pagination: {limit: 100, nextCursor: "next"}}))
      .mockResolvedValueOnce(ok(page([second])));

    const jobs = await new QueryClient().fetchQuery(jobsQueryOptions());

    expect(jobs.map((job) => job.title)).toEqual(["Backend Engineer", "Solutions Engineer"]);
    expect(vi.mocked(fetch).mock.calls.map(([url]) => url)).toEqual([`${BASE}/careers?limit=100`, `${BASE}/careers?cursor=next&limit=100`]);
  });

  it("follows the cursor until every event is loaded", async () => {
    const second = {...eventFixture, id: "second", title: "Re:Invent recap"};
    vi.mocked(fetch)
      .mockResolvedValueOnce(ok({items: [eventFixture], pagination: {limit: 100, nextCursor: "next"}}))
      .mockResolvedValueOnce(ok(page([second])));

    const events = await new QueryClient().fetchQuery(eventsQueryOptions());

    expect(events.map((event) => event.title)).toEqual(["AWS Cloud Summit", "Re:Invent recap"]);
  });

  it("subscribes an email to the newsletter", async () => {
    vi.mocked(fetch).mockResolvedValue(ok({message: "Subscribed"}, 201));

    await subscribeToNewsletter("ada@acme.com");

    const [url, init] = vi.mocked(fetch).mock.calls[0] as [string, RequestInit];
    expect(url).toBe(`${BASE}/newsletter/signup`);
    expect(init.method).toBe("POST");
    expect(init.body).toBe(JSON.stringify({email: "ada@acme.com"}));
  });

  it("unsubscribes an email from the newsletter", async () => {
    vi.mocked(fetch).mockResolvedValue(ok({message: "Unsubscribed"}));

    await unsubscribeFromNewsletter("ada@acme.com");

    const [url, init] = vi.mocked(fetch).mock.calls[0] as [string, RequestInit];
    expect(url).toBe(`${BASE}/newsletter/unsubscribe`);
    expect(init.body).toBe(JSON.stringify({email: "ada@acme.com"}));
  });

  it("uploads a CV and returns the stored file url", async () => {
    vi.mocked(fetch)
      .mockResolvedValueOnce(ok(UPLOAD))
      .mockResolvedValueOnce(new Response(null, {status: 204}));

    const fileUrl = await uploadCv(new File(["pdf"], "ada-cv.pdf", {type: "application/pdf"}));

    expect(fileUrl).toBe(UPLOAD.fileUrl);
  });
});
