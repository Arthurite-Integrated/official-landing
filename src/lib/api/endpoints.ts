import {queryOptions} from "@tanstack/react-query";

import {apiRequest} from "#/lib/api/client.ts";
import {
  apiEventPageSchema,
  apiEventSchema,
  apiJobPageSchema,
  apiJobSchema,
  createdDataSchema,
  uploadResultSchema,
  type ApiContactPayload,
  type ApiEventRegistrationPayload,
  type ApiInternshipPayload,
  type ApiJobApplicationPayload,
  type ApiUploadResult,
} from "#/lib/api/types.ts";

export type ListEventsParams = {
  readonly status?: "upcoming" | "ongoing" | "completed" | "cancelled";
  readonly cursor?: string;
  readonly limit?: number;
};

export function listEvents(params: ListEventsParams = {}) {
  return apiRequest("/events", {
    query: {status: params.status, cursor: params.cursor, limit: params.limit},
    schema: apiEventPageSchema,
  });
}

export const eventsQueryOptions = (params: ListEventsParams = {status: "upcoming"}) =>
  queryOptions({queryKey: ["events", params], queryFn: () => listEvents(params), retry: 1});

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

export type ListJobsParams = {
  readonly status?: "open" | "closed";
  readonly cursor?: string;
  readonly limit?: number;
};

export function listJobs(params: ListJobsParams = {status: "open"}) {
  return apiRequest("/careers", {
    query: {status: params.status, cursor: params.cursor, limit: params.limit},
    schema: apiJobPageSchema,
  });
}

export const jobsQueryOptions = (params: ListJobsParams = {status: "open"}) =>
  queryOptions({queryKey: ["careers", params], queryFn: () => listJobs(params), retry: 1});

export function getJob(id: string) {
  return apiRequest(`/careers/${id}`, {schema: apiJobSchema});
}

export const jobQueryOptions = (id: string) => queryOptions({queryKey: ["careers", "detail", id], queryFn: () => getJob(id), retry: false});

export type CvUploadFile = {
  readonly fileName: string;
  readonly contentType: string;
  readonly size: number;
};

export function requestCvUpload(file: CvUploadFile) {
  return apiRequest("/upload", {method: "POST", body: {purpose: "cv", ...file}, schema: uploadResultSchema});
}

export async function uploadFileToS3(upload: ApiUploadResult, file: File): Promise<void> {
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

export function applyForJob(payload: ApiJobApplicationPayload) {
  return apiRequest("/careers/apply", {method: "POST", body: payload, schema: createdDataSchema});
}

export function applyForInternship(payload: ApiInternshipPayload) {
  return apiRequest("/careers/internship", {method: "POST", body: payload, schema: createdDataSchema});
}
