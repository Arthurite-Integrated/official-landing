import {Link} from "@tanstack/react-router";
import {ArrowRight} from "lucide-react";

import {Button} from "#/components/ui/button.tsx";

const INSIGHTS = [
  {
    id: "ins-1",
    title: "Art Behind Cloud Architectures Inspires Enterprise Resilience",
    category: "Cloud Architecture",
    image: "/services/real_arch.jpg",
  },
  {
    id: "ins-2",
    title: "Behind The Scenes Of Enterprise RAG & Generative AI Agents",
    category: "Artificial Intelligence",
    image: "/services/real_ai.jpg",
  },
  {
    id: "ins-3",
    title: "Exploring Automated Cloud Security & Multi-Region Compliance",
    category: "Security & FinOps",
    image: "/services/real_sec.jpg",
  },
];

function InsightCard({item}: {readonly item: (typeof INSIGHTS)[number]}) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-3xl border border-foreground/10 bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-md dark:border-white/10">
      <div className="relative aspect-video w-full overflow-hidden bg-muted">
        <img
          src={item.image}
          alt={item.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col justify-between p-6">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#006759] dark:text-emerald-400">
            {item.category}
          </span>
          <h3 className="mt-2 text-base font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
            {item.title}
          </h3>
        </div>
        <Link to="/blog" className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-[#006759] dark:text-emerald-400">
          <span>Read More</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}

export function EventDetailInsights() {
  return (
    <section className="bg-background py-20 text-foreground sm:py-28">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-2 text-xs font-bold uppercase tracking-widest text-[#006759] dark:text-emerald-400">
              // LATEST ARTICLES
            </div>
            <h2 className="text-3xl font-black tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              New <span className="text-foreground/40 font-bold">Insight</span>
            </h2>
          </div>

          <Link to="/blog">
            <Button className="h-10 rounded-full bg-[#006759] px-5 text-xs font-bold text-white hover:bg-emerald-600">
              <span>View More</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {INSIGHTS.map((item) => (
            <InsightCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
