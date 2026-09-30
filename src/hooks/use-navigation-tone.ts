import {useEffect, useEffectEvent, useState} from "react";
import {useLocation} from "@tanstack/react-router";

const SOLID_NAV_OFFSET = 80;

export const HERO_SCROLL_BOUNDARY_ID = "home-hero-scroll-boundary";

const OVERLAY_PATHS: readonly string[] = ["/", "/events"];

export function useNavigationTone() {
  const {pathname} = useLocation();

  const [solid, setSolid] = useState(() => {
    if (!OVERLAY_PATHS.includes(pathname)) return true;
    return typeof document !== "undefined" && document.getElementById(HERO_SCROLL_BOUNDARY_ID) === null;
  });

  const updateTone = useEffectEvent(() => {
    if (!OVERLAY_PATHS.includes(pathname)) {
      setSolid(true);
      return;
    }

    const boundary = document.getElementById(HERO_SCROLL_BOUNDARY_ID);

    if (boundary === null) {
      setSolid(true);
      return;
    }

    setSolid(boundary.getBoundingClientRect().top <= SOLID_NAV_OFFSET);
  });

  useEffect(() => {
    const frame = requestAnimationFrame(updateTone);
    window.addEventListener("scroll", updateTone, {passive: true});
    window.addEventListener("resize", updateTone);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateTone);
      window.removeEventListener("resize", updateTone);
    };
  }, [pathname]);

  return solid;
}
