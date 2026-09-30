import {fireEvent, render, screen} from "@testing-library/react";
import {afterEach, describe, expect, it, vi} from "vite-plus/test";

import {MobileNav} from "#/components/layout/mobile-nav.tsx";

vi.mock("@tanstack/react-router", async () => {
  const React = await import("react");
  return {
    Link: ({
      children,
      className,
      onClick,
      to,
      ...props
    }: {
      readonly children: React.ReactNode;
      readonly className?: string;
      readonly onClick?: () => void;
      readonly to: string;
    }) =>
      React.createElement(
        "a",
        {
          className,
          href: to,
          onClick,
          ...props,
        },
        children
      ),
  };
});

describe("MobileNav", () => {
  afterEach(() => {
    document.body.style.overflow = "";
  });

  it("renders hamburger button initially and opens menu when clicked", () => {
    render(<MobileNav solid={false} />);

    const hamburgerBtn = screen.getByRole("button", {name: "Open navigation menu"});
    expect(hamburgerBtn).toBeInTheDocument();

    // Drawer should not be present initially
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    // Click to open drawer
    fireEvent.click(hamburgerBtn);

    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeInTheDocument();
    expect(screen.getByText("Services")).toBeInTheDocument();
    expect(screen.getByText("About")).toBeInTheDocument();
    expect(screen.getByText("Blog")).toBeInTheDocument();
    expect(screen.getByText("Events")).toBeInTheDocument();
    expect(screen.getByText("Join Us")).toBeInTheDocument();
    expect(screen.getByRole("button", {name: "Book Free"})).toBeInTheDocument();
    expect(screen.getByText("Facebook")).toBeInTheDocument();
    expect(screen.getByText("Instagram")).toBeInTheDocument();
    expect(screen.getByText("Twitter")).toBeInTheDocument();
  });

  it("closes the mobile menu when close button is clicked", () => {
    render(<MobileNav solid={true} />);

    fireEvent.click(screen.getByRole("button", {name: "Open navigation menu"}));
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    const closeBtn = screen.getByRole("button", {name: "Close navigation menu"});
    fireEvent.click(closeBtn);

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("closes the mobile menu when Escape key is pressed", () => {
    render(<MobileNav solid={false} />);

    fireEvent.click(screen.getByRole("button", {name: "Open navigation menu"}));
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    fireEvent.keyDown(window, {key: "Escape"});

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("closes the mobile menu when a nav link is clicked", () => {
    render(<MobileNav solid={false} />);

    fireEvent.click(screen.getByRole("button", {name: "Open navigation menu"}));
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Services"));

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
