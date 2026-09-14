import {afterEach, describe, expect, it, vi} from "vitest";

import {formatPostDate} from "#/lib/blog/format-post-date.ts";

describe("formatPostDate", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("writes the day, month name, and year", () => {
    expect(formatPostDate("2026-09-14")).toBe("14 September 2026");
  });

  it("prints the same day for readers west of UTC", () => {
    vi.stubEnv("TZ", "America/Los_Angeles");

    expect(formatPostDate("2026-01-01")).toBe("1 January 2026");
  });
});
