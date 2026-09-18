import {useState} from "react";
import {Link} from "@tanstack/react-router";
import {ArrowRight} from "lucide-react";

import {Button} from "#/components/ui/button.tsx";

const LOCATIONS = [
  {city: "Lagos", country: "Nigeria", active: true},
  {city: "Abuja", country: "Nigeria", active: false},
  {city: "London", country: "United Kingdom", active: false},
  {city: "Nairobi", country: "Kenya", active: false},
  {city: "Johannesburg", country: "South Africa", active: false},
  {city: "San Francisco", country: "USA", active: false},
];

function LocationList({
  activeCity,
  onSelectCity,
}: {
  readonly activeCity: string;
  readonly onSelectCity: (city: string) => void;
}) {
  return (
    <div className="space-y-3">
      {LOCATIONS.map((loc) => {
        const isSelected = activeCity === loc.city || loc.active;
        return (
          <button
            key={loc.city}
            type="button"
            onClick={() => onSelectCity(loc.city)}
            className={`group flex w-full items-center justify-between text-left transition-all ${
              isSelected ? "text-emerald-400 font-extrabold text-2xl sm:text-3xl" : "text-slate-500 hover:text-slate-300 text-lg sm:text-xl font-medium"
            }`}
          >
            <span>
              {loc.city}, <span className="text-sm opacity-60 font-normal">{loc.country}</span>
            </span>
            {isSelected && <ArrowRight className="h-6 w-6 text-emerald-400" />}
          </button>
        );
      })}
    </div>
  );
}

export function EventDetailLocations() {
  const [activeCity, setActiveCity] = useState("Lagos");

  return (
    <section className="relative bg-[#0d181d] py-20 text-white sm:py-28">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <div className="mb-10 text-xs font-bold uppercase tracking-widest text-[#006759] dark:text-emerald-400">
          // GLOBAL SUMMIT VENUES
        </div>

        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <div className="relative aspect-4/3 overflow-hidden rounded-3xl border border-teal-500/20 bg-slate-900 shadow-xl">
              <img src="/services/real_arch.jpg" alt="Arthurite Global Summit" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-xs text-slate-300">
                <span className="font-bold text-white">Arthurite Hybrid Hub</span> — Multi-region live broadcast & technical labs.
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <LocationList activeCity={activeCity} onSelectCity={setActiveCity} />

            <div className="mt-10">
              <Link to="/contact">
                <Button className="h-11 rounded-full bg-[#006759] px-6 text-xs font-bold text-white hover:bg-emerald-600">
                  <span>Join Summit Now</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
