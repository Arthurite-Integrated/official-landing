import {render, screen} from "@testing-library/react";
import {describe, expect, it, vi} from "vitest";

import {CONTACT_EMAIL, FooterLinkGroups, FooterOffices, FooterSocials} from "#/components/layout/footer-content.ts";
import {SiteFooter} from "#/components/layout/site-footer.tsx";

vi.mock("@tanstack/react-router", async () => {
  const React = await import("react");

  return {
    Link: ({children, className, to}: {readonly children: React.ReactNode; readonly className?: string; readonly to: string}) =>
      React.createElement("a", {className, href: to}, children),
  };
});

describe("SiteFooter", () => {
  it("renders as the page footer landmark", () => {
    render(<SiteFooter />);

    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });

  it("invites visitors to start a project", () => {
    render(<SiteFooter />);

    expect(screen.getByRole("heading", {level: 2})).toHaveTextContent(/build what's next on aws/i);
  });

  it("sends the primary call to action to the contact page", () => {
    render(<SiteFooter />);

    expect(screen.getByRole("link", {name: /book a free consultation/i})).toHaveAttribute("href", "/contact");
  });

  it("links every footer page", () => {
    render(<SiteFooter />);

    for (const item of FooterLinkGroups.flatMap((group) => group.links)) {
      expect(screen.getByRole("link", {name: item.label})).toHaveAttribute("href", item.link);
    }
  });

  it("titles every link group", () => {
    render(<SiteFooter />);

    for (const group of FooterLinkGroups) {
      expect(screen.getByRole("heading", {name: group.title})).toBeInTheDocument();
    }
  });

  it("lists every office city", () => {
    render(<SiteFooter />);

    for (const office of FooterOffices) {
      expect(screen.getByText(office)).toBeInTheDocument();
    }
  });

  it("links the contact email", () => {
    render(<SiteFooter />);

    expect(screen.getByRole("link", {name: CONTACT_EMAIL})).toHaveAttribute("href", `mailto:${CONTACT_EMAIL}`);
  });

  it("links every social profile by name", () => {
    render(<SiteFooter />);

    for (const social of FooterSocials) {
      expect(screen.getByRole("link", {name: `Arthurite Integrated on ${social.name}`})).toHaveAttribute("href", social.url);
    }
  });

  it("opens social profiles in a new tab", () => {
    render(<SiteFooter />);

    expect(screen.getByRole("link", {name: "Arthurite Integrated on LinkedIn"})).toHaveAttribute("target", "_blank");
  });

  it("shows the copyright for the current year", () => {
    render(<SiteFooter />);

    expect(screen.getByText(new RegExp(`© ${new Date().getFullYear()} Arthurite Integrated`))).toBeInTheDocument();
  });
});

describe("FooterSocials", () => {
  it("keeps every network name unique", () => {
    const names = FooterSocials.map((social) => social.name);

    expect(new Set(names).size).toBe(names.length);
  });
});
