import {useState, type FormEvent} from "react";
import {z} from "zod";

import {usePromptSubmission} from "#/hooks/use-prompt-submission.ts";

const emailSchema = z.string().trim().pipe(z.email());

type NewsletterFormProps = {
  readonly onSubmit: (email: string) => Promise<unknown>;
  readonly submitLabel: string;
  readonly successMessage: string;
  readonly failureMessage: string;
};

export function NewsletterForm({onSubmit, submitLabel, successMessage, failureMessage}: NewsletterFormProps) {
  const [invalid, setInvalid] = useState(false);
  const {status, send} = usePromptSubmission(onSubmit);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const parsed = emailSchema.safeParse(new FormData(event.currentTarget).get("email"));

    setInvalid(!parsed.success);
    if (parsed.success) void send(parsed.data);
  }

  if (status === "sent") return <p role="status">{successMessage}</p>;

  return (
    <form noValidate onSubmit={handleSubmit}>
      <div className="flex flex-col gap-3 sm:flex-row">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@company.com"
          aria-invalid={invalid}
          className="h-12 w-full min-w-0 rounded-full sm:flex-1 border border-primary-bg/30 bg-transparent px-5 text-sm text-primary-bg outline-none placeholder:text-primary-bg/50 focus:border-primary-bg aria-invalid:border-destructive"
        />
        <button
          type="submit"
          disabled={status === "sending"}
          className="h-12 rounded-full bg-primary-bg px-6 text-sm font-semibold text-primary transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "sending" ? "Sending…" : submitLabel}
        </button>
      </div>
      {invalid ? (
        <p role="alert" className="mt-3 text-sm">
          Enter a valid email address.
        </p>
      ) : null}
      {status === "failed" ? (
        <p role="alert" className="mt-3 text-sm">
          {failureMessage}
        </p>
      ) : null}
    </form>
  );
}
