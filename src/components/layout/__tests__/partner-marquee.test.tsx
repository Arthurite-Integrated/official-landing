import {screen} from "@testing-library/react";
import {afterEach, beforeEach, describe, expect, it, vi} from "vite-plus/test";

import {toPartnerLogos} from "#/components/layout/partner-logos.ts";
import {PartnerMarquee} from "#/components/layout/partner-marquee.tsx";
import type {ApiPartner} from "#/lib/api/types.ts";
import {renderWithQueryClient} from "#/test-utils/query-client.tsx";

const partner = (name: string, sortOrder: number): ApiPartner => ({
  id: `partner-${sortOrder}`,
  section: "partners",
  name,
  logo: `https://cdn.arthurite.test/${sortOrder}.svg`,
  status: "published",
  sortOrder,
  createdAt: "2026-01-01T00:00:00.000Z",
});

const PARTNERS = [partner("Second Partner", 1), partner("Amazon Web Services", 0)];
const response = () =>
  new Response(JSON.stringify({success: true, data: {items: PARTNERS, pagination: {limit: 100, nextCursor: null}}}), {status: 200});

describe("PartnerMarquee", () => {
  beforeEach(() => {
    vi.stubEnv("VITE_API_BASE_URL", "https://api.arthurite.test/v1");
    vi.stubGlobal(
      "fetch",
      vi.fn(() => Promise.resolve(response()))
    );
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it("labels the strip with the trust statement", () => {
    renderWithQueryClient(<PartnerMarquee />);

    expect(screen.getByText("The teams that can't afford downtime build with us.")).toBeInTheDocument();
  });

  it("renders partner logos returned by the API", async () => {
    renderWithQueryClient(<PartnerMarquee />);

    expect(await screen.findByRole("img", {name: "Amazon Web Services"})).toHaveAttribute("src", "https://cdn.arthurite.test/0.svg");
    expect(screen.getAllByRole("img")).toHaveLength(PARTNERS.length);
  });

  it("duplicates the logo row so the scroll loops seamlessly", async () => {
    const {container} = renderWithQueryClient(<PartnerMarquee />);
    await screen.findByRole("img", {name: "Amazon Web Services"});

    expect(container.querySelectorAll('[data-slot="partner-logo-list"]')).toHaveLength(2);
  });

  it("hides the duplicated row from assistive technology", async () => {
    const {container} = renderWithQueryClient(<PartnerMarquee />);
    await screen.findByRole("img", {name: "Amazon Web Services"});
    const rows = container.querySelectorAll('[data-slot="partner-logo-list"]');

    expect(rows[1]).toHaveAttribute("aria-hidden", "true");
  });
});

describe("toPartnerLogos", () => {
  it("sorts partner records and maps logo fields", () => {
    const logos = toPartnerLogos(PARTNERS);

    expect(logos.map((item) => item.name)).toEqual(["Amazon Web Services", "Second Partner"]);
    expect(logos[0]?.logo).toBe("https://cdn.arthurite.test/0.svg");
  });
});
