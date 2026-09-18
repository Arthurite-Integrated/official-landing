import {Link} from "@tanstack/react-router";

import {FEATURED_SPEAKERS, type Speaker} from "#/components/events/events-data.ts";

function SpeakerCard({speaker}: {readonly speaker: Speaker}) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-3xl border border-foreground/10 bg-card shadow-md transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-xl dark:border-white/10">
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-muted">
        {speaker.imageSrc ? (
          <img
            src={speaker.imageSrc}
            alt={speaker.name}
            className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#006759] to-emerald-600 text-2xl font-extrabold text-white">
            {speaker.initials}
          </div>
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <span className="absolute top-3.5 right-3.5 rounded-full border border-white/20 bg-black/50 px-3 py-1 text-xs font-bold text-emerald-300 backdrop-blur-md">
          {speaker.timeSlot}
        </span>

        <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
          <h3 className="text-xl font-black tracking-tight text-white group-hover:text-emerald-300">
            {speaker.name}
          </h3>
          <p className="mt-1 text-xs font-medium text-slate-200">{speaker.role}</p>
        </div>
      </div>
    </div>
  );
}

function ViewAllCard() {
  return (
    <Link
      to="/contact"
      className="group flex aspect-[4/5] min-h-[340px] flex-col items-center justify-center rounded-3xl border-2 border-dashed border-primary/40 bg-primary/5 p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-primary hover:bg-primary hover:text-white"
    >
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary shadow-inner transition-transform group-hover:scale-110 group-hover:bg-white group-hover:text-primary">
        <span className="text-2xl font-black">30+</span>
      </div>
      <span className="text-sm font-black uppercase tracking-wider text-foreground group-hover:text-white">View All Speakers</span>
      <p className="mt-2 text-xs text-muted-foreground group-hover:text-white/80">Explore the complete line-up of global industry keynotes & panellists</p>
    </Link>
  );
}

export function EventsSpeakers() {
  return (
    <section className="bg-sand/30 py-20 text-foreground sm:py-24 dark:bg-slate-900/30">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <div className="mb-14 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-[#006759] sm:text-4xl dark:text-emerald-400">Featured Speakers</h2>
          <p className="mt-2 text-base text-muted-foreground">Learn from global cloud architects, enterprise leaders, and pioneers.</p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURED_SPEAKERS.map((speaker) => (
            <SpeakerCard key={speaker.id} speaker={speaker} />
          ))}
          <ViewAllCard />
        </div>
      </div>
    </section>
  );
}
