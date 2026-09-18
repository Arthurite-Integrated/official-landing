import {useState} from "react";
import {Link} from "@tanstack/react-router";
import {ArrowRight} from "lucide-react";

import {FEATURED_SPEAKERS} from "#/components/events/events-agenda-data.ts";
import {Button} from "#/components/ui/button.tsx";

const CATEGORIES = ["// All Speakers", "Executive Section", "Cloud Architecture", "GenAI & MLOps"];

function SpeakerFilterSidebar({
  selectedCat,
  onSelectCat,
}: {
  readonly selectedCat: string;
  readonly onSelectCat: (cat: string) => void;
}) {
  return (
    <div>
      <div className="mb-2 text-xs font-bold uppercase tracking-widest text-[#006759] dark:text-emerald-400">
        // OUR SPEAKERS
      </div>
      <h2 className="mb-6 text-3xl font-black tracking-tight text-foreground sm:text-4xl">
        Our Speakers <br className="hidden sm:inline" />
        <span className="text-foreground/40 font-bold">At Our Best Summit</span>
      </h2>

      <div className="mb-8 space-y-3">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCat === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => onSelectCat(cat)}
              className={`block w-full text-left text-xs font-semibold transition-all ${
                isSelected ? "text-[#006759] font-bold dark:text-emerald-400" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      <Link to="/contact">
        <Button className="h-10 rounded-full bg-[#006759] px-5 text-xs font-bold text-white hover:bg-emerald-600">
          <span>View All</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Button>
      </Link>
    </div>
  );
}

export function EventDetailSpeakers() {
  const [selectedCat, setSelectedCat] = useState("// All Speakers");

  return (
    <section className="bg-sand/40 py-20 text-foreground sm:py-28 dark:bg-slate-900/40">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-4">
            <SpeakerFilterSidebar selectedCat={selectedCat} onSelectCat={setSelectedCat} />
          </div>

          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
              {FEATURED_SPEAKERS.map((sp) => (
                <div
                  key={sp.id}
                  className="group relative flex flex-col overflow-hidden rounded-3xl border border-foreground/10 bg-card shadow-md transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-xl dark:border-white/10"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
                    <img
                      src={sp.imageSrc}
                      alt={sp.name}
                      className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <span className="absolute top-3 right-3 rounded-full border border-white/20 bg-black/60 px-2.5 py-0.5 text-[10px] font-bold text-emerald-300 backdrop-blur-md">
                      {sp.timeSlot}
                    </span>
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <h3 className="text-lg font-black tracking-tight text-white group-hover:text-emerald-300">{sp.name}</h3>
                      <p className="text-xs text-slate-300">{sp.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
