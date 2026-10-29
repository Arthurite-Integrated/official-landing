import type {ApiPartner} from "#/lib/api/types.ts";

export type PartnerLogo = {
  readonly logo: string;
  readonly name: string;
};

export function toPartnerLogos(partners: readonly ApiPartner[]): readonly PartnerLogo[] {
  return [...partners].sort((a, b) => a.sortOrder - b.sortOrder).map((partner) => ({logo: partner.logo, name: partner.name}));
}
