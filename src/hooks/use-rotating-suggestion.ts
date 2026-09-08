import {useEffect, useState} from "react";

export const SUGGESTION_ROTATION_MS = 3200;

export function useRotatingSuggestion(suggestions: readonly string[], paused: boolean): string {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (paused || suggestions.length === 0) return;

    const rotation = setInterval(() => {
      setIndex((current) => (current + 1) % suggestions.length);
    }, SUGGESTION_ROTATION_MS);

    return () => clearInterval(rotation);
  }, [paused, suggestions.length]);

  return suggestions[index] ?? "";
}
