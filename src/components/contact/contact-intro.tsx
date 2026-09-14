import {CopyEmailButton} from "#/components/contact/copy-email-button.tsx";
import {CONTACT_EMAIL} from "#/components/layout/footer-content.ts";

export function ContactIntro() {
  return (
    <div className="lg:sticky lg:top-32">
      <h1 className="text-5xl leading-[0.95] font-medium tracking-tight text-foreground sm:text-6xl lg:text-7xl">
        Let&apos;s talk <span className="text-primary">cloud</span>.
      </h1>
      <p className="mt-6 max-w-md text-lg leading-relaxed text-foreground/70">
        Talk with a member of our cloud team to plan a migration, review your AWS setup, or answer any other questions you may have.
      </p>

      <p className="mt-10 max-w-md text-sm leading-relaxed text-foreground/60">
        Already a client and need support?{" "}
        <a href={`mailto:${CONTACT_EMAIL}`} className="font-medium text-primary underline-offset-4 hover:underline">
          {CONTACT_EMAIL}
        </a>{" "}
        or <CopyEmailButton />
      </p>
    </div>
  );
}
