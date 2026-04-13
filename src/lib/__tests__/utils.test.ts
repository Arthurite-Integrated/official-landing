import {describe, it, expect} from "vitest";
import fc from "fast-check";
import {cn} from "../utils";

describe("cn", () => {
  it("returns empty string for no arguments", () => {
    expect(cn()).toBe("");
  });

  it("passes through a single class", () => {
    expect(cn("text-red-500")).toBe("text-red-500");
  });

  it("merges multiple classes", () => {
    expect(cn("px-4", "py-2")).toBe("px-4 py-2");
  });

  it("resolves tailwind conflicts (last wins)", () => {
    expect(cn("px-4", "px-8")).toBe("px-8");
  });

  it("handles conditional classes", () => {
    expect(cn("base", false && "hidden", "visible")).toBe("base visible");
  });

  it("handles undefined and null inputs", () => {
    expect(cn("base", undefined, null, "end")).toBe("base end");
  });

  it("always returns a string", () => {
    fc.assert(
      fc.property(fc.array(fc.oneof(fc.constant("px-4"), fc.constant("py-2"), fc.constant(undefined), fc.constant(false))), (inputs) => {
        const result = cn(...inputs);
        expect(typeof result).toBe("string");
      })
    );
  });
});
