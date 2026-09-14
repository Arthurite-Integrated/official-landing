import {Link} from "@tanstack/react-router";
import {ArrowUpRight} from "lucide-react";

export function FooterCta() {
  return (
    <div>
      <h2 className="max-w-xl text-5xl leading-[0.95] font-medium tracking-tight sm:text-6xl lg:text-7xl">Build what's next on AWS.</h2>
      <p className="mt-6 max-w-md text-base leading-relaxed text-primary-bg/70 sm:text-lg">
        From your first migration to production scale, we design and run cloud infrastructure you can rely on.
      </p>

      <div className="mt-9 flex flex-wrap gap-3">
        <Link
          to="/contact"
          className="inline-flex h-12 items-center gap-2 rounded-full bg-primary-bg px-6 text-sm font-semibold text-primary shadow-[0_0_32px_-4px_rgba(251,255,224,0.55)] transition-shadow hover:shadow-[0_0_44px_-2px_rgba(251,255,224,0.8)]"
        >
          Book a free consultation
          <ArrowUpRight className="size-4" aria-hidden />
        </Link>
        <Link
          to="/services"
          className="inline-flex h-12 items-center rounded-full border border-primary-bg/30 px-6 text-sm font-semibold transition-colors hover:bg-primary-bg/10"
        >
          Explore services
        </Link>
      </div>
    </div>
  );
}
