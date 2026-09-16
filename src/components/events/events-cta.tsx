import {Link} from "@tanstack/react-router";
import {ArrowUpRight} from "lucide-react";

import {CTA_CONTENT} from "#/components/events/events-data.ts";
import {Button} from "#/components/ui/button.tsx";

export function EventsCta() {
  return (
    <section className="relative overflow-hidden bg-[#0a1418] py-20 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(0,103,89,0.35),transparent_70%)] pointer-events-none" />
      <div className="relative mx-auto max-w-5xl px-6 text-center sm:px-10">
        <h2 className="mb-8 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">{CTA_CONTENT.title}</h2>

        <Link to={CTA_CONTENT.buttonLink}>
          <Button className="h-12 rounded-full bg-[#006759] px-8 text-sm font-semibold text-white shadow-xl transition-all hover:bg-teal-500 hover:scale-105">
            {CTA_CONTENT.buttonText}
            <ArrowUpRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </section>
  );
}
