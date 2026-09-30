import {afterEach, beforeEach, describe, expect, it, vi} from "vite-plus/test";

import type {ApiEvent, ApiJob} from "#/lib/api/types.ts";
import {
  applyForInternship,
  applyForJob,
  getEvent,
  getJob,
  listEvents,
  listJobs,
  registerForEvent,
  requestCvUpload,
  submitContactRequest,
  uploadFileToS3,
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

  it("lists events with filters and cursor", async () => {
    vi.mocked(fetch).mockResolvedValue(ok(page([eventFixture])));

    const result = await listEvents({status: "upcoming", cursor: "abc", limit: 10});

    expect(fetch).toHaveBeenCalledWith(`${BASE}/events?status=upcoming&cursor=abc&limit=10`, expect.objectContaining({method: "GET"}));
    expect(result.items).toHaveLength(1);
    expect(result.pagination.nextCursor).toBeNull();
  });

  it("fetches a single event by id", async () => {
    vi.mocked(fetch).mockResolvedValue(ok(eventFixture));

    const event = await getEvent(eventFixture.id);

    expect(fetch).toHaveBeenCalledWith(`${BASE}/events/${eventFixture.id}`, expect.anything());
    expect(event.title).toBe("AWS Cloud Summit");
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

  it("lists open jobs and filters by status", async () => {
    vi.mocked(fetch).mockResolvedValue(ok(page([jobFixture])));

    const result = await listJobs({status: "open"});

    expect(fetch).toHaveBeenCalledWith(`${BASE}/careers?status=open`, expect.anything());
    expect(result.items[0]?.title).toBe("Backend Engineer");
  });

  it("fetches a job by id", async () => {
    vi.mocked(fetch).mockResolvedValue(ok(jobFixture));

    const job = await getJob(jobFixture.id);

    expect(fetch).toHaveBeenCalledWith(`${BASE}/careers/${jobFixture.id}`, expect.anything());
    expect(job.mode).toBe("Remote");
  });

  it("requests a presigned CV upload", async () => {
    vi.mocked(fetch).mockResolvedValue(
      ok({
        uploadUrl: "https://s3.example.com/bucket",
        fields: {key: "cv/a.pdf", policy: "p"},
        fileUrl: "https://cdn.example.com/a.pdf",
        expiresIn: 300,
      })
    );

    const result = await requestCvUpload({fileName: "ada-cv.pdf", contentType: "application/pdf", size: 1024});

    const [url, init] = vi.mocked(fetch).mock.calls[0] as [string, RequestInit];
    expect(url).toBe(`${BASE}/upload`);
    expect(init.body).toBe(JSON.stringify({purpose: "cv", fileName: "ada-cv.pdf", contentType: "application/pdf", size: 1024}));
    expect(result.fileUrl).toBe("https://cdn.example.com/a.pdf");
  });

  it("posts the file to the presigned S3 URL with fields before the file", async () => {
    const file = new File(["pdf"], "ada-cv.pdf", {type: "application/pdf"});

    await uploadFileToS3(
      {
        uploadUrl: "https://s3.example.com/bucket",
        fields: {key: "cv/a.pdf", policy: "p"},
        fileUrl: "https://cdn.example.com/a.pdf",
        expiresIn: 300,
      },
      file
    );

    const [url, init] = vi.mocked(fetch).mock.calls[0] as [string, RequestInit];
    expect(url).toBe("https://s3.example.com/bucket");
    expect(init.method).toBe("POST");
    const form = init.body as FormData;
    expect(form.get("key")).toBe("cv/a.pdf");
    expect(form.get("file")).toBe(file);
    const keys = [...form.keys()];
    expect(keys[keys.length - 1]).toBe("file");
  });

  it("rejects the S3 upload when it fails", async () => {
    vi.mocked(fetch).mockResolvedValue(new Response(null, {status: 403}));

    await expect(
      uploadFileToS3(
        {uploadUrl: "https://s3.example.com/bucket", fields: {}, fileUrl: "https://cdn.example.com/a.pdf", expiresIn: 300},
        new File(["pdf"], "a.pdf", {type: "application/pdf"})
      )
    ).rejects.toThrow(/upload/i);
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
});
