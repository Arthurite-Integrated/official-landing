import {createFileRoute} from "@tanstack/react-router";

import {ServiceDetailView} from "#/components/layout/service-detail-view.tsx";
import {getServiceBySlug} from "#/lib/services-data.ts";

export const Route = createFileRoute("/services/$slug")({
  loader: ({params}) => getServiceBySlug(params.slug),
  head: ({loaderData}) => ({
    meta:
      loaderData === undefined
        ? [{title: "Service Not Found | Arthurite Integrated"}]
        : [{title: `${loaderData.title} | Arthurite Integrated`}, {name: "description", content: loaderData.tagline}],
  }),
  component: ServiceDetailRoute,
});

function ServiceDetailRoute() {
  const service = Route.useLoaderData();
  return <ServiceDetailView service={service} />;
}
