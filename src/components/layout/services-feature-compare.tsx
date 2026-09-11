import {useMemo, useState} from "react";

import {cn} from "@/lib/utils";
import {CompareCategories, type CompareCategory, CompareFeatureRows} from "#/components/layout/services-feature-compare-data.ts";
import {ServicesFeatureCompareTable} from "#/components/layout/services-feature-compare-table.tsx";

const SECTION_TITLE_ID = "feature-compare-title";

function CategoryPills({active, onChange}: {readonly active: CompareCategory; readonly onChange: (cat: CompareCategory) => void}) {
  return (
    <div className="mt-8 flex flex-wrap justify-center gap-2">
      {CompareCategories.map((cat) => (
        <button
          key={cat}
          type="button"
          onClick={() => onChange(cat)}
          className={cn(
            "rounded-full px-4 py-2 text-xs font-semibold transition-all duration-300",
            active === cat
              ? "bg-white text-black shadow-lg"
              : "border border-white/15 bg-white/5 text-white/70 hover:border-white/30 hover:text-white"
          )}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

function SectionFooterNotes() {
  return (
    <ul className="mt-8 space-y-1.5 text-xs text-white/50">
      <li>• All packages include AWS Well-Architected alignment and FinOps baseline monitoring.</li>
      <li>• Incident SLAs apply 24/7/365 for Growth and Enterprise tiers.</li>
      <li>• Custom enterprise terms, multi-account governance, and compliance frameworks available on request.</li>
    </ul>
  );
}

export function ServicesFeatureCompare() {
  const [activeCategory, setActiveCategory] = useState<CompareCategory>("All Features");

  const filteredRows = useMemo(() => {
    if (activeCategory === "All Features") {
      return CompareFeatureRows;
    }
    return CompareFeatureRows.filter((r) => r.category === activeCategory);
  }, [activeCategory]);

  return (
    <section aria-labelledby={SECTION_TITLE_ID} className="bg-black px-5 py-20 sm:px-8 lg:py-28">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <p className="text-xs font-semibold tracking-[0.28em] text-white/50 uppercase">Feature Breakdown</p>
          <h2 id={SECTION_TITLE_ID} className="mt-4 text-4xl font-medium tracking-tight text-white sm:text-5xl">
            Compare Package Features
          </h2>
          <p className="mt-4 text-base text-white/65 sm:text-lg">
            Compare capabilities across tiers to select the exact level of cloud engineering and support your team needs.
          </p>

          <CategoryPills active={activeCategory} onChange={setActiveCategory} />
        </div>

        <div className="mt-12">
          <ServicesFeatureCompareTable rows={filteredRows} />
          <SectionFooterNotes />
        </div>
      </div>
    </section>
  );
}
