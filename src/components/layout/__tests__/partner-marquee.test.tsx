import {render, screen} from "@testing-library/react";
import {describe, expect, it} from "vitest";

import {PartnerLogos} from "#/components/layout/partner-logos.ts";
import {PartnerMarquee} from "#/components/layout/partner-marquee.tsx";

describe("PartnerMarquee", () => {
  it("labels the strip with the trust statement", () => {
    render(<PartnerMarquee />);

    expect(screen.getByText("The teams that can't afford downtime build with us.")).toBeInTheDocument();
  });

  it("exposes each partner logo once to assistive technology", () => {
    render(<PartnerMarquee />);

    expect(screen.getAllByRole("img")).toHaveLength(PartnerLogos.length);
  }, 10_000);

  it("names every logo after its partner", () => {
    render(<PartnerMarquee />);

    for (const partner of PartnerLogos) {
      expect(screen.getByRole("img", {name: partner.name})).toBeInTheDocument();
    }
  }, 10_000);

  it("duplicates the logo row so the scroll loops seamlessly", () => {
    const {container} = render(<PartnerMarquee />);

    expect(container.querySelectorAll('[data-slot="partner-logo-list"]')).toHaveLength(2);
  });

  it("hides the duplicated row from assistive technology", () => {
    const {container} = render(<PartnerMarquee />);
    const rows = container.querySelectorAll('[data-slot="partner-logo-list"]');

    expect(rows[1]).toHaveAttribute("aria-hidden", "true");
  });
});

describe("PartnerLogos", () => {
  it("keeps every partner name unique", () => {
    const names = PartnerLogos.map((partner) => partner.name);

    expect(new Set(names).size).toBe(names.length);
  });

  it("gives every partner a logo source", () => {
    expect(PartnerLogos.every((partner) => partner.logo.length > 0)).toBe(true);
  });
});
