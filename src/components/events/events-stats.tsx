import {cn} from "@/lib/utils";
import {scrollItemIntoView, useFocusedIndex} from "#/hooks/use-focused-index.ts";

export interface EventStatService {
  readonly slug: string;
  readonly value: string;
  readonly label: string;
  readonly subtitle: string;
  readonly description: string;
  readonly imageSrc: string;
}

export const EVENT_STAT_ITEMS: readonly EventStatService[] = [
  {
    slug: "speakers",
    value: "34",
    label: "34 SPEAKERS",
    subtitle: "Global AWS Architects & Tech Pioneers",
    description:
      "Engage with 34 keynote speakers, enterprise engineering leads, and cloud community visionaries from across Africa and around the globe.",
    imageSrc: "/services/real_arch.jpg",
  },
  {
    slug: "hours",
    value: "80",
    label: "80 HOURS",
    subtitle: "Deep-Dive Learning & Hands-On Labs",
    description:
      "Immerse yourself in 80 hours of live breakout sessions, technical demos, generative AI workshops, and interactive serverless hackathons.",
    imageSrc: "/services/real_ml.jpg",
  },
  {
    slug: "days",
    value: "3",
    label: "3 DAYS",
    subtitle: "Flagship Cloud Summit & Community Connect",
    description:
      "Three high-impact days packed with keynotes, networking lounges, partner showcases, and enterprise cloud modernization strategies.",
    imageSrc: "/services/emerald_arch.png",
  },
  {
    slug: "ideas",
    value: "∞",
    label: "∞ IDEAS",
    subtitle: "Boundless Enterprise Possibilities",
    description:
      "Unlock infinite possibilities for scalable cloud infrastructure, zero-trust security postures, and enterprise generative AI solutions.",
    imageSrc: "/services/emerald_ai.png",
  },
  {
    slug: "venue",
    value: "VENUE",
    label: "Innovation Hub Main Auditorium",
    subtitle: "Event Venue & Main Stage",
    description: "State-of-the-art keynote hall featuring immersive acoustics, 4K LED displays, and hybrid streaming infrastructure.",
    imageSrc: "/services/svc_arch.png",
  },
];

function StatBackdrop({active}: {readonly active: boolean}) {
  return (
    <div
      data-slot="stat-backdrop"
      className={cn(
        "aws-backdrop-glow absolute inset-0 transition-opacity duration-700 ease-out pointer-events-none",
        active ? "opacity-100" : "opacity-0"
      )}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,103,89,0.12),transparent_70%)]" />
    </div>
  );
}

function StatPanelImage({item}: {readonly item: EventStatService}) {
  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[1.75rem] border border-foreground/10 shadow-2xl">
      <img
        key={item.slug}
        src={item.imageSrc}
        alt={item.label}
        className="h-full w-full object-cover transition-all duration-700 animate-in fade-in zoom-in-95"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-6 flex flex-col justify-end text-white">
        <span className="mb-1 inline-block rounded-full bg-[#006759]/80 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-white backdrop-blur-md self-start">
          {item.value} — {item.subtitle}
        </span>
        <h4 className="text-xl font-bold tracking-tight text-white">{item.label}</h4>
      </div>
    </div>
  );
}

function StatPanel({item}: {readonly item: EventStatService}) {
  return (
    <div className="hidden lg:flex lg:flex-col lg:justify-center">
      <StatPanelImage item={item} />
      <h3 className="mt-5 text-xl font-bold text-foreground">{item.label}</h3>
      <p className="mt-2 max-w-xl text-[0.95rem] leading-relaxed text-foreground/75">{item.description}</p>
    </div>
  );
}

function StatNav({
  activeIndex,
  listRef,
  onSelect,
}: {
  readonly activeIndex: number;
  readonly listRef: React.RefObject<HTMLUListElement | null>;
  readonly onSelect: (index: number) => void;
}) {
  return (
    <ul ref={listRef} className="flex flex-col gap-10 lg:gap-0">
      {EVENT_STAT_ITEMS.map((item, index) => (
        <li key={item.slug} className="lg:flex lg:min-h-[16vh] lg:flex-col lg:justify-center">
          <button
            type="button"
            aria-current={index === activeIndex ? "true" : undefined}
            onClick={() => onSelect(index)}
            className={cn(
              "block cursor-pointer text-left text-2xl font-bold tracking-tight transition-colors duration-500 sm:text-3xl lg:w-full lg:text-[2.75rem] lg:leading-[1.1] xl:text-[3.25rem]",
              index === activeIndex ? "text-[#006759]" : "text-foreground/70 hover:text-foreground/80 lg:text-foreground/25"
            )}
          >
            {item.label}
          </button>
          <p className="mt-3 text-sm leading-relaxed text-foreground/70 lg:hidden">{item.description}</p>
        </li>
      ))}
    </ul>
  );
}

export function EventsStats() {
  const {activeIndex, listRef} = useFocusedIndex();
  const currentItem = EVENT_STAT_ITEMS[activeIndex] ?? EVENT_STAT_ITEMS[0];

  return (
    <section aria-label="Event Highlights & Venue" className="relative w-full overflow-hidden bg-background">
      <div className="sticky top-0 flex h-screen w-full items-center overflow-hidden">
        {EVENT_STAT_ITEMS.map((item, index) => (
          <StatBackdrop key={item.slug} active={index === activeIndex} />
        ))}
        <div className="relative hidden h-full w-full lg:grid lg:grid-cols-[minmax(0,1fr)_46%] lg:items-center lg:px-14 lg:py-16 xl:px-20">
          <div />
          {currentItem && <StatPanel item={currentItem} />}
        </div>
      </div>

      <div className="relative -mt-[100vh] w-full px-5 pt-24 pb-28 sm:px-8 lg:px-14 lg:pt-32 lg:pb-[62vh] xl:px-20">
        <header className="lg:max-w-md">
          <span className="inline-block rounded-full bg-[#006759]/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-[#006759]">
            Event Highlights & Venue
          </span>
          <h2 className="mt-3 text-3xl font-medium tracking-tight text-foreground sm:text-4xl">Scale, Vision & Innovation</h2>
          <p className="mt-3 text-sm leading-relaxed text-foreground/60 sm:text-base">
            Everything you need to know about the scale of our cloud summit and main auditorium.
          </p>
        </header>

        <div className="mt-12 lg:mt-16 lg:w-[54%]">
          <StatNav activeIndex={activeIndex} listRef={listRef} onSelect={(index) => scrollItemIntoView(listRef.current, index)} />
        </div>
      </div>
    </section>
  );
}
