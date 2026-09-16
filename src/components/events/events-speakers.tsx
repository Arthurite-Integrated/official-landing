import {Link} from "@tanstack/react-router";

import {FEATURED_SPEAKERS, type Speaker} from "#/components/events/events-data.ts";

function SpeakerCard({speaker}: {readonly speaker: Speaker}) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="mb-4 flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-[#006759] to-emerald-600 p-1 text-white shadow-md transition-transform duration-300 hover:scale-105">
        <div className="flex h-full w-full items-center justify-center rounded-full bg-white text-xl font-bold tracking-wider text-[#006759]">
          {speaker.initials}
        </div>
      </div>
      <h3 className="text-lg font-bold tracking-tight text-[#1f2022]">{speaker.name}</h3>
      <p className="text-xs text-[#6c6d6f]">{speaker.role}</p>
      <span className="mt-2 inline-block rounded-full border border-[#006759]/20 bg-white px-2.5 py-1 text-[11px] font-medium text-[#006759] shadow-xs">
        {speaker.timeSlot}
      </span>
    </div>
  );
}

function ViewAllCard() {
  return (
    <Link to="/contact" className="group flex flex-col items-center text-center">
      <div className="mb-4 flex h-28 w-28 items-center justify-center rounded-full border-2 border-[#006759]/30 bg-white text-[#006759] shadow-md transition-all duration-300 group-hover:scale-105 group-hover:border-[#006759] group-hover:bg-[#006759] group-hover:text-white">
        <span className="text-2xl font-black">30+</span>
      </div>
      <span className="text-xs font-semibold tracking-wider text-[#1f2022] uppercase group-hover:text-[#006759]">View All Speakers</span>
    </Link>
  );
}

export function EventsSpeakers() {
  return (
    <section className="bg-[#f2f2f0] py-20 text-[#1f2022] sm:py-24">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-[#006759] sm:text-4xl">Featured Speakers</h2>
          <p className="mt-2 text-sm text-[#6c6d6f]">Learn from global cloud architects, enterprise leaders, and pioneers.</p>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-5">
          {FEATURED_SPEAKERS.map((speaker) => (
            <SpeakerCard key={speaker.id} speaker={speaker} />
          ))}
          <ViewAllCard />
        </div>
      </div>
    </section>
  );
}
