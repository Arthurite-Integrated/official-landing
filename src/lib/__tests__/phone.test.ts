import {describe, expect, it} from "vite-plus/test";

import {phoneSchema} from "#/lib/phone.ts";

const parse = (value: string) => phoneSchema.safeParse(value);

describe("phoneSchema", () => {
  it("accepts a number already in E.164 format", () => {
    expect(parse("+2348012345678")).toMatchObject({success: true, data: "+2348012345678"});
  });

  it.each([
    ["spaces", "+234 801 234 5678"],
    ["dashes", "+234-801-234-5678"],
    ["brackets and dots", "+234 (801) 234.5678"],
    ["surrounding whitespace", "  +2348012345678  "],
  ])("strips %s before validating", (_label, input) => {
    expect(parse(input)).toMatchObject({success: true, data: "+2348012345678"});
  });

  it("treats a leading 00 as a plus sign", () => {
    expect(parse("00234 801 234 5678")).toMatchObject({success: true, data: "+2348012345678"});
  });

  it.each([
    ["a local number with no country code", "08012345678"],
    ["an empty value", ""],
    ["a number that is too short", "+23480"],
    ["letters", "+234 call me"],
  ])("rejects %s", (_label, input) => {
    expect(parse(input).success).toBe(false);
  });

  it("explains how to write the number", () => {
    const result = parse("08012345678");

    expect(!result.success && result.error.issues[0]?.message).toMatch(/country code/i);
  });
});
