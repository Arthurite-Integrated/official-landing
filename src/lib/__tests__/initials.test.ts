import fc from "fast-check";
import {describe, expect, it} from "vite-plus/test";

import {initialsOf} from "#/lib/initials.ts";

describe("initialsOf", () => {
  it("takes the first letter of every word in the name", () => {
    expect(initialsOf("Sufyan Zakariyya Sani")).toBe("SZS");
  });

  it("upper-cases the initials", () => {
    expect(initialsOf("ada okafor")).toBe("AO");
  });

  it("ignores extra whitespace between words", () => {
    expect(initialsOf("  Amina   Y. ")).toBe("AY");
  });

  it("gives one initial per word", () => {
    const word = fc.stringMatching(/^[a-z]{1,8}$/);

    fc.assert(
      fc.property(fc.array(word, {minLength: 1, maxLength: 5}), (words) => {
        expect(initialsOf(words.join(" "))).toHaveLength(words.length);
      })
    );
  });
});
