import {act, renderHook} from "@testing-library/react";
import {afterEach, beforeEach, describe, expect, it, vi} from "vitest";

import {SUGGESTION_ROTATION_MS, useRotatingSuggestion} from "#/hooks/use-rotating-suggestion.ts";

const SUGGESTIONS = ["Migrate our workloads", "Audit our AWS spend", "Modernise a legacy app"];

describe("useRotatingSuggestion", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("returns the first suggestion before any rotation elapses", () => {
    const {result} = renderHook(() => useRotatingSuggestion(SUGGESTIONS, false));

    expect(result.current).toBe("Migrate our workloads");
  });

  it("advances to the next suggestion once the rotation interval elapses", () => {
    const {result} = renderHook(() => useRotatingSuggestion(SUGGESTIONS, false));

    act(() => {
      vi.advanceTimersByTime(SUGGESTION_ROTATION_MS);
    });

    expect(result.current).toBe("Audit our AWS spend");
  });

  it("wraps back to the first suggestion after the last one", () => {
    const {result} = renderHook(() => useRotatingSuggestion(SUGGESTIONS, false));

    act(() => {
      vi.advanceTimersByTime(SUGGESTION_ROTATION_MS * SUGGESTIONS.length);
    });

    expect(result.current).toBe("Migrate our workloads");
  });

  it("holds the current suggestion while paused", () => {
    const {result} = renderHook(() => useRotatingSuggestion(SUGGESTIONS, true));

    act(() => {
      vi.advanceTimersByTime(SUGGESTION_ROTATION_MS * 3);
    });

    expect(result.current).toBe("Migrate our workloads");
  });

  it("returns an empty string when there are no suggestions", () => {
    const {result} = renderHook(() => useRotatingSuggestion([], false));

    expect(result.current).toBe("");
  });
});
