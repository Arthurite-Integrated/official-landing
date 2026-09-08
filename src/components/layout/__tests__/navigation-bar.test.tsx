import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import {afterEach, beforeEach, describe, expect, it, vi} from "vitest";

import {NavigationBar} from "#/components/layout/navigation-bar.tsx";

const HERO_SCROLL_BOUNDARY_ID = "home-hero-scroll-boundary";

const locationState = {pathname: "/"};

vi.mock("@tanstack/react-router", async () => {
  const React = await import("react");

  return {
    Link: ({
      activeProps: _activeProps,
      children,
      className,
      to,
      ...props
    }: {
      readonly activeProps?: unknown;
      readonly children: React.ReactNode;
      readonly className?: string;
      readonly to: string;
    }) =>
      React.createElement(
        "a",
        {
          className,
          href: to,
          ...props,
        },
        children
      ),
    useLocation: () => locationState,
  };
});

describe("NavigationBar", () => {
  let heroBoundaryTop = 0;
  let navContent: HTMLElement;

  beforeEach(() => {
    heroBoundaryTop = 320;
  });

  afterEach(() => {
    document.getElementById(HERO_SCROLL_BOUNDARY_ID)?.remove();
    locationState.pathname = "/";
  });

  it("stays in overlay mode while the home hero is in view", () => {
    appendHeroBoundary();

    render(<NavigationBar />);
    navContent = screen.getByRole("navigation").querySelector('[data-slot="nav-content"]') as HTMLElement;

    expect(screen.getByRole("navigation")).toHaveAttribute("data-state", "overlay");
    expect(screen.getByRole("navigation")).toHaveClass("bg-transparent");
    expect(navContent).toHaveClass("border-transparent");
    expect(screen.getAllByRole("link")[1]).toHaveClass("text-white");
  });

  it("switches to solid mode after the hero boundary is crossed", async () => {
    appendHeroBoundary();

    render(<NavigationBar />);
    navContent = screen.getByRole("navigation").querySelector('[data-slot="nav-content"]') as HTMLElement;
    heroBoundaryTop = 72;
    fireEvent.scroll(window);

    await waitFor(() => {
      expect(screen.getByRole("navigation")).toHaveAttribute("data-state", "solid");
    });
    expect(screen.getByRole("navigation")).toHaveClass("bg-background");
    expect(navContent).toHaveClass("border-primary/18");
    expect(screen.getAllByRole("link")[1]).toHaveClass("text-primary");
  });

  it("shows a light call to action while over the hero", () => {
    appendHeroBoundary();

    render(<NavigationBar />);

    expect(screen.getByRole("button", {name: "Book Free"})).toHaveClass("bg-white");
  });

  it("shows a dark call to action once the nav turns solid", async () => {
    appendHeroBoundary();

    render(<NavigationBar />);
    heroBoundaryTop = 72;
    fireEvent.scroll(window);

    await waitFor(() => {
      expect(screen.getByRole("button", {name: "Book Free"})).toHaveClass("bg-primary");
    });
  });

  it("uses solid mode on non-home routes", () => {
    locationState.pathname = "/about";

    render(<NavigationBar />);

    expect(screen.getByRole("navigation")).toHaveAttribute("data-state", "solid");
  });

  function appendHeroBoundary() {
    const boundary = document.createElement("div");
    boundary.id = HERO_SCROLL_BOUNDARY_ID;
    boundary.getBoundingClientRect = vi.fn(() => ({
      bottom: heroBoundaryTop,
      height: 1,
      left: 0,
      right: 0,
      top: heroBoundaryTop,
      width: 0,
      x: 0,
      y: heroBoundaryTop,
      toJSON: () => ({}),
    }));
    document.body.append(boundary);
  }
});
