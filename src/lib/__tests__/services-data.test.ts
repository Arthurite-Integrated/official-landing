import {describe, expect, it} from "vite-plus/test";

import {SERVICES_DATA, getServiceBySlug} from "#/lib/services-data.ts";

describe("getServiceBySlug", () => {
  it("finds a service by its slug", () => {
    const service = SERVICES_DATA[0]!;

    expect(getServiceBySlug(service.slug)).toBe(service);
  });

  it("returns undefined for an unknown slug", () => {
    expect(getServiceBySlug("no-such-service")).toBeUndefined();
  });
});
