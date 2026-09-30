import {useMutation} from "@tanstack/react-query";
import {ArrowUpRight, CheckCircle, Ticket} from "lucide-react";
import {useState, type FormEvent} from "react";
import {z} from "zod";

import {Button} from "#/components/ui/button.tsx";
import {ApiError} from "#/lib/api/client.ts";
import {registerForEvent} from "#/lib/api/endpoints.ts";
import type {ApiEvent} from "#/lib/api/types.ts";

const registrationSchema = z.object({
  fullName: z.string().trim().min(2, "Enter your full name"),
  email: z.email("Enter a valid email address"),
});

const FIELD_CLASS =
  "w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-400 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20";

function registrationErrorMessage(error: unknown): string {
  if (error instanceof ApiError) {
    if (error.type === "EVENT_FULL") return "This event is at capacity — registration is closed.";
    if (error.type === "ALREADY_REGISTERED") return "This email is already registered for the event.";
  }
  return "We couldn't complete your registration. Please try again.";
}

function RegistrationSuccess() {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-5 text-sm font-semibold text-emerald-300">
      <CheckCircle className="size-6 shrink-0" />
      <span>You&apos;re registered — check your inbox for confirmation.</span>
    </div>
  );
}

function SoldOutNotice() {
  return (
    <p className="rounded-2xl border border-white/10 bg-white/5 p-5 text-sm font-medium text-slate-300">
      This event is at capacity — registration is closed.
    </p>
  );
}

function RegisterForm({event}: {readonly event: ApiEvent}) {
  const [formError, setFormError] = useState<string | null>(null);
  const [registered, setRegistered] = useState(false);
  const mutation = useMutation({
    mutationFn: (payload: z.infer<typeof registrationSchema>) => registerForEvent(event.id, payload),
    onSuccess: () => setRegistered(true),
    onError: (error) => setFormError(registrationErrorMessage(error)),
  });

  function handleSubmit(formEvent: FormEvent<HTMLFormElement>) {
    formEvent.preventDefault();

    const parsed = registrationSchema.safeParse(Object.fromEntries(new FormData(formEvent.currentTarget)));
    if (!parsed.success) {
      const {fieldErrors} = z.flattenError(parsed.error);
      setFormError(fieldErrors.fullName?.[0] ?? fieldErrors.email?.[0] ?? "Check the highlighted fields");
      return;
    }

    setFormError(null);
    mutation.mutate(parsed.data);
  }

  if (registered) return <RegistrationSuccess />;

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <input name="fullName" type="text" placeholder="Full name" autoComplete="name" className={FIELD_CLASS} />
      <input name="email" type="email" placeholder="Work email" autoComplete="email" className={FIELD_CLASS} />

      {formError !== null || mutation.isError ? (
        <p role="alert" className="text-sm text-red-400">
          {formError}
        </p>
      ) : null}

      <Button
        type="submit"
        disabled={mutation.isPending}
        className="h-12 w-full rounded-full bg-[#006759] text-xs font-bold text-white shadow-xl transition-all hover:bg-emerald-600 disabled:opacity-60"
      >
        {mutation.isPending ? "Registering…" : "Register for this event"}
      </Button>
    </form>
  );
}

export function EventRegister({event}: {readonly event: ApiEvent}) {
  const soldOut = event.remainingCapacity === 0;

  return (
    <section className="border-t border-white/5 bg-[#0a1418] py-16 text-white sm:py-20">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-emerald-400">
              <Ticket className="size-3.5" />
              Registration
            </span>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl">
              Reserve your <span className="text-emerald-400">seat</span>
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-300">
              {event.remainingCapacity == null
                ? "Registration is free and open to everyone."
                : `${Math.max(event.remainingCapacity, 0)} of ${event.capacity ?? event.registeredCount + event.remainingCapacity} seats remaining.`}
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-md sm:p-8 lg:col-span-6">
            {soldOut ? (
              <SoldOutNotice />
            ) : event.registrationLink ? (
              <a href={event.registrationLink} target="_blank" rel="noopener noreferrer" className="block">
                <Button className="h-12 w-full rounded-full bg-[#006759] text-xs font-bold text-white shadow-xl transition-all hover:bg-emerald-600">
                  <span>Register on the event website</span>
                  <ArrowUpRight className="size-4" />
                </Button>
              </a>
            ) : (
              <RegisterForm event={event} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
