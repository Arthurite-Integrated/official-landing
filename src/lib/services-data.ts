import {SERVICES_DATA} from "#/lib/services-items.ts";

export type ServiceFeature = {
  readonly title: string;
  readonly description: string;
};

export type ServiceItem = {
  readonly id: string;
  readonly slug: string;
  readonly title: string;
  readonly category: string;
  readonly tagline: string;
  readonly description: string;
  readonly image: string;
  readonly keyBenefits: readonly string[];
  readonly features: readonly ServiceFeature[];
  readonly awsServicesUsed: readonly string[];
};

export {SERVICES_DATA};

export function getServiceBySlug(slug: string): ServiceItem | undefined {
  return SERVICES_DATA.find((svc) => svc.slug === slug);
}
