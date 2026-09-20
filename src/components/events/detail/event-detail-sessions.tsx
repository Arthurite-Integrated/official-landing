import {Link} from "@tanstack/react-router";
import {ArrowUpRight} from "lucide-react";

import {Button} from "#/components/ui/button.tsx";

const SESSIONS = [
  {
    id: "s1",
    badge: "Nov 12 // Lagos, Nigeria",
    title: "Proof Creative Systems",
    speaker: "Dr. Arthur Okon",
    role: "Creative Director",
    image: "/services/real_arch.jpg",
  },
  {
    id: "s2",
    badge: "Nov 18 // New York, USA",
    title: "Brand Identity in AI Era",
    speaker: "Chidi Nnamdi",
    role: "Art Director",
    image: "/services/real_ai.jpg",
  },
  {
    id: "s3",
    badge: "Dec 05 // Abuja, Nigeria",
    title: "Next-Gen Cloud Automation",
    speaker: "Folake Adebayo",
    role: "Cloud Strategist",
    image: "/services/real_sec.jpg",
  },
];

function SessionCardItem({session}: {readonly session: (typeof SESSIONS)[number]}) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-3xl border border-foreground/10 bg-card shadow-md transition-all duration-300 hover:-translate-y-2 hover:border-primary/40 hover:shadow-2xl">
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-slate-900">
        <img
          src={session.image}
          alt={session.title}
          className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

        <div className="absolute top-4 left-4">
          <span className="rounded-full bg-black/60 px-3 py-1 text-[11px] font-bold text-white backdrop-blur-md">{session.badge}</span>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h3 className="text-2xl font-black tracking-tight text-white group-hover:text-emerald-300">{session.title}</h3>
          <p className="mt-3 text-base font-extrabold text-slate-100">{session.speaker}</p>
          <p className="text-xs text-slate-400">{session.role}</p>
        </div>
      </div>
    </div>
  );
}

export function EventDetailSessions() {
  return (
    <section className="relative bg-background pt-16 pb-24 text-foreground sm:pt-20 sm:pb-32">
      {/* Stepped top geometric shape */}
      <div className="absolute top-0 left-0 right-0 h-10 bg-[#0a1418] [clip-path:polygon(0_0,100%_0,100%_100%,0_0)]" />

      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <div className="mb-12">
          <span className="inline-block rounded-full border border-foreground/20 bg-foreground/5 px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-foreground/70">
            - UPCOMING EVENTS -
          </span>
          <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="text-4xl font-black tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Con-fret <span className="text-foreground/30 font-extrabold">Event</span>
            </h2>

            <Link to="/contact">
              <Button className="h-11 rounded-full bg-[#006759] px-6 text-xs font-bold text-white hover:bg-emerald-600">
                <span>View More</span>
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {SESSIONS.map((session) => (
            <SessionCardItem key={session.id} session={session} />
          ))}
        </div>
      </div>
    </section>
  );
}
