import type {z} from "zod";

type ApiErrorInit = {
  readonly message: string;
  readonly status: number;
  readonly type?: string;
  readonly details?: unknown;
};

export class ApiError extends Error {
  readonly status: number;
  readonly type?: string;
  readonly details?: unknown;

  constructor({message, status, type, details}: ApiErrorInit) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.type = type;
    this.details = details;
  }
}

type ApiRequestOptions<T> = {
  readonly method?: "GET" | "POST" | "PATCH" | "DELETE";
  readonly body?: unknown;
  readonly query?: Record<string, string | number | undefined>;
  readonly schema: z.ZodType<T>;
};

function apiBaseUrl(): string {
  const base = import.meta.env.VITE_API_BASE_URL;
  if (!base) {
    throw new Error("VITE_API_BASE_URL is not configured");
  }
  return base.replace(/\/+$/, "");
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function apiUrl(path: string, query?: Record<string, string | number | undefined>): string {
  const url = new URL(`${apiBaseUrl()}${path}`);
  for (const [key, value] of Object.entries(query ?? {})) {
    if (value !== undefined) url.searchParams.set(key, String(value));
  }
  return url.toString();
}

function toApiError(status: number, envelope: unknown): ApiError {
  const error = isRecord(envelope) && isRecord(envelope["error"]) ? envelope["error"] : {};
  return new ApiError({
    message: typeof error["message"] === "string" ? error["message"] : `Request failed with status ${status}`,
    status,
    type: typeof error["type"] === "string" ? error["type"] : undefined,
    details: error["details"],
  });
}

export async function apiRequest<T>(path: string, {method = "GET", body, query, schema}: ApiRequestOptions<T>): Promise<T> {
  const response = await fetch(apiUrl(path, query), {
    method,
    headers: {"content-type": "application/json"},
    ...(body === undefined ? {} : {body: JSON.stringify(body)}),
  });

  const envelope: unknown = await response.json().catch(() => null);

  if (!response.ok || (isRecord(envelope) && envelope["success"] === false)) {
    throw toApiError(response.status, envelope);
  }

  return schema.parse(isRecord(envelope) ? envelope["data"] : undefined);
}
