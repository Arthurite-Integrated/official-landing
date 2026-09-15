import {useState} from "react";
import {Link} from "@tanstack/react-router";
import {Calendar, ChevronLeft, ChevronRight, MapPin, Sparkles} from "lucide-react";

import {FEATURED_EVENTS, type EventItem} from "#/components/events/events-data.ts";
import {Button} from "#/components/ui/button.tsx";

function FeaturedArt() {
  return (
    <div className="relative flex items-center justify-center lg:col-span-5">
      <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-teal-500/30 bg-gradient-to-br from-teal-950 via-slate-900 to-emerald-950 p-6 shadow-inner lg:aspect-square">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,103,89,0.4),transparent_70%)]" />
        <div className="relative z-10 flex h-full flex-col justify-between text-white">
          <div className="text-right">
            <span className="rounded border border-emerald-400/40 bg-emerald-500/20 px-2 py-1 text-[10px] font-bold text-emerald-300 uppercase">
              AWS Bedrock
            </span>
          </div>
          <div className="text-center">
            <div className="mx-auto mb-3 flex h-20 w-20 items-center justify-center rounded-full border border-teal-400/30 bg-teal-500/10 shadow-lg">
              <Sparkles className="h-10 w-10 text-teal-300" />
            </div>
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-300">Amazon Bedrock Agent Core</p>
          </div>
          <div className="text-xs text-slate-400">Arthurite Integrated Enterprise AI</div>
        </div>
      </div>
    </div>
  );
}

function FeaturedDetails({event}: {readonly event: EventItem}) {
  return (
    <div className="lg:col-span-7">
      <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-teal-500/30 bg-teal-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-teal-300">
        <Sparkles className="h-3.5 w-3.5 text-teal-400" />
        {event.badge ?? "FEATURED EVENT"}
      </div>
      <h3 className="mb-4 text-2xl font-black tracking-tight text-white sm:text-3xl lg:text-4xl">{event.title}</h3>
      <p className="mb-6 text-sm leading-relaxed text-slate-300 sm:text-base">{event.description}</p>
      <div className="mb-8 flex flex-wrap gap-4 text-xs font-medium text-slate-300 sm:text-sm">
        <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2">
          <Calendar className="h-4 w-4 text-teal-400" />
          <span>{event.date}</span>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2">
          <MapPin className="h-4 w-4 text-emerald-400" />
          <span>{event.location}</span>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <Link to="/contact">
          <Button className="h-11 rounded-full bg-[#006759] px-6 text-sm font-semibold text-white hover:bg-teal-600">Register Now</Button>
        </Link>
        <Link to="/contact">
          <Button
            variant="outline"
            className="h-11 rounded-full border-white/20 bg-white/5 px-6 text-sm font-semibold text-white hover:bg-white/10"
          >
            View Event Details
          </Button>
        </Link>
      </div>
    </div>
  );
}

function FeaturedControls({onPrev, onNext}: {readonly onPrev: () => void; readonly onNext: () => void}) {
  if (FEATURED_EVENTS.length <= 1) return null;
  return (
    <div className="mt-6 flex justify-end gap-3">
      <Button
        variant="outline"
        size="icon"
        onClick={onPrev}
        aria-label="Previous event"
        className="h-10 w-10 rounded-full border-primary/20 hover:bg-primary/10"
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={onNext}
        aria-label="Next event"
        className="h-10 w-10 rounded-full border-primary/20 hover:bg-primary/10"
      >
        <ChevronRight className="h-5 w-5" />
      </Button>
    </div>
  );
}

export function EventsFeatured() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const current = FEATURED_EVENTS[currentIndex] ?? FEATURED_EVENTS[0];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? FEATURED_EVENTS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === FEATURED_EVENTS.length - 1 ? 0 : prev + 1));
  };

  if (!current) return null;

  return (
    <section className="bg-white py-16 text-[#1f2022] sm:py-20">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-[#006759] sm:text-4xl">Featured Event</h2>
          <p className="mt-2 text-base text-[#6c6d6f]">Register now and discover valuable insights for your organization.</p>
        </div>
        <div className="relative overflow-hidden rounded-3xl border border-[#006759]/20 bg-[#0a1418] p-8 text-white shadow-xl lg:p-12">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
            <FeaturedDetails event={current} />
            <FeaturedArt />
          </div>
        </div>
        <FeaturedControls onPrev={handlePrev} onNext={handleNext} />
      </div>
    </section>
  );
}
