import {Link} from "@tanstack/react-router";
import {useState} from "react";

import {cn} from "@/lib/utils";
import {FAQ_CATEGORIES, SERVICES_FAQ_ITEMS} from "#/components/layout/services-faq-data.ts";
import type {FaqCategory} from "#/components/layout/services-faq-data.ts";
import {ServicesFaqItem} from "#/components/layout/services-faq-item.tsx";

const SECTION_TITLE_ID = "services-faq-title";

type CategoryFilterProps = {
  readonly activeCategory: FaqCategory;
  readonly onSelectCategory: (category: FaqCategory) => void;
};

function CategoryFilter({activeCategory, onSelectCategory}: CategoryFilterProps) {
  return (
    <div className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:mt-10">
      {FAQ_CATEGORIES.map((category) => (
        <button
          key={category}
          type="button"
          onClick={() => onSelectCategory(category)}
          className={cn(
            "rounded-full px-4 py-2 text-xs font-semibold tracking-wide transition-all duration-200 sm:px-5 sm:text-sm",
            activeCategory === category
              ? "bg-primary text-white shadow-lg"
              : "border border-foreground/15 bg-foreground/5 text-foreground/60 hover:border-foreground/25 hover:text-foreground"
          )}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

function FaqHeader() {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className="text-xs font-semibold tracking-[0.28em] text-foreground/50 uppercase">FAQ</p>
      <h2 id={SECTION_TITLE_ID} className="mt-4 text-4xl leading-[1.06] font-medium tracking-tight text-foreground sm:text-5xl">
        Frequently Asked Questions
      </h2>
      <p className="mt-4 text-base leading-relaxed text-foreground/70 sm:text-lg">
        Everything you need to know about our AWS cloud services, migration processes, pricing model, and enterprise SLAs.
      </p>
    </div>
  );
}

function FaqCta() {
  return (
    <div className="mt-16 rounded-3xl border border-foreground/10 bg-[#f2f2f0] p-8 text-center sm:p-10">
      <h3 className="text-xl font-medium text-foreground sm:text-2xl">Still Have Questions?</h3>
      <p className="mt-2 text-sm text-foreground/70 sm:text-base">
        Can't find the answer you're looking for? Reach out to our AWS certified solutions architects.
      </p>
      <div className="mt-6">
        <Link
          to="/contact"
          className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20"
        >
          Speak with an AWS Architect
        </Link>
      </div>
    </div>
  );
}

export function ServicesFaq() {
  const [activeCategory, setActiveCategory] = useState<FaqCategory>("All");
  const [openItemId, setOpenItemId] = useState<string | null>(null);

  const filteredItems = SERVICES_FAQ_ITEMS.filter((item) => activeCategory === "All" || item.category === activeCategory);

  const handleToggle = (id: string) => {
    setOpenItemId((current) => (current === id ? null : id));
  };

  return (
    <section aria-labelledby={SECTION_TITLE_ID} className="relative isolate overflow-hidden bg-background px-5 py-24 sm:px-8 lg:py-32">
      <div className="mx-auto max-w-4xl">
        <FaqHeader />
        <CategoryFilter activeCategory={activeCategory} onSelectCategory={setActiveCategory} />

        <div className="mt-12 space-y-4 sm:mt-14">
          {filteredItems.map((item) => (
            <ServicesFaqItem key={item.id} item={item} isOpen={openItemId === item.id} onToggle={() => handleToggle(item.id)} />
          ))}
        </div>

        <FaqCta />
      </div>
    </section>
  );
}
