type ContactFormSentProps = {
  readonly firstName: string;
};

export function ContactFormSent({firstName}: ContactFormSentProps) {
  return (
    <div role="status" className="rounded-3xl bg-primary-bg p-8 sm:p-12">
      <h2 className="text-2xl font-medium tracking-tight text-foreground sm:text-3xl">Thanks, {firstName}.</h2>
      <p className="mt-3 max-w-md leading-relaxed text-foreground/70">
        Your message is with our cloud team. We&apos;ll get back to you at the email you shared.
      </p>
    </div>
  );
}
