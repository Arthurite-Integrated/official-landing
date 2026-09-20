import {useState} from "react";
import {Link} from "@tanstack/react-router";
import {ArrowUpRight, Calendar, ChevronLeft, ChevronRight, MapPin, Users} from "lucide-react";

import {FEATURED_EVENTS, type EventItem} from "#/components/events/events-data.ts";
import {Button} from "#/components/ui/button.tsx";

function FeaturedHeader() {
  return (
    <div className="mb-12 text-center">
      <span className="inline-block rounded-full border border-foreground/20 bg-foreground/5 px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-foreground/70">
        - FLAGSHIP CONFERENCES -
      </span>
      <h2 className="mt-3 text-3xl font-black tracking-tight text-foreground sm:text-4xl lg:text-5xl">
        Featured <span className="text-[#006759] dark:text-emerald-400">Events</span>
      </h2>
      <p className="mt-3 text-sm text-muted-foreground max-w-xl mx-auto">
        Experience world-class AWS cloud architectures, GenAI engineering, and enterprise compliance live in Nigeria
      </p>
    </div>
  );
}

function FeaturedCardBg({event}: {readonly event: EventItem}) {
  return (
    <div className="absolute inset-0 z-0">
      <img
        src={event.imageSrc ?? "/events/one_with_ai.jpg"}
        alt={event.title}
        className="h-full w-full object-cover object-center opacity-40 transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a1418] via-[#0a1418]/90 to-[#0a1418]/40 sm:to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a1418] via-transparent to-transparent" />
    </div>
  );
}

function FeaturedCardBody({event}: {readonly event: EventItem}) {
  return (
    <div className="relative z-10 p-8 sm:p-12 lg:p-14 text-white max-w-3xl">
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <span className="rounded-full bg-[#006759] px-4 py-1 text-xs font-extrabold uppercase tracking-wider text-white shadow-lg">
          {event.badge ?? "FEATURED EVENT"}
        </span>
        <span className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-slate-300 backdrop-blur-md">
          <Users className="h-3.5 w-3.5 text-emerald-400" />
          120+ Registered
        </span>
      </div>

      <h3 className="mb-4 text-2xl font-black tracking-tight text-white sm:text-3xl lg:text-4xl leading-tight">{event.title}</h3>
      <p className="mb-8 text-sm sm:text-base leading-relaxed text-slate-300 line-clamp-3">{event.description}</p>

      <div className="mb-8 flex flex-wrap gap-4 text-xs font-semibold text-slate-200">
        <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-4 py-2.5 backdrop-blur-md">
          <Calendar className="h-4 w-4 text-emerald-400" />
          <span>{event.date}</span>
        </div>
        <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-4 py-2.5 backdrop-blur-md">
          <MapPin className="h-4 w-4 text-emerald-400" />
          <span>{event.location}</span>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <Link to="/contact">
          <Button className="h-12 rounded-full bg-[#006759] px-7 text-xs font-bold text-white shadow-xl transition-all hover:bg-emerald-600">
            <span>Register Now</span>
            <ArrowUpRight className="h-4 w-4" />
          </Button>
        </Link>
        <Link to="/events/$slug" params={{slug: event.slug}}>
          <Button
            variant="outline"
            className="h-12 rounded-full border-white/25 bg-white/10 px-7 text-xs font-bold text-white backdrop-blur-md hover:bg-white/20"
          >
            <span>View Event Details</span>
            <ArrowUpRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}

function FeaturedHeroCard({event}: {readonly event: EventItem}) {
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-white/15 bg-[#0a1418] shadow-2xl transition-all">
      <FeaturedCardBg event={event} />
      <FeaturedCardBody event={event} />
    </div>
  );
}

function FeaturedPreviewThumb({
  event,
  index,
  isActive,
  onSelect,
}: {
  readonly event: EventItem;
  readonly index: number;
  readonly isActive: boolean;
  readonly onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`group relative flex w-full text-left overflow-hidden rounded-2xl border p-4 transition-all duration-300 ${
        isActive
          ? "border-[#006759] bg-[#006759]/10 shadow-lg dark:bg-emerald-950/30 ring-2 ring-[#006759]"
          : "border-foreground/10 bg-card hover:border-foreground/30 hover:bg-muted/50"
      }`}
    >
      <div className="relative aspect-square h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-slate-900">
        <img
          src={event.imageSrc ?? "/events/one_with_ai.jpg"}
          alt={event.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <span className="absolute top-1 left-1 rounded bg-black/70 px-1.5 py-0.5 text-[9px] font-black text-white">0{index + 1}</span>
      </div>

      <div className="ml-4 flex flex-col justify-center min-w-0">
        <span className="text-[10px] font-bold text-[#006759] uppercase tracking-wider dark:text-emerald-400">
          {event.badge ?? "EVENT"}
        </span>
        <h4 className="text-xs font-extrabold text-foreground truncate group-hover:text-[#006759] dark:group-hover:text-emerald-400">
          {event.title}
        </h4>
        <p className="mt-0.5 text-[11px] text-muted-foreground truncate">{event.date}</p>
      </div>
    </button>
  );
}

function FeaturedPagination({
  currentIndex,
  onSelectIndex,
  onPrev,
  onNext,
}: {
  readonly currentIndex: number;
  readonly onSelectIndex: (index: number) => void;
  readonly onPrev: () => void;
  readonly onNext: () => void;
}) {
  return (
    <div className="flex items-center justify-between pt-2">
      <div className="flex items-center gap-2">
        {FEATURED_EVENTS.map((evt, idx) => (
          <button
            key={evt.id}
            type="button"
            onClick={() => onSelectIndex(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`h-2 rounded-full transition-all ${idx === currentIndex ? "w-8 bg-[#006759]" : "w-2 bg-foreground/20"}`}
          />
        ))}
      </div>
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={onPrev}
          aria-label="Previous event"
          className="h-9 w-9 rounded-full border-foreground/20 hover:bg-muted"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={onNext}
          aria-label="Next event"
          className="h-9 w-9 rounded-full border-foreground/20 hover:bg-muted"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

function FeaturedControls({
  currentIndex,
  onSelectIndex,
  onPrev,
  onNext,
}: {
  readonly currentIndex: number;
  readonly onSelectIndex: (index: number) => void;
  readonly onPrev: () => void;
  readonly onNext: () => void;
}) {
  return (
    <div className="mt-8 space-y-4">
      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        {FEATURED_EVENTS.map((evt, idx) => (
          <FeaturedPreviewThumb key={evt.id} event={evt} index={idx} isActive={idx === currentIndex} onSelect={() => onSelectIndex(idx)} />
        ))}
      </div>
      <FeaturedPagination currentIndex={currentIndex} onSelectIndex={onSelectIndex} onPrev={onPrev} onNext={onNext} />
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
    <section className="bg-background py-20 text-foreground sm:py-28 border-t border-foreground/10">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <FeaturedHeader />
        <FeaturedHeroCard event={current} />
        <FeaturedControls currentIndex={currentIndex} onSelectIndex={setCurrentIndex} onPrev={handlePrev} onNext={handleNext} />
      </div>
    </section>
  );
}
