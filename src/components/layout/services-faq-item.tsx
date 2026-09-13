import {ChevronDown} from "lucide-react";

import {cn} from "@/lib/utils";
import type {FaqItem} from "#/components/layout/services-faq-data.ts";

type ServicesFaqItemProps = {
  readonly item: FaqItem;
  readonly isOpen: boolean;
  readonly onToggle: () => void;
};

export function ServicesFaqItem({item, isOpen, onToggle}: ServicesFaqItemProps) {
  const contentId = `${item.id}-content`;
  const buttonId = `${item.id}-button`;

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] transition-colors duration-200 hover:border-white/20">
      <h3>
        <button
          id={buttonId}
          type="button"
          aria-expanded={isOpen}
          aria-controls={contentId}
          onClick={onToggle}
          className="flex w-full items-center justify-between gap-4 p-6 text-left font-medium text-white transition-colors hover:text-emerald-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
        >
          <span className="text-base sm:text-lg">{item.question}</span>
          <ChevronDown
            className={cn("h-5 w-5 shrink-0 text-white/50 transition-transform duration-300", isOpen && "rotate-180 text-emerald-400")}
            aria-hidden="true"
          />
        </button>
      </h3>
      <div
        id={contentId}
        role="region"
        aria-labelledby={buttonId}
        hidden={!isOpen}
        className={cn("px-6 pb-6 text-sm leading-relaxed text-white/70 sm:text-base", !isOpen && "hidden")}
      >
        <p>{item.answer}</p>
      </div>
    </div>
  );
}
