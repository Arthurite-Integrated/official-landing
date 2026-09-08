export async function submitEnquiry(prompt: string): Promise<void> {
  const endpoint = import.meta.env.VITE_ENQUIRY_ENDPOINT;

  if (!endpoint) {
    throw new Error("VITE_ENQUIRY_ENDPOINT is not configured");
  }

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {"content-type": "application/json"},
    body: JSON.stringify({prompt}),
  });

  if (!response.ok) {
    throw new Error(`Enquiry endpoint responded with ${response.status}`);
  }
}
