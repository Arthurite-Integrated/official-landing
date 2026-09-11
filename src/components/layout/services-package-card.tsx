import {Link} from "@tanstack/react-router";
import {Check} from "lucide-react";

import {cn} from "@/lib/utils";
import type {ServicePackage} from "#/components/layout/services-packages-data.ts";

type ServicesPackageCardProps = {
  readonly isYearly: boolean;
  readonly pkg: ServicePackage;
};

export function ServicesPackageCard({isYearly, pkg}: ServicesPackageCardProps) {
  const price = isYearly ? pkg.yearlyPrice : pkg.monthlyPrice;

  return (
    <article
      className={cn(
        "relative flex flex-col justify-between rounded-3xl p-8 transition-all duration-300",
        pkg.isPopular
          ? "border-2 border-emerald-400/60 bg-[#032213] shadow-[0_0_50px_rgba(1,168,141,0.25)]"
          : "border border-white/12 bg-white/5 backdrop-blur-md hover:border-white/25"
      )}
    >
      {pkg.isPopular ? (
        <span className="absolute -top-3.5 right-8 rounded-full border border-emerald-400/40 bg-emerald-500/20 px-3.5 py-1 text-xs font-semibold tracking-wider text-emerald-300 uppercase backdrop-blur-sm">
          Most Popular
        </span>
      ) : null}

      <div>
        <h3 className="text-xl font-semibold tracking-tight text-white">{pkg.name}</h3>
        <p className="mt-2 text-xs leading-relaxed text-white/60">{pkg.description}</p>

        <div className="mt-6 flex items-baseline gap-1">
          <span className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">{price}</span>
          <span className="text-sm font-medium text-white/60">/month</span>
        </div>

        <Link
          to="/contact"
          className={cn(
            "mt-8 inline-flex h-12 w-full items-center justify-center rounded-full text-sm font-semibold transition-all duration-300",
            pkg.isPopular
              ? "bg-emerald-400 text-[#032213] shadow-md hover:bg-emerald-300"
              : "border border-white/20 bg-white/10 text-white backdrop-blur-md hover:bg-white/20"
          )}
        >
          {pkg.name === "Enterprise" ? "Contact Sales" : "Start Now"}
        </Link>

        <div className="mt-8 h-px w-full bg-white/12" />

        <ul className="mt-8 space-y-3.5">
          {pkg.features.map((feature) => (
            <li key={feature} className="flex items-start gap-3 text-xs leading-relaxed text-white/80 sm:text-sm">
              <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                <Check className="size-3" strokeWidth={2.5} aria-hidden />
              </span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
