import {Link} from "@tanstack/react-router";

import {FEATURED_SPEAKERS, type Speaker} from "#/components/events/events-data.ts";

function SpeakerCard({speaker}: {readonly speaker: Speaker}) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-foreground/10 bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-md dark:border-white/10">
      <div className="relative aspect-4/3 w-full overflow-hidden bg-muted">
        {speaker.imageSrc ? (
          <img
            src={speaker.imageSrc}
            alt={speaker.name}
            className="h-full w-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#006759] to-emerald-600 text-xl font-extrabold text-white">
            {speaker.initials}
          </div>
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
        <span className="absolute bottom-2.5 left-2.5 rounded-full bg-black/40 px-2.5 py-0.5 text-[10px] font-semibold text-white backdrop-blur-xs">
          {speaker.timeSlot}
        </span>
      </div>

      <div className="flex flex-1 flex-col justify-between p-4">
        <div>
          <h3 className="text-base font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
            {speaker.name}
          </h3>
          <p className="mt-1 text-xs text-muted-foreground">{speaker.role}</p>
        </div>
      </div>
    </div>
  );
}

function ViewAllCard() {
  return (
    <Link
      to="/contact"
      className="group flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-primary/30 bg-primary/5 p-6 text-center shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:bg-primary hover:text-white"
    >
      <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary shadow-inner transition-colors group-hover:bg-white group-hover:text-primary">
        <span className="text-xl font-black">30+</span>
      </div>
      <span className="text-xs font-bold uppercase tracking-wider text-foreground group-hover:text-white">View All Speakers</span>
      <p className="mt-1 text-[11px] text-muted-foreground group-hover:text-white/80">Explore full lineup & sessions</p>
    </Link>
  );
}

export function EventsSpeakers() {
  return (
    <section className="bg-sand/30 py-20 text-foreground sm:py-24 dark:bg-slate-900/30">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-[#006759] sm:text-4xl dark:text-emerald-400">Featured Speakers</h2>
          <p className="mt-2 text-sm text-muted-foreground">Learn from global cloud architects, enterprise leaders, and pioneers.</p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {FEATURED_SPEAKERS.map((speaker) => (
            <SpeakerCard key={speaker.id} speaker={speaker} />
          ))}
          <ViewAllCard />
        </div>
      </div>
    </section>
  );
}
