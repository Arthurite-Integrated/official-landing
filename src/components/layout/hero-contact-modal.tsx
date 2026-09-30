import {useState, type FormEvent} from "react";
import {Send} from "lucide-react";

import {ContactIdentityFields} from "#/components/contact/contact-form-fields.tsx";
import {CONTACT_EMAIL} from "#/components/layout/footer-content.ts";
import {DialogCloseButton, DialogFrame} from "#/components/ui/dialog-frame.tsx";
import type {SendStatus} from "#/hooks/use-prompt-submission.ts";
import {parseEnquiryDetails} from "#/lib/contact-request.ts";
import type {ContactFieldErrors, EnquiryDetails} from "#/lib/contact-request.ts";

const TITLE_ID = "hero-contact-modal-title";

type HeroContactModalProps = {
  readonly prompt: string;
  readonly status: SendStatus;
  readonly onClose: () => void;
  readonly onSubmit: (details: EnquiryDetails) => void;
};

export function HeroContactModal({prompt, status, onClose, onSubmit}: HeroContactModalProps) {
  const [errors, setErrors] = useState<ContactFieldErrors>({});
  const sending = status === "sending";

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const parsed = parseEnquiryDetails(Object.fromEntries(new FormData(event.currentTarget)));
    setErrors(parsed.success ? {} : parsed.errors);
    if (parsed.success) onSubmit(parsed.data);
  }

  return (
    <DialogFrame labelledBy={TITLE_ID} onClose={onClose}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 id={TITLE_ID} className="text-xl font-medium tracking-tight text-foreground sm:text-2xl">
            Almost there — where should we reply?
          </h2>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-foreground/60">
            Tell us who you are and we&apos;ll get back to you about:
          </p>
        </div>
        <DialogCloseButton onClose={onClose} />
      </div>

      <blockquote className="mt-4 rounded-2xl border border-foreground/10 bg-foreground/[0.03] px-4 py-3 text-sm text-foreground/80 italic">
        “{prompt}”
      </blockquote>

      <form noValidate onSubmit={handleSubmit} className="mt-6">
        <div className="grid gap-5 sm:grid-cols-2">
          <ContactIdentityFields errors={errors} />
        </div>

        {status === "failed" ? (
          <p role="alert" className="mt-6 text-sm text-destructive">
            We couldn&apos;t send your message. Please try again or email {CONTACT_EMAIL}.
          </p>
        ) : null}

        <button
          type="submit"
          disabled={sending}
          className="mt-8 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary px-7 text-sm font-semibold text-white transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {sending ? "Sending…" : "Send message"}
          {sending ? null : <Send className="size-4" aria-hidden />}
        </button>
      </form>
    </DialogFrame>
  );
}
