import {useState} from "react";
import {Link} from "@tanstack/react-router";
import {ArrowUpRight} from "lucide-react";

import {Button} from "#/components/ui/button.tsx";

const CITIES = [
  {city: "Shanghai, China", isTarget: false},
  {city: "Bangkok, Thailand", isTarget: false},
  {city: "Delhi, India", isTarget: false},
  {city: "Lagos, Nigeria", isTarget: true},
  {city: "Istanbul, Turkey", isTarget: false},
  {city: "New York, USA", isTarget: false},
  {city: "Melbourne, Aus", isTarget: false},
];

function CityList({selectedCity, onSelectCity}: {readonly selectedCity: string; readonly onSelectCity: (city: string) => void}) {
  return (
    <div className="space-y-3">
      {CITIES.map((c) => {
        const isHighlight = c.city === selectedCity || c.isTarget;
        return (
          <button
            key={c.city}
            type="button"
            onClick={() => onSelectCity(c.city)}
            className={`group flex w-full items-center justify-between text-left transition-all ${
              isHighlight
                ? "text-emerald-400 font-extrabold text-3xl sm:text-4xl lg:text-5xl"
                : "text-slate-600 hover:text-slate-400 text-xl sm:text-2xl font-bold"
            }`}
          >
            <span>{c.city}</span>
            {isHighlight && <ArrowUpRight className="h-8 w-8 text-emerald-400 shrink-0" />}
          </button>
        );
      })}
    </div>
  );
}

function LocationPhotoFrame() {
  return (
    <div>
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-xl">
        <img src="/services/real_migration.jpg" alt="Lagos Conference Venue" className="h-full w-full object-cover" />
      </div>
      <p className="mt-6 text-xs sm:text-sm leading-relaxed text-slate-400">
        From Lagos to London, Abuja to New York, this cloud event has sparked innovation across continents — and we&apos;re just getting
        started.
      </p>
    </div>
  );
}

export function EventDetailLocations() {
  const [selectedCity, setSelectedCity] = useState("Lagos, Nigeria");

  return (
    <section className="bg-[#0a1418] py-20 text-white sm:py-28 border-t border-white/5">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <div className="mb-12">
          <span className="inline-block rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-slate-300">
            - EVENT IN MANY COUNTRIES -
          </span>
        </div>

        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <LocationPhotoFrame />
          </div>

          <div className="lg:col-span-7">
            <CityList selectedCity={selectedCity} onSelectCity={setSelectedCity} />

            <div className="mt-12 flex justify-end">
              <Link to="/contact">
                <Button className="h-11 rounded-full bg-[#006759] px-6 text-xs font-bold text-white hover:bg-emerald-600">
                  <span>View More</span>
                  <ArrowUpRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
