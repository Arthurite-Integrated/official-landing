import {fireEvent, render, screen} from "@testing-library/react";
import {describe, expect, it, vi} from "vitest";

import {CAREERS_BENEFITS, OPEN_ROLES} from "#/components/layout/careers-data.ts";
import {CareersAtip} from "#/components/layout/careers-atip.tsx";
import {CareersBenefits} from "#/components/layout/careers-benefits.tsx";
import {CareersCta} from "#/components/layout/careers-cta.tsx";
import {CareersHero} from "#/components/layout/careers-hero.tsx";
import {CareersOpenRoles} from "#/components/layout/careers-open-roles.tsx";

vi.mock("@tanstack/react-router", async () => {
  const React = await import("react");
  return {
    Link: ({children, className, to}: {readonly children: React.ReactNode; readonly className?: string; readonly to: string}) =>
      React.createElement("a", {className, href: to}, children),
  };
});

describe("CareersHero", () => {
  it("renders main Join Our Team heading", () => {
    render(<CareersHero />);
    expect(screen.getByRole("heading", {level: 1, name: /join our team/i})).toBeInTheDocument();
  });

  it("renders hero description", () => {
    render(<CareersHero />);
    expect(screen.getByText(/be part of a growing cloud technology company/i)).toBeInTheDocument();
  });

  it("renders CTA button linking to open roles", () => {
    render(<CareersHero />);
    const cta = screen.getByRole("link", {name: /view open roles/i});
    expect(cta).toHaveAttribute("href", "#open-roles");
  });
});

describe("CareersBenefits", () => {
  it("renders section heading", () => {
    render(<CareersBenefits />);
    expect(screen.getByRole("region", {name: /why work with us/i})).toBeInTheDocument();
  });

  it("renders all benefit pillars", () => {
    render(<CareersBenefits />);
    for (const benefit of CAREERS_BENEFITS) {
      expect(screen.getByRole("heading", {name: benefit.title})).toBeInTheDocument();
      expect(screen.getByText(benefit.description)).toBeInTheDocument();
    }
  });
});

describe("CareersOpenRoles", () => {
  it("renders Open Roles heading region", () => {
    render(<CareersOpenRoles />);
    expect(screen.getByRole("region", {name: /open roles/i})).toBeInTheDocument();
  });

  it("renders all role titles", () => {
    render(<CareersOpenRoles />);
    for (const role of OPEN_ROLES) {
      expect(screen.getByRole("heading", {name: role.title})).toBeInTheDocument();
    }
  });

  it("filters roles when category sidebar is clicked", () => {
    render(<CareersOpenRoles />);
    const [architectureButton] = screen.getAllByRole("button", {name: /architecture/i});
    fireEvent.click(architectureButton);

    expect(screen.getByRole("heading", {name: "Solution Architect"})).toBeInTheDocument();
    expect(screen.queryByRole("heading", {name: "Cloud DevOps Engineer"})).not.toBeInTheDocument();
  });

  it("filters roles by search query", () => {
    render(<CareersOpenRoles />);
    const searchInput = screen.getByPlaceholderText(/search job titles/i);
    fireEvent.change(searchInput, {target: {value: "security"}});

    expect(screen.getByRole("heading", {name: "Cloud Security Specialist"})).toBeInTheDocument();
    expect(screen.queryByRole("heading", {name: "Solution Architect"})).not.toBeInTheDocument();
  });

  it("shows empty state when no roles match", () => {
    render(<CareersOpenRoles />);
    const searchInput = screen.getByPlaceholderText(/search job titles/i);
    fireEvent.change(searchInput, {target: {value: "zzzznonexistent"}});

    expect(screen.getByText(/no roles match/i)).toBeInTheDocument();
  });
});

describe("CareersAtip", () => {
  it("renders ATIP section heading", () => {
    render(<CareersAtip />);
    expect(screen.getByRole("region", {name: /arthurite tech internship program/i})).toBeInTheDocument();
  });

  it("renders internship application form inputs", () => {
    render(<CareersAtip />);
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/area of interest/i)).toBeInTheDocument();
  });

  it("displays success message when application form is submitted", () => {
    render(<CareersAtip />);
    fireEvent.change(screen.getByLabelText(/full name/i), {target: {value: "Alex Johnson"}});
    fireEvent.change(screen.getByLabelText(/email address/i), {target: {value: "alex@example.com"}});

    const submitBtn = screen.getByRole("button", {name: /submit application/i});
    fireEvent.click(submitBtn);

    expect(screen.getByText(/application submitted successfully/i)).toBeInTheDocument();
  });
});

describe("CareersCta", () => {
  it("renders CTA banner heading and link button", () => {
    render(<CareersCta />);
    expect(screen.getByRole("heading", {name: /ready to take the next step\?/i})).toBeInTheDocument();
    expect(screen.getByRole("link", {name: /see open roles/i})).toHaveAttribute("href", "#open-roles");
  });
});
