import {useState} from "react";
import {Link} from "@tanstack/react-router";
import {ArrowUpRight} from "lucide-react";

import {FEATURED_SPEAKERS, type Speaker} from "#/components/events/events-agenda-data.ts";
import {Button} from "#/components/ui/button.tsx";

const TOPICS = ["Cloud Architecture", "GenAI & MLOps", "Enterprise Security"];

function SpeakerSidebar({selectedTopic, onSelectTopic}: {readonly selectedTopic: string; readonly onSelectTopic: (topic: string) => void}) {
  return (
    <div>
      <span className="inline-block rounded-full border border-foreground/20 bg-foreground/5 px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-foreground/70">
        - OUR SPEAKER
      </span>
      <h2 className="mt-4 mb-6 text-3xl font-black tracking-tight text-foreground sm:text-4xl lg:text-5xl">
        Our Speakers <br />
        <span className="text-foreground/30 font-extrabold">At Our Best</span> <br />
        <span className="text-foreground/30 font-extrabold">Conference</span>
      </h2>

      <div className="mb-8 space-y-3 border-t border-foreground/10 pt-6">
        <p className="text-xs font-bold uppercase tracking-widest text-foreground/50">// All Topic</p>
        {TOPICS.map((topic) => {
          const isSelected = selectedTopic === topic;
          return (
            <button
              key={topic}
              type="button"
              onClick={() => onSelectTopic(topic)}
              className={`block w-full text-left text-xs font-semibold transition-all ${
                isSelected ? "text-[#006759] font-extrabold dark:text-emerald-400" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {topic}
            </button>
          );
        })}
      </div>

      <Link to="/contact">
        <Button className="h-11 rounded-full bg-[#006759] px-6 text-xs font-bold text-white hover:bg-emerald-600">
          <span>View More</span>
          <ArrowUpRight className="h-4 w-4" />
        </Button>
      </Link>
    </div>
  );
}

function FeaturedSpeakerCard({speaker}: {readonly speaker: Speaker}) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-3xl border border-foreground/10 bg-card shadow-lg transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-900">
        <img
          src={speaker.imageSrc ?? "/services/real_ai.jpg"}
          alt={speaker.name}
          className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        <div className="absolute top-4 right-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md transition-transform group-hover:scale-110">
            <ArrowUpRight className="h-4 w-4 text-emerald-300" />
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <span className="mb-2 inline-block rounded-full bg-[#006759] px-3 py-0.5 text-[10px] font-bold text-white">
            {speaker.timeSlot}
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-white group-hover:text-emerald-300">{speaker.name}</h3>
          <p className="mt-1 text-xs text-slate-300">{speaker.role}</p>
        </div>
      </div>
    </div>
  );
}

function SpeakerGridCard({speaker}: {readonly speaker: Speaker}) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-foreground/10 bg-card p-3 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-md">
      <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-slate-900">
        <img
          src={speaker.imageSrc ?? "/services/real_ai.jpg"}
          alt={speaker.name}
          className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="pt-3 pb-1">
        <h4 className="text-sm font-extrabold text-foreground group-hover:text-[#006759] dark:group-hover:text-emerald-400">
          {speaker.name}
        </h4>
        <p className="text-[11px] text-muted-foreground">{speaker.role}</p>
      </div>
    </div>
  );
}

export function EventDetailSpeakers() {
  const [selectedTopic, setSelectedTopic] = useState("// All Topic");
  const mainSpeaker = FEATURED_SPEAKERS[0];
  const otherSpeakers = FEATURED_SPEAKERS.slice(1);

  if (!mainSpeaker) return null;

  return (
    <section className="bg-background py-20 text-foreground sm:py-28 border-t border-foreground/10">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-4">
            <SpeakerSidebar selectedTopic={selectedTopic} onSelectTopic={setSelectedTopic} />
          </div>

          <div className="lg:col-span-8 space-y-8">
            <FeaturedSpeakerCard speaker={mainSpeaker} />
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {otherSpeakers.map((sp) => (
                <SpeakerGridCard key={sp.id} speaker={sp} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
