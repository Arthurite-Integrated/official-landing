import {useEffect, useEffectEvent, useState} from "react";
import {useLocation} from "@tanstack/react-router";

const SOLID_NAV_OFFSET = 80;

export const HERO_SCROLL_BOUNDARY_ID = "home-hero-scroll-boundary";

export function useNavigationTone() {
  const {pathname} = useLocation();
  const [solid, setSolid] = useState(() => typeof document !== "undefined" && document.getElementById(HERO_SCROLL_BOUNDARY_ID) === null);

  const updateTone = useEffectEvent(() => {
    const boundary = document.getElementById(HERO_SCROLL_BOUNDARY_ID);

    if (boundary === null) {
      setSolid(true);
      return;
    }

    setSolid(boundary.getBoundingClientRect().top <= SOLID_NAV_OFFSET);
  });

  useEffect(() => {
    updateTone();
    window.addEventListener("scroll", updateTone, {passive: true});
    window.addEventListener("resize", updateTone);

    return () => {
      window.removeEventListener("scroll", updateTone);
      window.removeEventListener("resize", updateTone);
    };
  }, [pathname]);

  return solid;
}
