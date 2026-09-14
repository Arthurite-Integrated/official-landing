import {useRef, useState} from "react";
import {ChevronLeft, ChevronRight} from "lucide-react";

import {cn} from "@/lib/utils";
import {ManagedServiceCard} from "#/components/layout/managed-service-card.tsx";
import {MANAGED_SERVICES} from "#/components/layout/managed-services-data.ts";

const SECTION_TITLE_ID = "managed-services-title";

function ManagedServicesHeader() {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <h2 id={SECTION_TITLE_ID} className="text-4xl leading-[1.06] font-medium tracking-tight text-foreground sm:text-5xl lg:text-6xl">
        Managed Services
      </h2>

      <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-foreground/70 sm:text-lg">
        We handle the day-to-day operations of your cloud so your systems stay reliable, secure, and efficient.
      </p>
    </div>
  );
}

type ManagedServicesScrollControlsProps = {
  readonly onScroll: (direction: "left" | "right") => void;
};

function ManagedServicesScrollControls({onScroll}: ManagedServicesScrollControlsProps) {
  return (
    <div className="mt-10 flex items-center justify-end gap-3 lg:hidden">
      <button
        type="button"
        aria-label="Scroll left"
        onClick={() => onScroll("left")}
        className="flex size-10 items-center justify-center rounded-full border border-foreground/15 bg-foreground/5 text-foreground transition-colors hover:bg-foreground/10"
      >
        <ChevronLeft className="size-5" />
      </button>
      <button
        type="button"
        aria-label="Scroll right"
        onClick={() => onScroll("right")}
        className="flex size-10 items-center justify-center rounded-full border border-foreground/15 bg-foreground/5 text-foreground transition-colors hover:bg-foreground/10"
      >
        <ChevronRight className="size-5" />
      </button>
    </div>
  );
}

export function ManagedServices() {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (container) {
      container.scrollBy({left: direction === "left" ? -380 : 380, behavior: "smooth"});
    }
  };

  return (
    <section aria-labelledby={SECTION_TITLE_ID} className="relative isolate overflow-hidden bg-background px-5 py-24 sm:px-8 lg:py-32">
      <div className="relative z-10 mx-auto max-w-7xl">
        <ManagedServicesHeader />
        <ManagedServicesScrollControls onScroll={scroll} />

        <div
          ref={scrollContainerRef}
          className="mt-6 flex gap-6 overflow-x-auto scroll-smooth pb-6 pt-2 snap-x snap-mandatory scrollbar-none lg:mt-16 lg:grid lg:grid-cols-3 lg:overflow-visible"
        >
          {MANAGED_SERVICES.map((service, index) => (
            <div
              key={service.slug}
              className={cn("w-[85vw] max-w-md shrink-0 snap-center lg:w-auto lg:max-w-none", index === 0 && "lg:col-span-2")}
            >
              <ManagedServiceCard service={service} isActive={index === activeIndex} onClick={() => setActiveIndex(index)} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
