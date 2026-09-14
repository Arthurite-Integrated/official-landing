import type {ContactRequest} from "#/lib/contact-request.ts";

async function postEnquiry(body: object): Promise<void> {
  const endpoint = import.meta.env.VITE_ENQUIRY_ENDPOINT;

  if (!endpoint) {
    throw new Error("VITE_ENQUIRY_ENDPOINT is not configured");
  }

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {"content-type": "application/json"},
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`Enquiry endpoint responded with ${response.status}`);
  }
}

export function submitEnquiry(prompt: string): Promise<void> {
  return postEnquiry({prompt});
}

export function submitContactRequest(request: ContactRequest): Promise<void> {
  return postEnquiry(request);
}
