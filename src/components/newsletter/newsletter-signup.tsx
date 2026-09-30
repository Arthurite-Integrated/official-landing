import {NewsletterForm} from "#/components/newsletter/newsletter-form.tsx";
import {ApiError} from "#/lib/api/client.ts";
import {subscribeToNewsletter} from "#/lib/api/endpoints.ts";

async function subscribe(email: string) {
  try {
    await subscribeToNewsletter(email);
  } catch (error) {
    if (!(error instanceof ApiError && error.type === "ALREADY_SUBSCRIBED")) throw error;
  }
}

export function NewsletterSignup() {
  return (
    <NewsletterForm
      onSubmit={subscribe}
      submitLabel="Subscribe"
      successMessage="Thanks for subscribing. Watch your inbox for our next update."
      failureMessage="We couldn't subscribe you right now. Please try again."
    />
  );
}
