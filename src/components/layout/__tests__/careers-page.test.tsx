import {fireEvent, render, screen, waitFor, within} from "@testing-library/react";
import {afterEach, beforeEach, describe, expect, it, vi} from "vite-plus/test";

import {CAREERS_BENEFITS} from "#/components/layout/careers-data.ts";
import {CareersAtip} from "#/components/layout/careers-atip.tsx";
import {CareersBenefits} from "#/components/layout/careers-benefits.tsx";
import {CareersCta} from "#/components/layout/careers-cta.tsx";
import {CareersHero} from "#/components/layout/careers-hero.tsx";
import {CareersOpenRoles} from "#/components/layout/careers-open-roles.tsx";
import type {ApiJob} from "#/lib/api/types.ts";
import {renderWithQueryClient} from "#/test-utils/query-client.tsx";

vi.mock("@tanstack/react-router", async () => {
  const React = await import("react");
  return {
    Link: ({children, className, to}: {readonly children: React.ReactNode; readonly className?: string; readonly to: string}) =>
      React.createElement("a", {className, href: to}, children),
  };
});

const apiJob = (overrides: Partial<ApiJob>): ApiJob => ({
  id: "j-1",
  title: "Backend Engineer",
  category: "Engineering",
  subcategory: "Platform Engineering",
  mode: "Remote",
  location: "Lagos",
  description: "Build cloud services on AWS.",
  status: "open",
  createdAt: "2026-01-01T00:00:00.000Z",
  ...overrides,
});

const JOBS = [
  apiJob({id: "j-1", title: "Solution Architect", category: "Architecture", subcategory: "Cloud Architecture", mode: "Hybrid"}),
  apiJob({id: "j-2", title: "Cloud DevOps Engineer"}),
  apiJob({id: "j-3", title: "Cloud Security Specialist", category: "Operations", subcategory: "Security & Compliance", mode: "Hybrid"}),
];

const envelope = (data: unknown, status = 200) =>
  new Response(JSON.stringify({timestamp: "t", status, success: true, data}), {status, headers: {"content-type": "application/json"}});

const jobsPage = (items: ApiJob[]) => envelope({items, pagination: {limit: 20, nextCursor: null}});

function stubJobsFetch(items: ApiJob[]) {
  vi.stubEnv("VITE_API_BASE_URL", "https://api.arthurite.test/v1");
  vi.stubGlobal(
    "fetch",
    vi.fn(() => Promise.resolve(jobsPage(items)))
  );
}

describe("CareersHero", () => {
  it("renders main Join Our Team heading", () => {
    render(<CareersHero />);
    expect(screen.getByRole("heading", {level: 1, name: /join our team/i})).toBeInTheDocument();
  });

  it("renders hero description", () => {
    render(<CareersHero />);
    expect(screen.getByText(/be part of a growing cloud technology company/i)).toBeInTheDocument();
  });

  it("renders CTA button linking to open roles", () => {
    render(<CareersHero />);
    const cta = screen.getByRole("link", {name: /view open roles/i});
    expect(cta).toHaveAttribute("href", "#open-roles");
  });
});

describe("CareersBenefits", () => {
  it("renders section heading", () => {
    render(<CareersBenefits />);
    expect(screen.getByRole("region", {name: /why work with us/i})).toBeInTheDocument();
  });

  it("renders all benefit pillars", () => {
    render(<CareersBenefits />);
    for (const benefit of CAREERS_BENEFITS) {
      expect(screen.getByRole("heading", {name: benefit.title})).toBeInTheDocument();
      expect(screen.getByText(benefit.description)).toBeInTheDocument();
      expect(screen.getByText(benefit.number)).toBeInTheDocument();
    }
  });
});

describe("CareersOpenRoles", () => {
  beforeEach(() => {
    stubJobsFetch(JOBS);
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it("renders Open Roles heading region", () => {
    renderWithQueryClient(<CareersOpenRoles />);
    expect(screen.getByRole("region", {name: /open roles/i})).toBeInTheDocument();
  });

  it("keeps the open-roles anchor unique so the hero link scrolls to the section", async () => {
    const {container} = renderWithQueryClient(<CareersOpenRoles />);
    await screen.findByRole("heading", {name: "Solution Architect"});

    expect(container.querySelectorAll("#open-roles")).toHaveLength(1);
  });

  it("opens the apply dialog when any part of a role row is clicked", async () => {
    renderWithQueryClient(<CareersOpenRoles />);
    await screen.findByRole("heading", {name: "Solution Architect"});

    fireEvent.click(within(screen.getByRole("button", {name: /solution architect/i})).getByText("Hybrid / Lagos"));

    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("renders every role returned by the API", async () => {
    renderWithQueryClient(<CareersOpenRoles />);

    for (const job of JOBS) {
      expect(await screen.findByRole("heading", {name: job.title})).toBeInTheDocument();
    }
  });

  it("filters roles when a category button is clicked", async () => {
    renderWithQueryClient(<CareersOpenRoles />);
    await screen.findByRole("heading", {name: "Solution Architect"});

    const [architectureButton] = screen.getAllByRole("button", {name: /architecture/i});
    fireEvent.click(architectureButton);

    expect(screen.getByRole("heading", {name: "Solution Architect"})).toBeInTheDocument();
    expect(screen.queryByRole("heading", {name: "Cloud DevOps Engineer"})).not.toBeInTheDocument();
  });

  it("filters roles by search query", async () => {
    renderWithQueryClient(<CareersOpenRoles />);
    await screen.findByRole("heading", {name: "Solution Architect"});

    const searchInput = screen.getByPlaceholderText(/search job titles/i);
    fireEvent.change(searchInput, {target: {value: "security"}});

    expect(screen.getByRole("heading", {name: "Cloud Security Specialist"})).toBeInTheDocument();
    expect(screen.queryByRole("heading", {name: "Solution Architect"})).not.toBeInTheDocument();
  });

  it("explains when the API returns no open roles", async () => {
    stubJobsFetch([]);
    renderWithQueryClient(<CareersOpenRoles />);

    expect(await screen.findByText(/don't have any open roles right now/i)).toBeInTheDocument();
  });

  it("shows empty state when no roles match", async () => {
    renderWithQueryClient(<CareersOpenRoles />);
    await screen.findByRole("heading", {name: "Solution Architect"});

    const searchInput = screen.getByPlaceholderText(/search job titles/i);
    fireEvent.change(searchInput, {target: {value: "zzzznonexistent"}});

    expect(screen.getByText(/no roles match/i)).toBeInTheDocument();
  });

  it("opens the apply dialog when a role is clicked", async () => {
    renderWithQueryClient(<CareersOpenRoles />);
    const row = await screen.findByRole("button", {name: /backend engineer|solution architect/i});

    fireEvent.click(row);

    const dialog = screen.getByRole("dialog");
    expect(within(dialog).getByRole("heading", {name: /apply —/i})).toBeInTheDocument();
    expect(within(dialog).getByLabelText(/full name/i)).toBeInTheDocument();
    expect(within(dialog).getByLabelText(/cv/i)).toBeInTheDocument();
  });
});

describe("CareersAtip", () => {
  beforeEach(() => {
    stubJobsFetch(JOBS);
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it("renders ATIP section heading", () => {
    renderWithQueryClient(<CareersAtip />);
    expect(screen.getByRole("region", {name: /arthurite tech internship program/i})).toBeInTheDocument();
  });

  it("renders internship application form inputs", () => {
    renderWithQueryClient(<CareersAtip />);
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/area of interest/i)).toBeInTheDocument();
  });

  it("submits the application to the internship endpoint", async () => {
    renderWithQueryClient(<CareersAtip />);
    fireEvent.change(screen.getByLabelText(/full name/i), {target: {value: "Alex Johnson"}});
    fireEvent.change(screen.getByLabelText(/email address/i), {target: {value: "alex@example.com"}});

    fireEvent.click(screen.getByRole("button", {name: /submit application/i}));

    await waitFor(() =>
      expect(fetch).toHaveBeenCalledWith("https://api.arthurite.test/v1/careers/internship", expect.objectContaining({method: "POST"}))
    );
    expect(await screen.findByText(/application submitted successfully/i)).toBeInTheDocument();
  });

  it("explains when the internship submission fails", async () => {
    vi.mocked(fetch).mockResolvedValue(new Response(JSON.stringify({success: false, error: {message: "boom"}}), {status: 500}));
    renderWithQueryClient(<CareersAtip />);
    fireEvent.change(screen.getByLabelText(/full name/i), {target: {value: "Alex Johnson"}});
    fireEvent.change(screen.getByLabelText(/email address/i), {target: {value: "alex@example.com"}});

    fireEvent.click(screen.getByRole("button", {name: /submit application/i}));

    expect(await screen.findByRole("alert")).toHaveTextContent(/couldn't submit/i);
  });
});

const UPLOAD = {
  uploadUrl: "https://s3.example.com/bucket",
  fields: {key: "cv/ada.pdf"},
  fileUrl: "https://cdn.example.com/cv/ada.pdf",
  expiresIn: 300,
};

const errorEnvelope = (status: number, type: string) =>
  new Response(JSON.stringify({timestamp: "t", status, success: false, error: {message: "nope", type}}), {status});

function stubSubmissionFetch(apiResponse: Response) {
  vi.stubEnv("VITE_API_BASE_URL", "https://api.arthurite.test/v1");
  vi.stubGlobal(
    "fetch",
    vi.fn((url: string) => {
      if (url.endsWith("/upload")) return Promise.resolve(envelope(UPLOAD));
      if (url === UPLOAD.uploadUrl) return Promise.resolve(new Response(null, {status: 204}));
      if (new URL(url).pathname.endsWith("/careers")) return Promise.resolve(jobsPage(JOBS));
      return Promise.resolve(apiResponse);
    })
  );
}

const pdf = (name = "ada-cv.pdf") => new File(["pdf"], name, {type: "application/pdf"});

function submittedBodyFor(path: string): Record<string, unknown> {
  const call = vi.mocked(fetch).mock.calls.find(([url]) => String(url).endsWith(path)) as [string, RequestInit] | undefined;
  return JSON.parse(String(call?.[1].body)) as Record<string, unknown>;
}

async function openApplyDialog() {
  renderWithQueryClient(<CareersOpenRoles />);
  fireEvent.click(await screen.findByRole("button", {name: /solution architect/i}));
  return within(screen.getByRole("dialog"));
}

function fillApplication(dialog: ReturnType<typeof within>, cv: File) {
  fireEvent.change(dialog.getByLabelText(/full name/i), {target: {value: "Ada Okafor"}});
  fireEvent.change(dialog.getByLabelText(/email/i), {target: {value: "ada@acme.com"}});
  fireEvent.change(dialog.getByLabelText(/phone/i), {target: {value: "+2348012345678"}});
  fireEvent.change(dialog.getByLabelText(/cv/i), {target: {files: [cv]}});
  fireEvent.click(dialog.getByRole("button", {name: /submit application/i}));
}

describe("job application", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it("uploads the CV and applies with its stored url", async () => {
    stubSubmissionFetch(envelope({id: "app-1"}, 201));
    const dialog = await openApplyDialog();

    fillApplication(dialog, pdf());

    expect(await dialog.findByText(/application sent/i)).toBeInTheDocument();
    expect(submittedBodyFor("/careers/apply")).toEqual({
      jobId: "j-1",
      fullName: "Ada Okafor",
      email: "ada@acme.com",
      phone: "+2348012345678",
      cvUrl: UPLOAD.fileUrl,
    });
  });

  it("tells the applicant when the role has closed", async () => {
    stubSubmissionFetch(errorEnvelope(409, "JOB_CLOSED"));
    const dialog = await openApplyDialog();

    fillApplication(dialog, pdf());

    expect(await dialog.findByRole("alert")).toHaveTextContent(/no longer accepting applications/i);
  });

  it("asks for a CV before submitting", async () => {
    stubSubmissionFetch(envelope({id: "app-1"}, 201));
    const dialog = await openApplyDialog();

    fireEvent.click(dialog.getByRole("button", {name: /submit application/i}));

    expect(await dialog.findByText(/attach your cv/i)).toBeInTheDocument();
  });
});

describe("internship CV", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  function submitInternship(cv?: File) {
    renderWithQueryClient(<CareersAtip />);
    fireEvent.change(screen.getByLabelText(/full name/i), {target: {value: "Alex Johnson"}});
    fireEvent.change(screen.getByLabelText(/email address/i), {target: {value: "alex@example.com"}});
    if (cv) fireEvent.change(screen.getByLabelText(/cv/i), {target: {files: [cv]}});
    fireEvent.click(screen.getByRole("button", {name: /submit application/i}));
  }

  it("sends the uploaded CV url when a CV is attached", async () => {
    stubSubmissionFetch(envelope({id: "int-1"}, 201));

    submitInternship(pdf());

    expect(await screen.findByText(/application submitted successfully/i)).toBeInTheDocument();
    expect(submittedBodyFor("/careers/internship")).toMatchObject({cvUrl: UPLOAD.fileUrl});
  });

  it("applies without a CV when none is attached", async () => {
    stubSubmissionFetch(envelope({id: "int-1"}, 201));

    submitInternship();

    expect(await screen.findByText(/application submitted successfully/i)).toBeInTheDocument();
    expect(submittedBodyFor("/careers/internship")).not.toHaveProperty("cvUrl");
  });

  it("rejects a CV that is not a PDF or DOCX", () => {
    stubSubmissionFetch(envelope({id: "int-1"}, 201));

    submitInternship(new File(["x"], "cv.png", {type: "image/png"}));

    expect(screen.getByRole("alert")).toHaveTextContent(/pdf or docx/i);
  });
});

describe("CareersCta", () => {
  it("renders CTA banner heading and link button", () => {
    render(<CareersCta />);
    expect(screen.getByRole("heading", {name: /ready to take the next step\?/i})).toBeInTheDocument();
    expect(screen.getByRole("link", {name: /see open roles/i})).toHaveAttribute("href", "#open-roles");
  });
});
