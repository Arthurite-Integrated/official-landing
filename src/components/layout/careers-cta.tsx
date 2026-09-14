import {ArrowRight} from "lucide-react";

export function CareersCta() {
  return (
    <section className="relative isolate overflow-hidden bg-background px-5 py-20 sm:px-8 lg:py-24">
      <div className="relative z-10 mx-auto max-w-4xl rounded-3xl border border-foreground/10 bg-[#f2f2f0] p-10 text-center sm:p-14">
        <h2 className="text-3xl font-medium tracking-tight text-foreground sm:text-5xl">Ready to take the next step?</h2>

        <p className="mx-auto mt-4 max-w-xl text-base text-foreground/70 sm:text-lg">
          Join our team of cloud experts and start building scalable infrastructure solutions today.
        </p>

        <div className="mt-8">
          <a
            href="#open-roles"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-semibold text-white transition-all duration-200 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20"
          >
            <span>See Open Roles</span>
            <ArrowRight className="size-4.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
