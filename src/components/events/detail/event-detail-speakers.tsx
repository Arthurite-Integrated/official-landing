import {FEATURED_SPEAKERS, type Speaker} from "#/components/events/events-agenda-data.ts";

function SpeakerCard({speaker}: {readonly speaker: Speaker}) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-3xl border border-foreground/10 bg-card shadow-md transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-xl">
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-muted">
        {speaker.imageSrc ? (
          <img
            src={speaker.imageSrc}
            alt={speaker.name}
            className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-lagoon to-emerald-600 text-2xl font-extrabold text-white">
            {speaker.initials}
          </div>
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
          <h3 className="text-base font-black tracking-tight text-white group-hover:text-emerald-300">{speaker.name}</h3>
        </div>
      </div>
    </div>
  );
}

export function EventDetailSpeakers() {
  return (
    <section className="bg-background py-20 text-foreground sm:py-28 border-t border-foreground/10">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <div className="mb-14 text-center">
          <span className="inline-block rounded-full border border-foreground/20 bg-foreground/5 px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-foreground/70">
            One with AI 2026
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-primary sm:text-4xl">Speakers</h2>
          <p className="mt-2 text-base text-muted-foreground">
            Industry leaders and innovators who shaped the conversation at One with AI.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {FEATURED_SPEAKERS.map((speaker) => (
            <SpeakerCard key={speaker.id} speaker={speaker} />
          ))}
        </div>
      </div>
    </section>
  );
}
