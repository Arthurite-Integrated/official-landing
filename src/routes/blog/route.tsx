import {createFileRoute, Outlet} from "@tanstack/react-router";

// The route generator nests blog/index.tsx and blog/$slug.tsx under a /blog parent and references it even
// when no file defines one, which leaves both pages unattached and 404ing. This file is that parent.
export const Route = createFileRoute("/blog")({
  component: Outlet,
});
