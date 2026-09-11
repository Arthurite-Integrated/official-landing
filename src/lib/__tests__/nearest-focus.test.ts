import fc from "fast-check";
import {describe, expect, it} from "vitest";

import {nearestIndexToFocus} from "#/lib/nearest-focus.ts";

describe("nearestIndexToFocus", () => {
  it("picks the item sitting on the focus line", () => {
    expect(nearestIndexToFocus([100, 400, 700], 400)).toBe(1);
  });

  it("picks the closest item when none sits on the line", () => {
    expect(nearestIndexToFocus([100, 400, 700], 620)).toBe(2);
  });

  it("keeps the first item while the list is still below the line", () => {
    expect(nearestIndexToFocus([900, 1200, 1500], 400)).toBe(0);
  });

  it("keeps the last item once the list has passed the line", () => {
    expect(nearestIndexToFocus([-900, -600, -300], 400)).toBe(2);
  });

  it("prefers the earlier item when two are equally close", () => {
    expect(nearestIndexToFocus([300, 500], 400)).toBe(0);
  });

  it("falls back to the first item when there is nothing to measure", () => {
    expect(nearestIndexToFocus([], 400)).toBe(0);
  });

  it("always returns an index inside the list", () => {
    fc.assert(
      fc.property(
        fc.array(fc.integer({min: -5000, max: 5000}), {minLength: 1, maxLength: 12}),
        fc.integer({min: -5000, max: 5000}),
        (centers, focus) => {
          const index = nearestIndexToFocus(centers, focus);

          return Number.isInteger(index) && index >= 0 && index < centers.length;
        }
      )
    );
  });

  it("never picks an item further away than the one it chose", () => {
    fc.assert(
      fc.property(
        fc.array(fc.integer({min: -5000, max: 5000}), {minLength: 1, maxLength: 12}),
        fc.integer({min: -5000, max: 5000}),
        (centers, focus) => {
          const chosen = nearestIndexToFocus(centers, focus);
          const chosenDistance = Math.abs(centers[chosen] - focus);

          return centers.every((center) => Math.abs(center - focus) >= chosenDistance);
        }
      )
    );
  });
});
