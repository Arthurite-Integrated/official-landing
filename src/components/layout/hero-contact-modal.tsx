import {useEffect, useState, type FormEvent, type ReactNode} from "react";
import {Send, X} from "lucide-react";

import {ContactIdentityFields} from "#/components/contact/contact-form-fields.tsx";
import {CONTACT_EMAIL} from "#/components/layout/footer-content.ts";
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

type ModalFrameProps = {
  readonly prompt: string;
  readonly onClose: () => void;
  readonly children: ReactNode;
};

function ModalFrame({prompt, onClose, children}: ModalFrameProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-[#0a1418]/75 backdrop-blur-sm animate-in fade-in duration-200"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={TITLE_ID}
        className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-primary-bg p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200 sm:p-8"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 id={TITLE_ID} className="text-xl font-medium tracking-tight text-foreground sm:text-2xl">
              Almost there — where should we reply?
            </h2>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-foreground/60">
              Tell us who you are and we&apos;ll get back to you about:
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="rounded-lg p-2 text-foreground/60 transition-colors hover:bg-foreground/5 hover:text-foreground"
          >
            <X className="size-5" />
          </button>
        </div>

        <blockquote className="mt-4 rounded-2xl border border-foreground/10 bg-foreground/[0.03] px-4 py-3 text-sm text-foreground/80 italic">
          “{prompt}”
        </blockquote>

        {children}
      </div>
    </div>
  );
}

export function HeroContactModal({prompt, status, onClose, onSubmit}: HeroContactModalProps) {
  const [errors, setErrors] = useState<ContactFieldErrors>({});
  const sending = status === "sending";

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const parsed = parseEnquiryDetails(Object.fromEntries(new FormData(event.currentTarget)));
    setErrors(parsed.success ? {} : parsed.errors);
    if (parsed.success) onSubmit(parsed.data);
  }

  return (
    <ModalFrame prompt={prompt} onClose={onClose}>
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
    </ModalFrame>
  );
}
