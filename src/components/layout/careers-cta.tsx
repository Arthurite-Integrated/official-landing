import {ArrowRight} from "lucide-react";

export function CareersCta() {
  return (
    <section className="relative isolate overflow-hidden bg-black px-5 py-20 sm:px-8 lg:py-24">
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.15),transparent_70%)]" />

      <div className="relative z-10 mx-auto max-w-4xl rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-transparent p-10 text-center sm:p-14">
        <h2 className="text-3xl font-medium tracking-tight text-white sm:text-5xl">Ready to take the next step?</h2>

        <p className="mx-auto mt-4 max-w-xl text-base text-white/70 sm:text-lg">
          Join our team of cloud experts and start building scalable infrastructure solutions today.
        </p>

        <div className="mt-8">
          <a
            href="#open-roles"
            className="inline-flex items-center gap-2 rounded-full bg-emerald-400 px-8 py-4 text-sm font-semibold text-black transition-all duration-200 hover:bg-emerald-300 hover:shadow-lg hover:shadow-emerald-400/20"
          >
            <span>See Open Roles</span>
            <ArrowRight className="size-4.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
