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
    <div className="rounded-2xl border border-foreground/10 bg-[#f2f2f0] transition-colors duration-200 hover:border-foreground/20">
      <h3>
        <button
          id={buttonId}
          type="button"
          aria-expanded={isOpen}
          aria-controls={contentId}
          onClick={onToggle}
          className="flex w-full items-center justify-between gap-4 p-6 text-left font-medium text-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <span className="text-base sm:text-lg">{item.question}</span>
          <ChevronDown
            className={cn("h-5 w-5 shrink-0 text-foreground/50 transition-transform duration-300", isOpen && "rotate-180 text-primary")}
            aria-hidden="true"
          />
        </button>
      </h3>
      <div
        id={contentId}
        role="region"
        aria-labelledby={buttonId}
        hidden={!isOpen}
        className={cn("px-6 pb-6 text-sm leading-relaxed text-foreground/70 sm:text-base", !isOpen && "hidden")}
      >
        <p>{item.answer}</p>
      </div>
    </div>
  );
}
