import {QueryClient} from "@tanstack/react-query";
import {afterEach, beforeEach, describe, expect, it, vi} from "vite-plus/test";

import type {
  ApiAward,
  ApiContentBundle,
  ApiEvent,
  ApiJob,
  ApiPartner,
  ApiProject,
  ApiSpotlight,
  ApiStaff,
  ApiTestimonial,
} from "#/lib/api/types.ts";
import {
  applyForInternship,
  applyForJob,
  eventQueryOptions,
  eventsQueryOptions,
  getEvent,
  jobQueryOptions,
  listAwards,
  jobsQueryOptions,
  listPartners,
  listProjects,
  listEvents,
  listJobs,
  listSpotlight,
  listStaff,
  listTestimonials,
  registerForEvent,
  searchJobs,
  staffQueryOptions,
  spotlightQueryOptions,
  awardsQueryOptions,
  contentQueryOptions,
  partnersQueryOptions,
  projectsQueryOptions,
  submitContactRequest,
  subscribeToNewsletter,
  testimonialsQueryOptions,
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

const staffFixture: ApiStaff = {
  id: "76af23fe-6614-48b6-b752-462793a1a313",
  slug: "paul-aderoju",
  name: "Paul Aderoju",
  position: "Senior Solutions Architect",
  photo: "https://cdn.arthurite.test/paul-aderoju.png",
  bio: "Cloud, AI, and business.",
  sortOrder: 0,
};

const testimonialFixture: ApiTestimonial = {
  id: "e1313d60-08a7-40e0-9b6a-c35efa19ba7f",
  name: "Dr. Amaka O.",
  role: "Electoral Committee Chair",
  quote: "VoteXpert completely solved our turnout challenge.",
  sortOrder: 0,
};

const spotlightFixture: ApiSpotlight = {
  id: "bc9c645c-aee0-4c3b-bae2-6d05c2677f9b",
  section: "spotlight",
  title: "Featured at AWS Marketing Central",
  source: "AWS Marketing Central",
  coverImage: "https://cdn.arthurite.test/spotlight/aws.jpg",
  url: "https://aws.amazon.com/",
  status: "published",
  sortOrder: 0,
  createdAt: "2026-01-01T00:00:00.000Z",
};

const projectFixture: ApiProject = {
  id: "bc9c645c-aee0-4c3b-bae2-6d05c2677f9b",
  section: "projects",
  slug: "swap-os",
  name: "SWAP OS",
  summary: "Reliable cloud infrastructure for growth.",
  year: "2025",
  projectType: "Cloud Infrastructure & DevOps",
  industry: "Fintech",
  duration: "12 Weeks",
  coverImage: "https://cdn.arthurite.test/projects/swap-os.jpg",
  videoUrl: null,
  caseStudyUrl: null,
  liveUrl: null,
  stats: [{label: "Uptime", value: "99.9%"}],
  status: "published",
  sortOrder: 0,
  createdAt: "2026-01-01T00:00:00.000Z",
};

const awardFixture: ApiAward = {
  id: "bc9c645c-aee0-4c3b-bae2-6d05c2677f9b",
  section: "awards",
  year: "2025",
  award: "NDE Award of Recognition",
  description: "Community impact across six geographical zones.",
  status: "published",
  sortOrder: 0,
  createdAt: "2026-01-01T00:00:00.000Z",
};

const partnerFixture: ApiPartner = {
  id: "bc9c645c-aee0-4c3b-bae2-6d05c2677f9b",
  section: "partners",
  name: "Amazon Web Services",
  logo: "https://cdn.arthurite.test/partners/aws.svg",
  status: "published",
  sortOrder: 0,
  createdAt: "2026-01-01T00:00:00.000Z",
};

const contentFixture: ApiContentBundle = {
  projects: [projectFixture],
  testimonials: [testimonialFixture],
  spotlight: [spotlightFixture],
  staff: [staffFixture],
  awards: [awardFixture],
  partners: [partnerFixture],
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

  it("searches open jobs by the filters supported by the API", async () => {
    vi.mocked(fetch).mockResolvedValue(ok(page([jobFixture])));

    const result = await searchJobs({location: "Lagos", mode: "Remote", category: "Engineering", limit: 20});

    expect(fetch).toHaveBeenCalledWith(
      `${BASE}/careers/search?location=Lagos&mode=Remote&category=Engineering&limit=20`,
      expect.anything()
    );
    expect(result.items[0]?.id).toBe(jobFixture.id);
  });

  it("fetches a job by id and caches the detail query by id", async () => {
    vi.mocked(fetch).mockResolvedValue(ok(jobFixture));

    const job = await new QueryClient().fetchQuery(jobQueryOptions(jobFixture.id));

    expect(fetch).toHaveBeenCalledWith(`${BASE}/careers/${jobFixture.id}`, expect.anything());
    expect(job.title).toBe(jobFixture.title);
    expect(jobQueryOptions(jobFixture.id).queryKey).toEqual(["careers", "detail", jobFixture.id]);
  });

  it("lists spotlight items from the public endpoint", async () => {
    vi.mocked(fetch).mockResolvedValue(ok(page([spotlightFixture])));

    const result = await listSpotlight({limit: 20});

    expect(fetch).toHaveBeenCalledWith(`${BASE}/spotlight?limit=20`, expect.objectContaining({method: "GET"}));
    expect(result.items[0]?.coverImage).toBe(spotlightFixture.coverImage);
  });

  it("loads all spotlight pages with a stable query key", async () => {
    const second = {...spotlightFixture, id: "second", title: "Second spotlight"};
    vi.mocked(fetch)
      .mockResolvedValueOnce(ok({items: [spotlightFixture], pagination: {limit: 100, nextCursor: "next"}}))
      .mockResolvedValueOnce(ok(page([second])));

    const items = await new QueryClient().fetchQuery(spotlightQueryOptions());

    expect(items.map((item) => item.title)).toEqual([spotlightFixture.title, second.title]);
    expect(spotlightQueryOptions().queryKey).toEqual(["spotlight", "list"]);
  });

  it("lists projects from the public endpoint", async () => {
    vi.mocked(fetch).mockResolvedValue(ok(page([projectFixture])));

    const result = await listProjects({limit: 20});

    expect(fetch).toHaveBeenCalledWith(`${BASE}/projects?limit=20`, expect.anything());
    expect(result.items[0]?.slug).toBe(projectFixture.slug);
  });

  it("loads every project page with the projects query", async () => {
    vi.mocked(fetch).mockResolvedValue(ok(page([projectFixture])));

    const projects = await new QueryClient().fetchQuery(projectsQueryOptions());

    expect(projects).toEqual([projectFixture]);
  });

  it("lists awards from the public endpoint", async () => {
    vi.mocked(fetch).mockResolvedValue(ok(page([awardFixture])));

    const result = await listAwards({limit: 20});

    expect(fetch).toHaveBeenCalledWith(`${BASE}/awards?limit=20`, expect.anything());
    expect(result.items[0]?.award).toBe(awardFixture.award);
  });

  it("loads all award pages with the awards query", async () => {
    vi.mocked(fetch).mockResolvedValue(ok(page([awardFixture])));

    const awards = await new QueryClient().fetchQuery(awardsQueryOptions());

    expect(awards).toEqual([awardFixture]);
  });

  it("lists partners from the public endpoint", async () => {
    vi.mocked(fetch).mockResolvedValue(ok(page([partnerFixture])));

    const result = await listPartners({limit: 20});

    expect(fetch).toHaveBeenCalledWith(`${BASE}/partners?limit=20`, expect.anything());
    expect(result.items[0]?.name).toBe(partnerFixture.name);
  });

  it("loads all partner pages with the partners query", async () => {
    vi.mocked(fetch).mockResolvedValue(ok(page([partnerFixture])));

    const partners = await new QueryClient().fetchQuery(partnersQueryOptions());

    expect(partners).toEqual([partnerFixture]);
  });

  it("loads the full published content bundle in one request", async () => {
    vi.mocked(fetch).mockResolvedValue(ok(contentFixture));

    const content = await new QueryClient().fetchQuery(contentQueryOptions());

    expect(fetch).toHaveBeenCalledWith(`${BASE}/content`, expect.anything());
    expect(content).toEqual(contentFixture);
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

  it("lists staff from the staff endpoint", async () => {
    vi.mocked(fetch).mockResolvedValue(ok(page([staffFixture])));

    const result = await listStaff({limit: 20});

    expect(fetch).toHaveBeenCalledWith(`${BASE}/staff?limit=20`, expect.objectContaining({method: "GET"}));
    expect(result.items[0]?.name).toBe("Paul Aderoju");
  });

  it("follows the cursor until every staff member is loaded", async () => {
    const second = {...staffFixture, id: "second", name: "Ayomikun Ayobami"};
    vi.mocked(fetch)
      .mockResolvedValueOnce(ok({items: [staffFixture], pagination: {limit: 100, nextCursor: "next"}}))
      .mockResolvedValueOnce(ok(page([second])));

    const staff = await new QueryClient().fetchQuery(staffQueryOptions());

    expect(staff.map((member) => member.name)).toEqual(["Paul Aderoju", "Ayomikun Ayobami"]);
  });

  it("lists testimonials from the testimonials endpoint", async () => {
    vi.mocked(fetch).mockResolvedValue(ok(page([testimonialFixture])));

    const result = await listTestimonials({limit: 20});

    expect(fetch).toHaveBeenCalledWith(`${BASE}/testimonials?limit=20`, expect.objectContaining({method: "GET"}));
    expect(result.items[0]?.name).toBe("Dr. Amaka O.");
  });

  it("follows the cursor until every testimonial is loaded", async () => {
    const second = {...testimonialFixture, id: "second", name: "Emmanuel K."};
    vi.mocked(fetch)
      .mockResolvedValueOnce(ok({items: [testimonialFixture], pagination: {limit: 100, nextCursor: "next"}}))
      .mockResolvedValueOnce(ok(page([second])));

    const testimonials = await new QueryClient().fetchQuery(testimonialsQueryOptions());

    expect(testimonials.map((testimonial) => testimonial.name)).toEqual(["Dr. Amaka O.", "Emmanuel K."]);
  });
});
