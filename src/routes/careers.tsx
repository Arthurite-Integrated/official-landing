import {createFileRoute} from "@tanstack/react-router";

import {CareersAtip} from "#/components/layout/careers-atip.tsx";
import {CareersBenefits} from "#/components/layout/careers-benefits.tsx";
import {CareersCta} from "#/components/layout/careers-cta.tsx";
import {CareersHero} from "#/components/layout/careers-hero.tsx";
import {CareersOpenRoles} from "#/components/layout/careers-open-roles.tsx";

export const Route = createFileRoute("/careers")({
  component: CareersPage,
});

function CareersPage() {
  return (
    <main>
      <CareersHero />
      <CareersBenefits />
      <CareersOpenRoles />
      <CareersAtip />
      <CareersCta />
    </main>
  );
}
