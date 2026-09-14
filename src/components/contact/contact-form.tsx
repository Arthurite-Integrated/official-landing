import {useState, type FormEvent} from "react";
import {ArrowRight} from "lucide-react";

import {ContactFormFields} from "#/components/contact/contact-form-fields.tsx";
import {ContactFormSent} from "#/components/contact/contact-form-sent.tsx";
import {CONTACT_EMAIL} from "#/components/layout/footer-content.ts";
import {usePromptSubmission} from "#/hooks/use-prompt-submission.ts";
import {parseContactRequest} from "#/lib/contact-request.ts";
import type {ContactFieldErrors, ContactRequest} from "#/lib/contact-request.ts";

const FORM_TITLE_ID = "contact-form-title";

type ContactFormProps = {
  readonly onSubmit: (request: ContactRequest) => Promise<void>;
};

export function ContactForm({onSubmit}: ContactFormProps) {
  const [errors, setErrors] = useState<ContactFieldErrors>({});
  const [sentTo, setSentTo] = useState<string | null>(null);
  const {status, send} = usePromptSubmission(onSubmit);
  const sending = status === "sending";

  async function sendRequest(values: Record<string, unknown>) {
    const parsed = parseContactRequest(values);

    setErrors(parsed.success ? {} : parsed.errors);
    if (parsed.success && (await send(parsed.data))) setSentTo(parsed.data.firstName);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void sendRequest(Object.fromEntries(new FormData(event.currentTarget)));
  }

  if (sentTo !== null) {
    return <ContactFormSent firstName={sentTo} />;
  }

  return (
    <form aria-labelledby={FORM_TITLE_ID} noValidate onSubmit={handleSubmit} className="rounded-3xl bg-primary-bg p-6 sm:p-10">
      <h2 id={FORM_TITLE_ID} className="mb-8 text-xl font-medium tracking-tight text-foreground">
        Contact our team
      </h2>

      <ContactFormFields errors={errors} />

      {status === "failed" ? (
        <p role="alert" className="mt-6 text-sm text-destructive">
          We couldn&apos;t send your message. Please try again or email {CONTACT_EMAIL}.
        </p>
      ) : null}

      <button
        type="submit"
        disabled={sending}
        className="mt-8 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary px-7 text-sm font-semibold text-white transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {sending ? "Sending…" : "Submit"}
        {sending ? null : <ArrowRight className="size-4" aria-hidden />}
      </button>
    </form>
  );
}
