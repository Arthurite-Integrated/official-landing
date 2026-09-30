import {useMutation} from "@tanstack/react-query";
import {CheckCircle, Send} from "lucide-react";
import {useState, type FormEvent, type ReactNode} from "react";
import {z} from "zod";

import type {OpenRole} from "#/components/layout/careers-data.ts";
import {DialogCloseButton, DialogFrame} from "#/components/ui/dialog-frame.tsx";
import {ApiError} from "#/lib/api/client.ts";
import {applyForJob, uploadCv} from "#/lib/api/endpoints.ts";
import {CV_HINT, cvFileError} from "#/lib/cv-file.ts";
import {phoneSchema} from "#/lib/phone.ts";

const TITLE_ID = "careers-apply-title";

const applicationSchema = z.object({
  fullName: z.string().trim().min(2, "Enter your full name"),
  email: z.email("Enter a valid email address"),
  phone: phoneSchema,
});

type ApplyFieldErrors = Partial<Record<"fullName" | "email" | "phone" | "cv", string>>;

const INPUT_CLASS =
  "mt-2 w-full rounded-xl border border-foreground/15 bg-foam px-4 py-3 text-sm text-foreground placeholder-foreground/40 focus:border-primary focus:outline-none";

type ApplyFieldProps = {
  readonly id: string;
  readonly label: string;
  readonly error?: string;
  readonly children: ReactNode;
};

function ApplyField({id, label, error, children}: ApplyFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-xs font-semibold tracking-wider text-foreground/80 uppercase">
        {label}
      </label>
      {children}
      {error === undefined ? null : <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
}

function validateFile(file: File | null): string | undefined {
  return file ? cvFileError(file) : `Attach your CV (${CV_HINT})`;
}

function applicationErrorMessage(error: unknown): string {
  if (error instanceof ApiError && error.type === "JOB_CLOSED") return "This role is no longer accepting applications.";
  return "We couldn't submit your application. Please try again.";
}

function fieldErrorsOf(error: z.ZodError): ApplyFieldErrors {
  const {fieldErrors} = z.flattenError(error) as {fieldErrors: Record<string, string[] | undefined>};
  return Object.fromEntries(Object.entries(fieldErrors).map(([key, messages]) => [key, messages?.[0] ?? "Invalid value"]));
}

type ApplyFormFieldsProps = {
  readonly errors: ApplyFieldErrors;
  readonly onFileChange: (file: File | null) => void;
};

function ApplyFormFields({errors, onFileChange}: ApplyFormFieldsProps) {
  return (
    <>
      <ApplyField id="apply-full-name" label="Full name" error={errors.fullName}>
        <input id="apply-full-name" name="fullName" type="text" autoComplete="name" className={INPUT_CLASS} />
      </ApplyField>

      <div className="grid gap-5 sm:grid-cols-2">
        <ApplyField id="apply-email" label="Email" error={errors.email}>
          <input id="apply-email" name="email" type="email" autoComplete="email" className={INPUT_CLASS} />
        </ApplyField>
        <ApplyField id="apply-phone" label="Phone" error={errors.phone}>
          <input id="apply-phone" name="phone" type="tel" autoComplete="tel" placeholder="+2348012345678" className={INPUT_CLASS} />
        </ApplyField>
      </div>

      <ApplyField id="apply-cv" label={`CV (${CV_HINT})`} error={errors.cv}>
        <input
          id="apply-cv"
          name="cv"
          type="file"
          accept=".pdf,.docx"
          onChange={(event) => onFileChange(event.target.files?.[0] ?? null)}
          className="mt-2 block w-full text-sm text-foreground/70 file:mr-4 file:rounded-full file:border-0 file:bg-primary/10 file:px-5 file:py-2.5 file:text-xs file:font-semibold file:text-primary hover:file:bg-primary/20"
        />
      </ApplyField>
    </>
  );
}

function ApplySuccess({role}: {readonly role: OpenRole}) {
  return (
    <div className="py-10 text-center">
      <CheckCircle className="mx-auto size-14 text-primary" />
      <h3 className="mt-4 text-xl font-medium text-foreground">Application sent</h3>
      <p className="mt-2 text-sm text-foreground/70">
        Thanks for applying to <strong>{role.title}</strong>. Our team will review your CV and reach out.
      </p>
    </div>
  );
}

function ApplyForm({role}: {readonly role: OpenRole}) {
  const [errors, setErrors] = useState<ApplyFieldErrors>({});
  const [cv, setCv] = useState<File | null>(null);
  const mutation = useMutation({
    mutationFn: async (values: z.infer<typeof applicationSchema> & {readonly cv: File}) => {
      const cvUrl = await uploadCv(values.cv);
      return applyForJob({jobId: role.id, fullName: values.fullName, email: values.email, phone: values.phone, cvUrl});
    },
  });

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const parsed = applicationSchema.safeParse(Object.fromEntries(new FormData(event.currentTarget)));
    const next: ApplyFieldErrors = parsed.success ? {} : fieldErrorsOf(parsed.error);
    const cvError = validateFile(cv);
    if (cvError !== undefined) next.cv = cvError;

    setErrors(next);
    if (parsed.success && cv) mutation.mutate({...parsed.data, cv});
  }

  if (mutation.isSuccess) return <ApplySuccess role={role} />;

  return (
    <form noValidate onSubmit={handleSubmit} className="mt-6 space-y-5">
      <ApplyFormFields errors={errors} onFileChange={setCv} />

      {mutation.isError ? (
        <p role="alert" className="text-sm text-destructive">
          {applicationErrorMessage(mutation.error)}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={mutation.isPending}
        className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary px-7 text-sm font-semibold text-white transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {mutation.isPending ? "Submitting…" : "Submit application"}
        {mutation.isPending ? null : <Send className="size-4" aria-hidden />}
      </button>
    </form>
  );
}

export function CareersApplyModal({role, onClose}: {readonly role: OpenRole; readonly onClose: () => void}) {
  return (
    <DialogFrame labelledBy={TITLE_ID} onClose={onClose}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 id={TITLE_ID} className="text-xl font-medium tracking-tight text-foreground sm:text-2xl">
            Apply — {role.title}
          </h2>
          <p className="mt-2 text-sm text-foreground/60">
            {role.department} · {role.location}
          </p>
        </div>
        <DialogCloseButton onClose={onClose} />
      </div>

      <ApplyForm role={role} />
    </DialogFrame>
  );
}
