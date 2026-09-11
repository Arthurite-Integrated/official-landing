import {createFileRoute} from "@tanstack/react-router";

import {ServicesHero} from "#/components/layout/services-hero.tsx";
import {ServicesPackages} from "#/components/layout/services-packages.tsx";
import {ServicesWhatWeOffer} from "#/components/layout/services-what-we-offer.tsx";

export const Route = createFileRoute("/services")({
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <main>
      <ServicesHero />
      <ServicesWhatWeOffer />
      <ServicesPackages />
    </main>
  );
}
