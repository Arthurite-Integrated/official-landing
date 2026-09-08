import {useEffect, useEffectEvent, useState} from "react";
import {useLocation} from "@tanstack/react-router";

const HOME_PATH = "/";
const SOLID_NAV_OFFSET = 80;

export const HERO_SCROLL_BOUNDARY_ID = "home-hero-scroll-boundary";

export function useNavigationTone() {
  const {pathname} = useLocation();
  const [solid, setSolid] = useState(pathname !== HOME_PATH);

  const updateTone = useEffectEvent(() => {
    if (pathname !== HOME_PATH) {
      setSolid(true);
      return;
    }

    const boundary = document.getElementById(HERO_SCROLL_BOUNDARY_ID);

    if (boundary === null) {
      setSolid(false);
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
