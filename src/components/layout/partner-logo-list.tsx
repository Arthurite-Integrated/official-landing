import {PartnerLogos} from "#/components/layout/partner-logos.ts";

type PartnerLogoListProps = {
  readonly duplicate?: boolean;
};

export function PartnerLogoList({duplicate}: PartnerLogoListProps) {
  return (
    <ul data-slot="partner-logo-list" aria-hidden={duplicate} className="flex shrink-0 items-center gap-12 pr-12 sm:gap-16 sm:pr-16">
      {PartnerLogos.map((partner) => (
        <li key={partner.name} className="shrink-0">
          <img
            src={partner.logo}
            alt={partner.name}
            loading="lazy"
            className="h-11 w-auto object-contain opacity-80 transition-opacity duration-300 hover:opacity-100 sm:h-14"
          />
        </li>
      ))}
    </ul>
  );
}
