import {createFileRoute} from "@tanstack/react-router";

import {CoreAwsServices} from "#/components/layout/core-aws-services.tsx";
import {ServicesCaseStudies} from "#/components/layout/services-case-studies.tsx";
import {ServicesFeatureCompare} from "#/components/layout/services-feature-compare.tsx";
import {ServicesHero} from "#/components/layout/services-hero.tsx";
import {ServicesPackages} from "#/components/layout/services-packages.tsx";
import {ServicesProcess} from "#/components/layout/services-process.tsx";
import {ServicesWhatWeOffer} from "#/components/layout/services-what-we-offer.tsx";
import {WhoWeServe} from "#/components/layout/who-we-serve.tsx";

export const Route = createFileRoute("/services")({
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <main>
      <ServicesHero />
      <ServicesWhatWeOffer />
      <WhoWeServe />
      <ServicesPackages />
      <ServicesFeatureCompare />
      <ServicesCaseStudies />
      <ServicesProcess />
      <CoreAwsServices />
    </main>
  );
}
