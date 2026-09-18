import {Link} from "@tanstack/react-router";
import {ArrowRight} from "lucide-react";

import {Button} from "#/components/ui/button.tsx";

export function EventDetailFooterCta() {
  return (
    <section className="relative overflow-hidden bg-sand/30 py-24 text-foreground sm:py-32 dark:bg-slate-900/40">
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-black uppercase text-foreground/5 select-none">
        ARTHURITE
      </div>

      <div className="relative mx-auto max-w-7xl px-6 sm:px-10">
        <div className="overflow-hidden rounded-3xl border border-foreground/10 bg-[#0a1418] p-8 text-white shadow-2xl lg:p-12">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-5">
              <div className="relative aspect-video overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-md lg:aspect-square">
                <img src="/services/real_managed.jpg" alt="Arthurite Cloud Revolution" className="h-full w-full object-cover" />
              </div>
            </div>

            <div className="lg:col-span-7">
              <h2 className="mb-6 text-2xl font-black tracking-tight text-white sm:text-3xl lg:text-4xl">
                Join the cloud revolution today and explore smarter tools for <span className="text-emerald-400 font-bold">better infrastructure</span>, seamless teamwork, and unforgettable impact.
              </h2>
              <Link to="/contact">
                <Button className="h-12 rounded-full bg-[#006759] px-7 text-xs font-bold text-white shadow-lg hover:bg-emerald-600">
                  <span>Join Now</span>
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
