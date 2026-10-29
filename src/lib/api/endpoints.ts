import {queryOptions} from "@tanstack/react-query";

import {apiRequest} from "#/lib/api/client.ts";
import {
  apiEventPageSchema,
  apiEventSchema,
  apiAwardPageSchema,
  apiContentBundleSchema,
  apiJobPageSchema,
  apiJobSchema,
  apiPartnerPageSchema,
  apiProjectPageSchema,
  apiSpotlightPageSchema,
  apiStaffPageSchema,
  apiTestimonialPageSchema,
  createdDataSchema,
  uploadResultSchema,
  type ApiContactPayload,
  type ApiEventRegistrationPayload,
  type ApiInternshipPayload,
  type ApiJobApplicationPayload,
  type ApiUploadResult,
} from "#/lib/api/types.ts";

const PAGE_SIZE = 100;

type PageParams = {
  readonly cursor?: string;
  readonly limit?: number;
};

export type JobSearchParams = PageParams & {
  readonly location?: "Lagos" | "London" | "Accra" | "Qatar";
  readonly mode?: "Remote" | "Hybrid";
  readonly category?: string;
};

type CursorPage<Item> = {
  readonly items: readonly Item[];
  readonly pagination: {readonly nextCursor: string | null};
};

async function collectAllPages<Item>(fetchPage: (params: PageParams) => Promise<CursorPage<Item>>): Promise<Item[]> {
  const items: Item[] = [];
  let cursor: string | undefined;

  do {
    const page = await fetchPage({cursor, limit: PAGE_SIZE});
    items.push(...page.items);
    cursor = page.pagination.nextCursor ?? undefined;
  } while (cursor !== undefined);

  return items;
}

export function listEvents(params: PageParams = {}) {
  return apiRequest("/events", {query: {cursor: params.cursor, limit: params.limit}, schema: apiEventPageSchema});
}

export const eventsQueryOptions = () => queryOptions({queryKey: ["events", "list"], queryFn: () => collectAllPages(listEvents), retry: 1});

export function getEvent(id: string) {
  return apiRequest(`/events/${id}`, {schema: apiEventSchema});
}

export const eventQueryOptions = (id: string) =>
  queryOptions({queryKey: ["events", "detail", id], queryFn: () => getEvent(id), retry: false});

export function registerForEvent(eventId: string, payload: ApiEventRegistrationPayload) {
  return apiRequest(`/events/${eventId}/register`, {method: "POST", body: payload, schema: createdDataSchema});
}

export function submitContactRequest(payload: ApiContactPayload) {
  return apiRequest("/contact", {method: "POST", body: payload, schema: createdDataSchema});
}

export function listJobs(params: PageParams = {}) {
  return apiRequest("/careers", {query: {cursor: params.cursor, limit: params.limit}, schema: apiJobPageSchema});
}

export const jobsQueryOptions = () => queryOptions({queryKey: ["careers", "list"], queryFn: () => collectAllPages(listJobs), retry: 1});

export function searchJobs(params: JobSearchParams = {}) {
  return apiRequest("/careers/search", {
    query: {location: params.location, mode: params.mode, category: params.category, cursor: params.cursor, limit: params.limit},
    schema: apiJobPageSchema,
  });
}

export const searchJobsQueryOptions = (params: Omit<JobSearchParams, "cursor" | "limit"> = {}) =>
  queryOptions({
    queryKey: ["careers", "search", params],
    queryFn: () => collectAllPages((pageParams) => searchJobs({...params, ...pageParams})),
    retry: 1,
  });

export function getJob(id: string) {
  return apiRequest(`/careers/${id}`, {schema: apiJobSchema});
}

export const jobQueryOptions = (id: string) => queryOptions({queryKey: ["careers", "detail", id], queryFn: () => getJob(id), retry: false});

export function listStaff(params: PageParams = {}) {
  return apiRequest("/staff", {query: {cursor: params.cursor, limit: params.limit}, schema: apiStaffPageSchema});
}

export const staffQueryOptions = () => queryOptions({queryKey: ["staff", "list"], queryFn: () => collectAllPages(listStaff), retry: 1});

export function listTestimonials(params: PageParams = {}) {
  return apiRequest("/testimonials", {query: {cursor: params.cursor, limit: params.limit}, schema: apiTestimonialPageSchema});
}

export const testimonialsQueryOptions = () =>
  queryOptions({queryKey: ["testimonials", "list"], queryFn: () => collectAllPages(listTestimonials), retry: 1});

export function listSpotlight(params: PageParams = {}) {
  return apiRequest("/spotlight", {query: {cursor: params.cursor, limit: params.limit}, schema: apiSpotlightPageSchema});
}

export const spotlightQueryOptions = () =>
  queryOptions({queryKey: ["spotlight", "list"], queryFn: () => collectAllPages(listSpotlight), retry: 1});

export function listProjects(params: PageParams = {}) {
  return apiRequest("/projects", {query: {cursor: params.cursor, limit: params.limit}, schema: apiProjectPageSchema});
}

export const projectsQueryOptions = () =>
  queryOptions({queryKey: ["projects", "list"], queryFn: () => collectAllPages(listProjects), retry: 1});

export function listAwards(params: PageParams = {}) {
  return apiRequest("/awards", {query: {cursor: params.cursor, limit: params.limit}, schema: apiAwardPageSchema});
}

export const awardsQueryOptions = () => queryOptions({queryKey: ["awards", "list"], queryFn: () => collectAllPages(listAwards), retry: 1});

export function listPartners(params: PageParams = {}) {
  return apiRequest("/partners", {query: {cursor: params.cursor, limit: params.limit}, schema: apiPartnerPageSchema});
}

export const partnersQueryOptions = () =>
  queryOptions({queryKey: ["partners", "list"], queryFn: () => collectAllPages(listPartners), retry: 1});

export function getContent() {
  return apiRequest("/content", {schema: apiContentBundleSchema});
}

export const contentQueryOptions = () => queryOptions({queryKey: ["content", "published"], queryFn: getContent, retry: 1});

function requestCvUpload(file: File) {
  return apiRequest("/upload", {
    method: "POST",
    body: {purpose: "cv", fileName: file.name, contentType: file.type, size: file.size},
    schema: uploadResultSchema,
  });
}

async function uploadFileToS3(upload: ApiUploadResult, file: File): Promise<void> {
  const form = new FormData();
  for (const [key, value] of Object.entries(upload.fields)) {
    form.append(key, value);
  }
  form.append("file", file);

  const response = await fetch(upload.uploadUrl, {method: "POST", body: form});
  if (!response.ok) {
    throw new Error(`CV upload failed with status ${response.status}`);
  }
}

export async function uploadCv(file: File): Promise<string> {
  const upload = await requestCvUpload(file);
  await uploadFileToS3(upload, file);
  return upload.fileUrl;
}

export function applyForJob(payload: ApiJobApplicationPayload) {
  return apiRequest("/careers/apply", {method: "POST", body: payload, schema: createdDataSchema});
}

export function applyForInternship(payload: ApiInternshipPayload) {
  return apiRequest("/careers/internship", {method: "POST", body: payload, schema: createdDataSchema});
}

export function subscribeToNewsletter(email: string) {
  return apiRequest("/newsletter/signup", {method: "POST", body: {email}, schema: createdDataSchema});
}

export function unsubscribeFromNewsletter(email: string) {
  return apiRequest("/newsletter/unsubscribe", {method: "POST", body: {email}, schema: createdDataSchema});
}
