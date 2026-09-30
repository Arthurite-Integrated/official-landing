import {NewsletterForm} from "#/components/newsletter/newsletter-form.tsx";
import {unsubscribeFromNewsletter} from "#/lib/api/endpoints.ts";

export function NewsletterUnsubscribe() {
  return (
    <NewsletterForm
      onSubmit={unsubscribeFromNewsletter}
      submitLabel="Unsubscribe"
      successMessage="You've been unsubscribed. You won't receive our newsletter any more."
      failureMessage="We couldn't unsubscribe you right now. Please try again."
    />
  );
}
