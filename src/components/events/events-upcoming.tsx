import {ArrowUpRight, CalendarDays} from "lucide-react";

import {Button} from "#/components/ui/button.tsx";

function NoUpcomingEventsCard() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-foreground/10 bg-[#0a1418] p-8 text-white shadow-2xl sm:p-12 lg:p-16">
      <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#006759]/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-emerald-500/20 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-emerald-400 backdrop-blur-md">
          <CalendarDays className="h-7 w-7" />
        </div>

        <span className="inline-block rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-emerald-400">
          - UPCOMING EVENTS -
        </span>

        <h3 className="mt-4 text-2xl font-black tracking-tight text-white sm:text-3xl lg:text-4xl">No Upcoming Event Yet</h3>

        <p className="mt-4 text-sm sm:text-base leading-relaxed text-slate-300">
          There are no upcoming events scheduled at this moment. Stay tuned for more updates, announcements, and future event registrations
          on our dedicated events website.
        </p>

        <div className="mt-8 flex justify-center">
          <a href="https://arthuriteevents.com/" target="_blank" rel="noopener noreferrer">
            <Button className="h-12 rounded-full bg-[#006759] px-8 text-xs font-bold text-white shadow-xl transition-all hover:bg-emerald-600 hover:scale-105">
              <span>Visit Arthurite Events Website</span>
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}

export function EventsUpcoming() {
  return (
    <section className="bg-sand/50 py-16 text-foreground sm:py-24 dark:bg-slate-900/50">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <NoUpcomingEventsCard />
      </div>
    </section>
  );
}
