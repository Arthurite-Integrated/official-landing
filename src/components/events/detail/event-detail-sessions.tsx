import {Link} from "@tanstack/react-router";
import {ArrowRight, Calendar} from "lucide-react";

import {Button} from "#/components/ui/button.tsx";

const SESSIONS = [
  {
    id: "sess-1",
    dateVenue: "Sun 12 / Lagos, Nigeria",
    title: "Proof Creative Systems",
    speaker: "Dr. Arthur Okon",
    role: "Chief Architect",
    image: "/services/real_arch.jpg",
  },
  {
    id: "sess-2",
    dateVenue: "Nov 15 / Abuja, Nigeria",
    title: "Brand Identity in AI Era",
    speaker: "Chidi Nnamdi",
    role: "AI Solutions Lead",
    image: "/services/real_ai.jpg",
  },
  {
    id: "sess-3",
    dateVenue: "Dec 05 / London, UK",
    title: "Cloud Security Guardrails",
    speaker: "Folake Adebayo",
    role: "Security Director",
    image: "/services/real_sec.jpg",
  },
];

function SessionCardItem({session}: {readonly session: (typeof SESSIONS)[number]}) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-3xl border border-foreground/10 bg-card shadow-md transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-xl dark:border-white/10">
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-muted">
        <img
          src={session.image}
          alt={session.title}
          className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

        <div className="absolute top-3.5 left-3.5 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/60 px-3 py-1 text-[10px] font-bold text-emerald-300 backdrop-blur-md">
          <Calendar className="h-3 w-3 text-emerald-400" />
          <span>{session.dateVenue}</span>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
          <h3 className="text-xl font-black tracking-tight text-white group-hover:text-emerald-300">
            {session.title}
          </h3>
          <p className="mt-2 text-sm font-extrabold text-slate-200">{session.speaker}</p>
          <p className="text-xs text-slate-400">{session.role}</p>
        </div>
      </div>
    </div>
  );
}

export function EventDetailSessions() {
  return (
    <section className="relative bg-background pt-16 pb-24 text-foreground sm:pt-20 sm:pb-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-2 text-xs font-bold uppercase tracking-widest text-[#006759] dark:text-emerald-400">
              // UPCOMING SESSIONS
            </div>
            <h2 className="text-3xl font-black tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Conference <span className="text-foreground/40 font-bold">Sessions</span>
            </h2>
          </div>

          <Link to="/contact">
            <Button className="h-10 rounded-full bg-[#006759] px-5 text-xs font-bold text-white hover:bg-emerald-600">
              <span>View All</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SESSIONS.map((session) => (
            <SessionCardItem key={session.id} session={session} />
          ))}
        </div>
      </div>
    </section>
  );
}
