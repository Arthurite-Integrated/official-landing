import {ContactForm} from "#/components/contact/contact-form.tsx";
import {ContactIntro} from "#/components/contact/contact-intro.tsx";
import {PartnerMarquee} from "#/components/layout/partner-marquee.tsx";
import {submitContactRequest} from "#/lib/submit-enquiry.ts";

export function ContactPage() {
  return (
    <main className="bg-background">
      <div className="mx-auto grid max-w-6xl items-start gap-14 px-5 pt-32 pb-8 sm:px-8 lg:grid-cols-[1fr_1.1fr] lg:gap-20 lg:pt-44 xl:max-w-7xl">
        <ContactIntro />
        <ContactForm onSubmit={submitContactRequest} />
      </div>

      <PartnerMarquee />
    </main>
  );
}
