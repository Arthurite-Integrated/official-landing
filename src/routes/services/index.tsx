import {createFileRoute} from "@tanstack/react-router";

import {ServicesFaq} from "#/components/layout/services-faq.tsx";
import {ServicesMarketplaceGrid} from "#/components/layout/services-marketplace-grid.tsx";

export const Route = createFileRoute("/services/")({
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <main>
      <ServicesMarketplaceGrid />
      <ServicesFaq />
    </main>
  );
}
