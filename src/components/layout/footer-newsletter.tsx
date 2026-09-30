import {NewsletterSignup} from "#/components/newsletter/newsletter-signup.tsx";

export function FooterNewsletter() {
  return (
    <div className="mt-16 grid gap-6 lg:grid-cols-[1.3fr_1fr] lg:items-end">
      <div>
        <h3 className="text-2xl font-medium tracking-tight">Cloud insights, in your inbox.</h3>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-primary-bg/70">
          AWS news, engineering notes and event invites from the Arthurite team.
        </p>
      </div>
      <NewsletterSignup />
    </div>
  );
}
