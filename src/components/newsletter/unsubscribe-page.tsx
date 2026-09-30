import {NewsletterUnsubscribe} from "#/components/newsletter/newsletter-unsubscribe.tsx";

export function UnsubscribePage() {
  return (
    <main className="bg-background px-5 pt-32 pb-8 sm:px-8 lg:pt-44">
      <section aria-labelledby="unsubscribe-title" className="mx-auto max-w-2xl rounded-3xl bg-primary p-8 text-primary-bg sm:p-12">
        <h1 id="unsubscribe-title" className="text-3xl font-medium tracking-tight sm:text-4xl">
          Unsubscribe from our newsletter
        </h1>
        <p className="mt-3 mb-8 text-sm leading-relaxed text-primary-bg/70">
          Enter the email address you subscribed with and we'll stop sending you updates.
        </p>
        <NewsletterUnsubscribe />
      </section>
    </main>
  );
}
