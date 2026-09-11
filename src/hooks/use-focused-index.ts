import {useEffect, useEffectEvent, useRef, useState} from "react";

import {nearestIndexToFocus} from "#/lib/nearest-focus.ts";

/** Items become active as they cross the upper third of the viewport. */
const FOCUS_RATIO = 0.4;

export function useFocusedIndex() {
  const listRef = useRef<HTMLUListElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const updateActiveIndex = useEffectEvent(() => {
    const list = listRef.current;

    if (list === null) {
      return;
    }

    const centers = [...list.children].map((item) => {
      const {height, top} = item.getBoundingClientRect();

      return top + height / 2;
    });

    setActiveIndex(nearestIndexToFocus(centers, window.innerHeight * FOCUS_RATIO));
  });

  useEffect(() => {
    updateActiveIndex();
    window.addEventListener("scroll", updateActiveIndex, {passive: true});
    window.addEventListener("resize", updateActiveIndex);

    return () => {
      window.removeEventListener("scroll", updateActiveIndex);
      window.removeEventListener("resize", updateActiveIndex);
    };
  }, []);

  return {activeIndex, listRef};
}

export function scrollItemIntoView(list: HTMLUListElement | null, index: number) {
  list?.children[index]?.scrollIntoView({behavior: "smooth", block: "center"});
}
