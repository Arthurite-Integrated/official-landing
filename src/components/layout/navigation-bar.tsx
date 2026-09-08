import {Link} from "@tanstack/react-router";

import {cn} from "@/lib/utils";
import atrLogo from "@/assets/atr-logo-full.svg";
import {NavLinks} from "#/components/layout/nav-links.tsx";
import {Button} from "#/components/ui/button.tsx";
import {useNavigationTone} from "#/hooks/use-navigation-tone.ts";

export const NavigationBar = () => {
  const solid = useNavigationTone();

  return (
    <nav
      data-state={solid ? "solid" : "overlay"}
      className={cn(
        "fixed top-0 left-0 z-50 w-full transition-[background-color] duration-300 ease-out",
        solid ? "bg-background" : "bg-transparent"
      )}
    >
      <div className="mx-auto w-full px-6 pt-3 sm:px-10">
        <div
          data-slot="nav-content"
          className={cn(
            "flex items-center justify-between border-b pb-3 transition-[border-color] duration-300 ease-out",
            solid ? "border-primary/18" : "border-transparent"
          )}
        >
          <Link to="/" className="flex items-center">
            <img src={atrLogo} alt="Arthurite Logo" className={cn("h-8 transition-[filter]", solid ? "" : "brightness-0 invert")} />
          </Link>
          <div className="flex items-center gap-5 sm:gap-8">
            <NavLinks solid={solid} />
            <Link to="/contact">
              <Button
                className={cn(
                  "h-10 rounded-full px-5 text-sm font-semibold shadow-none",
                  solid ? "bg-primary text-white hover:bg-primary/90" : "bg-white text-primary hover:bg-white/92"
                )}
              >
                Book Free
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
