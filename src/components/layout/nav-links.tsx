import {Link} from "@tanstack/react-router";

import {cn} from "@/lib/utils";
import {NavItems} from "#/components/layout/nav-utils.ts";

type NavLinksProps = {
  readonly solid: boolean;
};

export function NavLinks({solid}: NavLinksProps) {
  return (
    <div className="hidden items-center gap-6 md:flex">
      {NavItems.map((item) => (
        <Link
          to={item.link}
          key={item.link}
          className={cn(
            "text-sm font-semibold tracking-wide transition-colors uppercase",
            solid ? "text-primary hover:text-primary/72" : "text-white hover:text-white/78"
          )}
          activeProps={{
            className: solid ? "text-primary/72" : "text-white/78",
          }}
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
}
