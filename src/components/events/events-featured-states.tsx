import {ArrowUpRight} from "lucide-react";

import {Button} from "#/components/ui/button.tsx";

export function FeaturedHeader() {
  return (
    <div className="mb-12 text-center">
      <span className="inline-block rounded-full border border-foreground/20 bg-foreground/5 px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-foreground/70">
        - FLAGSHIP CONFERENCES -
      </span>
      <h2 className="mt-3 text-3xl font-black tracking-tight text-foreground sm:text-4xl lg:text-5xl">
        Featured <span className="text-primary">Events</span>
      </h2>
      <p className="mt-3 text-sm text-muted-foreground max-w-xl mx-auto">
        Experience world-class AWS cloud architectures, GenAI engineering, and enterprise compliance live in Nigeria
      </p>
    </div>
  );
}

export function FeaturedShell({children}: {readonly children: React.ReactNode}) {
  return (
    <section className="bg-background py-20 text-foreground sm:py-28 border-t border-foreground/10">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">{children}</div>
    </section>
  );
}

export function FeaturedSkeleton() {
  return (
    <FeaturedShell>
      <FeaturedHeader />
      <div className="h-96 animate-pulse rounded-3xl bg-foreground/5" aria-busy="true" aria-label="Loading featured events" />
    </FeaturedShell>
  );
}

export function FeaturedError({onRetry}: {readonly onRetry: () => void}) {
  return (
    <FeaturedShell>
      <FeaturedHeader />
      <div className="rounded-3xl border border-foreground/10 bg-sand p-10 text-center sm:p-14">
        <p role="alert" className="text-sm text-foreground/70 sm:text-base">
          We couldn't load our events right now. Please try again.
        </p>
        <Button onClick={onRetry} className="mt-6 h-11 rounded-full bg-primary px-7 text-xs font-bold text-white hover:bg-lagoon-deep">
          Try again
        </Button>
      </div>
    </FeaturedShell>
  );
}

export function FeaturedEmpty() {
  return (
    <FeaturedShell>
      <FeaturedHeader />
      <div className="relative overflow-hidden rounded-3xl border border-foreground/10 bg-[#0a1418] p-8 text-white shadow-2xl sm:p-12 lg:p-16">
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-emerald-500/20 blur-3xl" />
        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <h3 className="text-2xl font-black tracking-tight text-white sm:text-3xl">No Upcoming Event Yet</h3>
          <p className="mt-4 text-sm sm:text-base leading-relaxed text-slate-300">
            There are no upcoming events scheduled at this moment. Stay tuned for more updates, announcements, and future event
            registrations on our dedicated events website.
          </p>
          <div className="mt-8 flex justify-center">
            <a href="https://arthuriteevents.com/" target="_blank" rel="noopener noreferrer">
              <Button className="h-12 rounded-full bg-primary px-8 text-xs font-bold text-white shadow-xl transition-all hover:bg-lagoon-deep hover:scale-105">
                <span>Visit Arthurite Events Website</span>
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Button>
            </a>
          </div>
        </div>
      </div>
    </FeaturedShell>
  );
}
