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
          ? "border-2 border-primary/60 bg-primary/5 shadow-[0_0_40px_rgba(0,103,89,0.10)]"
          : "border border-foreground/10 bg-[#f2f2f0] hover:border-foreground/20"
      )}
    >
      {pkg.isPopular ? (
        <span className="absolute -top-3.5 right-8 rounded-full border border-primary/30 bg-primary/15 px-3.5 py-1 text-xs font-semibold tracking-wider text-primary uppercase">
          Most Popular
        </span>
      ) : null}

      <div>
        <h3 className="text-xl font-semibold tracking-tight text-foreground">{pkg.name}</h3>
        <p className="mt-2 text-xs leading-relaxed text-foreground/60">{pkg.description}</p>

        <div className="mt-6 flex items-baseline gap-1">
          <span className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">{price}</span>
          <span className="text-sm font-medium text-foreground/60">/month</span>
        </div>

        <Link
          to="/contact"
          className={cn(
            "mt-8 inline-flex h-12 w-full items-center justify-center rounded-full text-sm font-semibold transition-all duration-300",
            pkg.isPopular
              ? "bg-primary text-white shadow-md hover:bg-primary/90"
              : "border border-foreground/15 bg-foreground/5 text-foreground hover:bg-foreground/10"
          )}
        >
          {pkg.name === "Enterprise" ? "Contact Sales" : "Start Now"}
        </Link>

        <div className="mt-8 h-px w-full bg-foreground/10" />

        <ul className="mt-8 space-y-3.5">
          {pkg.features.map((feature) => (
            <li key={feature} className="flex items-start gap-3 text-xs leading-relaxed text-foreground/80 sm:text-sm">
              <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
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
